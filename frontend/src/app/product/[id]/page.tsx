'use client';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import { useCart } from '../../contexts/page';
import { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

interface Product {
  id: string;
  name: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
  colors?: string[];
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  const { addToCart } = useCart();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = params?.id as string;
        const res = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const foundProduct = await res.json();
        if (foundProduct) {
          const productData = {
            ...foundProduct,
            price: Number(foundProduct.price) || 0
          };
          setProduct(productData);

          // Parse colors - could be string, array, or undefined
          let colors: string[] = ['#ffffff'];
          if (foundProduct.colors) {
            if (typeof foundProduct.colors === 'string') {
              try {
                const parsed = JSON.parse(foundProduct.colors);
                colors = Array.isArray(parsed) && parsed.length > 0 ? parsed : ['#ffffff'];
              } catch {
                colors = ['#ffffff'];
              }
            } else if (Array.isArray(foundProduct.colors) && foundProduct.colors.length > 0) {
              colors = foundProduct.colors;
            }
          }
          setAvailableColors(colors);
          setSelectedColor(colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params]);

  const handleAddToCart = () => {
    if (product) {
      const productWithColor = {
        ...product,
        selectedColor: selectedColor
      };
      addToCart(productWithColor);
      setSuccessMessage(`${product.name} successfully added to cart!`);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleBack = () => {
    router.push('/product');
  };


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={handleBack}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[70%] mx-auto pt-[6.5rem] sm:pt-[9.5rem] pb-[4rem]">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#ea580c] hover:underline mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-2xl p-6 flex items-center justify-center">
            {product.image && (
              <Image
                src={product.image.startsWith('/') ? `${API_BASE_URL}${product.image}` : product.image}
                alt={product.name}
                className="w-full h-[25rem] object-contain"
                width={500}
                height={500}
              />
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-[2rem] font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.title}</p>
            <p className="text-[2rem] font-bold text-[#ea580c] mb-6">${product.price.toFixed(2)}</p>

            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-[#ea580c] scale-110 shadow-lg'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-4 rounded-xl transition-colors text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white w-[30%] h-[30%] text-green-700 font-semibold border border-green-300 px-6 py-4 rounded shadow-lg flex items-center gap-2 text-center pointer-events-auto animate-fade-in-out">
              <CheckCircle className="w-[30%] h-[30%] text-green-600 animate-bounce" />
              <div className='w-full text-[1.5rem]'>{successMessage}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
