function maxProfit(prices: number[]): number {
    let maxProfit = 0,
        currentMin = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        let price = prices[i];
        
        maxProfit = Math.max(maxProfit, price - currentMin);
        currentMin = Math.min(currentMin, price);
    }
    
    
    return maxProfit;
};
