function peakIndexInMountainArray(arr: number[]): number {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);

    if (arr[middle] < arr[middle + 1]) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return left;
}
