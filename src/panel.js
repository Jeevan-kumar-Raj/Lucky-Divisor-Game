/**
 * @file : panel.js
 *
 * @description : A panel is more of a container to hold the player's 
 * life stars, a timer and the player's score.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


class Panel {
	/**
	 * @description A function constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(position, width, height) {
		/**
		 * The position of this panel as a vector with coordinates (x, y).
		 */
		this.position = position;
		
		/**
		 * The panel is is represented as a rectangle with width and height.
		 */
		this.width = width;
		
		/**
		 * Height of the panel.
		 */
		this.height = height;
	}
}