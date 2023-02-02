(?!) опережающая негативная проверка
(?=) опережающая положительная проверка
/(?<!#\d*)\d+/ - ретроспективная негативная проверка
/\${(.+?)}/g - ? выключить жадность 
(?:) незапоминающая группа
(?<content>) \k<content> groups.content $<content> именованная группа

string.search и string.match строку преобразует в Regexp напр символ . интерпретируется как символьная точка, т.е. любой символ

/^(\d+)*$/ тормозящая регулярка
/^(?=(\d+))\1*/ работащая регулярка

\d [0-9]
\D [^0-9]
\w [a-zA-Z0-9_]
\W [^a-zA-Z0-9_]
\s
\S
\b -> /(^|\W)\w+($|\W)/
\p{Letter} -> /\p{Letter}/u
. [^\n]
\n \t \r \v

regexp.exec(str) -> pseudo-iterator

var r = /\d/y; // sticky mode сваливать сразу при невхождение по регэкспу
var s = 'd123d456';

r.lastIndex = 1;

var res;
while (res = r.exec(s)) {
  console.log(res, r.lastIndex);
}

str.replace(regexp, replacer cb) //g must have been
str.matchAll(regexp) -> iterator //g must have been

regexp.lastIndex

regexp.global /\d/g
regexp.ignoreCase /[a-z]/i
regexp.multiline - string template

/u - emoji range
/p{Hex}

'"1" "2"'.replace(/"(.*?)"/g, '$1') -> '1 2'

'"foo" `bar`'.replace(/(['"`])(.*?)\1/g, '$2') -> "foo bar"

'aaabbbdcccef'.replace(/([a-z])\1+/g, '') -> 'def'
