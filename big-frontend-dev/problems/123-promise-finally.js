/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
function myFinally(promise, onFinally) {
  return promise.then(
    (value) => {
      return Promise.resolve(onFinally()).then(() => value);
    },
    (reason) => {
      // Promise.reject(reason) <-> throw reason
      return Promise.resolve(onFinally()).then(() => Promise.reject(reason));
    },
  );
}

async function myFinally(promise, onFinally) {
  try {
    const value = await promise;
    await onFinally();
    return value;
  } catch (error) {
    await onFinally();
    throw error;
  }
}
