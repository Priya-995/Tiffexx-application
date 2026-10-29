"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/lib/wishlist";
import { getInitialCart, saveCart } from "@/lib/cart";
import PlansForYou from "@/components/cart/home/PlansForYou";
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
    const existingIndex = items.findIndex(
      (x) => String(x.id) === String(item.id) || x.name === item.name
    );

    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: item.id,
        name: item.name,
        tag:
          item.tag ||
          (item.meal === "dinner"
            ? "Dinner"
            : item.meal === "breakfast"
            ? "Breakfast"
            : "Lunch"),
        sub: item.desc || "Daily home-style meal",
        perDay: item.price,
        qty: 1,
        kitchen: item.kitchen || "Amma's Kitchen",
        liked: true,
      });
    }

    const updated = { ...currentCart, items };
    saveCart(updated);
    showToast(`✓ Added "${item.name}" to cart!`);
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
              <article key={item.id} className={s.mealCard}>
                <div className={s.mealMedia}>
                  <img
                    className={s.mealImg}
                    src={item.img || "/assets/thali.png"}
                    alt={item.name}
                  />
                  <button
                    type="button"
                    className={s.favBtn}
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    title="Remove from wishlist"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#c0522f"
                      stroke="#c0522f"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className={s.mealContent}>
                  <div className={s.kitchenRow}>
                    <Link
                      href={item.link || "/partner-listing"}
                      className={s.kitchenName}
                    >
                      {item.kitchen || "Amma's Kitchen"}
                    </Link>
                  </div>

                  <h3 className={s.mealTitle}>{item.name}</h3>
                  <p className={s.mealDesc}>{item.desc}</p>

                  <div className={s.mealFooter}>
                    <span className={s.mealPrice}>₹{item.price}</span>
                    <button
                      type="button"
                      className={s.addBtn}
                      onClick={() => handleAddToCart(item)}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Down in Plans for You: Render the already made cards from the home section with See all */}
        <div className={s.sectionSpacer}>
          <PlansForYou
            title="Plans for You"
            subtitle="Daily tiffin on autopilot, freshly curated from top kitchens"
            showSeeAll={true}
          />
        </div>

        {/* Toast Notification */}
        {toastMessage && <div className={s.toast}>{toastMessage}</div>}
      </div>
    </div>
  );
}
