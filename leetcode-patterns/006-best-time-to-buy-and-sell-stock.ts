function maxProfit(prices: number[]): number {
    let maxProfit = 0,
        currentMin = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
        const price = prices[i];
        
        maxProfit = Math.max(maxProfit, price - currentMin);
        currentMin = Math.min(currentMin, price);
    }
    
    
    return maxProfit;
};

function maxProfit2(prices: number[]): number {
    let buy = -Infinity,
        sell = 0;
    
    for (const price of prices) {
        const next_buy = Math.max(buy, sell - price);
        const next_sell = Math.max(sell, buy + price);
        
        buy = next_buy;
        sell = next_sell;
    }
    
    return sell;
};
