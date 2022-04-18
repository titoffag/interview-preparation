function majorityElement(nums: number[]): number {
  let result = null,
    vote = 0;

  for (const num of nums) {
    if (vote === 0) {
      result = num;
    }
    if (num === result) {
      vote += 1;
    } else {
      vote -= 1;
    }
  }

  return result;
}

function majorityElement2(nums: number[]): number {
  const sorted = nums.sort();
  return sorted[Math.floor(sorted.length / 2)];
}

function majorityElement3(nums: number[]): number {
  const occurrence = new Map();
  const halfOfN = Math.floor(nums.length / 2);

  for (const num of nums) {
    occurrence.set(num, occurrence.has(num) ? occurrence.get(num) + 1 : 1);
  }

  for (const [num, frequency] of occurrence) {
    if (frequency > halfOfN) {
      return num;
    }
  }

  return -1;
}

function count(nums: number[], target: number, from: number, to: number) {
  let result = 0;

  for (let i = from; i <= to; i++) {
    if (nums[i] === target) {
      result++;
    }
  }

  return result;
}

function findMajorityOnInterval(
  nums: number[],
  from: number,
  to: number
): number {
  if (from === to) {
    return nums[to];
  }

  const mid = Math.floor((from + to) / 2);
  const leftMajority = findMajorityOnInterval(nums, from, mid);
  const rightMajority = findMajorityOnInterval(nums, mid + 1, to);

  if (leftMajority === rightMajority) {
    return leftMajority;
  }

  const leftCount = count(nums, leftMajority, from, to);
  const rightCount = count(nums, rightMajority, from, to);

  return leftCount > rightCount ? leftMajority : rightMajority;
}

function majorityElement4(nums: number[]): number {
  return findMajorityOnInterval(nums, 0, nums.length - 1);
}
