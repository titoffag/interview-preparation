function find(str, words) {
  const res = [];
  const canonicalStr = str.split('').sort().join('');
  const canonicalWords = words.map(word => word.split('').sort().join(''));
  
  let i = 0, j = 0, k = 0, count = 0, total = canonicalStr.length;
  while (j < canonicalWords.length) {
    if (canonicalStr[k] == canonicalWords[j][i]) {
      count++;
      k++;
    }
    i++;
    
    if (i == canonicalWords[j].length - 1) {
      j++;
    }
    
    if (count == total) {
      res.push(words[j]);
      count = 0;
      i = 0;
      k = 0;
      j++;
    }
  }
  
  return res;
}

console.log(find('kbza', [
  'kobezzza',
  'bob',
  'kibiza',
  'kobea'
])); // ['kobezzza', 'kibiza']
