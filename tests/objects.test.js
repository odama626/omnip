const O = require('../objects');

let testRecord = {
  id: '1',
  first_name: 'Reginald',
  last_name: 'Hancke',
  email: 'rhancke0@wikia.com',
  gender: 'Male',
  ip_address: ''
};

let transformedTest = {
  id: '1',
  'first name': 'Reginald',
  'last name': 'Hancke',
  email: 'rhancke0@wikia.com',
  gender: 'Male',
  'ip address': ''
};

test('map', () => {
  expect(O.map(testRecord, (key, value) => ({ [key.split('_').join(' ')]: value }))).toEqual(transformedTest);
});

test('reduce', () => {
  expect(O.reduce(testRecord, (acc, key, value) => acc + key + value, '')).toBe(
    'id1first_nameReginaldlast_nameHanckeemailrhancke0@wikia.comgenderMaleip_address'
  );
});

test('filter', () => {
  expect(O.filter(testRecord, key => key === 'gender')).toEqual({ gender: 'Male' });
});

test('reduceArray', () => {
  expect([{ a: 1 }, { b: 2 }].reduce(O.reduceArray)).toEqual({ a: 1, b: 2 });
});

test('compareWith', () => {
  let t = O.compareWith('id', 'email', 'gender');
  let f = O.compareWith('first_name');
  expect(t(testRecord, transformedTest)).toBe(true);
  expect(f(testRecord, transformedTest)).toBe(false);
});

test('gatherKeys', () => {
  let list = [{ a: '1', b: '2' }, { a: 1 }, { c: 1, d: '2', b: 'blah' }];
  expect(O.gatherKeys(list)).toEqual(['a', 'b', 'c', 'd']);
});
