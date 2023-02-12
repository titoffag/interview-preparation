type Num = number;
type Idx = number;

function twoSum(array: number[], target: number): [number, number] | [] {
  const seen = new Map<Num, Idx>();

  for (const [idx, el] of array.entries()) {
    const diff = target - el;
    if (seen.has(diff)) {
      return [seen.get(diff)!, idx];
    }
    seen.set(el, idx);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
