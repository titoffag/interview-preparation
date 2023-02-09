setTimeout(() => {
  console.log(3);
}, 0);

const setImmediateTimers = new Map();
function setImmediate(cb: Function) {
  const timer = setImmediateTimers.size;
  setImmediateTimers.set(timer, true);

  queueMicrotask(() => {
    if (!setImmediateTimers.get(timer)) {
      return;
    }
    cb();
  });

  return timer;
}
function clearImmediate(timer: number) {
  if (timer >= setImmediateTimers.size) {
    return;
  }

  setImmediateTimers.set(timer, false);
}

setImmediate(() => {
  console.log(1);
});

const timer = setImmediate(() => {
  console.log(2);
});

clearImmediate(timer);
