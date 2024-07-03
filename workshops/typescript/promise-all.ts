type CanPromise<T> = T | Promise<T>;

// 1 вар старый дубовый с перегрузкой до 10 элементов до крайнего случая в итерабл кейс
function promiseAll(iterable: []): Promise<[]>;
function promiseAll<A>(iterable: [CanPromise<A>]): Promise<[A]>;
function promiseAll<A, B>(
  iterable: [CanPromise<A>, CanPromise<B>],
): Promise<[A, B]>;
function promiseAll<A, B, C>(
  iterable: [CanPromise<A>, CanPromise<B>, CanPromise<C>],
): Promise<[A, B, C]>;
function promiseAll<T>(iterable: Iterable<CanPromise<T>>): Promise<T[]>;

function promiseAll<T extends any[]>(
  iterable: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  return Promise.all(iterable);
}

promiseAll([1, Promise.resolve("foo"), true]).then(([a, b, c]) =>
  console.log(a, b, c),
);
