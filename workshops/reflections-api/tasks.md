# Рефлексия и мета-программирование в JS

## Функция для удобного создания перегрузок

```js
// Необходимо написать функцию для удобного создания перегрузок на основе аргументов

const myFunction = overload([
  () => 100500,
  (a, b) => a + b,
  (a, b, c) => a * b * c
]);

// 100500
myFunction();

// 3
myFunction(1, 2);

// 24
myFunction(2, 3, 4);
```

## Функция для разбора переданной функции на составляющие

```js
// Необходимо написать функцию для разбора переданной функции на составляющие

// {name: 'sum', arguments: ['a', 'b'], native: false}
parse(function sum(a, b) { return a + b; });
```

## View для получения элементов из Map/Set по числовому индексу

```js
// Необходимо написать функцию, которая принимает Map/Set объект и возвращает обертку,
// которая может получать значение по числовым индексам

const indexedMap = indexedWrapper(new Map([
  ['key1', 'foo'],
  ['key2', 'bar'],
]));

// true
console.log(indexedMap.get('key1') === indexedMap[0]);
```

## Класс данных с поддержкой операций с JSON строкой

```js
// Необходимо написать такой класс, экземпляры которого можно использовать для поиска и замены значений в JSON.строке

class JSONData {
  constructor(id) {
    this.id = id;
  }
}

let data = `[
  {"id": 10, "data": {"name": "Bob", "age": 23}},
  {"id": 14, "data": {"name": "Jack", "age": 35}},
  {"id": 11, "data": {"name": "Sam", "age": 43}},
  {"id": 14, "data": {"name": "Duke", "age": 24}}
]`;

const sam = new JSONData(11);

if (data.search(sam) !== -1) {
  data = data.replace(sam, {name: 'Sam', age: 57});

  data === `[
  {"id": 10, "data": {"name": "Bob", "age": 23}},
  {"id": 14, "data": {"name": "Jack", "age": 35}},
  {"id": 11, "data": {"name": "Sam", "age": 57}},
  {"id": 14, "data": {"name": "Duke", "age": 24}}
]`;
}
```

## ReadonlyView объекта

```js
// Необходимо написать функцию, которая принимает некоторый объект и возвращает его замороженную версию.
// при этом заморозка должна происходить рекурсивно (т.е. в глубину). Однако, оригинальный объект по прежнему можно менять,
// причем эти изменения должны быть видны и из замороженного объекта.

const obj = {a: 1, b: [1, 2, 3], mutate() { this.a++; }};

const readonlyObj = readonly(obj);

readonlyObj.a++;

/// true
console.log(readonlyObj.a === 1);

readonlyObj.mutate();

/// true
console.log(readonlyObj.a === 1);

readonlyObj.b.push(10);

// [1, 2, 3]
console.log(readonlyObj.b);

obj.a++;

/// true
console.log(readonlyObj.a === 2);
```

## Обертка для удобной работы с Promise

```js
// Необходимо написать функцию, которая принимает произвольный объект и возвращает обертку.
// Если при образении к свойствам этой обертки выясняется, что значение - это Promise,
// то обертка интегрирует вызов в цепочку Promise без необходимости делать это явно.

const obj = {
  async get() {
    return {
      async anotherGet() {
        return 10.123456;
      }
    }
  }
};

const asyncObj = awaiter(obj);

asyncObj.get().anotherGet().toFixed(2).then((res) => {
  // true
  console.log(res === '10.12');
});
```

## Библиотека для проверки объектов на соответствие заданной схеме

```js
// Необходимо написать библиотеку для проверки объектов на соответствие заданной схеме

const scheme = createScheme().object.keys({a: Number, b: String}).optionalKeys({e: Number});

// true
scheme.validate({a: 1, b: 'sd'});

// true
scheme.validate({a: 1, b: 'sd', e: 1});

// false
scheme.validate({a: 1, b: 'sd', e: '1'});

// false
scheme.validate([]);
```

## Глубокое клонирование объекта с поддержкой функций, Map, Set и круговых ссылок

```js
// Необходимо написать функцию clone, которая используя технику JSON.parse(JSON.stringify) создает глубокую копию объекта,
// но при этом поддерживает функции, Map, Set и круговых ссылки, а также сохраняет исходные дескрипторы.

const obj = {
  a: [
    () => 1
  ],

  self: obj,
  set: new Set([1, {e: 2}, () => 3]),

  get mySet() {
    return this.set;
  }
}

const newObj = clone(obj);

// true
console.log(newObj !== obj);

// true
console.log(newObj.set !== obj.set);

// [1, {e: 2}, () => 3]
console.log([...newObj.set]);

newObj.set.add(10);

// [1, {e: 2}, () => 3, 10]
console.log([...newObj.mySet]);
```

## Частично персистентная структура данных

```js
// Необходимо написать функцию, которая создает частично персистентную структуру данных на основе заданной.
// Любое изменение в полученной структуре должно создавать копию, а не мутировать исходные данные.
// Любые операции изменения должны выполняться лениво и эффективно. Должна быть возможность посмотреть лог изменений.

const rawData = {
  user: {
    name: 'Bob',
    age: 34
  },

  friends: [
    {
      name: 'Jack',
      age: 45
    },

    {
      name: 'Bill',
      age: 21
    }
  ]
};

// Операция должна занимать константное время
const persistendData1 = immutable(rawData);

// {name: 'Bob', age: 34}
console.log(persistendData1.data.user);

// [исходный объект]
console.log(persistendData1.versions);

persistendData1.user.age++;

// {name: 'Bob', age: 35}
console.log(persistendData1.data.user);

// 34
console.log(persistendData1.versions[0].user.age);

// 35
console.log(persistendData1.versions[1].user.age);

try {
  persistendData1.versions[0].user.age++;

} catch (err) {
  // Нельзя изменять данные внутри versions
  console.log(err);
}

persistendData1.data.friends.push({
  name: 'Angelina',
  age: 53
});

// {name: 'Angelina', age: 53}
console.log(persistendData1.data.friends.at(-1));

// 3
console.log(persistendData1.versions.length);

/* {
  changed: [{where: 'user.age', value: 35, oldValue: 34}],
  added: [{where: 'friends.2', value: 35}]
} */
console.log(persistendData1.diff(0, 2));
```

## Ленификатор для произвольного объекта

Необходимо написать функцию, которая принимает некоторый произвольный объект (массив, таблицу, функцию, класс и т.д.).
И возвращает новую, похожую структуру, которая перехватывает все вызовы на исходную и откладывает их в очередь.
После вызова специального терминального метода, очередь отложенных задач выполняется и возвращается результат последней операции.

**Пример с массивом**

```js
const lazyArray = makeLazy([1, 2, 3, 4]);

// 3
console.log(lazyArray[2]);

lazyArray.push(15, 3);

lazyArray.shift();

// 1
console.log(lazyArray[0]);

const lazyArray2 = lazyArray.filter((el) => el > 2).map((el) => el * 2);
lazyArray2.pop();

// [2, 3, 4, 15, 3]
console.log(lazyArray.unwrap());

// [6, 8, 30]
console.log((lazyArray.unwrap()));
```

**Пример с функцией**

```js
function createUser(name, age) {
  return {
    name,
    age,
    showInfo() {
      console.log(`Name: ${this.name}; Age: ${this.age}`);
    }
  };
}

const lazyUser = makeLazy(createUser);

lazyUser.age = 45;
lazyUser.showInfo();

// Повторный вызов функции является терминальной операцией
// `Name: Bob; Age: 45`
const user = lazyUser('Bob', 10);
```

**Пример с классом**

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;

    this.config = {
      errorHandler() {
        console.log('Boom!');
      }
    };
  }

  showInfo() {
    console.log(`Name: ${this.name}; Age: ${this.age}`);
  }
}

const LazyUser = makeLazy(User);

LazyUser.showInfo();
LazyUser.config.attr = 'value';
LazyUser.config.errorHandler();

// Создание экземпляра является терминальной операцией
// `Name: Bob; Age: 23`
// `Boom!`
const user = new LazyUser('Bob', 23);

// Потому что `LazyUser.config.attr = 'value'`
console.log(user.config.attr === 'value');
```