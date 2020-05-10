/**
 * @file : sidepanelcubetests.js
 *
 * @description : some tests on the SidePanelCube object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("side panel cube basics", function( assert ) {
    /**
     * Let's create a side panel cube with the following:
     * - position to be (400, 50)
     * - number to be 3
     * - id to be 30
     * - multiplier to be 1
     */
    var sidePanelCube = new SidePanelCube(3, 30, createVector(400, 50), 1);

    assert.equal(sidePanelCube.id, 30, "upon creation sidePanelCube.id equal 30 succeeds");
    assert.equal(sidePanelCube.number, 3, "upon creation sidePanelCube.number equal 3 succeeds");
    assert.equal(sidePanelCube.multiplier, 1, "upon creation sidePanelCube.multiplier equal 1 succeeds");
    assert.equal(sidePanelCube.position.x, 400, "upon creation sidePanelCube.position.x equal 400 succeeds");
    assert.equal(sidePanelCube.position.y, 50, "upon creation sidePanelCube.position.y equal 50 succeeds");
});


QUnit.test("side panel cube occurence notification", function( assert ) {
    /**
     * Let's create a side panel cube with the following:
     * - position to be (400, 50)
     * - number to be 3
     * - id to be 30
     * - multiplier to be 1
     */
    var sidePanelCube = new SidePanelCube(3, 30, createVector(400, 50), 1);

    /**
     * Let's notify the cube of a new occurence.
     */
    sidePanelCube.notifyOfOccurence();

    /**
     * After notification, we expect the cube multiplier to be 2.
     */
    assert.equal(sidePanelCube.multiplier, 2, "upon notification, SidePanelCube.multiplier equal 2 succeeds");
});



QUnit.test("side panel cube collection notification", function( assert ) {
    /**
     * Let's create a side panel cube with the following:
     * - position to be (400, 50)
     * - number to be 3
     * - id to be 30
     * - multiplier to be 1
     */
    var sidePanelCube = new SidePanelCube(3, 30, createVector(400, 50), 1);

    /**
     * Let's notify the cube of a new occurence.
     */
    sidePanelCube.notifyOfCollection();

    /**
     * After notification, we expect the cube multiplier to be 0.
     */
    assert.equal(sidePanelCube.multiplier, 0, "upon collection, SidePanelCube.multiplier equal 0 succeeds");
    assert.notOk(sidePanelCube.isVisible, "upon collection, SidePanelCube.isVisible equal false succeeds");
});