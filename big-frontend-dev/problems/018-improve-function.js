const items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'gray', type: 'shit', age: 20 },
];

const excludes = [
  { k: 'color', v: 'silver' },
  { k: 'type', v: 'tv' },
];

function excludeItems(items, excludes) {
  excludes.forEach(pair => {
    items = items.filter(item => item[pair.k] === item[pair.v]);
  });
  return items;
}

function excludeItems(items, excludes) {
  const excludesMap = excludes.reduce((map, { k, v }) => {
    if (!map.has(k)) map.set(k, new Set());
    map.get(k).add(v);
    return map;
  }, new Map());

  return items.filter(item => {
    return !Object.keys(item).some(key => {
      return excludesMap.has(key) && excludesMap.get(key).has(item[key]);
    })
  });
}

function excludeItemsAlt(items, excludes) {
  return items.filter(
    (item) => !excludes.some(({k: key, v: value}) => item[key] === value),
  );
}

console.log(excludeItems(items, excludes));
