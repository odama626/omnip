
/**
 * @description creates an array of all unique keys across all objects in array
 * @param {object[]} list an array of objects
 * @returns {string[]} array of all unique keys
 */
const gatherKeys = (list) => list.reduce((acc, cur) => [...acc, ...Object.keys(cur).filter(i => !acc.includes(i))], []);

/**
 * @description creates a equality function with keys given
 * @param {...string} keys a list of object keys
 * @returns {(a,b) => boolean}a compare function that will check equality with each key
 */
const compareWith = (...keys) => (a, b) => a && b? keys.reduce((acc, cur) => acc && a[cur] === b[cur], true) : false;

/**
 * @description reduce an array of key value pairs into a single object
 * @param {Object} acc 
 * @param {Object.<string, *>} cur
 * @returns {Object.<string, *>} object with all key value pairs from array
 */
const reduceArray = (acc, cur) => ({...acc, ...cur})

/**
 * @description Object equivalent of Array.map() passes arguments (key, value, index, keys[], object)
 * @param {*} glob 
 * @param {(key: string, value: any, index:number, keys: string[], values: any[]) => Object.<string, number>} callback 
 * @returns object transformed by map callback function
 */
const map = (glob, callback) => Object.keys(glob).map((key, i, keys) => callback(key, glob[key], i, keys, glob)).reduce(reduceArray);

/**
 * 
 * @param {*} glob 
 * @param {(accumulator: any, currentKey: string, currentValue: any) => any} callback 
 * @param {*} initialValue 
 */
const reduce = (glob, callback, initialValue) => Object.keys(glob).reduce((accum, cur) => callback(accum,cur, glob[cur]), initialValue)

/**
 * @description follows path of keys to pluck a deeply nested value out
 * @param {*} glob object to work on
 * @param {string} path path to key you want out of glob
 * @returns value of nested key or undefined if it doesn't exist
 */
const pluck = (glob, path) => {
	let nextKey = path.slice(0, Math.max(path.indexOf('.'), 0)) || path;
	if ( typeof glob === 'object' && nextKey in glob) {
		if (path.length > nextKey.length) {
			return pluck(glob[nextKey], path.slice(nextKey.length+1));
		} else {
			return glob[nextKey];
		}
	} else {
		return undefined;
	}
}

/**
 * 
 * @param {*} glob 
 * @param {(key: string, value: any) => boolean} callback 
 */
const filter = (glob, callback) => Object.keys(glob).filter(key => callback(key, glob[key])).map(key => ({[key]: glob[key]})).reduce(reduceArray);

/**
 * @description given a list of keys will create a new object with subKeys of given object
 * @param {...string} keys a list of keys to reduce object to
 * @returns a function that will reduce objects to given keys
 */
const subObject = (...keys) => (item) => keys.map(key => ({[key]: item[key]})).reduce(reduceArray);

/**
 * @description given a preface string, will preface all keys in a given object.  Ex: prefaceKeys('a_')({b: 1}) => {a_b: 1}
 * @param {string} preface a string to preface all keys in objects with
 * @returns an function that takes an object to modify 
 */
const prefaceKeys = preface => glob => map(glob, (key, value) => ({[preface+key] : value}));

/**
 * @description A reduce function that will merge all objects with the same value for key when used in array.reduce()
 * @param {string} reduceKey the key in an object that all further objects should be combined by
 * @returns reduce function to be used in array.reduce()
 */
const keyUnion = (reduceKey) => (a, c) => {
	let key;
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

module.exports = {
	keyUnion,
	reduceArray,
	compareWith,
	subObject,
	gatherKeys,
	prefaceKeys,
	map,
	filter,
	reduce,
	pluck
}