import AboutUsSection from "@/components/about/AboutUsSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – About us",
  description: "Fresh home-style tiffins, delivered daily. Learn about Tiffexx, our kitchen partners, and how it works.",
};

export default function AboutPage() {
  return (
    <>
      <AboutUsSection />
      <Footer />
    </>
  );
}
