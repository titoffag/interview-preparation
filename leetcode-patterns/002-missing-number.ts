function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // gauss formula
  const actualSum = nums.reduce((sum, num) => (sum += num), 0);

  return expectedSum - actualSum;
}
