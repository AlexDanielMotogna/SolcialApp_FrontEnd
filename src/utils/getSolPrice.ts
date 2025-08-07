// Fetches the current price of Solana in USDT from CoinGecko

export async function getSolPrice(cryptoSymbol = 'solana'): Promise<number | null> {
    try {
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }

      const data = await response.json();
      return data.solana.usd;
    } catch (error) {
      console.error('Error fetching Solana price:', error);
      return null;
    }
}
