/**
 * @file : playertests.js
 *
 * @description : some tests on the Player object.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */


QUnit.test("player basics", function( assert ) {
	var player = new Player();

	assert.equal(player.name, "PLAYER", "upon creation player.name equals PLAYER succeeds");
	assert.equal(player.bestScore, 0, "upon creation player.bestScore equals 0 succeeds");
	assert.equal(player.creditPoints, 0, "upon creation player.creditPoints equals 0 succeeds");

	player.init();

	assert.equal(player.score.score, 0, "upon init player.score.score equals 0 succeeds");
	assert.equal(player.playerLifeStars.length, luckyDivisor.config.NUMBER_OF_PLAYER_STARTING_LIFE_STARS, "upon init player.playerLifeStars.length equals 5 succeeds");
	assert.ok(player.playerLifeStarsLocked, "initially the player life stars are locked (i.e. not open for addition or removal)");

  /**
   * Beware the starting player life stars get created upon initialisation.
   */
	assert.equal(player.nextPlayerStarPositionX, luckyDivisor.config.PLAYER_STARS_STARTING_POSITION + (luckyDivisor.config.NUMBER_OF_PLAYER_STARTING_LIFE_STARS * luckyDivisor.config.SIZE_OF_A_PLAYER_STAR), "The very first player life star is displayed at luckyDivisor.config.PLAYER_STARS_STARTING_POSITION");

  player.updateScore(7);

  assert.equal(player.score.score, 7, "upon updating score player.score.score equals 7 succeeds");
});