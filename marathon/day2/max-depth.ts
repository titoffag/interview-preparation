interface Tree<T> {
  value: T,
  children?: Tree<T>[],
}

const obj: Tree<string> = {
  value: 'foo',
  children: [
    {
      value: 'bar'
    },

    {
      value: 'bla',
      children: [{value: 'baz'}]
    }
  ]
};

function maxDepth<T>(tree: Tree<T>) {
  let maxDepthCount = 0;
  
  if (!tree || !tree?.children?.length) {
    return maxDepthCount;
  }
  
  for (const child of tree.children) {
    maxDepthCount = Math.max(maxDepthCount, maxDepth(child));
  }
  
  return maxDepthCount + 1;
}

console.log(maxDepth(obj)); // 2
