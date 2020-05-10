/**
 * @file : toppaneltests.js
 *
 * @description : some tests on the TopPanel object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("toppanel basics", function( assert ) {
	var topPanel = new TopPanel();

	assert.equal(topPanel.position.x, 0, "upon creation topPanel.position.x equal 0 succeeds");
	assert.equal(topPanel.position.y, 0, "upon creation topPanel.position.y equal 0 succeeds");	
	assert.equal(topPanel.width, luckyDivisor.config.WIDTH_OF_CANVAS, "upon creation topPanel.width equal WIDTH_OF_CANVAS succeeds");
	assert.equal(topPanel.height, luckyDivisor.config.HEIGHT_TOP_PANEL, "upon creation topPanel.height equal HEIGHT_TOP_PANEL succeeds");
});