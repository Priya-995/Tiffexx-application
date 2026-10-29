"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./ProfileSection.module.css";
import { useAuth } from "@/lib/auth";

const CALENDAR_DAYS = [
  { date: "05 Jul", count: "2 orders", empty: false },
  { date: "06 Jul", count: "0 orders", empty: true },
  { date: "07 Jul", count: "1 order", empty: false },
  { date: "08 Jul", count: "1 order", empty: false },
  { date: "09 Jul", count: "1 order", empty: false },
  { date: "10 Jul", count: "1 order", empty: false },
  { date: "11 Jul", count: "1 order", empty: false },
  { date: "12 Jul", count: "1 order", empty: false },
  { date: "13 Jul", count: "3 orders", empty: false, sm: true },
  { date: "14 Jul", count: "3 orders", empty: false, sm: true },
  { date: "15 Jul", count: "3 orders", empty: false, sm: true },
  { date: "16 Jul", count: "3 orders", empty: false, sm: true },
  { date: "17 Jul", count: "3 orders", empty: false, sm: true },
  { date: "18 Jul", count: "3 orders", empty: false, sm: true },
];

export default function ProfileSection() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");
  const [activePrefTab, setActivePrefTab] = useState("Personal Information");
  const [vegOnly, setVegOnly] = useState(true);
  const [basicOpen, setBasicOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className={s.page}>
        <main className={s.content}>
          <div className="notifications-auth-card" style={{ margin: "60px auto" }}>
            <div className="notifications-auth-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#52110c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2>Sign in to view your Profile</h2>
            <p>
              Please sign in or create an account to access your meal subscriptions, delivery preferences, addresses, and wallet.
            </p>
            <div className="notifications-auth-actions">
              <Link href="/signin?redirect=/profile" className="btn-auth-login">
                Login
              </Link>
              <Link href="/signup" className="btn-auth-signup">
                Sign Up
              </Link>
            </div>
          </div>
        </main>
        {toastMessage && <div className={s.toast}>{toastMessage}</div>}
      </div>
    );
  }

  const displayName = user?.name || "Priya Sharma";
  const displayEmail = user?.email || "priya@gmail.com";
  const displayInitial = displayName ? displayName[0].toUpperCase() : "P";

  return (
    <div className={s.page}>
      <main className={s.content}>
        {/* Page Heading */}
        <div className={s.heading}>
          <h1 className={s.heading__title}>Profile</h1>
          <p className={s.heading__sub}>
            Manage your account, subscription preferences, and delivery details in one place.
          </p>
        </div>

        {/* Top Navigation Tabs */}
        <nav className={s.tabs} aria-label="Profile navigation">
          {["Overview", "Orders", "Subscriptions", "Wallet"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${s.tab} ${activeTab === tab ? s["tab--active"] : ""}`}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "Wallet") showToast("Showing wallet balance and transactions");
                if (tab === "Subscriptions") showToast("Showing active subscriptions");
                if (tab === "Orders") showToast("Showing recent order history");
              }}
            >
              {activeTab === tab && <span className={s.tab__dot} />}
              <p>{tab}</p>
            </button>
          ))}
        </nav>

        {/* Wallet view inside My Account */}
        {activeTab === "Wallet" && (
          <div style={{ background: "#fff", border: "1px solid #ece6dc", borderRadius: 16, padding: "24px 28px", marginBottom: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 13, color: "#7a6a5c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Tiffexx Wallet Balance</p>
                <p style={{ fontSize: 32, fontWeight: 700, color: "#1c1a17", margin: "4px 0" }}>₹25.00</p>
                <p style={{ fontSize: 13.5, color: "#2f6b3a", fontWeight: 500 }}>Active balance · automatically applied at checkout</p>
              </div>
              <Link href="/wallet" style={{ background: "#52110c", color: "#fff", padding: "11px 24px", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                Manage / Top-up Wallet →
              </Link>
            </div>
          </div>
        )}

        {/* Subscriptions view inside My Account */}
        {activeTab === "Subscriptions" && (
          <div style={{ background: "#fff", border: "1px solid #ece6dc", borderRadius: 16, padding: "24px 28px", marginBottom: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 13, color: "#7a6a5c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Active Subscription</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#1c1a17", margin: "4px 0" }}>Lunch plan — weekdays · ₹1,200/mo</p>
                <p style={{ fontSize: 13.5, color: "#2f6b3a", fontWeight: 500 }}>Active · Next delivery tomorrow, 1:00 P.M. from Amma&apos;s Kitchen</p>
              </div>
              <Link href="/subscriptions" style={{ background: "#52110c", color: "#fff", padding: "11px 24px", borderRadius: 999, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                Manage Subscription Details →
              </Link>
            </div>
          </div>
        )}

        {/* Overview Card */}
        <section className={s.overview}>
          <div className={s.overview__top}>
            <div className={s.summary}>
              <div className={s.summary__avatar}>
                <span>{displayInitial}</span>
              </div>
              <div className={s.identity}>
                <div className={s.identity__name_row}>
                  <p className={s.identity__name}>{displayName}</p>
                  <p className={s.identity__email}>{displayEmail}</p>
                </div>
                <p className={s.identity__role}>Weekday lunch subscriber</p>
                <div className={s.rating}>
                  <span className={s.rating__score}>4.9</span>
                  <span className={s.rating__muted}>(32 orders rated)</span>
                  <span className={s.rating__dot} />
                  <span className={s.rating__muted}>2.3km from Amma&apos;s Kitchen</span>
                </div>
                <div className={s.manage}>
                  <span className={s.manage__icon}>▤</span>
                  <Link className={s.manage__link} href="/partner-listing">
                    Manage subscription
                  </Link>
                </div>
              </div>
            </div>

            {/* Location Pill */}
            <Link className={s.location} href="/locations">
              <div className={s.location__text}>
                <span className={s.location__pin}>📍</span>
                <span className={s.location__name}>Sector 63, Noida</span>
              </div>
              <div className={s.location__go}>
                <span className={s.location__arrow}>→</span>
              </div>
            </Link>
          </div>

          {/* Calendar Delivery Grid (14 days, clean grid, NO scroller) */}
          <div className={s.calendar}>
            {CALENDAR_DAYS.map((d, i) => (
              <div
                key={i}
                className={`${s.day} ${d.empty ? s["day--empty"] : ""}`}
                role="button"
                tabIndex={0}
                onClick={() =>
                  showToast(`${d.date}: ${d.count} delivered to Sector 63, Noida`)
                }
              >
                <p className={`${s.day__date} ${d.sm ? s["day__date--sm"] : ""}`}>
                  {d.date}
                </p>
                <p className={s.day__count}>{d.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details Section (Sidebar + Main Column) */}
        <section className={s.details}>
          {/* Sidebar */}
          <aside className={s.sidebar}>
            {/* Member Since Card */}
            <div className={`${s.card} ${s["card--lg"]} ${s.member}`}>
              <div className={s.member__text}>
                <p className={s.member__title}>Member Since</p>
                <p className={s.member__sub}>2 years with Tiffexx</p>
              </div>
              <div className={s.member__actions}>
                <button
                  type="button"
                  className={`${s.circle} ${s["circle--light"]}`}
                  aria-label="Edit Profile"
                  onClick={() => showToast("Profile edit dialog coming soon!")}
                >
                  <img className={s["icon-13"]} src="/assets/icons/pencil.svg" alt="" />
                </button>
                <div className={`${s.circle} ${s["circle--dark"]}`}>✦</div>
              </div>
            </div>

            {/* Basic Information Card */}
            <div className={`${s.card} ${s["card--sm"]} ${s.basic}`}>
              <div
                className={s.basic__head}
                role="button"
                tabIndex={0}
                onClick={() => setBasicOpen(!basicOpen)}
                style={{ cursor: "pointer" }}
              >
                <p className={s.basic__title}>Basic Information</p>
                <img
                  className={s["icon-24"]}
                  src="/assets/icons/chevron-down.svg"
                  alt=""
                  style={{
                    transform: basicOpen ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>

              {basicOpen && (
                <>
                  <div className={s.basic__score}>
                    <p className={s.basic__score_label}>Loyalty Score</p>
                    <p className={s.basic__score_value}>96%</p>
                  </div>

                  <div className={s.metric}>
                    <div className={s.metric__row}>
                      <p>Order frequency</p>
                      <p>+11%</p>
                    </div>
                    <div className={s.bar}>
                      <div
                        className={s.bar__fill}
                        style={{ width: "70%", background: "#ffc90e" }}
                      />
                    </div>
                  </div>

                  <div className={s.metric}>
                    <div className={s.metric__row}>
                      <p>On-time payments</p>
                      <p>+8%</p>
                    </div>
                    <div className={s.bar}>
                      <div
                        className={s.bar__fill}
                        style={{ width: "88%", background: "#591a11" }}
                      />
                    </div>
                  </div>

                  <div className={s.metric}>
                    <div className={s.metric__row}>
                      <p>Referrals</p>
                      <p>+10%</p>
                    </div>
                    <div className={s.bar}>
                      <div
                        className={s.bar__fill}
                        style={{ width: "40%", background: "#fe5b31" }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Main Column */}
          <div className={s.main}>
            {/* Preferences Header Tabs + Veg Toggle */}
            <div className={s.prefs_head}>
              <div className={s.prefs_head__tabs}>
                <button
                  type="button"
                  className={`${s.ptab} ${activePrefTab === "Personal Information" ? s["ptab--active"] : ""}`}
                  onClick={() => setActivePrefTab("Personal Information")}
                >
                  <p>Personal Information</p>
                </button>
                <button
                  type="button"
                  className={`${s.ptab} ${activePrefTab === "Preferences" ? s["ptab--active"] : ""}`}
                  onClick={() => setActivePrefTab("Preferences")}
                >
                  <p>Preferences</p>
                  <span className={s.ptab__badge}>2</span>
                </button>
              </div>

              <div
                className={s.veg}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setVegOnly(!vegOnly);
                  showToast(vegOnly ? "Veg mode turned off" : "Veg mode turned on");
                }}
              >
                <span className={s.veg__label}>Veg</span>
                <div
                  className={`${s.switch} ${vegOnly ? s["switch--on"] : s["switch--off"]}`}
                >
                  <span className={s.switch__knob} />
                </div>
              </div>
            </div>

            {/* Plan 1: Lunch plan */}
            <article className={`${s.card} ${s["card--sm"]} ${s.plan} ${s["plan--lunch"]}`}>
              <div className={s.plan__icon}>
                <img className={`${s["icon-24"]} ${s.cover}`} src="/assets/tiffin.png" alt="" />
              </div>
              <div className={s.plan__body}>
                <p className={s.plan__title}>Lunch plan</p>
                <p className={s.plan__sub}>Amma&apos;s Kitchen</p>
                <p className={s.plan__desc}>
                  Weekday lunch subscription, 5 meals a week. Delivered fresh between 12:30–1:30 PM
                  to your Koramangala address, with same-day swaps available before 10 AM.
                </p>
              </div>
            </article>

            {/* Plan 2: Dinner, occasional */}
            <article className={`${s.card} ${s["card--sm"]} ${s.plan}`}>
              <div className={s.plan__icon}>
                <img className={`${s["icon-24"]} ${s.cover}`} src="/assets/tiffin.png" alt="" />
              </div>
              <div className={s.plan__body}>
                <p className={s.plan__title}>Dinner, occasional</p>
                <p className={s.plan__sub}>Meena&apos;s Tiffin</p>
                <p className={s.plan__desc}>
                  On-demand dinner orders placed a few times a month, mostly thalis and regional
                  specials. No active subscription, paid from wallet balance each time.
                </p>
              </div>
            </article>

            {/* Plan 3: Delivery preference */}
            <article className={`${s.card} ${s["card--sm"]} ${s.plan}`}>
              <div className={`${s.plan__icon} ${s["plan__icon--emoji"]}`}>📍</div>
              <div className={s.plan__body}>
                <p className={s.plan__title}>Delivery preference</p>
                <p className={s.plan__sub}>Home — Koramangala, Bengaluru</p>
                <p className={s.plan__desc}>
                  Default drop-off is the building lobby, contactless. Backup address saved for the
                  Whitefield office on weekdays.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </div>
  );
}
