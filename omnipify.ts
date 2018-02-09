import { map, prefaceKeys, reduce, subObject, filter } from './objects';
import { mapCallback, reduceCallback, filterCallback } from './interfaces';

class Omnip {

  constructor(attachment: Object) {
    let key;
    for (key in attachment) {
      this[key] = attachment[key];
    }
  }

  map(callback: mapCallback): Object {
    return map(this, callback);
  }

  reduce(callback: reduceCallback, initialValue: any) {
    return reduce(this, callback, initialValue);
  }

  filter(callback: filterCallback) {
     return filter(this, callback);
  }

  subObject(...keys: string[]) {
    return subObject(...keys)(this);
  }

  preface(keyWith: string) {
    return prefaceKeys(keyWith)(this);
  }
}

const a = {
  a: 1,
  b: 2
};

const o = new Omnip(a);

let result = o.map((key, value) => ({ [key]: value * 2 }));

console.log(result);

result = o.filter(key => key !== 'b');
console.log(result);

result = o.preface('pre_');
console.log(result);

result = o.reduce((accum, key, value) => value+accum, 0)
console.log(result);
