function createCounter() {
  return new Proxy({
    count: 0
  }, {
    get(target, prop) {
      return target[prop]++;
    },
    set() {
      return false;
    }
  });
}
