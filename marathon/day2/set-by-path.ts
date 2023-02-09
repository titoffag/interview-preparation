const obj = {};

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);

// mutable operations
function setByPath<T>(target: Record<string, any>, path: string, value: T) {
  // ['foo','bar']
  const keys = path.split('.');
  // 2  
  const maxDepth = keys.length - 1;
  
  for (const [idx, key] of keys.entries()) {
    if (idx == maxDepth) {
      target[key] = value;
      return value;
    }

    target[key] ??= {};
    target = target[key];
  }
}

console.log(obj); // {foo: {bar: 1, bla: 2}}
