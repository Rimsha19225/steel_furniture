'use client';

export interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  product: string;
  review: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    rating: 5,
    product: '3 Door Cupboard',
    review: 'Excellent quality! The cupboard is very sturdy and looks amazing in my bedroom. Delivery was prompt and the installation was smooth.',
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Fatima Ali',
    email: 'fatima@example.com',
    rating: 5,
    product: '2 Door Cupboard',
    review: 'Perfect for my small apartment. The size is just right and the finish is beautiful. Highly recommend this product!',
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Hassan Raza',
    email: 'hassan@example.com',
    rating: 4,
    product: 'Divider',
    review: 'Great product for separating spaces. Good quality steel and elegant design. Would have given 5 stars if delivery was faster.',
    date: '3 weeks ago'
  },
  {
    id: 4,
    name: 'Ayesha Malik',
    email: 'ayesha@example.com',
    rating: 5,
    product: 'Wardrobe',
    review: 'Absolutely love my new wardrobe! The storage space is amazing and it matches perfectly with my room decor. Worth every penny!',
    date: '1 week ago'
  },
];

export function getReviews(): Review[] {
  if (typeof window === 'undefined') return initialReviews;
  
  const stored = localStorage.getItem('reviews');
  if (stored) {
    return JSON.parse(stored);
  }
  return initialReviews;
}

export function addReview(review: Omit<Review, 'id' | 'date'>): Review {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: Date.now(),
    date: 'Just now'
  };
  
  const updatedReviews = [newReview, ...reviews];
  localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  
  return newReview;
}

export function getReviewCount(): number {
  return getReviews().length;
}
