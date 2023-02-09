// TODO: TODO

function diff(str1: string, str2: string): number {
  let count = 0,
    iterator1 = str1[Symbol.iterator](),
    iterator2 = str2[Symbol.iterator](),
    cursor1 = iterator1.next(),
    cursor2 = iterator2.next();

  while (!cursor1.done || !cursor2.done) {
    console.log(cursor1, cursor2);
    if (cursor1.value != cursor2.value) {
      count++;
    }

    cursor1 = iterator1.next();
    cursor2 = iterator2.next();
  }

  return count;
}

console.log(diff('bob', 'rob'));           // 1 (одна замена)
console.log(diff('австрия', 'австралия')); // 2 (два удаления)
