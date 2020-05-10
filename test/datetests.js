/**
 * @file : dateTests.js
 *
 * @description : some tests on the clock object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("date basics", function( assert ) {
	var date = new ExtendedDate(10000);
	
	/**
	 * Test getTime().
	 */
	assert.equal(date.getTime(), 10000, "10000, 10000; equal succeeds");
	assert.equal(date.toString(), "00:10", "00:10, 00:10; equal succeeds");

	var anotherDate = new ExtendedDate(5000);
	var dateAddition = date.plus(anotherDate);

	/**
	 * Test dates addition.
	 */
	assert.equal(dateAddition.getTime(), 15000, "15000, 15000; equal succeeds");
	assert.equal(dateAddition.toString(), "00:15", "00:15, 00:15; equal succeeds");

	var dateDifference = date.minus(anotherDate);

	/**
	 * Test dates difference.
	 */
	assert.equal(dateDifference.getTime(), 5000, "5000, 5000; equal succeeds");
	assert.equal(dateDifference.toString(), "00:05", "00:05, 00:05; equal succeeds");

	/**
	 * Test date comparison.
	 */
	assert.ok(anotherDate.isLessThan(date), "smaller date less than bigger date succeeds");
});