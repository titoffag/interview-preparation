import { TreeNode } from "./000-tree-node";

function maxDepth(node: TreeNode | null): number {
    if (!node) {
        return 0;
    }
    
    const left = maxDepth(node.left);
    const right = maxDepth(node.right);
    
    return Math.max(left, right) + 1;
};
