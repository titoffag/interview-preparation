function promisify (fn) {
  return function (...args) {
    return new Promise((res, rej) =>
      fn.call(
        this,
        ...args,
        (err, data) => err ? rej(err) : res(data),
      )
    )
  }
}
