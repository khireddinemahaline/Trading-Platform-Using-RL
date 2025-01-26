'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

// Define the types for the props
interface ToggleButtonAgentProps {
  coin: { name: string; symbol: string }; // Coin object with name and symbol
  onStart: (coin: { name: string; symbol: string }) => void; // Function to handle the start event
  onStop: (coin: { name: string; symbol: string }) => void; // Function to handle the stop event
}

const ToggleButtonAgent: React.FC<ToggleButtonAgentProps> = ({ coin, onStart, onStop }) => {
  const [isRunning, setIsRunning] = useState(false); // Track if the agent is running or stopped

  const handleClick = () => {
    if (isRunning) {
      onStop(coin); // Stop the agent if it's running
    } else {
      onStart(coin); // Start the agent if it's stopped
    }
    setIsRunning(!isRunning); // Toggle the running state
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition-colors', // Shared styles
        isRunning
          ? 'bg-red-500 hover:bg-red-600 text-white' // Red button if running
          : 'bg-blue-500 hover:bg-blue-600 text-white' // Blue button if stopped
      )}
    >
      {isRunning ? 'Stop' : 'Start'} {/* Display "Stop" or "Start" based on the running state */}
    </button>
  );
};

export default ToggleButtonAgent;
