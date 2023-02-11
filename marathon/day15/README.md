# День 15

## Сжатие глубокого объекта

Необходимо написать функцию, которая бы сжимала некоторый глубокий объект в плоский вид.

```js
const obj = {
  a: {
    b: [1, 2],
    '': {c: 2}
  }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));
```

## Валидация скобочных групп

Необходимо написать функцию, которая бы принимала строку и возвращала true, если у каждого из символов `{`, `[` и `(` есть своя закрывающая пара и они стоят в правильной последовательности.

```js
console.log(isValid('(hello{world} and [me])'));  // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')'));                        // false
```

## Самый большой палиндром в строке

Необходимо написать функцию, которая бы принимала строку и возвращала подстроку с самым большим палиндромом в строке. 

```js
console.log(findPalindromicSubstring('adaabbabla')); // 'abba'
console.log(findPalindromicSubstring('blablur'));    // null
```

## Реализация очереди с приоритетом

Необходимо написать класс, который бы предоставлял API очереди, но с возможности задания функции-компаратора для сортировки на вставке.

```js
const
  queue = new OrderedQueue<number>((a, b) => a - b);

queue.push(1);
queue.push(5);
queue.push(2);
queue.push(-1);
queue.push(5);
queue.push(2);
queue.push(-1);
queue.push(5);

console.log(queue.pop());  // 5
console.log(queue.pop());  // 5

console.log(queue.pop());  // 5
console.log(queue.pop());  // 2
console.log(queue.pop());  // 2
```