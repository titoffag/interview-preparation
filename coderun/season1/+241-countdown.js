function createCountdown(n) {
  // Ensure n is a non-negative integer
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) {
    n = 0;
  }

  let count = n;

  return function () {
    if (count > 0) {
      return count--;
    } else {
      return 0;
    }
  };
}

module.exports = createCountdown;
