const { map, prefaceKeys, reduce, subObject, filter } = require('./objects');

module.exports = class Omnip {

  /**
   * @description returns a new functional object
   * @param {Object<string, *>} attachment an object to omnify
   *
   */
  constructor(attachment) {
    let key;
    for (key in attachment) {
      this[key] = attachment[key];
    }
  }

  /**
   * @description map this object
   * @param {(key: string, value: any, i:number, keys:string[], values: any[]) => Object<string, *>} callback 
   * @return result of callback on all key value pairs
   */
  map(callback) {
    return map(this, callback);
  }

  /**
   * @description reduce this object
   * @param {(accum: any, cur: string, value: *) => *} callback function to use with reduce
   * @param {*} initialValue initial value for reduce function
   */
  reduce(callback, initialValue) {
    return reduce(this, callback, initialValue);
  }

  /**
   * 
   * @param {(key: string, value: any) => boolean} callback
   * @returns {Object<string, *>} a new object containing values that pass callback
   */
  filter(callback) {
     return filter(this, callback);
  }

  /**
   * @description create a new object only containing keys provided
   * @param {...string} keys a list of keys to pull out of object
   * @returns {Object<string, *>} sub object
   */
  subObject(...keys) {
    return subObject(...keys)(this);
  }

  /**
   * @description create a new object with all keys prefaced.  preface('a_') => { 'a_key': value}
   * @param {string} keyWith 
   * @returns new object with prefaced keys
   */
  preface(keyWith) {
    return prefaceKeys(keyWith)(this);
  }
}