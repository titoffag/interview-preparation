function serialize(root) {
  if (!root) {
    return '_';
  }

  return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}

function deserialize(str) {
  // const q = str.split(',');

  // function dfs(queue) {
  //   if (!queue.length) {
  //     return null;
  //   }
  //   const nodeStr = queue.shift();
  //   if (nodeStr != '_') {
  //     const node = new Node(nodeStr);
  //     node.left, node.right = dfs(q), dfs(q);
  //     return node;
  //   }
  // }

  // return dfs(q);

  const arr = str.split(',')
  return dfs();

  function dfs() {
    const val = arr.shift();

    if (val === '_') return null;

    const parent = new Node(val);

    parent.left = dfs();
    parent.right = dfs();

    return parent;
  }
}


// 2
function serialize(root) {
  const queue = [root],
    result = [];

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.value);
      queue.push(node.left, node.right);
    } else {
      result.push(null);
    }
  }

  return result.join();
}

function deserialize(str) {
  const arr = str.split(',');

  function buildTree(arr, index) {
    if (arr[index] == 'null') {
      return null;
    }

    const node = new Node(+arr[index]);
    node.left, node.right = buildTree(arr, index * 2 + 1), buildTree(arr, index * 2 + 2);
    return node;
  }

  return buildTree(arr, 0);
}
