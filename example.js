const omnipify = require('./index');

const testObj = {
  a: 1,
  b: 2,
  c: 3
}

const test = new omnipify.Object(testObj);

test.map((key, value) => ({[key]: value*5})) //?