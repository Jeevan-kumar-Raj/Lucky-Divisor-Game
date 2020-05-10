/**
 * @file : eventqueue.js
 *
 * @description : An EventQueue is an array with order property. 
 * It is sorted in increasing order of scheduled time.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


class EventQueue {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor() {
		this.queue = [];
	}


	/**
	 * @description adds an event to this event queue add the appropriate position.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	push(newEvent) {
		/**
		 * Down the line it may be best to create event priorities (i.e. event.priority).
		 * As such event comparision would start from priority and cascade down to date. 
		 */
		if (newEvent.type === "END_PLAY_EVENT") {
			this.queue.splice(0, 0, newEvent);
		}
		else {
			if (this.queue.length == 0 || this.queue[this.queue.length - 1].date.isLessOrEqualTo(newEvent.date)) {
				this.queue.push(newEvent);
			}
			else {
				for (var i = 0; i < this.queue.length; i++) {
					/**
					 * If the new event is set to be fired sooner than the event at this index, 
					 * then push the current event at this index further into the queue and insert 
					 * the new event at this position.
					 */
					if (newEvent.date.isLessOrEqualTo(this.queue[i].date)) {
						this.queue.splice(i, 0, newEvent);
						break;
					}
				}
			}
		}
	}


	/**
	 * @description check whether this queue has events.
	 *
	 * @param none.
	 *
	 * @return true or false.
	 */
	hasEvents() {
		/**
		 * Check that the queue is not empty.
		 */
		return (this.queue.length > 0);
	}


	/**
	 * @description returns the first element in the queue. 
	 * Should the queue be queue be empty it returns null.
	 *
	 * @param none.
	 *
	 * @return event.
	 */
	peek() {
		return (this.hasEvents()) ? this.queue[0] : null;
	}


	/**
	 * @description remove the event at the specified index.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	remove(index) {
		this.queue.splice(index, 1);
	}


	/**
	 * @description resets the internal queue to an empty string.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	reset() {
		this.queue = [];
	}
}