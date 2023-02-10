function find(substr: string, strs: string[]): string[] {
  function isFuzzySubstr(substr: string, str: string) {
    return ~str.search(new RegExp(substr.split('').join('(.*)')));
  }
  
  return strs
    .filter(str => isFuzzySubstr(substr, str))
}

console.log(find('kbza', [
  'kobezzza',
  'bob',
  'kibiza',
  'kobea'
])); // ['kobezzza', 'kibiza']
