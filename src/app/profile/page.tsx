"use client";
import { useAuth } from '../contexts/AuthContext';
// import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  address: {
    residential: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();
//   const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch('/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await res.json();
    setUser(data);
  };

  if (isLoggedIn) {
    fetchUser();
  }
}, [isLoggedIn]);

if (!user) return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;


  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
      {/* Navbar */}
      <div className="flex justify-between border-b pb-2 mb-6 text-gray-600">
        <div className="space-x-6">
          <button className="border-b-2 border-black font-medium">Dashboard</button>
          <button className="hover:text-black">Edit Profile</button>
          <button className="hover:text-black">Edit Password</button>
        </div>
        <button className="hover:text-black">User Logout</button>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-lg">@ <span className="font-semibold">{user.name}</span></p>
        <p className="text-gray-600">{user.email}</p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-black text-white px-4 py-2 rounded">Take Picture</button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded">Upload Files</button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-6 border-t pt-4">
        <h2 className="font-bold text-lg mb-2">Personal Information:</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Date Of Birth:</strong> {user.dob}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-6 border-t pt-4">
        <h2 className="font-bold text-lg mb-2">Contact Information:</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone}</p>
      </div>

      {/* Address Info */}
      <div className="border-t pt-4">
        <h2 className="font-bold text-lg mb-2">Address Information:</h2>
        <p><strong>Residential Address:</strong> {user.address.residential}</p>
        <p><strong>City:</strong> {user.address.city}</p>
        <p><strong>State/Province:</strong> {user.address.state}</p>
        <p><strong>ZIP/Postal Code:</strong> {user.address.zip}</p>
        <p><strong>Country:</strong> {user.address.country}</p>
      </div>
    </div>
  );
}
