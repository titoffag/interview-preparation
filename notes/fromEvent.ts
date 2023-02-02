Symbol.asyncIterator // Promise({done: false, value: e})
Symbol.iterator // {done: false, value: Promise(e)}

function on(el, event) {
  let cb;

  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  return {
    // [Symbol.iterator]() {
    //   return this;
    // },

    // next() {
    //   return {
    //     done: false,
    //     value: new Promise((resolve) => {
    //       cb = resolve;
    //     }),
    //   }
    // },

    [Symbol.asyncIterator]() {
      return this;
    },

    next() {
      return new Promise((resolve) => {
        cb = (arg) => {
          resolve({
            done: false,
            value: arg,
          });
        };
      });
    },
  }
}

async function* onAlt(el, event) {
  let cb;

  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  while(true) {
    yield new Promise((resolve) => {
      cb = resolve;
    });
  }
}

(async () => {
  // for (let e of on(document, 'click')) {
  //   e = await e;
  //   console.log(e);
  // }
  for await (const e of on(document, 'click')) {
    console.log(e);
  }
})();
