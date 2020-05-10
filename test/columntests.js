/**
 * @file : columntests.js
 *
 * @description : some tests on the Column object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("column basics", function( assert ) {
  /**
   * Let's create a column with the following:
   * column.xCoordinate = 0;
   * column.index = 0;
   */
  var column = new Column(0, 0);

  assert.equal(column.x, 0, "upon creation, column.xCoordinate equals 0 succeeds");
  assert.equal(column.index, 0, "upon creation, column.index equals 0 succeeds");
});
