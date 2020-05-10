/**
 * @file : pnCubeMotionHandler.js
 *
 * @description : A Motion object handles all movement of an object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class PnCubeMotionHandler {
	/**
	 * @description a constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(cube) {
		this.cube = cube;
	}


	/**
	 * @description moves the object.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	fall() {
		this.cube.position.y += this.cube.speed;

		/**
		 * Check whether the Cube has fallen off the canvas.
		 */
		if (this.cube.position.y > luckyDivisor.config.HEIGHT_OF_CANVAS) {
			this.cube.visibility = false;
		}

		/**
		 * Should this be the first time we come here, mark this.hasStarted as true.
		 * Otherwise check whether we are pass the halfway point. If so create a new
		 * StartNewCubeEvent and schedule it for sometime now until this cube falls
		 * off the canvas.
		 */
		if (!this.cube.hasStarted) {
			this.cube.hasStarted = true;
			this.cube.startDate = luckyDivisor.util.date.getCurrentDate();
		}
		else {
			/**
			 * Check whether this cube is a third of the way through.
			 */
			if ((this.cube.position.y >= this.cube.demarcationHeight) && !this.cube.hasAlreadyInitiatedNewCubeStart) {
				/**
				 * The following refers to how much seconds it took this cube to go a 3rd of the way.
				 */
				var secondDifference = luckyDivisor.util.cubeActiveMilliSeconds(this.cube.startDate) / 1000;

				/**
				 * The next cube in the column of this cube will be set to fall sometimes now and the
				 * time it took this cube to fall a 3rd of the way in the future.
				 * The following floor(random(secondDifference) * 1000) may appear confusing. You would
				 * pose the question, why not have milliseconds different instead and have
				 * floor(random(millisecondsDifference)), which is perfectly fine. But I do not want to
				 * make the random number generator range too wide, reason why I choose to generate a
				 * random second and convert it back to millisecond.
				 */
				var eventDate = new ExtendedDate(luckyDivisor.util.date.getCurrentDate().getTime() + floor(random(secondDifference) * 1000));

				luckyDivisor.util.pushNewEventToQueue(new StartNewCubeEvent(eventDate, this.cube.columnIndex));

				/**
				 * Stop this cube from initiating further new starts.
				 */
				this.cube.hasAlreadyInitiatedNewCubeStart = true;
			}
		}
	}
}