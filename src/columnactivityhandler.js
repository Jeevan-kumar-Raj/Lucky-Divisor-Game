/**
 * @file : column.js
 *
 * @description : A ColumnActivityHandler is responsible for checking cube collision in the given column.
 *
 * @author : Ayaovi Espoir Djissenou
 *
 * @version : v1
 */

class ColumnActivityHandler {
    /**
	 * @description a constructor.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
    constructor(column) {
        this.column = column;
    }



    /**
	 * @description goes thorugh the visible cubes in this column and checks for collision.
	 *
	 * @param none.
	 *
	 * @return none.
	 */
    checkForCollision() {
        /**
         * Collects all visible cubes on column
         */
        var visibleCubes = this.column.visibleCubes();

        /**
         * Collision have only take place between @ least two visible cubes in the column.
         */
        if (visibleCubes.length > 1) {
            /**
             * Iterate through the visible cubes (a pair at a time) and check for collision.
             */
            for (var i = 0; i < visibleCubes.length; i++) {
                var cube1 = visibleCubes[i];
                for (var j = i + 1; j < visibleCubes.length; j++) {
                    var cube2 = visibleCubes[j];
                    if (cube1.visibility && cube2.visibility && luckyDivisor.util.checkForCollision(cube1, cube2)) {
                        cube1.collisionHandler.handleCollisionWith(cube2);
                    }
                }
            }
        }
    }
}