'use client';
import Navbar from '@/components/navbar';
import { useCart } from '../contexts/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const subtotal = cartItems.reduce((acc: number, item: Product) => {
    const qty = item.quantity ?? 1;
    return acc + item.price * qty;
  }, 0);

  const totalTax = cartItems.reduce((acc: number, item: Product) => {
    const qty = item.quantity ?? 1;
    return acc + 100 * qty;
  }, 0);

  const shipping = subtotal >= 70000 ? 0 : 1000;

  const handleProceedToCheckout = () => {
    setShowMessage(true);
    setTimeout(() => {
      router.push('/checkout');
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white py-10 pt-[8.5rem]">
        <h1 className="text-3xl font-bold text-center text-[#ea580c] mb-10">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>

          <div className="w-[95%] sm:w-[90%] mx-auto bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] p-4 rounded shadow mb-6">
          <p className="text-sm font-medium mb-2 text-gray-700">
            You&apos;re {70000 - subtotal > 0 ? `PKR ${70000 - subtotal} away from FREE SHIPPING!` : 'eligible for FREE SHIPPING!'}
          </p>
          <div className="w-full h-3 bg-gray-300 rounded-full">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 70000) * 100)}%` }}
            ></div>
          </div>
        </div>


          <div className="w-[95%] sm:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2 flex flex-col gap-6">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-[#eff0f0] to-[#d9dbde] rounded-lg shadow p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition ease-in duration-300 hover:scale-102"
                >
                  <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={70} height={10} className="rounded object-cover w-[4.5rem] h-[6rem]" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">Price: PKR {item.price}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 mt-2">
                    <div>
                      <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded text-lg">−</button>
                      <span className="px-2">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded text-lg">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="shake-on-hover bg-[#ea580c] hover:bg-red-600 text-white px-4 py-1 rounded transition">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#eff0f0] to-[#d9dbde] rounded shadow p-6 h-fit">
              <h2 className="text-xl font-bold text-[#ea580c] mb-4">Summary</h2>
              {(() => {
              const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);
              const discount = totalItems > 10 ? subtotal * 0.2 : 0;
              const finalTotal = subtotal - discount + totalTax + shipping;

              return (
                <div className="space-y-2">
                  <div className='flex justify-between'>
                    <div>Subtotal:</div>
                    <div className="font-semibold">{subtotal.toLocaleString()} PKR</div>
                  </div>
                  <div className='flex justify-between'>
                    <div>Tax (100 PKR/item):</div>
                    <div className="font-semibold">{totalTax.toLocaleString()} PKR</div>
                  </div>
                  <div className='flex justify-between'>
                    <div>Shipping:</div>
                    <div className="font-semibold">{shipping === 0 ? 'Free' : `${shipping} PKR`}</div>
                  </div>
                  <div className='flex justify-between'>
                    <div>Discount ({totalItems > 10 ? '20%' : '0%'}):</div>
                    <div className="font-semibold text-green-600">- {discount.toLocaleString()} PKR</div>
                  </div>
                  <hr />
                  <div className='flex justify-between'>
                    <div>Total:({totalItems > 10 ? '20%' : '0%'}):</div>
                    <div className="font-semibold">{finalTotal.toLocaleString()} PKR</div>
                  </div>
                  <button
                    onClick={handleProceedToCheckout}
                    className="mt-4 w-full bg-[#ea580c] hover:bg-green-600 text-white px-6 py-2 rounded"
                  >
                    Proceed to Checkout
                  </button>
                  {showMessage && (
                    <p className="mt-2 text-green-600 font-medium transition-opacity">Successfully proceeded to checkout!</p>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
