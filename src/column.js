/**
 * @file : column.js
 *
 * @description : A Column is a tube or a line that Cubes are falling off.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class Column {
	/**
	 * @description a constructor.
	 *
	 * @param an x coordinate.
	 *
	 * @return none.
	 */
	constructor(xCordinate, index) {
		/**
		 * Because there are multiple Columns side by side on the game canvas, there is a 
		 * need to know where one starts and end. Hopefully we already know how wide each 
		 * one of them is (in the global variable COLUMN_WIDTH). As such, the following 
		 * references the x-coordinate of where a Column starts. And consequently it would 
		 * end at (x + COLUMN_WIDTH - 1) or just (x + COLUMN_WIDTH) depending one how you 
		 * look at it.
		 */
		this.x = xCordinate;
		
		/**
		 * A column has an index that can be used to reference it.
		 */
		this.index = index;

		/**
		 * A Columns contains Cube that are falling. But at the start of a play, it is not 
		 * required of a column to immediately have a Cube falling down it. As such I have 
		 * coin toss outcome to decide whether the column should have cube or not.
		 */
		this.cubes;
		
		/**
		 * the following sets the cubes in this column to start falling sometime between now 
		 * and 5 seconds later. And until this (system) time is reached, nothing is shown in 
		 * this column.
		 */
		this.startingDate;

		/**
		 * the following indicates that this column is up and running (i.e. it has Cubes 
		 * falling down it).
		 */
		this.cubesHaveStartedFalling;

		/**
		 * Handles activities that go on in this column. Mostly checking for cube collision.
		 */
		this.activityHandler = new ColumnActivityHandler(this);
	}



	/**
	 * @description returns the number of of visible cubes in this column.
	 *
	 * @param none.
	 *
	 * @return PnCubes.
	 */
	visibleCubes() {
		var theVisibleCubes = [];
		this.cubes.forEach(function(cube) {
			if (cube.visibility) {
				theVisibleCubes.push(cube);
			}
		});
		return theVisibleCubes;
	}


	/**
	 * @description displays the content of this column.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		if (this.cubesHaveStartedFalling) {
			/**
			 * Yes we are up and running, all we need to do is make the cubes still on screen fall and display them.
			 */
			this.routine();
		}
		else {
			if (this.startingDate.isLessOrEqualTo(luckyDivisor.util.date.getCurrentDate())) {
				/**
				 * Set this.cubesHaveStartedFalling to true so we do not come here again.
				 */
				this.cubesHaveStartedFalling = true;
				
				/**
				 * Because the collection of cubes at this point in time is empty, we need to add the very first cube.
				 */
				this.addCube();
				
				/**
				 * Finally go about making that very first cube fall and displayed.
				 */
				this.routine();
			}
		}
		this.activityHandler.checkForCollision();
	}


	/**
	 * @description makes every Cube in this Column fall.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	routine() {
		this.cubes.forEach(function (cube) {
			/**
			 * We want a change in the position of the cube. If it does not a fall, there will not be a change in position.
			 */
			cube.fall();
			cube.show();
		});
	}


	/**
	 * @description resets the necessary parameters of this columns.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	reset() {
		this.cubesHaveStartedFalling = false;
		
		this.cubes = [];
		
		this.startingDate = luckyDivisor.util.date.getNewColumnStartingDate();
	}

	/**
	 * @description is called upon to initiate a new cube.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	startNewCube() {
		/**
		 * Make sure this column is up and running, then add a cube to its cube collection.
		 */
		if (this.cubesHaveStartedFalling) {
			this.addCube();
		}
		else {
			/**
			 * This should never be seen.
			 */
			throw new GameException("Column " + this.index + " is not started but tried to add cubes.");
		}
	}

	
	/**
	 * @description adds a new Cube to the queue of this Column.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	addCube() {
		/**
		 * Create a new cube.
		 */
		var newCube = luckyDivisor.util.cube.getNewPnCube(this.x, this.index);
		
		/**
		 * And finally add it to the cubes collection.
		 */
		this.cubes.push(newCube);
	}
}