"use client";
import React, { useState } from 'react';
import { useAuth } from '../app/contexts/AuthContext';
import SignupForm from './SignupForm';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, LogIn, UserPlus, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isSignup) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        login(data.token);
        showSuccess(`Welcome back! You're now logged in.`);
        setTimeout(() => {
          onClose();
          router.push('/profile');
        }, 1500);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      alert('Connection failed. Please ensure the backend server is running.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in p-2 sm:p-4">
      {/* Success Message */}
      {showMessage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <div className="bg-white w-[90%] max-w-sm text-green-700 font-semibold border border-green-300 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 text-center pointer-events-auto animate-fade-in-out">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 animate-bounce flex-shrink-0" />
            <div className="text-base sm:text-lg">{successMessage}</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] max-w-md overflow-hidden animate-slide-up relative z-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] p-4 sm:p-6 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
            {isSignup ? (
              <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-[#ea580c]" />
            ) : (
              <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-[#ea580c]" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            {isSignup ? 'Sign up to get started' : 'Login to continue'}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          {isSignup ? (
            <SignupForm
              onSuccess={() => {
                setIsSignup(false);
              }}
              onShowSuccess={(msg) => {
                showSuccess(msg);
              }}
            />
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={form.email}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-2.5 sm:py-3 rounded-lg mt-4 sm:mt-6 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isLoading ? (
                  <span className="animate-pulse">Logging in...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    Login
                  </>
                )}
              </button>
            </>
          )}

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-[#ea580c] font-semibold ml-2 hover:underline transition-all"
              >
                {isSignup ? 'Login' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;