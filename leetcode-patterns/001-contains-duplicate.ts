function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }

    seen.add(num);
  }

  return false;
}

function containsDuplicateAlt(nums: number[]): boolean {
  return Array.from(new Set(nums)).length !== nums.length;
}
