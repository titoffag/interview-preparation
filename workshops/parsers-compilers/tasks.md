# Устройство компиляторов и парсеров

## Парсер математических выражений

Необходимо написать парсер математических выражений и построить AST.

```js
/*
{
  op: '+'
  children: [
    {type: 'number', value: 10},
    
    {
      op: '/'
      children: [
        {
          op: '*',
          children: [
            {type: 'variable', value: 'x'},
            {type: 'number', value: 15}
          ]
        },
        
        {
          op: '-',
          children: [
            {type: 'number', value: 4},
            {type: 'variable', value: 'y'}
          ]
        }
      ]
    }
  ]
}
*/

const ast = parseExpr('10 + x * 15 / (4 - y)');
```

## Частичное вычисление выражений

Улучшение функции из предыдущего задания. В местах где возможно сразу вычислить то или иное выражение, например `(7 - 2)` -
нужно это делать. Т.е. в конечном AST будет уже результат.

```js
/*
{
  op: '+'
  children: [
    {type: 'number', value: 10},
    
    {
      op: '/'
      children: [
        {
          op: '*',
          children: [
            {type: 'variable', value: 'x'},
            {type: 'number', value: 15}
          ]
        },
        
        {type: 'number', value: 2}
      ]
    }
  ]
}
*/

const ast = parseExpr('10 + x * 15 / (4 - 2)');
```

## Подстановка значение вместо переменных

Улучшение функции из предыдущего задания. Необходимо написать функцию, которая принимает AST и объект, где ключами
являются названия переменных, а значениями - значения этих переменных. Функция должна возвращать новое AST с частичным вычислением
на основе значений переменных.

```js
/*
{
  op: '+'
  children: [
    {type: 'number', value: 10},
    
    {
      op: '/'
      children: [
        {
          op: '*',
          children: [
            {type: 'variable', value: 'x'},
            {type: 'number', value: 15}
          ]
        },
        
        {type: 'number', value: 5}
      ]
    }
  ]
}
*/

const ast = calcExpr(parseExpr('10 + x * 15 / (y - 2)'), {y: 7});

// {type: 'number', value: 16}
const ast2 = calcExpr(ast, {x: 2});
```

## Парсер XML текста

Необходимо написать парсер текст на языке XML в последовательность токенов.

```js
/*
[
  {type: 'CREATE_TAG', value: 'foo'},
  {type: 'CREATE_ATTR_KEY', value: 'attr-1'},
  {type: 'CREATE_ATTR_VALUE', value: 'value 1'},
  {type: 'CREATE_ATTR_KEY', value: 'attr-2'},
  {type: 'CREATE_ATTR_VALUE', value: 'value 2'}
  {type: 'END_CREATE_TAG'},
  {type: 'CREATE_TAG', value: 'bar'},
  {type: 'CREATE_ATTR_KEY', value: 'attr-1'},
  {type: 'CREATE_ATTR_VALUE', value: 'value 1'}
  {type: 'END_CREATE_TAG'},
  {type: 'TEXT', value: 'Hello world'},
  {type: 'END_TAG', value: 'bar'},
  {type: 'END_TAG', value: 'foo'}
]
*/

const tokens = Array.from(parseXML(`
<foo attr-1="value 1" attr-2="value 2">
  <bar attr-1="value 1">Hello world</bar>
</foo>
`));
```

## Минификатор HTML текста

Необходимо написать функцию, которая бы принимала XML текст и возвращала минифицированную версию,
т.е. с удалением лишних пробелов и кавычек атрибутов.

```js
// <p attr=foo att2=bar>Hello bar</p>
const html = minimizeHTML(`
<p attr="foo"   att2="bar">
  Hello       bar
</p>
`);
```

## Транслятор Markdown в HTML

Необходимо написать функцию, которая бы принимала текст на языке Markdown и возвращала бы текст в HTML.

```js
/*
<h1>Heading</h1>
<a href="https://https://taplink.cc/kobezzza.channel">kobezzza channel</a>
<ul>
  <li>
    List item 1
    <ul>
      <li>Nested List item 1</li>
    </ul>
  </li>
  <li>List item 2</li>
</ul>
*/

markdownToHTML(`
# Heading

[kobezzza channel](https://https://taplink.cc/kobezzza.channel)

* List item 1
  * Nested List item 1
* List item 2
`);
```

## Бьютифайлер для JSON

Необходимо написать бьютифайлер заданной JSON строки.

```js
/*
{
  "a": 1,
  "b": [
    1,
    2,
    {
      "c": 3
    }
  ]
}
*/
const str = beautify('{"a": 1, "b": [1, 2, {"c": 3}]}');
```

## Подсветка синтаксиса для JSON

Необходимо написать функцию, которая бы принимала JSON строку и возвращала ссылку на DOM узел с форматированным и раскрашенным
синтаксисом.

```js
document.body.append(highlight('{"a": 1, "b": [1, 2, {"c": 3}]}'));
```

## Подсветка синтаксиса для JSON c обработкой ошибок

Улучшение функции из предыдущего задания. Необходимо находить все потенциальные ошибки синтаксиса при парсинге и подсвечивать
их при отображении.

## Текстовый редактор JSON с подстветкой синтаксиса и обработкой ошибок

Улучшение функции из предыдущего задания. Необходимо разрешить редактирование набранного текста с сохранением подсветки и обработки ошибок.