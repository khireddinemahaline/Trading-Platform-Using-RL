'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setErrorMessage('Username and password are required!');
      return;
    }

    // Dummy authentication logic (replace with actual backend API call)
    if (username === 'user' && password === 'password') {
      localStorage.setItem('authToken', 'dummyToken'); // Simulate storing token
      router.push('/acount/Dashboard'); // Redirect to the dashboard after successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  // Redirect to the registration page
  const handleRegister = () => {
    router.push('/auth/register');
  };

  // Redirect to the forgot password page
  const handleForgotPassword = () => {
    router.push('/auth/reset_pass');
  };

  return (
    <div className="flex justify-center items-center mbg-gray-100">
      <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-6 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4 transition ease-in-out duration-200"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Register Button */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Dont have an account?</p>
          <button
            onClick={handleRegister}
            className="w-full py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ease-in-out duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
