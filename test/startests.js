/**
 * @file : startests.js
 *
 * @description : some tests on the Player object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */
 

QUnit.test("star basics", function( assert ) {
	/**
	 * Let's create a Star with the following:
	 * star.position = (200, 20);
	 * star.lengthOfArm = 5
	 */
	var star = new Star(createVector(200, 20), 5);
	
	assert.equal(star.position.x, 200, "upon creation star.position.x equals 200 succeeds");
	assert.equal(star.position.y, 20, "upon creation star.position.y equals 20 succeeds");
	assert.equal(star.lengthOfArm, 5, "upon creation star.lengthOfArm equals 5 succeeds");
});