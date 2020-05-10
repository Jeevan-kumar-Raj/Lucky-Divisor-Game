/**
 * @file : scoreTests.js
 *
 * @description : some tests on the score object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("score basics", function( assert ) {
	var score = new Score(0);
	assert.equal(score.score, 0);
	score.update(5);
	assert.equal(score.score, 5);
	score.update(-1);
	assert.equal(score.score, 4);
});