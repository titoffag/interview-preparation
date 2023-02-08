function reduce(unsortedArray: number[]): string[] {
  const sortedArray = unsortedArray.sort((prevValue, value) => prevValue - value);
  let start = sortedArray[0],
    end = sortedArray[0];

  return sortedArray.reduce((result: string[], value, idx, array) => {
    if (value + 1 == array[idx + 1]) {
      end = array[idx + 1];
      return result;
    }

    if (start == end) {
      result.push(value.toString());
      start = array[idx + 1];
      end = start;
      return result;
    }

    if (start != end) {
      result.push(`${start}-${end}`);
      start = array[idx + 1];
      end = start;
      return result;
    }

    return result;
  }, []);
}

console.log(reduce([-2, -1, 1, 3, 6, 8, 7, 11, 45, 46, 2])); // 1-3, 6-8, 11, 45-46
