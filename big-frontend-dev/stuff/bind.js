function bind(func, context, ...bindArgs) {
  return function (...fnArgs) {
    return func.apply(context, bindArgs.concat(fnArgs));
  }
}

let foo = function (...args) {
  console.log(this, ...args);
}

let bar = bind(foo, { a: 1 });
console.log(bar([1, 2, 3])); // {a: 1}, [1, 2, 3]

Function.prototype.myBind = function (context, ...args) {
  return (...rest) => {
    return this.call(context, ...args.concat(rest))
  }
}

function log(...props) {
  console.log(this.name, this.age, ...props)
}

const obj = { name: 'Vladilen', age: 28 }

log.myBind(obj, 1, 2)() // 'Vladilen' 28 { name: 'Vladilen', age: 28 } 1 2
