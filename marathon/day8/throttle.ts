function throttle(fn: Function, delay: number) {
  let isThrottled = false;

  return function throttled(...args: unknown[]) {
    if (isThrottled) {
      return;
    }

    fn(...args);
    isThrottled = true;
    setTimeout(() => isThrottled = false, delay);
  }
}

function laugh(a: number) {
  console.log('Ha-ha!', a);
}

const throttledLaugh = throttle(laugh, 300);

throttledLaugh(1);
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
