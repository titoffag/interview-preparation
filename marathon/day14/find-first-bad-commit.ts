function findFirstBadCommit(commits: string[], comparator: (message: string) => boolean): number {
  let left = 0,
    right = commits.length - 1;

  while (left <= right) {
    // Math.floor((right - left) / 2) + left
    const middle = Math.floor((left + right) / 2);

    if (comparator(commits[middle])) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return left;
}

const commits = ['good', 'good', 'good', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad'];

const test = (commit: string) => commit === 'good';

console.log(findFirstBadCommit(commits, test)); // 3
