"use client";

import { useState } from "react";
import Link from "next/link";
import { meals } from "@/lib/data";
import { useWishlist } from "@/lib/wishlist";

const tabs = [
  { label: "Breakfast", note: "Closes 10:30 AM", icon: null },
  { label: "Lunch", note: "Closes 12:45 PM", icon: "/assets/meal-lunch.png" },
  { label: "Dinner", note: "Opens 6:00 PM", icon: "/assets/meal-dinner.png" },
];

export default function BrowseByMeal() {
  const [active, setActive] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <section className="section" aria-labelledby="meal-title">
      <div className="sec-head">
        <h2 id="meal-title">Browse by meal</h2>
      </div>
      <div className="meal-tabs" id="meal-tabs" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={`meal-tab${active === i ? " is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
          >
            <span className="meal-tab__icon">
              {tab.icon ? <img src={tab.icon} alt="" /> : null}
            </span>
            <span className="meal-tab__text">
              <b>{tab.label}</b>
              <small>{tab.note}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="scroller meal-cards" id="meal-cards">
        {meals.map((m, i) => {
          const mealId =
            m.name.includes("Aloo")
              ? "meal-aloo-parantha"
              : m.name.includes("Dal")
              ? "meal-dal-makhani"
              : m.name.includes("Butter")
              ? "meal-butter-chicken"
              : "meal-thali-special";
          const mealItem = {
            id: mealId,
            name: m.name,
            kitchen: "Meena's Tiffin",
            desc: "Fresh home-cooked daily meal",
            price: parseInt(String(m.price).replace(/[^\d]/g, "")) || 85,
            img: m.img,
            tag: tabs[active]?.label || "Meal",
            link: "/partner-listing",
            veg: !m.name.toLowerCase().includes("chicken"),
          };
          const isLiked = isInWishlist(mealId);

          return (
            <article className="meal-card" key={i}>
              <div className={`meal-card__media${m.shade ? " meal-card__media--shade" : ""}`}>
                <img src={m.img} alt="" />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.65)",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#2b1210",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: tabs[active]?.label === "Dinner" ? "#7a3ee3" : "#f57f2c",
                    }}
                  />
                  {tabs[active]?.label || "Meal"}
                </span>
                <button
                  type="button"
                  className="meal-card__fav"
                  onClick={() => toggleWishlist(mealItem)}
                  aria-label={isLiked ? `Remove ${m.name} from wishlist` : `Add ${m.name} to wishlist`}
                  title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={isLiked ? "#c0522f" : "none"}
                    stroke={isLiked ? "#c0522f" : "#4a4848"}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="meal-card__content">
                <div className="meal-card__top">
                  <h3>{m.name}</h3>
                  <span className="meal-card__rate">
                    <i>★</i>
                    <b>8.7</b>
                  </span>
                </div>
                <p className="meal-card__kitchen">
                  <Link href="/partner-listing" style={{ color: "inherit", textDecoration: "none" }}>
                    Meena&apos;s Tiffin
                  </Link>
                </p>
                <div className="meal-card__bottom">
                  <span className="meal-card__price">{m.price}</span>
                  <button className="meal-card__add" type="button" aria-label={`Add ${m.name}`}>
                    <img src="/assets/icon-plus.svg" alt="" width="24" height="24" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
