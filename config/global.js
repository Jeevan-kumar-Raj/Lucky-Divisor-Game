/**
 * @file : global.js
 *
 * @description : Global is simply an assembly of all global variables.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


var luckyDivisor = luckyDivisor || {};

luckyDivisor.global = {};

/**
 * A JSON object that contains the player data.
 */
luckyDivisor.global.playerData;

/**
 * A reference to the top panel.
 */
luckyDivisor.global.topPanel;

/**
 * A reference to the side panel.
 */
luckyDivisor.global.sidePanel;

/**
 * A reference to the player.
 */
luckyDivisor.global.player;

/**
 * Keeps track of the starting time of the previous column during start up.
 */
luckyDivisor.global.previousColumnStartingDate;

/**
 * Keeps track of the starting cube of the previous column during start up.
 */
luckyDivisor.global.previousColumnStartingCube;

/**
 * A canvas alternative for the side panel. This became an issue du to the 
 * fact that p5.js requires only one canvas be drawn.
 */
luckyDivisor.global.sidePanelBuffer;

/**
 * At this point in time is being used to store StartNewCubeEvent's.
 */
luckyDivisor.global.eventQueue;

/**
 * Keeps track of the last time that the player paused the game.
 */
luckyDivisor.global.pauseDate;

/**
 * Keeps track of how long a play has been paused.
 */
luckyDivisor.global.pauseDuration;

/**
 * Presents a new game option to the player at the end of the current game.
 */
luckyDivisor.global.newGameButton;

/**
 * Keeps track of how many Pn Cubes have been created in a play.
 */
luckyDivisor.global.numberOfPnCubeCreated;

/**
 * Keeps a record of the number of instances of any Pn Cube flavour that have been generated so far.
 */
luckyDivisor.global.pnCubeCreationReccordMap = new Array();

/**
 * A record of all columns in the game.
 */
luckyDivisor.global.columns = [];

/**
 * A reference to the player cube.
 */
luckyDivisor.global.playerCube;

/**
 * Its value is used for the ID of every cube in the game. It is to be 
 * restarted at the beginning of every play and incremented once a cube 
 * takes on its current value.
 */
luckyDivisor.global.ID;

/**
 * A p5.image to be loaded as background.
 */
luckyDivisor.global.img;

/**
 * A confirmation that the image is available for loading as background.
 */
luckyDivisor.global.imageAvailable = false;

/**
 * Confimrs whether the current play is running.
 */
luckyDivisor.global.playHasEnded = false;

/**
 * Keeps track of the number of the current play. It is used to increase the pn cube falling speed by 10% their initial speed every 5 plays.
 */
luckyDivisor.global.numberOfPlay;