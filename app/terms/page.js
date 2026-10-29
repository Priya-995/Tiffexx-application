import TermsOfServiceSection from "@/components/terms/TermsOfServiceSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Service – Tiffexx",
  description:
    "Tiffexx Terms of Service governing the use of the platform for customers, kitchen partners, and delivery partners.",
};

export default function TermsPage() {
  return (
    <>
      <TermsOfServiceSection />
      <Footer />
    </>
  );
}
