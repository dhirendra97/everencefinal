// components/Layout.jsx
"use client"; // ✅ Add this for Next.js Client Component

import React, { useState } from "react";
import NavBar from "./HomePage/Navbar/NavBar";
import Footer from "./HomePage/Footer";
import ScrollToTop from "../lib/ScrollToTop";
import { MapContextProvider } from "../lib/MapContext";
import WhatsAppIcon from "./ContactUs/WhatsAppIcon";
import CallIcon from "./ContactUs/CallIcon";
import Emergency from "./ContactUs/Emergency";
import EmailIcon from "./ContactUs/EmailIcon";
import CookieBanner from "./CookieBanner";

export default function Layout({ children }) { // ✅ children prop use karein
  return (
    <div className="inset-0 w-full overflow-x-hidden md:overflow-visible">
      <MapContextProvider>
        <NavBar />
        <ScrollToTop />
        {children} {/* ✅ Yahan children render honge */}
        <Footer />
        <Emergency />
        <EmailIcon />
        <WhatsAppIcon />
        <CallIcon />
        <CookieBanner />
      </MapContextProvider>
    </div>
  );
}