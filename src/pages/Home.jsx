// pages/Home.jsx
"use client";

import React, { memo, Suspense } from "react";
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


function HomeContent() {
  const searchParams = useSearchParams();
  const isFromIntro = searchParams.get("intro") === "true";

  return (
    <>
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

function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

export default memo(Home);