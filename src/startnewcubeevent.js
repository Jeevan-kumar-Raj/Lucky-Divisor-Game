/**
 * @file : startnewcubeevent.js
 *
 * @description : An event is scheduled to run at a particular time.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class StartNewCubeEvent extends Event {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(date, columnIndex) {
		super(date, "START_NEW_CUBE_EVENT");
		
		/**
		 * The index of the column in which to start the new cube.
		 */
		this.columnIndex = columnIndex;
	}
	
	/**
	 * @description a start of new cube event handler.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	process() {
		/**
		 * Make a call to the column with index this.columnIndex to start a new cube.
		 */
		luckyDivisor.global.columns[this.columnIndex].startNewCube();
	}
}