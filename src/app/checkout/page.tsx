'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { useCart } from '../contexts/page';
import easypaisa from "../../../public/images/Easypaisa-logo.png";
import jazzcash from "../../../public/images/Jazzcash-logo.png";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  

  const [selectedCountry, setSelectedCountry] = useState('Pakistan');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCode, setSelectedCode] = useState('+92');

  const countryCityMap: Record<string, string[]> = {
    Pakistan: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta'],
    India: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco'],
    UK: ['London', 'Manchester', 'Birmingham', 'Glasgow'],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman']
  };

  const countryCodes: Record<string, string> = {
    Pakistan: '+92',
    India: '+91',
    USA: '+1',
    UK: '+44',
    Canada: '+1',
    UAE: '+971'
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
  };

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
  };

  const { calculateTotal } = useCart();
const { finalTotal } = calculateTotal();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white px-4 sm:px-10 pt-[8.5rem]">
        <h1 className="text-3xl font-bold text-center text-[#ea580c] mb-10">Your Checkout</h1>
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
            <div className="flex gap-2">
              <select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)} className="w-24 border p-2 pr-6 rounded bg-gray-100 appearance-none relative">
                {Object.entries(countryCodes).map(([country, code]) => (
                  <option key={country} value={code}>{code}</option>
                ))}
              </select>
              <input type="text" placeholder="Phone number" onInput={handlePhoneInput} className="flex-1 border p-2 rounded"/>
            </div>
            <input type="text" placeholder="First name" className="w-full border p-2 rounded" />
            <input type="text" placeholder="Last name" className="w-full border p-2 rounded" />
            <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
            <input type="text" placeholder="Company name (optional)" className="w-full border p-2 rounded" />

            <select
              value={selectedCountry}
              onChange={(e) => {
                const newCountry = e.target.value;
                setSelectedCountry(newCountry);
                setSelectedCity('');
                setSelectedCode(countryCodes[newCountry]);
              }}
              className="w-full border p-2 pr-6 rounded bg-gray-100 appearance-none relative"
            >
              {Object.keys(countryCityMap).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border p-2 pr-6 rounded bg-gray-100 appearance-none relative"
            >
              <option value="">Select city</option>
              {countryCityMap[selectedCountry].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="border rounded p-4 space-y-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span className="font-medium">Add card</span>
                <div className="ml-auto flex space-x-2">
                  <Image src="/visa.png" alt="visa" className="w-6 h-4" width={150} height={100} />
                  <Image src="/mastercard.png" alt="mastercard" className="w-6 h-4" width={150} height={100} />
                </div>
              </label>
              {paymentMethod === 'card' && (
                <div className="space-y-2">
                  <input type="text" placeholder="Card number" onInput={handleCardInput} className="w-full border p-2 rounded" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Expiry (MM/YY)" className="w-1/2 border p-2 rounded" />
                    <input type="text" placeholder="CVC" onInput={handleCardInput} className="w-1/2 border p-2 rounded" />
                  </div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Save my card</span>
                  </label>
                </div>
              )}

              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="easypaisa" checked={paymentMethod === 'easypaisa'} onChange={() => setPaymentMethod('easypaisa')} />
                <span className="font-medium">Easypaisa</span>
                <Image src={easypaisa} alt="Easypaisa" className="w-16 h-9 ml-auto" width={150} height={100} />
              </label>

              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="jazzcash" checked={paymentMethod === 'jazzcash'} onChange={() => setPaymentMethod('jazzcash')} />
                <span className="font-medium">JazzCash</span>
                <Image src={jazzcash} alt="JazzCash" className="w-16 h-9 ml-auto" width={150} height={100} />
              </label>
            </div>

            <button className="w-full bg-[#ea580c] hover:bg-[#0d9488] text-white font-semibold py-3 rounded text-lg">
              Pay {finalTotal.toLocaleString()} PKR
            </button>

            <p className="text-xs text-gray-500 text-center">
              By clicking &quot;Pay&quot;, you accept the <Link href="#" className="underline">Terms of use</Link> and <a href="#" className="underline">Privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
