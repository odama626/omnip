const O = require('../objects');

let testRecord = {
	id: '1',
	first_name: 'Reginald',
	last_name: 'Hancke',
	email: 'rhancke0@wikia.com',
	gender: 'Male',
	ip_address: ''
}

let transformedTest = {
	id: '1',
	'first name': 'Reginald',
	'last name': 'Hancke',
	email: 'rhancke0@wikia.com',
	gender: 'Male',
	'ip address': ''
}

test('map', () => {
	expect(O.map(testRecord, (key, value) => ({[key.split('_').join(' ')]: value}))).toEqual(transformedTest)
})

test('reduceArray', () => {
	expect([{a: 1}, {b: 2}].reduce(O.reduceArray)).toEqual({a: 1, b: 2})
})

test('keysMatch', () => {
	let t = O.keysMatch('id', 'email', 'gender');
	let f = O.keysMatch('first_name');
	expect(t(testRecord, transformedTest)).toBe(true);
	expect(f(testRecord, transformedTest)).toBe(false);
})