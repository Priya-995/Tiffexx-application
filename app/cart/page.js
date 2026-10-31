import CartFlow from "@/components/cart/CartFlow";

export const metadata = {
  title: "Tiffexx â€“ Cart",
  description: "Review your meal plan, confirm your delivery address, and complete your order with Tiffexx.",
};

export default function CartPage() {
  return (
    <>
      <CartFlow />
    </>
  );
}
