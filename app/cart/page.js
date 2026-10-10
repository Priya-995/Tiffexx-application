import CartFlow from "@/components/cart/CartFlow";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Tiffexx – Cart",
  description: "Review your meal plan, confirm your delivery address, and complete your order with Tiffexx.",
};

export default function CartPage() {
  return (
    <>
      <CartFlow />
      <Footer />
    </>
  );
}
