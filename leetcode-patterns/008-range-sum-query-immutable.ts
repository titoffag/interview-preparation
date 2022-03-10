class NumArray {
  sums: number[];

  constructor(nums: number[]) {
    this.sums = nums.reduce((sums, num, idx) => {
      const prevSum = idx ? sums[idx - 1] : 0;
      const currentSum = prevSum + num;

      sums.push(currentSum);
      return sums;
    }, []);
  }

  sumRange(left: number, right: number): number {
    if (left === 0) {
      return this.sums[right];
    }

    return this.sums[right] - this.sums[left - 1];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
