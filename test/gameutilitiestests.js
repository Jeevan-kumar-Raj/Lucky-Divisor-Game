/**
 * @file : eventqueuetests.js
 *
 * @description : some tests on the EventQueue object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("Start New Play in Game Utilties", function( assert ) {
	/**
     * First create game componenets
     */
    luckyDivisor.util.createGameComponents();
    luckyDivisor.global.numberOfPlay = 0;

    /**
     * Then start a new game play;
     */
    luckyDivisor.util.game.startNewPlay();

    /**
     * Once the new game play started, we expect the following:
     * - luckyDivisor.global.pauseDuration to be 0;
     * - luckyDivisor.global.numberOfPlay to be 1;
     * - luckyDivisor.global.playHasEnded to be false;
     * - luckyDivisor.global.newGameButton to be invisible;
     * - luckyDivisor.global.eventQueue to be empty;
     * - the clock in luckyDivisor.global.topPanel to be back to zero;
     * - the emoticon in luckyDivisor.global.sidePanel to be normal.
     */
    assert.equal(luckyDivisor.global.pauseDuration, 0, "at the start of new play, pause duration equal 0 succeeds");
    assert.equal(luckyDivisor.global.numberOfPlay, 1, "at the start of the very first play, number of play equal 1 succeeds");
    assert.notOk(luckyDivisor.global.playHasEnded, "at the start of new play, playHasEnded equla false succeeds");
    assert.notOk(luckyDivisor.global.newGameButton.isVisible, "at the start of new play, new game button should not be visible");
    assert.notOk(luckyDivisor.global.eventQueue.hasEvents(), "at the start of new play, event queue should empty");
    assert.equal(luckyDivisor.global.topPanel.clock.playDuration.toString(), "00:20", "at the start of new play, the clock in the top panel should reset back to 00:20");
    assert.equal(luckyDivisor.global.sidePanel.emoticon.type, 0, "at the start of new play, the emoticon in the side panel should be normal.");

    /**
     * Now are going to call luckyDivisor.util.game.startNewPlay() a couple of times, say 10, and the create a new pn cube (with number 7). 
     * We expect the speed of the cube to be 2.6
     */
    for (var i = 0; i < 10; i++) {
        luckyDivisor.util.game.startNewPlay();
    }

    var pnCubeWithNumber1 = new PnCube(1, 13, createVector(0, 0), 4);
    var pnCubeWithNumber2 = new PnCube(2, 5, createVector(0, 0), 7);
    var pnCubeWithNumber3 = new PnCube(3, 67, createVector(0, 0), 5);
    var pnCubeWithNumber5 = new PnCube(5, 87, createVector(0, 0), 3);
    var pnCubeWithNumber7 = new PnCube(7, 3, createVector(0, 0), 2);

    assert.equal(toDecimalPlace(pnCubeWithNumber1.speed, 2), 1.82, "at the 10th play, a cube with number 1 would have a speed of 1.82");
    assert.equal(toDecimalPlace(pnCubeWithNumber2.speed, 2), 1.95, "at the 10th play, a cube with number 2 would have a speed of 1.95");
    assert.equal(toDecimalPlace(pnCubeWithNumber3.speed, 2), 2.08, "at the 10th play, a cube with number 3 would have a speed of 2.08");
    assert.equal(toDecimalPlace(pnCubeWithNumber5.speed, 2), 2.34, "at the 10th play, a cube with number 5 would have a speed of 2.34");
    assert.equal(pnCubeWithNumber7.speed, 2.6, "at the 10th play, a cube with number 7 would have a speed of 2.6");
});