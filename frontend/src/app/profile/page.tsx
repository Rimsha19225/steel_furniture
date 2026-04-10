"use client";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { LogOut, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
}

export default function ProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rimshaarshad-furniture.hf.space';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          router.push('/');
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setAddresses(data.addresses || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('token');
        router.push('/');
      } finally {

      }
    };

    fetchUser();
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-[7rem] sm:pt-[8.5rem] pb-12">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] rounded-t-lg p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#ea580c]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-white/80 text-sm sm:text-base">{user.email}</p>
                <p className="text-white/60 text-xs sm:text-sm">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-b-lg shadow-lg p-4 sm:p-6">
          {/* Personal Information */}
          <div className="mb-6 sm:mb-8">
            <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-800">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c]" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="border rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900 text-sm sm:text-base">{user.firstName} {user.lastName}</p>
              </div>
              <div className="border rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  {user.email}
                </p>
              </div>
              <div className="border rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  {user.phone || 'Not provided'}
                </p>
              </div>
              <div className="border rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          {addresses.length > 0 && (
            <div>
              <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2 text-gray-800">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea580c]" />
                Addresses
              </h2>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border rounded-lg p-3 sm:p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {addr.is_default ? 'Default Address' : 'Address'}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">{addr.address}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {addr.city}, {addr.state} {addr.zip_code}, {addr.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-gray-800">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/product')}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                Browse Products
              </button>
              <button
                onClick={() => router.push('/cart')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
