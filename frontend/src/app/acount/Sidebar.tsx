// src/components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import './acountStyle.css'; // Import global styles

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-5">
      <nav>
        <ul className="space-y-4">
          <li className='block py-2 px-4 rounded hover:bg-secondary-color transition duration-300'>
            <Link href="/acount/Dashboard">Dashboard</Link>
          </li>
          <li className='block py-2 px-4 rounded hover:bg-secondary-color transition duration-300'>
            <Link href="/acount/Tradingmentor">Trading Mentor</Link>
          </li>
          <li className='block py-2 px-4 rounded  transition duration-300 hover:bg-red-500'>
            <Link href="#">Log Out</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;