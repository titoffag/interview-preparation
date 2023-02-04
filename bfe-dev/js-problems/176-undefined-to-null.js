/**
 * @param {any} arg
 * @returns any
 */
function undefinedToNull(arg) {
  if (Array.isArray(arg)) {
    return arg.map(undefinedToNull);
  }

  if (Object.prototype.toString.call(arg) === '[object Object]') {
    return Object.keys(arg).reduce((res, key) => {
      res[key] = undefinedToNull(arg[key]);
      return res;
    }, {});
  }

  return arg === undefined ? null : arg;
}
