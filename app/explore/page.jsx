// app/explore/page.jsx
import IntroLanding from "@/pages/IntroLanding";

export const metadata = {
  title: "Welcome to Everence",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <IntroLanding />;
}