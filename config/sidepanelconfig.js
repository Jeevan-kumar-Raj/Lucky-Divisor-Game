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
 * Defines how wide the side panel (where the list of cubes to collect is displayed).
 */
luckyDivisor.config.WIDTH_OF_SIDE_PANEL = luckyDivisor.config.WIDTH_OF_GAME_FRAME * 0.2;

/**
 * Defines how high the side panel is.
 */
luckyDivisor.config.HEIGHT_OF_SIDE_PANEL = luckyDivisor.config.HEIGHT_OF_GAME_FRAME;

/**
 * The occurrence multiplier needs to be displayed/printed next to the cube in 
 * the side panel. As such the x-coordinate of the position of the text (e.g. x2) 
 * would be the cube.position.x plus this default padding.
 */
luckyDivisor.config.DEFAULT_PADDING_OF_CUBE_OCCURENCE_IN_SIDE_PANEL = luckyDivisor.config.SIDE_OF_CUBE + 10;