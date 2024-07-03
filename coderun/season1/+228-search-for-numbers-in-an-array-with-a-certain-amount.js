/** @returns Boolean */  
module.exports = function(nums, k) {  
    const seen = new Set();
    
    for (let num of nums) {
        if (seen.has(k - num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}
