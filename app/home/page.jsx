// app/home/page.jsx
import Home from "@/pages/Home";
import Layout from "@/components/Layout";

export const metadata = {
  title: "Home | Everence",
  description: "Everence Home Page",
};

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}