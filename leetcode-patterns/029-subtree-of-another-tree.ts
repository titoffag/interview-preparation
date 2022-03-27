import { TreeNode } from "000-tree-node";

function isSameTree(p: TreeNode | null, q:TreeNode | null) {
    if (!p && !q) {
        return true;
    }
    if (!p || !q) {
        return false;
    }
    if (p.val !== q.val) {
        return false;
    }
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (!root) {
        return false;
    }
    
    if (isSameTree(root, subRoot)) {
        return true;
    }
    
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};
