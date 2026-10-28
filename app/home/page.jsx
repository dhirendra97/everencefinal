// app/home/page.jsx
import Home from "@/pages/Home";

export const metadata = {
  title: "Digital Forensic & Cybersecurity Services Company in India",
  description:
    "Everence is a leading Digital Forensic and Cybersecurity Company in India, offering cyber investigations, incident response, compliance, due diligence, and risk management services.",
  alternates: {
    canonical: "https://www.everence.io/home", // ✅ URL /home
  },
  openGraph: {
    images: ["/images/everence-og.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}