"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/lib/wishlist";
import { getInitialCart, saveCart } from "@/lib/cart";
import PlansForYou from "@/components/cart/home/PlansForYou";
import PlanCard from "@/components/ui/PlanCard";
import s from "./WishlistSection.module.css";

export default function WishlistSection() {
  const router = useRouter();
  const { wishlistItems, count, removeFromWishlist, isLoaded } = useWishlist();
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleAddToCart = (item) => {
    const currentCart = getInitialCart();
    const items = [...(currentCart.items || [])];
    const planName = item.title || item.name || "Lunch Plan";
    const existingIndex = items.findIndex(
      (x) => String(x.id) === String(item.id) || x.name === planName
    );

    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: item.id,
        name: planName,
        tag: "Plan",
        sub: item.descBold
          ? `${item.descBold} ${item.descLight || ""}`
          : (item.desc || "Daily home-style tiffin"),
        perDay: item.price ? Number(String(item.price).replace(/[^\d]/g, "")) : 89,
        qty: 1,
        kitchen: item.kitchen || "Perfect Kitchen",
        liked: true,
      });
    }

    const updated = { ...currentCart, items };
    saveCart(updated);
    router.push("/cart?checkout=true");
  };

  const handleRemove = (item) => {
    removeFromWishlist(item.id);
    showToast(`Removed "${item.name}" from wishlist`);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className={s.page}>
      <div className="container">
        {/* Top Header: ← Back   WISHLIST */}
        <div className={s.topBar}>
          <button
            type="button"
            className={s.backBtn}
            onClick={handleBack}
            aria-label="Go back"
          >
            ← Back
          </button>
          <h1 className={s.pageTitle}>WISHLIST</h1>
        </div>

        {/* Wishlist Content: Clean Empty State or Saved Items */}
        {isLoaded && count === 0 ? (
          <div className={s.emptyState}>
            <svg
              className={s.emptyHeart}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p className={s.emptyText}>Hmm, can&apos;t find any items</p>
          </div>
        ) : (
          <div className={s.itemsGrid}>
            {wishlistItems.map((item) => (
              <PlanCard
                key={item.id}
                plan={item}
                isFav={true}
                onToggleFav={() => handleRemove(item)}
                onSubscribe={() => handleAddToCart(item)}
              />
            ))}
          </div>
        )}

        {/* Down in Plans for You: Render the already made cards from the home section with See all */}
        <div className={s.sectionSpacer}>
          <PlansForYou
            title="Plans for You"
            subtitle="Daily tiffin on autopilot, freshly curated from top kitchens"
            showSeeAll={true}
            onToast={showToast}
          />
        </div>

        {/* Toast Notification */}
        {toastMessage && <div className={s.toast}>{toastMessage}</div>}
      </div>
    </div>
  );
}
