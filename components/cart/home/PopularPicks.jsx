"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getUserReorderPicks } from "@/lib/orders";
import { slugify } from "@/lib/kitchens";
import PriceRow from "@/components/ui/PriceRow";
import { useEffect, useState } from "react";

export default function PopularPicks() {
  const { isLoggedIn, loading } = useAuth();
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setPicks(getUserReorderPicks());
    } else {
      setPicks([]);
    }
  }, [isLoggedIn]);

  if (loading || !isLoggedIn || picks.length === 0) {
    return null;
  }

  return (
    <section className="section" aria-labelledby="picks-title">
      <div className="sec-head">
        <div>
          <h2 id="picks-title">Your Popular Picks</h2>
          <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
        </div>
        <Link className="link-all" href="/orders">
          See all →
        </Link>
      </div>
      <div className="scroller" id="popular-picks">
        {picks.map((p, i) => (
          <article className="pick" key={`${p.id}-${i}`}>
            <div className="pick__media">
              <img src="/assets/kitchen-cover.png" alt="" />
              <span className="pick__save">★ {p.rating || "4.6"}</span>
            </div>
            <div className="pick__body">
              <p className="pick__cuisine">{p.cuisine}</p>
              <h3 className="pick__name">
                <Link href={`/${slugify(p.kitchen)}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {p.kitchen}
                </Link>
              </h3>
              <p className="pick__meta">{p.dish}</p>
              <PriceRow price={`₹${p.price}`} />
              <Link className="pick__cta" href={`/${slugify(p.kitchen)}`}>
                Reorder
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
