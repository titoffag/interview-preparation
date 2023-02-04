function memo(func, resolver) {
  const cache = new Map();

  return function() {
    const key = resolver ? resolver(...arguments) : Array.from(arguments).join('_');

    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const result = func.apply(this, arguments);
      cache.set(key, result);
      return result;
    }
  }
}
