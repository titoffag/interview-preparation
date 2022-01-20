function throttle(func, wait, option = { leading: true, trailing: true }) {
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
      if (option.trailing) {
        stashed = [this, args];
      }
      return;
    }

    if (option.leading) {
      func.apply(this, args);
      startCooling();
      return;
    }

    if (option.trailing) {
      stashed = [this, args];
      startCooling();
    }
  }
}