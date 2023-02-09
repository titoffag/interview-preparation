function promisify(cb: Function): Function {
  return function<T>(...args: T[]) {
    return new Promise((resolve, reject) => {
      if (args.length != cb.length - 1) {
        throw new Error(`Function is called with args: ${args.join(', ')}`);
      }

      cb(
        ...args, 
        (err: Error, result: T) => err != null
          ? reject(`${err.name}('${err.message}')`)
          : resolve(result),
      );
    });
  }
}

function cbDiv(a: number, b: number, cb: (error: Error | null, arg?: number) => void) {
  if (b === 0) {
    cb(new TypeError('Нельзя делить на 0'));
  
  } else {
    cb(null, a / b);
  }
}

const promiseDiv = promisify(cbDiv);

promiseDiv(1, 2).then(console.log);  // 0.5
promiseDiv(1, 0).catch(console.log); // TypeError('Нельзя делить на 0')
