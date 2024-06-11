import { IPointData } from 'pixi.js'
import { HEIGHT, WIDTH } from '../core/constants.js'
import { bell, ease } from '../core/transitions.js'
import { lerp, lerpAngle, lerpPosition, unlerp, unlerpUnclamped } from '../core/utils.js'
import { ArcheryDto, ArcheryGlobals, CanvasInfo, ContainerConsumer, DivingDto, DivingGlobals, Effect, FrameData, FrameInfo, GameGlobals, GlobalData, HurdlesDto, HurdlesGlobals, MinigameRanking, MinigameRankingLine, PlayerInfo, SkatingDto, SkatingGlobals } from '../types.js'
import { parseData, parseGlobalData } from './Deserializer.js'
import { ARROW_TAILS, ARROW_TAIL_ANCHORS, COLOUR_NAMES, DIRECTION_NAMES, DIVERS, WATER_TILE_HEIGHT, WIND_X, WIND_Y, GOAL_X as GOAL_X, GOAL_Y as GOAL_Y, HURDLE_TILE_WIDTH, HURDLE_TRACK_X, RUNNERS, SKATER_GAP, SKATERS, SKATE_ARROWS_XS, SKATE_ARROWS_WIDTH, HUD_AVATAR_SIZE, HUD_AVATAR_Y, HUD_AVATAR_XS, HUD_NAME_H, HUD_NAME_SEP as HUD_H_SEP, HUD_NAME_W, HUD_NAME_X, HUD_NAME_Y, MINIGAME_RANKING_LINE_WIDTH, MINIGAME_RANKING_LINE_X, MINIGAME_RANKING_LINE_YS, MINIGAME_RANKING_AVATARS, MINIGAME_RANKING_LINE_HEIGHT, MINIGAME_RANKING_WIDTH, MINIGAME_RANKING_HEIGHT, MINIGAME_RANKING_MEDALS, HUD_MEDAL_H, HUD_MEDAL_SEP, HUD_MEDAL_W, HUD_MEDAL_X, HUD_MEDAL_Y, HUD_SCORE_FONT_BASELINE_OFFSET, HUD_SCORE_H, HUD_SCORE_W, HUD_SCORE_X, HUD_SCORE_Y, MINIGAME_RANKING_AVATARS_LOSE_INDEX, ARCHERY_COUNTDOWN_X, ARCHERY_COUNTDOWN_Y, SKATING_COUNTDOWN_X, SKATING_COUNTDOWN_Y, HUD_RIGHT_BAR_SIZE } from './assetConstants.js'
import { CURSOR_MOVE_END_P, DIVERS_HGAP, DIVER_X as DIVERS_X, GOAL_ARROW_GAP, HURDLE_JUMP_HEIGHT, HURDLE_YS as HURDLE_TRACK_YS, INPUT_ARROW_SIZE, MINIGAME_HEIGHT, MINIGAME_POS, MINIGAME_WIDTH, ROTATIONS, SKATERS_POSITIONS, SKATE_ARROWS_ROTATIONS, SKATE_NORMALS } from './gameConstants.js'
import { angleDiff, fit, last, pad } from './utils.js'
import { TooltipManager } from './TooltipManager.js'

const MEDALS = ['🥇','🥈','🥉']

interface EffectPool {
  [key: string]: Effect[]
}

const api = {
  options: {
    debugMode: false,
    showFishHabitat: false,

    showOthersMessages: true,
    showMyMessages: true,
    meInGame: false,

    darkness: false,
    enableDarkness: true
  },
  setDebug: () => {}
}
export { api }

interface MovableSprite {
  getPos: (frame: FrameData) => IPointData
  entity: PIXI.DisplayObject
}

export class ViewModule {
  states: FrameData[]
  globalData: GlobalData
  pool: EffectPool
  api: any
  playerSpeed: number
  previousData: FrameData
  currentData: FrameData
  progress: number
  oversampling: number
  container: PIXI.Container
  time: number
  waterTime: number
  canvasData: CanvasInfo

  movables: MovableSprite[]
  fxLayer: PIXI.Container

  miniRankings: MinigameRanking[]
  water: PIXI.TilingSprite
  scoreTexts: PIXI.BitmapText[]
  medalTexts: PIXI.BitmapText[][]

  tooltipManager: TooltipManager

  constructor () {
    this.states = []
    this.pool = {}
    this.time = 0
    this.waterTime = 0
    window.debug = this
    this.api = api
    this.tooltipManager = new TooltipManager()
  }

  static get moduleName () {
    return 'graphics'
  }

  registerTooltip (container: PIXI.Container, getString: (x: number) => string) {
    container.interactive = true
    this.tooltipManager.register(container, getString)
  }

  // Effects
  getFromPool (type: string): Effect {
    if (!this.pool[type]) {
      this.pool[type] = []
    }

    for (const e of this.pool[type]) {
      if (!e.busy) {
        e.busy = true
        e.display.visible = true
        return e
      }
    }

    const e = this.createEffect(type)
    this.pool[type].push(e)
    e.busy = true
    return e
  }

  createEffect (type: string): Effect {
    let display = null
    if (type === 'placeholder') {
      display = new PIXI.Container()
      const spawn = new PIXI.Sprite(PIXI.Texture.WHITE)
      display.addChild(spawn)
      this.fxLayer.addChild(display)
    }
    return { busy: false, display }
  }

  updateScene (previousData: FrameData, currentData: FrameData, progress: number, playerSpeed?: number) {
    const frameChange = (this.currentData !== currentData)
    const fullProgressChange = ((this.progress === 1) !== (progress === 1))

    this.previousData = previousData
    this.currentData = currentData
    this.progress = progress
    this.playerSpeed = playerSpeed || 0

    this.resetEffects()
    this.updateMovables()

    for (let i = 0; i < this.globalData.gameTypes.length; ++i) {
      const gameType = this.globalData.gameTypes[i]

      if (gameType === 'archery') {
        this.updateArchery(i)
      }
      if (gameType === 'diving') {
        this.updateDiving(i)
      }
      if (gameType === 'hurdles') {
        this.updateHurdles(i)
      }
      if (gameType === 'skating') {
        this.updateSkating(i)
      }
    }

    this.updateRankings()
    this.updateHUD()

  }

  upThenDown (t: number) {
    return Math.min(1, bell(t) * 2)
  }

  updateHUD() {
    const data = this.progress === 1 ? this.currentData : this.previousData
    for (let pIdx = 0; pIdx < this.globalData.players.length; ++pIdx) {
      const score = data.scores[pIdx]
      const medals = data.medals[pIdx]

      const scoreText = this.scoreTexts[pIdx]
      const medalTexts = this.medalTexts[pIdx]

      scoreText.text = pad(score.toString(), 4)
      for (let k = 0; k < 3; k++) {
        medalTexts[k].text = pad(medals[k], 2, ' ')
      }
    }
  }

  updateRankings() {
    const cur = this.currentData
    const prev = this.previousData
    for (let i = 0; i < this.miniRankings.length; ++i) {
      const resetting = cur.minigames[i].resetting
      const shouldReset = cur.minigames[i].shouldReset
      if (resetting && this.progress < 1 || shouldReset && this.progress === 1) {
        //ranking visible
        this.miniRankings[i].container.visible = true

        const ranks = []
        for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
          const rank = cur.rankings[i]?.[pIdx] ?? -1
          ranks.push({player: pIdx, rank})
        }
        ranks.sort((a, b) => a.rank - b.rank)

        for (let line = 0; line < 3; line++) {
          const lineContent = this.miniRankings[i].lines[line]
          const lineValue = ranks[line]

          //avatars
          for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
            //set correct avatar visible for this line, else invisible
            if (lineValue.player == pIdx) {
              lineContent.avatars[pIdx].visible = true
              lineContent.avatars[pIdx].animationSpeed = lineValue.rank === 0 ? 0.05 : lineValue.rank === 1 ? 0.025 : 0
              if (lineContent.avatars[pIdx].animationSpeed == 0) {
                //force lose position
                lineContent.avatars[pIdx].gotoAndPlay(MINIGAME_RANKING_AVATARS_LOSE_INDEX)
              }
            } else {
              lineContent.avatars[pIdx].visible = false
            }
          }

          //set correct medal visible for this line, else invisible
          for (let j = 0; j < 3; j++) {
            lineContent.medals[j].visible = lineValue.rank === j
          }
        }
      } else {
        //ranking invisible
        this.miniRankings[i].container.visible = false
      }
    }
  }

  updateHurdles(gameIdx: number) {
    const globals = this.globalData.gameGlobals[gameIdx] as HurdlesGlobals
    const cur = this.currentData.minigames[gameIdx] as HurdlesDto
    const prev = this.previousData.minigames[gameIdx] as HurdlesDto
    const map = cur.map //prev.resetting && this.progress < 1 ? prev.map : cur.map

    for (let i = 0; i < map.length - 1; ++i) {
      let c = map[i]
      globals.lanes.forEach(l => l[i].visible = c === '#')
    }
    for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
      let from = prev.positions[pIdx]
      let to = cur.positions[pIdx]
      if (cur.resetting) {
        from = to
      }
      const runner = globals.runners[pIdx]
      runner.x = HURDLE_TRACK_X + lerp(from, to, this.progress) * (HURDLE_TILE_WIDTH)
      runner.texture = PIXI.Texture.from(RUNNERS[pIdx].run)
      if (cur.jumped[pIdx]) {
        runner.y = HURDLE_TRACK_YS[pIdx] - this.upThenDown(this.progress) * HURDLE_JUMP_HEIGHT
        if (this.progress > 0 && this.progress < 1) {
          runner.texture = PIXI.Texture.from(RUNNERS[pIdx].jump)
        }
      } else {
        runner.y = HURDLE_TRACK_YS[pIdx]
      }
      let stunSource = this.progress === 1 ? cur : prev
      if (cur.resetting) {
        stunSource = cur
      }
      if (stunSource.stunTimers[pIdx] > 0) {
        runner.texture = PIXI.Texture.from(RUNNERS[pIdx].fall)
      } else {
        runner.alpha = 1
      }
    }
  }
  updateDiving(gameIdx: number) {
    const globals = this.globalData.gameGlobals[gameIdx] as DivingGlobals
    const cur = this.currentData.minigames[gameIdx] as DivingDto
    const prev = this.previousData.minigames[gameIdx]as DivingDto

    const diveStart = 134
    const diveEnd = MINIGAME_HEIGHT - WATER_TILE_HEIGHT
    let from = prev.goal.length - prev.turnsRemaining +1
    let to = cur.goal.length - cur.turnsRemaining +1
    if (cur.resetting) {
      from = to
    }
    const diverLayer = globals.playerInfo.diverLayer
    const diverPos = lerp(from, to, this.progress)
    diverLayer.y = lerp(diveStart, diveEnd, unlerp(0, cur.goal.length, diverPos))

    const turnsRemaining = cur.turnsRemaining

    globals.goalArrows.forEach(a => a.visible = false)
    globals.goalCells.forEach(a => a.texture = PIXI.Texture.from('Plongeon_Case_Sombre.jpg'))

    cur.goal.forEach((goal, i) => {
      const goalArrow = globals.goalArrows[i]
      goalArrow.tint = 0xFFFFFF
      goalArrow.visible = true
      goalArrow.position.set(GOAL_X + GOAL_ARROW_GAP * i , GOAL_Y)
      goalArrow.rotation = ROTATIONS[goal]


      const goalCell = globals.goalCells[i]
      goalCell.visible = true


      if (cur.goal.length - turnsRemaining < i) {
        goalArrow.texture = PIXI.Texture.from('Plongeon_Fleche_Blanc.png')
        goalCell.texture = PIXI.Texture.from('Plongeon_Case_Sombre.jpg')
      } else if (cur.goal.length - turnsRemaining == i && !cur.resetting) {
        goalArrow.alpha = 1
        goalArrow.texture = PIXI.Texture.from('Plongeon_Fleche_Jaune.png')
        goalCell.texture = PIXI.Texture.from('Plongeon_Case_Jaune.jpg')
      } else if (cur.goal.length - turnsRemaining > i) {
        goalArrow.alpha = 1
        goalArrow.texture = PIXI.Texture.from('Plongeon_Fleche_Grise.png')
        goalCell.texture = PIXI.Texture.from('Plongeon_Case_Claire.jpg')
      }
    })

    const inputLayer = globals.playerInput
    inputLayer.removeChildren()

    for (let i = 0; i < 3; i++) {
      globals.playerInfo.scoreTexts[i].text = `P${i + 1}: 0`
      globals.playerInfo.comboTexts[i].text = '0'
      const playerInputs = cur.playerInputs[i]
      playerInputs.forEach((input, j) => {
        const inputArrow = this.createInputArrow(input)
        const y = lerp(diveStart, diveEnd, unlerp(0, cur.goal.length, j))
        inputArrow.position.set(DIVERS_X + DIVERS_HGAP * i + DIVERS_HGAP/2, y)

        if (input == cur.goal[j]) {
          inputArrow.tint = 0x00FF00
        } else {
          inputArrow.tint = 0xFF0000
        }
        inputLayer.addChild(inputArrow)

      })

      globals.playerInfo.scoreTexts[i].text = `P${i + 1}: ${cur.points[i]}`
      globals.playerInfo.comboTexts[i].text = `${cur.combo[i]}`

      let lastInput =  last(playerInputs) ?? 'D'
      const diver = globals.playerInfo.divers[i]
      diver.texture = PIXI.Texture.from(`Plongeon_Plongeur_${DIRECTION_NAMES[lastInput]}_${COLOUR_NAMES[i]}.png`)
      diver.scale.x = this.goalToXScale(lastInput)
      diver.rotation = lastInput === 'L' ? -Math.PI/2: lastInput === 'R' ? Math.PI/2 : 0
    }

  }

  createInputArrow (dir: string): PIXI.Sprite {
    const sprite = PIXI.Sprite.from('Plongeon_Fleche_Blanc.png')
    sprite.anchor.set(0.5)
    fit(sprite, INPUT_ARROW_SIZE, INPUT_ARROW_SIZE)
    sprite.rotation = ROTATIONS[dir]
    return sprite
  }

  goalToXScale(inputGoal: string) {
    return inputGoal === 'R' ? -1 : 1
  }

  updateMovables () {
    for (const m of this.movables) {
      const prev = m.getPos(this.previousData)
      const cur = m.getPos(this.currentData)

      let visible = true
      let alpha = 1
      if (prev && cur) {
        const pos = lerpPosition(prev, cur, this.progress)
        m.entity.position.copyFrom(pos)
      } else if (prev) {
        m.entity.position.copyFrom(prev)
        alpha = 1 - this.progress
      } else if (cur) {
        m.entity.position.copyFrom(cur)
        alpha = this.progress
      } else {
        visible = false
      }
      m.entity.visible = visible
      m.entity.alpha = alpha
    }
  }

  getSkaterPos (cellIdx: number, playerPosition: number) {
    const pos = { ...SKATERS_POSITIONS[cellIdx]}
    const normal = SKATE_NORMALS[cellIdx]
    const modifier = Math.abs(playerPosition - 2) * SKATER_GAP

    pos.x += normal.x * modifier
    pos.y += normal.y * modifier

    return pos
  }

  updateSkating(gameIdx: number) {
    const cur = this.currentData.minigames[gameIdx] as SkatingDto
    const prev = this.previousData.minigames[gameIdx] as SkatingDto

    const globals = this.globalData.gameGlobals[gameIdx] as SkatingGlobals

    const dirSource = this.progress === 1 ? cur : prev
    for (let i = 0; i < 4; i++) {
      if (cur.directions.length > 0) {
        globals.arrows[i].rotation = SKATE_ARROWS_ROTATIONS[dirSource.directions[i]]
        globals.arrows[i].alpha = 1
      } else {
        globals.arrows[i].alpha = 0
      }
    }

    for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
      let fromIdx = prev.positions[pIdx] % cur.length
      let toIdx = cur.positions[pIdx] % cur.length

      let fromPositionOnCell = prev.positionsOnCell[pIdx] * 0.5
      let toPositionOnCell = cur.positionsOnCell[pIdx] * 0.5

      if (toIdx < fromIdx) {
        toIdx += 10
      }

      if (cur.resetting) {
        fromIdx = toIdx
      }

      const n = lerp(fromIdx, toIdx, ease(this.progress))
      let lastIdx = Math.floor(n)
      let nextIdx = lastIdx

      let pos
      let rotation
      if (n > lastIdx) {
        nextIdx = lastIdx + 1
        const stepP = unlerp(lastIdx, nextIdx, n)
        const from = this.getSkaterPos(lastIdx % cur.length, lerp(fromPositionOnCell, toPositionOnCell, this.progress))
        const to = this.getSkaterPos(nextIdx % cur.length, lerp(fromPositionOnCell, toPositionOnCell, this.progress))
        pos = lerpPosition({x: from.x, y: from.y}, {x: to.x, y: to.y}, stepP)
        rotation = lerpAngle(from.rotation, to.rotation, stepP)
      } else {
        pos = this.getSkaterPos(lastIdx % cur.length, toPositionOnCell)
        rotation = pos.rotation
      }

      const skater = globals.skaters[pIdx]
      const risk = this.progress === 1 ? cur.risk : prev.risk
      let sprite
      if (risk[pIdx] < 0 || (cur.risk[pIdx] < 0 && this.progress >= 0.7)) {
        sprite = skater.fall
        rotation += Math.PI
        skater.roll.alpha = 0
      } else {
        sprite = skater.roll
        skater.fall.alpha = 0
      }
      sprite.alpha = 1
      sprite.x = pos.x
      sprite.y = pos.y
      sprite.rotation = rotation
    }

    globals.countdown.text = cur.timer.toString()
  }

  updateArchery(gameIdx: number) {
    const globals = this.globalData.gameGlobals[gameIdx] as ArcheryGlobals

    const prev = (this.currentData.previous.minigames[gameIdx] as ArcheryDto)
    const cur = (this.currentData.minigames[gameIdx] as ArcheryDto)

    globals.windText.text = (prev.wind.length > 0 ? prev.wind[0] : cur.wind[0]).toString()

    for (let pIdx = 0; pIdx < 3; ++pIdx) {
      const cursor = globals.cursors[pIdx]
      let from = prev.cursors[pIdx]
      let to = cur.cursors[pIdx]


      let pos = lerpPosition(
        {x: from[0], y: from[1]},
        {x: to[0], y: to[1]},
        unlerp(0, CURSOR_MOVE_END_P, this.progress)
      )
      cursor.position.copyFrom(toArcheryPos(pos.x, pos.y))


      const arrowTail = globals.arrowTails[pIdx]
      arrowTail.visible = false
      arrowTail.anchor.x = 0
      for (let arrowIdx = 0; arrowIdx < globals.arrowCount; ++arrowIdx) {
        if (this.currentData.arrows.length == arrowIdx + 1 && !cur.dead[pIdx]) {
          if (this.progress >= CURSOR_MOVE_END_P) {
            arrowTail.visible = true


            const pos = this.currentData.arrows[arrowIdx][pIdx]
            arrowTail.position.copyFrom(toArcheryPos(pos[0], pos[1]))
            const shakes = 5
            const shakeStop = 0.8
            const shakeForce = 0.05
            const shakeP = unlerp(CURSOR_MOVE_END_P, shakeStop, this.progress)
            if (this.progress < shakeStop ) {
              const shakeIndex = Math.floor(shakeP * shakes)
              arrowTail.anchor.x = (shakeIndex % 2 == 0 ? shakeForce : -shakeForce) / (shakeIndex+1)
            }
          }
        }
      }
    }

    globals.countdown.text = cur.wind.length.toString()
  }

  resetEffects () {
    for (const type in this.pool) {
      for (const effect of this.pool[type]) {
        effect.display.visible = false
        effect.busy = false
      }
    }
  }

  animateRotation (sprite: PIXI.Sprite, rotation: number) {
    if (sprite.rotation !== rotation) {
      const eps = 0.02
      let r = lerpAngle(sprite.rotation, rotation, 0.133)
      if (angleDiff(r, rotation) < eps) {
        r = rotation
      }
      sprite.rotation = r
    }
  }



  animateScene (delta: number) {
    this.time += delta

    const waterInterval = 2000
    if (this.water != null) {
      this.waterTime += delta
      if (this.waterTime > waterInterval) {
        this.waterTime -= waterInterval
        this.water.tilePosition.x+=80
      }
    }
  }

  asLayer (func: ContainerConsumer): PIXI.Container {
    const layer = new PIXI.Container()
    func.bind(this)(layer)
    return layer
  }

  reinitScene (container: PIXI.Container, canvasData: CanvasInfo) {
    this.time = 0
    this.oversampling = canvasData.oversampling
    this.container = container
    this.pool = {}
    this.canvasData = canvasData

    this.movables = []

    const tooltipLayer = this.tooltipManager.reinit()
    tooltipLayer.interactiveChildren = false

    const hud = this.asLayer(this.initHUD)

    const games = new PIXI.Container()

    const foreground = PIXI.Sprite.from('Background.png')
    foreground.width = WIDTH
    foreground.height = HEIGHT

    const miniRankings = this.initRankings()
    for (let i = 0; i < this.globalData.gameTypes.length; ++i) {
      const gameType = this.globalData.gameTypes[i]

      let gameLayer
      if (gameType === 'archery') {
        gameLayer = this.asLayer(this.initArchery(i))
      }
      if (gameType === 'diving') {
        gameLayer = this.asLayer(this.initDiving(i))
      }
      if (gameType === 'hurdles') {
        gameLayer = this.asLayer(this.initHurdles(i))
      }
      if (gameType === 'skating') {
        gameLayer = this.asLayer(this.initSkating(i))
      }
      games.addChild(gameLayer)
      gameLayer.addChild(miniRankings[i].container)
      gameLayer.x = MINIGAME_POS[i].x
      gameLayer.y = MINIGAME_POS[i].y
      gameLayer.rotation = MINIGAME_POS[i].rotation
      gameLayer.scale.set(MINIGAME_POS[i].width / MINIGAME_WIDTH)
    }

    container.addChild(games)
    container.addChild(foreground)
    container.addChild(hud)
    container.addChild(tooltipLayer)

    container.interactive = true
    container.on('mousemove', (event) => {
      this.tooltipManager.moveTooltip(event)
    })

    if (this.globalData.gameTypes.length === 1) {
      games.scale.set(1.8)
      foreground.scale.set(1.8)
    }
  }

  initRankings() {
    const w = MINIGAME_WIDTH
    const h = MINIGAME_HEIGHT
    this.miniRankings = []


    for (let i = 0; i < this.globalData.gameTypes.length; ++i) {
      const container = new PIXI.Container()

      const veil = new PIXI.Graphics()
      veil.beginFill(0x000000, 0.5)
      veil.drawRect(0, 0, w, h)
      veil.endFill()
      container.addChild(veil)

      const background = PIXI.Sprite.from('Panneau_Ranking.png')
      background.x = MINIGAME_WIDTH / 2 - MINIGAME_RANKING_WIDTH / 2
      background.y = MINIGAME_HEIGHT / 2 - MINIGAME_RANKING_HEIGHT / 2
      container.addChild(background)

      const lines: MinigameRankingLine[] = []

      for (let i = 0; i < 3; i++) {
        const lineContainer = new PIXI.Container()
        lineContainer.x = MINIGAME_RANKING_LINE_X
        lineContainer.y = MINIGAME_RANKING_LINE_YS[i]
        lineContainer.width = MINIGAME_RANKING_LINE_WIDTH
        lineContainer.height = MINIGAME_RANKING_LINE_WIDTH
        background.addChild(lineContainer)

        const avatars = []
        for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
          const avatar = PIXI.AnimatedSprite.fromFrames(MINIGAME_RANKING_AVATARS[pIdx])
          avatar.loop = true
          avatar.play()
          avatar.anchor.set(0.6)
          avatar.anchor.set(0.5)
          avatar.x = MINIGAME_RANKING_LINE_WIDTH / 3
          avatar.y = MINIGAME_RANKING_LINE_HEIGHT / 2
          avatar.visible = false
          lineContainer.addChild(avatar)
          avatars.push(avatar)
        }

        const medals = []
        for (let j = 0; j < 3; j++) {
          const medal = PIXI.Sprite.from(MINIGAME_RANKING_MEDALS[j])
          medal.anchor.set(0.5)
          medal.x = 2 * MINIGAME_RANKING_LINE_WIDTH / 3
          medal.y = MINIGAME_RANKING_LINE_HEIGHT / 2
          medal.visible = false
          lineContainer.addChild(medal)
          medals.push(medal)
        }

        lines.push({avatars, medals})
      }

      this.miniRankings.push({container, lines})
    }
    return this.miniRankings
  }

  initHUD(layer: PIXI.Container) {

    this.scoreTexts = []
    this.medalTexts = []

    for (const player of this.globalData.players) {
      const behind = new PIXI.Sprite(PIXI.Texture.WHITE)
      fit(behind, HUD_AVATAR_SIZE, HUD_AVATAR_SIZE)
      behind.tint = 0x000000
      behind.x = HUD_AVATAR_XS[player.index]
      behind.y = HUD_AVATAR_Y
      layer.addChild(behind)

      const avatar = new PIXI.Sprite(player.avatar)
      fit(avatar, HUD_AVATAR_SIZE, HUD_AVATAR_SIZE)
      avatar.x = HUD_AVATAR_XS[player.index]
      avatar.y = HUD_AVATAR_Y
      layer.addChild(avatar)
    }

    const hudFrame = PIXI.Sprite.from('HUD.png')
    hudFrame.y = HEIGHT
    hudFrame.anchor.y = 1
    layer.addChild(hudFrame)

    this.registerTooltip(hudFrame, (x) => {
      let player = -1
      if (x >= HUD_NAME_X && x < HUD_H_SEP - HUD_RIGHT_BAR_SIZE) {
        player = 0
      } else if (x >= HUD_NAME_X + HUD_H_SEP && x < HUD_H_SEP * 2 - HUD_RIGHT_BAR_SIZE) {
        player = 1
      } else if (x >= HUD_NAME_X + HUD_H_SEP * 2 && x < HUD_H_SEP * 3 - HUD_RIGHT_BAR_SIZE) {
        player = 2
      }
      if (player === -1) {
        return null
      }
      const data = this.progress === 1 ? this.currentData : this.previousData
      const detailedMedals = data.detailedMedals[player]
      const res = []

      const league1 = this.globalData.gameTypes.length === 1
      const league2 = !league1 && this.globalData.gameTypes[1] === 'hurdles'
      for (let i = 0; i < this.globalData.gameTypes.length; i++) {
        if (league1) {
          res.push(`${detailedMedals[i][0]}🥇 ${detailedMedals[i][1]}🥈 ${detailedMedals[i][2]}🥉`)
        } else if (league2) {
          res.push(`Game ${i+1}: ${detailedMedals[i][0]}🥇 ${detailedMedals[i][1]}🥈 ${detailedMedals[i][2]}🥉`)
        } else {
          res.push(`${this.globalData.gameTypes[i].padEnd(7)}: ${detailedMedals[i][0]}🥇 ${detailedMedals[i][1]}🥈 ${detailedMedals[i][2]}🥉`)
        }
      }
      return res.join('\n')
    })

    for (const player of this.globalData.players) {
      const name = new PIXI.BitmapText(player.name.replace(/é/g, 'e'), {fontSize: HUD_NAME_H, fontName: 'Dogica'})
      fit(name, HUD_NAME_W, HUD_NAME_H)
      name.x = HUD_NAME_X + HUD_H_SEP * player.index
      name.y = HUD_NAME_Y

      const medalCounts: PIXI.BitmapText[] = []

      for (let k = 0; k < 3; k++) {
        const medalCount = new PIXI.BitmapText('00', {fontSize: HUD_MEDAL_H, fontName: 'Dogica'})
        medalCount.tint = player.color
        medalCount.x = HUD_MEDAL_X + HUD_H_SEP * player.index + HUD_MEDAL_SEP * k
        medalCount.y = HUD_MEDAL_Y
        fit(medalCount, HUD_MEDAL_W, HUD_MEDAL_H)
        medalCounts.push(medalCount)

        layer.addChild(medalCount)
      }

      const score = new PIXI.BitmapText('0000', {fontSize: HUD_SCORE_H, fontName: 'Dogica'})
      score.tint = player.color

      score.x = HUD_SCORE_X + HUD_H_SEP * player.index
      score.y = HUD_SCORE_Y + HUD_SCORE_FONT_BASELINE_OFFSET

      // Centre score
      score.x += HUD_SCORE_W / 2
      ;(score.anchor as PIXI.Point).x = 0.5

      this.medalTexts.push(medalCounts)
      this.scoreTexts.push(score)

      layer.addChild(name)
      layer.addChild(score)
    }
  }

  initDiving(gameIdx: number) { return (layer:PIXI.Container) => {
    const globals = this.globalData.gameGlobals[gameIdx] as DivingGlobals
    const TEXT_VGAP = 36
    const TEXT_X = 28
    const TEXT_Y = 154
    const COMBO_OFFSET_X = 2

    const texts = []
    const divers = []
    const comboTexts = []
    const background = PIXI.Sprite.from('Plongeon_Background.jpg')

    fit(background, MINIGAME_WIDTH, MINIGAME_HEIGHT)

    const water = new PIXI.TilingSprite(PIXI.Texture.from('Plongeon_Eau.png'), MINIGAME_WIDTH, WATER_TILE_HEIGHT)
    water.position.set(0, MINIGAME_HEIGHT)
    water.tilePosition.set(0, 0)
    water.anchor.y = 1
    this.water = water

    const diverLayer = new PIXI.Container()
    const textLayer = new PIXI.Container()

    for (let i = 0; i < this.globalData.playerCount; i++) {
      const text = new PIXI.BitmapText(`P${i+1}: 000`, {fontSize: 20, fontName: 'Dogica'})
      text.tint = this.globalData.players[i].color
      text.position.set(TEXT_X, TEXT_Y + TEXT_VGAP * i)
      textLayer.addChild(text)
      texts.push(text)


      const combo = new PIXI.BitmapText('0', {fontSize: 20, fontName: 'Dogica'});
      (combo.anchor as PIXI.Point).set(0.5)
      combo.position.set(COMBO_OFFSET_X + DIVERS_X + DIVERS_HGAP * i, -50)
      comboTexts.push(combo)

      const diver = PIXI.Sprite.from(DIVERS[i])
      diver.anchor.set(0.5)
      diver.position.set(DIVERS_X + DIVERS_HGAP * i, 0)
      divers.push(diver)

      diverLayer.addChild(combo)
      diverLayer.addChild(diver)
    }
    const goalCellLayer = new PIXI.Container()
    const goalArrowLayer = new PIXI.Container()
    const playerInputLayer = new PIXI.Container()
    const goalArrows: PIXI.Sprite[] = []
    const goalCells: PIXI.Sprite[] = []
    for (let k = 0; k < 15; k++) {
      const goalCell = PIXI.Sprite.from('Plongeon_Case_Sombre.jpg')
      goalCell.anchor.set(0.5)
      goalCell.position.set(GOAL_X + GOAL_ARROW_GAP * k , GOAL_Y)
      goalCellLayer.addChild(goalCell)
      goalCells.push(goalCell)

      const goalArrow = PIXI.Sprite.from('Plongeon_Fleche_Blanc.png')
      goalArrow.anchor.set(0.5)
      goalArrowLayer.addChild(goalArrow)
      goalArrows.push(goalArrow)
    }

    layer.addChild(background)
    layer.addChild(goalCellLayer)
    layer.addChild(goalArrowLayer)
    layer.addChild(playerInputLayer)
    layer.addChild(diverLayer)
    layer.addChild(water)
    layer.addChild(textLayer)

    globals.divingContainer= layer

    globals.playerInfo = {
      diverLayer,
      scoreTexts: texts,
      divers,
      comboTexts
    }

    globals.playerInput = playerInputLayer
    globals.goalArrows = goalArrows
    globals.goalCells = goalCells

  }}

  initHurdles(gameIdx: number) { return (layer: PIXI.Container) => {
    const globals = this.globalData.gameGlobals[gameIdx] as HurdlesGlobals
    const raceLength = globals.hurdleRaceLength
    globals.lanes = []
    globals.runners = []

    const gameLayer = new PIXI.Container()
    const background = PIXI.Sprite.from('Courses_Background.jpg')

    for (let i = 0; i < this.globalData.playerCount; ++i) {
      const lane = new PIXI.Container()
      const hurdles = []
      for (let k = 0; k < raceLength; ++k) {
        if (k < raceLength - 1) {
          const hurdle = PIXI.Sprite.from('Courses_Haie.png')
          hurdle.anchor.set(0.5, 1)
          hurdle.position.set(k*HURDLE_TILE_WIDTH + HURDLE_TILE_WIDTH/2, 0)
          lane.addChild(hurdle)
          hurdles.push(hurdle)
        }
      }
      lane.y = HURDLE_TRACK_YS[i]
      lane.x = HURDLE_TRACK_X
      globals.lanes.push(hurdles)
      gameLayer.addChild(lane)
    }

    for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
      const runner = PIXI.Sprite.from(RUNNERS[pIdx].run)
      runner.anchor.y = 1
      gameLayer.addChild(runner)
      globals.runners.push(runner)
    }
    layer.addChild(background)
    layer.addChild(gameLayer)
  }}

  initSkating(gameIdx: number) { return (layer: PIXI.Container) => {
    const globals = this.globalData.gameGlobals[gameIdx] as SkatingGlobals

    globals.skaters  = []

    const background = PIXI.Sprite.from('Rollers_Background.jpg')
    fit(background, MINIGAME_WIDTH, MINIGAME_HEIGHT)
    layer.addChild(background)

    const rollingLayer = new PIXI.Container()
    const falledLayer = new PIXI.Container()
    for (let pIdx = 0; pIdx < this.globalData.playerCount; ++pIdx) {
      const skaterRoll = PIXI.Sprite.from(SKATERS[pIdx].roll)
      skaterRoll.anchor.set(0.5)
      rollingLayer.addChild(skaterRoll)

      const skaterFall = PIXI.Sprite.from(SKATERS[pIdx].fall)
      skaterFall.anchor.set(0.5)
      skaterFall.alpha = 0
      falledLayer.addChild(skaterFall)
      globals.skaters.push({roll: skaterRoll, fall: skaterFall})
    }

    layer.addChild(falledLayer)
    layer.addChild(rollingLayer)

    globals.arrows = []
    const arrowsContainer = new PIXI.Container()
    layer.addChild(arrowsContainer)

    for (let i = 0; i < 4; i++) {
      const arrow = PIXI.Sprite.from('Plongeon_Fleche_Blanc.png')
      fit(arrow, SKATE_ARROWS_WIDTH, SKATE_ARROWS_WIDTH)
      arrow.anchor.set(0.5)
      arrow.x = SKATE_ARROWS_XS[i]
      arrow.y = MINIGAME_HEIGHT / 2
      arrowsContainer.addChild(arrow)
      globals.arrows.push(arrow)
    }

    const countdown = new PIXI.BitmapText('0', {fontName: 'Dogica', fontSize: 54})
    countdown.x = SKATING_COUNTDOWN_X
    countdown.y = SKATING_COUNTDOWN_Y
    globals.countdown = countdown

    layer.addChild(countdown)
  }}

  initArchery(gameIdx: number) { return (layer: PIXI.Container) => {
    const globals = this.globalData.gameGlobals[gameIdx] as ArcheryGlobals

    const target = PIXI.Sprite.from('Cible_Background_2.jpg')
    target.anchor.set(0.5)
    target.position.set(MINIGAME_WIDTH / 2, MINIGAME_HEIGHT / 2)
    fit(target, MINIGAME_WIDTH, MINIGAME_HEIGHT)



    globals.cursors = []
    globals.arrowTails = []

    const cursorLayer = new PIXI.Container()
    for (let pIdx = 0; pIdx < 3; ++pIdx) {
      let cursor = PIXI.Sprite.from(`crosshair${pIdx}.png`)
      cursor.anchor.set(0.5)
      globals.cursors.push(cursor)
      cursor.position.copyFrom(target)
      cursorLayer.addChild(cursor)
    }

    const arrowTailLayer = new PIXI.Container()

    let playerArrowTails = []
    for (let pIdx = 0; pIdx < 3; ++pIdx) {
      const arrowTail = PIXI.Sprite.from(ARROW_TAILS[pIdx])
      arrowTail.anchor.copyFrom(ARROW_TAIL_ANCHORS[pIdx])
      playerArrowTails.push(arrowTail)

      arrowTailLayer.addChild(arrowTail)
    }
    globals.arrowTails = playerArrowTails

    const windText = new PIXI.BitmapText('0', {fontName: 'Dogica', fontSize: 54})
    windText.tint = 0x0;
    (windText.anchor as PIXI.Point).set(0.5)
    windText.position.set(WIND_X, WIND_Y)
    globals.windText = windText

    const countdown = new PIXI.BitmapText('0', {fontName: 'Dogica', fontSize: 54})
    countdown.x = ARCHERY_COUNTDOWN_X
    countdown.y = ARCHERY_COUNTDOWN_Y
    globals.countdown = countdown

    layer.addChild(target)
    layer.addChild(cursorLayer)
    layer.addChild(arrowTailLayer)
    layer.addChild(windText)
    layer.addChild(countdown)
  }}

  easeOutElastic (x: number): number {
    const c4 = (2 * Math.PI) / 3

    return x === 0
      ? 0
      : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
  }

  handleGlobalData (players: PlayerInfo[], raw: string): void {
    const globalData = parseGlobalData(raw)
    api.options.meInGame = !!players.find(p => p.isMe)

    const gameGlobals = []
    for (let i = 0; i < globalData.gameTypes.length; ++i) {
      // For now, just push an any object
      gameGlobals.push({})
    }

    this.globalData = {
      ...globalData,
      players: players,
      playerCount: players.length,
      gameGlobals: gameGlobals as GameGlobals[]
    }
  }

  isPositionUsed(positionsUsedByCell, firstCell, lastCell, positionOnCell, totalLength) {
    if (firstCell > lastCell) {
      lastCell += 10
    }
    for (let i = firstCell; i <= lastCell; i++) {
      if (positionsUsedByCell[i % totalLength] == null) {
        continue
      }
      if (positionsUsedByCell[i % totalLength][positionOnCell]) {
        return true
      }
    }
    return false
  }

  sortPositionsOnCell (positionsOnCell, prevPositionOnCell) {
    return positionsOnCell.sort((a, b) => {
      const diff = Math.abs(a - prevPositionOnCell) - Math.abs(b - prevPositionOnCell)
      if (diff == 0) {
        return -1
      }
      return diff
    })
  }

  handleFrameData (frameInfo: FrameInfo, raw: string): FrameData {
    const dto = parseData(raw, this.globalData)
    const frameData: FrameData = {
      ...dto,
      previous: null,
      frameInfo,
      arrows: []
    }
    frameData.previous = last(this.states) ?? frameData

    for (let i = 0; i < frameData.minigames.length; ++i) {
      if (frameData.rankings[i] == null && frameData.previous.rankings[i] != null) {
        frameData.rankings[i] = [ ...frameData.previous.rankings[i]]
      }
    }


    for (let i = 0; i < this.globalData.gameTypes.length; ++i) {
      const gameType = this.globalData.gameTypes[i]

      if (gameType === 'hurdles') {
        const hurdle = frameData.minigames[i] as HurdlesDto
        const globals = this.globalData.gameGlobals[i] as HurdlesGlobals
        globals.hurdleRaceLength = hurdle.map.length
      }

      if (gameType === 'archery') {
        const archery = frameData.minigames[i] as ArcheryDto
        if (archery.arrows) {
          frameData.arrows = [...last(this.states)?.arrows ?? []]
          frameData.arrows.push([...archery.cursors])
          const globals = this.globalData.gameGlobals[i] as ArcheryGlobals
          globals.arrowCount = (globals.arrowCount ?? 0) + 1
        }
      }
      if (gameType === 'diving') {
        const diving = frameData.minigames[i] as DivingDto
        const previousDiving = frameData.previous.minigames[i] as DivingDto
        if (!diving.resetting) {
          diving.goal = previousDiving.goal
        }
      }
      if (gameType == 'skating') {
        const skating = frameData.minigames[i] as SkatingDto

        if (skating.resetting) {
          skating.positionsOnCell = [0, 2, 4]
        } else {
          const previousSkating = frameData.previous.minigames[i] as SkatingDto

          const positionsOnCell = [-1, -1, -1]
          const positionsUsedByCell = {}
          const skatersByCell = {}
          const previousSkaterPos = []
          for (let pIdx = 0; pIdx < 3; ++pIdx) {
            const pos = skating.positions[pIdx] % skating.length
            const prevPos = previousSkating.positions[pIdx] % skating.length
            const prevPosOnCell = previousSkating.positionsOnCell[pIdx]

            if (positionsUsedByCell[pos] == null) {
              positionsUsedByCell[pos] = [false, false, false, false, false]
            }
            if (skatersByCell[pos] == null) {
              skatersByCell[pos] = 0
            }

            if (pos == prevPos && prevPosOnCell != null) {
              positionsOnCell[pIdx] = prevPosOnCell
              positionsUsedByCell[pos][prevPosOnCell] = true
            }
            skatersByCell[pos]++

            previousSkaterPos.push({id: pIdx, pos: prevPosOnCell})
          }

          previousSkaterPos.sort((a, b) => b.pos - a.pos)

          for (let pIdx of previousSkaterPos.map(p => p.id)) {
            const pos = skating.positions[pIdx] % skating.length
            const prevPos = previousSkating.positions[pIdx] % skating.length
            if (positionsOnCell[pIdx] == -1) {
              let targetPositions = skatersByCell[pos] == 1 ? [2] : skatersByCell[pos] == 2 ? [1, 3] : [0, 2, 4]
              targetPositions = this.sortPositionsOnCell(targetPositions, previousSkating.positionsOnCell[pIdx])

              // fallback to any available position (prioritize center)
              targetPositions.push(...this.sortPositionsOnCell([2, 1, 3, 0, 4], previousSkating.positionsOnCell[pIdx]))

              // find a position that is not used by any other skater (and not overlapping with another skater)
              for (let targetPos of targetPositions) {
                let validPos = !this.isPositionUsed(positionsUsedByCell, prevPos, pos, targetPos, skating.length)
                if (targetPos < 4 && this.isPositionUsed(positionsUsedByCell, prevPos, pos, targetPos + 1, skating.length))
                  validPos = false
                if (targetPos > 0 && this.isPositionUsed(positionsUsedByCell, prevPos, pos, targetPos - 1, skating.length))
                  validPos = false
                if (validPos) {
                  positionsOnCell[pIdx] = targetPos
                  positionsUsedByCell[pos][targetPos] = true
                  break
                }
              }

              // if not found, fallback to a not used position
              if (positionsOnCell[pIdx] == -1) {
                for (let targetPos of targetPositions) {
                  if (!this.isPositionUsed(positionsUsedByCell, prevPos, pos, targetPos, skating.length)) {
                    positionsOnCell[pIdx] = targetPos
                    positionsUsedByCell[pos][targetPos] = true
                    break
                  }
                }
              }

            }
          }

          skating.positionsOnCell = [...positionsOnCell]
        }
      }
    }
    this.states.push(frameData)
    return frameData
  }
}


function toArcheryPos(x: number, y: number) {
  const maxCoordWithinScreen = 20
  const centreOffset = {
    x: 98,
    y: 2
  }
  let gx = unlerpUnclamped(-maxCoordWithinScreen, maxCoordWithinScreen, x)
  let gy = unlerpUnclamped(-maxCoordWithinScreen, maxCoordWithinScreen, y)

  const lowerBound = -MINIGAME_HEIGHT / 2 + maxCoordWithinScreen
  const upperBound = MINIGAME_HEIGHT / 2 - maxCoordWithinScreen

  const centreX = MINIGAME_WIDTH / 2 + centreOffset.x
  const centreY = MINIGAME_HEIGHT / 2 + centreOffset.y
  return {
    x: centreX + lerp(lowerBound, upperBound, gx),
    y: centreY + lerp(lowerBound, upperBound, gy)
  }
}