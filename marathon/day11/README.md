# День 11

## Реализовать функцию свертки списка в диапазоны

Необходимо написать функцию, которая бы принимала неотсортированный массив чисел и возвращала бы строку, где подряд идущие числа свернуты в диапазоны.

```js
console.log(reduce([1, 3, 6, 8, 7, 11, 45, 46, 2])); // 1-3, 6-8, 11, 45-46
```

## Параллельные асинхронные запросы

Необходимо написать функцию, которая бы принимала Iterable функций и возвращала результат аналогичный Promise.allSettled.
Каждая из переданных функций может вернуть Promise. Одновременно может быть запущено не более заданного количества Promise, но при этом максимально возможное.

```js
allSettledLimit([
  () => fetch('//some-data-1'),
  () => fetch('//some-data-2'),
  () => fetch('//some-data-3'),
  () => fetch('//some-data-4')
], 2).then(console.log);
```

## Написать итератор для дерева

Необходимо написать итератор для заданной структуры дерева.

```js
const i = iterate({
  value: 1,
  children: [{value: 2}, {value: 3, children: [{value: 4}]}]
});

console.log(i.next()); // {value: 1, done: false}
console.log(i.next()); // {value: 2, done: false}
console.log(i.next()); // {value: 3, done: false}
console.log(i.next()); // {value: 4, done: false}
console.log(i.next()); // {value: undefined, done: true}
```

## Реализация функции аналогичной parseFloat

Необходимо написать функцию, которая бы повторяло поведение parseFloat.

```js
console.log(myParseFloat('10'));      // 10
console.log(myParseFloat('-10.2'));   // -10.2
console.log(myParseFloat('6e-2'));    // 0.06
console.log(yParseFloat('--20'));    // NaN
```