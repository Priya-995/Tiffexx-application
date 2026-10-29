"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./AboutUsSection.module.css";

const HOW_TABS = [
  {
    id: "browse",
    title: "Browse kitchens",
    desc: "See kitchens that deliver to your address. Each one delivers within 6.5 km of where it cooks.",
    pill: "Delivering to Noida",
    note: "Every kitchen here is within 6.5 km of you",
    cards: [
      {
        initial: "S",
        color: "#c4562f",
        name: "Sharma Ji Ki Rasoi",
        cuisine: "North Indian thali",
        km: "2.1 km",
      },
      {
        initial: "A",
        color: "#2f7d45",
        name: "Amma's Tiffin",
        cuisine: "South Indian meals",
        km: "3.4 km",
      },
      {
        initial: "P",
        color: "#3f110d",
        name: "Punjabi Tadka",
        cuisine: "Home-style Punjabi",
        km: "5.8 km",
      },
    ],
  },
  {
    id: "order",
    title: "Order or subscribe",
    desc: "Choose single meals or set mealtime on autopilot with weekly and monthly home-style subscriptions.",
    pill: "Flexible Daily Plans",
    note: "Pause, reschedule or cancel anytime with zero cancellation charges",
    cards: [
      {
        initial: "V",
        color: "#c4562f",
        name: "Veg Thali Lunch Plan",
        cuisine: "Mon–Sat · Delivered 12:45 PM",
        km: "From ₹89",
      },
      {
        initial: "S",
        color: "#2f7d45",
        name: "South Indian Express",
        cuisine: "Breakfast & Lunch combo",
        km: "From ₹99",
      },
      {
        initial: "D",
        color: "#3f110d",
        name: "Desi Homestyle Dinner",
        cuisine: "Daily fresh rotis & dal",
        km: "From ₹109",
      },
    ],
  },
  {
    id: "pay",
    title: "Pay from your wallet",
    desc: "Recharge your Tiffexx Wallet with 1-tap UPI. Enjoy automatic coins rewards, cashback, and instant refunds.",
    pill: "Fast & Secure Payments",
    note: "End-to-end encrypted checkout with zero failed payment delays",
    cards: [
      {
        initial: "W",
        color: "#2f7d45",
        name: "Tiffexx Wallet Pay",
        cuisine: "Instant 1-tap debits",
        km: "Active",
      },
      {
        initial: "C",
        color: "#f39a1e",
        name: "Reward Coins Bonus",
        cuisine: "Earn coins on every subscription",
        km: "₹25 Free",
      },
      {
        initial: "R",
        color: "#3f110d",
        name: "Instant Refunds",
        cuisine: "Direct credit back to wallet",
        km: "Instant",
      },
    ],
  },
  {
    id: "track",
    title: "Track your delivery",
    desc: "Track real-time order status from the home kitchen stove to your doorstep with live ETA updates.",
    pill: "Live GPS Tracking",
    note: "Insulated hot-bags maintain piping hot fresh food on arrival",
    cards: [
      {
        initial: "K",
        color: "#c4562f",
        name: "Kitchen Preparing",
        cuisine: "Freshly cooked with care",
        km: "12:15 PM",
      },
      {
        initial: "R",
        color: "#2f7d45",
        name: "Rider on the Way",
        cuisine: "Contactless delivery partner",
        km: "8 mins",
      },
      {
        initial: "D",
        color: "#3f110d",
        name: "Doorstep Arrival",
        cuisine: "OTP verified handover",
        km: "12:35 PM",
      },
    ],
  },
];

const CITIES_DATA = {
  noida: {
    name: "Noida",
    count: 3,
    description: "You’re in Noida. Each kitchen delivers within 6.5 km of where it cooks.",
    chips: ["Kitchen D", "Kitchen E", "Kitchen F"],
  },
  greaterNoida: {
    name: "Greater Noida",
    count: 2,
    description: "You’re in Greater Noida. Each kitchen delivers within 6.5 km of where it cooks.",
    chips: ["Kitchen A", "Kitchen B"],
  },
  ghaziabad: {
    name: "Ghaziabad",
    count: 4,
    description: "You’re in Ghaziabad. Each kitchen delivers within 6.5 km of where it cooks.",
    chips: ["Kitchen G", "Kitchen H", "Kitchen I", "Kitchen J"],
  },
};

export default function AboutUsSection() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activeCity, setActiveCity] = useState("noida");

  const currentTab = HOW_TABS[activeTabIdx];
  const currentCityData = CITIES_DATA[activeCity];

  return (
    <main className={styles.main}>
      {/* Breadcrumbs */}
      <p className={styles.crumbs}>
        <Link href="/" className={styles.pj}>Home</Link>
        <span> / </span>
        <Link href="/kitchens" className={styles.pj}>Noida</Link>
        <span> / </span>
        <span className={`${styles.cur} ${styles.pj}`}>About Us</span>
      </p>

      <div className={styles.wrap}>
        {/* ============ Hero ============ */}
        <div className={styles.hero2}>
          <div className={styles.hero2__text}>
            <p className={styles.kicker}>WHAT TIFFEXX IS</p>
            <h1>About Tiffexx</h1>
            <p className={styles.hero2__sub}>Fresh home-style tiffins, delivered daily.</p>
            <div className={styles.hero2__body}>
              <p>
                Tiffexx is a technology platform that connects customers with independent<br />
                tiffin partners — home kitchens and small food businesses — and with<br />
                delivery partners who bring the food to your door.
              </p>
              <p>
                The kitchen cooks the food and is responsible for it. Tiffexx handles<br />
                everything around that: discovery, ordering, payment, delivery and<br />
                support.
              </p>
            </div>
          </div>
          <div className={styles.hero2__img}>
            <img src="/assets/hero-fssai.png" alt="FSSAI Certified Tiffexx Kitchens" />
          </div>
        </div>

        {/* ============ How it works ============ */}
        <section className={styles.how}>
          <h2 className={styles.bigTitle}>How it works</h2>
          <div className={styles.how__grid}>
            <div className={styles.tabs}>
              {HOW_TABS.map((tab, idx) => {
                const isActive = idx === activeTabIdx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTabIdx(idx)}
                    className={`${styles.tab} ${isActive ? styles.isActive : ""}`}
                  >
                    <h3>{tab.title}</h3>
                    {isActive && <p>{tab.desc}</p>}
                  </button>
                );
              })}
            </div>

            <div className={styles.panel}>
              <div className={styles.panel__in}>
                <div className={styles.panel__col}>
                  <div className={styles.pillLive}>
                    <i></i>
                    {currentTab.pill}
                  </div>
                  {currentTab.cards.map((c, i) => (
                    <div key={i} className={styles.kcard}>
                      <span className={styles.kcard__av} style={{ background: c.color }}>
                        {c.initial}
                      </span>
                      <div className={styles.kcard__t}>
                        <b>{c.name}</b>
                        <span>{c.cuisine}</span>
                      </div>
                      <span className={styles.kcard__km}>{c.km}</span>
                    </div>
                  ))}
                  <p className={styles.panel__note}>{currentTab.note}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Where we operate ============ */}
        <section className={styles.where}>
          <h2 className={styles.bigTitle}>Where we operate</h2>
          <div className={styles.where__grid}>
            <div className={styles.where__left}>
              <p className={styles.where__lead}>
                Tiffexx kitchens currently serve these cities. Which kitchens<br />
                you can order from depends on your delivery address.
              </p>
              <div className={styles.cities}>
                <button
                  type="button"
                  onClick={() => setActiveCity("noida")}
                  className={`${styles.city} ${activeCity === "noida" ? styles.isActive : ""}`}
                >
                  <i></i>Noida
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCity("greaterNoida")}
                  className={`${styles.city} ${activeCity === "greaterNoida" ? styles.isActive : ""}`}
                >
                  <i></i>Greater Noida
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCity("ghaziabad")}
                  className={`${styles.city} ${activeCity === "ghaziabad" ? styles.isActive : ""}`}
                >
                  <i></i>Ghaziabad
                </button>
              </div>

              <div className={styles.result}>
                <h3>
                  <em>{currentCityData.count}</em> kitchens deliver to<br />
                  this address
                </h3>
                <p>{currentCityData.description}</p>
                <div className={styles.chips}>
                  {currentCityData.chips.map((chip, i) => (
                    <span key={i}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className={styles.map} role="img" aria-label="Map of Tiffexx kitchens">
              <img className={styles.map__bg} src="/assets/map-bg.png" alt="" />
              <div className={styles.map__layer}>
                <img
                  src="/assets/map-gridlines.svg"
                  alt=""
                  style={{ inset: 0, width: "100%", height: "100%" }}
                />
                <div className={styles.map__abs} style={{ inset: "5.21% 22.5% 61.46% 34.17%", opacity: 0.55 }}>
                  <img src="/assets/map-vector.svg" alt="" />
                </div>
                <div className={styles.map__abs} style={{ inset: "37.5% 42.5% 27.08% 14.17%", opacity: 0.55 }}>
                  <img src="/assets/map-vector1.svg" alt="" />
                </div>
                <div className={styles.map__abs} style={{ inset: "65.63% 9.17% 5.21% 47.5%", opacity: 0.55 }}>
                  <img src="/assets/map-vector2.svg" alt="" />
                </div>
                <div className={styles.map__abs} style={{ top: "50%", bottom: "35.42%", left: "28.33%", right: "59.17%" }}>
                  <img
                    src="/assets/map-links.svg"
                    alt=""
                    style={{ inset: "-0.82% -0.76%", width: "101.52%", height: "101.64%" }}
                  />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "3.33% 39.67% 70.83% 39.67%" }}>
                  <img src="/assets/map-group0.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "12.08% 28.83% 62.08% 50.5%" }}>
                  <img src="/assets/map-group1.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "18.33% 35.5% 55.83% 43.83%" }}>
                  <img src="/assets/map-group2.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "37.08% 61.33% 37.08% 18%" }}>
                  <img src="/assets/map-group3.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "45.42% 48.83% 28.75% 30.5%" }}>
                  <img src="/assets/map-group4.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "51.67% 55.5% 22.5% 23.83%" }}>
                  <img src="/assets/map-group4.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "33.96% 42.17% 40.21% 37.17%" }}>
                  <img src="/assets/map-group0.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "62.08% 26.33% 12.08% 53%" }}>
                  <img src="/assets/map-group1.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "71.46% 15.5% 2.71% 63.83%" }}>
                  <img src="/assets/map-group2.svg" alt="" />
                </div>
                <div className={`${styles.map__abs} ${styles["map__abs--k"]}`} style={{ inset: "56.87% 18% 17.29% 61.33%" }}>
                  <img src="/assets/map-group2.svg" alt="" />
                </div>

                <p
                  className={`${styles.map__lbl} ${activeCity === "ghaziabad" ? styles.isHighlighted : ""}`}
                  style={{ inset: "7.71% 37.54% 88.43% 49.25%" }}
                >
                  Ghaziabad
                </p>
                <p
                  className={`${styles.map__lbl} ${activeCity === "noida" ? styles.isHighlighted : ""}`}
                  style={{ inset: "66.67% 60.72% 29.47% 32.08%" }}
                >
                  Noida
                </p>
                <p
                  className={`${styles.map__lbl} ${activeCity === "greaterNoida" ? styles.isHighlighted : ""}`}
                  style={{ inset: "89.58% 22.35% 6.56% 60.67%" }}
                >
                  Greater Noida
                </p>

                <div className={styles.map__abs} style={{ inset: "48.13% 61.5% 39.38% 33.17%" }}>
                  <img
                    src="/assets/map-pin.svg"
                    alt=""
                    style={{ inset: "-1.59% -2.97% 0 -2.97%", width: "105.94%", height: "101.59%" }}
                  />
                </div>
              </div>

              <div className={styles.map__legend}>
                <div style={{ width: "45.26px" }}>
                  <i style={{ background: "#3f110d" }}></i>
                  <span>Kitchen</span>
                </div>
                <div style={{ width: "76px" }}>
                  <i style={{ background: "#f39a1e" }}></i>
                  <span>Delivers to you</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Cook / ride ============ */}
        <section className={styles.block}>
          <h2>Cook with us, or ride with us</h2>
          <div className={styles.cards}>
            <div className={`${styles.cta} ${styles["cta--dark"]}`}>
              <div className={styles.cta__emoji}>👩‍🍳</div>
              <h3>Run a kitchen?</h3>
              <p>
                Become a Tiffin Partner and sell meals and subscriptions on Tiffexx. Start<br />
                from the Sign Up screen — our team reviews every partner account<br />
                before it goes live.
              </p>
              <Link className={styles.cta__btn} href="/signup?role=chef">
                Become a Tiffin Partner
              </Link>
            </div>
            <div className={`${styles.cta} ${styles["cta--light"]}`}>
              <div className={styles.cta__emoji}>🛵</div>
              <h3>Want to earn on your own schedule?</h3>
              <p>
                Become a Delivery Partner and choose the account type that fits when<br />
                you sign up. Every account is reviewed before it goes live.
              </p>
              <Link className={styles.cta__btn} href="/signup?role=delivery">
                Become a Delivery Partner
              </Link>
            </div>
          </div>
        </section>

        {/* ============ Talk to us ============ */}
        <section className={styles.block}>
          <h2>Talk to us</h2>
          <div className={styles.talk}>
            <a href="mailto:support@tiffexx.com" className={styles.talk__item}>
              <span className={styles.talk__ico}>✉️</span>
              <span className={styles.t}>support@tiffexx.com</span>
            </a>
            <span className={styles.talk__div}></span>
            <a href="tel:+919217049217" className={styles.talk__item}>
              <span className={styles.talk__ico}>📞</span>
              <span className={styles.t}>+91 92170 49217</span>
            </a>
            <span className={styles.talk__div}></span>
            <div className={styles.talk__item}>
              <span className={styles.talk__ico}>💬</span>
              <span className={styles.t}>Raise a ticket from Help &amp; Support in the app</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
