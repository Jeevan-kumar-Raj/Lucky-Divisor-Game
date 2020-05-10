/**
 * @file : emoticon.js
 *
 * @description : Can create a smiley or a sad face.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class Emoticon {
	
	/**
	 * @description constructor.
	 *
	 * @param position, size, type.
	 *
	 * @return none.
	 */
	constructor(position, size, type) {
		/**
		 * Indicates where on the canvas to display this emoticon.
		 */
		this.position = position;
		
		/**
		 * Make reference to how big (as in pixels) this emoticon would be.
		 */
		this.size = size;
		
		/**
		 * -1 for angry face;
		 *  0 for normal face;
		 *  1 for smiley face;
		 */
		this.type = type;
	}

	
	/**
	 * @description displays this emoticon on the canvas.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		/**
		 * Save the current state.
		 */
		push();

		fill(color('white'));
		strokeWeight(3);

		/**
		 * Print the head.
		 */
		ellipse(this.position.x, this.position.y, this.size, this.size);

		/**
		 * Print the smile or anger.
		 */
		if (this.type == -1) {
			/**
			 * not happy.
			 */
			arc(this.position.x, this.position.y + this.size * 0.3, this.size * 0.6, this.size * 0.5, PI + (PI / 6), TWO_PI - (PI / 6));
		}
		else if (this.type == 0) {
			/**
			 * normal.
			 */
			line(this.position.x - this.size * 0.25, this.position.y + this.size * 0.2, this.position.x + this.size * 0.25, this.position.y + this.size * 0.2);
		}
		else if (this.type == 1) {
			/**
			 * happy.
			 */
			arc(this.position.x, this.position.y, this.size * 0.6, this.size * 0.5, (PI / 6), PI - (PI / 6));
		}
		
		fill(color('black'));

		/**
		 * Print the eyes.
		 */
		ellipse(this.position.x - (this.size * 0.15), this.position.y - (this.size / 4), this.size * 0.06, 7);
		ellipse(this.position.x + (this.size * 0.15), this.position.y - (this.size / 4), this.size * 0.06, 7);

		/**
		 * restore previous state.
		 */
		pop();
	}
}