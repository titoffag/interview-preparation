function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // gauss formula
  const actualSum = nums.reduce((res, num) => (res += num), 0);

  return expectedSum - actualSum;
}
