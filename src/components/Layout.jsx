// components/Layout.jsx
"use client";

import React from "react";
import NavBar from "./HomePage/Navbar/NavBar";
import Footer from "./HomePage/Footer";
import ScrollToTop from "../lib/ScrollToTop";
import { MapContextProvider } from "../lib/MapContext";
import WhatsAppIcon from "./ContactUs/WhatsAppIcon";
import CallIcon from "./ContactUs/CallIcon";
import Emergency from "./ContactUs/Emergency";
import EmailIcon from "./ContactUs/EmailIcon";
import CookieBanner from "./CookieBanner";

export default function Layout({ children }) {
  return (
    <div className="inset-0 w-full overflow-x-hidden md:overflow-visible">
      <MapContextProvider>
        <NavBar />
        <ScrollToTop />
        {children}
        <Footer />
        
        {/* ✅ Social Icons Wrapper (Mobile Stacked, Desktop Original) */}
        <div className="
          fixed z-40 right-4 bottom-28 flex flex-col gap-4 
          sm:contents
        ">
          <Emergency />
          <EmailIcon />
          <CallIcon />
          <WhatsAppIcon />
        </div>

        <CookieBanner />
      </MapContextProvider>
    </div>
  );
}