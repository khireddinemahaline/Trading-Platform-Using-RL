// Listcoin.tsx
'use client'; // Ensures this component is a Client Component

import React from 'react';
import ToggleButtonAgent from './Button';

// Define CoinData type
type CoinData = {
  name: string;
  symbol: string;
  price?: number;
  change?: number;
  preferred?: boolean;
  marketCap?: number;
};

// Sample coin data
const coinData: CoinData[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 59000,
    change: 0.05,
    preferred: true,
    marketCap: 1100000000000,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2000,
    change: -0.02,
    preferred: true,
    marketCap: 500000000000,
  },
  {
    name: 'Ripple',
    symbol: 'XRP',
    price: 1.5,
    change: 0.03,
    preferred: false,
    marketCap: 70000000000,
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    price: 300,
    change: -0.01,
    preferred: false,
    marketCap: 20000000000,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.2,
    change: 0.01,
    preferred: false,
    marketCap: 40000000000,
  },
];

// Format market capitalization
const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value}`;
};

// Main component
const Listcoin: React.FC = () => {
  // Handle agent start
  const handleStartAgent = (coin: CoinData) => {
    alert(`Starting agent for ${coin.name}`);
  };

  // Handle agent stop
  const handleStopAgent = (coin: CoinData) => {
    alert(`Stopping agent for ${coin.name}`);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h1 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h1>
      <p className="text-gray-600 mb-4">
        Here are the top cryptocurrencies by market capitalization.
      </p>

      {/* Titles Row */}
      <div className="grid grid-cols-6 gap-4 font-bold bg-gray-100 p-2 rounded-md mb-2 text-center">
        <div>Symbol</div>
        <div>Price</div>
        <div>Market Cap</div>
        <div>24h</div>
        <div>Preferred</div>
        <div>RL Agent</div>
      </div>

      {/* Coin Rows */}
      <div className="flex flex-col gap-2">
        {coinData.map((coin) => (
          <div
            key={coin.symbol}
            className="grid grid-cols-6 gap-4 items-center border-b py-2 last:border-b-0 text-center"
          >
            {/* Symbol */}
            <div className="font-semibold text-primary-color">
              {coin.name} ({coin.symbol})
            </div>

            {/* Price */}
            <div className="text-secondary-color font-bold">
              ${coin.price?.toLocaleString() || 'N/A'}
            </div>

            {/* Market Cap */}
            <div className="text-gray-600">
              {coin.marketCap ? formatMarketCap(coin.marketCap) : 'N/A'}
            </div>

            {/* Change */}
            <div
              className={`font-medium ${
                coin.change && coin.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {coin.change != null ? (coin.change > 0 ? '+' : '') + coin.change.toFixed(2) + '%' : 'N/A'}
            </div>

            {/* Preferred */}
            <div>
              {coin.preferred ? (
                <span className="text-yellow-500 font-medium">⭐ Yes</span>
              ) : (
                <span className="text-gray-400">No</span>
              )}
            </div>

            {/* RL Agent Buttons */}
            <div className="flex gap-2 justify-center">
              <ToggleButtonAgent
                coin={coin} // Pass full coin data
                onStart={handleStartAgent} // Pass the onStart function
                onStop={handleStopAgent} // Pass the onStop function
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listcoin