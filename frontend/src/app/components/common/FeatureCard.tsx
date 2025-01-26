import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Allows passing any React element as an icon
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-slate-800/50 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300">
      <div className="w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
