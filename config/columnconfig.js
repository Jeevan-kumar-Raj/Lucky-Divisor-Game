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
 * Defines the width of every columns on the game canvas.
 */
luckyDivisor.config.COLUMN_WIDTH = luckyDivisor.config.WIDTH_OF_CANVAS / luckyDivisor.config.NUMBER_OF_COLUMNS;

/**
 * A Cube falling down a Column need to be centred in that Column.
 * Hence the need for a default padding pixel of any Cube in any 
 * Column.
 */
luckyDivisor.config.DEFAULT_COLUMN_PADDING = 5;