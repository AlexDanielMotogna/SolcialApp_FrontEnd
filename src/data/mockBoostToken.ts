export interface BoostPrice {
  id: string;
  multiplier: string;
  duration: string;
  price: number;
  currency: string;
  popular?: boolean;
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  logo?: string;
}

export const BOOST_PRICES: BoostPrice[] = [
  {
    id: "1",
    multiplier: "10x",
    duration: "12 hours",
    price: 99,
    currency: "$",
    popular: false
  },
  {
    id: "2", 
    multiplier: "30x",
    duration: "12 hours",
    price: 249,
    currency: "$",
    popular: false
  },
  {
    id: "3",
    multiplier: "50x",
    duration: "12 hours",
    price: 399,
    currency: "$",
    popular: true
  },
  {
    id: "4",
    multiplier: "100x",
    duration: "24 hours",
    price: 899,
    currency: "$",
    popular: false
  },
  {
    id: "5",
    multiplier: "500x",
    duration: "24 hours",
    price: 3999,
    currency: "$",
    popular: false
  }
];

export const MOCK_TOKENS: TokenInfo[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "Solana Game Token",
    symbol: "SGT",
    price: 0.045,
    change24h: 12.5,
    marketCap: 4500000,
    volume24h: 1250000,
    logo: "/imgs/GameCoinLg.png"
  },
  {
    address: "0x0987654321098765432109876543210987654321", 
    name: "DeFi Protocol Token",
    symbol: "DFT",
    price: 1.25,
    change24h: -3.2,
    marketCap: 12500000,
    volume24h: 3200000,
    logo: "/imgs/CryptoCoin.png"
  },
  {
    address: "0x1122334455667788990011223344556677889900",
    name: "Meme Coin",
    symbol: "MEME",
    price: 0.000012,
    change24h: 45.8,
    marketCap: 2500000,
    volume24h: 890000,
    logo: "/imgs/DogeWifHat.png"
  }
];

export const BOOST_TOKEN = {
  prices: BOOST_PRICES,
  tokens: MOCK_TOKENS,
  trendingTokens: MOCK_TOKENS.slice(0, 2), // Les 2 premiers tokens comme trending
  featuredTokens: MOCK_TOKENS.slice(1, 3) // Les 2 derniers tokens comme featured
};