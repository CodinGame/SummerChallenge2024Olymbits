import { HEIGHT, WIDTH } from '../core/constants.js'

export const MINIGAME_WIDTH = 830
export const MINIGAME_HEIGHT = 476

export const MINIGAME_POS = [
  {
    x: 168,
    y: 3,
    rotation: 0,
    width: 793
  }, {
    x: 1128,
    y: 5,
    rotation: 0.025,
    width: 780
  },  {
    x: 113,
    y: 494,
    rotation: 0,
    width: 789
  },
  {
    x: 1030,
    y: 476,
    rotation: 0.014773844000000005,
    width: 796
  }]

export const CURSOR_MOVE_END_P = 0.5

export const ROTATIONS: Record<string, number> = {
  U: 0,
  R: Math.PI / 2,
  D: Math.PI,
  L: -Math.PI / 2
}

export const DIVERS_HGAP = 120
export const DIVER_X = 340
export const INPUT_ARROW_SIZE = 20
export const GOAL_ARROW_GAP = 59
export const HURDLE_JUMP_HEIGHT = 60
export const HURDLE_YS = [122, 258, 389]

// Position of the interior skater (pIdx = 3) for each cell
export const SKATERS_POSITIONS = [
  {x: 479, y: 146, rotation: -Math.PI / 2},
  {x: 579, y: 157, rotation: -Math.PI / 4},
  {x: 586, y: 236, rotation: 0},
  {x: 579, y: 329, rotation: Math.PI / 4},
  {x: 479, y: 338, rotation: Math.PI / 2},
  {x: 367, y: 338, rotation: Math.PI / 2},
  {x: 257, y: 329, rotation: 3 * Math.PI / 4},
  {x: 246, y: 236, rotation: Math.PI},
  {x: 257, y: 157, rotation: - 3 * Math.PI / 4},
  {x: 367, y: 146, rotation: -Math.PI / 2}
]

export const SKATE_NORMALS = [
  {x: 0, y: -1},
  {x: Math.sqrt(0.5), y: -Math.sqrt(0.5)},
  {x: 1, y: 0},
  {x: Math.sqrt(0.5), y: Math.sqrt(0.5)},
  {x: 0, y: 1},
  {x: 0, y: 1},
  {x: -Math.sqrt(0.5), y: Math.sqrt(0.5)},
  {x: -1, y: 0},
  {x: -Math.sqrt(0.5), y: -Math.sqrt(0.5)},
  {x: 0, y: -1}
]

export const SKATE_ARROWS_ROTATIONS = {
  'UP': 0,
  'RIGHT': Math.PI / 2,
  'DOWN': Math.PI,
  'LEFT': -Math.PI / 2
}