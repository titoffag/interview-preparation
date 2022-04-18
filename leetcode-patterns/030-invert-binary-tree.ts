import { TreeNode } from "./000-tree-node";

function invertTree(node: TreeNode | null): TreeNode | null {
    if (!node) {
        return null;
    }
    
    [node.left, node.right] = [invertTree(node.right), invertTree(node.left)];
    
    return node;
};
