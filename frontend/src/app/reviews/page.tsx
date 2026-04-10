'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addReview } from '@/utils/reviews';

export default function ReviewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    product: '',
    review: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add review to storage
    addReview({
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      product: formData.product || 'Not specified',
      review: formData.review
    });
    
    // Dispatch event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage'));
    }
    
    setSuccessMessage('Thank you! Your review has been submitted successfully.');
    setShowMessage(true);
    setFormData({ name: '', email: '', rating: 0, product: '', review: '' });

    setTimeout(() => {
      setShowMessage(false);
      router.push('/');
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
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Share Your Review</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8 mb-8">
            <p className="text-gray-600 text-center mb-6">
              We value your feedback! Please share your experience with our products to help us serve you better and help other customers make informed decisions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white"
                />
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Purchased</label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white"
                >
                  <option value="">Select a product (optional)</option>
                  <option value="3 Door Cupboard">3 Door Cupboard</option>
                  <option value="2 Door Cupboard">2 Door Cupboard</option>
                  <option value="Divider">Divider</option>
                  <option value="Wardrobe">Wardrobe</option>
                  <option value="Storage Cabinet">Storage Cabinet</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating *</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || formData.rating)
                            ? 'fill-[#ea580c] text-[#ea580c]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {formData.rating === 5 && 'Excellent!'}
                  {formData.rating === 4 && 'Very Good!'}
                  {formData.rating === 3 && 'Good'}
                  {formData.rating === 2 && 'Fair'}
                  {formData.rating === 1 && 'Poor'}
                  {formData.rating === 0 && 'Click to rate'}
                </p>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Share your experience with our product..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] bg-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
