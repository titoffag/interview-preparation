function sumExcept(a, i, n) {
  // Ensure the array contains only integers, replacing non-integer values with 0
  a = a.map((x) => (Number.isInteger(x) ? x : 0));

  // Ensure the starting index is a non-negative integer
  if (!Number.isInteger(i) || i < 0) {
    i = 0;
  }

  // Ensure the number of elements to skip is a non-negative integer
  if (!Number.isInteger(n) || n < 0) {
    n = 0;
  }

  // Calculate the sum excluding the specified elements
  let sum = 0;
  for (let idx = 0; idx < a.length; idx++) {
    if (idx < i || idx >= i + n) {
      sum += a[idx];
    }
  }

  return sum;
}

module.exports = sumExcept;
