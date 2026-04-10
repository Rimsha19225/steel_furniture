// "use client"
// import React from 'react'
// import { useCart } from "../app/context/page"

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image?: string;
//   description?: string;
// }

// const Cart_button = ({product}: {product: Product}) => {
//   const { addToCart } = useCart()
  
//   return (
//     <div>
//         <button onClick={() => addToCart(product)} className="absolute top-[43%] left-1/2 transform -translate-x-1/2 bg-[#ea580c] text-white py-2 px-6 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//             Add to Cart
//         </button>
//         <button className="absolute top-[57%] left-1/2 transform -translate-x-1/2 bg-[#ea580c] text-white py-2 px-6 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//             See Detail
//         </button>
//     </div>
//   )
// }

// export default Cart_button