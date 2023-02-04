// function find(str, words) {
//   const res = [];
//   const canonicalStr = str.split('').sort().join('');
//   const canonicalWords = words.map(word => word.split('').sort().join(''));
  
//   let i = 0, j = 0, k = 0, count = 0, total = canonicalStr.length;
//   console.log(total, canonicalStr, canonicalWords);

//   while (j < canonicalWords.length) {
//     console.log(i, j, k, count, canonicalStr[i], canonicalWords[j][k]);
//     if (canonicalStr[i] == canonicalWords[j][k]) {
//       count++;
//       // идем указателем по искомому слову
//       i++;
//     }

//     // идем указателем по символам из массива
//     k++;
    
//     // нашли подходящее - пушим исходный вариант слова
//     if (count == total) {
//       res.push(words[j]);
//       count = 0;
//       i = 0;
//       k = 0;
//       j++;
//       console.log('---');
//       // иначе если обошли слово - берем следующее
//     } else if (k >= canonicalWords[j].length) {
//       count = 0;
//       i = 0;
//       k = 0;
//       j++;
//       console.log('---');
//     }
//   }
  
//   return res;
// }

function isFuzzySubstr(substr, str) {
  const regExp = new RegExp(substr.split('').join('(.*)'));
  console.log(regExp);
  return str.search(regExp) !== -1;
}

function find(substr, strs) {
  return strs
    .filter(str => isFuzzySubstr(substr, str))
}

console.log(find('kbza', [
  'kobezzza',
  'bob',
  'kibiza',
  'kobea',
])); // ['kobezzza', 'kibiza']