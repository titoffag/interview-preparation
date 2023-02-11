const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{value: 4}]
    },
    {
      value: 3
    }
  ]
};

type Tree = {
  value: unknown,
  children?: Tree[],
}

function log(tree: Tree) {
  const queue: Tree[] = [tree];

  while (queue.length) {
    const node = queue.shift();
    console.log(node?.value);
    if (node?.children) {
      queue.push(...node.children);
    }
  }
}

log(tree); // 1 2 3 4
