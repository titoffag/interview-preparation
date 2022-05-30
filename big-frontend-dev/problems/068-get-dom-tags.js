function getTags(tree) {
  const treeWalker = document.createTreeWalker(tree, NodeFilter.SHOW_ELEMENT);
  const uniqueTags = new Set();
  let { currentNode } = treeWalker;
  while (currentNode) {
    uniqueTags.add(currentNode.tagName.toLowerCase());
    currentNode = treeWalker.nextNode();
  }

  return Array.from(uniqueTags);
}
