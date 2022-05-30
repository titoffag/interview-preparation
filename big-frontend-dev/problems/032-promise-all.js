function all(promises) {
  return new Promise((resolve, reject) => {
    const result = [];

    if (promises.length == 0) {
      resolve(result);
      return;
    }

    let countPending = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          result[index] = value;
          countPending -= 1;
          if (countPending == 0) {
            resolve(result);
          }
        }, reject);
    });
  });
}
