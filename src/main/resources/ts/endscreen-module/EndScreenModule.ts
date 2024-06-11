import { WIDTH, HEIGHT } from '../core/constants.js'
import { lerp, unlerp, fitAspectRatio } from '../core/utils.js'
import { PlayerInfo } from '../types.js';
import { getRenderer, flagForDestructionOnReinit } from '../core/rendering.js'
import { Texture } from 'pixi.js';
import { MINIGAME_RANKING_MEDALS } from '../graphics/assetConstants.js';
import { fit } from '../graphics/utils.js';

/* global PIXI */

const FINISHER_HEIGHT = 80
const FINISHER_PADDING = 10
const AVATAR_SIZE = FINISHER_HEIGHT / 2
const NAME_BAR_WIDTH = FINISHER_HEIGHT * 6

interface GlobalData {
  players: PlayerInfo[];
  playerCount: number;
}

interface EndLayer extends PIXI.Container {
  veil: PIXI.Container;
  titleRanking: PIXI.Container;
  
}

interface PodiumData {
  score: number;
  medals: number[];
  player: PlayerInfo;
  rank: number;
}

interface Finisher {
  layer: PIXI.Container;
  background: PIXI.Graphics;
}

export class EndScreenModule {
  scores: number[]
  medals: number[][]
  globalData: GlobalData
  atEnd: boolean
  displayedText: string
  container: PIXI.Container
  endLayer: EndLayer
  animationEnded: boolean
  endTime: number
  targetTitleScale: number
  rankingTable: PIXI.Sprite
  medalIconLayer: PIXI.Container
  
  constructor () {
    this.scores = []
    this.atEnd = false
  }

  static get moduleName () {
    return 'endScreen'
  }

  updateScene (previousData, currentData, progress) {
    if (currentData.end && progress === 1) {
      this.atEnd = true
    } else {
      this.atEnd = false
    }
  }

  handleFrameData (frameInfo, data) {
    let scores = null
    let medals = null
    
    if (data) {
      scores = data[0]
      medals = data[1]
        
      if (scores) {
        this.scores = scores
        this.medals = medals
      }
    }
    return {
      ...frameInfo,
      end: scores != null
    }
  }

  reinitScene (container, canvasData) {
    this.container = container
    this.endLayer = this.createEndScene()
    if (this.atEnd) {
      this.initEndScene()
    }
    this.container.addChild(this.endLayer)
  }

  animateScene (delta) {
    const step = Math.min(32, delta)

    if (this.atEnd) {
      if (!this.animationEnded) {
        this.renderEndScene(step)
      }
    } else {
      if (this.endTime > 0) {
        this.destroyEndScene()
      }
      this.endTime = 0
    }
  }

  destroyEndScene () {
    this.animationEnded = false
    this.endLayer.visible = false
  }

  initEndScene () {
    this.animationEnded = false
    this.endLayer.visible = true
  }

  renderEndScene (step) {
    const END_DURATION = 2000
    
    if (this.endTime === 0) {
      this.initEndScene()
    }

    var backS = 0
    var backD = 400/2000 * END_DURATION
    var backP = unlerp(backS, backS + backD, this.endTime)
    this.endLayer.veil.alpha = backP * 0.9

    var logoS = 400/2000 * END_DURATION
    var logoD = 600/2000 * END_DURATION
    var logoP = unlerp(logoS, logoS + logoD, this.endTime)

    this.endLayer.titleRanking.scale.set(lerp(this.targetTitleScale * 10, this.targetTitleScale, logoP))
    this.endLayer.titleRanking.visible = !!logoP

    var rankS = 1000/2000 * END_DURATION
    var rankD = 300/2000 * END_DURATION
    
    var p = unlerp(rankS, rankS + rankD, this.endTime)

    this.rankingTable.alpha = p

    this.endTime += step

    if (this.endTime >= END_DURATION) {
      this.animationEnded = true
      
    }
  }

  handleGlobalData (players, globalData) {
    this.globalData = {
      players: players,
      playerCount: players.length
    }
  }

  fitTextInWidth (text, width) {
    let currText = text.text
    while (text.width > width) {
      currText = currText.slice(0, -1)
      text.text = currText + '...'
    }
  }

  generateText (text: string, size: number, align: string, color: string|number, maxWidth: number = null) {
    var textEl
    textEl = new PIXI.Text(text, {
      fontSize: Math.round(size / 1.2) + 'px',
      fontFamily: 'Sans, Sans-Serif',
      fontWeight: 'bold',
      fill: color
    })
    textEl.lineHeight = Math.round(size / 1.2)
    if (align === 'right') {
      textEl.anchor.x = 1
    } else if (align === 'center') {
      textEl.anchor.x = 0.5
    }
    if (maxWidth !== null) {
      this.fitTextInWidth(textEl, maxWidth)
    }

    return textEl
  }

  createFinisher (finisher: PodiumData): Finisher {

    var layer = new PIXI.Container()
    const textColor = finisher.rank === 1 ? 0xFFFFFF : 0x000000
    const frameColor = finisher.rank === 1 ? 0x10ad42 : 0xFFFFFF

    let cursorX = 0
    const g = new PIXI.Graphics()
    // Rank
    g.beginFill(frameColor, 1)
    g.drawRect(cursorX, 0, FINISHER_HEIGHT, FINISHER_HEIGHT)
    g.endFill()
    const rankText = this.generateText(finisher.rank.toString(), 40, 'center', textColor, FINISHER_HEIGHT)
    rankText.anchor.set(0.5)
    rankText.position.set(FINISHER_HEIGHT/ 2, FINISHER_HEIGHT/ 2)

    cursorX += FINISHER_HEIGHT + FINISHER_PADDING

    // Avatar & Name (flag and country)
    g.beginFill(frameColor, 1)
    g.drawRect(cursorX, 0, NAME_BAR_WIDTH, FINISHER_HEIGHT)
    g.endFill()
    const avatar = PIXI.Sprite.from(finisher.player.avatar)
    avatar.scale.set(fitAspectRatio(avatar.texture.width, avatar.texture.height, AVATAR_SIZE, AVATAR_SIZE))
    avatar.anchor.set(0, 0.5)
    avatar.position.set(cursorX + AVATAR_SIZE / 2, FINISHER_HEIGHT / 2)
    
    const usernameText = this.generateText(finisher.player.name, 40, 'left', textColor, NAME_BAR_WIDTH - cursorX - AVATAR_SIZE / 2)
    usernameText.anchor.set(0, 0.5)
    usernameText.position.set(cursorX + AVATAR_SIZE * 2, FINISHER_HEIGHT/ 2)

    cursorX += FINISHER_HEIGHT * 6 + FINISHER_PADDING

    const medalTextLayer = new PIXI.Container()
    // Medals
    for (let i = 0; i < 3; ++i) {
      g.beginFill(frameColor, 1)
      g.drawRect(cursorX, 0, FINISHER_HEIGHT, FINISHER_HEIGHT)
      g.endFill()
      const medalText = this.generateText(finisher.medals[i].toString(), 40, 'center', textColor, FINISHER_HEIGHT)
      medalText.anchor.set(0.5)
      medalText.position.set(cursorX + FINISHER_HEIGHT / 2, FINISHER_HEIGHT / 2)
      medalTextLayer.addChild(medalText)

      cursorX += FINISHER_HEIGHT + FINISHER_PADDING
    }

    // Score
    const box = new PIXI.Sprite(PIXI.Texture.WHITE)
    box.tint = 0xfde000
    box.height = FINISHER_HEIGHT
    box.width = FINISHER_HEIGHT * 2
    box.position.x = cursorX
    const scoreText = this.generateText(finisher.score.toString(), 40, 'center', 0x0, FINISHER_HEIGHT * 2)
    scoreText.anchor.set(0.5)
    scoreText.position.set(cursorX + FINISHER_HEIGHT, FINISHER_HEIGHT / 2)


    layer.addChild(g)
    layer.addChild(box)
    layer.addChild(rankText)
    layer.addChild(avatar)
    layer.addChild(usernameText)
    layer.addChild(medalTextLayer)
    layer.addChild(scoreText)

    return {
      layer,
      background: g
    }
  }

  createEndScene (): EndLayer {
    const layer = new PIXI.Container() as EndLayer

    const background = new PIXI.Graphics()
    background.beginFill(0, 0.85)
    background.drawRect(0, 0, WIDTH, HEIGHT)
    background.endFill()

    layer.veil = background

    const logo = PIXI.Sprite.from('logo.png')
    
    this.targetTitleScale = fitAspectRatio(logo.texture.width, logo.texture.height, 2 * WIDTH / 3, HEIGHT / 4)
    logo.anchor.x = logo.anchor.y = 0.5
    layer.titleRanking = logo

    logo.position.x = WIDTH / 2
    logo.position.y = 230

    const RANKING_Y = 400

    const podium: PodiumData[] = []
    for (let i = 0; i < this.globalData.playerCount; ++i) {
      podium.push({
        score: this.scores[i],
        medals: this.medals[i],
        player: this.globalData.players[i],
        rank: 0
      })
    }
    podium.sort(function (a, b) {
      return b.score - a.score
    })

    const finishers: Finisher[] = []
    const finisherLayer = new PIXI.Container()

    const medalIconLayer = new PIXI.Container()

    medalIconLayer.x = FINISHER_HEIGHT + FINISHER_PADDING + NAME_BAR_WIDTH + FINISHER_PADDING + FINISHER_HEIGHT / 2
    medalIconLayer.y = RANKING_Y
    
    for (let i = 0; i < 3; ++i) {
      const medal = PIXI.Sprite.from(MINIGAME_RANKING_MEDALS[i])
      medal.anchor.set(0.5)
      medal.position.set(i * (FINISHER_HEIGHT+FINISHER_PADDING), FINISHER_HEIGHT / 2)
      fit(medal, FINISHER_HEIGHT, FINISHER_HEIGHT)
      medalIconLayer.addChild(medal)
    }

    for (let i = 0; i < podium.length; ++i) {
      podium[i].rank = podium.filter(p => p.score > podium[i].score).length + 1
      let elem = this.createFinisher(podium[i])
      finisherLayer.addChild(elem.layer)
      finishers.push(elem)
    }

    
    const maxFinisherWidth = Math.max(...finishers.map(f => f.layer.width))
    const RANKING_X = (WIDTH - maxFinisherWidth) / 2
    for (let i = 0; i < finishers.length; ++i) {
      finishers[i].layer.position.x = (WIDTH - maxFinisherWidth) / 2
      finishers[i].layer.position.y = i * (FINISHER_PADDING + FINISHER_HEIGHT)
    }

    medalIconLayer.x += RANKING_X
    
    finisherLayer.y = RANKING_Y + FINISHER_HEIGHT + FINISHER_PADDING

    const buffer = new PIXI.Container()
    buffer.addChild(medalIconLayer)
    buffer.addChild(finisherLayer)

    const bounds = buffer.getBounds()
    const texture = PIXI.RenderTexture.create({
      width: buffer.width+1,
      height: buffer.height+1
    })
    
    buffer.x = -bounds.x
    buffer.y = -bounds.y

    getRenderer().render(buffer, texture)
    flagForDestructionOnReinit(texture)

    const rankingTable = new PIXI.Sprite(texture)
    this.rankingTable = rankingTable
    rankingTable.x = bounds.x
    rankingTable.y = bounds.y

    layer.addChild(background)
    layer.addChild(rankingTable)
    layer.addChild(logo)

    layer.visible = false
    return layer
  }
}
