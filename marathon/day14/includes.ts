function includes(originString: string, searchString: string): boolean {
  let i = 0,
    j = 0;

  while (i < originString.length && j < searchString.length) {
    if (originString[i] === searchString[j]) {
      i++;
      j++;
    } else {
      i++;
      j = 0;
    }
  }

  return j == searchString.length;

  // return new RegExp(searchString).test(originString);
}

console.log(includes('hello bob!', 'bob'));  // true
console.log(includes('abba', 'aba'));        // false
