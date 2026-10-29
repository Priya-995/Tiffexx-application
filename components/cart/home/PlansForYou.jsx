"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { plansForYou } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";
import PriceRow from "@/components/ui/PriceRow";

export default function PlansForYou({ title, subtitle, showSeeAll = true }) {
  const { isLoggedIn } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const headingText =
    title || (isLoggedIn ? "Subscription plans for you" : "Plans for You");
  const subText =
    subtitle ||
    (isLoggedIn
      ? "Daily tiffin on autopilot, picked from kitchens you've ordered from"
      : "Daily tiffin on autopilot, freshly curated from top kitchens");

  return (
    <section className="section" aria-labelledby="plans-title">
      <div className="sec-head">
        <div>
          <h2 id="plans-title">{headingText}</h2>
          {subText && <p>{subText}</p>}
        </div>
        {showSeeAll && (
          <Link className="link-all link-all--plain" href="/kitchens">
            See all →
          </Link>
        )}
      </div>
      <div className="scroller scroller--shadow" id="plans-for-you">
        {plansForYou.map((p, i) => {
          const planId = `plan-${i}`;
          const planItem = {
            id: planId,
            name: `${p.kitchen} Daily Tiffin`,
            kitchen: p.kitchen,
            price: parseInt(String(p.price).replace(/[^\d]/g, "")) || 89,
            oldPrice: p.oldPrice,
            desc: `${p.badge} · ${p.meta} · Fresh home-style tiffin on autopilot`,
            img: "/assets/plan-food.png",
            tag: "Plan",
            link: "/partner-listing",
            veg: true,
          };
          const isSaved = isInWishlist(planId);

          return (
            <article className="plan-card" key={i}>
              <div className="plan-card__media">
                <img src="/assets/plan-food.png" alt="" />
                <span className="plan-card__badge">{p.badge}</span>
              </div>
              <button
                className="plan-card__fav"
                type="button"
                aria-label={isSaved ? `Remove ${p.kitchen} from wishlist` : `Save ${p.kitchen} to wishlist`}
                aria-pressed={isSaved ? "true" : "false"}
                onClick={() => toggleWishlist(planItem)}
              >
                <img src="/assets/btn-favorite.svg" alt="" />
              </button>
              <div className="plan-card__content">
                <div className="plan-card__row">
                  <h3>{p.kitchen}</h3>
                  <span>{p.meta}</span>
                </div>
                <PriceRow price={p.price} oldPrice={p.oldPrice} />
                <Link className="plan-card__cta" href="/partner-listing">
                  Subscribe
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
