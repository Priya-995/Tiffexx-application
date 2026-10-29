import PrivacyPolicySection from "@/components/privacy/PrivacyPolicySection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy – Tiffexx",
  description:
    "Tiffexx Privacy Policy published in accordance with the Digital Personal Data Protection Act, 2023 and the Information Technology Rules, 2011.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicySection />
      <Footer />
    </>
  );
}
