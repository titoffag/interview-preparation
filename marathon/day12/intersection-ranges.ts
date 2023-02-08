type Pair = [number, number];

function intersectRanges(oneRange: string, twoRange: string) {
  // 1 step: normalize to array of ranges (tuple of two numbers: start and end)
  const oneRangeIterable = normalize(oneRange);
  const twoRangeIterable = normalize(twoRange);

  // 2 step: intersection problem solving
  const intersections: Pair[] = [],
    oneIterator = oneRangeIterable[Symbol.iterator](),
    twoIterator = twoRangeIterable[Symbol.iterator]();

  let oneCursor = oneIterator.next(),
    twoCursor = twoIterator.next();

  while (!oneCursor.done && !twoCursor.done) {
    const [start1, end1] = oneCursor.value,
      [start2, end2] = twoCursor.value;

    const intersection = getIntersection([start1, end1], [start2, end2]);

    if (intersection != null) {
      intersections.push(intersection);
    }

    if (end1 < end2) {
      oneCursor = oneIterator.next();
    } else if (end1 > end2) {
      twoCursor = twoIterator.next();
    } else {
      oneCursor = oneIterator.next();
      twoCursor = twoIterator.next();
    }
  }

  // 3 step: merge problem solving
  const mergedIntervals = [intersections[0]];
  for (const [start1, end1] of intersections) {
    const lastMergedInterval = mergedIntervals[mergedIntervals.length-1];
    const [_, end2] = lastMergedInterval ?? [];

    if (end2 < start1) {
      mergedIntervals.push([start1, end1]);
    } else {
      mergedIntervals[mergedIntervals.length-1][1] = Math.max(end2, end1);
    }
  }

  return mergedIntervals.map((pair: Pair) => pair.join('-')).join('; ');

  function getIntersection(
    [startOne, endOne]: Pair, 
    [startTwo, endTwo]: Pair,
  ): Pair | null {
    const
      low = Math.max(startOne, startTwo),
      high = Math.min(endOne, endTwo);

    if (low <= high) {
      return [low, high];
    }

    return null;
  }

  function normalize(str: string): Pair[] {
    return str.split(/\s*;\s*/)
      .map(
        el => el.split('-').map(el => parseInt(el))
      ) as Pair[];
  }
}

console.log(intersectRanges('1-2; 3-4; 4-6; 9-11', '1-5; 10-14; 15')); // 1-2; 4-5; 10-11 
