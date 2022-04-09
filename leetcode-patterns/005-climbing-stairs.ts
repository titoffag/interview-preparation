function climbStairs(n: number): number {
  if (n === 1) {
    return 1;
  }

  let n1 = 1, n2 = 2;

  // Dp[n] = Dp[n-1] + Dp[n-2]
  for (let i = 3; i <= n; i++) {
    [n1, n2] = [n2, n1 + n2];
  }

  return n2;
}
