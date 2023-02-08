const ee = new EventEmitter();

(async () => {
  for await (const e of stream(ee, 'foo')) {
    console.log(e); // 1 2 3
  }
})();

ee.emit('foo', 1);
ee.emit('foo', 2);
ee.emit('foo', 3);
