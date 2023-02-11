# День 8

## Написать функцию throttle

Необходимо написать функцию, которая бы принимала другую функцию и возвращала её throttle версию.

```js
function laugh() {
  console.log('Ha-ha!')
}

const throttledLaugh = throttle(laugh, 300);

throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
```

## Написать функцию для сравнения двух объектов

Необходимо написать функцию для глубокого сравнения двух заданных объектов.

```js
console.log(compare({a: 1, b: [1, 2, 3]}, {a: 1, b: [1, 2, 3]})); // true
console.log(compare({a: 1, b: [1, 2]}, {a: 1, b: [1, 2, 3]}));    // false
```

## Найти строку для которой нет анаграммы

Необходимо написать функцию, которая бы принимала массив строк и возвращала бы новый массив.
Элементами этого массива должны быть строки, для которых не существует анаграмм среди элементов первого массива.

```js
console.log(getUniqueStrs(['atoe', 'otea', 'ben', 'enb', 'baz', 'foo'])); // ['baz', 'foo']
```

## Реализация структуры данных очередь

Необходимо создать класс, который бы предоставлял API очереди.
Использовать стандартное API массивов JS нельзя.

```js
const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // undefined
```