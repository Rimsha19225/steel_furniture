'use client';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';
import { getReviews, getReviewCount } from '@/utils/reviews';
import { useEffect, useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  product: string;
  review: string;
  date: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const loadReviews = () => {
    const loadedReviews = getReviews();
    setReviews(loadedReviews.slice(0, 4));
    setReviewCount(getReviewCount());
  };

  useEffect(() => {
    loadReviews();
    
    // Listen for storage events to refresh reviews
    const handleStorageChange = () => {
      loadReviews();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="w-[95%] sm:w-[85%] mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-[2rem] sm:text-[2.3rem] text-[#ea580c] font-bold mb-3">Customer Reviews</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-2">See what our satisfied customers have to say about our products</p>
        <p className="text-[#ea580c] font-semibold text-lg">
          Total {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'} show latest 4
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="w-6 h-6 text-[#ea580c]" />
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? 'fill-[#ea580c] text-[#ea580c]' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
              {review.review}
            </p>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.product}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          href="/reviews"
          className="inline-block bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          Drop Your Review
        </Link>
      </div>
    </div>
  );
}
