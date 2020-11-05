const fs = require('fs'); 

const data = fs.readFileSync('input.txt').toString();

/*
--- Day 6: Probably a Fire Hazard ---
Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0.
The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs.
Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square.
The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:

turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
After following the instructions, how many lights are lit?
*/

const grid = [];
for (let i = 0; i <= 999; i++) {
	grid[i] = [];
}

const instructionsArray = data.split('\n').map(instruction => instruction.split(' '));
let count = 0;

function iterateThroughGrid(instruction, from, to) {
	const [fromX, fromY] = from.split(',').map(numString => Number(numString)); 
	const [toX, toY] = to.split(',').map(numString => Number(numString));

	for (let i = fromX; i <= toX; i++) {
		for (let j = fromY; j <= toY; j++) {
			if(instruction === 'on') {
				if (!grid[i][j]) {
					count++;
				}
				grid[i][j] = true;
			} else if (instruction === 'off') {
				if (grid[i][j]) {
					count--;
				}
				grid[i][j] = false;
			} else if (instruction === 'toggle') {
				grid[i][j] = !grid[i][j];
				grid[i][j] ? count++ : count--;
			}
		}
	}
}

// iterateThroughGrid('on', '641,832', '947,850');
// iterateThroughGrid('toggle', '648,832', '947,850');
// iterateThroughGrid('toggle', '648,832', '947,850');
// iterateThroughGrid('toggle', '648,832', '947,850');
// iterateThroughGrid('on', '0,0', '2,2');

/*
  [ 'toggle', '641,832', 'through', '947,850' ],
  [ 'turn', 'on', '268,448', 'through', '743,777' ],
*/


// console.log(instructionsArray, 'instructionsArray');

instructionsArray.forEach(instruction => {
	console.log(instruction, 'instruction')
	if (instruction[0] === 'turn') {
		if (instruction[1] === 'on') {
			//run iteration function with param on
			iterateThroughGrid(instruction[1], instruction[2], instruction[4])
		} else if (instruction[1] === 'off') {
			//run iteration function with param off
			iterateThroughGrid(instruction[1], instruction[2], instruction[4])
		}
	} else if (instruction[0] === 'toggle') {
		//run iteration function with param toggle
			iterateThroughGrid(instruction[0], instruction[1], instruction[3])
	}
});

console.log(count, 'count')


// build a dictionary is more faster.
// if its turn ON, set to true for numbers in range
// if its toggle, check if its true or false then switch it
// if its turn off, set to false for numbers in range
// everytime turn on or turn off, increment or decrement counter


// need to keep track of lights are toggled on or off. - HOW? -oh easy... change each number to true or false. keep track of index only

// iterate through instructions.
// then iterate through grid to turn on or off.

// then at end, iterate through grid to count all lights that are true OR (faster) keep a counter as I turn on or off.




