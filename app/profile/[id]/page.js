/* eslint-disable @next/next/no-img-element */
"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from "@/app/component/navbar";

export default function Profile() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true); 
  const [profileImage, setProfileImage] = useState("https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg");
  const { id } = useParams();

  useEffect(() => {

    const fetchUser = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/auth/User?id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(await response.json().message);
        }

        const data = await response.json();
        setEmail(data.user.email);
        setName(data.user.name);
        setLocation(data.user.location);
        setBio(data.user.bio);
        setProfileImage(data.user.profileImage);
      } catch (err) {
        console.log('data-------', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  
  }, []);

  const shimmerEffect = (
    <div className="flex flex-col items-center mb-8">
      <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse mb-4"></div>
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <Navbar />
      <div className="w-full max-w-3xl p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl text-center">
        {loading ? (
          shimmerEffect
        ) : (
          <>
            <div className="flex flex-col items-center mb-8">
              <img
                src={profileImage}
                alt="User Avatar"
                className="w-32 h-32 rounded-full shadow-lg mb-4"
              />
              <h1 className="text-4xl font-bold text-gray-900">
                {name}
              </h1>
              <p className="text-lg text-gray-600">
                {bio}
              </p>
            </div>
            <div className="text-left space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Email:</span>
                <span className="text-gray-700">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Location:</span>
                <span className="text-gray-700">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Bio:</span>
                <span className="text-gray-700">{bio}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6 mt-8">
              <Link href={`/editProfile/${id}`} className="w-40 px-6 py-4 font-bold text-white bg-purple-700 rounded-lg shadow-lg hover:bg-purple-800 transition-all duration-300">
                Edit Profile
              </Link>
              <button className="w-40 px-6 py-4 font-bold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300" onClick={() => signOut()}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-white text-sm">
        <p>&copy; {new Date().getFullYear()} Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
