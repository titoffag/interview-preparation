function flat(arr, depth = 1) {
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

function flatten(arr) {
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
