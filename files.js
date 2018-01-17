const fs = require('fs');

const read = (filename) => new Promise((resolve, reject) => {
	fs.readFile(filename, (err, content) => {
		if (err) return reject(err);
		return resolve(content);
	})
})

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