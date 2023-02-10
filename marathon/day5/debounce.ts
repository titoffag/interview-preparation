function debounce(fn: Function, delay: number) {
  let timer: any;

  return function debounced(this: unknown, ...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.call(this, ...args);
      clearTimeout(timer);
    }, delay);
  }
}

function laugh(this: {a: string}, b: number) {
  console.log('Ha-ha!', this.a, b);
}

const debouncedLaugh = debounce(laugh, 300);

const obj = {
  a: '1',
  debouncedLaugh,
}

obj.debouncedLaugh(1);
obj.debouncedLaugh(2);
obj.debouncedLaugh(3);
setTimeout(() => obj.debouncedLaugh(4), 500);
obj.debouncedLaugh(5);
obj.debouncedLaugh(6);
