function throttle(fn: Function, delay: number) {
  let isThrottled = false, lastArgs: unknown[] = [];

  return function throttled(this: unknown, ...args: unknown[]) {
    lastArgs = args;
    if (isThrottled) {
      return;
    }

    fn.call(this, ...args);
    isThrottled = true;
    setTimeout(() =>  {
      isThrottled = false;

      if (lastArgs != args) {
        throttled.call(this, ...lastArgs);
      }
    }, delay);
  }
}

function laugh(this: {a: string}, b: number) {
  console.log('Ha-ha!', this.a, b);
}

const throttledLaugh = throttle(laugh, 300);

const a = {
  a: '1',
  throttledLaugh,
}

a.throttledLaugh(1);
a.throttledLaugh(2);
a.throttledLaugh(3);
setTimeout(() => a.throttledLaugh(4), 500);
a.throttledLaugh(5);
a.throttledLaugh(6);
