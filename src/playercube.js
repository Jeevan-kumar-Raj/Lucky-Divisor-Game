/**
 * @file : playercube.js
 *
 * @description : A player cube is a cube with special properties and features.
 * The number on a player cube is not restricted to be just a prime. In fact it could be anything 
 * between 2-99 provided it has prime factors that are less than 10. A Player Cube is 
 * always a the bottom of the canvas and move sideways (i.e. LEFT and RIGHT).
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

 
 class PlayerCube extends Cube {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(number, id, position) {
		super(number, id, position);
		
		/**
		 * The following is only needed for player cubes. It is a collection all the 
		 * prime divisors of player cube's number.
		 */
		this.divisors = luckyDivisor.util.math.getPrimeFactors(this.number);
		
		/**
		 * The player cube's colour is a combination in equal proportion of all its prime 
		 * divisors colours.
		 */
		this.colour = luckyDivisor.util.cube.combineColours(this.divisors);
		
		this.speed = luckyDivisor.config.DEFAULT_PLAYER_CUBE_SPEED;
		
		/**
		 * The following is a collection of numbers of pn Cube that have been collect are 
		 * divisors of the player cube number.
		 */
		this.alreadyCollectedDivisors = [];
		
		/**
		 * The following is a collection of numbers of pn Cube that are divisors of the 
		 * player's cube number but have not yet been collected.
		 */
		this.yetToBeCollectedDivisors = luckyDivisor.util.math.getPrimeFactors(this.number);
		
		/**
		 * Handles the player cube motion.
		 */
		this.motionHandler = new PlayerCubeMotionHandler(this);
		
		/**
		 * Handles the player cube contact with other pn cubes.
		 */
		this.collisionHandler = new CubeCollisionHandler(this);
	}
	
	
	/**
	 * @description a function that displays this Cube.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		this.motionHandler.move();
		this.showSquare();
		this.showNumberOnCube();
	}
	
	
	/**
	 * @description A function that checks whether the player has collected all necessary cubes.
	 *
	 * @param none.
	 *
	 * @return boolean.
	 */
	hasCollectedAll() {
		return (this.yetToBeCollectedDivisors.length == 0);
	}
	
	/**
	 * @description a function.
	 *
	 * @param integer.
	 *
	 * @return none.
	 */
	registerDivisorCollection(divisor) {
		/**
		 * Add this divisor to the list of already collected divisors.
		 */
		this.alreadyCollectedDivisors.push(divisor);
		
		/**
		 * Then remove this divisor from the list of divisor yet to be collected.
		 */
		luckyDivisor.util.removeFromArray(this.yetToBeCollectedDivisors, divisor);
	}
	
	
	/**
	 * @description changes the colour of this Pn cube according to prime numbers in the yetToBeCollectedDivisors array. This is in response to the player collecting a prime divisor Pn cube.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	changeColour() {
		if (this.yetToBeCollectedDivisors.length == 0) {
			this.colour = color('white');
		}
		else if (this.yetToBeCollectedDivisors.length == 1) {
			this.colour = luckyDivisor.config.CUBE_COLOUR_MAP[this.yetToBeCollectedDivisors[0]];
		}
		else {
			this.colour = luckyDivisor.util.cube.combineColours(this.yetToBeCollectedDivisors);
		}
	}
}