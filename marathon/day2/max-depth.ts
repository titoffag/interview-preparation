const obj = {
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

function maxDepth(tree) {
  let maxDepthCount = 0;
  
  if (!tree) {
    return maxDepthCount;
  }
  
  const queue = [tree];
  while(queue.length) {
    for (let i = 0; i < queue.length; i++) {
      const node = queue.shift();
      if (node.children) {
        maxDepthCount++;
        queue.push(...node.children);
      }
    }
  }
  
  return maxDepthCount;
}


function maxDepthAlt(tree) {
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
