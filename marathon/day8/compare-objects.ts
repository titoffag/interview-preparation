// type guard
function isObject(obj: unknown): obj is {[index: string]: unknown} {
  // null == null -> true
  return typeof obj === 'object' && obj != null;
}

function fastCompare(obj1: unknown, obj2: unknown) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// isEquals from lodash
function compare(obj1: unknown, obj2: unknown): boolean {
  // object or array
  if (isObject(obj1) && isObject(obj2)) {
    if (
      obj1.constructor !== obj2.constructor || 
      Object.keys(obj1).length !== Object.keys(obj2).length
    ) {
      return false;
    }

    // Object.keys and for in for objects and arrays
    for (const prop in obj1) {
      if (!compare(obj1[prop], obj2[prop])) {
        return false;
      }
    }

    return true;
  }

  // basic case
  return obj1 === obj2;
}

const foo = () => {};
console.log(compare({b: [1, 2, 3], a: 1, foo}, {a: 1, b: [1, 2, 3], foo})); // true
console.log(compare({a: 1, b: [1, 2]}, {a: 1, b: [1, 2, 3]}));    // false
console.log(compare({a: new Set(), b: new Date()}, {b: new Date(), a: new Set([1, 2, 3])}));    // true
