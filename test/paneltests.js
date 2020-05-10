/**
 * @file : paneltests.js
 *
 * @description : some tests on the Panel object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("panel basics", function( assert ) {
	var panel = new Panel(createVector(0, 0), 100, 20);
	
	assert.equal(panel.position.x, 0, "upon creation panel.position.x equal 0 succeeds");
	assert.equal(panel.position.y, 0, "upon creation panel.position.y equal 0 succeeds");	
	assert.equal(panel.width, 100, "upon creation panel.width equal 100 succeeds");
	assert.equal(panel.height, 20, "upon creation panel.height equal 20 succeeds");
});