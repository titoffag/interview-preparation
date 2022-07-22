Array.prototype.myMap = function(callback, ctx) {
  const result = [];

  this.forEach((item, idx) => {
    result.push(callback.call(ctx, item[i], idx, this));
  });

  return result;
}
