/**
 * Вычисление расстояния Левенштейна
 */
function diff(str1: string, str2: string): number {
  const chars1 = [...str1],
    chars2 = [...str2];

  return (function levenshteinDistance(
    chars1: string | string[],
    chars2: string | string[]
  ): number {
    if (chars1.length == 0) {
      return chars2.length;
    }

    if (chars2.length == 0) {
      return chars1.length;
    }

    const [char1, ...tail1] = chars1,
      [char2, ...tail2] = chars2;

    if (char1 == char2) {
      return levenshteinDistance(tail1, tail2);
    }

    return (
      1 +
      Math.min(
        levenshteinDistance(char1, tail2),
        levenshteinDistance(tail1, char2),
        levenshteinDistance(tail1, tail2),
      )
    );
  })(chars1, chars2);
}


function diffAlt(str1: string, str2: string): number {
  const chars1 = [...str1],
    chars2 = [...str2];

  class Matrix {
    cols: number;
    rows: number;
    buffer: number[];

    constructor(cols: number, rows: number) {
      this.cols = cols;
      this.rows = rows;
      this.buffer = new Array(cols * rows).fill(0);
    }

    get(col: number, row: number): number {
      return this.buffer[col * this.rows + row];
    }

    set(col: number, row: number, value: number) {
      this.buffer[col * this.rows + row] = value;
    }
  }

  const cache = new Matrix(chars1.length + 1, chars2.length + 1);

  for (let i = 1; i <= chars1.length; i++) {
    cache.set(i, 0, i);
  }

  for (let i = 1; i <= chars2.length; i++) {
    cache.set(0, i, i);
  }

  for (let i = 1; i <= chars1.length; i++) {
    for (let j = 1; j <= chars2.length; j++) {
      let dist = 0;

      if (chars1[i - 1] != chars2[j - 1]) {
        dist = 1;
      }

      cache.set(
        i,
        j,
        Math.min(
          cache.get(i - 1, j - 1) + dist,
          cache.get(i, j - 1) + 1,
          cache.get(i - 1, j) + 1,
        ),
      )
    }
  }

  return (function levenshteinDistance(
    chars1: string | string[],
    chars2: string | string[]
  ): number {
    if (chars1.length == 0) {
      return chars2.length;
    }

    if (chars2.length == 0) {
      return chars1.length;
    }

    const [char1, ...tail1] = chars1,
      [char2, ...tail2] = chars2;

    if (char1 == char2) {
      return levenshteinDistance(tail1, tail2);
    }

    return (
      1 +
      Math.min(
        levenshteinDistance(char1, tail2),
        levenshteinDistance(tail1, char2),
        levenshteinDistance(tail1, tail2),
      )
    );
  })(chars1, chars2);
}

console.log(diffAlt("bob", "rob")); // 1 (одна замена)
console.log(diffAlt("австрия", "австралия")); // 2 (два удаления)
