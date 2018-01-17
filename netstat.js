#!/opt/node/bin/node
const { exec: execBase } = require('child_process');

const exec = (command) => {
	return new Promise((resolve, reject) => {
		execBase(command, (err, stdout, stderr) => {
			if (err) return reject(err);
			return resolve(stdout, stderr);
		})
	})
}

const compose = (...funcs) => (...args) => funcs.reduce((a, c) => c(a), ...args);
// const mapToObj = 

const convertArrayToObject = (keys, jagged) => {
	return jagged.map(j => keys.map((key, i) => ({[key]: j[i]})).reduce((a, c) => ({...a, ...c}), {}));
}

// Trim whitespace and replace all contiguous spaces with 1 space
const cleanOutput = (s) => s.trim().replace(/\s+/g,' ');

function parsePid(program) {
	let p = program['PID/Program'].split('/');
	return {
		program: p[1] || '|',
		pid: p[0] === '-'? '|' : p[0]
	}
}

function parsePort(l) {
	return l.substr(l.lastIndexOf(':')+1);
}

const prettyPrint = (d) => `${d.program.padEnd(10)}${d.ports}${d.pid}`

const reduceOnKey = (reduceKey) => (a, c) => {
	for (let i = 0; i < a.length; i++) {
		if (a[i][reduceKey] === c[reduceKey]) {
			for (key in a[i]) {
				if (key !== reduceKey) {
					let newValue = typeof a[i][key] === 'string'? [a[i][key]] : a[i][key];
					a[i][key] = newValue.concat(c[key]);
				}
			}
			return a;
		}
	}
	return [...a, c];
}

let b = 'abc';

exec('netstat -tlpn').then(out => {
	let flow = compose(cleanOutput, (s) => s.split(' '));

	
	let jaggedOut = out.split('\n').filter(s => s.length > 0).slice(1).map(flow);

	// remove array Items with Address or Name from keys
	let keys = jaggedOut[0].filter(f => f !== 'Address' && f !== 'name');
	let content = jaggedOut.slice(1);
	return convertArrayToObject(keys, content);
}).then(data => {
	// console.log(data);
	data = data.map(d => ({protocal: d.Proto, ports: `${parsePort(d.Local)}:${parsePort(d.Foreign)}`, ...parsePid(d)}))
	// console.log(data.reduce(reduceOnKey('program'), []).map(prettyPrint));
	console.log(data.map(prettyPrint).join('\n'));
})
