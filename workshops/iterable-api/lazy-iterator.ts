class Iter<T> {
  iter: Iterable<T>;

  constructor(iter: Iterable<T>) {
    this.iter = iter;
  }

  *[Symbol.iterator]() {
    yield* this.iter;
  }

  *filter(pred: (el: T) => boolean) {
    const {iter} = this;

    const newIter = (function* () {
      for (const el of iter) {
        if (pred(el)) {
          yield el;
        }
      }
    })();

    return new Iter<T>(newIter);
  }

  *map(fn: Function) {
    const {iter} = this;

    const newIter = (function* () {
      for (const el of iter) {
        yield fn(el);
      }
    })();

    return new Iter<T>(newIter);
  }

  *take(n: number) {
    const {iter} = this;

    const newIter = (function* () {
      if (n <= 0) {
        return;
      }
  
      for (const el of iter) {
        yield el;
        n--;
  
        if (n <= 0) {
          return;
        }
      }
    })();

    return new Iter<T>(newIter);
  }

  *enumerate() {
    const {iter} = this;

    const newIter = (function* () {
      let i = 0;

      for (const el of iter) {
        yield [i, el];
        i++;
      }
    })();

    return new Iter(newIter);
  }
}

const iter = new Iter<number>([1, 2, 3]);

for (const [i, el] of iter.filter(el => el > 2).map(el => el * 2).take(3).enumerate()) {
  console.log(i, el);
}
