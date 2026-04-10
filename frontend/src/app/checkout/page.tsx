'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { useCart } from '../contexts/page';
import easypaisa from "../../../public/images/Easypaisa-logo.png";
import jazzcash from "../../../public/images/Jazzcash-logo.png";
import Swal from 'sweetalert2';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, calculateTotal } = useCart();
  const { finalTotal } = calculateTotal();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [easypaisaNumber, setEasypaisaNumber] = useState('');
  const [jazzcashNumber, setJazzcashNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    company: '',
    country: 'Pakistan',
    city: '',
  });

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
    setFormData({ ...formData, phone: value });
  };

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
  };

  const handleEasypaisaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setEasypaisaNumber(value);
  };

  const handleJazzcashInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setJazzcashNumber(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
      });
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone',
        text: 'Please enter a valid phone number',
      });
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Name',
        text: 'Please enter your first and last name',
      });
      return;
    }

    if (!formData.address) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Address',
        text: 'Please enter your shipping address',
      });
      return;
    }

    if (!formData.city) {
      Swal.fire({
        icon: 'error',
        title: 'Missing City',
        text: 'Please select your city',
      });
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Your cart is empty',
      });
      return;
    }

    // Payment method validation
    if (paymentMethod === 'easypaisa' && (!easypaisaNumber || easypaisaNumber.length !== 11)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Easypaisa Number',
        text: 'Please enter a valid 11-digit Easypaisa mobile number',
      });
      return;
    }

    if (paymentMethod === 'jazzcash' && (!jazzcashNumber || jazzcashNumber.length !== 11)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid JazzCash Number',
        text: 'Please enter a valid 11-digit JazzCash mobile number',
      });
      return;
    }

    // Process payment
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        userId: 'guest', // For guest checkout
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          selectedColor: item.selectedColor || null
        })),
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingState: formData.country,
        shippingZip: '00000',
        shippingCountry: formData.country,
        paymentMethod: paymentMethod === 'card' ? 'Card' : paymentMethod === 'easypaisa' ? `Easypaisa (${easypaisaNumber})` : `JazzCash (${jazzcashNumber})`,
        customerEmail: formData.email,
        customerPhone: `${selectedCode}${formData.phone}`,
        customerName: `${formData.firstName} ${formData.lastName}`
      };

      // Send order to backend
      const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const result = await response.json();

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully!',
        html: `
          <p>Thank you for your order!</p>
          <p><strong>Order Number:</strong> ${result.order.orderNumber}</p>
          <p><strong>Total:</strong> PKR ${finalTotal.toLocaleString()}</p>
        `,
        timer: 5000,
        showConfirmButton: true,
        confirmButtonText: 'Continue Shopping',
      });

      // Clear cart and redirect
      localStorage.removeItem('cart');
      window.location.reload(); // Reload to clear cart context
      router.push('/');
      
    } catch (error: any) {
      console.error('Order error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message || 'There was an error processing your payment. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white px-3 sm:px-6 md:px-10 pt-[7rem] sm:pt-[8.5rem] pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#ea580c] mb-6 sm:mb-10">Your Checkout</h1>
        <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border p-2 sm:p-2.5 rounded text-sm sm:text-base"
              required
            />
            <div className="flex gap-2">
              <select
                value={selectedCode}
                onChange={(e) => {
                  setSelectedCode(e.target.value);
                  setFormData({ ...formData, phone: '' });
                }}
                className="w-20 sm:w-24 border p-2 pr-6 rounded bg-gray-100 appearance-none relative text-sm sm:text-base"
              >
                {Object.entries(countryCodes).map(([country, code]) => (
                  <option key={country} value={code}>{code}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handlePhoneInput}
                className="flex-1 border p-2 sm:p-2.5 rounded text-sm sm:text-base"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full border p-2 sm:p-2.5 rounded text-sm sm:text-base"
                required
              />
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full border p-2 sm:p-2.5 rounded text-sm sm:text-base"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border p-2 sm:p-2.5 rounded text-sm sm:text-base"
              required
            />
            <input
              type="text"
              placeholder="Company name (optional)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full border p-2 sm:p-2.5 rounded text-sm sm:text-base"
            />

            <select
              value={selectedCountry}
              onChange={(e) => {
                const newCountry = e.target.value;
                setSelectedCountry(newCountry);
                setSelectedCity('');
                setSelectedCode(countryCodes[newCountry]);
                setFormData({ ...formData, country: newCountry, city: '' });
              }}
              className="w-full border p-2 sm:p-2.5 pr-6 rounded bg-gray-100 appearance-none relative text-sm sm:text-base"
            >
              {Object.keys(countryCityMap).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setFormData({ ...formData, city: e.target.value });
              }}
              className="w-full border p-2 sm:p-2.5 pr-6 rounded bg-gray-100 appearance-none relative text-sm sm:text-base"
              required
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
            <div className="border rounded p-3 sm:p-4 space-y-3 sm:space-y-4">
              <label className="flex items-center space-x-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span className="font-medium">Add card</span>
                <div className="ml-auto flex space-x-2">
                  <Image src="/visa.png" alt="visa" className="w-6 h-4 sm:w-8 sm:h-5" width={150} height={100} />
                  <Image src="/mastercard.png" alt="mastercard" className="w-6 h-4 sm:w-8 sm:h-5" width={150} height={100} />
                </div>
              </label>
              {paymentMethod === 'card' && (
                <div className="space-y-2 pl-6">
                  <input type="text" placeholder="Card number" onInput={handleCardInput} className="w-full border p-2 rounded text-sm sm:text-base" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Expiry (MM/YY)" className="w-1/2 border p-2 rounded text-sm sm:text-base" />
                    <input type="text" placeholder="CVC" onInput={handleCardInput} className="w-1/2 border p-2 rounded text-sm sm:text-base" />
                  </div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Save my card</span>
                  </label>
                </div>
              )}

              <label className="flex items-center space-x-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="payment"
                  value="easypaisa"
                  checked={paymentMethod === 'easypaisa'}
                  onChange={() => setPaymentMethod('easypaisa')}
                />
                <span className="font-medium">Easypaisa</span>
                <Image src={easypaisa} alt="Easypaisa" className="w-12 h-7 sm:w-16 sm:h-9 ml-auto" width={150} height={100} />
              </label>

              {paymentMethod === 'easypaisa' && (
                <div className="space-y-2 pl-6">
                  <input
                    type="text"
                    placeholder="Easypaisa Mobile Number"
                    value={easypaisaNumber}
                    onChange={handleEasypaisaInput}
                    maxLength={11}
                    className="w-full border p-2 rounded text-sm sm:text-base"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter your Easypaisa account number (e.g., 03001234567)</p>
                </div>
              )}

              <label className="flex items-center space-x-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="payment"
                  value="jazzcash"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                />
                <span className="font-medium">JazzCash</span>
                <Image src={jazzcash} alt="JazzCash" className="w-12 h-7 sm:w-16 sm:h-9 ml-auto" width={150} height={100} />
              </label>

              {paymentMethod === 'jazzcash' && (
                <div className="space-y-2 pl-6">
                  <input
                    type="text"
                    placeholder="JazzCash Mobile Number"
                    value={jazzcashNumber}
                    onChange={handleJazzcashInput}
                    maxLength={11}
                    className="w-full border p-2 rounded text-sm sm:text-base"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter your JazzCash account number (e.g., 03001234567)</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full font-semibold py-3 rounded text-base sm:text-lg transition-colors ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#ea580c] hover:bg-[#0d9488] text-white'
              }`}
            >
              {isProcessing ? 'Processing...' : `Pay ${finalTotal.toLocaleString()} PKR`}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By clicking &quot;Pay&quot;, you accept the <Link href="/privacy-policy" className="underline">Terms of use</Link> and <Link href="/privacy-policy" className="underline">Privacy policy</Link>.
            </p>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
