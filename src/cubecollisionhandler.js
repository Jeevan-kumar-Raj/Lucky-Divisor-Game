/**
 * @file : cubeCollisionHandler.js
 *
 * @description : Handles collision between two cubes. May they be player cube and pn cube or two pn cubes.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


class CubeCollisionHandler {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(cube) {
		this.cube = cube;
	}



	/**
	 * @description a handler collision between two cubes..
	 *
	 * @param a Pn cube.
	 *
	 * @return none.
	 */
	handleCollisionWith(pnCube) {
		if (this.cube.id == 0) {
			this.handlePlayerCubeInCollisionWith(pnCube);
		}
		else {
			this.handlePnCubeInCollisionWith(pnCube);
		}
	}


	/**
	 * @description a collision handler between a player and a pn cubes.
	 *
	 * @param a Pn cube.
	 *
	 * @return none.
	 */
	handlePlayerCubeInCollisionWith(pnCube) {
		if (this.cube.yetToBeCollectedDivisors.includes(pnCube.number)) {
			/**
			 * Move pnCube.number to the lot of alreadyCollectedDivisors.
			 */
			this.cube.registerDivisorCollection(pnCube.number);

			/**
			 * Change the colour of playerCube.
			 */
			this.cube.changeColour();

			/**
			 * Update side panel.
			 */
			luckyDivisor.util.updateSidePanel(pnCube.number);

			/**
			 * Update Player score.
			 */
			luckyDivisor.util.updatePlayerScore(pnCube.number);

			/**
			 * Make emotional face.
			 */
			luckyDivisor.util.makeEmotionalFace(1);
		}
		else if (this.cube.alreadyCollectedDivisors.includes(pnCube.number)) {
			/**
			 * Apply penalty for collecting an already collected cube.
			 */
			luckyDivisor.util.updatePlayerScore(-pnCube.number);

			/**
			 * Make emotional face.
			 */
			luckyDivisor.util.makeEmotionalFace(0);
		}
		else {
			/**
			 * Burn the player for collecting a non-divisor cube
			 */
			luckyDivisor.util.burnPlayer();

			/**
			 * Make emotional face.
			 */
			luckyDivisor.util.makeEmotionalFace(-1);
		}
	}



	/**
	 * @description merges two pn cubes.
	 *
	 * @param two pn cubes, lower and upper one, exactely in that order.
	 *
	 * @return none.
	 */
	combineTwoPnCubes(lowerCube, upperCube) {
		/**
		 * One way to achieving the merge is by setting the number of the lowest cube to sum and its speed accordingly as to match the new number. This can be done by calling a function change number on that lowest cube.
		 */
		var sum = lowerCube.number + upperCube.number;
		lowerCube.changeNumber(sum);

		/**
		 * We need to make the upper cube invisible thereafter.
		 */
		upperCube.visibility = false;
	}



	/**
	 * @description a collision handler between a two pn cubes.
	 *
	 * @param a Pn cube.
	 *
	 * @return none.
	 */
	handlePnCubeInCollisionWith(pnCube) {
		var sum = this.cube.number + pnCube.number;
		
		/**
		 * There are two ways this can swing. The first is when sum is prime and the other is when sum is not.
		 * When sum is prime, then the two cubes combine to for a new one with its number being sum.
		 * In the other case, the two cubes collide and still carry on their marry way.
		 */
		if (luckyDivisor.util.math.isPrime(sum)) {
			var lowerCube = (this.cube.position.y > pnCube.position.y) ? this.cube : pnCube;
			var upperCube = (this.cube.position.y < pnCube.position.y) ? this.cube : pnCube;

			this.combineTwoPnCubes(lowerCube, upperCube);
		}
		else {
			/**
			 * By definition, a collision is an event where momentum or kinetic energy is transferred 
			 * from one object (which in this case is a cube) to another.
			 * Momentum (p) is the product of mass and velocity (p = mv). 
			 * While Kinetic energy is the energy of motion; it is defined as K = (1/2) m v^2. 
			 * 
			 * Because the collision between two cubes is an elastic one (i.e. the two 
			 * cubes bounce apart, in the same direction, when they collide), both momentum and of kinetic energy are conserved.
			 * As such we would have:
			 *
			 * m1*u1 + m2u2 = m1v1 + m2v2 (conservation of momentum), where:
			 *
			 * m1 is the mass of Cube1, 
			 * m2 is the mass of Cube2, 
			 * u1 is the incoming speed of Cube1, 
			 * u2 is the incoming speed of Cube2, 
			 * v1 is the speed of Cube1 after the collision, 
			 * v2 is the speed of Cube1 after the collision.
			 *
			 * Similarly, we would have:
			 *
			 * (1/2)*m1*u1^2 + (1/2)*m2*u2^2 = (1/2)*m1*v1^2 + (1/2)*m2*u2^2 (conservation of kinatic energy).
			 *
			 * Solving both equations results in:
			 *
			 *		u1*(m1-m2) + 2*m2*u2
			 * v1 = --------------------
			 *			m1 + m2
			 *
			 *		u2*(m2-m1) + 2*m1*u1
			 * v2 = --------------------
			 *			m1 + m2
			 */
			var m1 = this.cube.number;
			var m2 = pnCube.number;
			var u1 = this.cube.speed;
			var u2 = pnCube.speed;

			this.cube.speed = (u1 * (m1 - m2) + 2 * m2 * u2) / (m1 + m2);
			pnCube.speed = (u2 * (m2 - m1) + 2 * m1 * u1) / (m1 + m2);
		}
	}
}