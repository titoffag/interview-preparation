const times = (y) => (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) => (x) => x - y
const divide = (y) => (x) => x / y

function pipe(funcs) {
  return function (arg) {
    return funcs.reduce((result, func) => {
      return func(result);
    }, arg);
  }
}

console.log(pipe([])(1))
console.log(pipe([times(2)])(1))
console.log(pipe([times(2), times(3)])(2))
console.log(pipe([times(2), times(3), plus(4)])(2))
console.log(pipe([times(2), subtract(3), divide(4)])(2))
