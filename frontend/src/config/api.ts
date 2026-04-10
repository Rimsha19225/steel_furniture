// Backend API Configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rimshaarshad-furniture.hf.space';
const API_BASE_URL = `${BACKEND_URL}/api`;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  PROFILE: `${API_BASE_URL}/auth/profile`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT: (id: string) => `${API_BASE_URL}/products/${id}`,
  
  // Reviews
  REVIEWS: `${API_BASE_URL}/reviews`,
  PRODUCT_REVIEWS: (productId: string) => `${API_BASE_URL}/reviews/product/${productId}`,
  
  // Cart
  CART: (userId: string) => `${API_BASE_URL}/cart/${userId}`,
  CART_ADD: `${API_BASE_URL}/cart/add`,
  CART_UPDATE: `${API_BASE_URL}/cart/update`,
  CART_REMOVE: (productId: string, userId: string) => `${API_BASE_URL}/cart/remove/${productId}?userId=${userId}`,
  CART_CLEAR: (userId: string) => `${API_BASE_URL}/cart/clear/${userId}`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER: (id: string) => `${API_BASE_URL}/orders/${id}`,
  ORDERS_BY_USER: (userId: string) => `${API_BASE_URL}/orders/user/${userId}`,
  ORDER_CREATE: `${API_BASE_URL}/orders/create`,
  ORDER_CANCEL: (id: string) => `${API_BASE_URL}/orders/${id}/cancel`,
};

export default API_BASE_URL;
