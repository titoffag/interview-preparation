function mergeTwoArrays(arr1, arr2) {
  let i = 0,
    j = 0;

  // O(n) memory
  const result = [];

  // O(n) time
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

console.log(mergeTwoArrays([1, 3, 5, 7, 9, 10, 11, 12, 13], [2, 4, 6, 8, 10]));
