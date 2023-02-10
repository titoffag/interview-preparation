# День 5

## Написать функцию debounce

Необходимо написать функцию, которая бы принимала другую функцию и возвращала её debounce версию.

```js
function laugh() {
  console.log('Ha-ha!')
}

const debouncedLaugh = debounce(laugh, 300);

debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
```

## Написать простейший EventEmitter

Должна быть поддержка множественных и одноразовых событий и отмены сразу всех событий по имени.

```js
const ee = new EventEmitter();

ee.once('foo', console.log); // Сработает только один раз

ee.emit('foo', 1);
ee.emit('foo', 2);

ee.off('foo', console.log); // Отмена конкретного обработчика события по ссылке
ee.off('foo');              // Отмена всех обработчиков этого события
```

## Реализация функции аналогичной Array.prototype.flat

Необходимо написать функцию, которая бы повторяло поведение Array.prototype.flat.

```js
console.log(flat([[1, 2], [[1]], 2]));    // [1, 2, [1], 2]
console.log(flat([[1, 2], [[1]], 2], 2)); // [1, 2, 1, 2]
```

## Топологическая сортировка массива

Необходимо написать функцию, которая бы делала топологическую сортировку массива по заданному критерию.

```js
const skills = [
  {
    name: 'fireball',
    need: ['firehands', 'magicspell']
  },

  {
    name: 'firehands'
  },

  {
    name: 'magicspell'
  },

  {
    name: 'inferno',
    need: ['fireball', 'crazymind']
  },

  {
    name: 'crazymind',
    need: ['magicspell']
  }
];

/*
[
  {
    name: 'firehands'
  },

  {
    name: 'magicspell'
  },

  {
    name: 'crazymind',
    need: ['magicspell']
  }

  {
    name: 'fireball',
    need: ['firehands', 'magicspell']
  },

  {
    name: 'inferno',
    need: ['fireball', 'crazymind']
  }
]
*/
console.log(sort(skills, ({name, need}) => [name, need]));
```