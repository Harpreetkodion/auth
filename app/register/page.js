"use client";
import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (res.status === 201) {
          const data = await res.json();
          window.location.href = "/login";
          console.log('Registration successful:', data);
        } else {
          console.log('Error:', res.status);
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    } else {
      console.log('Passwords do not match');
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-500">Sign up to get started</p>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 mt-1 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 mt-1 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-3 mt-1 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-gray-500 mt-6">
          <p className="mb-4">
            Already have an account?{' '}
            <a href="http://localhost:3000/login" className="text-purple-600 hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
