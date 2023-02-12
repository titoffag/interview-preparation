async function* zip(...iterables: AsyncGenerator[]) {
  const iterators = iterables.map(iterable => iterable[Symbol.asyncIterator]());
  
  while (true) {
    const result: unknown[] = [];
    for (const [idx, iterator] of iterators.entries()) {
      const {done, value} = await iterator.next();

      if (done) {
        return;
      }

      result[idx] = value;
    }

    yield result;
  }
}

async function* makeAsync(iter: any): AsyncGenerator {
  yield* iter;
}g

// [1, 'a', '.'] [2, 'b', '.']
(async () => {
  for await (const el of zip(makeAsync(new Set([1, 2])), makeAsync(['a', 'b', 'z']), makeAsync('...'))) {
    console.log(el);
  }
})();
