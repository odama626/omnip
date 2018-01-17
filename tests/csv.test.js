let csv = require('../csv');

test('parse', () => {
	expect.assertions(1);
	return csv.parse(__dirname+'/data/mock_data.csv').then(data => expect(data).toMatchSnapshot());
})