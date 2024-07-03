# TypeScript

## Написать типовую функцию HasTail

```typescript
// Необходимо написать типовую функцию HasTail, которая возвращает true, если у переданного массива или кортежа
// есть хвостовая часть

const test1: HasTail<[1, 2, 3]> = true;
const test2: HasTail<[1]> = false;
const test3: HasTail<[]> = false;
```

## Написать типовую функцию Last

```typescript
// Необходимо написать типовую функцию Last, которая возвращает последний элемент переданного массива или кортежа

const test1: Last<[1, 2, 3]> = 3;
const test2: Last<[1]> = 1;

// never
const test3: Last<[]>;
```

## Написать типовую функцию IterableType

```typescript
// Необходимо написать типовую функцию IterableType, которая возвращает тип элемента переданного Iterable или AsyncIterable объекта

// number
const test1: IterableType<[1, 2, 3]>;

// string
const test2: IterableType<Set<string>>;

// {a: number}
const test3: IterableType<AsyncIterable<{a: number}>>;
```

## Написть типовую функцию Drop

```typescript
// Необходимо написать типовую функцию Drop, которая удаляет первые N Элементов из заданного массива или кортежа
// и возвращает массив удалаенных элементов

const test1: Drop<2, [1, 2, 3]> = [1, 2];
const test2: Drop<1, [1, 2, 3]> = [1];
const test3: Drop<3, []> = [];
```

## Написать типовую функцию Overwrite

```typescript
// Необходимо написать типовую функцию Overwrite, которая принимает 2 объекта и возвращает новый,
// в котором коллизии свойств разрешаются в сторону второго объекта

const test1: Overwrite<{a: number; b: string}, {b: number; c: boolean}> = {
  a: 1,
  b: 10,
  c: true
};
```

## Написать типовую функцию Reverse

```typescript
// Необходимо написать типовую функцию Reverse, которая возвращает переданный массив или кортеж в обратном порядке
// и возвращает массив удалаенных элементов

const test1: Reverse<[1, 2, 3]> = [3, 2, 1];
const test2: Reverse<[1]> = [1];
const test3: Reverse<[]> = [];
```

## Написать функцию promiseAll

```typescript
// Необходимо написать функцию promiseAll, которая бы принимала Iterable значений,
// которые могут быть Promise, и возвращала новый Promise зарезолвленный с массивом результатов этих Promise.
// Типы элементов в ответе должны выводиться точно.

promiseAll([Promise.resolve({a: 1})]).then(([o]) => {
  console.log(o.a);
});

promiseAll([1, Promise.resolve('foo')]).then(([num, str]) => {
  console.log(num.toFixed(), str.trim());
});

promiseAll([1, Promise.resolve('foo'), Promise.resolve(new Date())]).then(([num, str, date]) => {
  console.log(num.toFixed(), str.trim(), date.getYear());
});
```

## Написать функцию curry

```typescript
// Необходимо написать функцию curry, которая бы функцию и возвращала каррированную версию.
// TS должен корректно выводить типы такой функции, а также любой ей производной.

const f = curry(function foo(a: number, b: string, c: boolean): number {
  return 42;
});

// @ts-expect-error
f('bla')

// @ts-expect-error
f(10)(34)

f(10)('foo')(true).toFixed()
```

## Реализовать с помощью декораторов и типовых функций поддержку методов с реализаций для интерфейсов

```typescript
// Необходимо придумать как реализовать имплементацию интерфейсов с поддержкой неабстрактных методов.
// TS должен полностью понимать типы.

abstract class Duckable {
  get canFly(): boolean {
    return unimplemented();
  }

  set canFly(value: boolean) {};

  static canFly(self: Duckable): string {
    if (arguments.length > 1) {
      const value = arguments[1];
      // Setter code

    } else {
      return /* Getter code */;
    }
  }
}

@derive(Duckable)
class DuckLike implements Duckable {
  name: string = 'Bob';

  fly(): void {
    // Do some logic to fly
  }
}
```