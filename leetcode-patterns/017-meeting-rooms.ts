function canAttendMeetings(intervals: number[][]): boolean {
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < sortedIntervals.length - 1; i++) {
    if (sortedIntervals[i][1] > sortedIntervals[i + 1][0]) {
      return false;
    }
  }

  return true;
}
