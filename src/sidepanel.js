/**
 * @file : sidepanel.js
 *
 * @description : A side panel is a panel that contains the list of yet to be collected Pn cubes by the player.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class SidePanel extends Panel {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor() {
		super(createVector(luckyDivisor.config.WIDTH_OF_CANVAS, 0), luckyDivisor.config.WIDTH_OF_SIDE_PANEL, luckyDivisor.config.HEIGHT_OF_SIDE_PANEL);

		/**
		 * The list of pn cubes that the player still needs to collect.
		 */
		this.pnCubesYetToBeCollected = [];

		/**
		 * A facial response of what is going on in the game.
		 */
		this.emoticon = new Emoticon(createVector(this.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + 25, this.position.y + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + 25), 50, 0);

		/**
		 * The Y part of the coordinate at which to start placing the yet to be collected cubes in the side panel.
		 */
		this.cubesStartingPositionY = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + this.emoticon.size;
	}



	/**
	 * @description create the cubes yet to be collected representation.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	createCubesYetToBeCollected() {
		this.pnCubesYetToBeCollected = [];
		/**
		 * List of prime factor divisors of the player cube's number. Bear in mind it may well contain duplicate.
		 * And this is done on purpose; to allow us to simple delete a divisor once its pn cube has been collected
		 * and not keep track of how many times it is supposed to be collected. An example would be, given a player
		 * number 9, its divisors would be {1, 3, 3}.
		 */
		var primeFactors = luckyDivisor.util.playerCubeDivsors();

		/**
		 * This is used to keep track of how much offset is needed to be added to the cube y-coordinate.
		 */
		var counter = 0;

		var alreadyregisteredPrimeNumbers = [];

		for (var i = 0; i < primeFactors.length; i++) {
			if (alreadyregisteredPrimeNumbers.includes(primeFactors[i])) {
				/**
				 * This means the cube has already been created. So all we need to do is notify new occurence.
				 */
				this.notifyCubeNewOccurrence(primeFactors[i]);
			}
			else {
				this.addNewCubeYetToBeCollected(primeFactors[i], counter);

				/**
				 * Increment counter to cater for next cube to be displayed bellow the current.
				 */
				++counter;

				/**
				 * And add the prime number to the list of alreadu registered numbers
				 */
				alreadyregisteredPrimeNumbers.push(primeFactors[i]);
			}
		}
	}



	/**
	 * @description adds a new yet to be collected cube to the collection. This cube would be shown in the side panel.
	 *
	 * @param integer number, counter.
	 *
	 * @return none.
	 */
	addNewCubeYetToBeCollected(number, counter) {
		/**
		 * The cube to displayed in the side panel needs to be offset a little bit as to not be too close to the game canvas.
		 */
		var cubePositionX = this.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;

		/**
		 * The cubes are aligned vertically and spaced by the DEFAULT_SIDE_PANEL_PADDING.
		 */
		var cubePositionY = this.cubesStartingPositionY + counter * (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE);

		this.pnCubesYetToBeCollected.push(new SidePanelCube(number, luckyDivisor.util.newID(), createVector(cubePositionX, cubePositionY), 1));
	}


	/**
	 * @description notify the cube with the given number of additional occurence.
	 *
	 * @param integer cubeNumber.
	 *
	 * @return none.
	 */
	notifyCubeNewOccurrence(cubeNumber) {
		for (var i = 0; i < this.pnCubesYetToBeCollected.length; i++) {
			if (this.pnCubesYetToBeCollected[i].number == cubeNumber) {
				this.pnCubesYetToBeCollected[i].notifyOfOccurence();
				break;
			}
		}
	}



	/**
	 * @description resets all the necessary stuff.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	reset() {
		this.createCubesYetToBeCollected();
		luckyDivisor.util.makeEmotionalFace(0);
	}


	/**
	 * @description a function to display the content of this Panel.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		this.showContainer();
		this.emoticon.show();

		/**
		 * Display list of cubes yet to be collect.
		 */
		this.pnCubesYetToBeCollected.forEach( function (cube) {
			cube.show();
		});
	}



	/**
	 * @description displays the white rectagle container that is the side panel.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	showContainer() {
		/**
		 * Save the current state.
		 */
		push();

		fill(255);
		noStroke();
		rect(this.position.x, this.position.y, this.width, this.height);

		/**
		 * Restore the previous state.
		 */
		pop();
	}




	/**
	 * @description updates the list of yet to be collected pn cubes.
	 *
	 * @param a integer number.
	 *
	 * @return none.
	 */
	update(number) {
		for (var i = 0; i < this.pnCubesYetToBeCollected.length; i++) {
			if (this.pnCubesYetToBeCollected[i].number == number) {
				this.pnCubesYetToBeCollected[i].notifyOfCollection();

				/**
				 * Should this cube be all collected, then we want to rearrange every cube in the side panel.
				 */
				if (!this.pnCubesYetToBeCollected[i].isVisible) {
					this.pnCubesYetToBeCollected[i].previousPosition = this.pnCubesYetToBeCollected[i].position;
					this.rearrangeCubes(i + 1);
				}
				break;
			}
		}
	}



	/**
	 * @description rearranges the cubes in the side panel after cone of them has been all colected.
	 *
	 * @param integer index.
	 *
	 * @return none.
	 */
	rearrangeCubes(index) {
		for (var i = index; i < this.pnCubesYetToBeCollected.length; i++) {
			this.pnCubesYetToBeCollected[i].setNewPosition(this.pnCubesYetToBeCollected[i - 1].previousPosition);
		}

		/**
		 * Remove the invisible cube from collection.
		 */
		this.pnCubesYetToBeCollected.splice(index - 1, 1);
	}
}