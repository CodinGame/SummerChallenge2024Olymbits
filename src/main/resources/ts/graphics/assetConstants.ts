export const DIVERS = [
  'Plongeon_Plongeur_Haut_Orange.png',
  'Plongeon_Plongeur_Haut_Violet.png',
  'Plongeon_Plongeur_Haut_Vert.png'
]

export const DIRECTION_NAMES: Record<string, string> = {
  U: 'Haut',
  D: 'Bas',
  L: 'Droite', //Flipped
  R: 'Droite'
}
export const COLOUR_NAMES = [
  'Orange',
  'Violet',
  'Vert'
]

export const ARROW_TAIL_ANCHORS = [
  {x: 0, y: 1},
  {x: 0, y: 41.5/55},
  {x: 0, y: 1}
]

export const ARROW_TAILS = [
  'Cible_Fleche_Orange.png',
  'Cible_Fleche_Violet.png',
  'Cible_Fleche_Vert.png'
]

export const WATER_TILE_HEIGHT = 37
export const WIND_X = (45+182)/2
export const WIND_Y = (350+445)/2
export const GOAL_X = 34
export const GOAL_Y = 44

export const RUNNERS = [
  {run: 'Course_Orange_Cours.png',
    jump: 'Course_Orange_Saute.png',
    fall: 'Course_Orange_Tombe.png'},
  {run: 'Course_Violet_Cours.png',
    jump: 'Course_Violet_Saute.png',
    fall: 'Course_Violet_Tombe.png'},
  {run: 'Course_Vert_Cours.png',
    jump: 'Course_Vert_Saute.png',
    fall: 'Course_Vert_Tombe.png'},
]

export const SKATERS = [
  {roll: 'Rollers_Orange_Roule.png',
    fall: 'Rollers_Orange_Tombe.png'},
  {roll: 'Rollers_Violet_Roule.png',
    fall: 'Rollers_Violet_Tombe.png'},
  {roll: 'Rollers_Vert_Roule.png',
    fall: 'Rollers_Vert_Tombe.png'}
]

export const SKATER_GAP = 51

export const SKATE_ARROWS_WIDTH = 50
export const SKATE_ARROWS_XS = [
  307 + SKATE_ARROWS_WIDTH / 2,
  362 + SKATE_ARROWS_WIDTH / 2,
  417 + SKATE_ARROWS_WIDTH / 2,
  472 + SKATE_ARROWS_WIDTH / 2
]

export const HURDLE_TILE_WIDTH = 676 / 30
export const HURDLE_TRACK_X = 82

export const HUD_AVATAR_XS = [15,660,1299]
export const HUD_AVATAR_Y = 952
export const HUD_AVATAR_SIZE = 120
export const HUD_NAME_X = 152
export const HUD_NAME_Y = 971
export const HUD_NAME_W = 469
export const HUD_NAME_H = 41
export const HUD_NAME_SEP = 641
export const HUD_RIGHT_BAR_SIZE = 10

export const MINIGAME_RANKING_WIDTH = 464
export const MINIGAME_RANKING_HEIGHT = 463
export const MINIGAME_RANKING_LINE_X = 54
export const MINIGAME_RANKING_LINE_YS = [63, 190, 317]
export const MINIGAME_RANKING_LINE_WIDTH = 355
export const MINIGAME_RANKING_LINE_HEIGHT = 118

export const MINIGAME_RANKING_AVATARS_LOSE_INDEX = 1
export const MINIGAME_RANKING_AVATARS = [
  ['Orange_Win.png', 'Orange_Loose.png'],
  ['Violet_Win.png', 'Violet_Loose.png'],
  ['Vert_Win.png', 'Vert_Loose.png']
]

export const MINIGAME_RANKING_MEDALS = [
  'M_Or.png',
  'M_Argent.png',
  'M_Bronze.png'
]

export const HUD_MEDAL_X = 164
export const HUD_MEDAL_Y = 1030
export const HUD_MEDAL_W = 40
export const HUD_MEDAL_H = 39
export const HUD_MEDAL_SEP = 87

export const HUD_SCORE_X = 421
export const HUD_SCORE_Y = 1022
export const HUD_SCORE_W = 194
export const HUD_SCORE_H = 30
export const HUD_SCORE_FONT_BASELINE_OFFSET = 1.5

export const ARCHERY_COUNTDOWN_X = 20
export const ARCHERY_COUNTDOWN_Y = 30

export const SKATING_COUNTDOWN_X = 10
export const SKATING_COUNTDOWN_Y = 25