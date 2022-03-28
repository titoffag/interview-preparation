function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...restArgs) {
        return curried.apply(this, args.concat(restArgs));
      };
    }
  };
}

function functionWithThreeParams(a, b, c) {
  return a + b + c;
}

function functionWithFiveParams(a, b, c, d, e, f) {
  return a + b + c + d + e + f;
}

console.log(curry(functionWithThreeParams)("A")("B")("C") === "ABC");
console.log(curry(functionWithThreeParams)("A", "B")("C") === "ABC");
console.log(curry(functionWithThreeParams)("A", "B", "C") === "ABC");

console.log(
  curry(functionWithFiveParams)("A")("B")("C")("D")("E")("F") === "ABCDEF"
);
console.log(
  curry(functionWithFiveParams)("A", "B", "C")("D", "E", "F") === "ABCDEF"
);
