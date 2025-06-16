"use client"
import React, { useState } from "react";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("Searching for:", query);
    // Add actual search logic here
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-5 px-3">
      <input type="text" className="w-full px-4 py-2 sm:py-3 pr-24 rounded-[2rem] border border-gray-300 focus:outline-none bg-white hover:bg-[#eeeded]" placeholder="Search..." value={query} onChange={handleChange} onKeyDown={handleKeyDown}/>
      <button onClick={handleSearch} className="shake-on-hover absolute right-[1.1rem] sm:right-4 top-1 bottom-1 px-3 sm:px-5 bg-[#ea580c] hover:bg-[#ea5a0cd1] text-white rounded-[2rem]">Search</button>
    </div>
  );
};

export default SearchBox;
