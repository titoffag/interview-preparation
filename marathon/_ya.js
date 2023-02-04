// начало - Miami, конец - Monaco
const arr = [
  { from: 'Miami', to: 'Seattle' },
  { from: 'Moscow', to: 'Istanbul' },
  { from: 'Seattle', to: 'London' },
  { from: 'NY', to: 'Moscow' },
  { from: 'Istanbul', to: 'Monaco' },
  { from: 'London', to: 'NY' },
];
function findPath(list) {
  const result = [];
  const fromMap = new Map();
  const toMap = new Map();
  for (const { from, to } of list) {
    fromMap.set(from, to);
    toMap.set(to, from);
  }

  const firstPath = list.find(({ from, to }) => !toMap.has(from));
  let city = firstPath.from;

  while (city) {
    const nextCity = fromMap.get(city);
    if (nextCity) {
      const path = { from: city, to: nextCity };
      result.push(path);
    }
    city = nextCity;
  }

  return result;
}

console.log(findPath(arr));
