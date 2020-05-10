/**
 * @file : missingfunctions.js
 *
 * @description : When writing the tests, for some reason the functions
 * of p5.js that I have been using cannot be found. So I needed to redefine
 * my own versions so QUnit could be happy. I think it may be a clash with the qunit librairy.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

var abs = function(number) {
	return Math.abs(number);
}

var floor = function(number) {
	return Math.floor(number);
}

var createVector = function(xValue, yValue) {
	return {
		x : xValue,
		y : yValue
	}
}

var color = function(r, g, b) {
	return [r, g, b];
}

var random = function(upper) {
	Math.random(upper);
}

var push = function() {
	/**
	 * Empty for now. Do not think I would really need it for testing purposes.
	 */
}

var pop = function() {
	/**
	 * Empty for now. Do not think I would really need it for testing purposes.
	 */
}

var red = function(rgb) {
	return 0;
}

var green = function(rgb) {
	return 0;
}

var blue = function(rgb) {
	return 0;
}

var pow = function(number) {
	return Math.pow(number);
}

var min = function (number1, number2) {
	return Math.min(number1, number2);
}

var max = function (number1, number2) {
	return Math.max(number1, number2);
}

var constrain = function (number, lowerBound, upperBound) {
	return (number < lowerBound) ? lowerBound : (number > upperBound) ? upperBound : number;
}

var toDecimalPlace = function (number, decimalPlaces) {
	var multiplier = Math.pow(10, decimalPlaces);
	return parseFloat(Math.round(number * multiplier) / multiplier).toFixed(decimalPlaces);
}

var sqrt = function (number) {
	return Math.sqrt(number);
}