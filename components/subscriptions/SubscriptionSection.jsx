"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./SubscriptionSection.module.css";

const INITIAL_MENU = [
  { id: "m1", day: "Mon, 26 Oct", dish: "Home-style Veg Thali", status: "delivered" },
  { id: "m2", day: "Tue, 27 Oct", dish: "Dal Tadka Combo", status: "delivered" },
  { id: "m3", day: "Wed, 28 Oct", dish: "Rajma Chawal Box", status: "today" },
  { id: "m4", day: "Thu, 29 Oct", dish: "Paneer Thali", status: "upcoming", skippable: true },
  { id: "m5", day: "Fri, 30 Oct", dish: "Kadhi Chawal Box", status: "upcoming", skippable: true },
  { id: "m6", day: "Sat, 31 Oct", dish: "Chole Puri Thali", status: "upcoming", skippable: true },
];

export default function SubscriptionSection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Subscription state
  const [isPaused, setIsPaused] = useState(false);
  const [currentPlanKey, setCurrentPlanKey] = useState("weekly");
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [skippedMap, setSkippedMap] = useState({});

  // Delivery & Billing details state
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "Flat 4B, Sunrise Apartments, Sector 50, Noida – 201301",
    slot: "12:30 – 1:00 pm",
    instructions: "Leave with security guard at Gate 2",
  });
  const [deliveryForm, setDeliveryForm] = useState({ ...deliveryDetails });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const displayName = user?.name || "Ananya Rao";
  const displayPhone = user?.phone || "+91 98XXX XXX10";

  const getInitials = (name) => {
    if (!name) return "AR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleTogglePause = () => {
    const nextState = !isPaused;
    setIsPaused(nextState);
    showToast(nextState ? "⏸ Plan paused. No meals will be billed or delivered until resumed." : "▶ Plan resumed! Your deliveries are active.");
  };

  const handleSkipDay = (dayItem) => {
    const isAlreadySkipped = skippedMap[dayItem.id];
    setSkippedMap((prev) => ({ ...prev, [dayItem.id]: !isAlreadySkipped }));
    showToast(
      !isAlreadySkipped
        ? `✓ Skipped ${dayItem.day} (${dayItem.dish}). ₹115 credited to your wallet.`
        : `Restored meal delivery for ${dayItem.day}.`
    );
  };

  const handleSwitchPlan = (planKey, planName, priceStr) => {
    setCurrentPlanKey(planKey);
    showToast(`✓ Switched to "${planName}" (${priceStr}). Effective from next billing cycle.`);
  };

  const handleSaveDelivery = (e) => {
    e.preventDefault();
    setDeliveryDetails({ ...deliveryForm });
    setIsEditingDelivery(false);
    showToast("✓ Delivery details updated successfully!");
  };

  const handleDownloadInvoice = (e) => {
    e.preventDefault();
    showToast("✓ Invoice #INV-2026-881 downloaded to your device.");
  };

  const handleCancelSubscription = () => {
    const confirmed = window.confirm("Are you sure you want to cancel your weekly subscription? You will lose free delivery and member discounts.");
    if (confirmed) {
      setIsPaused(true);
      showToast("Subscription cancelled. You have access until 2 Nov 2026.");
    }
  };

  const handleSignOut = () => {
    if (logout) logout();
    showToast("Signed out successfully");
    setTimeout(() => router.push("/signin"), 600);
  };

  return (
    <ProfileLayout>
      {/* Main content */}
      <div className={s.main}>
        <button
          type="button"
          className={s.back}
          aria-label="Go back"
          onClick={() => {
            if (window.history.length > 1) router.back();
            else router.push("/profile");
          }}
        >
          <img src="/assets/back.svg" width="24" height="24" alt="" />
        </button>
        <h1 className={s.main__title}>MY SUBSCRIPTION</h1>

        {/* Active plan hero */}
        <section className={s.hero} aria-label="Current subscription">
          <span className={`${s.chip} ${isPaused ? s["chip--paused"] : s["chip--active"]}`}>
            {isPaused ? "PAUSED" : "ACTIVE"}
          </span>
          <h2 className={s.hero__title}>
            {currentPlanKey === "weekly"
              ? "Weekly Tiffin Plan"
              : currentPlanKey === "monthly"
              ? "Monthly Tiffin Plan"
              : "Trial Tiffin Plan"}
          </h2>
          <p className={s.hero__sub}>
            {currentPlanKey === "monthly" ? "26 days a month · Lunch" : "6 days a week · Lunch"}
          </p>

          <dl className={s.hero__facts}>
            <div className={s.fact}>
              <dt>Next delivery</dt>
              <dd>{isPaused ? "Paused (No upcoming deliveries)" : "Thu, 29 Oct · 12:30–1:00 pm"}</dd>
            </div>
            <div className={s.fact}>
              <dt>Renews on</dt>
              <dd>2 Nov 2026</dd>
            </div>
            <div className={s.fact}>
              <dt>Amount</dt>
              <dd>
                {currentPlanKey === "monthly"
                  ? "₹2,690 / month"
                  : currentPlanKey === "trial"
                  ? "₹249 / 3 days"
                  : "₹690 / week"}
              </dd>
            </div>
          </dl>

          <div className={s.hero__actions}>
            <button
              type="button"
              className={`${s.btn} ${s["btn--primary"]}`}
              onClick={handleTogglePause}
            >
              {isPaused ? "Resume Plan" : "Pause Plan"}
            </button>
            <a
              href="#plans-section"
              className={`${s.btn} ${s["btn--secondary"]}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("plans-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Change Plan
            </a>
          </div>
        </section>

        {/* This week's menu */}
        <section className={s.card}>
          <header className={s.card__head}>
            <h2 className={s.card__title}>This Week’s Menu</h2>
            <button
              type="button"
              className={s.link}
              onClick={() => showToast("Opening full month menu calendar")}
            >
              View full calendar ›
            </button>
          </header>

          <ul className={s.menu}>
            {menuItems.map((item) => {
              const isSkipped = skippedMap[item.id];
              return (
                <li key={item.id} className={s.menu__row}>
                  <div>
                    <p className={s.menu__day}>{item.day}</p>
                    <p className={s.menu__dish}>
                      {item.dish} {isSkipped && <span style={{ color: "var(--red)", fontWeight: 600 }}>· (Skipped)</span>}
                    </p>
                  </div>
                  {item.status === "delivered" && (
                    <span className={`${s.badge} ${s["badge--delivered"]}`}>Delivered</span>
                  )}
                  {item.status === "today" && (
                    <span className={`${s.badge} ${s["badge--today"]}`}>Today</span>
                  )}
                  {item.status === "upcoming" && (
                    <div className={s.menu__end}>
                      <span className={`${s.badge} ${isSkipped ? s["badge--delivered"] : s["badge--upcoming"]}`}>
                        {isSkipped ? "Skipped & Refunded" : "Upcoming"}
                      </span>
                      <button
                        type="button"
                        className={`${s.btn} ${s["btn--skip"]}`}
                        aria-label={`Skip ${item.day}`}
                        onClick={() => handleSkipDay(item)}
                      >
                        {isSkipped ? "Undo Skip" : "Skip"}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Delivery + billing */}
        <div className={s.pair}>
          <section className={s.card}>
            <header className={s.card__head}>
              <h2 className={s.card__title}>Delivery Details</h2>
              <button
                type="button"
                className={s.link}
                onClick={() => {
                  setDeliveryForm({ ...deliveryDetails });
                  setIsEditingDelivery(!isEditingDelivery);
                }}
              >
                {isEditingDelivery ? "Cancel" : "Edit"}
              </button>
            </header>
            {isEditingDelivery ? (
              <form onSubmit={handleSaveDelivery} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>
                    Delivery address
                  </label>
                  <input
                    type="text"
                    value={deliveryForm.address}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, address: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--sand-85)", font: "inherit", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>
                    Time slot
                  </label>
                  <select
                    value={deliveryForm.slot}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, slot: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--sand-85)", font: "inherit", background: "#fff", boxSizing: "border-box" }}
                  >
                    <option value="12:00 – 12:30 pm">Early midday · 12:00 – 12:30 pm</option>
                    <option value="12:30 – 1:00 pm">Standard Lunch · 12:30 – 1:00 pm</option>
                    <option value="1:00 – 1:30 pm">Late Lunch · 1:00 – 1:30 pm</option>
                    <option value="7:30 – 8:00 pm">Dinner · 7:30 – 8:00 pm</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>
                    Instructions
                  </label>
                  <input
                    type="text"
                    value={deliveryForm.instructions}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, instructions: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--sand-85)", font: "inherit", boxSizing: "border-box" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "9px 16px",
                    background: "var(--maroon)",
                    color: "#fff",
                    borderRadius: 6,
                    border: 0,
                    fontWeight: 600,
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                >
                  Save Address &amp; Slot
                </button>
              </form>
            ) : (
              <dl className={s.details}>
                <div className={s.detail}>
                  <dt>Delivery address</dt>
                  <dd>{deliveryDetails.address}</dd>
                </div>
                <div className={s.detail}>
                  <dt>Time slot</dt>
                  <dd>{deliveryDetails.slot}</dd>
                </div>
                <div className={s.detail}>
                  <dt>Instructions</dt>
                  <dd>{deliveryDetails.instructions}</dd>
                </div>
              </dl>
            )}
          </section>

          <section className={s.card}>
            <header className={s.card__head}>
              <h2 className={s.card__title}>Billing</h2>
              <button
                type="button"
                className={s.link}
                onClick={() => showToast("Payment method updated to primary card & UPI.")}
              >
                Update
              </button>
            </header>
            <dl className={s.details}>
              <div className={s.detail}>
                <dt>Payment method</dt>
                <dd>Wallet, then UPI</dd>
              </div>
              <div className={s.detail}>
                <dt>Next charge</dt>
                <dd>₹690 on 2 Nov 2026</dd>
              </div>
              <div className={s.detail}>
                <dt>Invoices</dt>
                <dd>
                  <button
                    type="button"
                    className={`${s.link} ${s["link--strong"]}`}
                    onClick={handleDownloadInvoice}
                  >
                    Download latest invoice
                  </button>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Plans */}
        <section className={s.card} id="plans-section">
          <header className={s.card__head}>
            <h2 className={s.card__title}>Plans</h2>
          </header>

          <div className={s.plans}>
            {/* Trial Plan */}
            <article className={`${s.plan} ${currentPlanKey === "trial" ? s["plan--current"] : ""}`}>
              <div className={s.plan__top}>
                <h3 className={s.plan__name}>Trial Plan</h3>
                {currentPlanKey === "trial" && (
                  <span className={`${s.badge} ${s["badge--today"]}`}>Current</span>
                )}
              </div>
              <p className={s.plan__price}>
                <strong>₹249</strong> <span>/ 3 days</span>
              </p>
              <ul className={s.plan__features}>
                <li>Lunch only</li>
                <li>Try before you commit</li>
              </ul>
              {currentPlanKey === "trial" ? (
                <button type="button" className={s["btn--outline"]} disabled style={{ opacity: 0.6, cursor: "default" }}>
                  Current Plan
                </button>
              ) : (
                <button
                  type="button"
                  className={`${s.btn} ${s["btn--outline"]}`}
                  onClick={() => handleSwitchPlan("trial", "Trial Plan", "₹249 / 3 days")}
                >
                  Switch to this plan
                </button>
              )}
            </article>

            {/* Weekly Tiffin Plan */}
            <article className={`${s.plan} ${currentPlanKey === "weekly" ? s["plan--current"] : ""}`}>
              <div className={s.plan__top}>
                <h3 className={s.plan__name}>Weekly Tiffin Plan</h3>
                {currentPlanKey === "weekly" && (
                  <span className={`${s.badge} ${s["badge--today"]}`}>Current</span>
                )}
              </div>
              <p className={s.plan__price}>
                <strong>₹690</strong> <span>/ week</span>
              </p>
              <ul className={s.plan__features}>
                <li>6 days, lunch</li>
                <li>Skip or pause any day</li>
                <li>Free delivery</li>
              </ul>
              {currentPlanKey === "weekly" ? (
                <button type="button" className={s["btn--outline"]} disabled style={{ opacity: 0.6, cursor: "default" }}>
                  Current Plan
                </button>
              ) : (
                <button
                  type="button"
                  className={`${s.btn} ${s["btn--outline"]}`}
                  onClick={() => handleSwitchPlan("weekly", "Weekly Tiffin Plan", "₹690 / week")}
                >
                  Switch to this plan
                </button>
              )}
            </article>

            {/* Monthly Plan */}
            <article className={`${s.plan} ${currentPlanKey === "monthly" ? s["plan--current"] : ""}`}>
              <div className={s.plan__top}>
                <h3 className={s.plan__name}>Monthly Plan</h3>
                {currentPlanKey === "monthly" && (
                  <span className={`${s.badge} ${s["badge--today"]}`}>Current</span>
                )}
              </div>
              <p className={s.plan__price}>
                <strong>₹2,690</strong> <span>/ month</span>
              </p>
              <ul className={s.plan__features}>
                <li>26 days, lunch</li>
                <li>Free delivery</li>
              </ul>
              {currentPlanKey === "monthly" ? (
                <button type="button" className={s["btn--outline"]} disabled style={{ opacity: 0.6, cursor: "default" }}>
                  Current Plan
                </button>
              ) : (
                <button
                  type="button"
                  className={`${s.btn} ${s["btn--outline"]}`}
                  onClick={() => handleSwitchPlan("monthly", "Monthly Plan", "₹2,690 / month")}
                >
                  Switch to this plan
                </button>
              )}
            </article>
          </div>
        </section>

        <button
          type="button"
          className={s.cancel}
          onClick={handleCancelSubscription}
        >
          Cancel subscription
        </button>
      </div>

      {/* Interactive feedback toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}
