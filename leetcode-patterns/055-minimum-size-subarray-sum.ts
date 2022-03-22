function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0,
    minLength = Infinity,
    windowSum = 0;

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];

    while (windowSum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      windowSum -= nums[left];
      left += 1;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}
