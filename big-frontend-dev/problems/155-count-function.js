const count = (function () {
  let _counter = 0;

  function count() {
    return ++_counter;
  }

  count.reset = function () {
    _counter = 0;
  }

  return count;
})();
