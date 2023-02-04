function getUniqueStrs(originalStrings: string[]) {
  // O (n * m log m) m < n, m ~ 3-4 chars, n - more bigger than m
  const canonicalStrings = originalStrings.map(string => string.split('').sort().join(''));

  // O (n)
  const uniqueStrsWithIdx = new Map<string, number>();
  for (const [index, string] of canonicalStrings.entries()) {
    uniqueStrsWithIdx.has(string) 
      ? uniqueStrsWithIdx.delete(string)
      : uniqueStrsWithIdx.set(string, index);
  }

  // O (k), k - count of unique strings
  const result: string[] = [];
  for(const idx of uniqueStrsWithIdx.values()) {
    result.push(originalStrings[idx]);
  }

  return result;
}

console.log(getUniqueStrs(['atoe', 'otea', 'ben', 'enb', 'baz', 'foo'])); // ['baz', 'foo']
