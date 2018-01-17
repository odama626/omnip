/**
 * @description given a list of keys, will return a function to check equality between 2 objects on given keys
 * @param {string} keys a list of object keys
 * @returns a compare function => returns true if all keys passed into keysMatch match on both objects
 */
const keysMatch = (...keys) => (a, b) => a && b? keys.reduce((accum, cur) => accum && a[cur] === b[cur], true) : false;

/**
 * @description reduce an array of key value pairs into a single object
 * @param {Object} acc 
 * @param {Object.<string, value>} cur
 * @returns {Object.<string, value>} object with all key value pairs from array
 */
const reduceArray = (acc, cur) => ({...acc, ...cur})

/**
 * @description Object equivalent of Array.map() passes arguments (key, value, index, keys[], object)
 * @param {*} obj 
 * @param {(key, value, index?, keys[], values[]) => Object.<string, number>} callback 
 * @returns object transformed by map callback function
 */
const map = (obj, callback) => Object.keys(obj).map((key, i, keys) => callback(key, obj[key], i, keys, obj)).reduce(reduceArray);

/**
 * @description A reduce function that will merge all objects with the same value for key when used in array.reduce()
 * @param {string} reduceKey the key in an object that all further objects should be combined by
 * @returns reduce function to be used in array.reduce()
 */
const keyUnion = (reduceKey) => (a, c) => {
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
	keysMatch,
	keyUnion,
	reduceArray,
	map
}