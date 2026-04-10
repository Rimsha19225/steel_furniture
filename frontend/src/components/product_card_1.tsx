"use client";
import Image from "next/image";
import cupboard from "../../public/images/cupboard 1.png";
import { motion } from "framer-motion";

export default function ProductCardTop() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 md:gap-4 px-3 py-2 sm:px-0 sm:py-0 p-0 sm:p-4 rounded-2xl bg-gray-200 hover:bg-gray-100 shadow-md w-[8rem] h-[6rem] sm:w-[12rem] sm:h-[7rem] md:w-[17rem] md:h-[7rem] mt-[4rem] sm:mt-[7rem] md:mt-[8.5rem] transition ease-in duration-300 hover:scale-105"
    >
      <div className="hidden sm:flex w-24 h-24 rounded-xl overflow-hidden bg-gray-200">
        <Image src={cupboard} alt="cupboard" className="shake-on-hover object-cover w-[90%] h-[90%] mx-auto mt-2"/>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-[1rem] sm:text-lg font-semibold text-gray-900">3 Door</h3>
        <p className="text-[0.6rem] sm:text-[0.7rem] text-gray-400">Simple and easy fit in your cozy room.</p>
        <div className="flex items-center mt-2 space-x-2">
          <span className="shake-on-hover w-4 h-4 rounded-full border-2 border-gray-400 bg-white" />
          <span className="shake-on-hover w-4 h-4 rounded-full border-2 border-black bg-black" />
          <span className="shake-on-hover w-4 h-4 rounded-full border-2 border-gray-300 bg-gray-300" />
        </div>
      </div>
    </motion.div>
  );
}
