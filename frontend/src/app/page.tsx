import Image from "next/image";
import SearchBox from "../components/search_button"
import cupboard_2 from "../../public/images/cupboard 2.png"
import cupboard_3 from "../../public/images/cupboard 3.png"
import ProductCard_1 from "../components/product_card_1";
import ProductCard_2 from "../components/product_card_2";
import Navbar_home from "@/components/navbar_home";
import Benifit from "@/components/benifit";
import Reviews from "@/components/reviews";

export default function Home() {
  return (
    <div>
    <div className='w-full h-[100vh] bg-gradient-to-r from-[#eff0f0] to-[#d9dbde] shadow-2xl'>
      <Navbar_home/>
      <div className="text-center leading-[1.5rem] sm:leading-[2.5rem] md:leading-[3.5rem] font-semibold p-1 md:p-10 pt-[5.6rem] sm:pt-4 md:pt-[8rem]">
        <div className="text-[1.3rem] sm:text-[2.1rem] md:text-[3rem]">Style Your Room</div>
        <div className="text-[1.8rem] sm:text-[2.8rem] md:text-[4.5rem]">Steel or Wood</div>
      </div>
      <div className="text-center mx-auto w-[15rem] sm:w-[19rem] md:w-[23rem] mt-[0.6rem] md:mt-[-1rem] text-[0.6rem] sm:text-[0.8rem]">I am a skilled craftsman in 2-feet steel cupboards and dividers, capable of creating every design with ease.</div>
      <SearchBox/>
      <div className="flex flex-col sm:flex-row justify-center px-3 sm:px-4 gap-4 sm:gap-10 md:gap-2 mt-[2rem] sm:mt-[3rem]">
        <div className="flex gap-2 md:gap-4 mx-auto md:mx-0">
          <ProductCard_1/>
          <Image src={cupboard_2} alt="cupboard" className="w-[9rem] h-[10rem] sm:w-[11rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] shadow-lg rounded-xl transition ease-in duration-300 hover:scale-105"></Image>
        </div>
        <div className="flex gap-2 md:gap-4 mx-auto md:mx-0">
          <Image src={cupboard_3} alt="cupboard" className="w-[8rem] h-[10rem] sm:w-[10rem] sm:h-[14rem] md:w-[13rem] md:h-[16rem] shadow-lg rounded-xl transition ease-in duration-300 hover:scale-105"></Image>
          <ProductCard_2/>
        </div>
      </div>
    </div>
    <Benifit/>
    <Reviews/>
    </div>
  );
}
