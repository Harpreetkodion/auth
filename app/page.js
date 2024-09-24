/* eslint-disable @next/next/no-img-element */
"use client"
import Link from 'next/link';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="w-full max-w-5xl p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Our Platform</span>!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Explore the features and manage your account easily.
        </p>

        {status === "unauthenticated" && (
          <div>
            <p className="text-xl text-gray-700 mb-8">Please login or register to get started.</p>
            <div className="flex justify-center gap-6 mt-6">
              <Link href="/login" className="w-48 px-6 py-4 font-bold text-lg text-white bg-purple-700 rounded-lg shadow-lg hover:bg-purple-800 transition-all duration-300">
                Login
              </Link>

              <Link href="/register" className="w-48 px-6 py-4 font-bold text-lg text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
                Register
              </Link>
            </div>
          </div>
        )}

        {status === "authenticated" && (
          <div>
            <p className="text-xl text-gray-700 mb-8">You are logged in as {session.user.email}</p>
            <div className="flex justify-center gap-6 mt-6">
              <Link 
                href={`/profile/${session.id}`}
                className="relative  w-48 px-6 py-4 font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Profile
                <span className="absolute inset-0 border-2 border-blue-700 rounded-lg opacity-30 animate-pulse"></span>
              </Link>

              <button
                onClick={() => signOut()}
                className="relative w-48 px-6 py-4 font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Logout
                <span className="absolute inset-0 border-2 border-red-700 rounded-lg opacity-30 animate-pulse"></span>
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="absolute bottom-6 text-white text-sm">
        <p>&copy; {new Date().getFullYear()} Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
