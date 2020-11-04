const fs = require('fs');

let totalHousesWithPresents = 1;
var data = fs.readFileSync('input4.txt', 'utf8').split('\n');


/*
--- Part Two ---
Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
For example:

qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
How many strings are nice under these new rules?

*/


const niceStrings = data.reduce((acc, currString, idx, src) => {
	const dict = {};

	let repeatsWithOneLetterBetween = 0;
	let containsAPairOfAnyLettersTwice = false;

	for (let i = 0; i < currString.length - 1; i++) {
		let currLetter = currString[i];
		let nextLetter = currString[i + 1];
		let nextNextLetter = currString[i + 2];

		if (currLetter === nextNextLetter) {
			repeatsWithOneLetterBetween++;
		}

		const pairOfLetters = currLetter + nextLetter;

		if (dict[pairOfLetters]) {
			//check if index is far enough, if it is, increment count
			containsAPairOfAnyLettersTwice = dict[pairOfLetters].some(element => i - element > 1);
			if (!containsAPairOfAnyLettersTwice) {
				dict[pairOfLetters].push(i);
			}
		} else if (!dict[pairOfLetters]) {
			dict[pairOfLetters] = [i];
		}

		if (repeatsWithOneLetterBetween && containsAPairOfAnyLettersTwice) {
			return ++acc;
		}
		
	}

	return acc;

}, 0);

console.log(niceStrings, 'niceStrings')