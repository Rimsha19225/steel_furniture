'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';

export default function TermsAndConditionsPage() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to Steel Furniture. These Terms and Conditions govern your use of our website and the purchase of our products. By accessing our website or placing an order, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our website or purchase our products."
    },
    {
      title: "2. Product Information",
      content: "We strive to provide accurate product descriptions, images, and pricing information. However, we do not guarantee that all information is completely accurate, complete, or current. Product images are for reference only, and actual products may vary slightly in color, size, and finish. We reserve the right to modify product specifications without prior notice."
    },
    {
      title: "3. Pricing and Payment",
      content: "All prices displayed on our website are in Pakistani Rupees (PKR) and include applicable taxes. We reserve the right to change prices at any time without prior notice. Payment must be made in full before order processing. We accept various payment methods including credit/debit cards, bank transfers, and cash on delivery."
    },
    {
      title: "4. Orders and Acceptance",
      content: "All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order for any reason, including but not limited to product unavailability, pricing errors, or suspected fraud. Order confirmation does not constitute acceptance; acceptance occurs when the order is dispatched."
    },
    {
      title: "5. Delivery and Shipping",
      content: "We deliver to various locations across Pakistan. Delivery times are estimates and not guaranteed. Shipping charges, if applicable, will be calculated at checkout. You are responsible for providing accurate delivery information. We are not liable for delays caused by factors beyond our control, including weather, traffic, or courier issues."
    },
    {
      title: "6. Returns and Exchanges",
      content: "We accept returns and exchanges within 7 days of delivery, provided the product is in its original condition with all packaging intact. Custom-made or personalized items cannot be returned unless defective. To initiate a return, please contact our customer service team. Return shipping costs are the responsibility of the customer unless the item is defective."
    },
    {
      title: "7. Warranty",
      content: "Our products come with a manufacturer's warranty covering defects in materials and workmanship. The warranty period varies by product and will be specified at the time of purchase. The warranty does not cover damage caused by misuse, accidents, normal wear and tear, or unauthorized repairs."
    },
    {
      title: "8. Limitation of Liability",
      content: "Steel Furniture shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or website. Our total liability for any claim related to your purchase shall not exceed the purchase price of the product."
    },
    {
      title: "9. Privacy Policy",
      content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our website, you consent to the collection and use of your information as described in our Privacy Policy."
    },
    {
      title: "10. Intellectual Property",
      content: "All content on this website, including text, images, logos, graphics, and software, is the property of Steel Furniture and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or use any content without our prior written permission."
    },
    {
      title: "11. Modifications to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the new terms."
    },
    {
      title: "12. Governing Law",
      content: "These Terms and Conditions shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Karachi, Pakistan."
    },
    {
      title: "13. Contact Information",
      content: "For any questions or concerns regarding these Terms and Conditions, please contact us at:\n\nEmail: info@steelfurniture.com\nPhone: +92 3333039913\nAddress: Baldia Town, Karachi, Pakistan"
    }
  ];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Terms and Conditions</h1>
        
        <div className="bg-gradient-to-tl from-gray-100 to-gray-200 rounded-lg p-6 sm:p-8 mb-12">
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Last updated: February 2026. Please read these Terms and Conditions carefully before using our website or purchasing our products.
          </p>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{section.title}</span>
                  <span className={`transform transition-transform duration-200 ${openSection === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Acceptance</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            By using our website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please discontinue use of our website and services.
          </p>
        </div>
      </main>
    </div>
  );
}
