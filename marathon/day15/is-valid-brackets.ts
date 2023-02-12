function isValid(str: string): boolean {
  const closedOpenBracketsMap = new Map([
      ["}", "{"],
      ["]", "["],
      [")", "("],
    ]),
    openBrackets = new Set(["{", "[", "("]);

  const chars = [...str],
    stackOpenBrackets: string[] = [];

  for (const char of chars) {
    if (openBrackets.has(char)) {
      stackOpenBrackets.push(char);
    }

    if (
      closedOpenBracketsMap.has(char) &&
      closedOpenBracketsMap.get(char) != stackOpenBrackets.pop()
    ) {
      return false;
    }
  }

  return stackOpenBrackets.length == 0;
}

console.log(isValid("(hello{world} and [me])")); // true
console.log(isValid("(hello{world)} and [me])")); // false
console.log(isValid("({}{)}")); // false
