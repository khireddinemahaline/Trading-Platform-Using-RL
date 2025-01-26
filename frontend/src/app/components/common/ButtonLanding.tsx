'use client'; // For Next.js App Router compatibility

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonLandingProps {
  text: string;
  to?: string; // Optional prop for dynamic navigation
}

const ButtonLanding: React.FC<ButtonLandingProps> = ({ text, to = "/auth/login" }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(to); // Navigate to the specified route
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200"
    >
      {text}
    </button>
  );
};

export default ButtonLanding;
