function merge(intervals: number[][]): number[][] {
  // default - lexicographical sorting
  const sortedIntervalsByStart = intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [sortedIntervalsByStart[0]];
  for (const [start1, end1] of sortedIntervalsByStart) {
    const lastMergedInterval = mergedIntervals[mergedIntervals.length - 1];
    const [_, end2] = lastMergedInterval ?? [];

    if (end2 < start1) {
      mergedIntervals.push([start1, end1]);
    } else {
      mergedIntervals[mergedIntervals.length - 1][1] = Math.max(end2, end1);
    }
  }

  return mergedIntervals;
}
