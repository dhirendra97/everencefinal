"use client";

import React from "react";
import { FiPhoneCall } from "react-icons/fi"; // ✅ Icon import for clean look

const CallIcon = () => {
  const handleClick = () => {
    window.open("tel:9920314006");
  };

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer group relative flex items-center justify-center
        sm:fixed sm:top-[45vh] sm:right-4 sm:z-[999]
      "
    >
      <div className="
          absolute right-[50px] top-1/2 -translate-y-1/2
          bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-medium
          whitespace-nowrap opacity-0 translate-x-4
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-300 shadow-lg hidden sm:block
        ">
        Call Us
      </div>

      {/* ✅ Solid Blue Circle (No white background) */}
      <div className="relative w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] bg-blue-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
        <FiPhoneCall className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-white" />
      </div>
    </div>
  );
};

export default CallIcon;