function isLower(char: string | undefined): boolean {
  return typeof char == "string" && char == char.toLowerCase();
}

function isCaseable(char: string | undefined) {
  return !isLower(char) || char != char?.toUpperCase();
}

function dasherize(str: string): string {
  let result = "";
  const chars = [...str];

  for (const [idx, char] of chars.entries()) {
    const isFirst = idx == 0,
      isLast = idx == chars.length - 1;

    const nextChar = isLast ? undefined : chars[idx + 1];

    if (isLower(char)) {
      result += char;

      if (!isLower(nextChar) && !isLast) {
        result += "-";
      }
    } else {
      const canDash = !isFirst && !result.endsWith('-');

      if (canDash && isCaseable(nextChar) && isLower(nextChar)) {
        result += "-";
      }

      result += char.toLowerCase();

      if (canDash && !isCaseable(nextChar) && !isLast) {
        result += '-';
      }
    }
  }

  return result;
}

console.log(dasherize("createDocumentFragment")); // 'create-document-fragment'
console.log(dasherize("SuperMAN")); // 'super-man'
console.log(dasherize("VirtualDOMFragment")); // 'virtual-dom-fragment'
console.log(dasherize("Some123VALUE10")); // 'some123-value-10'
console.log(dasherize("Some123VALUE10bar")); // 'some123-value-10bar'
