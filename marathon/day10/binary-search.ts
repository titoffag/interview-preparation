function bisect<T>(sortedArray: Array<T>, comparator: (value: T) => number): number {
  let left = 0,
    right = sortedArray.length - 1;

  while (left <= right) {
    const middle = Math.floor((right + left) / 2);
    const value = comparator(sortedArray[middle]);

    if (value == 0) {
      return middle;
    }

    if (value > 0) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

console.log(bisect([4], (val) => 4 - val));   // 0
console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 4 - val));   // 3
console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 234 - val)); // -1
console.log(bisect(['a', 'b', 'c', 'd', 'e'], (val) => 'e'.charCodeAt(0) - val.charCodeAt(0))); // 4
