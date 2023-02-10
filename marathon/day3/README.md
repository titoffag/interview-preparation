# День 3

## Что и в каком порядке выведется в консоль?

И почему?

```js
console.log('foo');

setTimeout(() => {
  console.log('bar');
}, 0);

queueMicrotask(() => {
  console.log('baz');
  Promise.resolve().then().then(() => console.log('ban'));
});

new Promise((resolve) => {
  console.log('bla');
  resolve('baf');
}).then(console.log);

console.log('bak');
```

## Реализовать функцию setImmediate

Необходимо функцию, которая бы предоставляла API схожее с setTimeout, но создавала бы микротаску.

```js
setTimeout(() => {
  console.log(3);
}, 0);

setImmediate(() => {
  console.log(1);
});

const timer = setImmediate(() => {
  console.log(2);
});

clearImmediate(timer);
```

## Реализация функции каррирования

Необходимо написать функцию, которая бы принимала другую функцию и возвращала её каррированную версию.

```js
const sum = curry((a, b, c, z) => a + b + c + z);

console.log(sum(1)(2)(3)(4)); // 10;
console.log(sum(1)(2)(3, 4)); // 10;
console.log(sum(1)(2, 3, 4)); // 10;

```

## Реализовать zip для синхронных Iterable объектов

Общее количество кортежей берется по минимальному значению.
Функция должна возвращать IterableIterator.

```js
console.log(...zip(new Set([1, 2]), ['a', 'b', 'z'], '...')); // [1, 'a', '.'] [2, 'b', '.']
```