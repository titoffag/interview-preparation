function throttle(func, wait) {
  let isThrottled = false,
    stashed = null;

  function wrapper() {
    if (isThrottled) {
      stashed = [this, arguments];
      return;
    }

    func.apply(this, arguments);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (stashed) {
        func.apply(...stashed);
        stashed = null;
      }
    }, wait);
  }

  return wrapper;
}

function throttleAlt(func, wait) {
  let timer = null, stashed = null;

  const startCooling = () => {
    timer = window.setTimeout(check, wait);
  };

  const check = () => {
    timer = null;
    if (stashed !== null) {
      func.apply(...stashed);
      stashed = null;
      startCooling();
    }
  };

  return function (...args) {
    if (timer !== null) {
      stashed = [this, args];
    } else {
      func.apply(this, args);
      startCooling();
    }
  }
}

function throttleAlt2(func, wait) {
  let timer = null, lastArgs = [];

  return function throttledFunc(...args) {
    // Initial case timer would be null, so this would get invoked
    if (timer === null) {
      // Call the underlying function, then setup the timer
      func.apply(this, args);
      timer = setTimeout(() => {
        // If there were throttled calls, run the function post timer
        // with saved arguments
        if (lastArgs.length) {
          func.apply(this, lastArgs);
        }

        // Back to initial condition
        timer = null;
        lastArgs = [];
      }, wait);
    } else {
      // Function is throttled, no call, just save the arguments and do nothing else.
      lastArgs = args;
    }
  }
}

const throttled = throttleAlt((v) => console.log(v), 1000);
throttled('a');
throttled('b');
throttled('c');