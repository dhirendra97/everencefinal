"use client";

import React from "react";
import { SafeImage } from "../../lib/SafeImage";

const WhatsAppIcon = () => {
  const handleClick = () => {
    window.open("https://wa.me/9920314006", "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer group
        sm:fixed sm:top-[55vh] sm:right-6 sm:z-40
      "
    >
      <div className="
          absolute right-[50px] top-1/2 -translate-y-1/2
          bg-[#25D366] text-white px-2 py-1 rounded-lg text-sm font-medium
          whitespace-nowrap opacity-0 translate-x-4
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-300 shadow-lg hidden sm:block
        ">
        Chat on WhatsApp
      </div>

      <div className="rounded-full hover:scale-110 transition-transform">
        <SafeImage src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-[34px] h-[34px] md:w-[38px] md:h-[38px]" />
      </div>
    </div>
  );
};

export default WhatsAppIcon;