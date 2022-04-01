// This is the type for the node
// type Node = null | {
//   value: number
//   left: Node
//   right: Node
// }


/**
 * @param {Node} node
 * @returns {Node}
 * bottom up, post order traversal, recursive
 * Time complexity: O(n), n = number of nodes
 * Space complexity: O(h), h = tree height
 */
function invert(node) {
  if(!node) return null;
  [node.left, node.right] = [invert(node.right), invert(node.left)];
  return node;
}

/**
 * @param {Node} node
 * @returns {Node}
 * Top down, level order traversal, iterative
 * Time complexity: O(n), n = number of nodes
 * Space complexity: O(n/2) ~= O(n)
 */

function invert(node) {
  if(!node) return null;
  const q = [node];
  while(q.length) {
    let curr = q.shift();
    [curr.left, curr.right] = [curr.right, curr.left];
    if(curr.left) q.push(curr.left);
    if(curr.right) q.push(curr.right);
  }
  return node;
}
