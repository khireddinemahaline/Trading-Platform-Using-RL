'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icons for password visibility toggle

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setErrorMessage('Username and password are required!');
      return;
    }

    // Validate email format (if username is an email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true); // Set loading state
    setErrorMessage(''); // Clear previous errors

    try {
      // Send request to backend API for authentication using POST method
      const response = await fetch('http://localhost:5000/connect', {
        method: 'POST', // Using POST request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }), // Send credentials in body
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login: Store the token
        localStorage.setItem('authToken', data.token);

        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          router.push('/account/Dashboard');
        }, 1000);
      } else {
        // Handle errors (like invalid credentials)
        setErrorMessage(data.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Internal server error. Please try again later.');
    } finally {
      setIsLoading(false); // Reset loading state
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
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-6 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username (Email)
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4 transition ease-in-out duration-200 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              'Login'
            )}
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
          <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
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