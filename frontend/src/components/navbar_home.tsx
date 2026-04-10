"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.png';
import cart from '../../public/images/cart.png';
import profile from '../../public/images/profile.png';
import { Menu, X, Shield } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAdmin } from '@/app/contexts/AdminContext';
import { useAuth } from '@/app/contexts/AuthContext';


const Navbar_home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAdminLoggedIn } = useAdmin();
  const { isLoggedIn } = useAuth();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.location.href = '/profile';
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className='w-full z-50 fixed top-0 bg-gradient-to-r from-[#eff0f0] to-[#d9dbde]'>
    <div className="w-[90%] mx-auto h-[15vh]">
      <div className="w-full flex justify-between items-center">

        <div>
          <Link href="/"><Image src={logo} alt="logo" className="w-[5rem] h-[4rem] sm:w-[8rem] sm:h-[6.5rem] transition ease-in duration-300 hover:scale-105"/></Link>
        </div>

        <div className="hidden md:flex gap-[4rem]">
          <Link href="/" className="hover:underline underline-offset-4 decoration-2 transition-all duration-200 font-normal">Home</Link>
          <Link href="/product" className="hover:underline underline-offset-4 decoration-2 transition-all duration-200 font-normal">Product</Link>
          <Link href="/inspiration" className="hover:underline underline-offset-4 decoration-2 transition-all duration-200 font-normal">Inspiration</Link>
          <Link href="/about" className="hover:underline underline-offset-4 decoration-2 transition-all duration-200 font-normal">About Us</Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/cart" className='transition ease-in duration-300 hover:scale-105'><Image src={cart} alt="cart" className="shake-on-hover w-[1.4rem] h-[1.4rem] sm:w-[2rem] sm:h-[2rem] transition ease-in duration-300 hover:scale-102"/></Link>
          <Link href="#" className='transition ease-in duration-300 hover:scale-105'><Image src={profile} alt="profile" onClick={handleProfileClick} className="shake-on-hover w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem] transition ease-in duration-300 hover:scale-102"/></Link>
          <Link 
            href={isAdminLoggedIn ? "/admin/dashboard" : "/admin/login"} 
            className='transition ease-in duration-300 hover:scale-105 text-gray-700 hover:text-gray-900'
            title="Admin Panel"
          >
            <Shield className="shake-on-hover w-[1.4rem] h-[1.4rem] sm:w-[1.8rem] sm:h-[1.8rem]" />
          </Link>

          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded shadow-lg z-50 fixed inset-x-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/product" onClick={() => setIsMenuOpen(false)}>Product</Link>
          <Link href="/inspiration" onClick={() => setIsMenuOpen(false)}>Inspiration</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar_home;
