"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getInitialCart, saveCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { slugify } from "@/lib/kitchens";
import PlanCard from "@/components/ui/PlanCard";
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
    link: "/ammas-kitchen",
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
    link: "/punjab-rasoi",
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
    link: "/dragon-wok-express",
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
    link: "/ghar-ka-swaad",
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
    link: "/annapurna-cloud-kitchen",
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
    link: "/bong-bhoj",
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
    link: "/gujarat-rasoi",
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
    link: "/continental-bites",
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
  // South Indian
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
    name: "Dosa Plaza Express",
    score: "4.5",
    cuisine: "South Indian",
    cost: "₹120 for two",
    loc: "Sector 63, Noida",
    dist: "1.8 km",
    offer: "Flat 25% OFF",
    promoted: false,
    img: "/assets/restaurant-3.png",
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
    name: "Madras Tiffin Room",
    score: "4.6",
    cuisine: "South Indian",
    cost: "₹90 for two",
    loc: "Sector 50, Noida",
    dist: "3.2 km",
    offer: "Flat 15% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
  },

  // North Indian
  {
    id: "r6",
    name: "Punjab Rasoi Deluxe",
    score: "4.5",
    cuisine: "North Indian",
    cost: "₹150 for two",
    loc: "Sector 18, Noida",
    dist: "1.4 km",
    offer: "Flat 20% OFF",
    promoted: true,
    img: "/assets/restaurant-2.png",
  },
  {
    id: "r7",
    name: "Amritsari Kulcha Junction",
    score: "4.3",
    cuisine: "North Indian",
    cost: "₹120 for two",
    loc: "Sector 62, Noida",
    dist: "2.5 km",
    offer: "Flat 15% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
  },
  {
    id: "r8",
    name: "Pind Da Swaad",
    score: "4.6",
    cuisine: "North Indian",
    cost: "₹130 for two",
    loc: "Sector 50, Noida",
    dist: "2.9 km",
    offer: "Flat 25% OFF",
    promoted: false,
    img: "/assets/restaurant-3.png",
  },
  {
    id: "r9",
    name: "Dilli 6 Parantha House",
    score: "4.4",
    cuisine: "North Indian",
    cost: "₹110 for two",
    loc: "Sector 63, Noida",
    note: "Opens in 15 minutes",
    dist: "2.0 km",
    offer: "Flat 10% OFF",
    promoted: true,
    tall: true,
    img: "/assets/restaurant-2.png",
  },

  // Chinese
  {
    id: "r10",
    name: "Dragon Wok Express",
    score: "4.3",
    cuisine: "Chinese",
    cost: "₹140 for two",
    loc: "Sector 63, Noida",
    dist: "1.6 km",
    offer: "Flat 20% OFF",
    promoted: true,
    img: "/assets/restaurant-3.png",
  },
  {
    id: "r11",
    name: "The Red Lantern Bowl",
    score: "4.5",
    cuisine: "Chinese",
    cost: "₹160 for two",
    loc: "Sector 18, Noida",
    dist: "2.4 km",
    offer: "Flat 15% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
  },
  {
    id: "r12",
    name: "Chopsticks & Dimsum Co.",
    score: "4.2",
    cuisine: "Chinese",
    cost: "₹130 for two",
    loc: "Sector 62, Noida",
    dist: "2.8 km",
    offer: "Flat 10% OFF",
    promoted: false,
    img: "/assets/restaurant-2.png",
  },

  // Gujarati
  {
    id: "r13",
    name: "Gujarat Rasoi Bhavan",
    score: "4.7",
    cuisine: "Gujarati",
    cost: "₹110 for two",
    loc: "Sector 76, Noida",
    dist: "2.6 km",
    offer: "Flat 20% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
  },
  {
    id: "r14",
    name: "Kathiyawadi Thali Ghar",
    score: "4.6",
    cuisine: "Gujarati",
    cost: "₹120 for two",
    loc: "Sector 62, Noida",
    dist: "1.9 km",
    offer: "Flat 15% OFF",
    promoted: true,
    img: "/assets/restaurant-2.png",
  },

  // Continental
  {
    id: "r15",
    name: "Continental Bites & Bowls",
    score: "4.4",
    cuisine: "Continental",
    cost: "₹180 for two",
    loc: "Sector 144, Noida",
    dist: "3.4 km",
    offer: "Flat 20% OFF",
    promoted: true,
    img: "/assets/restaurant-3.png",
  },
  {
    id: "r16",
    name: "The Salad & Pasta Kitchen",
    score: "4.5",
    cuisine: "Continental",
    cost: "₹160 for two",
    loc: "Sector 62, Noida",
    dist: "2.0 km",
    offer: "Flat 15% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
  },

  // Bengali
  {
    id: "r17",
    name: "Bong Bhoj Kitchen",
    score: "4.6",
    cuisine: "Bengali",
    cost: "₹140 for two",
    loc: "Indirapuram, Ghaziabad",
    dist: "2.8 km",
    offer: "Flat 20% OFF",
    promoted: true,
    img: "/assets/restaurant-2.png",
  },
  {
    id: "r18",
    name: "Calcutta Street Flavours",
    score: "4.5",
    cuisine: "Bengali",
    cost: "₹130 for two",
    loc: "Sector 62, Noida",
    dist: "2.3 km",
    offer: "Flat 15% OFF",
    promoted: false,
    img: "/assets/restaurant-1.png",
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
  // --- LUNCH ITEMS ---
  {
    id: "meal-aloo-parantha",
    name: "Aloo Parantha + Dahi",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 35,
    img: "/assets/meal-aloo.png",
    mealType: "lunch",
  },
  {
    id: "meal-dal-makhani",
    name: "Dal Makhani + Naan",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 65,
    img: "/assets/meal-lunch.png",
    mealType: "lunch",
  },
  {
    id: "meal-thali-special",
    name: "Special Thali (Dal, Sabji & 4 Roti)",
    kitchen: "Meena's Tiffin",
    rating: "8.7",
    price: 85,
    img: "/assets/meal-thali-special.png",
    mealType: "lunch",
  },
  {
    id: "meal-chole-bhature",
    name: "Chole Bhature Platter",
    kitchen: "Punjab Rasoi",
    rating: "8.9",
    price: 75,
    img: "/assets/meal-card-1.png",
    mealType: "lunch",
  },
  {
    id: "meal-south-thali",
    name: "South Indian Lunch Feast",
    kitchen: "Amma's Kitchen",
    rating: "9.1",
    price: 90,
    img: "/assets/dish-thali.png",
    mealType: "lunch",
  },
  {
    id: "meal-rajma-chawal",
    name: "Homestyle Rajma Chawal Bowl",
    kitchen: "Ananya's Kitchen",
    rating: "8.8",
    price: 60,
    img: "/assets/meal-thali.png",
    mealType: "lunch",
  },

  // --- DINNER ITEMS ---
  {
    id: "meal-butter-chicken-1",
    name: "Butter Chicken + Rice",
    kitchen: "Punjab Rasoi",
    rating: "8.9",
    price: 120,
    img: "/assets/meal-butter-chicken.png",
    mealType: "dinner",
  },
  {
    id: "meal-paneer-butter",
    name: "Paneer Butter Masala + Naan",
    kitchen: "Meena's Tiffin",
    rating: "8.8",
    price: 110,
    img: "/assets/meal-dinner.png",
    mealType: "dinner",
  },
  {
    id: "meal-dal-tadka",
    name: "Dal Tadka + Jeera Rice Combo",
    kitchen: "Amma's Kitchen",
    rating: "8.7",
    price: 79,
    img: "/assets/menu-dal-tadka.png",
    mealType: "dinner",
  },
  {
    id: "meal-royal-thali",
    name: "Royal Deluxe Dinner Thali",
    kitchen: "Ananya's Kitchen",
    rating: "9.2",
    price: 129,
    img: "/assets/meal-card-4.png",
    mealType: "dinner",
  },
  {
    id: "meal-kadhai-paneer",
    name: "Kadhai Paneer + 3 Butter Roti",
    kitchen: "Punjab Rasoi",
    rating: "8.7",
    price: 99,
    img: "/assets/plan-food.png",
    mealType: "dinner",
  },
  {
    id: "meal-biryani-combo",
    name: "Dum Biryani + Mirchi Ka Salan",
    kitchen: "Punjab Rasoi",
    rating: "9.0",
    price: 135,
    img: "/assets/restaurant-2.png",
    mealType: "dinner",
  },
];

const POPULAR_PICKS = [
  { id: "pop-1", kitchen: "Ananya's Kitchen", cuisine: "South Indian", dish: "Regular Thali", price: 89 },
  { id: "pop-2", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Dahi Bhalla", price: 99 },
  { id: "pop-3", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Dahi Bhalla", price: 99 },
  { id: "pop-4", kitchen: "Ananya's Kitchen", cuisine: "South Indian", dish: "Rajma Chawal", price: 89, isDay: true },
  { id: "pop-5", kitchen: "Ananya's Kitchen", cuisine: "South Indian", dish: "Rajma Chawal", price: 89, isDay: true },
  { id: "pop-6", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Deluxe Thali", price: 99 },
  { id: "pop-7", kitchen: "Meena's Tiffin", cuisine: "North Indian", dish: "Deluxe Thali", price: 99 },
];

export default function HomeScreen() {
  const router = useRouter();
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

  const handleSubscribePlan = (plan) => {
    const currentCart = getInitialCart();
    const items = [...(currentCart.items || [])];
    const planName = plan.title || plan.name || "Lunch Plan";
    const existingIndex = items.findIndex((x) => x.id === plan.id || x.name === planName);

    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: plan.id,
        name: planName,
        tag: "Plan",
        sub: plan.descBold ? `${plan.descBold} ${plan.descLight || ""}` : "Daily home-style tiffin",
        perDay: plan.price ? Number(String(plan.price).replace(/[^\d]/g, "")) : 89,
        qty: 1,
        kitchen: plan.kitchen || "Perfect Kitchen",
        liked: true,
      });
    }

    const updated = { ...currentCart, items };
    saveCart(updated);
    router.push("/cart?checkout=true");
  };

  const handleToggleWishlist = (plan) => {
    const isNowSaved = toggleWishlist({
      id: plan.id,
      name: plan.title || plan.name,
      title: plan.title || plan.name,
      price: plan.price,
      wasPrice: plan.wasPrice || 109,
      kitchen: plan.kitchen,
      descBold: plan.descBold || "Special Thali  ",
      descLight: plan.descLight || "(Dali ,Sabji & 4 Roti )",
      rating: plan.rating || "4.2",
      veg: plan.veg,
      badge: "Top Rated",
      mealType: "Lunch",
      tag: "Lunch Plan",
      img: "/assets/sub-plan.png",
    });
    showToast(isNowSaved ? `✓ Saved "${plan.title || plan.name}" to Wishlist!` : `Removed "${plan.title || plan.name}" from Wishlist`);
  };

  // Filter partners
  const filteredPartners = PARTNERS_DATA.filter((p) => {
    if (vegOnly && !p.veg) return false;
    if (activeChip === "Open Now" && p.closed) return false;
    if (activeChip === "Rated 4+" && parseFloat(p.rating) < 4.4) return false;
    return true;
  });

  // Filter restaurants by selected cuisine
  const filteredRestaurants = RESTAURANTS.filter(
    (rest) => !activeCuisine || rest.cuisine === activeCuisine
  );

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
            <Link
              key={partner.id}
              href={partner.link || "/partner-listing"}
              className={`${s.partner} ${partner.closed ? s.closed : ""}`}
            >
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
              </div>
            </Link>
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
          {filteredRestaurants.map((rest) => (
            <Link
              key={rest.id}
              className={s.rest}
              href={`/${slugify(rest.name)}`}
            >
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
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isFav={isInWishlist(plan.id)}
              onToggleFav={handleToggleWishlist}
              onSubscribe={handleSubscribePlan}
            />
          ))}
        </div>
      </section>

      {/* Browse by meal */}
      <section className={s.browse}>
        <h2>Browse by meal</h2>
        <div className={s["meal-tabs"]} role="tablist">
          <div
            className={`${s.tab} ${activeMealTab === "lunch" ? s.active : ""}`}
            onClick={() => setActiveMealTab("lunch")}
            role="tab"
            aria-selected={activeMealTab === "lunch"}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveMealTab("lunch")}
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
            role="tab"
            aria-selected={activeMealTab === "dinner"}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveMealTab("dinner")}
          >
            <img src="/assets/meal-dinner.png" alt="Dinner" />
            <div>
              <b>Dinner</b>
              <small>Opens 6:00 PM</small>
            </div>
          </div>
        </div>

        <div className={`${s["h-scroll"]} ${s["meal-row"]}`}>
          {MEAL_ITEMS.filter((meal) => meal.mealType === activeMealTab).map((meal) => {
            const isSaved = isInWishlist(meal.id);

            return (
              <article
                key={meal.id}
                className={s.meal}
                onClick={() => router.push(`/${slugify(meal.kitchen)}`)}
                title={`View ${meal.kitchen}`}
              >
                <div className={s["meal-img"]}>
                  <img src={meal.img} alt={meal.name} />

                  {/* Glass tag for Lunch / Dinner */}
                  <div className={s["meal-glass-tag"]}>
                    <span className={`${s["glass-dot"]} ${meal.mealType === "dinner" ? s.dinner : ""}`} />
                    <span>{meal.mealType === "dinner" ? "Dinner" : "Lunch"}</span>
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    className={s["meal-fav-btn"]}
                    aria-label={isSaved ? `Remove ${meal.name} from wishlist` : `Add ${meal.name} to wishlist`}
                    title={isSaved ? "Saved in wishlist" : "Add to wishlist"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(meal);
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill={isSaved ? "#b3261e" : "rgba(0,0,0,0.3)"}
                      stroke={isSaved ? "#b3261e" : "#ffffff"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className={s["meal-body"]}>
                  <div className={s["meal-top"]}>
                    <b>{meal.name}</b>
                    <span>{meal.rating}</span>
                  </div>
                  <Link
                    href={`/${slugify(meal.kitchen)}`}
                    className={s["meal-kitchen"]}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {meal.kitchen}
                  </Link>
                  <div className={s["meal-foot"]}>
                    <b>₹{meal.price}</b>
                    <button
                      className={s.add}
                      type="button"
                      aria-label={`Add ${meal.name} to cart`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart({
                          id: meal.id,
                          name: meal.name,
                          price: meal.price,
                          tag: meal.mealType === "dinner" ? "Dinner" : "Lunch",
                          kitchen: meal.kitchen,
                          img: meal.img,
                        });
                      }}
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
            <article
              key={`${pop.id}-${i}`}
              className={s.pop}
              onClick={() => router.push(`/${slugify(pop.kitchen)}`)}
              title={`View ${pop.kitchen}`}
            >
              <div className={s["pop-img"]}>
                <img src="/assets/popular-bg.png" alt={pop.dish} />
                <span className={s["pop-rate"]}>
                  <i>★</i>
                  <b>4.6</b>
                </span>
              </div>
              <div className={s["pop-body"]}>
                <span className={s["cuisine-tag"]}>{pop.cuisine}</span>
                <h4>
                  <Link
                    href={`/${slugify(pop.kitchen)}`}
                    className={s["pop-kitchen"]}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {pop.kitchen}
                  </Link>
                </h4>
                <span className={s.dish}>{pop.dish}</span>
                <div className={s["pop-price"]}>
                  ₹{pop.price} {pop.isDay && <small>/day</small>}
                </div>
                <button
                  className={s["btn-reorder"]}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/${slugify(pop.kitchen)}`);
                  }}
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

