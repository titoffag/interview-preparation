type State = 'int' | 'exp' | 'expValue' | 'dec' | null;
type Int = string;
type Dec = string;
type Exp = string;

function myParseFloat(str: string): number {
  let state: State = null,
    sign = 1,
    expSign = 1;
  const chunks: [Int?, Dec?, Exp?] = [];

  parsing: for (const char of str) {
    switch (char) {
      case '-':
        if (state == null) {
          state = 'int';
          sign = -1;
          continue;
        }

        if (state == 'exp') {
          state = 'expValue';
          expSign = -1;
          continue;
        }

        break parsing;

      case 'e':
      case 'E':
        if (state == 'int' || state == 'dec') {
          state = 'exp';
          continue;
        }

        break parsing;

      case '.':
        if (state == null || state == 'int') {
          state = 'dec';
          continue;
        }

        break parsing;
    
      default:
        if (/\D/.test(char)) {
          break parsing;
        }

        switch (state) {
          case null:
          case 'int':
            state = 'int';

            if (chunks.length == 0) {
              chunks.push('');
            }

            chunks[0] += char;
            break;

          case 'dec':
            while (chunks.length < 2) {
              chunks.push('');
            }

            chunks[1] += char;
            break;

          case 'exp':
          case 'expValue':
            state = 'expValue';

            while (chunks.length < 3) {
              chunks.push('');
            }

            chunks[2] += char;
            break;
        }

        break;
    }
  }

  if (chunks.length == 0) {
    return NaN;
  }

  return sign * chunks.reduce((res: number, el: Int | Dec | Exp | undefined, i: number) => {
    const num = parseInt(el!) || 0;

    switch (i) {
      case 0:
        // целая часть
        return num;
      case 1:
        // дробная часть
        return res + num * (10 ** -el!.length);
      case 2:
        // экспонента
        return res * 10 ** (num * expSign);
      default:
        return res;
    }
  }, 0);
}

console.log(myParseFloat('10'));      // 10
console.log(myParseFloat('-10.2'));   // -10.2
console.log(myParseFloat('6e-2'));    // 0.06
console.log(myParseFloat('--20'));    // NaN
