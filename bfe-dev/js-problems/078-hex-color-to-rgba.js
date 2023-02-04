function normalize(hex) {
  const digits = hex.toLowerCase().slice(1);

  switch (digits.length) {
    // #fff -> #ff ff ff ff
    case 3: {
      return [...digits].map(item => item.repeat(2)).join('') + 'ff';
    }
    // #fff0 -> #ff ff ff 00
    case 4: {
      return [...digits].map(item => item.repeat(2)).join('')
    }
    // #ffffff -> #ff ff ff ff
    case 6: {
      return digits + 'ff'
    }
    default: {
      return digits;
    }
  }
}

/**
 * @param {string} hex
 * @return {string}
 */
function hexToRgba(hex) {
  if (!/^#[a-fA-F\d]+$/.test(hex) || ![4, 5, 7, 9].includes(hex.length)) {
    throw new Error('hex color is invalid');
  }

  const normalizedHex = normalize(hex);

  const [red, green, blue, alpha = 255] = normalizedHex
    .match(/([0-9a-f]{2})/g)
    .map((hex) => parseInt(hex, 16));

  return `rgba(${red},${green},${blue},${Math.round(alpha / 255 * 100) / 100})`;
}
