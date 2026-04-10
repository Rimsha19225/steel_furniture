'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { CheckCircle, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('Thank you! Your message has been sent successfully.');
    setShowMessage(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar />
      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white w-[30%] h-[30%] text-green-700 font-semibold border border-green-300 px-6 py-4 rounded shadow-lg flex items-center gap-2 text-center pointer-events-auto animate-fade-in-out">
            <CheckCircle className="w-[30%] h-[30%] text-green-600 animate-bounce" />
            <div className='w-full text-[1.5rem]'>{successMessage}</div>
          </div>
        </div>
      )}
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-gradient-to-tl from-gray-200 to-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#ea580c] p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Location</h3>
                  <p className="text-gray-600">xyz area</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#ea580c] p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">+92 3333333333</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#ea580c] p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">info@steelfurniture.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-tl from-gray-200 to-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gradient-to-tl from-gray-200 to-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Our Location</h2>
          <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116688.5!2d67.1833!3d24.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bab%3A0x9f024000000000!2sBaldia%20Town%2C%20Karachi!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
