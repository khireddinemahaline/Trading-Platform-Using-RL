// /app/layout.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import './acountStyle.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Simulate authentication check (Replace with real auth logic)
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Example: JWT or auth flag
    setIsAuthenticated(!!token);
  }, []);

  const isAuthPage = pathname?.startsWith('/auth');

  useEffect(() => {
    if (isAuthenticated === false && !isAuthPage) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isAuthPage, router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p> {/* You can replace this with a loading spinner */}
      </div>
    );
  }

  return (
    // Wrap the layout in <html> and <body> tags
    <html lang="en">
      <body className="min-h-screen flex">
        {isAuthenticated ? (
          <>
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </>
        ) : (
          isAuthPage ? (
            <main className="flex-1">{children}</main>
          ) : (
            <></>
          )
        )}
      </body>
    </html>
  );
};

export default RootLayout;
