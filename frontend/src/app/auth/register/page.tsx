// src/app/(auth)/register/page.tsx
'use client';

import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        // Handle successful registration, e.g., redirect
        console.log('Registration successful');
        // You can redirect or perform another action here
      } else {
        const data = await response.json();
        console.log('Error response from backend:', data); // Log the response
        setError(data.error || 'An error occurred during registration');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
