'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { Truck, Clock, MapPin, Package, Shield } from 'lucide-react';

export default function ShippingDeliveryPage() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      title: "1. Shipping Coverage",
      content: "We deliver steel furniture across Pakistan to major cities and towns. Our shipping network covers:\n\n• Karachi, Lahore, Islamabad, Rawalpindi\n• Faisalabad, Multan, Peshawar, Quetta\n• Hyderabad, Sukkur, Gujranwala, Sialkot\n• And many other cities and towns\n\nFor remote areas, please contact customer service to confirm delivery availability."
    },
    {
      title: "2. Processing Time",
      content: "Order Processing:\n• In-stock items: 1-2 business days\n• Made-to-order items: 5-7 business days\n• Custom orders: 10-15 business days\n\nOrders are processed Monday through Saturday, excluding public holidays. Orders placed after 3:00 PM will be processed the next business day."
    },
    {
      title: "3. Delivery Time",
      content: "Estimated Delivery Times:\n• Karachi: 1-3 business days\n• Major cities (Lahore, Islamabad): 3-5 business days\n• Other cities: 5-7 business days\n• Remote areas: 7-10 business days\n\nNote: These are estimates and actual delivery may vary due to weather, traffic, or other unforeseen circumstances."
    },
    {
      title: "4. Shipping Charges",
      content: "Shipping Cost Calculation:\n• Orders above Rs. 50,000: FREE shipping\n• Orders below Rs. 50,000: Calculated at checkout\n• Large furniture items: May incur additional charges\n• Remote areas: Additional surcharges may apply\n\nShipping charges are based on order value, item size, weight, and delivery location."
    },
    {
      title: "5. Delivery Process",
      content: "Step 1: Order confirmation email/SMS\nStep 2: Order processing and quality check\nStep 3: Dispatch notification with tracking\nStep 4: Courier partner picks up the package\nStep 5: Out for delivery notification\nStep 6: Delivery and customer signature\n\nYou'll receive updates at each stage via email and SMS."
    },
    {
      title: "6. Tracking Your Order",
      content: "Once your order is dispatched, you'll receive:\n• Tracking number via email and SMS\n• Link to track your shipment online\n• Real-time updates on delivery status\n\nYou can also track your order by:\n• Logging into your account\n• Contacting customer service with order number\n• Using the tracking link provided"
    },
    {
      title: "7. Delivery Instructions",
      content: "To ensure smooth delivery:\n• Provide accurate and complete address\n• Include landmark and contact number\n• Ensure someone is available to receive the order\n• Inspect the package before signing\n• Note any visible damage on delivery receipt\n\nFor large items, ensure there's adequate access to your location."
    },
    {
      title: "8. Installation Service",
      content: "We offer installation services for select items:\n• Assembly available for wardrobes and cupboards\n• Professional installation team\n• Additional charges apply (varies by item)\n• Schedule installation during checkout or call customer service\n\nInstallation is available in major cities only."
    },
    {
      title: "9. Missed Deliveries",
      content: "If you miss a delivery:\n• Courier will attempt redelivery next day\n• Maximum 3 delivery attempts made\n• After failed attempts, package returns to warehouse\n• Reshipping charges may apply\n• Contact customer service to reschedule\n\nPlease ensure someone is available during delivery hours (9 AM - 6 PM)."
    },
    {
      title: "10. Damaged in Transit",
      content: "If your order arrives damaged:\n• Do not accept the delivery\n• Note damage on delivery receipt\n• Take photos of the damaged package\n• Contact us within 24 hours\n• We'll arrange replacement or refund\n\nAll shipments are insured. We handle claims with courier partners."
    },
    {
      title: "11. International Shipping",
      content: "Currently, we only ship within Pakistan. International shipping is not available at this time. We're working on expanding our delivery network globally. Please contact us for special requests or bulk orders."
    },
    {
      title: "12. Contact Information",
      content: "For shipping and delivery queries:\n\nEmail: shipping@steelfurniture.com\nPhone: +91 123456789\nWhatsApp: +91 123456789\nAddress: Baldia Town, Karachi, Pakistan\n\nCustomer Service: Monday - Saturday, 9:00 AM - 6:00 PM (PKT)"
    }
  ];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Shipping & Delivery</h1>
        
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On orders above Rs. 50,000</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">1-7 days depending on location</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Nationwide</h3>
            <p className="text-gray-600 text-sm">Delivery across Pakistan</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Shipping</h3>
            <p className="text-gray-600 text-sm">Fully insured deliveries</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8 mb-12">
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            We're committed to delivering your furniture safely and on time. Please review our shipping and delivery information to understand the process and timelines.
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

        {/* Delivery Map Placeholder */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Delivery Network</h2>
          <p className="text-gray-600 text-sm sm:text-base text-center mb-6">
            We deliver to all major cities and towns across Pakistan. Our growing network ensures your furniture reaches you safely and on time.
          </p>
          <div className="bg-white rounded-lg p-8 text-center">
            <Truck className="w-16 h-16 text-[#ea580c] mx-auto mb-4" />
            <p className="text-gray-600">Covering Karachi, Lahore, Islamabad, and 100+ cities nationwide</p>
          </div>
        </div>
      </main>
    </div>
  );
}
