import PartnerListing from "@/components/partner/PartnerListing";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Amma's Kitchen · Tiffexx",
  description: "Freshly prepared daily home-style North Indian Thali from Amma's Kitchen in Malviya Nagar, Noida. Wallet billing supported.",
};

export default function PartnerListingPage() {
  return (
    <>
      <PartnerListing />
      <Footer />
    </>
  );
}
