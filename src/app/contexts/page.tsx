"use client"
import React from 'react'
import { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
    id : string;
    name: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

type CartContextType = {
    cartItems : Product[];
    addToCart : (product : Product) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    calculateTotal: () => {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    finalTotal: number;
  };
}



const CartContext = createContext<CartContextType | undefined>(undefined);


export const Cart_Context = ({children} : { children : ReactNode}) => {

    const[cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
  setCartItems(prev => {
    const existingItem = prev.find(item => item.id === product.id);

    if (existingItem) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });
};

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const increaseQuantity = (id: string) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    )
  );
};

const decreaseQuantity = (id: string) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
        : item
    )
  );
};


const calculateTotal = () => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);
  const discount = totalItems > 10 ? subtotal * 0.2 : 0;
  const tax = totalItems * 100;
  const shipping = subtotal >= 70000 ? 0 : 1000;
  const finalTotal = subtotal - discount + tax + shipping;

  return {
    subtotal,
    discount,
    tax,
    shipping,
    finalTotal
  };
};

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotal}}>
        {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider")
    return context;
}

