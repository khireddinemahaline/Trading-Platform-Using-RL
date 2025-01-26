// src/components/layout/Main.tsx
import React from 'react';
import Card from './common/Cards';
import Listcoin from "@/app/components/common/Listcoin";


interface CardData {
  title: string;
  value: string;
  description?: string;
}

const cardData: CardData[] = [
  {
    title: 'My Balance',
    value: '$14,605,000',
    description: '+$4,605,000 P/L Inception-to-Date',
  },
  {
    title: 'Position Value',
    value: '$8,763,000',
  },
  {
    title: 'Investment Return',
    value: '46.05%',
  },
  {
    title: 'Portfolio Constituents',
    value: '32',
  },
  {
    title: 'Open Positions',
    value: '18',
    description: 'You have open positions in your portfolio.',
  },
];

const Main: React.FC = () => {
  return (
    <main className="flex-grow overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-2xl font-bold">Hi, Raymond</h1>
        <p className="mt-2 text-gray-600">
          Here is an overview of your trading activities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {/* Map through the cardData array and render each Card */}
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              value={card.value}
              description={card.description}
            />
          ))}
        </div>
        <Listcoin />
      </div>

    </main>

        
 
    
  );
};

export default Main;
