import ReferralSection from "@/components/referral/ReferralSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Refer & earn",
  description: "Give ₹50, Get ₹50. Share your code with friends and earn ₹50 wallet credit when they order.",
};

export default function ReferPage() {
  return (
    <>
      <ReferralSection />
      <Footer />
    </>
  );
}
