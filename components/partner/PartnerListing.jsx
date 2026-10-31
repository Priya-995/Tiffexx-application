"use client";

import { useState } from "react";
import Link from "next/link";
import { getInitialCart, saveCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import s from "./PartnerListing.module.css";

const CUISINES = [
  { name: "South Indian", img: "/assets/cuisine-south-indian.png", contain: true },
  { name: "North Indian", img: "/assets/cuisine-north-indian.png" },
  { name: "Chinese", img: "/assets/cuisine-chinese.png", lg: true },
  { name: "Gujarati", img: "/assets/cuisine-gujarati.png" },
  { name: "Continental", img: "/assets/cuisine-continental.png" },
  { name: "Bengali", img: "/assets/cuisine-bengali.png" },
];

const MENU_ITEMS = [
  // Lunch items
  {
    id: "l1",
    name: "Dal Tadka Thali",
    desc: "Dal · Roti × 3 · Rice · Sabzi · Pickle · Sweet",
    price: 99,
    veg: true,
    meal: "lunch",
    rating: 4.6,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "l2",
    name: "Paneer Masala Thali",
    desc: "Paneer Curry · Roti × 3 · Rice · Raita · Sweet",
    price: 139,
    veg: true,
    meal: "lunch",
    rating: 4.8,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "l3",
    name: "Rajma Masala Thali",
    desc: "Special Rajma · Jeera Rice · Roti × 2 · Salad",
    price: 119,
    veg: true,
    meal: "lunch",
    rating: 4.5,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "l4",
    name: "Chole Bhature Thali",
    desc: "Amritsari Chole · Bhature × 2 · Pickle · Onion Salad",
    price: 109,
    veg: true,
    meal: "lunch",
    rating: 4.7,
    img: "/assets/menu-dal-tadka.png",
  },
  // Breakfast items
  {
    id: "b1",
    name: "Aloo Parantha Box",
    desc: "Aloo Parantha × 2 · Fresh Curd · Mint Chutney · Pickle",
    price: 79,
    veg: true,
    meal: "breakfast",
    rating: 4.7,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "b2",
    name: "Poha & Sprouts Combo",
    desc: "Indori Poha · Boiled Moong Sprouts · Lemon · Sev",
    price: 69,
    veg: true,
    meal: "breakfast",
    rating: 4.4,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "b3",
    name: "Idli Sambar Platter",
    desc: "Steamed Idli × 4 · Veg Sambar · Coconut Chutney",
    price: 75,
    veg: true,
    meal: "breakfast",
    rating: 4.6,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "b4",
    name: "Methi Thepla Tiffin",
    desc: "Gujarati Thepla × 4 · Chunda · Plain Curd",
    price: 85,
    veg: true,
    meal: "breakfast",
    rating: 4.5,
    img: "/assets/menu-dal-tadka.png",
  },
  // Dinner items
  {
    id: "d1",
    name: "Light Khichdi Meal",
    desc: "Moong Dal Khichdi · Desi Ghee · Papad · Curd",
    price: 89,
    veg: true,
    meal: "dinner",
    rating: 4.6,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "d2",
    name: "Paneer Bhurji & Phulka",
    desc: "Fresh Paneer Bhurji · Butter Phulka × 4 · Salad",
    price: 149,
    veg: true,
    meal: "dinner",
    rating: 4.9,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "d3",
    name: "Mix Veg Homestyle Thali",
    desc: "Mix Veg · Yellow Dal · Phulka × 3 · Jeera Rice",
    price: 119,
    veg: true,
    meal: "dinner",
    rating: 4.5,
    img: "/assets/menu-dal-tadka.png",
  },
  {
    id: "d4",
    name: "Egg Curry & Rice Meal",
    desc: "Egg Curry × 2 · Steamed Rice · Salad",
    price: 129,
    veg: false,
    meal: "dinner",
    rating: 4.7,
    img: "/assets/menu-dal-tadka.png",
  },
];

const SPECIAL_ITEMS = [
  {
    id: "sp1",
    name: "Sunday Chicken Bhature",
    meta: "12 left · ₹129",
    price: 129,
    veg: false,
    img: "/assets/special-item.png",
    btnImg: "/assets/icon-add-84.svg",
    wide: false,
  },
  {
    id: "sp2",
    name: "Kadhi Pakora Thali",
    meta: "8 left · ₹119",
    price: 119,
    veg: true,
    img: "/assets/special-item.png",
    btnImg: "/assets/icon-add-120.svg",
    wide: true,
  },
  {
    id: "sp3",
    name: "Paneer Biryani",
    meta: "15 left · ₹149",
    price: 149,
    veg: true,
    img: "/assets/special-item.png",
    btnImg: "/assets/icon-add-120.svg",
    wide: true,
  },
  {
    id: "sp4",
    name: "Gulab Jamun (2)",
    meta: "Add-on · ₹39",
    price: 39,
    veg: true,
    img: "/assets/special-item.png",
    btnImg: "/assets/icon-add-120.svg",
    wide: true,
  },
];

const SUBSCRIPTION_PLANS = [
  {
    id: "plan-veg-lunch-30",
    title: "Veg Lunch Plan (30 Days)",
    boldSub: "Special Thali  ",
    lightSub: "(Dali ,Sabji & 4 Roti )",
    rating: "4.2",
    meal: "Lunch",
    mealWidth: 62,
    veg: true,
    price: 89,
    wasPrice: 109,
    img: "/assets/plan-veg.png",
    wishIcon: "/assets/icon-plan-wishlist.svg",
  },
  {
    id: "plan-veg-dinner-30",
    title: "Veg Lunch Plan (30 Days)",
    boldSub: "Special Thali  ",
    lightSub: "(Dali ,Sabji & 4 Roti )",
    rating: "4.2",
    meal: "Dinner",
    mealWidth: 68,
    veg: true,
    price: 89,
    wasPrice: 109,
    img: "/assets/plan-veg.png",
    wishIcon: "/assets/icon-plan-wishlist.svg",
  },
  {
    id: "plan-nonveg-lunch-30-1",
    title: "Non - Veg Lunch Plan (30 Days)",
    boldSub: "Special Thali  ",
    lightSub: "(Dali ,Sabji & 4 Roti )",
    rating: "4.2",
    meal: "Lunch",
    mealWidth: 62,
    veg: false,
    price: 89,
    wasPrice: 109,
    img: "/assets/plan-nonveg.png",
    wishIcon: "/assets/icon-plan-wishlist-2.svg",
  },
  {
    id: "plan-nonveg-lunch-30-2",
    title: "Non - Veg Lunch Plan (30 Days)",
    boldSub: "Special Thali  ",
    lightSub: "(Dali ,Sabji & 4 Roti )",
    rating: "4.2",
    meal: "Lunch",
    mealWidth: 62,
    veg: false,
    price: 89,
    wasPrice: 109,
    img: "/assets/plan-nonveg.png",
    wishIcon: "/assets/icon-plan-wishlist-2.svg",
  },
  {
    id: "plan-veg-lunch-30-2",
    title: "Veg Lunch Plan (30 Days)",
    boldSub: "Special Thali  ",
    lightSub: "(Dali ,Sabji & 4 Roti )",
    rating: "4.2",
    meal: "Lunch",
    mealWidth: 62,
    veg: true,
    price: 89,
    wasPrice: 109,
    img: "/assets/plan-veg.png",
    wishIcon: "/assets/icon-plan-wishlist.svg",
  },
];

const REVIEWS_DATA = [
  {
    id: "r1",
    avatar: "AK",
    name: "Akshay Kohli",
    time: "26 minutes ago",
    stars: "★★★★★",
    text: "The dal tadka is exactly how my mother makes it — not oily, perfect salt. Rotis stay soft till 2 PM. Been on the 30-day plan for two months now.",
    plan: "Veg Lunch Plan",
    likes: 12,
  },
  {
    id: "r2",
    avatar: "NS",
    name: "Neha Sharma",
    time: "2 hours ago",
    stars: "★★★★★",
    text: "Packed neatly in leak-proof containers, no spills. Delivery came 10 minutes before my slot. The pickle is a lovely touch.",
    plan: "Dal Tadka Thali",
    likes: 8,
  },
  {
    id: "r3",
    avatar: "RM",
    name: "Rahul Mehta",
    time: "Yesterday",
    stars: "★★★★",
    text: "Rajma was rich and creamy. Portion is good for one person. Would love brown rice as an option on weekdays.",
    plan: "Rajma Chawal Thali",
    likes: 5,
  },
  {
    id: "r4",
    avatar: "PG",
    name: "Pooja Gupta",
    time: "2 days ago",
    stars: "★★★★★",
    text: "Skipping a day was easy and the credit showed up in my wallet the same evening. Food quality has been consistent.",
    plan: "Veg Lunch Plan",
    likes: 3,
  },
  {
    id: "r5",
    avatar: "SV",
    name: "Sanjay Verma",
    time: "3 days ago",
    stars: "★★★★★",
    text: "Ordered for my parents. They said it tastes like home cooking, not restaurant food. Will subscribe for them next month.",
    plan: "Dal Tadka Thali",
    likes: 6,
  },
  {
    id: "r6",
    avatar: "MK",
    name: "Meera Kapoor",
    time: "4 days ago",
    stars: "★★★★",
    text: "Paneer was soft and fresh. Gravy a bit sweet for my taste, but the rotis and dal were spot on.",
    plan: "Paneer Butter Masala Combo",
    likes: 2,
  },
];

const EXPLORE_KITCHENS = [
  { id: "k1", name: "Ananya’s Kitchen", cuisine: "South Indian", plan: "Monthly · 30 meals", save: "Save 18%", price: 89, wasPrice: 109, img: "/assets/kitchen.png" },
  { id: "k2", name: "Punjab Rasoi", cuisine: "North Indian", plan: "Monthly · 30 meals", save: "Save 15%", price: 95, wasPrice: 115, img: "/assets/kitchen.png" },
  { id: "k3", name: "Meena’s Tiffin", cuisine: "Home-style", plan: "Monthly · 30 meals", save: "Save 20%", price: 85, wasPrice: 105, img: "/assets/kitchen.png" },
  { id: "k4", name: "Ghar Ka Swaad", cuisine: "Pure Veg", plan: "Monthly · 30 meals", save: "Save 18%", price: 89, wasPrice: 109, img: "/assets/kitchen.png" },
  { id: "k5", name: "Annapurna Cloud", cuisine: "Bengali & Thali", plan: "Monthly · 30 meals", save: "Save 12%", price: 99, wasPrice: 119, img: "/assets/kitchen.png" },
  { id: "k6", name: "Spice Route", cuisine: "Multi-Cuisine", plan: "Monthly · 30 meals", save: "Save 18%", price: 89, wasPrice: 109, img: "/assets/kitchen.png" },
];

export default function PartnerListing() {
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Component state
  const [activeMealTab, setActiveMealTab] = useState("lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(true);
  const [sortOrder, setSortOrder] = useState("Popular");
  const [planMeal, setPlanMeal] = useState("Lunch");
  const [savedKitchen, setSavedKitchen] = useState(false);
  const [likedReviewMap, setLikedReviewMap] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveKitchen = () => {
    setSavedKitchen((prev) => !prev);
    showToast(!savedKitchen ? "✓ Saved Amma's Kitchen to favorites!" : "Removed Amma's Kitchen from favorites");
  };

  const handleShareKitchen = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("✓ Link copied to clipboard!");
    } else {
      showToast("Kitchen link: " + (typeof window !== "undefined" ? window.location.href : ""));
    }
  };

  const handleToggleSort = () => {
    if (sortOrder === "Popular") setSortOrder("Price: Low to High");
    else if (sortOrder === "Price: Low to High") setSortOrder("Rating: High to Low");
    else setSortOrder("Popular");
  };

  const handleLikeReview = (id) => {
    setLikedReviewMap((prev) => ({ ...prev, [id]: !prev[id] }));
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
        name: item.name,
        tag: item.meal === "dinner" ? "Dinner" : item.meal === "breakfast" ? "Breakfast" : "Lunch",
        sub: item.desc || "Daily home-style meal",
        perDay: item.price,
        qty: 1,
        kitchen: "Amma's Kitchen",
        liked: false,
      });
    }

    const updated = { ...currentCart, items };
    saveCart(updated);
    showToast(`✓ Added "${item.name}" to cart!`);
  };

  const handleSubscribePlan = (plan) => {
    const currentCart = getInitialCart();
    const items = [...(currentCart.items || [])];
    const existingIndex = items.findIndex((x) => x.id === plan.id || x.name === plan.title);

    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: plan.id,
        name: plan.title,
        tag: plan.meal,
        sub: "Monthly · 30 meals",
        perDay: plan.price,
        qty: 1,
        kitchen: "Amma's Kitchen",
        liked: false,
      });
    }

    const updated = { ...currentCart, items };
    saveCart(updated);
    showToast(`✓ Subscribed to "${plan.title}"!`);
  };

  const handleToggleWishlist = (plan) => {
    const isNowSaved = toggleWishlist({
      id: plan.id,
      name: plan.title,
      price: plan.price,
      kitchen: "Amma's Kitchen",
      tag: plan.meal,
      img: plan.img,
    });
    showToast(isNowSaved ? `✓ Saved "${plan.title}" to Wishlist!` : `Removed "${plan.title}" from Wishlist`);
  };

  // Filter and sort menu items
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    if (item.meal !== activeMealTab) return false;
    if (vegOnly && !item.veg) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    }
    return true;
  }).sort((a, b) => {
    if (sortOrder === "Price: Low to High") return a.price - b.price;
    if (sortOrder === "Rating: High to Low") return (b.rating || 0) - (a.rating || 0);
    return 0; // Popular default
  });

  // Filter subscription plans
  const displayedPlans = SUBSCRIPTION_PLANS.filter((p) => {
    if (planMeal && p.meal !== planMeal) return false;
    return true;
  });

  return (
    <div className={s.page}>
      <main className={s.main}>
        {/* Breadcrumb Navigation */}
        <nav className={s.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link> › <Link href="/kitchens">Noida</Link> › <strong>Amma’s Kitchen</strong>
        </nav>

        {/* Hero Section */}
        <section className={s.hero}>
          <img className={s.hero__img} src="/assets/hero-dish.png" alt="Amma's Kitchen signature dish" />
          <div className={s.hero__chips}>
            <span className={`${s.chip} ${s["chip--green"]}`}>✓ Verified kitchen</span>
            <span className={s.chip}>★ 4.6 Food</span>
            <span className={s.chip}>4.4 Delivery</span>
            <span className={s.chip}>● Open now</span>
          </div>
          <p className={s.hero__eyebrow}>HOME-STYLE · NORTH INDIAN THALI</p>
          <h1 className={s.hero__title}>Amma’s Kitchen</h1>
          <div className={s.hero__facts}>
            <span>Freshly prepared daily</span>
            <span>Wallet billing supported</span>
            <span>Home kitchen</span>
          </div>
          <div className={s.hero__actions}>
            <a className={`${s["hero-btn"]} ${s["hero-btn--primary"]}`} href="#plans">
              View subscription plans
            </a>
            <button className={s["hero-btn"]} type="button" onClick={handleSaveKitchen}>
              <img src="/assets/icon-save.svg" alt="" width="16" height="16" />
              {savedKitchen ? "Saved" : "Save"}
            </button>
            <button className={s["hero-btn"]} type="button" onClick={handleShareKitchen}>
              <img src="/assets/icon-share.svg" alt="" width="16" height="16" />
              Share
            </button>
          </div>
        </section>

        {/* Stats Bar */}
        <div className={s.stats}>
          <div className={s.stat}>
            <span className={s.stat__icon}>★</span>
            <div>
              <p className={s.stat__label}>RATING</p>
              <p className={s.stat__value}>4.6 (12k+)</p>
            </div>
          </div>
          <div className={s.stat}>
            <span className={s.stat__icon}>₹</span>
            <div>
              <p className={s.stat__label}>AVG. PRICE</p>
              <p className={s.stat__value}>₹120 / thali</p>
            </div>
          </div>
          <div className={s.stat}>
            <span className={s.stat__icon}>
              <img src="/assets/icon-orders.svg" alt="" width="20" height="20" />
            </span>
            <div>
              <p className={s.stat__label}>ORDERS</p>
              <p className={s.stat__value}>250+ completed</p>
            </div>
          </div>
          <div className={s.stat}>
            <span className={s.stat__icon}>✓</span>
            <div>
              <p className={s.stat__label}>FSSAI</p>
              <p className={s.stat__value}>12345678</p>
            </div>
          </div>
          <div className={s.stat}>
            <span className={s.stat__icon}>
              <img src="/assets/icon-address.svg" alt="" width="20" height="20" />
            </span>
            <div>
              <p className={s.stat__label}>ADDRESS</p>
              <p className={s.stat__value}>Malviya Nagar, Noida</p>
            </div>
          </div>
        </div>

        {/* Meal Tabs */}
        <div className={s.tabs} role="tablist">
          <button
            className={s.tab}
            role="tab"
            aria-selected={activeMealTab === "breakfast"}
            onClick={() => setActiveMealTab("breakfast")}
            type="button"
          >
            <span className={s.tab__title}>Breakfast</span>
            <span className={s.tab__sub}>Closes 10:30 AM</span>
          </button>
          <button
            className={s.tab}
            role="tab"
            aria-selected={activeMealTab === "lunch"}
            onClick={() => setActiveMealTab("lunch")}
            type="button"
          >
            <span className={s.tab__title}>Lunch</span>
            <span className={s.tab__sub}>Closes 12:45 PM</span>
          </button>
          <button
            className={s.tab}
            role="tab"
            aria-selected={activeMealTab === "dinner"}
            onClick={() => setActiveMealTab("dinner")}
            type="button"
          >
            <span className={s.tab__title}>Dinner</span>
            <span className={s.tab__sub}>Opens 6:00 PM</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className={s.toolbar}>
          <label className={`${s.search} ${s["search--wide"]}`}>
            <img className={s.search__icon} src="/assets/icon-search-2.svg" alt="" width="16" height="16" />
            <span className={s.search__field}>
              <input
                className={s.search__input}
                type="search"
                placeholder="Search tiffin, kitchen, cuisine..."
                aria-label="Search this kitchen"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className={s.search__divider} />
              <img className={s.search__mic} src="/assets/icon-mic-2.svg" alt="Voice search" width="24" height="24" />
            </span>
          </label>
          <button
            className={`${s["pill-control"]} ${s["pill-control--veg"]}`}
            id="vegToggle"
            type="button"
            onClick={() => setVegOnly(!vegOnly)}
          >
            Veg only{" "}
            <span
              className={s.toggle}
              role="switch"
              aria-checked={vegOnly}
            />
          </button>
          <button
            className={`${s["pill-control"]} ${s["pill-control--sort"]}`}
            type="button"
            onClick={handleToggleSort}
          >
            Sort: {sortOrder}{" "}
            <img src="/assets/icon-sort-chevron.svg" alt="" width="20" height="20" />
          </button>
        </div>

        {/* Shop by Cuisine */}
        <section className={s.cuisines}>
          <h2 className={s["section-title"]}>Shop by cuisine</h2>
          <div className={s.cuisines__row}>
            {CUISINES.map((c, i) => (
              <a key={i} className={s.cuisine} href="#menu">
                <img
                  className={c.contain ? s.contain : ""}
                  src={c.img}
                  alt={c.name}
                  width="64"
                  height="64"
                />
                <span className={c.lg ? s.lg : ""}>{c.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Menu & Sections Stack */}
        <div className={s["stack-24"]} id="menu">
          {/* Active Meal Menu */}
          <section className={s.lunch}>
            <div className={s["section-head"]}>
              <h2>{activeMealTab.charAt(0).toUpperCase() + activeMealTab.slice(1)} Menu</h2>
              <a
                className={s["view-all"]}
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchQuery("");
                  setVegOnly(false);
                }}
              >
                View All
              </a>
            </div>
            <div className={s["menu-grid"]}>
              {filteredMenuItems.map((item) => (
                <article key={item.id} className={s["menu-card"]}>
                  <div className={s["menu-card__body"]}>
                    <img
                      className={s["menu-card__img"]}
                      src={item.img}
                      alt={item.name}
                      width="52"
                      height="52"
                    />
                    <div className={s["menu-card__details"]}>
                      <h3 className={s["menu-card__name"]}>{item.name}</h3>
                      <p className={s["menu-card__desc"]}>{item.desc}</p>
                      <p className={s["menu-card__price"]}>₹{item.price}</p>
                      <span className={s["veg-badge"]}>
                        <img src="/assets/icon-leaf.svg" alt="" width="12" height="11" />
                        {item.veg ? "Veg" : "Non-Veg"}
                      </span>
                    </div>
                  </div>
                  <button
                    className={s["menu-card__more"]}
                    aria-label={`Add ${item.name} to cart`}
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    title="Add to cart"
                  >
                    <img src="/assets/icon-overflow.svg" alt="" width="16" height="16" />
                  </button>
                </article>
              ))}
              {filteredMenuItems.length === 0 && (
                <div style={{ gridColumn: "1 / -1", padding: "32px", textAlign: "center", color: "var(--sandstone)" }}>
                  No dishes found matching your selection.
                </div>
              )}
            </div>
          </section>

          {/* Special Menu */}
          <section className={s.special} id="special">
            <p className={s.special__eyebrow}>TODAY ONLY · LIMITED PLATES</p>
            <div className={s.special__head}>
              <h2>Special menu</h2>
              <a className={s["view-all"]} href="#special">View All</a>
            </div>
            <div className={s.special__row}>
              {SPECIAL_ITEMS.map((sp) => (
                <article key={sp.id} className={s["special-card"]}>
                  <img
                    className={s["special-card__img"]}
                    src={sp.img}
                    alt={sp.name}
                    width="52"
                    height="52"
                  />
                  <div className={s["special-card__text"]}>
                    <h3 className={s["special-card__name"]}>{sp.name}</h3>
                    <p className={s["special-card__meta"]}>{sp.meta}</p>
                  </div>
                  <button
                    className={s["special-card__add"]}
                    aria-label={`Add ${sp.name}`}
                    type="button"
                    onClick={() => handleAddToCart({ id: sp.id, name: sp.name, price: sp.price, tag: "Special" })}
                  >
                    <img className={sp.wide ? s.w120 : ""} src={sp.btnImg} alt="" height="30" />
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Subscription Plans */}
          <section id="plans">
            <div className={s["plans-head"]}>
              <h2>Subscription Plans</h2>
              <div className={s.seg}>
                <button
                  type="button"
                  aria-pressed={planMeal === "Lunch"}
                  onClick={() => setPlanMeal("Lunch")}
                >
                  Lunch
                </button>
                <button
                  type="button"
                  aria-pressed={planMeal === "Dinner"}
                  onClick={() => setPlanMeal("Dinner")}
                >
                  Dinner
                </button>
              </div>
            </div>
            <div className={`${s["h-scroll"]} ${s["plans-row"]}`}>
              {displayedPlans.map((plan) => {
                const isWish = isInWishlist(plan.id);
                return (
                  <article key={plan.id} className={s["plan-card"]}>
                    <div className={s["plan-card__media"]}>
                      <img className={s.photo} src={plan.img} alt={plan.title} />
                      <span className={`${s["glass-tag"]} ${s["glass-tag--top"]}`}>Top Rated</span>
                      <span
                        className={`${s["glass-tag"]} ${s["glass-tag--meal"]}`}
                        style={{ width: `${plan.mealWidth}px` }}
                      >
                        {plan.meal}
                      </span>
                      <button
                        className={s["plan-card__wish"]}
                        aria-label={isWish ? "Remove from wishlist" : "Add to wishlist"}
                        type="button"
                        onClick={() => handleToggleWishlist(plan)}
                      >
                        <img
                          src={plan.wishIcon}
                          alt=""
                          width="28"
                          height="26"
                          style={{ filter: isWish ? "sepia(1) saturate(5) hue-rotate(320deg)" : "none" }}
                        />
                      </button>
                    </div>
                    <div className={s["plan-card__content"]}>
                      <div className={s["plan-card__info"]}>
                        <div className={s["plan-card__row"]}>
                          <h3 className={s["plan-card__title"]}>{plan.title}</h3>
                          <span className={s["rating-pill"]}>
                            <img src="/assets/icon-star.svg" alt="" width="10" height="10" />
                            {plan.rating}
                          </span>
                        </div>
                        <div className={`${s["plan-card__row"]} ${s["plan-card__row--center"]}`}>
                          <p className={s["plan-card__sub"]}>
                            {plan.boldSub}
                            <span>{plan.lightSub}</span>
                          </p>
                          <span
                            className={`${s["diet-mark"]} ${plan.veg ? s["diet-mark--veg"] : s["diet-mark--nonveg"]}`}
                            aria-label={plan.veg ? "Veg" : "Non-veg"}
                          />
                        </div>
                        <div className={s.price}>
                          <span className={s.price__now}>₹{plan.price}</span>
                          <span className={s.price__unit}>/day</span>
                          <span className={s.price__was}>₹{plan.wasPrice}</span>
                        </div>
                      </div>
                      <button
                        className={s.cta}
                        type="button"
                        onClick={() => handleSubscribePlan(plan)}
                      >
                        Subscribe
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Ratings & Reviews */}
            <section className={s.reviews} id="reviews">
              <div className={s.reviews__head}>
                <div>
                  <h2>Ratings &amp; reviews</h2>
                  <p>From 128 verified orders</p>
                </div>
                <a className={s.reviews__link} href="#reviews">See all 128 reviews →</a>
              </div>
              <div className={s.reviews__body}>
                <aside className={s.summary}>
                  <div>
                    <div className={s.summary__score}>
                      <span className={s.summary__big}>4.6</span>
                      <span className={s.summary__stars}>★★★★★</span>
                    </div>
                    <p className={s.summary__count}>128 reviews · 12k+ ratings</p>
                  </div>
                  <div className={s.bars}>
                    <div className={s.bar}>
                      <span>5 ★</span>
                      <span className={s.bar__track}>
                        <span className={s.bar__fill} style={{ display: "block", width: "74%" }} />
                      </span>
                      <span>74%</span>
                    </div>
                    <div className={s.bar}>
                      <span>4 ★</span>
                      <span className={s.bar__track}>
                        <span className={s.bar__fill} style={{ display: "block", width: "18%" }} />
                      </span>
                      <span>18%</span>
                    </div>
                    <div className={s.bar}>
                      <span>3 ★</span>
                      <span className={s.bar__track}>
                        <span className={s.bar__fill} style={{ display: "block", width: "5%" }} />
                      </span>
                      <span>5%</span>
                    </div>
                    <div className={s.bar}>
                      <span>2 ★</span>
                      <span className={s.bar__track}>
                        <span className={s.bar__fill} style={{ display: "block", width: "2%" }} />
                      </span>
                      <span>2%</span>
                    </div>
                    <div className={s.bar}>
                      <span>1 ★</span>
                      <span className={s.bar__track}>
                        <span className={s.bar__fill} style={{ display: "block", width: "1%" }} />
                      </span>
                      <span>1%</span>
                    </div>
                  </div>
                  <div className={s.tags}>
                    <span className={s.tag}>Tastes like home</span>
                    <span className={s.tag}>Soft rotis</span>
                    <span className={s.tag}>On time</span>
                    <span className={s.tag}>Good portion</span>
                  </div>
                </aside>
                <div className={s["review-grid"]}>
                  {REVIEWS_DATA.map((rev) => {
                    const liked = likedReviewMap[rev.id];
                    return (
                      <article key={rev.id} className={s.review}>
                        <div className={s.review__top}>
                          <span className={s.review__avatar}>{rev.avatar}</span>
                          <div>
                            <p className={s.review__name}>{rev.name}</p>
                            <p className={s.review__time}>{rev.time}</p>
                          </div>
                          <span className={s.review__stars} aria-label="5 out of 5">
                            {rev.stars}
                          </span>
                        </div>
                        <p className={s.review__text}>{rev.text}</p>
                        <div className={s.review__foot}>
                          <span className={s.review__plan}>{rev.plan}</span>
                          <button
                            type="button"
                            onClick={() => handleLikeReview(rev.id)}
                            style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}
                          >
                            <span className={s.review__meta}>
                              {liked ? "❤️" : "♡"} {rev.likes + (liked ? 1 : 0)}   Reply
                            </span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Explore More Kitchens */}
            <section className={s.explore}>
              <div className={s.explore__head}>
                <div>
                  <h2>Explore More Kitchens</h2>
                  <p>Discover new flavors and order daily tiffins from top home kitchens near you.</p>
                </div>
                <Link className={s.explore__link} href="/kitchens">See all →</Link>
              </div>
              <div className={`${s["h-scroll"]} ${s["explore-row"]}`}>
                {EXPLORE_KITCHENS.map((k, idx) => (
                  <article key={`${k.id}-${idx}`} className={s["kitchen-card"]}>
                    <div className={s["kitchen-card__media"]}>
                      <img src={k.img} alt={k.name} />
                      <span className={s["save-badge"]}>{k.save}</span>
                    </div>
                    <div className={s["kitchen-card__body"]}>
                      <p className={s["kitchen-card__cuisine"]}>{k.cuisine}</p>
                      <h3 className={s["kitchen-card__name"]}>{k.name}</h3>
                      <p className={s["kitchen-card__plan"]}>{k.plan}</p>
                      <div className={s.price}>
                        <span className={s.price__now}>₹{k.price}</span>
                        <span className={s.price__unit}>/day</span>
                        <span className={s.price__was}>₹{k.wasPrice}</span>
                      </div>
                      <Link
                        href={`/kitchens/${k.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className={s.cta}
                        style={{ textDecoration: "none", display: "block" }}
                      >
                        Explore Menu
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </main>

      {/* Interactive feedback toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </div>
  );
}
