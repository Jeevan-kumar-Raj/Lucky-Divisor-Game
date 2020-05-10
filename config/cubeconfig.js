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
 * A Cube is at this point in time a square. So this variable defines 
 * the side of this square that is the Cube.
 */
luckyDivisor.config.SIDE_OF_CUBE = (luckyDivisor.config.WIDTH_OF_CANVAS / luckyDivisor.config.NUMBER_OF_COLUMNS) - (luckyDivisor.config.DEFAULT_COLUMN_PADDING * 2);

/**
 * The minimum speed at which any Pn Cube must fall.
 */
luckyDivisor.config.DEFAULT_PN_CUBE_SPEED = 1.3;

/**
 * This is used to set apart denser cubes (i.e. the ones with bigger 
 * numbers) from the lighter ones (i.e. the ones with smaller numbers).
 */
luckyDivisor.config.PN_CUBE_SPEED_VARIANT_MULTIPLIER = 0.1;

/**
 * The speed at which a player's cube moves. Maybe in further version 
 * we can have a feature where this speed can be increased.
 */
luckyDivisor.config.DEFAULT_PLAYER_CUBE_SPEED = 5;

/**
 * The default padding of the numbers on the cubes. That way having them 
 * centred.
 */
luckyDivisor.config.CUBE_NUMBER_PADDING = 5;

/**
 * The size of the number printed on the cubes is relative to the side of 
 * the cubes. However the padding of 5 is consistent.
 */
luckyDivisor.config.DEFAULT_CUBE_NUMBER_TEXT_SIZE = luckyDivisor.config.SIDE_OF_CUBE - 2 * luckyDivisor.config.CUBE_NUMBER_PADDING;