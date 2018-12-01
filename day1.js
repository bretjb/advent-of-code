const assert = require('assert');
const R = require('ramda');
const { input } = require('./day1.input');

const buildSolution = R.reduce(R.add, 0);
assert.strictEqual(buildSolution(['+1', '+1', '+1']), 3);
assert.strictEqual(buildSolution(['+1', '+1', '-2']), 0);
assert.strictEqual(buildSolution(['-1', '-2', '-3']), -6);

console.log(buildSolution(input));

const findFirstFrequency = (input, total = 0, freqFound = new Set([0])) => {
  let firstDouble;
  for (let num of input) {
    num = parseInt(num, 10);
    total += num;
    if (freqFound.has(total)) {
      firstDouble = total;
      break;
    }
    freqFound.add(total);
  }
  if (R.isNil(firstDouble)) {
    firstDouble = findFirstFrequency(input, total, freqFound);
  }
  return firstDouble;
};

assert.strictEqual(findFirstFrequency(['+1', '-1']), 0);
assert.strictEqual(findFirstFrequency(['+3', '+3', '+4', '-2', '-4']), 10);
assert.strictEqual(findFirstFrequency(['-6', '+3', '+8', '+5', '-6']), 5);
assert.strictEqual(findFirstFrequency(['+7', '+7', '-2', '-7', '-4']), 14);
console.log(findFirstFrequency(input));