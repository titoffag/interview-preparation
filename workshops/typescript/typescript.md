поч намбер не точные - MAX_SAFE_INTEGER
арифметика
что такое дабл флоат плавающая запятая двойная точность 64 бита 8 байта
как строка представляется с помощью кодировок utf-8 utf-16 суррогатные пары
как работает бигинт - MAX_INTEGER

true 0000 0001 выравнивание бита в байтовое представление
false 0000 0000

1. number
2. bigint
3. string
4. boolean
5. symbol
6. null
7. undefined
8. object

как происходит преобразование?
1 + ‘test’
левый правый кастуется
что кастуется к фолс значению?

неявная нестрогая динамическая типизация

размеченное объединение/тип-сумма/алгебраический тип
union type - string | number
guard - typeof a === 'number' a instanceof Array Array.isArray

custom guard
function isArray(obj: unknown): obj is Array<unknown> {
  return Array.isArray(obj);
}

intersection type - Foo & Bar
ф-ция миксин - test({...new Foo(), ...new Bar()})

type T = 1 | 2 | 3;
type Append = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

строковый паттерн через литерал
type Append = ${'before' | 'after'}${'begin' | 'end'}

unique symbol
typeof - сужает для const, расширяет до родителя для let

interface vs type

type Options = boolean | {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

addEventListener(document.body, 'click', true);

интерфейс экстендс другой интерфейс это как интерсекшн типов (коллизии св-в плохо, тк тип незя пересечь у примитивов будет never, тока у объектов это будет мерж св-в объектов)
юнион тайпов можем сделать на интерфейсах? нет
интерфейс описает объект с его св-вами и методами
значит подходит под описание классов через мн-венные implements
тайп как алиас типа можем использовать

два одинаковых по имени интерфейсов это как интерсекшн типов или интерфейс экстендс другой интерфейс
но по имени мержатся еще не тока интерфейсы но и еще класс
и так можно динамически добавлять в класс методы имплементирующий интерфейс

типы интерфейс после компила в джс исчезают
остаются два рантайма из тса энам и декораторы

any - опасное неизвестное значение
unknown - безопасное неизвестное значение, работа возможна после guards
never - while true throw ничего не возвращается
void - не важно что вернулось не тоже самое что undefined (undefined значение)
объект мб не иметь значения по ключу - Record<string|symbol, number|undefined>

interface User {}
function isUser(data: unknown): data is User {
  return data != null && typeof data === 'object' && 'user' in data;
}

see doc -> typescriptlang.org

http://typehero.dev ts challenges
