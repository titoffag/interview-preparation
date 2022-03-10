function singleNumber(nums: number[]): number {
  let mask = 0;

  for (const num of nums) {
    mask ^= num;
  }

  return mask;
}
