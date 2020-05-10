/**
 * @file : eventqueuetests.js
 *
 * @description : some tests on the EventQueue object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("event queue basics", function( assert ) {
	var eventQueue = new EventQueue();

	assert.equal(eventQueue.queue.length, 0, "upon creation eventQueue.queue.length equal 0 succeeds");
});