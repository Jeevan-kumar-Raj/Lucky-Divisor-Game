/**
 * @file : dateUtilities.js
 *
 * @description : The commonly used functions that are related to date.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

var luckyDivisor = luckyDivisor || {};
luckyDivisor.util.date = {};

/**
 * @description creates a new time for the current column being is different 
 * from that of the previous column.
 *
 * @param none.
 *
 * @return ExtendedDate.
 */
luckyDivisor.util.date.getNewColumnStartingDate = function() {
	var newColumnStartingDate = new ExtendedDate(luckyDivisor.util.date.getCurrentDate().getTime() + random(luckyDivisor.global.cubeDelays) * 1000);
	
	/**
	 * We want the new date generated to be at least 0.5 seconds into the future.
	 */
	while(luckyDivisor.global.previousColumnStartingDate != undefined && newColumnStartingDate.minus(previousColumnStartingDate).getTime() <= 500) {
		newColumnStartingDate = new ExtendedDate(luckyDivisor.util.date.getCurrentDate() + random(luckyDivisor.global.cubeDelays) * 1000);
	}
	
	previousColumnStartingDate = newColumnStartingDate;
	
	return newColumnStartingDate;
}


/**
 * @description returns the current system date as an Extended date.
 *
 * @param none. 
 *
 * @return ExtendedDate.
 */
luckyDivisor.util.date.getCurrentDate = function() {
	var currentDate = new Date();
	return new ExtendedDate(currentDate.getTime());
}