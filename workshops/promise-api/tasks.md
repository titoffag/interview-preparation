# Promise API

## sleep

```js
// Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд

sleep(200).then(() => {
  console.log('Я проснулся!');
});
```

## rejectAfterSleep

```js
// Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд.
// Вторым аргументов функция принимает объект ошибки.

rejectAfterSleep(200, 'boom!').catch((err) => {
  console.log(err);
});
```

## timeout

```js
// Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд 
// и возвращает новый Promise.
// Если переданный Promise не успевает зарезолвится до истечения этого времени,
// то результирующий Promise должен быть отклонён с ошибкой new Error('Timeout').
timeout(fetch('url'), 500).then(console.log, console.log);
```

## all

> Необходимо написать функцию, которая идентична Promise.all.

## allSettled

> Необходимо написать функцию, которая идентична Promise.allSettled.

## race

> Необходимо написать функцию, которая идентична Promise.race.

## once

> Необходимо написать функцию, которая бы добавлял обработчик события на заданный элемент и возвращала Promise.
> Promise должен зарезолвиться при срабатывании события. В качестве значения Promise должен возвращать объект события.

```js
once(document.body, 'click').then((e) => { console.log(e) });
```

## promisify

```js
// Необходимо написать функцию, которая бы принимала функцию ожидающую callback и возвращала новую функцию.
// Новая функция вместо callback должна возвращать Promise.
// Предполагается, что исходная функция принимает callback последним параметром, 
// т. е. если функция принимает другие аргументы,
// то они идут ДО callback. Сам callback первым параметром принимает объект ошибки или null,
// а вторым возвращаемое значение (если нет ошибки).

function openFile(file, cb) {
  fs.readFile(file, cb);
}

const openFilePromise = promisify(openFile);

openFilePromise('foo.txt').then(
  console.log,
  console.error
);
```

## allLimit

```js
// Необходимо написать статический метод для Promise, который бы работал как Promise.all,
// но с возможностью задания лимита на выполнения "одновременных" задач.
// В качестве первого параметра, метод должен принимать Iterable объект с функциями, которые возвращают Promise.
// Сам метод также возвращает Promise.

// Одновременно может быть не более 2-х запросов
allLimit([
  fetch.bind(null, 'url1'),
  fetch.bind(null, 'url2'),
  fetch.bind(null, 'url3'),
  fetch.bind(null, 'url4')
], 2).then(([data1, data2, data3, data4]) => {
  console.log(data1, data2, data3, data4);
});
```

## abortablePromise

```js
// Необходимо написать функцию, которая принимала бы некоторый Promise и экземпляр AbortController и 
// возвращала бы новый.
// Этот промис можно отменить с помощью использования переданного AbortController. При отмене промис режектится.

var controller = new AbortController();

abortablePromise(myPromise, controller.signal).catch(console.error);

controller.abort();
```

## nonNullable

```js
// Нужно написать функцию, которая принимает функцию и возвращает новую.
// Новая функция в качестве результата возвращает Promise.
// Если новой функции передать null в качестве аргументов, то промис должен быть зареджекчен.

function sum(a, b) {
  return a + b;
}

function prod(a, b) {
  return a * b;
}

const sum2 = nonNullable(sum);
const prod2 = nonNullable(prod);

prod2(10, null).then(sum2).catch(console.error);
```

## fetchWithRetry

```js
// Необходимо написать обертку для fetch, с возможностью "перезапроса" в случае неудачи.
// Функция должна принимать параметр-функцию, которая получает какой по счету перезапрос и возвращать количество мс
// до следующего перезапроса или false. Если функция вернула false, то Promise запроса режектится с исходной ошибкой.

fetchWithRetry('my-url', {
  retry: (i) => {
    if (i < 5) {
      return i * 1e3;
    }

    return false;
  }
});
```

## syncPromise

```js
// Необходимо написать функцию, которая по своему интерфейсу идентична конструктору Promise,
// но возвращала бы объект, в котором методы then, catch и finally выполнятся немедленно, 
// если промис уже зарезолвлен.
// Семaнтика работы методов в остальном должны быть идентична нативным промисам.

// Порядок в консоли: 1 2
syncPromise((resolve) => resolve(1)).then(console.log);
console.log(2);
```