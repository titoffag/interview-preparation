interface Tree<T> {
  value: T,
  children?: Tree<T>[],
}

function* iterateAlt<T>(obj: Tree<T>): Generator<T> {
  yield obj.value;

  if (obj?.children == null) {
    return;
  }

  for (const child of obj.children) {
    yield* iterateAlt(child);
  }
}

function iterate<T>(obj: Tree<T>): Iterator<T | undefined> {
  const queue = [obj];

  return {
    next() {
      while (queue.length) {
        const node = queue.shift();

        if (node?.children) {
          queue.push(...node.children);
        }

        console.log('queue', queue);

        return {
          done: false,
          value: node?.value,
        }
      }

      return {
        done: true,
        value: undefined,
      }
    }
  }
}

const i = iterate({
  value: 1,
  children: [{value: 2, children: [{value: 5}]}, {value: 3, children: [{value: 4}]}]
});

console.log(i.next()); // {value: 1, done: false}
console.log(i.next()); // {value: 2, done: false}
console.log(i.next()); // {value: 3, done: false}
console.log(i.next()); // {value: 4, done: false}
console.log(i.next()); // {value: undefined, done: true}
console.log(i.next()); // {value: undefined, done: true}
