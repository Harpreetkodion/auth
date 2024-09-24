"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import { permanentRedirect } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  if (session) {
    permanentRedirect(`/editProfile/${session?.id}`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back!</h2>
        <p className="text-center text-gray-500">Login to your account</p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 mt-1 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200" placeholder="Enter your email" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3 mt-1 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200" placeholder="Enter your password" required />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full px-5 py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" >
            Log In
          </button>
        </form>

        <div className="text-center text-gray-500 mt-6">
          <p className="mb-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-purple-600 hover:underline font-medium">
              Sign up
            </a>
          </p>

          <button className="inline-flex items-center px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2" onClick={() => signIn("github")} >
            <i className="fa fa-github mr-2"></i> Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
