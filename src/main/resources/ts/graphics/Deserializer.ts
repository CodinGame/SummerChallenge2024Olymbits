import { HEIGHT } from '../core/constants.js'
import { ArcheryDto, DivingDto, FrameDataDTO, GameType, GlobalData, GlobalDataDTO, HurdlesDto, MinigameDto, SkatingDto} from '../types.js'

function splitLine (str: string) {
  return str.length === 0 ? [] : str.split(' ')
}

export function parseData (unsplit: string, globalData: GlobalData): FrameDataDTO {
  const raw = unsplit.split('\n')
  const minigames: MinigameDto[] = []
  const rankings: Record<number, number[]> = {}
  let idx = 0
  const nbMinigames = +raw[idx++]
  for (let i = 0; i < nbMinigames; ++i) {
    const resetting = raw[idx++] === '1'
    const shouldReset = raw[idx++] === '1'

    let minigame: MinigameDto = {
      resetting,
      shouldReset,
      type: globalData.gameTypes[i]
    }

    if (minigame.type === 'hurdles') {
      const map = raw[idx++]
      const positions = splitLine(raw[idx++]).map(v=>+v)
      const jumped = splitLine(raw[idx++]).map(v=>v==='1')
      const stunTimers = splitLine(raw[idx++]).map(v=>+v)
      const dead = splitLine(raw[idx++]).map(v=>v==='1')

      const hurdles: HurdlesDto = {
        ...minigame,
        type: 'hurdles',
        map,
        positions,
        jumped,
        stunTimers,
        dead
      }

      minigame = hurdles

    } else if (minigame.type === 'skating') {
      const positions = splitLine(raw[idx++]).map(v=>+v)
      const length = +raw[idx++]
      const risk = splitLine(raw[idx++]).map(v=>+v)
      const dead = splitLine(raw[idx++]).map(v=>v==='1')
      const timer = +raw[idx++]
      const directions = splitLine(raw[idx++])

      const skating: SkatingDto = {
        ...minigame,
        type: 'skating',
        positions,
        length,
        risk,
        dead,
        timer,
        directions,
        positionsOnCell: []
      }

      minigame = skating
    } else if (minigame.type === 'diving') {

      const turnsRemaining = +raw[idx++]
      const goal = splitLine(raw[idx++])
      const points = splitLine(raw[idx++]).map(v=>+v)
      const combo = splitLine(raw[idx++]).map(v=>+v)
      const playerInputs = []
      for (let i = 0; i < globalData.playerCount; ++i) {
        playerInputs.push(splitLine(raw[idx++]))
      }

      const diving: DivingDto = {
        ...minigame,
        type: 'diving',
        turnsRemaining,
        goal,
        points,
        combo,
        playerInputs
      }

      minigame = diving

    } else if (minigame.type === 'archery') {

      const dead = splitLine(raw[idx++]).map(v=>v==='1')
      const arrows = raw[idx++] ==='1'
      const cursors = []
      for (let i = 0; i < globalData.playerCount; ++i) {
        cursors.push(splitLine(raw[idx++]).map(v=>+v))
      }
      const wind = splitLine(raw[idx++]).map(v=>+v)

      const archery: ArcheryDto = {
        ...minigame,
        type: 'archery',
        dead,
        arrows,
        cursors,
        wind
      }

      minigame = archery
    }

    minigames.push(minigame)
    const rankArray = []
    if (minigame.shouldReset) {
      for (let i = 0; i < 3; ++i) {
        rankArray.push(+raw[idx++])
      }
      rankings[i] = rankArray
    }
  }
  const scores: number[] = []
  const medals: number[][] = []
  const detailedMedals: number[][][] = []
  for (let i = 0; i < globalData.playerCount; ++i) {
    const scoreInfo = splitLine(raw[idx++])
    scores.push(+scoreInfo[0])
    const countMedals = [0, 0, 0]
    const tmpDetailedMedals = []
    for (let j = 0; j < nbMinigames; ++j) {
      const gameMedals = [parseInt(scoreInfo[1 + j*3]), parseInt(scoreInfo[2 + j*3]), parseInt(scoreInfo[3 + j*3]),]
      tmpDetailedMedals.push(gameMedals)
      countMedals[0] += gameMedals[0]
      countMedals[1] += gameMedals[1]
      countMedals[2] += gameMedals[2]
    }
    detailedMedals.push(tmpDetailedMedals)
    medals.push(countMedals)
  }

  return {
    minigames,
    rankings,
    scores,
    medals,
    detailedMedals
  }

}


export function parseGlobalData (unsplit: string): GlobalDataDTO {
  const raw = unsplit.split('\n')
  let idx = 0
  const gameTypes: GameType[] = []
  let gameCount = +raw[idx++]
  for (let i = 0; i < gameCount; ++i) {
    const gameType = raw[idx++]
    gameTypes.push(gameType as GameType)
  }
  return {
    gameTypes
  }
}
