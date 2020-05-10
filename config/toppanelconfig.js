/**
 * @file : config.js
 *
 * @description : Config is simply an assembly of all global variables and functions.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


/**
 * The top panel is where Player life stars, score and the timer are 
 * displayed. At this point in time, this panel is a white rectangle 
 * with length the width of the game canvas and width 
 */
luckyDivisor.config.HEIGHT_TOP_PANEL = luckyDivisor.config.HEIGHT_OF_GAME_FRAME / 15;

/**
 * We want some space off the left-hand side of the top panel before we 
 * start printing the time.
 */
luckyDivisor.config.DEFAULT_TIMER_PADDING = luckyDivisor.config.HEIGHT_TOP_PANEL / 4;

/**
 * We want some space off the left-hand side of the top panel before we 
 * start printing the time.
 */
luckyDivisor.config.DEFAULT_SCORE_PADDING = 0;

/**
 * We want the player score displayed just far enough from the clock to be 
 * be on its own in the top panel.
 */
luckyDivisor.config.DEFAULT_SCORE_STARTING_POSITION = luckyDivisor.config.WIDTH_OF_CANVAS * 0.45;

/**
 * Sets location on the top panel where to start printing the player 
 * life stars.
 */
luckyDivisor.config.PLAYER_STARS_STARTING_POSITION = luckyDivisor.config.WIDTH_OF_CANVAS * 0.70;