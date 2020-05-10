/**
 * @file : clockTests.js
 *
 * @description : some tests on the clock object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("clock basics", function( assert ) {
	var clock = new Clock();
	clock.init();

	assert.notOk(clock.hasStarted, "upon clock init hasStarted does not succeed");
	
	assert.equal(clock.playDuration.toString(), "00:20", "upon clock init playDuration equal 00:20 succeeds");

	assert.equal(clock.stringTimeTillEndOfPlay, "00:20", "upon clock init stringTimeTillEndOfPlay equal 00:20 succeeds");

	clock.start();

	assert.ok(clock.hasStarted, "once clock started hasStarted succeeds");
});