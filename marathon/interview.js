function test(s, t) {
  let i = 0,
    j = 0,
    cor = 0;

  while (i < s.length || j < t.length) {
    if (s[i] != t[j]) {
      cor++;
      if (s[i + 1] == t[j]) {
        j++; // уд
      } else if (s[i] == t[j + 1]) {
        i++; // доб
      } else {
        i++;
        j++;
      }
    } else {
      i++;
      j++;
    }

    if (cor > 1) {
      return false;
    }
  }

  return true;
}

// 1.

/*
Дан массив строк, нужно сгруппировать в нем анаграммы.
Важно, что это нужно сделать максимально эффективно по памяти и времени.
Слово X является анаграммой слова Y, если оно может быть 
получено из другого перестановкой букв.
*/

groupAnagrams(['сон', 'нос', 'сорт', 'трос', 'торт', 'рост']);
// возвращает
/*
[
  ['сон', 'нос'],
  ['сорт', 'трос', 'рост'],
  ['торт']
]
*/

function groupAnagrams(list) {
  const map = new Map();

  for (const item of list) {
    const canonical = item.split('').sort().join();
    if (!map.has(canonical)) {
      map.set(canonical, []);
    } else {
      map.get(canonical).push(item);
    }
  }

  return Array.from(map.values());
}

{
  '???': ['xy', 'yx'], // 
    '???': ['xxx'],
      '???': ['xyx', 'yxx'] // 'yxx', 'xxy' -> xxy
}


['xxx', 'xyx', 'xxy', 'yyx']

if (map[word.length]['x'] == )


  // 2.

  /**
   * flatten.
   * 
   * Дан массив, в котором могут храниться любые типы данных.
   * Нужно реализовать функцию, которая разворачивает вложенные массивы в исходный массив. 
   * Данные остальных типов должны остаться без изменений.
   * Решение должно учитывать любую вложенность элементов (т.е. не должно содержать рекурсивные вызовы).
   * Встроенный метод Array.flat() использовать нельзя
   */

  flatten([1, 'any [complex] string', null, function () { }, [1, 2, [3, '4'], 0], [], { a: 1 }]);
// возвращает
//      [1, 'any [complex] string', null, function() {}, 1, 2, 3, '4', 0, { a: 1 }]
flatten([0, [1, [2, 3]], 4]); // [0, 1, 2, 3, 4]
flatten([[1, 5]]); // [1, 5]

// pop/push

/*
list = [1, [2, 3]]
res = []
stack = []

i = 
stack = [[2,3],1]


*/

function flatten(list) {
  const res = [];
  const stack = [list];

  while (stack.length) {
    const item = stack.pop();
    if (!Array.isArray(item)) {
      res.push(item);
    } else {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    }
  }

  return res;
}

// 3.

/*
У нас есть набор билетов вида:

[
    { from: 'London', to: 'Moscow' },
    { from: 'NY', to: 'London' },
    { from: 'Moscow', to: 'SPb' },
    ...
]

Из этих билетов можно построить единственный, неразрывный маршрут.
Петель и повторов в маршруте нет.

Нужно написать программу, которая возвращает билеты 
в порядке следования по маршруту.
*/

function getRoute(tickets = []) {
  // const fromMap = new Map();
  let i = 0;
  let j = 1;
  let startPoint = '',
    endPoint = '';

  // while (i < tickets.length) {
  //     const { from, to } = tickets[i];
  //     if (from != tickets[j].to) {
  //         j++;
  //     } else {
  //         startPoint = from;
  //         i++;
  //     }
  //     if (to != tickets[j].from) {
  //         j++;
  //     } else {
  //         endPoint = to;
  //         i++;
  //     }
  // }
}





