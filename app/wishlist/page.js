import WishlistSection from "@/components/wishlist/WishlistSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Wishlist – Tiffexx",
  description: "View and manage your saved home-cooked tiffins and explore curated meal plans on Tiffexx.",
};

export default function WishlistPage() {
  return (
    <>
      <main>
        <WishlistSection />
      </main>
      <Footer className="footer--no-margin" />
    </>
  );
}
