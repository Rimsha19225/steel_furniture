"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/app/contexts/AdminContext';
import { Lock } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { adminLogin } = useAdmin();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        adminLogin(data.token);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome to Admin Dashboard',
          timer: 2000,
          showConfirmButton: false,
        });
        router.push('/admin/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Invalid password',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to connect to server',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-3 sm:px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-full mb-3 sm:mb-4">
            <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">Enter password to access admin panel</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition text-sm sm:text-base"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 text-sm sm:text-base ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-900 hover:bg-gray-800 hover:shadow-lg'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="mt-5 sm:mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
