function intervalIntersection(
  firstList: number[][],
  secondList: number[][]
): number[][] {
  let i = 0,
    j = 0;

  const result: number[][] = [];
  while (i < firstList.length && j < secondList.length) {
    const [start1, end1] = firstList[i];
    const [start2, end2] = secondList[j];

    const startIntersection = Math.max(start1, start2),
      endIntersection = Math.min(end1, end2);

    if (startIntersection <= endIntersection) {
      result.push([startIntersection, endIntersection]);
    }

    if (end1 < end2) {
      i++;
    } else if (end1 > end2) {
      j++;
    } else {
      i++;
      j++;
    }
  }

  return result;
}
