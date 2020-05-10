# LuckyDivisor

## Overview

LuckyDivisor is a JavaScript game. The game is designed to be played in a web browser with the aid of a physical keyboard. 
In the game, prime numbers (in the form of cubes) fall down a canvas and the player has to collect the ones that s(he) needs. 
Because the prime numbers and the player number are represented as cubes, the cubes in the game can be classified as either:

- Pn (prime number) Cube, or
- Player Cube.

### Pn Cube

A pn cube is a cube with special properties and features. The number on a pn cube number has to be prime and less than 10. 
A PnCube starts its journey at the top of the canvas and falls downward until it falls off the game canvas where it become invisible.

### Player Cube

A player cube is a cube with special properties and features. The number on a player cube is not restricted to be just a prime. 
In fact it could be anything between 2-99, provided its prime factors are less than 10. For example, say the player number came out as 60,
 then its prime factors or divisors would be 1, 2, 2, 3 and 5. In this case the player would need to collect pn cubes with number 1, 2(x2), 3 and 5.
 A Player Cube is always a the bottom of the canvas and can only move sideways (i.e. LEFT and RIGHT).



#### src

It contains the javascript source files as well as the .html file that loads the game in the browser. Most of these source files represent a game 
component (e.g. Cube, Column etc...) while other represent action to be performed on game elements (e.g. CubeCollisionHandler, PnCubeMotionHandler etc...).
 It should also be noted that some of them are events as well. This directory also contains the index.html file that can be loaded up to play the game.
 With a local server running, this file is loaded automatically once you try openning navigating to the directory from the browser.


## Rules of the Game

The game has but one rule. Collect as many pn cubes as possible until you either run out of life stars or get caught by the time.

### Collecting Pn Cube

In order to progress in the game, you have to collect pn cubes with numbers that correspond to the prime factors of the number inscribed on your cube 
(let's call it N). The following will result in penalties:
- Collecting a pn cube that is not a prime factor of N (e.g. collecting a pn cube with number 7 while your player cube number is 30). 
This will result in you loosing a life stars. And should you have no life stars and commit this offence, the the game is over.
- Collecting pn that you have already collected, would result in that pn cube's number being subtracted from your total score. For example say, 
your player cube number is 30 at the start of a play. That means you would need to collect pn cubes with number 1, 2(x2), 3 and 5;
 and theses cubes are displayed in the side panel at the right of the game canvas. Once you have collected collected pn cube with number 3, 
 it disappears from the list of cubes yet to be collected. Now collecting a pn cube with number 3 again would result in a negative hit penalty.
 In other word, if your score was, say, 30 before the cube collection, it would become 27 after collection.

### The Race against Time

Every play of the game is timed and the clock (in the top left corner of the game canvas) runs down as the play progresses. 
Should you get caught up by the clock (i.e. still have pn cube(s) to collect while the clock reaches "00:00"), 
the game is automatically over irrespective of the number of life stars you posses.


## Game Controls

The game controls in this current version are as follow:
- LEFT ARROW to move the player cube left.
- RIGHT ARROW to move the player cube right.
- SPACE BAR to pause and resume the game.
