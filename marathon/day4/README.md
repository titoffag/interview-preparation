# День 4

## Реализация функции promisify

Необходимо написать функцию, которая бы создавал функции с Promise API на основе функций с callback API.
Формат callback функции ожидается в стиле Node.js, где первый аргумент - это объект ошибки.

```js
function cbDiv(a, b, cb) {
  if (b === 0) {
    cb(new TypeError('Нельзя делить на 0'));
  
  } else {
    cb(null, a / b);
  }
}

const promiseDiv = promisify(cbDiv);

promiseDiv(1, 2).then(console.log);  // 0.5
promiseDiv(1, 0).catch(console.log); // TypeError('Нельзя делить на 0')
```

## Написать класс числа с рекурсивным API для арифметических операций

Необходимо проанализировать пример ниже и реализовать нужный API, где

1. add - сложение
2. sub - вычитание
3. mult - умножение
4. div - деление

```js
const num = new MyNumber(10);

console.log(num.add(2).mult(2).sub(1) - 5); // 18
```

## Выборочная сортировка массива

Необходимо написать функцию sort, которая бы сортировала элементы со значением кратным двум.

```js
console.log(sort([7, 1, 4, 2, 9, 8])); // [7, 1, 2, 4, 9, 8]
```

## Поиск в массиве строк по заданной подстроке с пропуском символов

Необходимо написать функцию, которая бы принимала массив строк и строку и возвращала бы новый массив, 
состоящий только из элементов с содержанием заданной подстроки. Алгоритм должен учитывать, что подстрока может быть найдена в строке при помощи пропуска части символов в строке (нечеткий поиск).

```js
console.log(find('kbza', [
  'kobezzza',
  'bob',
  'kibiza',
  'kobea'
])); // ['kobezzza', 'kibiza']
```