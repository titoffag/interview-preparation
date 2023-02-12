function isPalindrome(str: string[]): boolean {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] != str[str.length - 1 - i]) {
      return false;
    }
  }

  return str.length > 1;
}

function findPalindromicSubstring(str: string): string | null {
  const chars = [...str];
  let max: string[] = [];

  for (let i = 0; i < chars.length / 2; i++) {
    if (max.length >= chars.length - i) {
      break;
    }

    for (let j = chars.length - 1; j > i; j--) {
      const current = chars.slice(i, j + 1);

      if (isPalindrome(current) && max.length < current.length) {
        max = current;
        break;
      }
    }
  }

  return max.join("") || null;
}

console.log(findPalindromicSubstring("adaabbabla")); // 'abba'
console.log(findPalindromicSubstring("blablur")); // null
