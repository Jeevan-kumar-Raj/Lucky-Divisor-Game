/**
 * @file : playerCubeMotionHandler.js
 *
 * @description : A Motion object handles all movement of an object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class PlayerCubeMotionHandler {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(playerCube) {
		/**
		 * This position is a reference to the object under motion.
		 */
		this.cube = playerCube;
	}
	
	
	/**
	 * @description moves the object.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	move() {
		if (keyIsDown(luckyDivisor.config.playerControls[0])) {
			this.moveLeft();
		}
		if (keyIsDown(luckyDivisor.config.playerControls[1])) {
			this.moveRight();
		}
	}
	
	
	/**
	 * @description moves the object to the left with regards to its position.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	moveLeft() {
		/**
		 * Move player's cube one unit to the left.
		 */
		this.cube.position.x -= this.cube.speed;
		
		/**
		 * Make sure to constrain the cube's position to the canvas.
		 */
		this.constrainPosition();
	}
	
	
	/**
	 * @description moves the object to the right with regards to its position.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	moveRight() {
		/**
		 * Move player's cube one unit to the right.
		 */
		this.cube.position.x += this.cube.speed;
		
		/**
		 * Make sure to constrain the cube's position to the canvas.
		 */
		this.constrainPosition();
	}
	
	
	/**
	 * @description moves the object to the right with regards to its position.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constrainPosition() {
		/**
		 * Ensure the Player's Cube does not slide off the canvas.
		 */
		this.cube.position.x = constrain(this.cube.position.x, 1, luckyDivisor.config.WIDTH_OF_CANVAS - luckyDivisor.config.SIDE_OF_CUBE - 1);
	}
}