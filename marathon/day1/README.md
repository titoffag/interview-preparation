# День 1

## Что выведется в консоль?

И почему?

```js
class Foo {
  bar = 1;

  bla = () => console.log(this.bar);

  baz = function () { console.log(this.bar); };
}

new Foo().bla(); // ?
new Foo().baz(); // ?
```

## Реализация Partial классов

Необходимо написать функцию, которая бы позволяла расширять заданный класс новыми методами. В добавляемых методах должен корректно работать super.

```js
class Parent {
  foo() {
    console.log('It works!');
  }
}

class Example extends Parent {}

partial(Example, {
  foo() {
    super.foo();
    console.log('Yeaaah');
  },
  
  get bar() {
    return Math.random();
  }
});

const example = new Example();

example.foo(); // It works! Yeaaah

console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число
```

## Шаблонизатор строки с поддержкой выражений

Необходимо создать функцию, которая бы принимала шаблон и объект с данными, а возвращала бы конечную строку.

```js
format('Hello ${name}! May age is ${age * 2}.', {name: 'Bob', age: 12}); // 'Hello Bob! My age is 24.'
```

## Реализация функции аналогичной Promise.allSettled

Необходимо написать функцию, которая бы повторяло поведение Promise.allSettled.

```js
allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
  console.log(v1); // {status: 'fulfilled', value: 1}
  console.log(v2); // {status: 'fulfilled', value: 2}
  console.log(v3); // {status: 'rejected', reason: 3}
});
```