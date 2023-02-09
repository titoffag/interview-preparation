// TODO: TODO

async function* zip<T>(...iterables: Array<Iterable<T>>) {
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

async function* makeAsync<T>(iter: Iterable<T>) {
  yield* iter;
}

// [1, 'a', '.'] [2, 'b', '.']
(async () => {
  for await (const el of zip(makeAsync(new Set([1, 2])), makeAsync(['a', 'b', 'z']), makeAsync('...'))) {
    console.log(el);
  }
})();
