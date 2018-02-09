const omnip = require('./index');

const testObj = {
  a: 1,
  b: 2,
  c: 3
}

const test = new omnip.Object(testObj);

test.map((key, value) => ({[key]: value*5})) //?