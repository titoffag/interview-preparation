import { TreeNode } from "./000-tree-node";

function mergeTrees(node1: TreeNode | null, node2: TreeNode | null): TreeNode | null {
    if (!node1) {
        return node2;
    }
    if (!node2) {
        return node1;
    }
    
    node1.val += node2.val;
    
    node1.left = mergeTrees(node1.left, node2.left);
    node1.right = mergeTrees(node1.right, node2.right);
    
    return node1;
};
