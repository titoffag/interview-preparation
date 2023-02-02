function findDisappearedNumbers(nums: number[]): number[] {
  let i = 0;

  while (i < nums.length) {
    const pos = nums[i] - 1; // correct position

    if (nums[i] !== nums[pos]) {
      [nums[i], nums[pos]] = [nums[pos], nums[i]];
    } else {
      i += 1;
    }
  }

  return nums.reduce((miss: number[], cur, i) => {
    if (cur !== i + 1) {
      miss.push(i + 1);
    }

    return miss;
  }, []);
}
