"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getInitialCart, saveCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import s from "./HomeScreen.module.css";

const PARTNERS_DATA = [
  {
    id: "p1",
    name: "Amma's Kitchen",
    rating: "4.5",
    sub: "South Indian · (312)",
    price: "From ₹99/meal",
    veg: true,
    tag: "Best value",
    closed: false,
    shade: false,
    link: "/partner-listing",
  },
  {
    id: "p2",
    name: "Punjab Rasoi",
    rating: "4.3",
    sub: "North Indian · (208)",
    price: "From ₹129/meal",
    veg: false,
    tag: null,
    closed: false,
    shade: false,
    link: "/partner-listing",
  },
  {
    id: "p3",
    name: "Dragon Wok Express",
    rating: "4.1",
    sub: "Chinese · (96)",
    price: "From ₹149/meal",
    veg: false,
    tag: null,
    closed: true,
    closedText: "Closed · opens 6:00 PM",
    shade: false,
    link: "/partner-listing",
  },
  {
    id: "p4",
    name: "Ghar Ka Swaad",
    rating: "4.6",
    sub: "North Indian · (450)",
    price: "From ₹105/meal",
    veg: true,
    tag: "Top rated",
    closed: false,
    shade: false,
    link: "/partner-listing",
  },
  {
    id: "p5",
    name: "Annapurna Cloud Kitchen",
    rating: "4.2",
    sub: "Multi-cuisine · (167)",
    price: "From ₹114/meal",
    veg: true,
    tag: null,
    closed: false,
    shade: true,
    link: "/partner-listing",
  },
  {
    id: "p6",
    name: "Bong Bhoj",
    rating: "4.4",
    sub: "Bengali · (140)",
    price: "From ₹135/meal",
    veg: false,
    tag: null,
    closed: false,
    shade: true,
    link: "/partner-listing",
  },
  {
    id: "p7",
    name: "Gujarat Rasoi",
    rating: "4.7",
    sub: "Gujarati · (58)",
    price: "From ₹110/meal",
    veg: true,
    tag: "New",
    closed: false,
    shade: true,
    link: "/partner-listing",
  },
  {
    id: "p8",
    name: "Continental Bites",
    rating: "4.1",
    sub: "Continental · (74)",
    price: "From ₹159/meal",
    veg: true,
    tag: null,
    closed: false,
    shade: true,
    link: "/partner-listing",
  },
];

const CUISINES = [
  { name: "South Indian", img: "/assets/cuisine-south-indian.png", contain: true },
  { name: "North Indian", img: "/assets/cuisine-north-indian.png" },
  { name: "Chinese", img: "/assets/cuisine-chinese.png", font15: true },
  { name: "Gujarati", img: "/assets/cuisine-gujarati.png" },
  { name: "Continental", img: "/assets/cuisine-continental.png" },
  { name: "Bengali", img: "/assets/cuisine-bengali.png" },
];

const RESTAURANTS = [
  {
    id: "r1",
    name: "Hello Kitchen",
    score: "4.4",
    cuisine: "South Indian",
    cost: "₹100 for two",
    loc: "Sector 62, Noida",
    dist: "2.7 km",
    offer: "Flat 20% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
    pj: true,
  },
  {
    id: "r2",
    name: "Mood Light Cafe & Restaurant",
    score: "3.6",
    midScore: true,
    cuisine: "South Indian",
    cost: "₹100 for two",
    loc: "Sector 62, Noida",
    dist: "2.7 km",
    offer: "Flat 15% OFF",
    promoted: true,
    img: "/assets/restaurant-2.png",
  },
  {
    id: "r3",
    name: "Mood Light Cafe & Restaurant",
    score: "3.6",
    midScore: true,
    cuisine: "South Indian",
    cost: "₹100 for two",
    loc: "Sector 62, Noida",
    dist: "2.7 km",
    offer: "Flat 15% OFF",
    promoted: true,
    img: "/assets/restaurant-2.png",
  },
  {
    id: "r4",
    name: "The Grindhouse By Cafe 13",
    score: "4.2",
    cuisine: "South Indian",
    cost: "₹100 for two",
    loc: "Sector 62, Noida",
    note: "Opens in 18 minutes",
    dist: "2.1 km",
    offer: "Flat 10% OFF",
    promoted: true,
    tall: true,
    img: "/assets/restaurant-3.png",
  },
  {
    id: "r5",
    name: "The Grindhouse By Cafe 13",
    score: "4.2",
    cuisine: "South Indian",
    cost: "₹100 for two",
    loc: "Sector 62, Noida",
    note: "Opens in 18 minutes",
    dist: "2.1 km",
    offer: "Flat 10% OFF",
    promoted: true,
    tall: true,
    img: "/assets/restaurant-3.png",
  },
  {
    id: "r6",
    name: "The Grindhouse By Cafe 13",
    score: "4.2",
    cuisine: "South Indian",
    cost: "₹ 100 for two",
    loc: "Sector 62, Noida",
    note: "Opens in 18 minutes",
    dist: "2.1 km",
    offer: "Flat 10% OFF",
    promoted: true,
    tall: true,
    img: "/assets/restaurant-3.png",
  },
];

const PLANS = [
  {
    id: "sub-plan-veg-1",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    rating: "4.2",
    veg: true,
  },
  {
    id: "sub-plan-nonveg-1",
    title: "Non - Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    rating: "4.2",
    veg: false,
  },
  {
    id: "sub-plan-veg-2",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    rating: "4.2",
    veg: true,
  },
  {
    id: "sub-plan-nonveg-2",
    title: "Non - Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    rating: "4.2",
    veg: false,
  },
  {
    id: "sub-plan-veg-3",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    rating: "4.2",
    veg: true,
  },
];

const MEAL_ITEMS = [
  {
    id: "meal-aloo-parantha",
    name: "Aloo Parantha + Dahi",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 35,
    variant: "dark",
    img: "/assets/meal-aloo.png",
    mealType: "lunch",
  },
  {
    id: "meal-dal-makhani",
    name: "Dal Makhani + Naan",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 65,
    variant: "green",
    dim: true,
    img: "/assets/meal-lunch.png",
    mealType: "lunch",
  },
  {
    id: "meal-butter-chicken-1",
    name: "Butter Chicken + Rice",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 120,
    variant: "standard",
    dim: true,
    dkPrice: true,
    img: "/assets/meal-dinner.png",
    mealType: "dinner",
  },
  {
    id: "meal-butter-chicken-2",
    name: "Butter Chicken + Rice",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 120,
    variant: "standard",
    dim: true,
    img: "/assets/meal-dinner.png",
    mealType: "dinner",
  },
  {
    id: "meal-thali-special",
    name: "Thali Special",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    lightStar: true,
    price: 85,
    variant: "brown",
    glassAdd: true,
    img: "/assets/meal-thali-special.png",
    mealType: "lunch",
  },
];

const POPULAR_PICKS = [
  { id: "pop-1", kitchen: "Ananya's Kitchen", cuisine: "South Indian", dish: "Regular Thali", price: 89 },
  { id: "pop-2", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Dahi BHalla", price: 99 },
  { id: "pop-3", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Dahi BHalla", price: 99 },
  { id: "pop-4", kitchen: "Ananya's Kitchen", cuisine: "South Indian", dish: "Rajma Chawal", price: 89, isDay: true },
  { id: "pop-5", kitchen: "Ananya's Kitchen", cuisine: "South Indian", dish: "Rajma Chawal", price: 89, isDay: true },
  { id: "pop-6", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Deluxe Thali", price: 99 },
  { id: "pop-7", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Deluxe Thali", price: 99 },
];

export default function HomeScreen() {
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active States
  const [activeChip, setActiveChip] = useState("Nearest");
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCuisine, setActiveCuisine] = useState("South Indian");
  const [activeMealTab, setActiveMealTab] = useState("lunch");
  const [heroDot, setHeroDot] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    lunch: { hours: 15, minutes: 7, seconds: 39 },
    dinner: { hours: 2, minutes: 37, seconds: 39 },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updateTimer = (t) => {
          let total = t.hours * 3600 + t.minutes * 60 + t.seconds - 1;
          if (total <= 0) total = 24 * 3600;
          return {
            hours: Math.floor(total / 3600),
            minutes: Math.floor((total % 3600) / 60),
            seconds: total % 60,
          };
        };
        return {
          lunch: updateTimer(prev.lunch),
          dinner: updateTimer(prev.dinner),
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopyDeal = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("ANANYA50");
    }
    showToast("✓ Coupon ANANYA50 copied! Flat 50% applied at checkout.");
  };

  const handleAddToCart = (item) => {
    const currentCart = getInitialCart();
    const items = [...(currentCart.items || [])];
    const existingIndex = items.findIndex((x) => x.id === item.id || x.name === item.name);

    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: item.id,
        name: item.name || item.dish || item.title,
        tag: item.tag || "Tiffin Meal",
        sub: item.sub || item.kitchen || "Daily fresh meal",
        perDay: item.price,
        qty: 1,
        kitchen: item.kitchen || "Tiffexx Kitchen",
        liked: false,
      });
    }

    const updated = { ...currentCart, items };
    saveCart(updated);
    showToast(`✓ Added "${item.name || item.dish || item.title}" to cart!`);
  };

  const handleToggleWishlist = (plan) => {
    const isNowSaved = toggleWishlist({
      id: plan.id,
      name: plan.title,
      price: plan.price,
      kitchen: plan.kitchen,
      tag: "Lunch Plan",
      img: "/assets/sub-plan.png",
    });
    showToast(isNowSaved ? `✓ Saved "${plan.title}" to Wishlist!` : `Removed "${plan.title}" from Wishlist`);
  };

  // Filter partners
  const filteredPartners = PARTNERS_DATA.filter((p) => {
    if (vegOnly && !p.veg) return false;
    if (activeChip === "Open Now" && p.closed) return false;
    if (activeChip === "Rated 4+" && parseFloat(p.rating) < 4.4) return false;
    return true;
  });

  return (
    <main className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <div className={s["hero-img"]}>
          <img src="/assets/hero-banner.png" alt="Tiffexx Fresh Homemade Tiffin Delivery" />
        </div>
        <div className={s.dots}>
          {[0, 1, 2].map((idx) => (
            <i
              key={idx}
              onClick={() => setHeroDot(idx)}
              style={{
                cursor: "pointer",
                background: heroDot === idx ? "#591a11" : undefined,
                width: heroDot === idx ? "18px" : "6px",
              }}
            />
          ))}
        </div>
      </section>

      {/* Meal timers */}
      <section className={s.timers}>
        <div className={`${s.timer} ${s.closed}`}>
          <div className={s["timer-label"]}>
            <b>Lunch</b>
            <span>Closed · Opens 10:00 AM tomorrow</span>
          </div>
          <div className={s["timer-digits"]}>
            <div className={s.digit}>
              <div className={s["digit-box"]}>
                {String(timeLeft.lunch.hours).padStart(2, "0")}
              </div>
              <small>HOURS</small>
            </div>
            <div className={s.digit}>
              <div className={s["digit-box"]}>
                {String(timeLeft.lunch.minutes).padStart(2, "0")}
              </div>
              <small>MINUTES</small>
            </div>
            <div className={s.digit}>
              <div className={s["digit-box"]}>
                {String(timeLeft.lunch.seconds).padStart(2, "0")}
              </div>
              <small>SECONDS</small>
            </div>
          </div>
        </div>

        <div className={s.timer}>
          <div className={s["timer-label"]}>
            <b>Dinner</b>
            <span>Order by 8:00 PM</span>
          </div>
          <div className={s["timer-digits"]}>
            <div className={s.digit}>
              <div className={s["digit-box"]}>
                {String(timeLeft.dinner.hours).padStart(2, "0")}
              </div>
              <small>HOURS</small>
            </div>
            <div className={s.digit}>
              <div className={s["digit-box"]}>
                {String(timeLeft.dinner.minutes).padStart(2, "0")}
              </div>
              <small>MINUTES</small>
            </div>
            <div className={s.digit}>
              <div className={s["digit-box"]}>
                {String(timeLeft.dinner.seconds).padStart(2, "0")}
              </div>
              <small>SECONDS</small>
            </div>
          </div>
        </div>
      </section>

      {/* Tiffin partners near you */}
      <section className={s.partners}>
        <div className={s["section-head"]}>
          <div>
            <h2>Tiffin partners near you</h2>
            <p style={{ fontFamily: "var(--font)", color: "#7a6a5c" }}>
              Home kitchens delivering fresh, every day
            </p>
          </div>
          <Link className={s["link-all"]} href="/partner-listing">
            View all 28 →
          </Link>
        </div>

        <div className={s.filters}>
          <div className={s["filters-left"]}>
            <button className={s["btn-filter"]} type="button" onClick={() => setActiveChip("Nearest")}>
              <img src="/assets/filter-icon.svg" alt="" />
              Filter&nbsp;
            </button>
            <span className={s["filter-divider"]}>
              <img src="/assets/filter-divider.svg" alt="" />
            </span>
            <div className={s.chips}>
              <button
                className={`${s.chip} ${activeChip === "Nearest" ? s.active : ""}`}
                type="button"
                onClick={() => setActiveChip("Nearest")}
              >
                <img src="/assets/nearest-icon.svg" alt="" />
                Nearest
              </button>
              <button
                className={`${s.chip} ${activeChip === "Open Now" ? s.active : ""}`}
                type="button"
                onClick={() => setActiveChip(activeChip === "Open Now" ? "Nearest" : "Open Now")}
              >
                Open Now
              </button>
              <button
                className={`${s.chip} ${activeChip === "Favorites" ? s.active : ""}`}
                type="button"
                onClick={() => setActiveChip(activeChip === "Favorites" ? "Nearest" : "Favorites")}
              >
                Favorites
              </button>
              <button
                className={`${s.chip} ${activeChip === "Rated 4+" ? s.active : ""}`}
                type="button"
                onClick={() => setActiveChip(activeChip === "Rated 4+" ? "Nearest" : "Rated 4+")}
              >
                Rated 4+
              </button>
              <button
                className={`${s.chip} ${s.sq} ${activeChip === "Less than 60" ? s.active : ""}`}
                type="button"
                onClick={() => setActiveChip(activeChip === "Less than 60" ? "Nearest" : "Less than 60")}
              >
                Less than 60
              </button>
              <button
                className={`${s.chip} ${s.sq} ${activeChip === "Price" ? s.active : ""}`}
                type="button"
                onClick={() => setActiveChip(activeChip === "Price" ? "Nearest" : "Price")}
              >
                Price
              </button>
            </div>
          </div>
          <label className={s["veg-toggle"]} onClick={() => setVegOnly(!vegOnly)}>
            Veg{" "}
            <span className={`${s.toggle} ${vegOnly ? s.on : ""}`}>
              <i />
            </span>
          </label>
        </div>

        <div className={s["partner-grid"]}>
          {filteredPartners.map((partner) => (
            <article key={partner.id} className={`${s.partner} ${partner.closed ? s.closed : ""}`}>
              <div className={`${s["p-cover"]} ${partner.shade ? s.shade : ""}`}>
                <img src="/assets/partner-bg.png" alt={partner.name} />
                <span className={`${s.diet} ${!partner.veg ? s.nonveg : ""}`}>
                  <i />
                </span>
                {partner.tag && <span className={s.tag}>{partner.tag}</span>}
                {partner.closed && (
                  <div className={s["closed-overlay"]}>
                    {partner.closedText || "Closed · opens 6:00 PM"}
                  </div>
                )}
                <div className={s.dots}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className={s["p-body"]}>
                <div className={s["p-top"]}>
                  <h3>{partner.name}</h3>
                  <span className={s.rating}>
                    <img src={partner.shade ? "/assets/star-green-2.svg" : "/assets/star-green.svg"} alt="" />
                    {partner.rating}
                  </span>
                </div>
                <div className={s["p-sub"]}>{partner.sub}</div>
                <div className={s["p-price"]}>{partner.price}</div>
                <div className={s["p-actions"]}>
                  <Link className={`${s.btn} ${s["btn-primary"]}`} href={partner.link}>
                    Order now
                  </Link>
                  <Link className={`${s.btn} ${s["btn-outline"]}`} href={partner.link}>
                    Subscribe
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Biggest deals on meals */}
      <section className={s.deals}>
        <div className={s["deals-head"]}>
          <div>
            <h2>Biggest Deals on Meals</h2>
            <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
          </div>
          <span className={s["link-all"]} onClick={handleCopyDeal}>
            See all →
          </span>
        </div>
        <div className={`${s["h-scroll"]} ${s["deal-row"]}`}>
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className={s.ticket} onClick={handleCopyDeal} title="Click to copy coupon ANANYA50">
              <span className={`${s.notch} ${s.l}`} />
              <span className={`${s.notch} ${s.r}`} />
              <img className={`${s.cut} ${s.t}`} src="/assets/notch-large.svg" alt="" />
              <img className={`${s.cut} ${s.b}`} src="/assets/notch-large.svg" alt="" />
              <div className={s.stub}>
                <div className={s["stub-icon"]}>
                  <img src="/assets/deal-icon.png" alt="Deal" />
                </div>
              </div>
              <div className={s.perf}>
                <img src="/assets/deal-divider.png" alt="" />
              </div>
              <div className={s["ticket-main"]}>
                <div className={s["ticket-inner"]}>
                  <div className={s.kitchen}>Ananya&apos;s Kitchen</div>
                  <div className={s.deco}>
                    <img className={s.ln} src="/assets/deco-line.svg" alt="" />
                    <img className={s.dot} src="/assets/deco-dot.svg" alt="" />
                    <img className={s.ln} src="/assets/deco-line.svg" alt="" />
                  </div>
                  <div className={s.offer}>Upto 50% OFF</div>
                  <div className={s.pills}>
                    <span className={s.pill}>
                      <img src="/assets/wallet.svg" alt="" />
                      Best value
                    </span>
                    <span className={s.pill}>
                      <img src="/assets/heart.svg" alt="" />
                      Fan favorite
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by cuisine + restaurants */}
      <section className={s.explore}>
        <div className={s.cuisines}>
          <h2>Shop by cuisine</h2>
          <div className={s["cuisine-row"]}>
            {CUISINES.map((cuisine) => {
              const isOn = activeCuisine === cuisine.name;
              return (
                <div
                  key={cuisine.name}
                  className={s.cuisine}
                  onClick={() => setActiveCuisine(cuisine.name)}
                >
                  <div className={`${s.ring} ${isOn ? s.on : ""}`}>
                    <img
                      src={cuisine.img}
                      alt={cuisine.name}
                      style={cuisine.contain ? { objectFit: "contain" } : undefined}
                    />
                  </div>
                  <span style={cuisine.font15 ? { fontSize: "15px" } : undefined}>
                    {cuisine.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${s["h-scroll"]} ${s["rest-row"]}`}>
          {RESTAURANTS.map((rest, i) => (
            <Link key={`${rest.id}-${i}`} className={s.rest} href="/partner-listing">
              <div className={s["rest-img"]}>
                <img src={rest.img} alt={rest.name} />
                <div className={s["offer-pill"]}>
                  <img src="/assets/walkin-icon.png" alt="" />
                  Flat <b>{rest.offer.replace("Flat ", "")}</b>
                </div>
                {rest.promoted && <span className={s.promoted}>Promoted</span>}
              </div>
              <div className={`${s["rest-info"]} ${rest.tall ? s.tall : ""}`}>
                <div className={`${s["rest-name"]} ${rest.pj ? s.pj : ""}`} style={rest.tall ? { width: "220px" } : undefined}>
                  {rest.name}
                </div>
                <span className={`${s.score} ${rest.midScore ? s.mid : ""}`}>
                  {rest.score}
                  <img src="/assets/rating-star-white.svg" alt="" />
                </span>
                <div className={s["rest-meta"]}>
                  <span>{rest.cuisine}</span>
                  <span>{rest.cost}</span>
                </div>
                <div className={s["rest-loc"]}>
                  {rest.loc}
                  {rest.note && <em>{rest.note}</em>}
                </div>
                <span className={s.dist}>{rest.dist}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Subscription plans for you */}
      <section className={s.plans}>
        <div className={s["section-head"]}>
          <div>
            <h2>Subscription plans for you</h2>
            <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
          </div>
          <Link className={s["link-all"]} href="/partner-listing#plans">
            See all →
          </Link>
        </div>
        <div className={`${s["h-scroll"]} ${s["plan-row"]}`}>
          {PLANS.map((plan) => {
            const isFav = isInWishlist(plan.id);
            return (
              <article key={plan.id} className={s.plan}>
                <div className={s["plan-img"]}>
                  <img className={s.bg} src="/assets/sub-plan.png" alt={plan.title} />
                  <span className={`${s.glass} ${s.a}`}>Top Rated</span>
                  <span className={`${s.glass} ${s.b}`}>Lunch</span>
                  <img
                    className={s.fav}
                    src="/assets/food-rating-badge.svg"
                    alt="Wishlist"
                    onClick={() => handleToggleWishlist(plan)}
                    style={{ filter: isFav ? "sepia(1) saturate(5) hue-rotate(320deg)" : "none" }}
                  />
                </div>
                <div className={s["plan-body"]}>
                  <div className={s["plan-info"]}>
                    <div className={s["plan-title"]}>
                      {plan.title}
                      <span className={s["plan-rate"]}>
                        <img src="/assets/star-small.svg" alt="" />
                        {plan.rating}
                      </span>
                    </div>
                    <div className={s["plan-kitchen"]}>{plan.kitchen}</div>
                    <div className={s["plan-desc"]}>
                      <span>
                        {plan.descBold}
                        <b>{plan.descLight}</b>
                      </span>
                      <span className={`${s.mark} ${!plan.veg ? s.nv : ""}`}>
                        <i />
                      </span>
                    </div>
                    <div className={s["price-line"]}>
                      <b>₹{plan.price}</b>
                      <span>/day</span>
                      <s>₹{plan.wasPrice}</s>
                    </div>
                  </div>
                  <button
                    className={s["btn-book"]}
                    type="button"
                    onClick={() => handleAddToCart({ id: plan.id, name: plan.title, price: plan.price, tag: "Plan", kitchen: plan.kitchen })}
                  >
                    Subscribe
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Browse by meal */}
      <section className={s.browse}>
        <h2>Browse by meal</h2>
        <div className={s["meal-tabs"]}>
          <div
            className={`${s.tab} ${activeMealTab === "lunch" ? s.active : ""}`}
            onClick={() => setActiveMealTab("lunch")}
          >
            <img src="/assets/meal-lunch.png" alt="Lunch" />
            <div>
              <b>Lunch</b>
              <small>Closes 12:45 PM</small>
            </div>
          </div>
          <div
            className={`${s.tab} ${activeMealTab === "dinner" ? s.active : ""}`}
            onClick={() => setActiveMealTab("dinner")}
          >
            <img src="/assets/meal-dinner.png" alt="Dinner" />
            <div>
              <b>Dinner</b>
              <small>Opens 6:00 PM</small>
            </div>
          </div>
        </div>

        <div className={`${s["h-scroll"]} ${s["meal-row"]}`}>
          {MEAL_ITEMS.map((meal) => {
            let variantClass = "";
            if (meal.variant === "dark") variantClass = s.dark;
            else if (meal.variant === "green") variantClass = s.green;
            else if (meal.variant === "brown") variantClass = s.brown;

            return (
              <article key={meal.id} className={`${s.meal} ${variantClass}`}>
                <div className={`${s["meal-img"]} ${meal.dim ? s.dim : ""}`}>
                  <img src={meal.img} alt={meal.name} />
                </div>
                <div className={s["meal-body"]}>
                  <div className={s["meal-top"]}>
                    <b>{meal.name}</b>
                    <span className={meal.lightStar ? s.light : ""}>{meal.rating}</span>
                  </div>
                  <div className={s["meal-kitchen"]}>{meal.kitchen}</div>
                  <div className={s["meal-foot"]}>
                    <b className={meal.dkPrice ? s.dk : ""}>₹{meal.price}</b>
                    <button
                      className={`${s.add} ${meal.glassAdd ? s["glass-add"] : ""}`}
                      type="button"
                      aria-label={`Add ${meal.name} to cart`}
                      onClick={() => handleAddToCart({ id: meal.id, name: meal.name, price: meal.price, tag: "Meal", kitchen: meal.kitchen })}
                    >
                      <img src="/assets/add-icon-2.svg" alt="" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Your popular picks */}
      <section className={s.plans}>
        <div className={s["section-head"]}>
          <div>
            <h2>Your Popular Picks</h2>
            <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
          </div>
          <Link className={s["link-all"]} href="/partner-listing">
            See all →
          </Link>
        </div>
        <div className={`${s["h-scroll"]} ${s["meal-row"]}`}>
          {POPULAR_PICKS.map((pop, i) => (
            <article key={`${pop.id}-${i}`} className={s.pop}>
              <div className={s["pop-img"]}>
                <img src="/assets/popular-bg.png" alt={pop.dish} />
                <span className={s["pop-rate"]}>
                  <i>★</i>
                  <b>4.6</b>
                </span>
              </div>
              <div className={s["pop-body"]}>
                <span className={s["cuisine-tag"]}>{pop.cuisine}</span>
                <h4>{pop.kitchen}</h4>
                <span className={s.dish}>{pop.dish}</span>
                <div className={s["pop-price"]}>
                  ₹{pop.price} {pop.isDay && <small>/day</small>}
                </div>
                <button
                  className={s["btn-reorder"]}
                  type="button"
                  onClick={() => handleAddToCart({ id: `${pop.id}-${i}`, name: `${pop.dish} (${pop.kitchen})`, price: pop.price, tag: "Popular Pick", kitchen: pop.kitchen })}
                >
                  Reorder
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive feedback toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </main>
  );
}

