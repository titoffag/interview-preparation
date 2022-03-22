function generateParenthesis(n: number): string[] {
  const result = [];

  function generate(open, close, current) {
    if (open + close === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) {
      generate(open + 1, close, current + "(");
    }
    if (close < open) {
      generate(open, close + 1, current + ")");
    }
  }

  generate(0, 0, "");

  return result;
}

