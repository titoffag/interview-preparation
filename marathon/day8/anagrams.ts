function getUniqueStrs(originalStrings: string[]) {
  // O (n * m log m) m < n, m ~ 3-4 chars, n - more bigger than m
  const canonicalStrings = originalStrings.map(string => [...string].sort().join(''));

  // O (n)
  const uniqueStrs = new Map<string, {string: string, count: number}>();
  for (const [index, canonicalString] of canonicalStrings.entries()) {
    if (uniqueStrs.has(canonicalString)) {
      uniqueStrs.get(canonicalString)!.count++;
    } else {
      uniqueStrs.set(canonicalString, {string: originalStrings[index], count: 1 });
    }
  }

  return Array.from(uniqueStrs.values()).filter(({count}) => count == 1).map(({string}) => string);
}

console.log(getUniqueStrs(['atoe', 'otea', 'ben', 'enb', 'baz', 'foo'])); // ['baz', 'foo']
