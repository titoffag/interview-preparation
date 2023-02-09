const obj = {};

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);

// mutable operations
function setByPath<T>(obj: {}, path: string, value: T) {
  // ['foo','bar']
  const pathArray = path.split('.');
  // 2  
  const maxDepth = pathArray.length;
  
  (function dfs(nestedObj, depth = 1) {
    // foo // bar
    const prop = pathArray[depth - 1];
    // 1 != 2 // 2 == 2
    if (depth == maxDepth) {
      // obj['foo']['bar'] = 1      
      nestedObj[prop] = value; 
    } else {
      // obj['foo'] = {} or obj['foo'] = obj['foo']
      nestedObj[prop] = nestedObj[prop] ?? {};
      dfs(nestedObj[prop], ++depth);
    }
  })(obj);
}

console.log(obj); // {foo: {bar: 1, bla: 2}}
