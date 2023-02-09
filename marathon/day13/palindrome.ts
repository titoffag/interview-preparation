function isPalindrome(str: string): boolean {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] != str[str.length - 1 - i]) {
      return false;
    }
  }

  return str.length != 1;
}

console.log(isPalindrome('bob'));  // true
console.log(isPalindrome('abba')); // true
console.log(isPalindrome('a'));    // false
console.log(isPalindrome('azt'));  // false
