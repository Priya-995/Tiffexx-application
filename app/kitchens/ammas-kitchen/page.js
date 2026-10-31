import { Suspense } from "react";
import PartnerListing from "@/components/partner/PartnerListing";
import { getKitchenBySlug } from "@/lib/kitchens";

export const metadata = {
  title: "Amma's Kitchen · Tiffexx",
  description: "Freshly prepared daily home-style South & North Indian Thalis from Amma's Kitchen. Wallet billing supported.",
};

export default function AmmasKitchenPage() {
  const kitchen = getKitchenBySlug("ammas-kitchen");
  return (
    <Suspense fallback={null}>
      <PartnerListing initialKitchen={kitchen} slug="ammas-kitchen" />
    </Suspense>
  );
}
