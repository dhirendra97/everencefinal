// app/industries/page.jsx
import Industries from "@/pages/Industries";

export const metadata = {
  title: "Industries We Serve", // ✅ Space removed
  description:
    "Discover how Everence helps organizations across industries with digital forensics, cyber security, fraud investigations, compliance, incident response, and risk management services.",
  alternates: {
    canonical: "https://www.everence.io/industries", // ✅ No trailing slash
  },
  openGraph: {
    images: ["/images/everence-og.jpg"], // ✅ Added OG Image
  },
};

export default function Page() {
  return <Industries />;
}