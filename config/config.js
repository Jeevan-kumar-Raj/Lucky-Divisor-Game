/**
 * @file : config.js
 *
 * @description : Config is simply an assembly of all global variables and functions.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


var luckyDivisor = luckyDivisor || {};
luckyDivisor.config = {};

/**
 * Defines how wide the game window/frame is.
 */
luckyDivisor.config.WIDTH_OF_GAME_FRAME = 500;

/**
 * Defines how high the game window/frame is.
 */
luckyDivisor.config.HEIGHT_OF_GAME_FRAME = 600;

/**
 * Defines how wide the canvas (where the cubes are falling) is.
 */
luckyDivisor.config.WIDTH_OF_CANVAS = luckyDivisor.config.WIDTH_OF_GAME_FRAME * 0.8;

/**
 * Defines how high the canvas is.
 */
luckyDivisor.config.HEIGHT_OF_CANVAS = luckyDivisor.config.HEIGHT_OF_GAME_FRAME;

/**
 * Defines how wide the button is.
 */
luckyDivisor.config.WIDTH_OF_BUTTON = luckyDivisor.config.WIDTH_OF_GAME_FRAME * 0.3;

/**
 * Defines how high the button is.
 */
luckyDivisor.config.HEIGHT_OF_BUTTON = luckyDivisor.config.WIDTH_OF_BUTTON * 0.25;

/**
 * Defines the number of columns on the game canvas.
 */
luckyDivisor.config.NUMBER_OF_COLUMNS = 10;

/**
 * Keeps track to game status as either Running, Paused, Stopped.
 */
luckyDivisor.config.gameStatus = "Stopped";

/**
 * A default setting that set the number of life stars that a player 
 * starts with.
 */
luckyDivisor.config.NUMBER_OF_PLAYER_STARTING_LIFE_STARS = 5;

/**
 * The colour of the game canvas background.
 */
luckyDivisor.config.DEFAULT_CANVAS_BACKGROUND_COLOUR = 75;

/**
 * The background of the game canvas can either be a colour or an image.
 */
luckyDivisor.config.DEFAULT_CANVAS_BACKGROUND_IMAGE = "../assets/milky_way_grayscale.jpg";

/**
 * The default score text size is set to be 80% the height of the top panel.
 */
luckyDivisor.config.DEFAULT_BUTTON_TEXT_SIZE = luckyDivisor.config.HEIGHT_OF_BUTTON * 0.6;

/**
 * A map of a Pn number to a pre-determined colour.
 */
luckyDivisor.config.CUBE_COLOUR_MAP = {};

/**
 * The default play duration upon release would be 1 min 0 sec. There may 
 * be a feature in future releases that extends this play duration.
 */
luckyDivisor.config.defaultPlayDuration = [0, 20];

/**
 * The values of the player control keys (arrow LEFT and RIGHT).
 */
luckyDivisor.config.playerControls = [37, 39];

/**
 * The game controls is made up of pause and play, which is the same button space bar.
 * When the game is pause, the game status is changed. That way when "space bar" is 
 * pressed again, the play can continue.
 */
 luckyDivisor.config.gameControls = [32];

/**
 * A record of all prime numbers in the game so far.
 */
luckyDivisor.config.PRIME_NUMBERS = [2, 7, 3, 5, 1, 2, 5];

/**
 * A record of all possible delays. These were supposed to be randomly 
 * generated. However the result was not appealing. Hence this.
 */
luckyDivisor.config.CUBE_DELAYS = [3, 0, 1, 2, 1, 3, 0, 2];

/**
 * Is used to offset the cubes in the side panel so that they are not too 
 * close to the game canvas (i.e. where the pn cubes are falling).
 */
luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING = 15;

/**
 * A text to display onto the screen when the user go GAME OVER (i.e. runs 
 * out of life stars).
 */
luckyDivisor.config.GAME_OVER_TEXT = "GAME OVER";

/**
 * A text to display onto the screen when the clock run out.
 */
luckyDivisor.config.TIME_OUT_TEXT = "TIME OUT";

/**
 * A text to display onto the screen when the clock run out.
 */
luckyDivisor.config.END_OF_GAME_TEXT_SIZE = luckyDivisor.config.HEIGHT_OF_GAME_FRAME / 10;