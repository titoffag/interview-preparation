// We'd like to have some kind of async-await functionality
// Can we do that with generators?
async(function* () {
  const response = yield fetch('https://my-lovely-server.com');
  const data = yield response.json();
  console.log(data);
});

// Of course we can
const async = generator => {
  const g = generator();
  (function next(value) {
    const n = g.next(value);
    if (n.done) return;
    n.value.then(next);
  }());
}
