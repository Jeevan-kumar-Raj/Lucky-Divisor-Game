/**
 * @file : button.js
 *
 * @description : A Button is an indicator of an end of game. It allows the player to starts a new game.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class Button {
	/**
	 * @description constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	constructor(label, position, width, height, callback) {
		this.label = label;
		this.position = position;
		this.width = width;
		this.height = height;
		this.isVisible = false;
		this.callback = callback;
	}
	
	/**
	 * @description displays this button on the canvas.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	show() {
		if (this.isVisible) {
			/**
			 * Save current state.
			 */
			push();
			
			noStroke();
			strokeWeight(1);
			fill(255);
			rect(this.position.x, this.position.y, this.width, this.height);
			fill(0);
			noStroke();
			textSize(luckyDivisor.config.DEFAULT_BUTTON_TEXT_SIZE);
			var paddingX = (this.width - textWidth(this.label)) / 2;
			var paddingY = (this.height - luckyDivisor.config.DEFAULT_BUTTON_TEXT_SIZE) / 3;
			text(this.label, this.position.x + paddingX, this.position.y + luckyDivisor.config.DEFAULT_BUTTON_TEXT_SIZE + paddingY);
			
			/**
			 * Restore previous state.
			 */
			pop();
		}
	}
	
	
	/**
	 * @description a mouse listener on this button.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
	mouseClick(x, y) {
		if (this.isVisible) {
			if ((this.callback != null) && (x > this.position.x) && (x <= this.position.x + this.width) && (y > this.position.y) && (y <= this.position.y + this.height)) {
				this.callback();
			}
		}
	}
}