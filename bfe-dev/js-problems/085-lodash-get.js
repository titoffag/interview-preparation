function get(source, path, defaultValue) {
  const pathArray = Array.isArray(path) ? path : path.match(/[^\[\]\.]+/g);

  return pathArray.reduce((obj, key) => {
    return obj?.[key];
  }, source) ?? defaultValue;
}

const obj = {
  a: {
    b: {
      c: [1, 2, 3]
    }
  }
}

console.log(get(obj, 'a.b.c')) // [1,2,3]
console.log(get(obj, 'a.b.c.0')) // 1
console.log(get(obj, 'a.b.c[1]')) // 2
console.log(get(obj, ['a', 'b', 'c', '2'])) // 3
console.log(get(obj, 'a.b.c[3]')) // undefined
console.log(get(obj, 'a.c', 'bfe')) // 'bfe'