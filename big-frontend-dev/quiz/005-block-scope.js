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