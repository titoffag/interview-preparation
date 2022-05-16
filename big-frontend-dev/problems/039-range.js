function range(from, to) {
  return {
    next() {
      if (from <= to) {
        return { value: from++, done: false };
      }

      return { value: from, done: true };
    },
    [Symbol.iterator]() {
      return this;
    }
  }
}

function* range(from, to) {
  while (from <= to) yield from++;
}

function range(from, to) {
  return Array.from({ length: (to - from) + 1 }, (_, i) => from + i);
}

