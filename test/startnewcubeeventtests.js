/**
 * @file : startnewcubeeventtests.js
 *
 * @description : some tests on the StartNewCubeEvent object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("start new cube event basics", function( assert ) {
	var eventDate = luckyDivisor.util.date.getCurrentDate();

	/**
	 * Let's create a new start event to be scheduled @ the current date in column 3.
	 */
	var event = new StartNewCubeEvent(eventDate, 3);
	
	assert.ok(event.date.equals(eventDate), "upon creation event.date equal eventDate succeeds");
	assert.equal(event.columnIndex, 3, "upon creation event.columnIndex equal 3 succeeds");

	/**
	 * TODO: Test processing of new start event.
	 */
});