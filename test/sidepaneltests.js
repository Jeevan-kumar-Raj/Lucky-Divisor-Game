/**
 * @file : sidepaneltests.js
 *
 * @description : some tests on the SidePanel object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("side panel basics", function( assert ) {
	var sidePanel = new SidePanel();

	/**
	 * When a new side panel is created we expect it to be placed at the right of the game canvas.
	 */
	assert.equal(sidePanel.position.x, luckyDivisor.config.WIDTH_OF_CANVAS, "upon creation sidePanel.position.x equal WIDTH_OF_CANVAS succeeds");
	assert.equal(sidePanel.position.y, 0, "upon creation sidePanel.position.y equal 0 succeeds");
	
	/**
	 * We also expect it to have width and height as set in the config file
	 */
	assert.equal(sidePanel.width, luckyDivisor.config.WIDTH_OF_SIDE_PANEL, "upon creation sidePanel.width equal WIDTH_OF_SIDE_PANEL succeeds");
	assert.equal(sidePanel.height, luckyDivisor.config.HEIGHT_OF_SIDE_PANEL, "upon creation sidePanel.height equal HEIGHT_OF_SIDE_PANEL succeeds");

	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 0, "upon creation there should not be any cubes yet to be collected");

	/**
	 * Let's reset the side panel now and confirm that everything is as it is supposed to.
	 * For the reset to work, we need a player cube. As such, let create one with number 10.
	 */
	luckyDivisor.global.playerCube = new PlayerCube(10, 0, createVector(20, 770));
	sidePanel.reset();

	/**
	 * Upon reset, we expect the following:
	 * - sidePanel.pnCubesYetToBeCollected.length to be 3 (i.e. cubes with number 1, 2 and 5).
	 * - sidePanel.emoticon to be normal face.
	 */
	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 3, "upon reset sidePanel.pnCubesYetToBeCollected.length equal 3 succeeds");
	assert.equal(sidePanel.emoticon.type, 0, "upon reset, emoticon should display normal face");
});



QUnit.test("side panel cubes position", function( assert ) {
	/**
	 * Let's create side panel.
	 */
	var sidePanel = new SidePanel();

	/**
	 * We need to reset the side panel and for that to happen we need a player cube created.
	 */
	luckyDivisor.global.playerCube = new PlayerCube(60, 0, createVector(20, 770));
	sidePanel.reset();

	/**
	 * Obviously the number of pn cube yet to be collected should be 4.
	 */
	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 4, "upon reset sidePanel.pnCubesYetToBeCollected.length equal 4 succeeds");
	
	/**
	 * Now lets confirm the cubes in the collection.
	 */
	var x = sidePanel.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;
	var y = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + sidePanel.emoticon.size;

	assert.equal(sidePanel.pnCubesYetToBeCollected[0].number, 1, "first cube in the collection should be 1");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].multiplier, 1, "first cube in the collection should only occur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.x, x, "first cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.y, y, "first cube in the collection should have position.y equal 80");

	assert.equal(sidePanel.pnCubesYetToBeCollected[1].number, 2, "second cube in the collection should be 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].multiplier, 2, "second cube in the collection should occure twice 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.x, x, "second cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.y, y + (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "second cube in the collection should have position.y equal (95 + luckyDivisor.config.SIDE_OF_CUBE)");
	
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].number, 3, "third cube in the collection should be 3");
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].multiplier, 1, "third cube in the collection should only occcur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].position.x, x, "third cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].position.y, y + 2 * (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "third cube in the collection should have position.y equal (110 + luckyDivisor.config.SIDE_OF_CUBE)");
	
	assert.equal(sidePanel.pnCubesYetToBeCollected[3].number, 5, "fourth cube in the collection should be 5");
	assert.equal(sidePanel.pnCubesYetToBeCollected[3].multiplier, 1, "fourth cube in the collection should only occur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[3].position.x, x, "fourth cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[3].position.y, y + 3 * (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "fourth cube in the collection should have position.y equal (125 + luckyDivisor.config.SIDE_OF_CUBE)");
});



QUnit.test("side panel cubes rearrangement", function( assert ) {
	/**
	 * Let's create side panel.
	 */
	var sidePanel = new SidePanel();

	/**
	 * We need to reset the side panel and for that to happen we need a player cube created.
	 */
	luckyDivisor.global.playerCube = new PlayerCube(60, 0, createVector(20, 770));
	sidePanel.reset();

	/**
	 * Now let's collect the cube with number 1
	 */
	sidePanel.update(1);

	/**
	 * Because of the above, all other cubes should move up.
	 */
	var x = sidePanel.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;
	var y = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + sidePanel.emoticon.size;

	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 3, "after collecting the cube with number 1, sidePanel.pnCubesYetToBeCollected.length equal 3 now succeeds");

	assert.equal(sidePanel.pnCubesYetToBeCollected[0].number, 2, "first cube in the collection should be 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].multiplier, 2, "first cube in the collection should occure twice 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.x, x, "first cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.y, y, "first cube in the collection should have position.y equal 90");
	
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].number, 3, "second cube in the collection should be 3");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].multiplier, 1, "second cube in the collection should only occcur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.x, x, "second cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.y, y + (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "second cube in the collection should have position.y equal (95 + luckyDivisor.config.SIDE_OF_CUBE)");
	
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].number, 5, "third cube in the collection should be 5");
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].multiplier, 1, "third cube in the collection should only occur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].position.x, x, "third cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[2].position.y, y + 2 * (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "third cube in the collection should have position.y equal (110 + luckyDivisor.config.SIDE_OF_CUBE)");

	/**
	 * Now let's collect the cube with number 3.
	 */
	sidePanel.update(3);

	/**
	 * Because of the above, all other cubes should move up.
	 */
	var x = sidePanel.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;
	var y = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + sidePanel.emoticon.size;

	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 2, "after collecting the cube with number 3, sidePanel.pnCubesYetToBeCollected.length equal 2 now succeeds");

	assert.equal(sidePanel.pnCubesYetToBeCollected[0].number, 2, "first cube in the collection should be 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].multiplier, 2, "first cube in the collection should occure twice 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.x, x, "first cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.y, y, "first cube in the collection should have position.y equal 80");
	
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].number, 5, "second cube in the collection should be 5");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].multiplier, 1, "second cube in the collection should only occur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.x, x, "second cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.y, y + (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "second cube in the collection should have position.y equal (95 + luckyDivisor.config.SIDE_OF_CUBE)");

	/**
	 * Now let's collect the cube with number 2.
	 */
	sidePanel.update(2);

	/**
	 * Because of the above, all other cubes should move up.
	 */
	var x = sidePanel.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;
	var y = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + sidePanel.emoticon.size;

	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 2, "after collecting the cube with number 2, sidePanel.pnCubesYetToBeCollected.length equal 2 now succeeds");

	assert.equal(sidePanel.pnCubesYetToBeCollected[0].number, 2, "first cube in the collection should be 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].multiplier, 1, "first cube in the collection should occure twice 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.x, x, "first cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.y, y, "first cube in the collection should have position.y equal 80");

	assert.equal(sidePanel.pnCubesYetToBeCollected[1].number, 5, "second cube in the collection should be 5");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].multiplier, 1, "second cube in the collection should only occur once");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.x, x, "second cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[1].position.y, y + (luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + luckyDivisor.config.SIDE_OF_CUBE), "second cube in the collection should have position.y equal (95 + luckyDivisor.config.SIDE_OF_CUBE)");

	/**
	 * Now let's collect the cube with number 5.
	 */
	sidePanel.update(5);

	/**
	 * Because of the above, all other cubes should move up.
	 */
	var x = sidePanel.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;
	var y = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + sidePanel.emoticon.size;

	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 1, "after collecting the cube with number 5, sidePanel.pnCubesYetToBeCollected.length equal 1 succeeds");

	assert.equal(sidePanel.pnCubesYetToBeCollected[0].number, 2, "first cube in the collection should be 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].multiplier, 1, "first cube in the collection should occure twice 2");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.x, x, "first cube in the collection should have position.x equal 415");
	assert.equal(sidePanel.pnCubesYetToBeCollected[0].position.y, y, "first cube in the collection should have position.y equal 80");

	/**
	 * Now let's collect the cube with number 2 a second time.
	 */
	sidePanel.update(2);

	/**
	 * Because of the above, all other cubes should move up.
	 */
	var x = sidePanel.position.x + luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING;
	var y = 2 * luckyDivisor.config.DEFAULT_SIDE_PANEL_PADDING + sidePanel.emoticon.size;

	assert.equal(sidePanel.pnCubesYetToBeCollected.length, 0, "after collecting the cube with number 2 again, sidePanel.pnCubesYetToBeCollected.length equal 0 succeeds");
});