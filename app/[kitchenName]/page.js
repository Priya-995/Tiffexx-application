import { Suspense } from "react";
import PartnerListing from "@/components/partner/PartnerListing";
import { getKitchenBySlug, KITCHENS_DATA } from "@/lib/kitchens";

export async function generateStaticParams() {
  return KITCHENS_DATA.map((k) => ({
    kitchenName: k.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { kitchenName } = await params;
  const kitchen = getKitchenBySlug(kitchenName);
  return {
    title: `${kitchen.name} · Tiffexx`,
    description: kitchen.description,
  };
}

export default async function DynamicKitchenPage({ params }) {
  const { kitchenName } = await params;
  const kitchen = getKitchenBySlug(kitchenName);

  return (
    <Suspense fallback={null}>
      <PartnerListing initialKitchen={kitchen} slug={kitchenName} />
    </Suspense>
  );
}

