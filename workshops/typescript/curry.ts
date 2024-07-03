type Splice<A extends any[], N extends number, H extends any[] = []> = {
  0: A;
  1: Splice<Tail<A>, N, [...H, Head<A>]>;
}[A["length"] extends 0 ? 0 : H["length"] extends N ? 0 : 1];

type PartialTuple<
  T extends any[],
  R = [],
  H extends any[] = [],
> = T["length"] extends 0 ? R : PartialTuple<Tail<T>, R | H, [...H, Head<T>]>;

type CurriedFunction<A extends any[], R> = A extends []
  ? R
  : <A2 extends A>(...args: A2) => CurriedFunction<Splice<A, A2["length"]>, R>;

function curry<T extends (...args: A2) => any>(
  fn: T,
): CurriedFunction<Parameters<T>, ReturnType<T>> {
  return function curried(...args: Parameters<T>) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...args2: Parameters<T>) {
        return curried(args.concat(args2));
      };
    }
  };
}

const curriedFunc = curry((a: number, b: number, c: number) => a + b + c);
console.log(curriedFunc(1)(2)(3));
