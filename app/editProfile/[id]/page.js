"use client";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [location, setLocation] = useState();
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileImage, setProfileImage] = useState("https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
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
      }
    };

    fetchUser();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { id, name, bio, location, profileImage };

    try {
      const response = await fetch("/api/auth/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setProfileUpdated(true);
        router.push(`/profile/${id}`)
      } else {
        console.error("Profile update failed.");
      }
    } catch (error) {
      console.error("Error making API call: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-6 flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="w-full max-w-2xl p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl text-center"> {/* Medium size */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Profile</h1> {/* Adjusted font size back up */}

        {profileUpdated && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            Profile updated successfully!
          </div>
        )}

        {loading && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded-lg">
            Updating your profile, please wait...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex flex-col items-center mb-4">
            <div className="relative w-32 h-32">
              <img src={profileImage} alt="Profile Preview" className="w-full h-full rounded-full shadow-lg object-cover" onClick={handleImageClick} />

              <div className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer" onClick={handleImageClick}>
                <FaEdit className="text-white text-lg" />
              </div>
            </div>

            <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>

          <div>
            <label htmlFor="name" className="block text-left font-medium text-gray-700 mb-1">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-3 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" placeholder="Enter your name" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-left font-medium text-gray-700 mb-1">Email</label>
            <input type="email" disabled id="email" value={email} className="w-full px-5 py-3 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" placeholder="Enter your email" required />
          </div>

          <div>
            <label htmlFor="bio" className="block text-left font-medium text-gray-700 mb-1">Bio</label>
            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-5 py-3 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" placeholder="Tell us about yourself" rows="4" required />
          </div>

          <div>
            <label htmlFor="location" className="block text-left font-medium text-gray-700 mb-1">Location</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-5 py-3 bg-gray-100 border-none rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" placeholder="Enter your location" required />
          </div>

          <button type="submit" className="w-full px-6 py-4 font-bold text-white bg-purple-700 rounded-lg shadow-lg hover:bg-purple-800 transition-all" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
