function curry<T, R>(fn: (...args: T[]) => R) {
  return function curried(...args: T[]) {
    if (args.length >= fn.length) {
      return fn.call(this, ...args);
    } else {
      return (...args2: T[]) => curried.call(this, ...args.concat(args2));
    }
  }
}

const sum = curry((a: number, b, c, z) => a + b + c + z);

console.log(sum(1)(2)(3)(4)); // 10;
console.log(sum(1)(2)(3, 4)); // 10;
console.log(sum(1)(2, 3, 4)); // 10;
