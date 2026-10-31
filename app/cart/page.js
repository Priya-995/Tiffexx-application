import { Suspense } from "react";
import CartFlow from "@/components/cart/CartFlow";

export const metadata = {
  title: "Tiffexx – Cart",
  description: "Review your meal plan, confirm your delivery address, and complete your order with Tiffexx.",
};

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartFlow />
    </Suspense>
  );
}
