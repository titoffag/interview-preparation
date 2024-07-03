# Работа с ошибками и исключениями

## Универсальный класс ошибки для некоторой сущности

```js
// Необходимо написать собственный класс ошибки, который бы представлял единый интерфейс для любых ошибок,
// но поддерживал возможность получения "оригинальной" ошибки, если таковая есть.

const err1 = new MyError('Simple error');
const err2 = new MyError('Wrapped error', new TypeError('Indalid data type'));
console.log(err2.cause.message === 'Indalid data type');
```

## Полифил для AggregateError

```js
// Необходимо написать полифил для класса ошибок AggregateError

try {
  throw new AggregateError([
    new Error("some error"),
  ], 'Hello');

} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message);                   // "Hello"
  console.log(e.name);                      // "AggregateError"
  console.log(e.errors);                    // [ Error: "some error" ]
}
```

## Класс логирования ошибок

```js
// Необходимо написать класс, который бы реализовывал функционал логирования ошибок.
// Все глобальные исключения и необработанные промисы должны логировать автоматически.
// Класс должен предоставлять декоратор для функций, который добавляет логирование (при этом исключения не должны останавливаться).

class ErrorLogger {
  decorate() {
  }
}

const logger = new ErrorLogger();

Promise.reject('haha'); // logger перехватит и выведет в консоль

setTimeout(() => {
  throw 'boom!'; // logger перехватит и выведет в консоль
}, 100);

const wrappedFn = logger.decorate(function () {
  throw 'bla!'; // logger перехватит и выведет в консоль
});

try {
  wrappedFn();

} catch (err) {
  console.log(err === 'bla!'); // true
}
```

## try with resources

```js
// Необходимо написать функцию, которая принимает Iterable объектов и функцию callback.
// В случае возникновения исключения в момент работы callback, а также после его успешного выполнения
// у каждого из переданных объектов должен вызывать метод destructor. При этом исключение все равно должно быть проброшено наверх.
// Если в момент вызова метода destructor выброшено еще одно исключение, то оно не должно блокировать вызовы остальных деструкторов.

const resource1 = (() => {
  const cb = () => {
    console.log('Clicked!');
  };

  document.addEventListener('click', cb);

  return {
    destroyed: false,

    destructor() {
      this.destroyed = true;
      throw 'Oops!';
      document.removeEventListener('click', cb);
    }
  };
})();

const resource2 = (() => {
  const cb = () => {
    console.log('Clicked again!');
  };

  document.addEventListener('click', cb);

  return {
    destroyed: false,

    destructor() {
      this.destroyed = true;
      document.removeEventListener('click', cb);
    }
  };
})();

try {
  tryWith([resource1, resource2], (resource1, resource2) => {
    throw 'Bam!'
  })
} catch (err) {
  console.log(err === 'Bam!'); // true
  console.log(resource1.destroyed); // true
  console.log(resource2.destroyed); // true
}
```

## Контейнерный тип Option

```js
// Необходимо написать класс Option, который бы представлял обёртку над данными, которых может не быть.
// У контейнера также должен быть метод unwrap, который либо просто возвращает данные, либо кидает исключение (данных нет).
// Контейнер должен реализовывать thenable интерфейс.

// Данных нет
const data1 = new Option(Option.None);

console.log(data.isNone); // true

try {
  data1.unwrap();

} catch (err) {
  console.log(err.message === 'The container has no data');
}

data1
  .then(console.log) // Не вызовется
  .or(new Option('Данные есть'))
  .then(console.log) // Данные есть
```

## Контейнерный тип Result

```js
// Необходимо написать класс Result, который бы представлял обёртку над данными, которых могут содержать ошибку.
// У контейнера также должен быть метод unwrap, который либо просто возвращает ошибку, либо кидает исключение (есть ошибка).
// Контейнер должен реализовывать thenable интерфейс.

// Данных нет
const data1 = new Result(new Error('Boom!'));

console.log(data.isError); // true

try {
  data1.unwrap();

} catch (err) {
  console.log(err.message === 'Boom!');
}

data1
  .then(console.log) // Не вызовется
  .catch((err) => `${err.message} больше не ошибка`)
  .then(console.log) // Boom! больше не ошибка
```

## EventEmitter с обработкой ошибок

```js
// Необходимо написать класс EventEmitter, который бы реализовывал семантику:
// если испускается событие, у которого данные - это наследник Error, но у него нет слушателей, то будет сгенерировано исключение.

class EventEmitter {
  on() {

  }

  off() {

  }

  emit() {

  }
}

const ee = new EventEmitter();

try {
  ee.emit('error', new Error('Ooops'));

} catch (err) {
  console.log(err.message === 'Ooops'); // true
}

try {
  ee.emit('haha', new TypeError('Ooops'));

} catch (err) {
  console.log(err.message === 'Ooops'); // true
}

try {
  ee.emit('error', 'Ooops');

} catch (err) {
  console.log(err.message === 'Ooops'); // Этот код никогда не вызовется
}

try {
  ee.on('error', (err) => {
    console.log('Gotcha!', err);
  });

  ee.emit('error', new Error('Ooops'));

} catch (err) {
  console.log(err.message === 'Ooops'); // Этот код никогда не вызовется
}
```

## EventEmitter с поддержкой всплытия ошибок

```js
// Необходимо расширить класс из предыдущего задания добавив в него возможность "всплытия" ошибки до другого EventEmitter.
// Если ошибка не обрабатывается в текущем EventEmitter, то она всплывает до родителя (если таковой есть), а если нет - кидает исключение.

const parent = new EventEmitter();

const ee = new EventEmitter(parent);

parent.on('error', (err) => {
  console.log(err.message);
});

ee.emit('error', new Error('Boom!'));

try {
  ee.emit('error2', new Error('Boom2!'));

} catch (err) {
  console.log(err.message === 'Boom2!'); // true
}
```

## Stream с поддержкой ошибок

```js
// Необходимо расширить класс из предыдущего задания добавив в него возможность предоставления потока событий в виде AsyncIterable.
// У обычных событий и ошибок должны быть разные потоки.

const ee = new EventEmitter();

(async () => {
  for await (const err of ee.errors()) {
    console.log(err);
  }
})();

(async () => {
  for await (const err of ee) {
    console.log(err);
  }
})();

ee.emit('error', new Error('Boom!'));
ee.emit('not-error', 'some data');
```

## Stream с поддержкой ошибок и деструктора

```js
// Необходимо расширить класс из предыдущего задания добавив в него возможность уничтожать созданные потоки событий.
// При уничтожении события внутри циклов обработчиков должно быть сгенерировано исключение.

const ee = new EventEmitter();

(async () => {
  try {
    for await (const err of ee.errors()) {
      console.log(err);
    }
  } catch (err) {
    console.log(err.message === 'The emitter was destroyed');
  }
})();

ee.emit('error', new Error('Boom!'));

ee.destroy();
```