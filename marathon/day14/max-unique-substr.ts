function maxUniqueSubstr(str: string): string {
  const chars = [...str];
  let maxSubstr: string[] = [chars[0] ?? ''];

  for (let i = 0; i < chars.length - 1; i++) {
    if (maxSubstr.length >= chars.length - i) {
      return maxSubstr.join('');
    }

    const uniqueChars = new Set<string>();

    for (let j = i; j < chars.length; j++) {
      const char = chars[j];

      if (uniqueChars.has(char)) {
        break;
      }

      uniqueChars.add(char);
    }

    if (maxSubstr.length < uniqueChars.size) {
      maxSubstr = [...uniqueChars];
    }
  }

  return maxSubstr.join('');
}

console.log(maxUniqueSubstr('aab'));      // ab
console.log(maxUniqueSubstr('abcabcbb')); // abc
console.log(maxUniqueSubstr('bbbbb'));    // b
console.log(maxUniqueSubstr('pwwkew'));   // wke
