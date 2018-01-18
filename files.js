const fs = require('fs');


/**
 * @description A promise wrapper around fs.readFile
 * @param {string} filename path to the file to read
 * @returns a promise
 */
const read = (filename) => new Promise((resolve, reject) => {
	fs.readFile(filename, (err, content) => {
		if (err) return reject(err);
		return resolve(content);
	})
})

/**
 * @description a promise wrapper around fs.writeFile
 * @param {string} filename path to the file to write to
 * @param {*} content file content to write
 * @returns a promise
 */
const write = (filename, content) => new Promise((resolve, reject) => {
	fs.writeFile(filename, content, err => {
		if (err) return reject(err);
		return resolve();
	})
})

module.exports = {
	read,
	write
}