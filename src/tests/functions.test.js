let F = require('../functions');

const addOne = (a) => a+1;
const timesTwo = (b) => b*2;

test('compose addOne, addOne, timesTwo', () => {
	let t = F.compose(addOne, addOne, timesTwo)
	expect(t(1)).toBe(6);
});

test('compose addOne, timesTwo, addOne', () => {
	let t = F.compose(addOne, timesTwo, addOne);
	expect(t(5)).toBe(13)
});