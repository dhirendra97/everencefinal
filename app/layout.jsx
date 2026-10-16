import "./globals.css";
import Script from "next/script";
import { campton, inter } from "@/lib/fonts";
import AutoReachUsPopup from "@/components/AutoReachUsPopup";

export const metadata = {
  metadataBase: new URL("https://www.everence.io"),

  title: {
    default: "Everence | Digital Forensics & Cyber Investigation Services",
    template: "%s | Everence",
  },

  description:
    "Everence provides digital forensics and cyber investigation services in India, helping organizations detect threats, investigate incidents, and protect critical business data.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "Everence",
    title: "Everence | Digital Forensics & Cyber Investigation Services",
    description:
      "Digital forensics and cyber investigation services helping organizations investigate incidents and protect critical business data.",
    url: "https://www.everence.io/",
    images: [
      {
        url: "/images/everence-og.jpg",
        width: 1200,
        height: 630,
        alt: "Everence Digital Forensics and Cyber Investigation Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Everence | Digital Forensics & Cyber Investigation Services",
    description:
      "Digital forensics and cyber investigation services in India.",
    images: ["/images/everence-og.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${campton.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}

        <AutoReachUsPopup />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YS3PWDCQF9"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YS3PWDCQF9');
          `}
        </Script>
      </body>
    </html>
  );
}