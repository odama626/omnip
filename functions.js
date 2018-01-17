/**
 * @description will compose and return a list of functions compose(a, b, c)(args) => c(b(a(args)))
 * @param {function} funcs a list of functions
 */
const compose = (...funcs) => (...args) => funcs.reduce((a, c) => c(a), ...args)


module.exports = {
	compose
}