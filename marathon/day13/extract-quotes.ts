function extractQuotes(str: string): string[] {
  return Array.from(str.matchAll(/(["'`])((?:\\\1|.)*?)\1/g)).map(([match]) => match);
}

console.log(extractQuotes('Это строка в "кавычках\'" и `"эта"` тоже, а это "хитрая строка\\""')); // ["кавычках'", '"эта"', 'хитрая строка\\"']
