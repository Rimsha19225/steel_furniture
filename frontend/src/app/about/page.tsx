'use client';
import Navbar from '@/components/navbar';
import { Award, Users, CheckCircle, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">About Us</h1>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-tl from-gray-100 to-gray-200 rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Welcome to Steel Furniture</h2>
            <p className="text-gray-600 text-base sm:text-[1rem] leading-relaxed mb-4">
              We are a leading manufacturer and retailer of high-quality steel furniture in Pakistan.
              With years of experience and dedication, we provide durable, stylish, and affordable
              furniture solutions for homes and offices.
            </p>
            <p className="text-gray-600 text-base sm:text-[1rem] leading-relaxed">
              Our commitment to excellence and customer satisfaction has made us a trusted name
              in the furniture industry.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-tl from-gray-200 to-gray-100 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            To provide our customers with the finest quality steel furniture that combines durability, 
            functionality, and aesthetic appeal. We strive to exceed expectations through innovative 
            designs, superior craftsmanship, and exceptional customer service.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
              <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">Premium steel furniture built to last with superior craftsmanship.</p>
            </div>
            <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
              <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600 text-sm">Skilled professionals dedicated to creating exceptional furniture.</p>
            </div>
            <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
              <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600 text-sm">100% satisfaction guarantee with excellent after-sales support.</p>
            </div>
            <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
              <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick and reliable delivery service across Pakistan.</p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              Founded with a vision to revolutionize the furniture industry in Pakistan, Steel Furniture 
              has grown from a small workshop to a renowned manufacturing unit. Our journey began with 
              a simple goal: to create furniture that combines strength, style, and affordability.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              Over the years, we have expanded our product range to include wardrobes, cupboards, 
              dividers, and various other steel furniture pieces. Each product is crafted with precision 
              and care, ensuring it meets our high standards of quality.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Today, we proudly serve thousands of satisfied customers across Pakistan, helping them 
              transform their living and working spaces with our durable and elegant furniture solutions.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-1 bg-[#ea580c] mx-auto mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">Honest and transparent in all our dealings.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-1 bg-[#ea580c] mx-auto mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Committed to the highest quality standards.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-1 bg-[#ea580c] mx-auto mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Continuously improving our designs and processes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
