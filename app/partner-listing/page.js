import { Suspense } from "react";
import PartnerListing from "@/components/partner/PartnerListing";

export const metadata = {
  title: "Kitchen Details · Tiffexx",
  description: "Freshly prepared daily home-style Thalis and daily tiffin plans from verified home kitchens. Wallet billing supported.",
};

export default function PartnerListingPage() {
  return (
    <Suspense fallback={null}>
      <PartnerListing />
    </Suspense>
  );
}
