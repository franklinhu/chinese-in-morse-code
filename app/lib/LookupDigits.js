// @flow

const calculateFreeDigits = (dict) => {
  const valuesMap = Object.values(dict).reduce((map, v) => {
    map[v] = true;
    return map;
  }, {});

  // Iterate though all 4 digit numbers and find the ones that aren't in
  // the input dictionary
  const out = [];
  for (let i = 0; i < 10000; i++) {
    const str = String(i).padStart(4, "0");
    if (valuesMap[str] === undefined) {
      out.push(str);
    }
  }
  shuffleArray(out);
  return out;
};

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default class LookupDigits {
  constructor(dict) {
    this.dict = dict;

    this.freeDigits = calculateFreeDigits(dict);
    this.freeDigitMap = {};
  }

  // Returns the value for the key, and a flag signifying
  // whether the value was custom from freeDigitMap
  lookup(key) {
    let value = this.dict[key];
    if (value !== undefined) {
      return [value, false];
    }

    value = this.freeDigitMap[key];

    if (value === undefined) {
      value = this.freeDigits.pop();
      this.freeDigitMap[key] = value;
    }

    return [value, true];
  }
}
