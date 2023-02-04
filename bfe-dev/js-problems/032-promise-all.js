function all(promises) {
  return new Promise((resolve, reject) => {
    let countPending = promises.length;
    const result = [];

    if (countPending == 0) {
      resolve(result);
    }

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          result[i] = value;
          countPending -= 1;

          if (countPending === 0) {
            resolve(result);
          }
        }, reject);
    }
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
