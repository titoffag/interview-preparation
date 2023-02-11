# День 14

## Поиск подстроки в строке

Необходимо написать функцию, которая принимала бы строку и подстроку и возвращала бы true, если заданная подстрока присутствует в строке.
Регулярные выражения использовать нельзя.

```js
console.log(includes('hello bob!', 'bob'));  // true
console.log(includes('abba', 'aba'));        // false
```

## Ломающий коммит

Имеется множество коммитов и функция проверки работы программы. На одном из коммитов программа начинает ломаться.
Необходимо выяснить за минимальное время этот коммит.

```js
const commits = ['good', 'good', 'good', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad'];

const test = (commit) => commit === 'good';

console.log(findFirstBadCommit(commits, test)); // 3
```

## Максимальная подстрока без повторений

Необходимо написать функцию, которая принимала бы строку и возвращала бы максимальную подстроку без повторяющихся символов.

```js
console.log(maxUniqueSubstr('aab'));      // ab
console.log(maxUniqueSubstr('abcabcbb')); // abc
console.log(maxUniqueSubstr('bbbbb'));    // b
console.log(maxUniqueSubstr('pwwkew'));   // wke
```

## Генерация анаграмм

Необходимо создать функцию, которая бы принимала строку и возвращала список всех анаграмм этого слова.

```js
console.log(getAnagram('cat')); // ['cta', 'atc', 'act', 'tca', 'tac']
```