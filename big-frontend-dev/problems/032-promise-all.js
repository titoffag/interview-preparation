function all(promises) {
  return new Promise((resolve, reject) => {
    const result = [];

    if (promises.length == 0) {
      resolve(result);
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

async function allAlt(promises) {
  const result = [];
  if (!promises.length) {
    return result;
  }

  try {
    for await (const value of promises) {
      result.push(value);
    }
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(result);
}
