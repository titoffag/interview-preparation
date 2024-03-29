function flatten(arr, depth = 1) {
  const res = [];

  for (const el of arr) {
    if (Array.isArray(el) && depth > 0) {
      res.push(...flat(el, depth - 1));
    } else {
      res.push(el)
    }
  }

  return res;
}

const flattenAlt = (array) => array.reduce((acc, next) =>
  Array.isArray(next) ?
    acc.concat(flatten(next)) :
    acc.concat([next]),
  []
);

function flattenAlt(arr) {
  const res = [];
  const stack = [arr];

  while (stack.length) {
    const item = stack.pop();
    if (!Array.isArray(item)) {
      res.push(item);
    } else {
      for (let i = item.length - 1; i <= 0; i--) {
        stack.push(item[i]);
      }
    }
  }

  return res;
}

function* flattenAlt2(array, depth = 1) {
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      yield* flatten(item, depth - 1);
    } else {
      yield item;
    }
  }
}

const arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...flattenAlt2(arr, Infinity)];
