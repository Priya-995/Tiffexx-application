import { Suspense } from "react";
import PartnerListing from "@/components/partner/PartnerListing";
import { getKitchenBySlug, KITCHENS_DATA } from "@/lib/kitchens";

export async function generateStaticParams() {
  return KITCHENS_DATA.map((k) => ({
    slug: k.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const kitchen = getKitchenBySlug(slug);
  return {
    title: `${kitchen.name} · Tiffexx`,
    description: kitchen.description,
  };
}

export default async function KitchenSubPage({ params }) {
  const { slug } = await params;
  const kitchen = getKitchenBySlug(slug);

  return (
    <Suspense fallback={null}>
      <PartnerListing initialKitchen={kitchen} slug={slug} />
    </Suspense>
  );
}

