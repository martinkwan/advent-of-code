/*
--- Part Two ---
You just finish implementing your winning light pattern when you realize you mistranslated Santa's message from Ancient Nordic Elvish.

The light grid you bought actually has individual brightness controls; each light can have a brightness of zero or more.
The lights all start at zero.

The phrase turn on actually means that you should increase the brightness of those lights by 1.

The phrase turn off actually means that you should decrease the brightness of those lights by 1, to a minimum of zero.

The phrase toggle actually means that you should increase the brightness of those lights by 2.

What is the total brightness of all lights combined after following Santa's instructions?

For example:

turn on 0,0 through 0,0 would increase the total brightness by 1.
toggle 0,0 through 999,999 would increase the total brightness by 2000000.

*/

const fs = require('fs'); 

const data = fs.readFileSync('input.txt').toString();


//Create grid
// iterate through grid and add or decrease value at grid.
// increment count

const grid = [];

// Create Grid
for (let i = 0; i <= 999; i++) {
	grid[i] = [];
	for (let j = 0; j <= 999; j++) {
		grid[i][j] = 0;
	}
}


let brightness = 0;

function iterateThroughGrid(instruction, from, to) {
	const [fromX, fromY] = from.split(',').map(numString => Number(numString)); 
	const [toX, toY] = to.split(',').map(numString => Number(numString));

	for (let i = fromX; i <= toX; i++) {
		for (let j = fromY; j <= toY; j++) {
			if(instruction === 'on') {
				brightness++;
				grid[i][j]++;
			} else if (instruction === 'off') {
				if (grid[i][j]) {
					brightness--;
					grid[i][j]--;
				}
			} else if (instruction === 'toggle') {
				brightness += 2;
				grid[i][j] += 2;
			}
		}
	}
}


const instructionsArray = data.split('\n').map(instruction => instruction.split(' '));

instructionsArray.forEach(instruction => {
	if (instruction[0] === 'turn') {
		if (instruction[1] === 'on') {
			iterateThroughGrid(instruction[1], instruction[2], instruction[4])
		} else if (instruction[1] === 'off') {
			iterateThroughGrid(instruction[1], instruction[2], instruction[4])
		}
	} else if (instruction[0] === 'toggle') {
			iterateThroughGrid(instruction[0], instruction[1], instruction[3])
	}
});

console.log(brightness, 'brightness');
