import { TreeNode } from "000-tree-node";

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;
    
    function longestPath(node) {
        if (!node) {
            return 0;
        }
        
        const left = longestPath(node.left);
        const right = longestPath(node.right);
        diameter = Math.max(diameter, left + right);
        
        return Math.max(left, right) + 1;
    }
    
    longestPath(root);
    return diameter;
};
