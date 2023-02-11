type ErrorFirstCb = (err: Error | null, ...args: unknown[]) => void;

function waterfall(
  iterable: Iterable<Function>,
  finisher: ErrorFirstCb,
) {
  const iterator = iterable[Symbol.iterator]();

  let args: unknown[] = [];
  (function next() {
    const step = iterator.next();

    if (step.done) {
      return finisher(null, ...args);
    }

    const nextCb: ErrorFirstCb = (err, ...nextArgs) => {
      if (err != null) {
        return finisher(err);
      }

      args = nextArgs;
      next();
    };
    step.value(...args, nextCb);
  })();
}

waterfall(
  [
    (cb: ErrorFirstCb) => {
      cb(null, "one", "two");
    },

    (arg1: string, arg2: string, cb: ErrorFirstCb) => {
      console.log(arg1, arg2); // one two
      cb(null, "three");
    },

    (arg1: string, cb: ErrorFirstCb) => {
      console.log(arg1); // three
      cb(null, "done", arg1);
    },
  ],
  (err, ...result) => {
    console.log(...result); // done
  }
);

waterfall(
  new Set([
    (cb: ErrorFirstCb) => {
      cb(new Error("ha-ha!"));
    },

    (arg1: unknown, cb: ErrorFirstCb) => {
      cb(null, "done");
    },
  ]),
  (err, result) => {
    console.log(err?.message); // ha-ha!
    console.log(result); // undefined
  }
);
