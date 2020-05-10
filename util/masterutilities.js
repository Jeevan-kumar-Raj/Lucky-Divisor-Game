/**
 * @file : utilities.js
 *
 * @description : Config is simply an assembly of all global variables and functions.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

var luckyDivisor = luckyDivisor || {};
luckyDivisor.util = {};


/**
 * @description checks whether the suplied array contains and element greater that the given threshold.
 *
 * @param array of integers, an integer threashold.
 *
 * @return boolean.
 */
luckyDivisor.util.containsElementGreaterThan = function(array, threshold) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] > threshold) {
            return true;
        }
    }
    return false;
}


/**
 * @description checks whether the suplied cubes collide.
 *
 * @param two cubes.
 *
 * @return boolean.
 */
luckyDivisor.util.checkForCollision = function(cube1, cube2) {
    var x1 = cube1.position.x;
    var y1 = cube1.position.y;
    var x2 = cube2.position.x;
    var y2 = cube2.position.y;
    var w = luckyDivisor.config.SIDE_OF_CUBE;

    return collideRectRect(x1, y1, w, w, x2, y2, w, w);
}



/**
 * @description removes the last occurrence of an element.
 *
 * @param an array and a target element.
 *
 * @return none.
 */
luckyDivisor.util.removeFromArray = function(array, target) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == target) {
            array.splice(i, 1);
            break;
        }
    }
}


/**
 * @description updates the the pn cubes to be collected in the side panel.
 *
 * @param number.
 *
 * @return none.
 */
luckyDivisor.util.updateSidePanel = function(number) {
    if (luckyDivisor.global.sidePanel) {
        luckyDivisor.global.sidePanel.update(number);
    }
}


/**
 * @description Checks whether there is existing date on the player.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.initPlayerData = function() {
    if (window.localStorage.getItem('luckyDivisorPlayerData')) {
        luckyDivisor.global.playerData = JSON.parse(window.localStorage.getItem('luckyDivisorPlayerData'));
    } else {
        luckyDivisor.util.createNewPlayerData();
    }
}


/**
 * @description returns the player name.
 *
 * @param none.
 *
 * @return string.
 */
luckyDivisor.util.playerName = function() {
    return (luckyDivisor.global.playerData) ? luckyDivisor.global.playerData['name'] : 'PLAYER';
}


/**
 * @description returns the player best score.
 *
 * @param none.
 *
 * @return number.
 */
luckyDivisor.util.playerBestScore = function() {
    return (luckyDivisor.global.playerData) ? luckyDivisor.global.playerData['bestScore'] : 0;
}


/**
 * @description returns the player credit point.
 *
 * @param none.
 *
 * @return number.
 */
luckyDivisor.util.playerCreditPoints = function() {
    return (luckyDivisor.global.playerData) ? luckyDivisor.global.playerData['creditPoints'] : 0;
}


/**
 * @description makes smiley or angry face.
 *
 * @param face type.
 *
 * @return none.
 */
luckyDivisor.util.makeEmotionalFace = function(type) {
    /**
     * The point here is if the sidePanel exist then the emoticon must as well.
     */
    if (luckyDivisor.global.sidePanel) {
        luckyDivisor.global.sidePanel.emoticon.type = type;
    }
}


/**
 * @description promts the player for his/her name.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.createNewPlayerData = function() {
    /**
     * Create an empty JSON.
     */
    luckyDivisor.global.playerData = {};

    /**
     * prompt the player for a name.
     */
    var playerName = prompt('Please tell me your name', 'PLAYER');

    /**
     * Should the player name be valid, then add it to the JSON.
     */
    if (playerName) {
        luckyDivisor.global.playerData['name'] = playerName;
    }

    /**
     * The player best score is 0 by default.
     */
    luckyDivisor.global.playerData['bestScore'] = 0;

    /**
     * The player credit point is 0 by default.
     */
    luckyDivisor.global.playerData['creditPoints'] = 0;
}


/**
 * @description checks whether there is new player data.
 *
 * @param none.
 *
 * @return boolean.
 */
luckyDivisor.util.newPlayerData = function() {
    return (luckyDivisor.global.playerData['bestScore'] < luckyDivisor.global.player.bestScore || luckyDivisor.global.playerData['creditPoints'] != luckyDivisor.global.player.creditPoints);
}


/**
 * @description checks whether there is a change in player data.
 * If so, saves it.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.checkForNewPlayerData = function() {
    if (luckyDivisor.util.newPlayerData) {
        /**
         * Player best score only gets updated if a higher best score has been recorded.
         */
        luckyDivisor.global.playerData['bestScore'] = (luckyDivisor.global.playerData['bestScore'] < luckyDivisor.global.player.bestScore) ? luckyDivisor.global.player.bestScore : luckyDivisor.global.playerData['bestScore'];
        /**
         * Player credit point gets updated when ever there is a new credit point. The idea here is that
         * credit point can be carried over from one session to another.
         */
        luckyDivisor.global.playerData['creditPoints'] = luckyDivisor.global.player.creditPoints;

        luckyDivisor.util.savePlayerData();
    }
}


/**
 * @description saves the player data to local storage.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.savePlayerData = function() {
    /**
     * First check that the player data does exist. And if so store it.
     * There is a limit to how much data one can store via localStorage - approximately 5mb.
     * If you are dealing with a lot of data you could soon reach that limit.
     */
    if (luckyDivisor.global.playerData) {
        window.localStorage.setItem('luckyDivisorPlayerData', JSON.stringify(luckyDivisor.global.playerData));
    }
}


/**
 * @description returns a new cube id.
 *
 * @param number.
 *
 * @return none.
 */
luckyDivisor.util.newID = function() {
    return ++luckyDivisor.global.ID;
}


/**
 * @description burns the player for collecting a non divisor cube.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.burnPlayer = function() {
    if (luckyDivisor.global.player) {
        luckyDivisor.global.player.burn();
    }
}


/**
 * @description updates player score.
 *
 * @param number.
 *
 * @return none.
 */
luckyDivisor.util.updatePlayerScore = function(number) {
    if (luckyDivisor.global.player) {
        luckyDivisor.global.player.updateScore(number);
    }
}


/**
 * @description pushes a new event to the event queue.
 *
 * @param event.
 *
 * @return none.
 */
luckyDivisor.util.pushNewEventToQueue = function(newEvent) {
    if (luckyDivisor.global.eventQueue) {
        luckyDivisor.global.eventQueue.push(newEvent);
    }
}


/**
 * @description returns the player cube divisors.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.playerCubeDivsors = function() {
    return (luckyDivisor.global.playerCube) ? luckyDivisor.global.playerCube.divisors : [];
}


/**
 * @description computes the active milliseconds (the amount of milliseconds the pn cube has been actually falling) of a pn cube.
 *
 * @param cube starting date.
 *
 * @return none.
 */
luckyDivisor.util.cubeActiveMilliSeconds = function(cubeStartDate) {
    var totalMilliseconds = luckyDivisor.util.date.getCurrentDate().minus(cubeStartDate).getTime();
    return (luckyDivisor.global.pauseDuration) ? (totalMilliseconds - luckyDivisor.global.pauseDuration) : totalMilliseconds;
}



/**
 * @description shows the player score in the tope panel.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.showPlayerScore = function() {
    if (luckyDivisor.global.player.score) {
        luckyDivisor.global.player.score.show();
    }
}



/**
 * @description returns the default speed of a pn cube at creation time.
 *
 * @param number.
 *
 * @return number.
 */
luckyDivisor.util.getDefaultSpeed = function(number) {
    return luckyDivisor.config.DEFAULT_PN_CUBE_SPEED + (luckyDivisor.config.PN_CUBE_SPEED_VARIANT_MULTIPLIER * number);
}



/**
 * @description returns the incremental speed of a pn cube at creation time.
 *
 * @param number.
 *
 * @return number.
 */
luckyDivisor.util.getIncrementalSpeed = function(number) {
    if (luckyDivisor.global.numberOfPlay) {
        return luckyDivisor.util.getDefaultSpeed(number) * floor(luckyDivisor.global.numberOfPlay / 3) * 0.1;
    }
    return 0;
}



/**
 * @description shows the player life stars in the tope panel.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.showPlayerLifeStars = function() {
    if (luckyDivisor.global.player.playerLifeStars) {
        luckyDivisor.global.player.playerLifeStars.forEach(function(lifeStar) {
            lifeStar.show();
        });
    }
}



/**
 * @description A function that pad number with zeros if necessary.
 *
 * @param integer number.
 *
 * @return string.
 */
luckyDivisor.util.padWithZero = function(number) {
    return ((number < 10) ? "0" + number : number);
}



/**
 * @description check whether there is an event scheduled to be executed at this time. If so it executes it.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.checkAndProcessNextEvent = function() {
    /**
     * Check whether there is any current event sitting in the event queue.
     */
    if (luckyDivisor.global.eventQueue.hasEvents()) {
        /**
         * The next to be fired event would be the one in front of the queue.
         */
        var nextToBeFiredEvent = luckyDivisor.global.eventQueue.peek();

        /**
         * Should the event time be same as the system time.
         */
        if (nextToBeFiredEvent.date.isLessOrEqualTo(luckyDivisor.util.date.getCurrentDate())) {
            /**
             * Then process the event.
             */
            nextToBeFiredEvent.process();

            /**
             * Delete the event once it has been processed.
             */
            luckyDivisor.global.eventQueue.remove(0);
        }
    }
}


/**
 * @description check whether the game is paused, and if so, it displays a pause message on the canvas.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.checkIfGamePaused = function() {
    if (luckyDivisor.config.gameStatus == "Paused") {
        luckyDivisor.util.game.displayMessageOnCanvas("PAUSED");
    }
}



/**
 * @description sets the canvas background as an image or a plain dark gray colour.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.drawCanvasBackground = function() {
    if (luckyDivisor.global.imageAvailable) {
        image(luckyDivisor.global.img, 0, 0, width, height);
    } else {
        background(luckyDivisor.config.DEFAULT_CANVAS_BACKGROUND_COLOUR);
    }
}



/**
 * @description checks whether the player has collected a Pn Cube.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.checkForPnCubeCollection = function() {
    /**
     * The simplest way to go about this is going through very column and checking whether every cube in that column is colliding with the player cube.
     */
    luckyDivisor.global.columns.forEach(function(column) {
        column.cubes.forEach(function(cube) {
            if (!luckyDivisor.global.playHasEnded && cube.visibility && luckyDivisor.util.checkForCollision(cube, luckyDivisor.global.playerCube)) {
                luckyDivisor.global.playerCube.collisionHandler.handleCollisionWith(cube);
                cube.visibility = false;
            }
        });
    });
}


/**
 * @description makes sure the game is ended when a time out occurs.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.checkForTimeOut = function() {
    /**
     * The game is ended (i.e. game over) if the clock reaches "00:00".
     */
    if (luckyDivisor.global.topPanel.clock.stringTimeTillEndOfPlay == "00:00") {
        /**
         * End the game with code 1 (i.e. TIME OUT).
         */
        luckyDivisor.util.game.endGame(1);
    }
}


/**
 * @description makes sure the clock is started.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.checkForRunningClock = function() {
    /**
     * Start the clock if it not started.
     */
    if (!luckyDivisor.global.topPanel.clock.hasStarted) {
        luckyDivisor.global.topPanel.clock.start();
    }
}


/**
 * @description displays the game components on-screen.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.showGameComponents = function() {
    luckyDivisor.global.playerCube.show();

    luckyDivisor.global.columns.forEach(function(column) {
        column.show();
    });

    luckyDivisor.util.checkForPnCubeCollection();
    luckyDivisor.global.topPanel.show();
    luckyDivisor.global.sidePanel.show();
}


/**
 * @description Initialises the cube colour map.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.initialiseCubeColourMap = function() {
    /**
     * Initialise the map of colours.
     * It was decided at the design stage to paint the pn cube in different colour in order 
     * to make them visually distinguishable beside the number inscribed on them. As these 
     * colour have been carefully chosen to avoid any misinterpretation.
     */
    luckyDivisor.config.CUBE_COLOUR_MAP[1] = color('#FFED00');
    luckyDivisor.config.CUBE_COLOUR_MAP[2] = color('#FF0000');
    luckyDivisor.config.CUBE_COLOUR_MAP[3] = color('#0047AB');
    luckyDivisor.config.CUBE_COLOUR_MAP[5] = color('#00B500');
    luckyDivisor.config.CUBE_COLOUR_MAP[7] = color('#805B00');
}


/**
 * @description Initialises the cube colour map.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.initialisePnCubeCreationRecord = function() {
    luckyDivisor.global.pnCubeCreationReccordMap[1] = 0;
    luckyDivisor.global.pnCubeCreationReccordMap[2] = 0;
    luckyDivisor.global.pnCubeCreationReccordMap[3] = 0;
    luckyDivisor.global.pnCubeCreationReccordMap[5] = 0;
    luckyDivisor.global.pnCubeCreationReccordMap[7] = 0;
}


/**
 * @description creates the game components (i.e. a Player, a Top Panel, a Side Panel etc...).
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.createGameComponents = function() {
    luckyDivisor.util.createNewGameButton();

    luckyDivisor.global.player = new Player();
    luckyDivisor.global.player.init();
    console.log("Player Best Score is " + luckyDivisor.global.player.bestScore);

    luckyDivisor.global.topPanel = new TopPanel();
    luckyDivisor.global.topPanel.init();

    luckyDivisor.global.sidePanel = new SidePanel();
    luckyDivisor.global.eventQueue = new EventQueue();
}


/**
 * @description creates a new game button.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.createNewGameButton = function() {
    var x = (luckyDivisor.config.WIDTH_OF_CANVAS - luckyDivisor.config.WIDTH_OF_BUTTON) / 2;
    var y = (luckyDivisor.config.HEIGHT_OF_CANVAS / 2) + 100;

    luckyDivisor.global.newGameButton = new Button("NEW GAME", createVector(x, y), luckyDivisor.config.WIDTH_OF_BUTTON, luckyDivisor.config.HEIGHT_OF_BUTTON, luckyDivisor.util.game.restart);
}


/**
 * @description Initialises the dimensions of the container in the HTML file.
 *
 * @param none.
 *
 * @return none.
 */
luckyDivisor.util.initialiseHTMLContainer = function() {
    /**
     * displayWindow and windowHeight are p5.js variables.
     */
    var gameCanvasContainer = document.getElementById('gameCanvasContainer');
    gameCanvasContainer.style.left = (displayWidth - luckyDivisor.config.WIDTH_OF_GAME_FRAME) / 2 + 'px';
    gameCanvasContainer.style.top = (windowHeight - luckyDivisor.config.HEIGHT_OF_GAME_FRAME) / 2 + 'px';
}