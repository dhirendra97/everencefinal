// app/pramod-prabhakar/page.jsx
import PramodPrabhakar from "@/pages/PramodPrabhakar";

export const metadata = {
  title: "Pramod Prabhakar | Founder & Director | Certified Fraud Examiner | Everence",
  description:
    "Pramod Prabhakar is Founder & Director at Everence and a Certified Fraud Examiner specializing in fraud investigations, forensic analysis, corporate risk consulting, investment risk advisory, and litigation support.",
  // ✅ Removed keywords
  alternates: {
    canonical: "https://www.everence.io/pramod-prabhakar",
  },
  openGraph: {
    type: "profile",
    title: "Pramod Prabhakar | Founder & Director | Everence",
    description: "Certified Fraud Examiner and corporate risk consultant at Everence.",
    url: "https://www.everence.io/pramod-prabhakar",
    images: ["https://www.everence.io/homebg/pramod-prabhakar.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.everence.io/pramod-prabhakar",
      url: "https://www.everence.io/pramod-prabhakar",
      name: "Pramod Prabhakar | Founder & Director at Everence",
      mainEntity: { "@id": "https://www.everence.io/pramod-prabhakar#person" },
    },
    {
      "@type": "Person",
      "@id": "https://www.everence.io/pramod-prabhakar#person",
      name: "Pramod Prabhakar",
      jobTitle: "Founder & Director | Certified Fraud Examiner",
      worksFor: { "@type": "Organization", name: "Everence", url: "https://www.everence.io/" },
      sameAs: ["https://in.linkedin.com/in/pramodprabhakar1"],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PramodPrabhakar />
    </>
  );
}