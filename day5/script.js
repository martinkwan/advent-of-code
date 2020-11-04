const fs = require('fs');
const data = fs.readFileSync('input.txt').split('\n');


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


const numberOfNiceStrings = data.reduce((acc, currString, idx, src) => {
	const letterPairsToIndexDict = {};

	let repeatsWithOneLetterBetween = 0;
	let containsAPairOfAnyLettersTwiceAtLeastOneSpotAway = false;

	for (let i = 0; i < currString.length - 1; i++) {
		let currLetter = currString[i];
		let nextLetter = currString[i + 1];
		let nextNextLetter = currString[i + 2];
		const letterPairs = currLetter + nextLetter;

		if (currLetter === nextNextLetter) {
			repeatsWithOneLetterBetween++;
		}


		if (letterPairsToIndexDict[letterPairs]) {
			// check if index is at least one spot away
			containsAPairOfAnyLettersTwiceAtLeastOneSpotAway = letterPairsToIndexDict[letterPairs].some(index => i - index > 1);

			if (!containsAPairOfAnyLettersTwiceAtLeastOneSpotAway) {
				letterPairsToIndexDict[letterPairs].push(i);
			}
		} else if (!letterPairsToIndexDict[letterPairs]) {
			letterPairsToIndexDict[letterPairs] = [i];
		}

		if (repeatsWithOneLetterBetween && containsAPairOfAnyLettersTwiceAtLeastOneSpotAway) {
			return ++acc;
		}
	}

	return acc;

}, 0);

console.log(numberOfNiceStrings, 'numberOfNiceStrings')