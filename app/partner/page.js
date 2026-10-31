import { Suspense } from "react";
import PartnerListing from "@/components/partner/PartnerListing";

export const metadata = {
  title: "Partner Listing · Tiffexx",
  description: "Freshly prepared daily home-style Thalis from verified partner home kitchens. Wallet billing supported.",
};

export default function PartnerPage() {
  return (
    <Suspense fallback={null}>
      <PartnerListing />
    </Suspense>
  );
}
