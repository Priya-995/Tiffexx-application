import WishlistSection from "@/components/wishlist/WishlistSection";

export const metadata = {
  title: "Wishlist â€“ Tiffexx",
  description: "View and manage your saved home-cooked tiffins and explore curated meal plans on Tiffexx.",
};

export default function WishlistPage() {
  return (
    <>
      <main>
        <WishlistSection />
      </main>
    </>
  );
}
