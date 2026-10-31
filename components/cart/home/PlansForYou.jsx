"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { plansForYou } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";
import { getInitialCart, saveCart } from "@/lib/cart";
import PlanCard from "@/components/ui/PlanCard";

export default function PlansForYou({ title, subtitle, showSeeAll = true, onToast }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const headingText =
    title || (isLoggedIn ? "Subscription plans for you" : "Plans for You");
  const subText =
    subtitle ||
    (isLoggedIn
      ? "Daily tiffin on autopilot, picked from kitchens you've ordered from"
      : "Daily tiffin on autopilot, freshly curated from top kitchens");

  const handleAddToCart = (plan) => {
    const currentCart = getInitialCart();
    const items = [...(currentCart.items || [])];
    const planName = plan.title || plan.name || "Lunch Plan";
    const existingIndex = items.findIndex((x) => String(x.id) === String(plan.id));

    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: plan.id,
        name: planName,
        tag: "Plan",
        sub: plan.descBold ? `${plan.descBold} ${plan.descLight || ""}` : "Daily home-style tiffin",
        perDay: plan.price || 89,
        qty: 1,
        kitchen: plan.kitchen || "Perfect Kitchen",
        liked: true,
      });
    }

    saveCart({ ...currentCart, items });
    router.push("/cart?checkout=true");
  };

  const handleToggleFav = (plan) => {
    const isNowSaved = toggleWishlist({
      id: plan.id,
      name: plan.title || plan.name,
      title: plan.title || plan.name,
      price: plan.price,
      wasPrice: plan.wasPrice || 109,
      kitchen: plan.kitchen,
      descBold: plan.descBold || "Special Thali  ",
      descLight: plan.descLight || "(Dali ,Sabji & 4 Roti )",
      rating: plan.rating || "4.2",
      veg: plan.veg,
      badge: plan.badge || "Top Rated",
      mealType: plan.mealType || "Lunch",
      tag: "Lunch Plan",
      img: plan.img || "/assets/sub-plan.png",
    });
    if (onToast) {
      onToast(isNowSaved ? `✓ Saved "${plan.title || plan.name}" to Wishlist!` : `Removed "${plan.title || plan.name}" from Wishlist`);
    }
  };

  return (
    <section className="section" aria-labelledby="plans-title" style={{ padding: "16px 0" }}>
      <div className="sec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
        <div>
          <h2 id="plans-title" style={{ fontSize: "28px", fontWeight: "800", color: "#2b1210", margin: 0 }}>
            {headingText}
          </h2>
          {subText && (
            <p style={{ margin: "6px 0 0", fontSize: "15px", color: "#7a6a5c" }}>
              {subText}
            </p>
          )}
        </div>
        {showSeeAll && (
          <Link
            className="link-all link-all--plain"
            href="/partner-listing#plans"
            style={{ color: "#f57f2c", fontWeight: "700", textDecoration: "none", fontSize: "15px" }}
          >
            See all →
          </Link>
        )}
      </div>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "24px",
          padding: "10px 4px 24px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {plansForYou.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isFav={isInWishlist(plan.id)}
            onToggleFav={handleToggleFav}
            onSubscribe={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
