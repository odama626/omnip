const { exec: execOriginal } = require('child_process');

/**
 * @description a promise wrapper for exec from child_process library
 * @param {string} command a command to execute
 * @returns a promise wrapped around child_process exec
 */
const exec = (command) => new Promise((resolve, reject) => {
	execOriginal(command, (err, stdout, stderr) => {
		if (err) return reject(err, stderr);
		return resolve(stdout, stderr);
	})
})