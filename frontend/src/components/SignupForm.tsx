import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, Mail, Phone, MapPin, Lock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rimshaarshad-furniture.hf.space';
const API_BASE_URL = `${BACKEND_URL}/api`;

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSuccess?: () => void;
  onShowSuccess?: (msg: string) => void;
}

export default function SignupForm({ onSuccess, onShowSuccess }: SignupFormProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (onShowSuccess) {
          onShowSuccess("Account created successfully! You can now log in.");
        } else {
          alert("Signup successful! You can now log in.");
        }
        if (onSuccess) onSuccess();
      } else {
        alert(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Contact Info', icon: Mail },
    { title: 'Address', icon: MapPin },
    { title: 'Password', icon: Lock },
  ];

  return (
    <div className="max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index + 1 <= step 
                    ? 'bg-[#ea580c] text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index + 1 < step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${
                  index + 1 === step ? 'text-[#ea580c] font-semibold' : 'text-gray-400'
                }`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative h-1 bg-gray-200 rounded-full">
          <div 
            className="absolute h-full bg-[#ea580c] rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSignup}>
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                required
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Gender</p>
              <div className="flex justify-center gap-3">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#ea580c] focus:ring-[#ea580c]"
                      required
                    />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                required
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                required
              />
            </div>
            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3 animate-fade-in">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="address"
                placeholder="Residential Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  name="state"
                  placeholder="State/Province"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                />
              </div>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
              />
            </div>

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                required
              />
            </div>
            
            {formData.password && formData.confirmPassword && (
              <div className={`flex items-center gap-2 text-sm ${
                formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
              }`}>
                <CheckCircle className="w-4 h-4" />
                <span>
                  {formData.password === formData.confirmPassword 
                    ? 'Passwords match!' 
                    : 'Passwords do not match'}
                </span>
              </div>
            )}

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Signup
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}