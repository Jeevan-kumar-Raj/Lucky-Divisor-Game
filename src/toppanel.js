/**
 * @file : toppanel.js
 *
 * @description : A panel is more of a container to hold the player's
 * life stars, a clock and the player's score.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class TopPanel extends Panel {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor() {
		super(createVector(0, 0), luckyDivisor.config.WIDTH_OF_CANVAS, luckyDivisor.config.HEIGHT_TOP_PANEL);

		/**
		 * The clock to appear on the panel.
		 */
		this.clock;
	}

	/**
	 * @description an initialiser of the panel.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	init() {
		this.clock = new Clock();
		this.clock.init();
	}


	/**
	 * @description resets anything that need be reset. So far it seems to be just the clock.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	reset() {
		this.clock.reset();
	}


	/**
	 * @description a function to display the content of this Panel.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		fill(255);
		rect(this.position.x, this.position.y, this.width - 1, this.height);

		/**
		 * Display clock.
		 */
		this.clock.show();

		/**
		 * Followed by player score.
		 */
		luckyDivisor.util.showPlayerScore();

		/**
		 * And finally player life stars.
		 */
		luckyDivisor.util.showPlayerLifeStars();
	}
}
