
/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  const result = [];
  let countPending = promises.length;

  return new Promise((resolve) => {
    if (countPending === 0) {
      resolve(result);
    }
    
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(value => {
          result[i] = {
            status: 'fulfilled',
            value
          };
        })
        .catch(reason => {
          result[i] = {
            status: 'rejected',
            reason
          };
        })
        .finally(() => {
          countPending -= 1;

          if (countPending === 0) {
            resolve(result);
          }
        });
    }
  });
}

function allSettledAlt(promises) {
  return Promise.all(promises.map(p => Promise.resolve(p).then((value) => {
    return {
      status: 'fulfilled',
      value
    };
  }, (reason) => {
    return {
      status: 'rejected',
      reason
    };
  })));
}
