'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { Package, RefreshCcw, CheckCircle, AlertCircle, X, Upload } from 'lucide-react';

function ReturnFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 3000);
  };

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
                <RefreshCcw className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Return Product</h2>
                <p className="text-sm opacity-90">Fill in the details below to submit your return request</p>
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
          {formSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Return Request Submitted!</h3>
              <p className="text-gray-600">We&apos;ll review your request and contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Number *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    placeholder="e.g., ORD-12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  placeholder="Enter the product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Return Reason *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                >
                  <option value="">Select a reason</option>
                  <option value="defective">Defective/Damaged Product</option>
                  <option value="wrong">Wrong Item Delivered</option>
                  <option value="not-matching">Product Not Matching Description</option>
                  <option value="change-mind">Changed My Mind</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Return Type *</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="returnType" value="refund" className="accent-[#ea580c]" required />
                    <span className="text-gray-700">Refund</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="returnType" value="exchange" className="accent-[#ea580c]" />
                    <span className="text-gray-700">Exchange</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c] resize-none"
                  placeholder="Please describe the issue in detail..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photos (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#ea580c] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 rounded-lg transition-colors text-lg"
              >
                Submit Return Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReturnsExchangePage() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const sections = [
    {
      title: "1. Return Policy Overview",
      content: "We want you to be completely satisfied with your purchase. If you're not entirely happy with your order, we accept returns within 7 days of delivery. The product must be in its original condition with all packaging, tags, and accessories intact."
    },
    {
      title: "2. Eligible Items for Return",
      content: "The following items can be returned:\n• Products with manufacturing defects\n• Wrong items delivered\n• Damaged products during shipping\n• Products not matching the description\n\nAll returned items must be unused, in original packaging, and include all original accessories and documentation."
    },
    {
      title: "3. Non-Returnable Items",
      content: "The following items cannot be returned or exchanged:\n• Custom-made or personalized furniture\n• Products that have been assembled or installed\n• Items damaged due to customer misuse\n• Products without original packaging\n• Clearance or sale items (unless defective)"
    },
    {
      title: "4. How to Initiate a Return",
      content: "Step 1: Contact our customer service team within 7 days of delivery\nStep 2: Provide your order number and reason for return\nStep 3: Share photos if the item is damaged or defective\nStep 4: Receive return authorization and instructions\nStep 5: Pack the item securely in original packaging\nStep 6: Ship the item back or schedule a pickup"
    },
    {
      title: "5. Return Shipping Costs",
      content: "• Defective or wrong items: We cover all return shipping costs\n• Change of mind: Customer is responsible for return shipping\n• Pickup service: Available for large items (charges may apply)\n\nWe recommend using a trackable shipping service as we cannot guarantee receipt of your returned item."
    },
    {
      title: "6. Exchange Policy",
      content: "Exchanges are accepted for:\n• Different color or size of the same product\n• Replacement of defective items\n\nTo exchange an item, follow the return process and place a new order for the desired item. Once we receive and inspect your return, we'll process your exchange.\n\nIf the exchange item is of higher value, you'll pay the difference. If it's lower value, we'll refund the difference."
    },
    {
      title: "7. Refund Process",
      content: "Once we receive and inspect your return:\n• Approval notification will be sent within 2-3 business days\n• Refunds are processed to the original payment method\n• Credit card refunds may take 5-10 business days to reflect\n• Cash on delivery refunds are processed via bank transfer\n\nNote: Original shipping charges are non-refundable unless the return is due to our error."
    },
    {
      title: "8. Damaged or Defective Items",
      content: "If you receive a damaged or defective item:\n• Contact us immediately upon delivery\n• Do not discard original packaging\n• Provide photos of the damage\n• We'll arrange pickup and send a replacement\n• All costs for defective items are covered by us\n\nWe thoroughly inspect all items before shipping, but occasionally damage occurs during transit."
    },
    {
      title: "9. Late or Missing Returns",
      content: "If your return is delayed:\n• Contact our customer service team\n• Provide tracking information if available\n• Returns received after 7 days may be refused\n• We reserve the right to deny returns that don't meet policy requirements"
    },
    {
      title: "10. Contact Information",
      content: "For returns and exchanges, contact us at:\n\nEmail: returns@steelfurniture.com\nPhone: +91 123456789\nAddress: Baldia Town, Karachi, Pakistan\n\nCustomer Service Hours: Monday - Saturday, 9:00 AM - 6:00 PM (PKT)"
    }
  ];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Returns & Exchange</h1>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCcw className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">7 Days Return</h3>
            <p className="text-gray-600 text-sm">Return within 7 days of delivery</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Original Condition</h3>
            <p className="text-gray-600 text-sm">Item must be unused with packaging</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Easy Process</h3>
            <p className="text-gray-600 text-sm">Simple and hassle-free returns</p>
          </div>
        </div>

        {/* Return Product Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowReturnModal(true)}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 px-10 rounded-lg transition-colors duration-300 text-lg"
          >
            Return Product
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8 mb-12">
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Our Returns & Exchange policy is designed to ensure your satisfaction. Please read the following information carefully to understand the process and requirements.
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

        {/* Important Notice */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-[#ea580c] flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Please inspect your order immediately upon delivery. Report any issues within 24 hours for faster resolution.
                Keeping the original packaging intact until you&apos;re satisfied with the product helps expedite any potential returns.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Return Form Modal */}
      <ReturnFormModal isOpen={showReturnModal} onClose={() => setShowReturnModal(false)} />
    </div>
  );
}
