function zipStr(str: string): string {
  let res = str;

  while (true) {
    let zippedStr = res.replace(/(.+)\1+/g, '$1');

    if (zippedStr === str) {
      return res;
    }

    res = zippedStr;
  }
}

console.log(zipStr('abbaabbafffbezza')); // abafbeza
