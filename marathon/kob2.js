function sort(arr) {
  const arrToSort = [];
  const orderIdx = [];

  for (const [i, el] of arr.entries()) {
    if (el % 2 == 0) {
      arrToSort.push(el);
      orderIdx.push(i);
    }
  }

  arrToSort.sort().forEach((val, idx) => {
    const newIdx = orderIdx[idx];
    arr[newIdx] = val;
  });

  return arr;
}

// function sort(array) {
//   const mul2 = array
//     .filter(item => item % 2 === 0)
//     .sort();
//   let mul2Index = 0;
//   return array
//     .map((item, index) => {
//       if (item % 2 === 0) {
//         return mul2[mul2Index++];
//       }
//       return array[index];
//     })
// }

console.log(sort([7, 1, 4, 2, 9, 8])); // [7, 1, 2, 4, 9, 8]
