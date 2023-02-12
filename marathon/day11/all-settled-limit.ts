function allSettledLimit<T>(
  iterable: Array<() => Promise<T>>,
  limit: number
): Promise<Array<unknown>> {
  const result: unknown[] = [],
    fns = [...iterable],
    iterator = fns.entries();
  let total = 0;

  return new Promise((resolve) => {
    if (fns.length == 0) {
      resolve(result);
    }

    for (let i = 1; i <= limit; i++) {
      next();
    }

    function next() {
      const {value: [i, fn] = [], done} = iterator.next();

      if (done) {
        return;
      }

      let promise: Promise<T>;
      
      try {
        promise = Promise.resolve(fn());
      } catch (error) {
        promise = Promise.reject(error);
      } finally {
        // @ts-ignore
        promise
          .then((value) => {
            result[i] = { status: "fulfilled", value };
          })
          .catch((reason) => {
            result[i] = { status: "rejected", reason };
          })
          .finally(() => {
            if (++total == fns.length) {
              resolve(result);
            } else {
              next();
            }
          });
        }
      }
  });
}

allSettledLimit(
  [
    () =>
      new Promise((resolve) => setTimeout(() => resolve("//some-data-1"), 1_000)),
    () =>
      new Promise((resolve) => setTimeout(() => resolve("//some-data-2"), 1_000)),
    () =>
      new Promise((resolve) => setTimeout(() => resolve("//some-data-3"), 1_000)),
    () =>
      new Promise((resolve) => setTimeout(() => resolve("//some-data-4"), 1_000)),
  ],
  1
).then(console.log);
