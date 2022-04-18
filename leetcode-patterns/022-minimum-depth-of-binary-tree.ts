import { TreeNode } from "./000-tree-node";

function minDepth(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }
    
    let depth = 0;
    const q = [root];
    
    while (q.length) {
        let n = q.length;
        for (let i = 0; i < n; i++) {
            const node = q.shift();
            
            if (!node.left && !node.right) {
                return depth + 1;
            }
            
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }

        depth += 1;
    }
    
    return depth;
};
