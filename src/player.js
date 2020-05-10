/**
 * @file : player.js
 *
 * @description : A Player object contains information about the game player. This information ranges from the player name, score to player best score.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


class Player {
	/**
	 * @desciption a constructor
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor() {
		/**
		 * The name of the player. Ultimately a record of the players would be
		 * kept. That way a player be simply be required to login (if necessary).
		 */
		this.name = luckyDivisor.util.playerName();

		this.score;

		/**
		 * A collection of player life stars.
		 */
		this.playerLifeStars;

		/**
		 * Keeps track of the x-coordinate of the next player star.
		 */
		this.nextPlayerStarPositionX;

		/**
		 * A lock on the access of player life stars. This lock prevents the
		 * removal of more than one life stars when a player is burnt.
		 */
		this.playerLifeStarsLocked;

		/**
		 * The player's best score so far.
		 */
		this.bestScore = luckyDivisor.util.playerBestScore();

		/**
		 * The player's credit point so far.
		 */
		this.creditPoints = luckyDivisor.util.playerCreditPoints();
	}


	/**
	 * @description an initialiser of the player.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	init() {
		this.score = new Score(createVector(luckyDivisor.config.DEFAULT_SCORE_STARTING_POSITION, 0));
		this.playerLifeStars = [];
		this.nextPlayerStarPositionX = luckyDivisor.config.PLAYER_STARS_STARTING_POSITION;
		this.playerLifeStarsLocked = true;

		/**
		 * create the player life stars objects.
		 */
		for (var i = 0; i < luckyDivisor.config.NUMBER_OF_PLAYER_STARTING_LIFE_STARS; i++) {
			/**
			 * Add a new life star.
			 */
			this.addNewLifeStar();
		}
	}


	/**
	 * @description adds a new life stars to the life stars collection.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	addNewLifeStar() {
		if (this.playerLifeStars.length < luckyDivisor.config.NUMBER_OF_PLAYER_STARTING_LIFE_STARS) {
			/**
			 * New references for the sake of simplicity.
			 */
			var starPositionX = this.nextPlayerStarPositionX;
			var starPositionY = luckyDivisor.config.HEIGHT_TOP_PANEL / 2;
			var starPosition = createVector(starPositionX, starPositionY);
			var starArmLength = luckyDivisor.config.HEIGHT_TOP_PANEL / 4;

			this.playerLifeStars.push(new Star(starPosition, starArmLength));

			/**
			 * Update next player life star coordinate.
			 */
			this.nextPlayerStarPositionX += luckyDivisor.config.SIZE_OF_A_PLAYER_STAR;
		}
	}


	/**
	 * @description A function to update the player score.
	 *
	 * @param a positive non-zero integer.
	 *
	 * @return none
	 */
	updateScore(hit) {
		this.score.update(hit);
		this.checkForNewBestScore();
		this.checkForEndOfPlay();
	}



	/**
	 * @description checks whether a new best score has been set.
	 *
	 * @param none.
	 *
	 * @return none
	 */
	checkForNewBestScore() {
		if (this.score.score > this.bestScore) {
			this.bestScore = this.score.score;
		}
	}



	/**
	 * @description checks whether the current play is at an end.
	 *
	 * @param none.
	 *
	 * @return none
	 */
	checkForEndOfPlay() {
		/**
		 * Check whether player has collected all required divisors.
		 */
		if (this.hasCollectedAll()) {
			/**
			 * Then this mark the end of play.
			 */
			luckyDivisor.global.playHasEnded = true;

			/**
			 * Consequently we schedule an end of play event.
			 */
			luckyDivisor.util.pushNewEventToQueue(new EndPlayEvent(luckyDivisor.util.date.getCurrentDate(), luckyDivisor.util.game.endCurrentPlay));
		}
	}



	/**
	 * @description gives a one life stars reward to the player if he does not already possess the maximum amount.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	rewardLifeStar() {
		if (this.playerLifeStars.length < luckyDivisor.config.NUMBER_OF_PLAYER_STARTING_LIFE_STARS) {
			this.addNewLifeStar();
		}
	}


	/**
	 * @description A function that checks whether the player has collected all necessary cubes.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	hasCollectedAll() {
		return (luckyDivisor.global.playerCube) ? luckyDivisor.global.playerCube.hasCollectedAll() : false;
	}


	/**
	 * @description A function that takes action when the player collects a cube that he is.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	burn() {
		/**
		 * Unlock the player life stars in the top panel. This allow for a life stars to be taken off.
		 */
		this.playerLifeStarsLocked = false;

		this.takeOffAPlayerLifeStar();

		this.checkIfGameOver();
	}


	/**
	 * @description check whether the player is Game Over by running out of life stars.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	checkIfGameOver() {
		if (this.playerLifeStars.length == 0) {
			/**
			 * End the game with code 0 (i.e. GAME OVER).
			 */
			luckyDivisor.util.game.endGame(0);
		}
	}


	/**
	 * @description a function that takes off a player life star in response to him or her collecting a Pn cube they are not supposed to.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	takeOffAPlayerLifeStar() {
		/**
		 * We can only take away a player life star if it is not locked.
		 */
		if (!this.playerLifeStarsLocked) {
			this.playerLifeStars.splice(this.playerLifeStars.length - 1, 1);

			/**
			 * Put the lock on the player life stars back on.
			 */
			this.playerLifeStarsLocked = true;

			/**
			 * Update next player life star coordinate.
			 */
			this.nextPlayerStarPositionX -= luckyDivisor.config.SIZE_OF_A_PLAYER_STAR;
		}
	}
}