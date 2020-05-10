/**
 * @file : cubeUtilities.js
 *
 * @description : Config is simply an assembly of all global variables and functions.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

var luckyDivisor = luckyDivisor || {};
luckyDivisor.util.cube = {};


/**
 * @description updates both pnCubeCreationReccordMap and numberOfPnCubeCreated to take into account the new prime number just have been generated.
 *
 * @param prime number.
 *
 * @return none.
 */
luckyDivisor.util.cube.updatePnCubeCreationRecords = function(primeNuber) {
    ++luckyDivisor.global.pnCubeCreationReccordMap[primeNuber];
    ++luckyDivisor.global.numberOfPnCubeCreated;
}


/**
 * @description returns the prime number with the least occurrence so far in the play.
 *
 * @param none.
 *
 * @return number.
 */
luckyDivisor.util.cube.getPrimeNumberWithTheLeastOccurrence = function() {
    /**
     * The following is done so that in the worat possible case, something is at least resturn that is actually a prime factor.
     */
    var primeNumberWithTheLeastOccurrence = 1;

    /**
     * The idea here is that, as long as every column does not have a cube yet, we keep generating them randomly.
     * There may be additional constraint in the future (i.e. something like not having two same cubes following 
     * each other the in same column or simply restricting the same cube in two side by side columns).
     */
    if (luckyDivisor.global.numberOfPnCubeCreated < luckyDivisor.global.NUMBER_OF_COLUMNS) {
        primeNumberWithTheLeastOccurrence = random(primeNumbers);
        luckyDivisor.util.cube.updatePnCubeCreationRecords(primeNumberWithTheLeastOccurrence);
    } else {
        /**
         * Get the prime number with the minimum occurrence.
         */
        for (var key in luckyDivisor.global.pnCubeCreationReccordMap) {
            if (luckyDivisor.global.pnCubeCreationReccordMap[key] < luckyDivisor.global.pnCubeCreationReccordMap[primeNumberWithTheLeastOccurrence]) {
                /**
                 * key in this case is a string. Strange I know, even though I add it as a number, 
                 * it comes out as a string. So it requires the parsing back to number. 
                 */
                primeNumberWithTheLeastOccurrence = parseInt(key);
            }
        }
        luckyDivisor.util.cube.updatePnCubeCreationRecords(primeNumberWithTheLeastOccurrence);
    }

    return primeNumberWithTheLeastOccurrence;
}



/**
 * @description creates a new Pn Cube.
 *
 * @param xCoordinate.
 *
 * @return PnCube.
 */
luckyDivisor.util.cube.getNewPnCube = function(columnPositionX, columnIndex) {
    var primeNumber = luckyDivisor.util.cube.getPrimeNumberWithTheLeastOccurrence();
    return new PnCube(primeNumber, luckyDivisor.util.newID(), createVector(columnPositionX + luckyDivisor.config.DEFAULT_COLUMN_PADDING, 0), columnIndex);
}


/**
 * @description A function to convert LAB to RGB.
 *
 * @param an array of containing the L, A and B values make up an RGB colour.
 *
 * @return numbers
 */
luckyDivisor.util.cube.LABtoRGB = function(lab) {
    var y = (lab[0] + 16) / 116;
    var x = lab[1] / 500 + y;
    var z = y - lab[2] / 200;
    var r, g, b;

    x = 0.95047 * ((pow(x, 3) > 0.008856) ? pow(x, 3) : (x - 16 / 116) / 7.787);
    y = 1.00000 * ((pow(y, 3) > 0.008856) ? pow(y, 3) : (y - 16 / 116) / 7.787);
    z = 1.08883 * ((pow(z, 3) > 0.008856) ? pow(z, 3) : (z - 16 / 116) / 7.787);

    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.2040 + z * 1.0570;

    r = (r > 0.0031308) ? (1.055 * pow(r, 1 / 2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * pow(g, 1 / 2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * pow(b, 1 / 2.4) - 0.055) : 12.92 * b;

    return [max(0, min(1, r)) * 255, max(0, min(1, g)) * 255, max(0, min(1, b)) * 255];
}


/**
 * @description A function to convert RGB to LAB.
 *
 * @param an rgb colour.
 *
 * @return numbers.
 */
luckyDivisor.util.cube.RGBtoLAB = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var x, y, z;

    r = (r > 0.04045) ? pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
}



/**
 * @description A function to convert CMYK to RGB.
 *
 * @param an array that contains the cyan, magenta, yellow and key values corresponding to an RGB colour.
 *
 * @return color.
 */
luckyDivisor.util.cube.CMYKtoRGB = function(cmyk) {
    var cyan = cmyk[0];
    var magenta = cmyk[1];
    var yellow = cmyk[2];
    var key = cmyk[3];

    var red = -((cyan * (255 - key)) / 255 + key - 255);
    var green = -((magenta * (255 - key)) / 255 + key - 255);
    var blue = -((yellow * (255 - key)) / 255 + key - 255);

    return color(red, green, blue);
}



/**
 * @description A function to convert RGB to CMYK.
 *
 * @param an RGB colour.
 *
 * @return numbers.
 */
luckyDivisor.util.cube.RGBtoCMYK = function(colour) {
    var red = red(colour);
    var green = green(colour);
    var blue = blue(colour);

    var key = min(255 - red, min(255 - green, 255 - blue));
    var cyan = 255 * (255 - red - key) / (255 - key);
    var magenta = 255 * (255 - green - key) / (255 - key);
    var yellow = 255 * (255 - blue - key) / (255 - key);

    var cmyk = [];
    cmyk.push(cyan);
    cmyk.push(magenta);
    cmyk.push(yellow);
    cmyk.push(key);

    return cmyk;
}



/**
 * @description A function that given a list divisors, returns a combination of all their colours put together.
 *
 * @param an array of prime numbers less than 10 and excluding 0.
 *
 * @return color.
 */
luckyDivisor.util.cube.combineColours = function(divisors) {
    var resultingColour = luckyDivisor.util.math.addRGBs(luckyDivisor.config.CUBE_COLOUR_MAP[divisors[0]], luckyDivisor.config.CUBE_COLOUR_MAP[divisors[1]]);

    for (var i = 2; i < divisors.length; i++) {
        resultingColour = luckyDivisor.util.math.addRGBs(resultingColour, luckyDivisor.config.CUBE_COLOUR_MAP[divisors[i]]);
    }

    // Instead of doing it the way above, we can convert the color from 
    // every divisor to LAB sum them up and average them and convert the 
    // resulting average back to RGB.
    return color(resultingColour[0], resultingColour[1], resultingColour[2]);
}