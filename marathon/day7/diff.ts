console.log(diff([1, 2, 3, 4, 5], [3, 4, 1])); // [2, 5] 

function diff(arr1: number[], arr2: number[]): number[] {
  const arr2Set = new Set(arr2);

  return arr1.filter(el => !arr2Set.has(el));
}

