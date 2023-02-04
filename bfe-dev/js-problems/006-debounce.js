function debounce(func, wait) {
  let timer;
  return function debounced() {
    // or ...args as arguments of debounced function     
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), wait);
    // or just pass func.bind(this, args) to setTimeout as first argument     
  }
}
