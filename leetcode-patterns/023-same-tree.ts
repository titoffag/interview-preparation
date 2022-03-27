import { TreeNode } from "000-tree-node";

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    const queue = [p, q];
    
    while (queue.length) {
        const p = queue.shift();
        const q = queue.shift();
        
        if (!p && !q) {
            continue;
        }
        
        if (!p || !q) {
            return false;
        }
        
        if (p.val !== q.val) {
            return false;
        }
        
        queue.push(p.left);
        queue.push(q.left);
        queue.push(p.right);
        queue.push(q.right);
    }
    
    return true;
};
