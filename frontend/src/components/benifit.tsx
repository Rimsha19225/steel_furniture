'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import shipping from "../../public/images/shipping.png"
import returns from "../../public/images/return.png"
import consultation from "../../public/images/consultation.png"
import { useRouter } from 'next/navigation'
import { Truck, CheckCircle, Package, MapPin, IndianRupee, X } from 'lucide-react'

const FREE_SHIPPING_THRESHOLD = 70000;

const shippingCriteria = [
  { icon: IndianRupee, title: 'Minimum Order Value', desc: `Orders above PKR ${FREE_SHIPPING_THRESHOLD.toLocaleString()} qualify for FREE shipping. Orders below this threshold incur a PKR 1,000 delivery charge.` },
  { icon: Package, title: 'Order Size & Weight', desc: 'Large furniture items (cupboards, dividers, showcases) may incur additional shipping charges based on dimensions and weight, regardless of order value.' },
  { icon: MapPin, title: 'Delivery Location', desc: 'Standard shipping is free within major cities. Remote or out-of-town areas may have a surcharge calculated at checkout based on your address.' },
  { icon: Truck, title: 'Estimated Delivery Time', desc: 'In-stock items ship within 2-3 business days. Custom orders take 7-14 business days. Delivery takes an additional 2-5 days depending on location.' },
];

function ShippingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white p-6 rounded-t-2xl sticky top-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Free Shipping Details</h2>
                <p className="text-sm opacity-90">Everything you need to know about our shipping policy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Criteria Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {shippingCriteria.map((criterion, index) => (
              <div key={index} className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-4 flex gap-3">
                <div className="bg-[#ea580c] text-white p-2 rounded-lg flex-shrink-0 h-fit">
                  <criterion.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{criterion.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{criterion.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight: Free Shipping Threshold */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-green-800">How to Get Free Shipping</h3>
            </div>
            <div className="space-y-2 text-sm text-green-700">
              <p>✓ Simply add items worth <strong>PKR {FREE_SHIPPING_THRESHOLD.toLocaleString()}</strong> or more to your cart</p>
              <p>✓ Shipping is automatically waived at checkout when you meet the threshold</p>
              <p>✓ No coupon code needed - it&apos;s applied automatically!</p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#ea580c]" />
              Quick Shipping Tips
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Bundle Items:</strong> Combine multiple items in one order to reach the free shipping threshold faster</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Check Your Cart:</strong> The cart page shows a progress bar so you know exactly how close you are to free shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Custom Orders:</strong> Handmade pieces take 7-14 business days to craft before shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Delivery Tracking:</strong> You&apos;ll receive tracking info once your order ships</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Benifit = () => {
  const router = useRouter();
  const [showShippingModal, setShowShippingModal] = useState(false);

  return (
    <div className="w-[85%] mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-between items-center bg-gradient-to-tl from-[#eff0f0] to-[#e5e7ea] p-4 rounded-2xl mt-[8rem] shadow-xl">
        <div className="w-full sm:w-[35%] text-[2.5rem] sm:text-[3rem] leading-[2.4rem] sm:leading-12 font-semibold">Your One Step Shop for furniture</div>
        <div className="w-full sm:w-[60%] text-[0.8rem] sm:text-[1rem] bg-gradient-to-br from-[#eff0f0] to-[#e5e7ea] p-2 rounded-2xl transition ease-in duration-300 hover:scale-102 shad">Our stylish cupboards and dividers not only provide practical storage but also enhance your home décor. With durable materials and smart designs, they bring both elegance and functionality to any room, making organization simple and beautiful.</div>
      </div>
      <div className='flex flex-col sm:flex-row gap-8 mt-[3.5rem] mb-[1.5rem] w-full'>
        <div
          onClick={() => setShowShippingModal(true)}
          className='w-full sm:w-[50%] p-4 rounded-xl bg-[#f75a05] hover:bg-[#ea5a0ceb] transition ease-in duration-300 hover:scale-102 cursor-pointer'
        >
            <div><Image src={shipping} alt="shipping" className='shake-on-hover w-[4rem] h-[2.5rem]  mt-[0.5rem] mb-3 sm:mb-6'></Image></div>
            <div className='text-[1.2rem] sm:text-[1.4rem] font-normal mb-2 text-gray-700'>Free Shipping</div>
            <div className='text-[0.6rem] sm:text-[0.9rem] text-gray-700'>Enjoy hassle-free shopping with fast, reliable delivery at no extra cost. Your order ships free, every time no minimum required!</div>
        </div>
        <div
          onClick={() => router.push('/returns-exchange')}
          className='w-full sm:w-[50%] p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition ease-in duration-300 hover:scale-102 cursor-pointer'
        >
            <div><Image src={returns} alt="returns" className='shake-on-hover w-[3rem] h-[3rem] mb-3 sm:mb-6'></Image></div>
            <div className='text-[1.2rem] sm:text-[1.4rem] font-normal mb-2'>Free Returns</div>
            <div className='text-[0.6rem] sm:text-[0.9rem]'>Shop confidently knowing you can return any item for free. No stress, no fees just easy, risk-free shopping every time.</div>
        </div>
        <div
          onClick={() => router.push('/inspiration#design-tips')}
          className='w-full sm:w-[50%] p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition ease-in duration-300 hover:scale-102 cursor-pointer'
        >
            <div><Image src={consultation} alt="consultation" className='shake-on-hover w-[3rem] h-[3rem] mb-3 sm:mb-6'></Image></div>
            <div className='text-[1.2rem] sm:text-[1.4rem] font-normal mb-2'>Design Consultation</div>
            <div className='text-[0.6rem] sm:text-[0.9rem]'>Bring your ideas to life with our free expert design consultation. Personalized guidance to help you create something truly unique.</div>
        </div>
      </div>

      {/* Shipping Modal */}
      <ShippingModal isOpen={showShippingModal} onClose={() => setShowShippingModal(false)} />
    </div>
  )
}

export default Benifit