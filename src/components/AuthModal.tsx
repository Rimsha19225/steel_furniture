"use client";
import React, { useState } from 'react';
import { useAuth } from '../app/contexts/AuthContext';
import SignupForm from './SignupForm';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  if (isSignup) return;

  const endpoint = '/api/auth/login';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  });

  const data = await res.json();

  if (res.ok) {
    login(data.token);
    onClose();
    router.push('/profile');
  } else {
    alert(data.message || "Login failed");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>

        {isSignup ? (
          <SignupForm onSuccess={() => {
            alert("Signup successful. You can now log in.");
            setIsSignup(false);
          }} />
        ) : (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
              className="w-full border p-2 mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              className="w-full border p-2 mb-4"
              required
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white p-2 rounded"
            >
              Login
            </button>
          </>
        )}

        <p className="text-center mt-3 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 ml-2 underline"
          >
            {isSignup ? 'Login' : 'Sign up'}
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full border rounded p-2 text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;