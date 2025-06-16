'use client';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import { useCart } from '../app/contexts/page';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  title: string;
  price: number;
  image: string;
  quantity: number
  description?: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setSuccessMessage(`${product.name} successfully added to cart!`);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div>
        <Navbar/>
    <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem]">
      <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Products</h1>
      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white w-[30%] h-[30%] text-green-700 font-semibold border border-green-300 px-6 py-4 rounded shadow-lg flex items-center gap-2 text-center pointer-events-auto animate-fade-in-out">
            <CheckCircle className="w-[30%] h-[30%] text-green-600 animate-bounce" />
            <div className='w-full text-[1.5rem]'>{successMessage}</div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {products.map(product => (
          <div key={product.id} className="group relative w-[100%] bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg shadow-lg overflow-hidden p-2 sm:p-4 hover:opacity-60 transition-opacity duration-300 ease-in  hover:scale-102">
            {product.image && (
                <Image src={product.image} alt={product.name} className="w-full h-28 sm:h-60 object-cover rounded mb-4" width={300} height={500}/>
            )}
            <h2 className="text-[1rem] sm:text-xl font-semibold mb-1 sm:mb-2">{product.name}</h2>
            <p className="text-[0.7rem] sm:text-[1rem] text-gray-600 mb-1 sm:mb-2">{product.description || "This is a great product!"}</p>
            <p className="text-lg font-bold text-[#ea580c] mb-0 sm:mb2">${product.price}</p>
            <div>
              <button onClick={() => handleAddToCart(product)} className="absolute top-[43%] left-1/2 transform -translate-x-1/2 bg-[#ea580c] text-white py-2 px-6 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                Add to Cart
              </button>
              <button className="absolute top-[57%] left-1/2 transform -translate-x-1/2 bg-[#ea580c] text-white py-2 px-6 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                See Detail
              </button>
            </div>
          </div>

        ))}
      </div>
    </main>
    </div>
  );
}
