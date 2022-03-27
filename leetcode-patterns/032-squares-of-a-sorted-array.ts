function sortedSquares(nums: number[]): number[] {
    const n = nums.length;
    let left = 0,
        right = n - 1;
    const result = new Array(n).fill(0);
    
    for (let i = n - 1; i > -1; i--) {
        if (nums[left] ** 2 > nums[right] ** 2) {
            result[i] = nums[left] ** 2;
            left += 1;
        } else {
            result[i] = nums[right] ** 2;
            right -= 1;
        }
    }

    return result;
};
