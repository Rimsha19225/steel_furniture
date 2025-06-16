import React, { useState, ChangeEvent, FormEvent } from "react";

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
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
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

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        if (onSuccess) onSuccess();
      } else {
        alert(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSignup}>
        {step === 1 && (
  <>
    <label>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        required
      />
    </label>

    <label>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        required
      />
    </label>

    <label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        required
      />
    </label>

    <div className="flex items-center gap-4 mb-4">
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={handleChange}
          required
        />
        Male
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
        />
        Female
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="gender"
          value="Other"
          checked={formData.gender === "Other"}
          onChange={handleChange}
        />
        Other
      </label>
    </div>

    <button
      type="button"
      onClick={handleNext}
      className="w-full bg-black text-white p-2 rounded"
    >
      Next
    </button>
  </>
)}


        {step === 2 && (
  <>
    <input
      type="email"
      name="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={handleChange}
      className="w-full border p-2 mb-4 rounded"
      required
    />
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      className="w-full border p-2 mb-4 rounded"
      required
    />
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handleBack}
        className="w-[48%] border p-2 rounded"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="w-[48%] bg-black text-white p-2 rounded"
      >
        Next
      </button>
    </div>
  </>
)}

{step === 3 && (
            <>
              <input
                type="text"
                name="address"
                placeholder="Residential Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={formData.state}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP/Postal Code"
                value={formData.zip}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
              />

              <div className="flex justify-between">
      <button
        type="button"
        onClick={handleBack}
        className="w-[48%] border p-2 rounded"
      >
        Back
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="w-[48%] bg-black text-white p-2 rounded"
      >
        Next
      </button>
    </div>
            </>
          )}


        {step === 4 && (
  <>
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full border p-2 mb-4 rounded"
      required
    />
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="w-full border p-2 mb-4 rounded"
      required
    />
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handleBack}
        className="w-[48%] border p-2 rounded"
      >
        Back
      </button>
      <button
        type="submit"
        className="w-[48%] bg-black text-white p-2 rounded"
      >
        Signup
      </button>
    </div>
  </>
)}

      </form>
    </div>
  );
}