function countBits(n: number): number[] {
  const memo = [0];

  for (let i = 1; i < n + 1; i++) {
    memo[i] = memo[i >> 1] + (i % 2);
  }

  return memo;
}
