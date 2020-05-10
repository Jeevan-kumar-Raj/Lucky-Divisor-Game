/**
 * @file : playercubetests.js
 *
 * @description : some tests on the PlayerCube object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("player cube basics", function( assert ) {
	/**
	 * Let's create a player cube with:
	 * playerCube.number = 10;
	 * playerCube.id = 0;
	 * playerCube.position = (20, 770);
	 */
	var playerCube = new PlayerCube(10, 0, createVector(20, 770));

	assert.equal(playerCube.number, 10, "playerCube.number equals 10 succeeds");
	assert.equal(playerCube.position.x, 20, "playerCube.position.x equals 20 succeeds");
	assert.equal(playerCube.position.y, 770, "pnCube.position.y equals 770 succeeds");

	/**
	 * Now let's try moving left.
	 */
	playerCube.motionHandler.moveLeft();

	/**
	 * After moving left, the x-coordinate of the cube's position should have decreased by luckyDivisor.config.DEFAULT_PLAYER_CUBE_SPEED.
	 */
	assert.equal(playerCube.position.x, 20 - playerCube.speed, "playerCube.position.x equals 20 succeeds");

	/**
	 * And the y-coordinate should not change as we are only moving side ways.
	 */
	assert.equal(playerCube.position.y, 770, "pnCube.position.y equals 770 succeeds");

	/**
	 * confirm that playerCube.alreadyCollectedDivisors is indeed empty upon creation.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 0, "upon creation the collection of already collected divisors is empty");

	/**
	 * Test that playerCube.yetToBeCollectedDivisors contains 1, 2, 5.
	 */
	assert.equal(playerCube.yetToBeCollectedDivisors.length, 3, "Given that playerCube.number is 10, playerCube.yetToBeCollectedDivisors.length equal 3 succeeds");
	assert.ok(playerCube.yetToBeCollectedDivisors.includes(1), "playerCube.yetToBeCollectedDivisors.include(1) succeeds");
	assert.ok(playerCube.yetToBeCollectedDivisors.includes(2), "playerCube.yetToBeCollectedDivisors.include(2) succeeds");
	assert.ok(playerCube.yetToBeCollectedDivisors.includes(5), "playerCube.yetToBeCollectedDivisors.include(5) succeeds");
});



QUnit.test("player cube moving left.", function( assert ) {
	/**
	 * Let's create a player cube with:
	 * playerCube.number = 10;
	 * playerCube.id = 0;
	 * playerCube.position = (20, 770);
	 */
	var playerCube = new PlayerCube(10, 0, createVector(20, 770));

	/**
	 * Now let's try moving the cube 5x to the left.
	 * Mathematically playerCube.position.x = 15 - (5 * 5) = -10.
	 * But this would put us off the canvas. As such playerCube.position.x should be automatically
	 * constrained back to 1.
	 */
	for (var i = 0; i < 5; i++) {
		playerCube.motionHandler.moveLeft();
	}

	/**
	 * Let's confirm that playerCube.position.x is indeed 1.
	 */
	assert.equal(playerCube.position.x, 1, "playerCube.position.x equals 1 succeeds");
});



QUnit.test("player cube moving right.", function( assert ) {
	/**
	 * Let's create a player cube with:
	 * playerCube.number = 10;
	 * playerCube.id = 0;
	 * playerCube.position = (20, 770);
	 */
	var playerCube = new PlayerCube(10, 0, createVector(20, 770));

	/**
	 * Now let's try moving the cube 100x to the right.
	 * Mathematically playerCube.position.x = 6 + (5 * 100) = 600.
	 * But this would put us off the canvas. As such playerCube.position.x should be automatically
	 * constrained back to (luckyDivisor.config.WIDTH_OF_CANVAS - luckyDivisor.config.SIDE_OF_CUBE - 1).
	 */
	for (var i = 0; i < 100; i++) {
		playerCube.motionHandler.moveRight();
	}

	/**
	 * Let's confirm that playerCube.position.x is indeed 1.
	 */
	assert.equal(playerCube.position.x, (luckyDivisor.config.WIDTH_OF_CANVAS - luckyDivisor.config.SIDE_OF_CUBE - 1), "playerCube.position.x equals -- succeeds");
});


QUnit.test("player cube collection", function( assert ) {
	/**
	 * Let's create a player cube with:
	 * playerCube.number = 10;
	 * playerCube.id = 0;
	 * playerCube.position = (20, 770);
	 */
	var playerCube = new PlayerCube(10, 0, createVector(20, 770));

	/**
	 * Because we have not yet collected any pn cube we expect playerCube.hasCollectedAll() to fail.
	 */
	assert.notOk(playerCube.hasCollectedAll(), "Because no pnCube is yet collected playerCube.hasCollectedAll() does not succeed");

	/**
	 * Let's create a pnCube with number 2 and make our playerCube collect.
	 */
	var pnCubeWithNumberTwo = new PnCube(2, 3, createVector(125, 770), 2);

	playerCube.collisionHandler.handleCollisionWith(pnCubeWithNumberTwo);

	/**
	 * Should pnCube2 collection be successful, we expect playerCube.alreadyCollectedDivisors
	 * to increase in length and playerCube.yetToBeCollectedDivisors to decrease in length.
	 */

	/**
	 * confirm that playerCube.alreadyCollectedDivisors is indeed of length 1.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 1, "once pnCube2 collected playerCube.alreadyCollectedDivisors.length equal 1 succeeds");

	/**
	 * confirm that playerCube.yetToBeCollectedDivisors is indeed of length 2.
	 */
	assert.equal(playerCube.yetToBeCollectedDivisors.length, 2, "Given that pnCube2 has been collected playerCube.yetToBeCollectedDivisors.length equal 2 succeeds");

	/**
	 * Let's create a new pnCube with number 5 and make our playerCube collect.
	 */
	var pnCubeWithNumberFive = new PnCube(5, 5, createVector(325, 770), 8);

	playerCube.collisionHandler.handleCollisionWith(pnCubeWithNumberFive);

	/**
	 * confirm that playerCube.alreadyCollectedDivisors is now of length 2.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 2, "once pnCube5 collected playerCube.alreadyCollectedDivisors.length equal 2 succeeds");

	/**
	 * confirm that playerCube.yetToBeCollectedDivisors is now of length 1.
	 */
	assert.equal(playerCube.yetToBeCollectedDivisors.length, 1, "Given that pnCube5 has been collected playerCube.yetToBeCollectedDivisors.length equal 1 succeeds");

	/**
	 * Yet again let's create a new pnCube with number 1 and make our playerCube collect.
	 */
	var pnCubeWithNumberOne = new PnCube(1, 13, createVector(5, 770), 0);

	playerCube.collisionHandler.handleCollisionWith(pnCubeWithNumberOne);

	/**
	 * Confirm that playerCube.alreadyCollectedDivisors is now of length 3.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 3, "once pnCube5 collected playerCube.alreadyCollectedDivisors.length equal 3 succeeds");

	/**
	 * Confirm that playerCube.yetToBeCollectedDivisors is now of length 0.
	 */
	assert.equal(playerCube.yetToBeCollectedDivisors.length, 0, "Given that pnCube1 has been collected playerCube.yetToBeCollectedDivisors.length equal 0 succeeds");

	/**
	 * Now let's try collecting an already collected pn cube, say pn cube with number 1.
	 */
	var anotherPnCubeWithNumberOne = new PnCube(1, 25, createVector(20, 770), 4);

	playerCube.collisionHandler.handleCollisionWith(anotherPnCubeWithNumberOne);

	/**
	 * Confirm that playerCube.alreadyCollectedDivisors is still of length 3.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 3, "once pnCube5 collected playerCube.alreadyCollectedDivisors.length equal 3 succeeds");

	/**
	 * Confirm that playerCube.yetToBeCollectedDivisors is still of length 0.
	 */
	assert.equal(playerCube.yetToBeCollectedDivisors.length, 0, "Given that pnCube1 has been collected playerCube.yetToBeCollectedDivisors.length equal 0 succeeds");
});



QUnit.test("player cube negative score penalty", function( assert ) {
	/**
	 * Let's create the following objects:
	 * - a new global player
	 * - a new player cube with number 27;
	 * - a new pn cube with number 3;
	 */
	luckyDivisor.global.player = new Player();
	luckyDivisor.global.player.init();
	var playerCube = new PlayerCube(9, 0, createVector(20, 770));

	/**
	 * Let's try collecting pnCubeWithNumberThree.
	 */
	playerCube.collisionHandler.handleCollisionWith(new PnCube(3, 25, createVector(20, 770), 4));

	/**
	 * After the above, we excpect the length of playerCube.alreadyCollectedDivisors to be 1.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 1, "once a pn cube, with number 3, collected playerCube.alreadyCollectedDivisors.length equal 1 succeeds");

	/**
	 * We also excpect the player score to be 3.
	 */
	var player = luckyDivisor.global.player;
	assert.equal(player.score.score, 3, "once a pn cube with number 3 collected player.score.score equal 3 succeeds");

	/**
	 * Let's try collecting another pn cube with number 3.
	 */
	playerCube.collisionHandler.handleCollisionWith(new PnCube(3, 32, createVector(20, 770), 4));

	/**
	 * After the above, we excpect the length of playerCube.alreadyCollectedDivisors to be 2.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 2, "once another pn cube, with number 3, collected playerCube.alreadyCollectedDivisors.length equal 2 succeeds");

	/**
	 * We also excpect the player score to be 6.
	 */
	assert.equal(player.score.score, 6, "once another pn cube, with number 3, collect player.score.score equal 6 succeeds");

	/**
	 * Now, let's try collecting yet another pn cube with number 3.
	 */
	playerCube.collisionHandler.handleCollisionWith(new PnCube(3, 45, createVector(20, 770), 4));

	/**
	 * We now excpect the length of playerCube.alreadyCollectedDivisors to be 2.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 2, "because another pn cube, with number 3 which we were not supposed to collect, has been collected playerCube.alreadyCollectedDivisors.length equal 2 succeeds");

	/**
	 * We also excpect to get penalised for collecting a new pn cube with number 3. Thus the player score to be 3.
	 */
	assert.equal(player.score.score, 3, "because another pn cube, with number 3 which we were not supposed to collect, has been collected player.score.score equal 3 succeeds");

	/**
	 * Finally collecting a new pn cube with number 1 should increment the player score again.
	 */
	playerCube.collisionHandler.handleCollisionWith(new PnCube(1, 54, createVector(20, 770), 4));

	/**
	 * After the above, we excpect the length of playerCube.alreadyCollectedDivisors to be 3.
	 */
	assert.equal(playerCube.alreadyCollectedDivisors.length, 3, "upon collection of the new pn cube, with number 1, playerCube.alreadyCollectedDivisors.length equal 3 succeeds");

	/**
	 * We also excpect to get penalised for collection the new pn cube with number 3. Thus the player score to be 3.
	 */
	assert.equal(player.score.score, 4, "upon collection of the new pn cube, with number 1, player.score.score equal 4 succeeds");
});