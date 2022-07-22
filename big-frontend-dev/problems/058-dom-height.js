function getHeightRecursive(tree) {
  let maxRecursionDepth = 0;

  if (!tree) {
    return maxRecursionDepth;
  }

  for (let i = 0; i < tree.children.length; i++) {
    maxRecursionDepth = Math.max(maxRecursionDepth, getHeightRecursive(tree.children[i]));
  }

  return ++maxRecursionDepth;
}

function getHeightIterative(tree) {
  let height = 0;
  if (!tree) {
    return height;
  }

  const queue = [tree];
  while (queue.length) {
    height++;
    for (let i = 0; i < queue.length; i++) {
      const node = queue.shift();
      queue.push(...Array.from(node.children));
    }
  }

  return height;
}
