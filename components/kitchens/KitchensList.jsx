"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./KitchensList.module.css";

const KITCHENS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Ananya's Kitchen",
  about: "About",
  price: 89,
  originalPrice: 109,
  meta: "Monthly · 30 meals",
  badge: "Top rated",
  img: "/assets/subscription-food.png",
}));

export default function KitchensList() {
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div className={s.page}>
      <main className={s.main}>
        <section className={s.section}>
          <div className={s.section__head}>
            <div className={s.section__titles}>
              <h1 className={s.section__title}>Over 1,000 Kitchens in Noida</h1>
              <p className={s.section__sub}>
                Enjoy home-style meals delivered fresh to your doorstep
              </p>
            </div>
            <Link className={s.section__link} href="/kitchens">
              See all →
            </Link>
          </div>

          {/* Row 1 */}
          <div className={s.cards}>
            {KITCHENS.slice(0, 4).map((k) => (
              <article key={k.id} className={s.tile}>
                <img src={k.img} alt={k.name} />
                <span className={s.tile__badge}>{k.badge}</span>
                <div className={s.tile__card}>
                  <div className={s.tile__row}>
                    <div className={s.tile__left}>
                      <span className={s.tile__name}>{k.name}</span>
                      <span className={s.tile__about}>{k.about}</span>
                    </div>
                    <div className={s.tile__right}>
                      <div className={s.price}>
                        <span className={s.price__amount}>₹{k.price}</span>
                        <span className={s.price__unit}>/day</span>
                        <span className={s.price__old}>₹{k.originalPrice}</span>
                      </div>
                      <span className={s.tile__meta}>{k.meta}</span>
                    </div>
                  </div>
                  <Link href="/partner-listing" className={s.tile__cta}>Explore Menu</Link>
                </div>
              </article>
            ))}
          </div>

          {/* Row 2 */}
          <div className={s.cards}>
            {KITCHENS.slice(4, 8).map((k) => (
              <article key={k.id} className={s.tile}>
                <img src={k.img} alt={k.name} />
                <span className={s.tile__badge}>{k.badge}</span>
                <div className={s.tile__card}>
                  <div className={s.tile__row}>
                    <div className={s.tile__left}>
                      <span className={s.tile__name}>{k.name}</span>
                      <span className={s.tile__about}>{k.about}</span>
                    </div>
                    <div className={s.tile__right}>
                      <div className={s.price}>
                        <span className={s.price__amount}>₹{k.price}</span>
                        <span className={s.price__unit}>/day</span>
                        <span className={s.price__old}>₹{k.originalPrice}</span>
                      </div>
                      <span className={s.tile__meta}>{k.meta}</span>
                    </div>
                  </div>
                  <Link href="/partner-listing" className={s.tile__cta}>Explore Menu</Link>
                </div>
              </article>
            ))}
          </div>

          {/* Row 3 */}
          <div className={s.cards}>
            {KITCHENS.slice(8, 12).map((k) => (
              <article key={k.id} className={s.tile}>
                <img src={k.img} alt={k.name} />
                <span className={s.tile__badge}>{k.badge}</span>
                <div className={s.tile__card}>
                  <div className={s.tile__row}>
                    <div className={s.tile__left}>
                      <span className={s.tile__name}>{k.name}</span>
                      <span className={s.tile__about}>{k.about}</span>
                    </div>
                    <div className={s.tile__right}>
                      <div className={s.price}>
                        <span className={s.price__amount}>₹{k.price}</span>
                        <span className={s.price__unit}>/day</span>
                        <span className={s.price__old}>₹{k.originalPrice}</span>
                      </div>
                      <span className={s.tile__meta}>{k.meta}</span>
                    </div>
                  </div>
                  <Link href="/partner-listing" className={s.tile__cta}>Explore Menu</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <nav className={s.pagination} aria-label="Pagination">
          <button
            type="button"
            className={`${s.pagination__item} ${s["pagination__item--control"]}`}
            aria-label="Previous page"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <img src="/assets/chevron-left.svg" alt="" width="16" height="16" />
          </button>
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`${s.pagination__item} ${currentPage === pageNum ? s["pagination__item--active"] : ""}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <span className={s.pagination__item}>......</span>
          <button
            type="button"
            className={`${s.pagination__item} ${currentPage === 15 ? s["pagination__item--active"] : ""}`}
            onClick={() => setCurrentPage(15)}
          >
            15
          </button>
          <button
            type="button"
            className={`${s.pagination__item} ${s["pagination__item--control"]}`}
            aria-label="Next page"
            onClick={() => setCurrentPage((p) => Math.min(15, p + 1))}
          >
            <img src="/assets/chevron-right.svg" alt="" width="16" height="16" />
          </button>
        </nav>
      </main>
    </div>
  );
}
