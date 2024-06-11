export type ContainerConsumer = (layer: PIXI.Container) => void

/**
 * Given by the SDK
 */
export interface FrameInfo {
  number: number
  frameDuration: number
  date: number
}
/**
 * Given by the SDK
 */
export interface CanvasInfo {
  width: number
  height: number
  oversampling: number
}
/**
 * Given by the SDK
 */
export interface PlayerInfo {
  name: string
  avatar: PIXI.Texture
  color: number
  index: number
  isMe: boolean
  number: number
  type?: string
}

export interface PlayerDto {
  message: string
}

export interface FrameDataDTO {
  minigames: MinigameDto[]
  rankings: Record<number, number[]>
  scores: number[]
  medals: number[][]
  detailedMedals: number[][][]
}

export interface FrameData extends FrameDataDTO {
  previous: FrameData
  frameInfo: FrameInfo
  arrows: number[][][]
}

export type GlobalDataDTO = {
  gameTypes: GameType[]
}

export interface Effect {
  busy: boolean
  display: PIXI.DisplayObject
}

export interface SkatingGlobals {
    countdown: PIXI.BitmapText
    skaters: {
      roll: PIXI.Sprite
      fall: PIXI.Sprite
    }[]
    arrows: PIXI.Sprite[]
  }
export interface ArcheryGlobals {
    countdown: PIXI.BitmapText
    windText: PIXI.BitmapText
    cursors: PIXI.Sprite[]
    arrowTails: PIXI.Sprite[]
    arrowCount: number
  }
export interface HurdlesGlobals {
    hurdleRaceLength: number
    lanes: PIXI.Sprite[][]
    runners: PIXI.Sprite[]
  }
export interface DivingGlobals {
  goalCells: PIXI.Sprite[]
  divingContainer: PIXI.Container
  goalArrows: PIXI.Sprite[]
  playerInfo : {
    diverLayer: PIXI.Container
    scoreTexts: PIXI.BitmapText[]
    divers: PIXI.Sprite[]
    comboTexts: PIXI.BitmapText[]
  }
  playerInput: PIXI.Container
}

export type GameGlobals = SkatingGlobals | ArcheryGlobals | HurdlesGlobals | DivingGlobals

export type GameType = 'skating' | 'archery' | 'hurdles' | 'diving'

export interface GlobalData extends GlobalDataDTO {
  players: PlayerInfo[]
  playerCount: number

  gameGlobals: GameGlobals[]
}

export interface MinigameDto {
  resetting: boolean
  shouldReset: boolean
  type: GameType
}

export interface ArcheryDto extends MinigameDto {
  type: 'archery'
  dead: boolean[]
  arrows: boolean
  cursors: number[][]
  wind: number[]
}
export interface HurdlesDto extends MinigameDto {
  type: 'hurdles'
  map: string
  positions: number[]
  jumped: boolean[]
  stunTimers: number[]
  dead: boolean[]
}
export interface SkatingDto extends MinigameDto {
  type: 'skating'
  positions: number[]
  length: number
  risk: number[]
  dead: boolean[]
  timer: number
  directions: string[]
  positionsOnCell: number[]
}
export interface DivingDto extends MinigameDto {
  type: 'diving'
  turnsRemaining: number
  goal: string[]
  playerInputs: string[][]
  points: number[]
  combo: number[]
}

export interface MinigameRanking {
  container: PIXI.Container
  lines: MinigameRankingLine[]
}

export interface MinigameRankingLine {
  avatars: PIXI.AnimatedSprite[]
  medals: PIXI.Sprite[]
}

export interface MinigameRankingAvatar {
  win: PIXI.Sprite
  lose: PIXI.Sprite
}