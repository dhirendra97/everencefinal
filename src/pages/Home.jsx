// pages/Home.jsx
"use client";

import React, { memo, Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PopUpTimeOut from "../lib/PopUpTimeOut";
import Banner from "../components/HomePage/Banner/Banner";
import AbtCompany from "../components/HomePage/AbtCompany";
import SecurityMarquee from "../components/HomePage/SecurityMarquee";
import Services from "../components/HomePage/Services";
import WhyUs from "../components/HomePage/WhyUs";
import RealCaseStudies from "../components/HomePage/RealCaseStudies";
import ReachUsForm from "../components/ContactUs/ReachUsForm";
import HomeFAQ from "../components/HomePage/HomeFAQ";
import Certifications from "../components/HomePage/Certificates";
import IntroLanding from "./IntroLanding"; 

function HomeContent() {
  const [showPopup, setShowPopup] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // ✅ Check Cookie
    const hasSeenIntro = document.cookie.includes("hasSeenIntro=true");
    
    if (!hasSeenIntro) {
      setShowIntro(true); // Show Intro overlay
    } else {
      // Popup Logic (Only if direct visit)
      const fromIntro = sessionStorage.getItem("fromIntro");
      if (fromIntro === "true") {
        sessionStorage.removeItem("fromIntro");
      } else {
        const timer = setTimeout(() => setShowPopup(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false); 
  };

  return (
    <>
      {showIntro && <IntroLanding onComplete={handleIntroComplete} />}
      {showPopup && <PopUpTimeOut />}

      <Banner />
      <AbtCompany />
      <SecurityMarquee />
      <Services />
      <Certifications />
      <WhyUs />
      <RealCaseStudies />
      <ReachUsForm />
      <HomeFAQ />
    </>
  );
}

function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

export default memo(Home);