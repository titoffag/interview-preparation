function singleNumber(nums: number[]): number {
  return nums.reduce((mask, num) => mask ^ num, 0);
}
