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