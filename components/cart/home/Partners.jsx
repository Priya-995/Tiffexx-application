"use client";

import { useState } from "react";
import Link from "next/link";
import { partners as partnerData } from "@/lib/data";
import { slugify } from "@/lib/kitchens";

const initialChips = { open: false, favorites: false, rated: false, fast: false, price: false };

export default function Partners() {
  const [chipState, setChipState] = useState(initialChips);
  const [vegOnly, setVegOnly] = useState(false);

  function isHidden(p) {
    return (
      (vegOnly && !p.veg) ||
      (chipState.open && p.closed) ||
      (chipState.rated && p.rating < 4)
    );
  }

  function toggleChip(key) {
    if (key === "nearest") return;
    setChipState((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <section className="section" aria-labelledby="partners-title">
      <div className="sec-head">
        <div>
          <h2 id="partners-title">Tiffin partners near you</h2>
          <p>Home kitchens delivering fresh, every day</p>
        </div>
        <Link className="link-all" href="/kitchens">
          View all →
        </Link>
      </div>

      <div className="filters">
        <div className="filters__chips">
          <button className="filter-btn" type="button">
            <img src="/assets/icon-filter.svg" alt="" width="20" height="20" />
            Filter
          </button>
          <span className="filters__divider" aria-hidden="true"></span>
          <div className="chips" id="chips">
            <button
              className="chip chip--sort is-active"
              type="button"
              data-chip="nearest"
              aria-pressed="true"
              onClick={() => toggleChip("nearest")}
            >
              <img src="/assets/icon-nearest.svg" alt="" width="12" height="12" />
              Nearest
            </button>
            <button
              className={`chip${chipState.open ? " is-active" : ""}`}
              type="button"
              data-chip="open"
              aria-pressed={chipState.open}
              onClick={() => toggleChip("open")}
            >
              Open Now
            </button>
            <button
              className={`chip${chipState.favorites ? " is-active" : ""}`}
              type="button"
              data-chip="favorites"
              aria-pressed={chipState.favorites}
              onClick={() => toggleChip("favorites")}
            >
              Favorites
            </button>
            <button
              className={`chip${chipState.rated ? " is-active" : ""}`}
              type="button"
              data-chip="rated"
              aria-pressed={chipState.rated}
              onClick={() => toggleChip("rated")}
            >
              Rated 4+
            </button>
            <button
              className={`chip chip--square${chipState.fast ? " is-active" : ""}`}
              type="button"
              data-chip="fast"
              aria-pressed={chipState.fast}
              onClick={() => toggleChip("fast")}
            >
              Less than 60
            </button>
            <button
              className={`chip chip--square${chipState.price ? " is-active" : ""}`}
              type="button"
              data-chip="price"
              aria-pressed={chipState.price}
              onClick={() => toggleChip("price")}
            >
              Price
            </button>
          </div>
        </div>

        <label className="veg-toggle">
          <span>Veg</span>
          <input
            type="checkbox"
            id="veg-only"
            role="switch"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
          />
          <span className="veg-toggle__track" aria-hidden="true"></span>
        </label>
      </div>

      <div className="partners" id="partners">
        {partnerData.map((p) => (
          <Link
            key={p.name}
            href={`/${slugify(p.name)}`}
            className={`pcard${p.closed ? " pcard--closed" : ""}`}
            data-veg={String(p.veg)}
            data-open={String(!p.closed)}
            data-rating={p.rating}
            hidden={isHidden(p)}
          >
            <div className={`pcard__cover${p.tint ? " pcard__cover--tint" : ""}`}>
              <img className="cover" src="/assets/kitchen-cover.png" alt="" />
              <span
                className={`veg${p.veg ? "" : " veg--nonveg"}`}
                title={p.veg ? "Vegetarian" : "Non-vegetarian"}
              ></span>
              {p.badge ? <span className="pcard__badge">{p.badge}</span> : null}
              {p.closed ? <div className="pcard__closed">Closed · opens 6:00 PM</div> : null}
              <div className="dots pcard__dots" aria-hidden="true">
                <i className="is-active"></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <div className="pcard__body">
              <div className="pcard__title">
                <h3>{p.name}</h3>
                <span className="rating">
                  <img
                    src={`/assets/icon-star${p.star === 2 ? "-2" : ""}.svg`}
                    alt=""
                    width="10"
                    height="10"
                  />
                  {p.rating}
                </span>
              </div>
              <p className="pcard__meta">
                {p.cuisine} · ({p.reviews})
              </p>
              <p className="pcard__price">From ₹{p.price}/meal</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
