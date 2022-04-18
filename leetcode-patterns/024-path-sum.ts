import { TreeNode } from "./000-tree-node";

function hasPathSum(node: TreeNode | null, target: number): boolean {
    if (!node) {
        return false;
    }
    
    target -= node.val
    
    if (!node.left && !node.right) {
        return target === 0;
    }
    
    return hasPathSum(node.left, target) || hasPathSum(node.right, target);
};
