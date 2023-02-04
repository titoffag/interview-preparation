// type guard
function isObject(obj: unknown): obj is {[index: string]: unknown} {
  // null == null -> true
  return typeof obj === 'object' && obj != null;
}

// isEquals or deepEquals
function compare(obj1: unknown, obj2: unknown) {
  if (obj1 === obj2) {
    return true;
  }
  
  if (isObject(obj1) && isObject(obj2)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }

    // array or object
    for (const prop in obj1) {
      if (!compare(obj1[prop], obj2[prop])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

console.log(compare({a: 1, b: [1, 2, 3]}, {a: 1, b: [1, 2, 3]})); // true
console.log(compare({a: 1, b: [1, 2]}, {a: 1, b: [1, 2, 3]}));    // false
