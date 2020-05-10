/**
 * @file : eventtests.js
 *
 * @description : some tests on the Event object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("event basics", function( assert ) {
	var eventDate = luckyDivisor.util.date.getCurrentDate();
	var event = new Event(eventDate);
	
	assert.ok(event.date.equals(eventDate), "upon creation event.date equal eventDate succeeds");
});