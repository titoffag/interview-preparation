// Реализовать метод bind
function bind(func, context, ...bindArgs){
  return function(...fnArgs){
    return func.apply(context, bindArgs.concat(fnArgs));
  }
}

let foo = function(...args){
	console.log(this, ...args);
}

let bar = bind(foo, {a: 1});
console.log(bar([1, 2, 3])); //{a: 1}, [1, 2, 3]
