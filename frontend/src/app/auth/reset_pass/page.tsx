'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Handle Reset Password Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    // Simulate API call for resetting the password
    try {
      // Replace with actual API call
      console.log('Sending reset password email to:', email);

      setSuccessMessage('A password reset link has been sent to your email address.');
      setErrorMessage('');
      setEmail('');
    } catch {
      setErrorMessage('Failed to send reset link. Please try again later.');
      setSuccessMessage('');
    }
  };

  // Navigate back to login page
  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex justify-center items-centerbg-gray-100">
      <div className="w-full  p-8 ">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Reset Password</h2>
        
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-600 p-4 rounded-md mb-4 text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4 transition ease-in-out duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleBackToLogin}
            className="text-sm text-gray-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
