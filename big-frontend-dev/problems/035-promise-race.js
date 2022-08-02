/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  return new Promise((res, rej) => {
    if (!promises?.length) {
      res();
    }

    for (const p of promises) {
      Promise.resolve(p).then(res, rej);
    }
  });
}
