function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...args2) => curried(...args, ...args2);
  };
}
