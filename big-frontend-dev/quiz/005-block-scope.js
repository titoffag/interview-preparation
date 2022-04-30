for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0)
}
// 5 5 5 5 5

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0)
}

// 0 1 2 3 4

// var is function scoped so callback inside settimeout will have value of i 
// from global context.

// let is block scoped so for every block in loop, 
// the value of i will be stored (in closure) along with callback so.

// If we use var, then var gets hoisted outside of the block scope
// into the outer function scope, as var makes it function scoped instead of block scoped.

// And, if we have any closures created in the loop, 
// let variables will be bound to the value from only that iteration of the loop, 
// whereas var variables will be the current value of the variable, 
// which at that point of the settimeout it is 5, hence it prints.

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
