"use client";

import { useState } from "react";
import s from "./SearchDropdown.module.css";

const TRENDING = ["South Indian", "North Indian", "Chinese", "Gujarati", "Bengali"];

const DEFAULT_RECENT = [
  { label: "South Indian", img: "/assets/cuisine-south-indian.png" },
  { label: "North Indian", img: "/assets/cuisine-north-indian.png" },
  { label: "Chinese", img: "/assets/cuisine-chinese.png" },
  { label: "Gujarati", img: "/assets/cuisine-gujarati.png" },
];

export default function SearchDropdown({ onSelect }) {
  const [recent, setRecent] = useState(DEFAULT_RECENT);

  return (
    <div className={s.dropdown} role="dialog" aria-label="Search suggestions">
      {/* Trending */}
      <div className={s.trending}>
        <div className={s.trendingLabel}>
          <b>Trending</b>
          <span>↗</span>
        </div>
        <div className={s.trendingChips}>
          {TRENDING.map((t) => (
            <button
              key={t}
              type="button"
              className={s.chip}
              onClick={() => onSelect(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={s.hr}></div>

      {/* Recent */}
      {recent.length > 0 && (
        <div className={s.recent}>
          <div className={s.recentHead}>
            <span className={s.recentTitle}>RECENT</span>
            <button
              type="button"
              className={s.recentClear}
              onClick={(e) => {
                e.stopPropagation();
                setRecent([]);
              }}
            >
              Clear
            </button>
          </div>
          <div className={s.recentGrid}>
            {recent.map((r) => (
              <button
                key={r.label}
                type="button"
                className={s.recentItem}
                onClick={() => onSelect(r.label)}
              >
                <div className={s.recentImg}>
                  <img src={r.img} alt={r.label} />
                </div>
                <span className={s.recentLabel}>{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
