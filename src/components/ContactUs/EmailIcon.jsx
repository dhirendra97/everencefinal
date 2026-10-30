"use client";

import React from "react";
import { FiMail } from "react-icons/fi";

const EmailIcon = () => {
  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "mailto:info@everence.io";
    } else {
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=info@everence.io", "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer group relative flex items-center justify-center
        sm:fixed sm:top-[35vh] sm:right-4 sm:z-[999]
      "
    >
      <div className="
          absolute right-[50px] top-1/2 -translate-y-1/2
          bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium
          whitespace-nowrap opacity-0 translate-x-4
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-300 shadow-lg hidden sm:block
        ">
        Email Us
      </div>

      {/* ✅ Solid Orange Circle */}
      <div className="relative w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] bg-orange-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300">
        <FiMail className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-white" />
      </div>
    </div>
  );
};

export default EmailIcon;