# День 12

## Определить век по году

Необходимо написать функцию, которая определяет век по переданному году.

```js
console.log(getCentury(1901)); // 20
```

## Пересечение диапазонов

Необходимо написать функцию, которая бы принимала бы две строки с числовыми диапазонами и возвращала бы новую строку, где отображены пересечения этих интервалов.

```js
console.log(intersectRanges('1-2; 4-6; 9-11', '1-5; 10-14; 15')); // 1-2; 4-5; 10-11 
```

## Найти два элемента массива сумма которых дает заданное число

Необходимо написать функцию, которая бы принимала массив чисел и число и возвращала бы индексы двух элементов массива сумма которых даёт заданное число.

```js
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
```

## Реализовать итератор на основе EventEmitter

Необходимо написать функцию, которая бы создавала асинхронный итератор на основе заданного EventEmitter и события.

```js
const ee = new EventEmitter();

(async () => {
  for await (const e of stream(ee, 'foo')) {
    console.log(e); // 1 2 3
  }
})();

ee.emit('foo', 1);
ee.emit('foo', 2);
ee.emit('foo', 3);
```