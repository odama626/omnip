const { read, write } = require('./files');
const { reduceArray, gatherKeys } = require('./objects');

/**
 * @description parses a csv file and returns a list of objects
 * @param {string} contents csv formatted string
 * @returns {Promise.<object>} list of objects defined by csv
 */
const parse = (contents) => {
	return new Promise((resolve, reject) => {
		const [
			headers,
			...data
		] = contents
				.toString()
				.split('\n')
				.filter(line => line.length>0)
				.map(item => item.split(','));

		resolve(data.map(line => headers.map((header, i) => ({[header]: line[i]})).reduce(reduceArray)))
	})
}


const findLargestObject = (list) => {
	let i = 0, maxLength = 0, index = 0, length = 0;
	for (i; i < list.length; i++) {
		length = Object.keys(list[i]);
		if (length > maxLength) {
			maxLength = length;
			index = i;
		}
	}
	return list[index];
}

/**
 * @description turn a list of objects into a csv formatted string
 * @param {any[]} objs list of objects to be serialized
 * @param {string[]} [headers] optional list of headers to use
 * @returns	{Promise.<string>} a csv formatted string
 */
const serialize = (objs, headers) => {
	headers = headers? headers : gatherKeys(objs);
	return new Promise((resolve, reject) => {
		let content = headers.join(',')+'\n';
		content += objs.map(item => headers.map(key => item[key]).join(',')).join('\n');
		resolve(content);
	});
}


module.exports = {
	parse,
	serialize
}