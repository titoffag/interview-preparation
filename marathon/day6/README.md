# День 6

## Реализация паттерна "Строитель" для класса

Необходимо реализовать паттерн "Строитель" для заданного класса.

```js
class User {
  constructor(params) {
    this.name = params.name;
    this.age = params.age;
    this.skills = params.skills;
  }
}

User.name('Bob').age(47).skills(['Coding']).create(); // User({name: 'Bob', age: 47, skills: ['Coding']})
```

## Обход дерева в ширину

Необходимо вывести элементы дерева таким образом, чтобы по очереди выводились все элементы каждого яруса.

```js
const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{value: 4}]
    },
    {
      value: 3
    }
  ]
};

log(tree); // 1 2 3 4
```

## Реализовать функцию преобразования CamelCase в dash-style

Необходимо создать функцию, которая бы принимала строку в CamelCase и возвращала бы её вариант в dash-style.

```js
console.log(dasherize('createDocumentFragment')); // 'create-document-fragment'
console.log(dasherize('SuperMAN'));               // 'super-man'
console.log(dasherize('VirtualDOMFragment'));     // 'virtual-dom-fragment'
```

## Реализовать функцию waterfall для callback функций

Необходимо создать функцию для композиции асинхронного кода на callback функциях, которая работает как показано на примере.

```js
waterfall([
  (cb) => {
    cb(null, 'one', 'two');
  },
  
  (arg1, arg2, cb) => {
    console.log(arg1); // one
    console.log(arg2); // two
    cb(null, 'three');
  },
  
  (arg1, cb) => {
    console.log(arg1); // three
    cb(null, 'done');
  }
], (err, result) => {
  console.log(result); // done
});

waterfall(new Set([
  (cb) => {
    cb('ha-ha!');
  },
  
  (arg1, cb) => {
    cb(null, 'done');
  }
]), (err, result) => {
  console.log(err);    // ha-ha!
  console.log(result); // undefined
});
```