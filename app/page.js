"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from './component/navbar';

export default function Home() {
  const { data: session, status } = useSession();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageUrls = [
    "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/12/laptop-phone-qr-code.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
    "https://static.vecteezy.com/system/resources/previews/026/567/980/non_2x/bar-code-in-smartphone-app-and-laptop-screen-tiny-people-scan-bar-code-handheld-barcode-scanner-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg",
    "https://assets-us-01.kc-usercontent.com/ad8d8eda-c21e-000c-a5e6-7478633c60f3/c11f75c4-f2f0-430e-b02e-5fbb5b0f22c8/assetcloud-hardware-hero.png",
  ];

  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(imageUrls.map((url) => new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
      })));
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
      <Navbar />

      <div className="w-full max-w-5xl p-10 mt-20 bg-white bg-opacity-90 rounded-3xl shadow-2xl text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Our Platform</span>!
        </h1>

        <div className="space-y-6 mt-10">
          <h2 className="text-3xl font-semibold text-gray-800">Explore Our Features</h2>
          <p className="text-gray-600">Scan items quickly and easily, manage your profile, and stay updated with our latest features.</p>
        </div>

        {/* Images Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative w-80 h-52">
              {!imagesLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
              )}
              <img
                src={url}
                alt={`Feature ${index + 1}`}
                className={`w-full h-full rounded-lg shadow-lg object-cover transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImagesLoaded(true)} 
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black bg-opacity-30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                Feature {index + 1} Description
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-6 text-white text-sm">
        <p>&copy; {new Date().getFullYear()} Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
