// pages/Home.jsx
"use client";

import React, { memo } from "react";
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

function Home() {
  const searchParams = useSearchParams();
  const isFromIntro = searchParams.get("intro") === "true";

  return (
    <>
      {/* ✅ Popup SIRF tab dikhega jab user Intro se na aaya ho */}
      {!isFromIntro && <PopUpTimeOut />}

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

export default memo(Home);