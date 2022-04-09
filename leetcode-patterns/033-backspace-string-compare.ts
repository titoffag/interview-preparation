function getCurrentIndex(s: string, i: number): number {
  let toSkip = 0;

  while (i >= 0) {
    if (s[i] === "#") {
      toSkip += 1;
    } else if (toSkip > 0) {
      toSkip -= 1;
    } else {
      break;
    }

    i -= 1;
  }

  return i;
}

function backspaceCompare(s: string, t: string): boolean {
  let i = s.length - 1;
  let j = t.length - 1;

  while (i >= 0 || j >= 0) {
    i = getCurrentIndex(s, i);
    j = getCurrentIndex(t, j);

    if (i < 0 && j < 0) {
      return true;
    }
    if (i < 0 || j < 0) {
      return false;
    }
    if (s[i] !== t[j]) {
      return false;
    }

    i -= 1;
    j -= 1;
  }

  return true;
}
