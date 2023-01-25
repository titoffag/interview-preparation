function Tree(value, left, right) {
  return {
    value,
    left,
    right,

    // generator
    *[Symbol.iterator]() {
      yield this.value;

      if (this.left != null) {
        // for (const el of this.left) {
        //   yield el;
        // }
        yield* this.left;
      }

      if (this.right != null) {
        for (const el of this.right) {
          yield el;
        }
      }
    },

    // babel transpile generator to iterator w/ state machine
    [Symbol.iterator]() {
      let state = 0,
        cursor;

      return {
        [Symbol.iterator]() {
          return this;
        },

        next: () => {
          // central node
          if (state === 0) {
            state++;

            return {
              value: this.value,
              done: false,
            };
          }

          // left subtree
          if (state === 1) {
            if (this.left == null) {
              state++;
            } else {
              cursor = cursor || this.left[Symbol.iterator]();

              const res = cursor.next();

              if (res.done) {
                cursor = null;
                state++;
              } else {
                return res;
              }
            }
          }

          // right subtree
          if (state === 2) {
            if (this.right == null) {
              state++;
            } else {
              cursor = cursor || this.right[Symbol.iterator]();

              return cursor.next();
            }
          }

          return { value: undefined, done: true };
        },
      };
    },
  };
}

function iter(iterable, fn) {
  for (const el of iterable) {
    fn(el);
  }
}

iter(
  take(
    filter([1, 2, 3, 4, 5], (_, i) => i % 2 === 0),
    5
  ),
  console.log,
);

function* filter(iterable, fn) {
  for (const el of iterable) {
    if (fn(el)) {
      yield el;
    }
  }
}

function* take(iterable, n) {
  if (n <= 0) {
    return;
  }

  for (const el of iterable) {
    yield el;
    n--;

    if (n <= 0) {
      return;
    }
  }
}
