function* zip(...iterables: Iterable<unknown>[]) {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
  
  while (true) {
    const result = iterators.map(iterator => iterator.next());
    if (result.some(el => el.done)) {
      return;
    } else {
      yield result.map(el => el.value);
    }
  }
}

console.log(...zip(new Set([1, 2]), ['a', 'b', 'z'], '...')); // [1, 'a', '.'] [2, 'b', '.']
