/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  let countPending = promises.length;
  const errors = [];

  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(resolve)
        .catch(reason => errors[i] = reason)
        .finally(() => {
          countPending -= 1;
          if (countPending === 0) {
            reject(
              new AggregateError(
                'No Promise in Promise.any was resolved', 
                errors
              )
            );
          }
        })
    }
  });
}
