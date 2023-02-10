function sort(array: number[]): number[] {
  const mul2 = array
    .filter(item => item % 2 === 0)
    // lexicographical default sort
    .sort((a, b) => a - b);

  let mul2Index = 0;
  return array
    .map((item, index) => {
      if (item % 2 === 0) {
        return mul2[mul2Index++];
      }
      return array[index];
    });
}

console.log(sort([7, 1, 4, 2, 9, 8])); // [7, 1, 2, 4, 9, 8]
