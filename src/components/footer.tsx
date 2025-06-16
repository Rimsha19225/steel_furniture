import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../public/images/logo.png"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-300 text-gray-600 w-full">
        <div>
            <Link href="/" className='w-[85%] flex justify-center mx-auto mt-[4rem]'><Image src={logo} alt="logo" className="w-[5rem] h-[4rem] sm:w-[8rem] sm:h-[6.5rem] transition ease-in duration-300 hover:scale-105"/></Link>
        </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* ABOUT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ABOUT</h3>
          <p className="text-sm leading-relaxed hover:text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Image src="/payments/paypal.png" alt="PayPal" width={100} height={100} className="w-8" />
            <Image src="/payments/amex.png" alt="AmEx" width={100} height={100} className="w-8" />
            <Image src="/payments/mastercard.png" alt="MasterCard" width={100} height={100} className="w-8" />
            <Image src="/payments/visa.png" alt="Visa" width={100} height={100} className="w-8" />
            <Image src="/payments/discover.png" alt="Discover" width={100} height={100} className="w-8" />
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CATEGORIES</h3>
          <ul className="space-y-2 text-sm">
            <li className='hover:text-gray-500'>Clothing</li>
            <li className='hover:text-gray-500'>Footwear</li>
            <li className='hover:text-gray-500'>Hand Bag</li>
            <li className='hover:text-gray-500'>Jewellery</li>
            <li className='hover:text-gray-500'>Belt</li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>
          <ul className="space-y-2 text-sm">
            <li className='hover:text-gray-500'>About Us</li>
            <li className='hover:text-gray-500'>Contact Us</li>
            <li className='hover:text-gray-500'>Term & Condition</li>
            <li className='hover:text-gray-500'>Returns & Exchange</li>
            <li className='hover:text-gray-500'>Shipping & Delivery</li>
            <li className='hover:text-gray-500'>Private Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT</h3>
          <p className="text-sm mb-2 hover:text-gray-500">XYZ, New Delhi, India</p>
          <p className="text-sm mb-2 hover:text-gray-500">Pin code - 110005</p>
          <p className="text-sm mb-4 hover:text-gray-500">+91 123456789</p>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>
      <div className='bg-black text-white h-[3.5rem] flex justify-center items-center p-2 mt-10'>Copyright ©2019 All rights reserved | Design by UI DEV</div>
    </div>
  );
};

export default Footer;
