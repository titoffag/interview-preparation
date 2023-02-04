// Approach 1: Recursive DFS
const findCorrespondingNode = (rootA, rootB, target) => {
  if (rootA === target) {
    return rootB;
  }

  for (let i = 0; i < rootA.children.length; i++) {
    const res = findCorrespondingNode(rootA.children[i], rootB.children[i], target);

    if (res) {
      return res;
    }
  }
}

//Approach 2: Iterative DFS: Using stack
const findCorrespondingNodeAlt2 = (rootA, rootB, target) => {
  const stack = [[rootA, rootB]];

  while (stack.length) {
    const [leftNode, rightNode] = stack.pop();

    if (leftNode === target) {
      rightNode;
    }

    for (let i = 0; i < rootA.children.length; i++) {
      stack.push([leftNode.children[i], rightNode.children[i]]);
    }
  }
}

// Approach 3: Iterative BFS: Using Queue
const findCorrespondingNodeAlt3 = (rootA, rootB, target) => {
  if (rootA === target) {
    return rootB;
  }

  const queueA = [rootA];
  const queueB = [rootB];

  while (queueA.length) {
    const curElA = queueA.shift();
    const curElB = queueB.shift();

    if (curElA === target) {
      return curElB;
    }

    queueA.push(...curElA.children);
    queueB.push(...curElB.children);
  }
}

// Approach 4: Using DOM API
const findCorrespondingNodeAlt4 = (rootA, rootB, target) => {
  if (rootA === target) {
    return rootB;
  }

  let path = getRootPath(rootA, target);

  return path.reduceRight((curNode, curIdx) => {
    return curNode.children[curIdx];
  }, rootB);
}

function getRootPath(root, target) {
  let path = [];
  let node = target;

  while (node !== root && node.parentNode) {
    const children = Array.from(node.parentNode.children);
    path.push(children.indexOf(node));
    node = node.parentNode;
  }

  return path;
}

// Approach 5: Using Tree Walker API
const findCorrespondingNodeAlt5 = (rootA, rootB, target) => {
  const rootAWalker = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  const rootBWalker = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);

  let curNodes = [rootAWalker.currentNode, rootBWalker.currentNode];

  while (curNodes[0] !== target) {
    curNodes = [rootAWalker.nextNode(), rootBWalker.nextNode()];
  }

  return curNodes[1];
}
