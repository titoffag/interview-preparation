function test() {
  for (var i = 0; i < 5; i++) {
    const closureFn = function (j) {
      console.log(j);
    };
    setTimeout(closureFn(i), 1_000);
  }
}

function test2() {
  for (var i = 0; i < 5; i++) {
    const boundedFn = (function () {
      console.log(this);
    }).bind(i);
    setTimeout(boundedFn, 1_000);
  }
}

console.log('-- test --');
test();
console.log('-- test2 --');
test2();
