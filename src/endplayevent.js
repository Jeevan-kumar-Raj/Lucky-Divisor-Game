/**
 * @file : endplayevent.js
 *
 * @description : An EndPlayEvent is used to end a current play gracefully.
 * Because everything was being processed sequentially, it got to a point 
 * where the current play is ended but further processing still took place 
 * on behalf of that play. Thus the need for an event that would end 
 * everything nice and tidy.
 * This event should have priority over all others.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


class EndPlayEvent extends Event {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(date, callBack) {
		super(date, "END_PLAY_EVENT");
		
		/**
		 * The index of the column in which to start the new cube.
		 */
		this.callBack = callBack;
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
		this.callBack();
	}
}