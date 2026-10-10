"use client";

import { useState } from "react";
import Link from "next/link";
import { plansForYou } from "@/lib/data";
import PriceRow from "@/components/ui/PriceRow";

export default function PlansForYou() {
  const [saved, setSaved] = useState({});

  return (
    <section className="section" aria-labelledby="plans-title">
      <div className="sec-head">
        <div>
          <h2 id="plans-title">Subscription plans for you</h2>
          <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
        </div>
        <Link className="link-all link-all--plain" href="/kitchens">
          See all →
        </Link>
      </div>
      <div className="scroller scroller--shadow" id="plans-for-you">
        {plansForYou.map((p, i) => (
          <article className="plan-card" key={i}>
            <div className="plan-card__media">
              <img src="/assets/plan-food.png" alt="" />
              <span className="plan-card__badge">{p.badge}</span>
            </div>
            <button
              className="plan-card__fav"
              type="button"
              aria-label={`Save ${p.kitchen}`}
              aria-pressed={saved[i] ? "true" : "false"}
              onClick={() => setSaved((prev) => ({ ...prev, [i]: !prev[i] }))}
            >
              <img src="/assets/btn-favorite.svg" alt="" />
            </button>
            <div className="plan-card__content">
              <div className="plan-card__row">
                <h3>{p.kitchen}</h3>
                <span>{p.meta}</span>
              </div>
              <PriceRow price={p.price} oldPrice={p.oldPrice} />
              <a className="plan-card__cta" href="#">
                Subscribe
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
