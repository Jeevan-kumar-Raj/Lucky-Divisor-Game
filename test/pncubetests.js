/**
 * @file : pncubetests.js
 *
 * @description : some tests on the Cube object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("pn cube basics", function( assert ) {
	/**
	 * The following initialisations needed for the cube creation to operate properly.
	 */
	luckyDivisor.global.pauseDuration = 0;
	luckyDivisor.global.eventQueue = new EventQueue();

	/**
	 * Let's create a PnCube with:
	 * pnCube.number = 5;
	 * pnCube.id = 3;
	 * pnCube.position = (0, 0);
	 * pnCube.columnIndex = 2;
	 */
	var pnCube = new PnCube(5, 3, createVector(0, 0), 2);

	assert.ok(pnCube.visibility, "upon creation pnCube.visibility should be true");
	assert.notOk(pnCube.hasStarted, "upon creation pnCube.hasStarted should be false");
	assert.notOk(pnCube.hasAlreadyInitiatedNewCubeStart, "upon creation pnCube.hasAlreadyInitiatedNewCubeStart should be false");
	assert.equal(pnCube.number, 5, "pnCube.number equals 5 succeeds");
	assert.equal(pnCube.columnIndex, 2, "pnCube.columnIndex equals 2 succeeds");
	assert.equal(pnCube.position.x, 0, "pnCube.position.x equals 0 succeeds");
	assert.equal(pnCube.position.y, 0, "pnCube.position.y equals 0 succeeds");
	assert.equal(pnCube.speed, (1.3 + 0.1 * 5), "pnCube.speed equals 1.8 succeeds");

	pnCube.fall();

	/**
	 * Because the cube has fallen (at least once), then it should have started.
	 * And its start date should be equal to the current date. Moreover the cube's
	 * position.y should have increased by the cube's speed.
	 */
	assert.ok(pnCube.hasStarted, "upon fall pnCube.hasStarted should be true");
	assert.ok(pnCube.startDate.equals(luckyDivisor.util.date.getCurrentDate()), "upon fall pnCube.startDate equals succeeds");
	assert.equal(pnCube.position.y, 1.8, "upon fall pnCube.position.y equals 1.8 succeeds");

	/**
	 * Now let's make the cube fall until it falls off the canvas.
	 */
	while (pnCube.position.y < luckyDivisor.config.HEIGHT_OF_CANVAS) {
		pnCube.fall();
	}

	/**
	 * Let's make sure that the cube has indeed fallen off the canvas.
	 */
	assert.ok(pnCube.position.y >= luckyDivisor.config.HEIGHT_OF_CANVAS, "once pnCube has fallen off the canvas pnCube.position.y >= luckyDivisor.config.HEIGHT_OF_CANVAS succeeds");

	/**
	 * It is important to reset the cube back to invisibility.
	 */
	assert.notOk(pnCube.visibility, "once pnCube has fallen off the canvas pnCube.visibility should be false");

	/**
	 * Let create another Pn Cube with number 3.
	 */
	var anotherPnCube = new PnCube(3, 10, createVector(0, 0), 2);

	pnCube.collisionHandler.handleCollisionWith(anotherPnCube);

	/**
	 * Now let's check the respective speeds. 
	 */
	assert.equal(toDecimalPlace(pnCube.speed, 2), 1.65, "after collision, pnCube.speed equal 1.65 succeeds");
	assert.equal(anotherPnCube.speed, 1.85, "after collision, anotherPnCube.speed equal 1.85 succeeds");

	/**
	 * Now let's create two new cubes, namely lowerCube and upperCube, where:
	 * lowerCube would have number 2, and 
	 * upperCube would have number 5
	 */
	var upperCube = new PnCube(5, 3, createVector(0, 0), 2);
	var lowerCube = new PnCube(2, 10, createVector(0, 40), 2);

	/**
	 * Thereafter let's make the two cubes collide.
	 */
	lowerCube.collisionHandler.handleCollisionWith(upperCube);

	/**
	 * After collision we expect the two cubes to be merged into one, with upperCube not visible anymore.
	 */
	assert.notOk(upperCube.visibility, "because upperCube came into the collision from on top, after the collision upperCube.visibility equals false succeeds");
	assert.ok(lowerCube.visibility, "lowerCube.visibility after the merge equals true succeeds");
	assert.equal(lowerCube.number, 7, "anotherPnCube.number after the merge equals 7 succeeds.");
	assert.equal(lowerCube.speed, (1.3 + 0.1 * 7), "anotherPnCube.speed after the merge equals 2 succeeds.");
});