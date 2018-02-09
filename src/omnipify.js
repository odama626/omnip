import { map, prefaceKeys, reduce, subObject, filter } from './objects';

module.exports = class Omnip {

  /**
   * @description returns a new functional object
   * @param {Object<string, *>} attachment an object to omnify
   * @returns {Omnip} omnip
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

// const a = {
//   a: 1,
//   b: 2,
//   c: 3
// };

// const o = new Omnip(a);

// let result = o.map((key, value) => ({ [key]: value * 7 }));

// console.log(result);

// result = o.filter(key => key !== 'b');
// console.log(result);

// result = o.preface('pre_');
// console.log(result);

// result = o.reduce((accum, key, value) => value+accum, 6)
// console.log(result);

// result = o.subObject('a', 'c');
// console.log(result);