function* fetchSomething() {
    try {
      const a = yield fetch('url1');
      const b = yield fetch('url2');

      return [a, b];
    } catch {
      return [];
    }
}

function executor(iter, value?) {
  const result = iter.next(value);

  const promise = Promise.resolve(result.value);

  if (result.done) {
    return promise;
  }

  return promise.then(
    (val) => executor(iter, val),

    (err) => {
      // auto-wrapping to Promise.reject for unhandled error
      const res = iter.throw(err);

      if (res.done) {
        // auto-wrapping to Promise.resolve
        return res.value;
      }

      return executor(iter, res.value);
    },
  );
}

executor(fetchSomething())
  .then(console.log)
  .catch(console.error);
