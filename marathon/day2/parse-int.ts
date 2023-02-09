type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

// 2..36
type Radix = IntRange<2, 37>;

const alphabet = new Map<string, number>();

for(let i = '0'.codePointAt(0)!, j = 0; i <= '9'.codePointAt(0)!; i++, j++) {
  alphabet.set(String.fromCharCode(i), j);
}
for(let i = 'A'.codePointAt(0)!, j = 10; i <= 'Z'.codePointAt(0)!; i++, j++) {
  alphabet.set(String.fromCharCode(i), j);
}

function parseSymbol(char: string, radix: Radix): number {
  if (radix >= alphabet.size || radix < 2) {
    throw new TypeError(`${radix} should be from 2 to ${alphabet.size}`);
  }

  const value = alphabet.get(char.toUpperCase());

  if (value == null || value >= radix) {
    return NaN;
  }

  return value;
}

function myParseInt(str: string, radix: Radix = 10): number {
  const symbols: number[] = [];
  let sign = 1;

  for (const [idx, char] of [...str].entries()) {
    if (char == '-') {
      if (idx == 0) {
        sign = -1;
      } else {
        // exit
        break;
      }
    } else {
      const value = parseSymbol(char, radix);

      if (Number.isNaN(value)) {
        // exit
        break;
      } else {
        symbols.push(value);
      }
    }
  }

  if (symbols.length == 0) {
    // error
    return NaN;
  }

  return sign * symbols.reverse().reduce((result, value, pos) => result += value * (radix ** pos), 0);
}

console.log(myParseInt('10'));      // 10
console.log(myParseInt('-10', 2));  // -2
console.log(myParseInt('FFP', 16)); // 255
console.log(myParseInt('--20'));    // NaN
