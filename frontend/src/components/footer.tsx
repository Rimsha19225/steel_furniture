import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../public/images/logo.png"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-300 text-gray-600 w-full">
        <div>
            <Link href="/" className='w-[85%] flex justify-start mx-auto mt-[4rem]'><Image src={logo} alt="logo" className="w-[5rem] h-[4rem] sm:w-[8rem] sm:h-[6.5rem] transition ease-in duration-300 hover:scale-105"/></Link>
        </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* ABOUT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ABOUT</h3>
          <p className="text-sm leading-relaxed hover:text-gray-500">
            Steel Furniture is a leading manufacturer and retailer of high-quality steel furniture in Pakistan. We provide durable, stylish, and affordable furniture solutions for homes and offices.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Image src="/images/Easypaisa-logo.png" alt="Easypaisa" width={40} height={40} className="w-12 h-7 bg-gray-200 p-1 rounded px-1" />
            <Image src="/images/Jazzcash-logo.png" alt="Jazzcash" width={40} height={40} className="w-12 h-7 bg-gray-200 p-1 rounded px-1" />
            <Image src="/images/mastercard.png" alt="MasterCard" width={40} height={40} className="w-12 h-7 bg-gray-200 p-1 rounded px-1" />
            <Image src="/images/visa.png" alt="Visa" width={40} height={40} className="w-12 h-7 bg-gray-200 p-1 rounded px-1" />
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CATEGORIES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/product" className='hover:text-gray-500 transition-colors'>3 Door Cupboard</Link></li>
            <li><Link href="/product" className='hover:text-gray-500 transition-colors'>2 Door Cupboard</Link></li>
            <li><Link href="/product" className='hover:text-gray-500 transition-colors'>Dividers</Link></li>
            <li><Link href="/product" className='hover:text-gray-500 transition-colors'>Wardrobes</Link></li>
            <li><Link href="/product" className='hover:text-gray-500 transition-colors'>Storage Cabinets</Link></li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className='hover:text-gray-500 transition-colors'>About Us</Link></li>
            <li><Link href="/contact" className='hover:text-gray-500 transition-colors'>Contact Us</Link></li>
            <li><Link href="/terms-and-conditions" className='hover:text-gray-500 transition-colors'>Term & Condition</Link></li>
            <li><Link href="/returns-exchange" className='hover:text-gray-500 transition-colors'>Returns & Exchange</Link></li>
            <li><Link href="/shipping-delivery" className='hover:text-gray-500 transition-colors'>Shipping & Delivery</Link></li>
            <li><Link href="/privacy-policy" className='hover:text-gray-500 transition-colors'>Private Policy</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
          <p className="text-sm mb-2 hover:text-gray-500">xyz area</p>
          <p className="text-sm mb-2 hover:text-gray-500">info@steelfurniture.com</p>
          <p className="text-sm mb-4 hover:text-gray-500">+91 123456789</p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-gray-500 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-500 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-500 transition-colors"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className='bg-black text-white h-[3.5rem] flex justify-center items-center p-2 mt-10'>Copyright ©2019 All rights reserved | Design by UI DEV</div>
    </div>
  );
};

export default Footer;
