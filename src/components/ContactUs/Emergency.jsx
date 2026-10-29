"use client";

import React from "react";
import { useRouter } from "next/navigation";

const EmergencyIcon = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/emergency")}
      className="
        cursor-pointer group
        sm:fixed sm:top-[25vh] sm:right-6 sm:z-40
      "
    >
      <div className="
          absolute right-[44px] top-1/2 -translate-y-1/2
          bg-[#db4618] text-white px-2 py-1 rounded-lg text-sm font-semibold
          whitespace-nowrap opacity-0 translate-x-4
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-300 shadow-lg hidden sm:block
        ">
        Emergency
      </div>

      <div className="relative w-[34px] h-[34px] hover:scale-110 transition-transform shadow-md rounded-full">
        <svg viewBox="0 0 48 48" className="w-[34px] h-[34px] md:w-[30px] md:h-[30px]" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#db4618" />
          <path d="M32.5 29.5c-1.5 0-3-.2-4.4-.7-.7-.2-1.5 0-2 .5l-2.8 2.1c-3.4-1.8-6.2-4.6-8-8l2.1-2.8c.5-.6.7-1.3.5-2-.4-1.4-.7-2.9-.7-4.4A1.5 1.5 0 0015.7 13h-4A1.7 1.7 0 0010 14.7C10 27.6 20.4 38 33.3 38c.9 0 1.7-.7 1.7-1.7v-4a1.5 1.5 0 00-1.5-1.5z" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
};

export default EmergencyIcon;