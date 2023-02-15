function getAnagram(str: string) {
  const chars = [...str];
  const result = new Set<string>();

  findAnagram();

  return Array.from(result);

  function findAnagram(from = 0) {
    if (from === chars.length - 1) {
      const current = chars.join('');

      if (current !== str) {
        result.add(current);
      }

      return;
    }

    for (let i = from; i < chars.length; i++) {
      findAnagram(from + 1);
      rotate(from);
    }
  }

  function rotate(from = 0) {
    if (from == chars.length - 1) {
      return;
    }

    chars.push(chars.splice(from, 1)[0]);
  }
}

console.log(getAnagram('cat')); // ['cta', 'atc', 'act', 'tca', 'tac']
