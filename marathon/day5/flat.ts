type NestedArray<T> = Array<NestedArray<T> | T>;

function flat<T>(iterable: NestedArray<T>, depth = 1) {
  const result: T[] = [];

  for (const el of iterable) {
    if (Array.isArray(el) && depth > 0) {
      result.push(...flat(el, depth - 1));
    } else {
      // @ts-ignore
      result.push(el);
    }
  }

  return result;
}

console.log(flat([[1, 2, '2'], [[1]], 2]));    // [1, 2, [1], 2]
console.log(flat([[1, 2], [[1]], 2], 2)); // [1, 2, 1, 2]
