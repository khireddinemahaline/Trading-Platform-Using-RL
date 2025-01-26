// src/components/common/Card.tsx
import React from 'react';

// Define the types for the props
interface CardProps {
  title: string;
  value: string;
  description?: string; // Optional description field
}

const Card: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-card-background p-6 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-primary-color font-semibold mb-2">{title}</h2>
      <p className="text-secondary-color text-2xl font-bold">{value}</p>
      {description && <p className="text-gray-500 mt-2">{description}</p>}
    </div>
  );
};

export default Card;
