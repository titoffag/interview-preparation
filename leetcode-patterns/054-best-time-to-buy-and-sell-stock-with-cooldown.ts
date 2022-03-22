function maxProfit(prices: number[]): number {
  let buy = -Infinity,
    sell = 0,
    cooldown = 0;

  for (const price of prices) {
    const next_buy = Math.max(buy, cooldown - price);
    const next_sell = buy + price;
    cooldown = Math.max(sell, cooldown);

    buy = next_buy;
    sell = next_sell;
  }

  return Math.max(sell, cooldown);
};
