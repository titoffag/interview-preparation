function createsAsyncSemaphore(cb: Function, ...flags: string[]) {
  const pendingFlags = new Set<string>(flags);
  let isInvoked = false;
  return function (this: unknown, flag?: string) {
    flag && pendingFlags.delete(flag);
    if (isInvoked || pendingFlags.size > 0) {
      return;
    }
    isInvoked = true;
    return cb.call(this);
  }
}

const semaphore = createsAsyncSemaphore(() => {
  console.log('Boom!');
}, 'foo', 'bar');

semaphore('foo');
semaphore('bar'); // 'Boom!'

// Эта функция не будет выполняться
semaphore();
