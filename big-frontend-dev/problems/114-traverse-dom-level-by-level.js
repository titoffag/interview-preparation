function flatten(root) {
  const result = [];
  if (!root) {
    return result;
  }
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (const child of node.children) {
      queue.push(child);
    }
  }
  return result;
}
