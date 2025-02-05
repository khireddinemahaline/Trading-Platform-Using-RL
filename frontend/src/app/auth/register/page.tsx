'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength === 'Weak') {
      setError('Password is too weak');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend error:', errorData);
        throw new Error(errorData.error || 'Failed to register');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
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
            required
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
            required
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
            required
          />
          {password && (
            <p className={`text-sm mt-1 ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              Password Strength: {passwordStrength}
            </p>
          )}
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Login Redirect Button */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account? 
          <button
            onClick={handleLoginRedirect}
            className="text-blue-500 hover:underline ml-1"
          >
            Login
          </button>
        </p>
      </div>

    </div>
  );
};

export default RegisterPage;