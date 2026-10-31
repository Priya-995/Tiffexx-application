"use client";

import Link from "next/link";
import { slugify } from "@/lib/kitchens";
import s from "./PlanCard.module.css";

export default function PlanCard({
  plan,
  isFav = false,
  onToggleFav,
  onSubscribe,
}) {
  const title = plan.title || plan.name || "Veg Lunch Plan (30 Days)";
  const kitchen = plan.kitchen || "Perfect Kitchen";
  const descBold = plan.descBold || (plan.desc ? plan.desc.split("(")[0] : "Special Thali  ");
  const descLight = plan.descLight || (plan.desc && plan.desc.includes("(") ? `(${plan.desc.split("(")[1]}` : "(Dali ,Sabji & 4 Roti )");
  const price = plan.price ? String(plan.price).replace(/[^\d]/g, "") : "89";
  const wasPrice = plan.wasPrice || plan.oldPrice ? String(plan.wasPrice || plan.oldPrice).replace(/[^\d]/g, "") : "109";
  const rating = plan.rating || "4.2";
  const isVeg = plan.veg !== false && !title.toLowerCase().includes("non");
  const badge = plan.badge || "Top Rated";
  const mealType = plan.mealType || "Lunch";
  const img = plan.img || "/assets/sub-plan.png";

  return (
    <article className={s.plan}>
      <div className={s.planImg}>
        <img className={s.bg} src={img} alt={title} />
        <span className={`${s.glass} ${s.glassA}`}>{badge}</span>
        <span className={`${s.glass} ${s.glassB}`}>{mealType}</span>
        <button
          type="button"
          className={s.favBtn}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFav) onToggleFav(plan);
          }}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          title={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <img
            className={s.fav}
            src="/assets/food-rating-badge.svg"
            alt="Wishlist"
            style={{
              filter: isFav
                ? "sepia(1) saturate(5) hue-rotate(320deg)"
                : "none",
            }}
          />
        </button>
      </div>

      <div className={s.planBody}>
        <div className={s.planInfo}>
          <div className={s.planTitle}>
            <span>{title}</span>
            <span className={s.planRate}>
              <img src="/assets/star-small.svg" alt="" />
              {rating}
            </span>
          </div>

          <Link href={`/${slugify(kitchen)}`} className={s.planKitchen}>
            {kitchen}
          </Link>

          <div className={s.planDesc}>
            <span>
              {descBold}
              <b>{descLight}</b>
            </span>
            <span className={`${s.mark} ${!isVeg ? s.nv : ""}`}>
              <i />
            </span>
          </div>

          <div className={s.priceLine}>
            <b>₹{price}</b>
            <span>/day</span>
            <s>₹{wasPrice}</s>
          </div>
        </div>

        <button
          className={s.btnBook}
          type="button"
          onClick={() => {
            if (onSubscribe) onSubscribe(plan);
          }}
        >
          Subscribe
        </button>
      </div>
    </article>
  );
}

