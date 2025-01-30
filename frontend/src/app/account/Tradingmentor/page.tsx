// src/pages/Traidingmentor.tsx

import React from 'react';

// Define the type for a trade object
interface Trade {
  symbol: string;
  position: string;
  entryPrice: string;
  currentPrice: string;
  pnl: string;
  status: string;
}

// Define the trades array with the correct types
const trades: Trade[] = [
  {
    symbol: 'AAPL',
    position: 'Long',
    entryPrice: '$175.50',
    currentPrice: '$180.25',
    pnl: '+$4,500 (2.56%)',
    status: 'Active',
  },
  {
    symbol: 'GOOGL',
    position: 'Short',
    entryPrice: '$120.75',
    currentPrice: '$118.90',
    pnl: '+$1,850 (1.53%)',
    status: 'Active',
  },
  {
    symbol: 'MSFT',
    position: 'Pending',
    entryPrice: 'N/A',
    currentPrice: '$330.20',
    pnl: 'N/A',
    status: 'Pending',
  },
];

const Traidingmentor: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="bg-white p-6 rounded-lg flex-grow overflow-auto">
        <h1 className="text-2xl font-semibold text-gray-800">
          Trading Monitor
        </h1>
        <p className="text-gray-600">
          Real-time overview of current trading activities
        </p>

        <div className="overflow-x-auto mt-6">
          <table className="w-[80%] table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">Symbol</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Entry Price</th>
                <th className="px-4 py-2 text-left">Current Price</th>
                <th className="px-4 py-2 text-left">P/L</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{trade.symbol}</td>
                  <td className="px-4 py-2">{trade.position}</td>
                  <td className="px-4 py-2">{trade.entryPrice}</td>
                  <td className="px-4 py-2">{trade.currentPrice}</td>
                  <td className="px-4 py-2">{trade.pnl}</td>
                  <td
                    className={`px-4 py-2 ${trade.status === 'Active' ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}`}
                  >
                    {trade.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Traidingmentor;
