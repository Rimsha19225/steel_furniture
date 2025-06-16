import React from 'react'
import Image from 'next/image'
import shipping from "../../public/images/shipping.png"
import returns from "../../public/images/return.png"
import consultation from "../../public/images/consultation.png"

const Benifit = () => {
  return (
    <div className="w-[85%] mx-auto">
      <div className='text-[#f75a05] text-[1rem] sm:text-[1.25rem] font-semibold mt-[5rem]'>Benifit</div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-between items-center bg-gradient-to-tl from-[#eff0f0] to-[#e5e7ea] p-4 rounded-2xl mt-6 shadow-xl">
        <div className="w-full sm:w-[35%] text-[2.5rem] sm:text-[3rem] leading-[2.4rem] sm:leading-12 font-semibold">Your One Step Shop for furniture</div>
        <div className="w-full sm:w-[60%] text-[0.8rem] sm:text-[1rem] bg-gradient-to-br from-[#eff0f0] to-[#e5e7ea] p-2 rounded-2xl transition ease-in duration-300 hover:scale-102 shad">Our stylish cupboards and dividers not only provide practical storage but also enhance your home décor. With durable materials and smart designs, they bring both elegance and functionality to any room, making organization simple and beautiful.</div>
      </div>
      <div className='flex flex-col sm:flex-row gap-8 mt-[3.5rem] mb-[1.5rem] w-full'>
        <div className='w-full sm:w-[50%] p-4 rounded-xl bg-[#f75a05] hover:bg-[#ea5a0ceb] transition ease-in duration-300 hover:scale-102'>
            <div><Image src={shipping} alt="shipping" className='shake-on-hover w-[4rem] h-[2.5rem]  mt-[0.5rem] mb-3 sm:mb-6'></Image></div>
            <div className='text-[1.2rem] sm:text-[1.4rem] font-normal mb-2 text-gray-700'>Free Shipping</div>
            <div className='text-[0.6rem] sm:text-[0.9rem] text-gray-700'>Enjoy hassle-free shopping with fast, reliable delivery at no extra cost. Your order ships free, every time no minimum required!</div>
        </div>
        <div className='w-full sm:w-[50%] p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition ease-in duration-300 hover:scale-102'>
            <div><Image src={returns} alt="returns" className='shake-on-hover w-[3rem] h-[3rem] mb-3 sm:mb-6'></Image></div>
            <div className='text-[1.2rem] sm:text-[1.4rem] font-normal mb-2'>Free Returns</div>
            <div className='text-[0.6rem] sm:text-[0.9rem]'>Shop confidently knowing you can return any item for free. No stress, no fees just easy, risk-free shopping every time.</div>
        </div>
        <div className='w-full sm:w-[50%] p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition ease-in duration-300 hover:scale-102'>
            <div><Image src={consultation} alt="consultation" className='shake-on-hover w-[3rem] h-[3rem] mb-3 sm:mb-6'></Image></div>
            <div className='text-[1.2rem] sm:text-[1.4rem] font-normal mb-2'>Design Consultation</div>
            <div className='text-[0.6rem] sm:text-[0.9rem]'>Bring your ideas to life with our free expert design consultation. Personalized guidance to help you create something truly unique.</div>
        </div>
      </div>
    </div>
  )
}

export default Benifit