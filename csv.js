const { read } = require('./files');
const { reduceArray } = require('./objects');

/**
 * @description parses a csv file and returns a list of objects
 * @param {string} filename path to .csv file
 * @returns list of objects defined by csv
 */
const parse = (filename) => {
	let chain = read(filename).then(contents => {
		const [
			headers,
			...data
		] = contents
				.toString()
				.split('\n')
				.filter(line => line.length>0)
				.map(item => item.split(','));


		return data.map(line => headers.map((header, i) => ({[header]: line[i]})).reduce(reduceArray))
	})
	return chain;
}


const findLargestObject = (list) => {
}

const serialize = (objs) => {

}


module.exports = {
	parse,
	serialize
}