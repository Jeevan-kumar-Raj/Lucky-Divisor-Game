/**
 * @file : sidepanelcube.js
 *
 * @description : A side panel cube is a cube just like any other except it does not move. In addition is also has a multiplier attached to it. Should this mutiplier ever be 0, it becomes invisible if one uses the proper method for updating the mutliplier in it.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


class SidePanelCube extends Cube {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(number, id, position, multiplier) {
		super(number, id, position);

		/**
		 * Refers to the number of times this cube is to be collected.
		 */
		this.multiplier = multiplier;

		/**
		 * Tracks the previous position of this cube. Becomes useful when rearranging cubes in the side panel as a result of one of them being all collected.
		 */
		this.previousPosition = this.position;

		/**
		 * The following is a variable that advises on the visibility of this Cube. This
		 * is mostly useful when displaying the Cube on the canvas. As such a non
		 * visible (i.e. this.visibility == false) will never be displayed on the canvas.
		 */
		this.isVisible = true;

		/**
		 * Every pn cube has a specific colour.
		 * e.g. 1 is yellow, 2 is red, 3 is blue etc...
		 */
		this.colour = luckyDivisor.config.CUBE_COLOUR_MAP[this.number];
	}


	/**
	 * @description sets a new position for this cube.
	 *
	 * @param Vector newPosition.
	 *
	 * @return none.
	 */
	setNewPosition(newPosition) {
		this.previousPosition = this.position;
		this.position = newPosition;
	}



	/**
	 * @description notifies the cube of its collection. In response, it decrements the its multiplier.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	notifyOfCollection() {
		if (this.multiplier > 0) {
			--this.multiplier;
			this.updateVisibility();
		}
	}


	/**
	 * @description notifies the cube of an occurence. In response, it increments its multiplier.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	notifyOfOccurence() {
		++this.multiplier;
	}



	/**
	 * @description updates the visibility of this cube. The cube becomes invisible when its multiplier euals 0.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	updateVisibility() {
		if (this.multiplier == 0) {
			this.isVisible = false;
		}
	}



	/**
	 * @description displays the cube in the side panel.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		if (this.isVisible) {
			/**
			 * Display the cube.
			 */
			this.showSquare();
			this.showNumberOnCube();

			/**
			 * Then its multiplier.
			 */
			text("x" + this.multiplier, this.position.x + luckyDivisor.config.DEFAULT_PADDING_OF_CUBE_OCCURENCE_IN_SIDE_PANEL, this.position.y + luckyDivisor.config.SIDE_OF_CUBE * 0.75);
		}
	}
}