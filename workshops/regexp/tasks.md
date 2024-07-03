# Регулярные выражения

## Шаблонизатор

```js
// Необходимо написать функцию, которая принимает строковый шаблон и объект параметров,
// и возвращает результат применения данных к этому шаблону.
// Для решения задачи нужно использовать регулярное выражение с запоминающими скобками и метод replace у строки.
// В качестве тренировки можно сделать это задание без регулярного выражения.

// Hello, Bob! Your age is 10.
const res = format('Hello, ${user}! Your age is ${age}.', {user: 'Bob', age: 10});
```

## Проверка пароля

```js
// Необходимо написать регулярное выражение, которое при вызове test на строке будет давать false,
// если в строке есть символы отличные от латинских, цифр, подчеркивания и знака $.

myRegExp.test('привет'); // false
```

## Деление строки

```js
// Необходимо создать массив на основе строки, где раздилителем будут символы . , ; или пробелы (подряд идущие пробелы считаюся за один)

'foo    bla.bar,gd;4'.split(myRegExp); // ['foo', 'bla', 'bar', 'gd', '4']
```

## Итератор на основе строки

```js
// Необходимо создать итератор на основе исходной строки

// [['"a": 1', 'a', '1'], ['"b": "2"', 'b', '"2"']]
[...'{"a": 1, "b": "2"}'.matchAll(myRegExp)];
```

## Сжатие строки

```js
// Необходимо написать регулярное выражение, которое бы удаляла из строки любые дублирования подстрок из 1-го, 2-х или 3-х символов, которые идут подряд.
// Подсказка: нужно использовать скобочные группы и обратные ссылки.

'abababbbabcabc'.replace(myRegExp, replaceVal) == 'abbabc';
```

## Удалить из строки все не уникальные символы

```js
// Необходимо написать регулярное выражение, которое бы удаляла из строки все сиволы,
// которые встречются более одного раза в этой строке.

'abaceffgw'.replace(myRegExp, '') == 'bcegw';
```

## Нахождение арифметических операций в строке и замена на результат

```js
// Необходимо написать функцию, которая бы находила арифметические операции в строке и заменяла бы на результат их выполнения

calc(`
Какой-то текст (10 + 15 - 24) ** 2
Еще какой то текст 2 * 10
`) == `
Какой-то текст 1
Еще какой-то текст 20
`
```

## Нахождение в строке чисел обозначающих валюту

```js
// Необходимо написать функцию, которая бы находила в строке любые числа обозначающие деньги

// ['100 00,53$', '500₽']
findMoney(`20.10.2020 Федор взял у меня 100 00,53$ и обещался вернуть не поздее 25 числа, но уже через 2 дня, он занял еще 500₽`);
```

## Поменять ключи и значения местами

```js
const str = `{
  "foo": 1,
  10: 'baz',
  bla: true,
  ban: {a: 1}
}`;

str.replace(myRegExp, replaceVal) == `{
  1: "foo",
  baz: 10,
  true: 'bla',
  '{a: 1}': 'ban'
}`;
```

## Парсинг XML

```js
const str = `
<div bla="foo">
  <div class=ban checked data-foo="baz bar"></div>
</div>
`;

myRegExp.exec(str); // ['div bla="foo"', 'div', 'bla="foo"'];
myRegExp.exec(str); // ['div class=ban checked data-foo="baz"', 'div', 'class=ban', 'checked', 'data-foo="baz bar"'];
myRegExp.exec(str); // null
```