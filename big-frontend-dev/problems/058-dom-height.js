function getHeightRecursive(tree) {
  let maxRecursionDepth = 0;

  if (!tree) {
    return maxRecursionDepth;
  }

  for (const node of tree.children) {
    maxRecursionDepth = Math.max(maxRecursionDepth, getHeightRecursive(node));
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
