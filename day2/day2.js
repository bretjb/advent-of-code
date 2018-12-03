const assert = require('assert');
const R = require('ramda');
const { input } = require('./day2.input');

const buildSolution1 = (input) => {
  // pre-compute frequency table
  const buildFreqTable = R.countBy(R.toLower);
  const freqTable = {};
  for (id of input) {
    freqTable[id] = buildFreqTable(id);
  }

  const getContainsN = R.curry((table, n, id) => {
    const freq = table[id];
    if (R.isNil(freq)) return false;
    let hasFound = false;
    for (let f in freq) {
      if (freq[f] === n) {
        hasFound = true;
        break;
      }
    }
    return hasFound;
  });
  const getContainsTwo = getContainsN(freqTable, 2);
  const getContainsThree = getContainsN(freqTable, 3);
  
  const containsTwo = R.filter(getContainsTwo, input);
  const containsThree = R.filter(getContainsThree, input);

  return containsTwo.length * containsThree.length;
};

const testInputs = [
  'abcdef',
  'bababc',
  'abbcde',
  'abcccd',
  'aabcdd',
  'abcdee',
  'ababab',
];

assert.strictEqual(buildSolution1(testInputs), 12);
console.log(buildSolution1(input));

buildSolution2 = (input) => {
  const isOffByOne = (id1, id2) => {
    const id1Arr = id1.split('');
    const id2Arr = id2.split('');
    let offByCount = 0;
    for (let i = 0; i <= id1Arr.length; ++i) {
      if (id1Arr[i] !== id2Arr[i]) offByCount++;
    }
    return offByCount === 1;
  };

  let offByOne;
  input.forEach(i => {
    R.drop(1, input).forEach(j => {
      if (isOffByOne(i, j)) {
        offByOne = [i, j];
      } 
    });
  if (R.isNil(offByOne)) {
    input = R.drop(1, input);
  }
  });

  if (!R.isNil(offByOne)) {
    const firstArr = offByOne[0].split('');
    const secondArr = offByOne[1].split('');
    let found;
    for (let i = 0; i <= firstArr.length; ++i) {
      if (firstArr[i] !== secondArr[i]) {
        found = R.take(i, firstArr) + R.drop(i + 1, firstArr);
      }
    }
    return R.compose(R.join(''), R.split(','))(found);
  }
  console.log(offByOne);
};

const testInput2 = [
'abcde',
'fghij',
'klmno',
'pqrst',
'fguij',
'axcye',
'wvxyz'
];

assert.strictEqual(buildSolution2(testInput2), 'fgij');
console.log(buildSolution2(input));