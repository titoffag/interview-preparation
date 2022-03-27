import { TreeNode } from "./000-tree-node";

function averageOfLevels(root: TreeNode | null): number[] {
    const q = [root];
    const result = [];
    
    while (q.length) {
        const n = q.length;
        let levelSum = 0;
        
        for (let i = 0; i < n; i++) {
            const node = q.shift();
            levelSum += node.val;
            
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }
        result.push(levelSum / n);
    }
    
    return result;
};
