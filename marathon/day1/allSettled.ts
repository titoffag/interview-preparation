enum PromiseState {
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Pending = 'pending',
}

type SettledObject<T, E extends Error = Error> = {
  status: PromiseState,
  value?: T,
  reason?: E,
}
type SettledArray<T> = SettledObject<T>[];

function allSettled<T>(iterable: T[]): Promise<SettledArray<T>> {
  let countPendingPromises = iterable.length;
  const result: SettledArray<T> = new Array(countPendingPromises);

  return new Promise((resolve) => {
    if (countPendingPromises == 0) {
      resolve(result);
    }

    for (const [index, value] of iterable.entries()) {
      Promise.resolve(value)
        .then(value => result[index] = {status: PromiseState.Fulfilled, value})
        .catch(reason => result[index] = {status: PromiseState.Rejected, reason})
        .finally(() => {
          countPendingPromises--;
          if (countPendingPromises == 0) {
            resolve(result);
          }
        });
    }
  });
}

allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
  console.log(v1); // {status: 'fulfilled', value: 1}
  console.log(v2); // {status: 'fulfilled', value: 2}
  console.log(v3); // {status: 'rejected', reason: 3}
});
