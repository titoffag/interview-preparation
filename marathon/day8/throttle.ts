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

function laugh() {
  console.log('Ha-ha!', this.a);
}

const throttledLaugh = throttle(laugh, 300);

const a = {
  a: 1,
  throttledLaugh,
}

a.throttledLaugh();
a.throttledLaugh();
a.throttledLaugh();
a.throttledLaugh();
a.throttledLaugh();
