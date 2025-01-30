// src/components/layout/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './acountStyle.css'; // Import global styles

const Sidebar: React.FC = () => {
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No token found');
        return;
      }

      // Send a DELETE request to the disconnect endpoint
      const response = await fetch('http://localhost:5000/disconnect', {
        method: 'GET',
        headers: {
          'x-token': token, // Include the token in the headers
        },
      });

      if (response.ok) {
        // Clear the token from localStorage
        localStorage.removeItem('authToken');

        // Redirect to the login page
        router.push('/auth/login');
      } else {
        console.error('Failed to disconnect:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-5">
      <nav>
        <ul className="space-y-4">
          <li className="block py-2 px-4 rounded hover:bg-secondary-color transition duration-300">
            <Link href="/account/Dashboard">Dashboard</Link>
          </li>
          <li className="block py-2 px-4 rounded hover:bg-secondary-color transition duration-300">
            <Link href="/account/Tradingmentor">Trading Mentor</Link>
          </li>
          <li className="block py-2 px-4 rounded transition duration-300 hover:bg-red-500">
            <button onClick={handleLogout} className="w-full text-left">
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;