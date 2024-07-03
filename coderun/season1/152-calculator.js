const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const N = parseInt(line.trim());
  rl.close();

  if (N === 1) {
    console.log(0);
    console.log(1);
    return;
  }

  const dp = new Array(N + 1).fill(Infinity);
  const prev = new Array(N + 1).fill(-1);

  dp[1] = 0;

  for (let i = 1; i < N; i++) {
    if (i * 2 <= N && dp[i * 2] > dp[i] + 1) {
      dp[i * 2] = dp[i] + 1;
      prev[i * 2] = i;
    }
    if (i * 3 <= N && dp[i * 3] > dp[i] + 1) {
      dp[i * 3] = dp[i] + 1;
      prev[i * 3] = i;
    }
    if (i + 1 <= N && dp[i + 1] > dp[i] + 1) {
      dp[i + 1] = dp[i] + 1;
      prev[i + 1] = i;
    }
  }

  console.log(dp[N]);

  let sequence = [];
  for (let i = N; i !== -1; i = prev[i]) {
    sequence.push(i);
  }
  sequence.reverse();

  console.log(sequence.join(" "));
});
