Promise.resolve(1)
  .then(() => 2)
  .then(3) // omitted and skipped, typescript throws error - param is NOT a function
  .then((value) => value * 3) // 2 * 3 = 6
  .then(Promise.resolve(4)) // creates a pending promise, skipped, param NOT a function
  .then(console.log) // 6

Promise.resolve(1) // return promise object with state: fulfilled and result: 1
  .then(console.log)
// is the same as
new Promise((resolve) => resolve(1))
  .then((val) => console.log(val))

Promise.resolve(1)
  .then(() => 2)
  .then(console.log)
// 2 as 1 isn't passed in the first 'then', e.g. .then(num => num + 2)
