"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./LocationsSection.module.css";

const CITIES = [
  { name: "Bengaluru", label: "KORAMANGALA, BENGALURU" },
  { name: "Noida", label: "SECTOR 62, NOIDA" },
  { name: "Pune", label: "KOREGAON PARK, PUNE" },
  { name: "Hyderabad", label: "HITEC CITY, HYDERABAD" },
  { name: "Chennai", label: "T. NAGAR, CHENNAI" },
  { name: "Delhi NCR", label: "CONNAUGHT PLACE, NEW DELHI" },
];

const KITCHENS_DATA = [
  {
    id: "ammas",
    name: "Amma's Kitchen",
    eyebrow: "MOST POPULAR NEARBY",
    location: "📍 6th Block, Koramangala, Bengaluru",
    price: "85",
    rating: "4.5",
    tags: ["🌿 Veg & non-veg", "⏱ 30–40 min", "🍱 120 meals/day"],
    desc: "Home-style South Indian tiffins made fresh every morning — known for their sambar and curd rice. Currently taking new lunch subscribers in this area...",
    image: "/assets/featured-photo.png",
    markerPos: { left: "210px", top: "130px" },
    markerTag: "₹85 avg",
  },
  {
    id: "meenas",
    name: "Meena's Tiffin",
    eyebrow: "TOP RATED NEARBY",
    location: "📍 4th Block, Koramangala · 1.2km",
    price: "75",
    rating: "4.6",
    tags: ["🌿 Pure veg", "⏱ 25 min", "🍱 80 meals/day"],
    desc: "Wholesome authentic home tiffins with piping hot rasam, ghee podi idlis, and freshly ground coconut chutney made fresh on order...",
    image: "/assets/food-thumb.png",
    markerPos: { left: "300px", top: "260px" },
    markerTag: "From ₹75 avg",
  },
  {
    id: "sunitas",
    name: "Sunita's Home Kitchen",
    eyebrow: "BEST VALUE",
    location: "📍 5th Block, Koramangala · 2.4km",
    price: "95",
    rating: "4.7",
    tags: ["🌿 Veg & non-veg", "⏱ 35 min", "🍱 150 meals/day"],
    desc: "Delicious homely preparations featuring soft rotis, dal tadka, seasonal vegetables, and Sunday special Andhra biryani tiffins...",
    image: "/assets/food-thumb.png",
    markerPos: { left: "440px", top: "340px" },
    markerTag: "₹95 avg",
  },
  {
    id: "ravis",
    name: "Ravi's Daily Thali",
    eyebrow: "BUDGET FRIENDLY",
    location: "📍 7th Block, Koramangala · 3.1km",
    price: "60",
    rating: "4.4",
    tags: ["🌿 Pure veg", "⏱ 40 min", "🍱 200 meals/day"],
    desc: "Affordable everyday college & office tiffins. Standard North & South balanced combos delivered consistently on time...",
    image: "/assets/food-thumb.png",
    markerPos: { left: "220px", top: "420px" },
    markerTag: "₹60 avg",
  },
  {
    id: "kaveris",
    name: "Kaveri's Kitchen",
    eyebrow: "CHEF SPECIAL",
    location: "📍 1st Block, Koramangala · 3.8km",
    price: "110",
    rating: "4.9",
    tags: ["🌿 Veg & non-veg", "⏱ 30 min", "🍱 90 meals/day"],
    desc: "Premium home tiffin service specializing in traditional slow-cooked curries, organic millet rotis, and buttermilk...",
    image: "/assets/food-thumb.png",
    markerPos: { left: "360px", top: "180px" },
    markerTag: "₹110 avg",
  },
];

export default function LocationsSection() {
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [selectedKitchenId, setSelectedKitchenId] = useState("meenas");
  const [activeDotsIdx, setActiveDotsIdx] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  // Filters state
  const [filtersState, setFiltersState] = useState({
    cuisine: true, // "Cuisine: South Indian" is active
    price: false,  // "Price: ₹60–₹220"
    delivery: false,
    rating: false,
  });

  const toggleFilter = (key) => {
    setFiltersState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCity = CITIES[activeCityIdx];

  const featuredKitchen =
    KITCHENS_DATA.find((k) => k.id === selectedKitchenId) || KITCHENS_DATA[0];

  const handleZoomIn = () => setMapZoom((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setMapZoom((prev) => Math.max(prev - 0.15, 0.85));
  const handleResetZoom = () => setMapZoom(1);

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/kitchens">Noida</Link>
        <span>/</span>
        <strong>About Us</strong>
      </div>

      {/* Page Heading */}
      <section className={styles.pageHead}>
        <h1>Locations</h1>
        <p className={styles.updated}>Last updated: July 2025</p>
      </section>

      {/* City Pills */}
      <div className={styles.cityPills}>
        {CITIES.map((city, idx) => (
          <button
            key={city.name}
            type="button"
            onClick={() => setActiveCityIdx(idx)}
            className={`${styles.pill} ${idx === activeCityIdx ? styles.pillActive : ""}`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className={styles.filters}>
        <button
          type="button"
          onClick={() => toggleFilter("cuisine")}
          className={`${styles.filter} ${filtersState.cuisine ? styles.filterActive : ""}`}
        >
          Cuisine: South Indian {filtersState.cuisine && <span className={styles.x}>✕</span>}
        </button>

        <button
          type="button"
          onClick={() => toggleFilter("price")}
          className={`${styles.filter} ${filtersState.price ? styles.filterActive : ""}`}
        >
          Price: ₹60–₹220 {filtersState.price && <span className={styles.x}>✕</span>}
        </button>

        <button
          type="button"
          onClick={() => toggleFilter("delivery")}
          className={`${styles.filter} ${filtersState.delivery ? styles.filterActive : ""}`}
        >
          Delivery time
          <img src="/assets/icon-chevron-down.svg" alt="" width="16" height="16" />
        </button>

        <button
          type="button"
          onClick={() => toggleFilter("rating")}
          className={`${styles.filter} ${filtersState.rating ? styles.filterActive : ""}`}
        >
          Rating 4+
        </button>
      </div>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Map */}
        <div className={styles.map}>
          <img
            className={styles.map__bg}
            src="/assets/map-bg.png"
            alt=""
            style={{ transform: `scale(${mapZoom})` }}
          />
          <img className={styles.map__overlay} src="/assets/map-overlay.svg" alt="" />

          {/* Interactive Markers */}
          {KITCHENS_DATA.map((k) => {
            const isSelected = k.id === selectedKitchenId;
            return (
              <div
                key={k.id}
                className={`${styles.marker} ${isSelected ? styles.markerRed : ""}`}
                style={{ left: k.markerPos.left, top: k.markerPos.top }}
                onClick={() => setSelectedKitchenId(k.id)}
                title={`Click to view ${k.name}`}
              >
                <span className={styles.marker__tag}>{k.markerTag}</span>
                <i className={styles.marker__dot}></i>
              </div>
            );
          })}

          {/* Map Controls */}
          <div className={styles.map__controls}>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Reset Map"
            >
              <img src="/assets/icon-edit.svg" alt="Draw" width="16" height="16" />
            </button>
            <button type="button" onClick={handleZoomIn} title="Zoom in">
              ＋
            </button>
            <button type="button" onClick={handleZoomOut} title="Zoom out">
              －
            </button>
          </div>

          <span className={styles.map__label}>{currentCity.label}</span>
        </div>

        {/* Right column */}
        <div className={styles.cardsCol}>
          {/* Featured Card */}
          <article className={styles.featured}>
            <div className={styles.featured__img}>
              <img src={featuredKitchen.image} alt={featuredKitchen.name} />
              <span className={styles.ratingChip}>
                <img src="/assets/icon-star.svg" alt="" width="10" height="10" />
                {featuredKitchen.rating}
              </span>
              <button
                className={styles.bookmark}
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                aria-label="Bookmark kitchen"
              >
                {isBookmarked ? "❤️" : "🔖"}
              </button>
              <div className={styles.dots}>
                {[0, 1, 2, 3].map((dotIdx) => (
                  <i
                    key={dotIdx}
                    className={dotIdx === activeDotsIdx ? styles.on : ""}
                    onClick={() => setActiveDotsIdx(dotIdx)}
                  ></i>
                ))}
              </div>
            </div>

            <div className={styles.featured__body}>
              <div className={styles.featured__top}>
                <span className={styles.eyebrow}>{featuredKitchen.eyebrow}</span>
                <span
                  className={styles.share}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: featuredKitchen.name,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  ↗ Share
                </span>
              </div>
              <h2>{featuredKitchen.name}</h2>
              <p className={styles.meta}>{featuredKitchen.location}</p>
              <div className={styles.tags}>
                {featuredKitchen.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <p className={styles.desc}>
                {featuredKitchen.desc}{" "}
                <Link href="/kitchens">see details</Link>
              </p>
              <div className={styles.featured__foot}>
                <p className={styles.price}>
                  From <b>₹{featuredKitchen.price}</b> / meal
                </p>
                <div className={styles.btns}>
                  <Link href="/cart" className={styles.btnDark}>
                    View Menu
                  </Link>
                  <button className={styles.btnMore} type="button" aria-label="More options">
                    ⋯
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Mini Grid */}
          <div className={styles.miniGrid}>
            <article
              className={`${styles.mini} ${selectedKitchenId === "meenas" ? styles.miniActive : ""}`}
              onClick={() => setSelectedKitchenId("meenas")}
            >
              <img src="/assets/food-thumb.png" alt="Meena's Tiffin" />
              <div className={styles.mini__body}>
                <b>₹75 / meal</b>
                <span>Meena&apos;s Tiffin · 1.2km</span>
                <small>
                  <i>4.6 ★</i>
                  <i>25 min</i>
                </small>
              </div>
            </article>

            <article
              className={`${styles.mini} ${selectedKitchenId === "sunitas" ? styles.miniActive : ""}`}
              onClick={() => setSelectedKitchenId("sunitas")}
            >
              <img src="/assets/food-thumb.png" alt="Sunita's Home Kitchen" />
              <div className={styles.mini__body}>
                <b>₹95 / meal</b>
                <span>Sunita&apos;s Home Kitchen · 2.4km</span>
                <small>
                  <i>4.7 ★</i>
                  <i>35 min</i>
                </small>
              </div>
            </article>

            <article
              className={`${styles.mini} ${selectedKitchenId === "ravis" ? styles.miniActive : ""}`}
              onClick={() => setSelectedKitchenId("ravis")}
            >
              <img src="/assets/food-thumb.png" alt="Ravi's Daily Thali" />
              <div className={styles.mini__body}>
                <b>₹60 / meal</b>
                <span>Ravi&apos;s Daily Thali · 3.1km</span>
                <small>
                  <i>4.4 ★</i>
                  <i>40 min</i>
                </small>
              </div>
            </article>

            <article
              className={`${styles.mini} ${selectedKitchenId === "kaveris" ? styles.miniActive : ""}`}
              onClick={() => setSelectedKitchenId("kaveris")}
            >
              <img src="/assets/food-thumb.png" alt="Kaveri's Kitchen" />
              <div className={styles.mini__body}>
                <b>₹110 / meal</b>
                <span>Kaveri&apos;s Kitchen · 3.8km</span>
                <small>
                  <i>4.9 ★</i>
                  <i>30 min</i>
                </small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
