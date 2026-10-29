"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import Footer from "@/components/layout/Footer";
import s from "./SubscriptionSection.module.css";

const INITIAL_PLANS = [
  {
    id: "lunch-weekdays",
    name: "Lunch — weekdays",
    badge: "Most Popular",
    meals: "5 lunches / week",
    amt: "₹1,200",
    per: "/ month",
    perMeal: "₹60 / meal",
    priceLabel: "₹1,200 / month",
    savings: "Save ₹300/mo vs single orders",
    tagline: "Wholesome workday lunches",
    desc: "Wholesome home-style lunch delivered fresh Monday through Friday. Perfect for working professionals & students.",
    features: [
      "5 freshly prepared lunches every week (Mon – Fri)",
      "Delivered warm by 1:00 PM to your office or home",
      "Dal, 2 seasonal sabzis, 4 phulkas, jeera rice & salad",
      "Skip any delivery with 1 tap (instant wallet refund)",
      "Pause during vacations or holidays with zero fees",
    ],
  },
  {
    id: "lunch-dinner",
    name: "Lunch + Dinner",
    badge: "Best Value • 2 Meals",
    badgeGold: true,
    meals: "10 meals / week",
    amt: "₹2,150",
    per: "/ month",
    perMeal: "₹53 / meal",
    priceLabel: "₹2,150 / month",
    savings: "Save ₹650/mo vs single orders",
    tagline: "Complete daily nutrition autopilot",
    desc: "Complete 2-meal daily routine for total peace of mind. Healthy lunch at work, warm comforting dinner at home.",
    features: [
      "10 meals a week (Mon – Fri, lunch & dinner)",
      "Lunch by 1:00 PM · Dinner by 8:00 PM",
      "Rotating daily menu with chef specials every week",
      "Separate skip & pause controls for lunch or dinner",
      "Free doorstep delivery on every single meal",
    ],
  },
  {
    id: "all-days",
    name: "All days",
    badge: "Full Week Coverage",
    meals: "7 lunches / week",
    amt: "₹1,600",
    per: "/ month",
    perMeal: "₹57 / meal",
    priceLabel: "₹1,600 / month",
    savings: "Save ₹400/mo vs single orders",
    tagline: "7 days uninterrupted home food",
    desc: "Uninterrupted 7-day meal coverage. Enjoy hearty, comforting tiffins every single day including weekends.",
    features: [
      "7 lunches a week (Monday through Sunday)",
      "Weekend chef special curries & desserts included",
      "Skip weekends or any day when you want to dine out",
      "Zero delivery charges all 30 days",
      "Custom dietary preferences supported",
    ],
  },
];

const SUBSCRIPTION_BENEFITS = [
  {
    icon: "🍱",
    title: "100% Home-Style Taste",
    desc: "Cooked with love by verified neighborhood home chefs using farm-fresh vegetables and zero preservatives.",
  },
  {
    icon: "⏸️",
    title: "1-Tap Pause & Resume",
    desc: "Going out of station or working remotely? Pause your subscription anytime for up to 30 days and pick right back up.",
  },
  {
    icon: "💰",
    title: "Instant Wallet Refunds",
    desc: "Dining out or busy with meetings? Skip tomorrow's delivery before 10 AM and the full meal cost is instantly refunded to your wallet.",
  },
  {
    icon: "🚀",
    title: "Punctual & Insulated Delivery",
    desc: "Multi-layered thermal tiffins ensure piping hot meals delivered right to your office desk or home door by 1:00 PM.",
  },
];

const FEATURED_KITCHEN_PLANS = [
  {
    kitchen: "Amma's Kitchen",
    cuisine: "South Indian & North Indian",
    rating: "4.5",
    reviews: "312",
    badge: "Most Popular",
    price: "₹89 / meal",
    meta: "Monthly · 30 meals",
    img: "/assets/plan-bg.png",
  },
  {
    kitchen: "Ghar Ka Swaad",
    cuisine: "Pure Veg Homestyle",
    rating: "4.6",
    reviews: "450",
    badge: "Top Rated",
    price: "₹105 / meal",
    meta: "Monthly · 22 meals",
    img: "/assets/kitchen-cover.png",
  },
  {
    kitchen: "Sundar's Home Kitchen",
    cuisine: "Gujarati & Kathiyawadi",
    rating: "4.7",
    reviews: "58",
    badge: "Specialist",
    price: "₹95 / meal",
    meta: "Monthly · 30 meals",
    img: "/assets/plan-food.png",
  },
];

const FAQS = [
  {
    q: "How does the tiffin subscription work?",
    a: "Choose a plan (Weekdays, Full week, or Lunch + Dinner), pick your delivery days, and enjoy wholesome hot meals delivered automatically every day. No daily ordering hassle!",
  },
  {
    q: "Can I pause my subscription if I go on leave or travel?",
    a: "Yes! You can pause your subscription anytime with 1 tap. There are no fees or penalties, and your active days simply extend until you resume.",
  },
  {
    q: "What happens if I skip a meal?",
    a: "If you know you won't need a meal tomorrow, simply tap 'Skip Delivery' before 10:00 AM. The meal amount will be refunded directly to your Tiffexx wallet instantly.",
  },
  {
    q: "Can I customize spice level or dietary preferences?",
    a: "Absolutely. You can select pure-veg preferences, low spice, or special dietary options in your profile preferences anytime.",
  },
];

const INITIAL_HISTORY = [
  { id: 1, date: "Today", meal: "Lunch", kitchen: "Amma's Kitchen", status: "Delivered", pillType: "d" },
  { id: 2, date: "Yesterday", meal: "Lunch", kitchen: "Amma's Kitchen", status: "Delivered", pillType: "d" },
  { id: 3, date: "18 Jul", meal: "Lunch", kitchen: "Amma's Kitchen", status: "Skipped", pillType: "s" },
  { id: 4, date: "17 Jul", meal: "Lunch", kitchen: "Amma's Kitchen", status: "Delivered", pillType: "d" },
  { id: 5, date: "12 Jul", meal: "Lunch", kitchen: "Amma's Kitchen", status: "Paused", pillType: "p" },
];

const INITIAL_DAYS = [
  { id: 1, label: "M", name: "Monday", active: true },
  { id: 2, label: "T", name: "Tuesday", active: true },
  { id: 3, label: "W", name: "Wednesday", active: true },
  { id: 4, label: "T", name: "Thursday", active: true },
  { id: 5, label: "F", name: "Friday", active: true },
  { id: 6, label: "S", name: "Saturday", active: false },
  { id: 7, label: "S", name: "Sunday", active: false },
];

export default function SubscriptionSection() {
  const { user, isLoggedIn } = useAuth();

  // Subscription state
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("lunch-weekdays");
  const [deliveryDays, setDeliveryDays] = useState(INITIAL_DAYS);
  const [isSkipped, setIsSkipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Guest state for unauthenticated / non-logged-in visitors
  const [selectedGuestPlanId, setSelectedGuestPlanId] = useState("lunch-weekdays");
  const [guestDeliveryDays, setGuestDeliveryDays] = useState(INITIAL_DAYS);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleToggleGuestDay = (id) => {
    setGuestDeliveryDays((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextActive = !d.active;
          showToast(`${d.name} delivery ${nextActive ? "included" : "excluded"} in schedule preview.`);
          return { ...d, active: nextActive };
        }
        return d;
      })
    );
  };

  const activeGuestDays = guestDeliveryDays.filter((d) => d.active);
  const activeGuestCount = activeGuestDays.length;

  const switchPlanRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  // Find currently selected plan
  const selectedPlan = INITIAL_PLANS.find((p) => p.id === selectedPlanId) || INITIAL_PLANS[0];

  // Pause / Resume handler
  const handleTogglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      showToast(next ? "Subscription paused. No charges or meals until you resume." : "Subscription resumed. Welcome back!");
      return next;
    });
  };

  // Change Plan action button -> smooth scroll to Switch Plan section
  const handleScrollToSwitchPlan = () => {
    if (switchPlanRef.current) {
      switchPlanRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("Select a meal plan below to switch.");
    }
  };

  // Plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    showToast(`Switched plan to ${plan.name} (${plan.amt}/mo). Effective immediately.`);
  };

  // Delivery Days toggle
  const handleToggleDay = (id) => {
    setDeliveryDays((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextActive = !d.active;
          showToast(`${d.name} delivery ${nextActive ? "enabled" : "disabled"}.`);
          return { ...d, active: nextActive };
        }
        return d;
      })
    );
  };

  // Skip delivery handler
  const handleToggleSkip = () => {
    setIsSkipped((prev) => {
      const next = !prev;
      showToast(
        next
          ? "Tomorrow's delivery skipped. ₹80 will be refunded to your wallet."
          : "Delivery restored for tomorrow, 1:00 P.M."
      );
      return next;
    });
  };

  // Filter history rows by search query
  const filteredHistory = INITIAL_HISTORY.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.date.toLowerCase().includes(q) ||
      item.meal.toLowerCase().includes(q) ||
      item.kitchen.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className={s.page}>
      {/* Toast popup */}
      {toastMessage && (
        <div className={s.toast} role="status">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className={s.modalBackdrop} onClick={() => setShowCancelModal(false)}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Cancel Subscription?</h3>
            <p className={s.modalText}>
              Are you sure you want to cancel your tiffin subscription with Amma&apos;s Kitchen? You can also pause it temporarily or change delivery days without losing your current discount rate.
            </p>
            <div className={s.modalActions}>
              <button
                type="button"
                className={s.modalBtnCancel}
                onClick={() => setShowCancelModal(false)}
              >
                Keep Subscription
              </button>
              <button
                type="button"
                className={s.modalBtnConfirm}
                onClick={() => {
                  setShowCancelModal(false);
                  setIsPaused(true);
                  showToast("Subscription cancellation request received. Our team will verify any refunds.");
                }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={s.main}>
        {/* Welcoming Plans for You Experience when user is not logged in or has not signed up */}
        {!isLoggedIn ? (
          <div className={s.guestContainer}>
            {/* Welcoming Hero Header */}
            <div className={s.guestHero}>
              
              <h1 className={s.guestHeroTitle}>Plans for You</h1>
              <p className={s.guestHeroSubtitle}>
                Welcome to Tiffexx! Discover healthy, chef-crafted daily meal plans tailored to your routine. Fresh, authentic home-style tiffins delivered warm to your doorstep every day.
              </p>
            </div>

            {/* Welcoming Sign In / Sign Up Banner Card */}
            <div className={s.guestAuthBanner}>
              <div className={s.guestAuthBannerLeft}>
                <div className={s.guestAuthBannerIcon}>
                  <img src="/assets/icons/swap.svg" alt="" width="26" height="26" />
                </div>
                <div>
                  <h2 className={s.guestAuthBannerTitle}>Ready to put your meals on autopilot?</h2>
                  <p className={s.guestAuthBannerText}>
                    Sign in to manage your active subscriptions, or create a free account to choose a meal plan, customize delivery days, and enjoy exclusive first-month perks.
                  </p>
                </div>
              </div>
              <div className={s.guestAuthBannerActions}>
                <Link href="/signin?redirect=/subscriptions" className={s.guestBtnLogin}>
                  Login
                </Link>
                <Link href="/signup?redirect=/subscriptions" className={s.guestBtnSignup}>
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Quick Trust / Perks Bar */}
            <div className={s.guestPerksRow}>
              <div className={s.guestPerkItem}>
                <span className={s.guestPerkCheck}>✓</span>
                <span>100% Wallet refunds for skipped meals</span>
              </div>
              <div className={s.guestPerkItem}>
                <span className={s.guestPerkCheck}>✓</span>
                <span>Pause, resume or switch meals anytime</span>
              </div>
              <div className={s.guestPerkItem}>
                <span className={s.guestPerkCheck}>✓</span>
                <span>Zero delivery fees on all monthly plans</span>
              </div>
              <div className={s.guestPerkItem}>
                <span className={s.guestPerkCheck}>✓</span>
                <span>Insulated thermal packaging for hot food</span>
              </div>
            </div>

            {/* Plans Grid Section */}
           
            {/* Interactive Schedule Customizer Preview */}
           

            {/* Why Subscribe with Tiffexx */}
            <section className={s.guestSection} aria-labelledby="why-subscribe-title">
              <div className={s.guestSectionHead}>
                <div>
                  <h2 id="why-subscribe-title" className={s.guestSectionTitle}>
                    Why Subscribe with Tiffexx?
                  </h2>
                  <p className={s.guestSectionSub}>
                    Built for your lifestyle with complete flexibility and zero compromises
                  </p>
                </div>
              </div>

              <div className={s.guestBenefitsGrid}>
                {SUBSCRIPTION_BENEFITS.map((item, bIdx) => (
                  <div key={bIdx} className={s.guestBenefitCard}>
                    <div className={s.guestBenefitIcon}>{item.icon}</div>
                    <h3 className={s.guestBenefitTitle}>{item.title}</h3>
                    <p className={s.guestBenefitDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Kitchen Subscriptions */}
            <section className={s.guestSection} aria-labelledby="popular-kitchens-title">
              <div className={s.guestSectionHead}>
                <div>
                  <h2 id="popular-kitchens-title" className={s.guestSectionTitle}>
                    Top Kitchen Subscription Packages
                  </h2>
                  <p className={s.guestSectionSub}>
                    Verified home kitchens delivering delicious monthly packages
                  </p>
                </div>
                <Link href="/kitchens" className={s.guestSectionSub} style={{ color: "#591a11", fontWeight: 600 }}>
                  Explore All Kitchens →
                </Link>
              </div>

              <div className={s.guestKitchensGrid}>
                {FEATURED_KITCHEN_PLANS.map((k, kIdx) => (
                  <div key={kIdx} className={s.guestKitchenCard}>
                    <div className={s.guestKitchenMedia}>
                      <img src={k.img} alt={k.kitchen} className={s.guestKitchenImg} />
                      <span className={s.guestKitchenBadge}>{k.badge}</span>
                    </div>
                    <div className={s.guestKitchenBody}>
                      <div className={s.guestKitchenHead}>
                        <h3 className={s.guestKitchenName}>{k.kitchen}</h3>
                        <span className={s.guestKitchenRating}>★ {k.rating}</span>
                      </div>
                      <p className={s.guestKitchenCuisine}>{k.cuisine}</p>
                      <div className={s.guestKitchenBottom}>
                        <span className={s.guestKitchenPrice}>{k.price}</span>
                        <Link href="/partner-listing" className={s.guestKitchenBtn}>
                          View Menu
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Subscription FAQs */}
            <section className={s.guestSection} aria-labelledby="faq-title">
              {/* <div className={s.guestSectionHead}>
                <div>
                  <h2 id="faq-title" className={s.guestSectionTitle}>
                    Frequently Asked Questions
                  </h2>
                  <p className={s.guestSectionSub}>
                    Everything you need to know before starting your daily tiffin plan
                  </p>
                </div>
              </div> */}

              {/* <div className={s.guestFaqList}>
                {FAQS.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div key={fIdx} className={s.guestFaqItem}>
                      <button
                        type="button"
                        className={s.guestFaqQuestion}
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <span className={s.guestFaqIcon} style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>
                          +
                        </span>
                      </button>
                      {isOpen && <p className={s.guestFaqAnswer}>{faq.a}</p>}
                    </div>
                  );
                })}
              </div> */}
            </section>
          </div>
        ) : (
          <>
            <p className={s.welcome}>
              Welcome back, {user?.name ? user.name.split(" ")[0] : "Aditi"}
            </p>
            <h1 className={s.title}>Your Subscription</h1>

            <div className={s.layout}>
              {/* Left column */}
              <section className={s.left} aria-label="Subscription overview and actions">
                {/* Wallet Balance Card */}
                <div className={s.walletCard}>
                  <div className={s.walletCardGlow} />
                  <div className={s.wcTop}>
                    <p className={s.wcLabel}>Wallet balance</p>
                    <div className={s.wcRow}>
                      <img className={s.wcIcon} src="/assets/wallet-icon.png" alt="" />
                      <span className={isPaused ? s.wcPaused : s.wcActive}>
                        {isPaused ? "Paused" : "Active"}
                      </span>
                    </div>
                    <div className={s.wcPlanLabel}>
                      <p>Current plan</p>
                    </div>
                    <p className={s.wcPlan}>{selectedPlan.name}</p>
                    <div className={s.wcPrice}>
                      <p>{selectedPlan.priceLabel}</p>
                    </div>
                    <div className={s.wcKitchen}>
                      <p>AMMA&apos;S KITCHEN</p>
                    </div>
                  </div>
                  <p className={s.wcBalance}>₹350.00</p>
                </div>

                {/* Actions row: Pause, Change plan, Cancel */}
                <div className={s.actions}>
                  <div className={s.action}>
                    <button
                      type="button"
                      className={s.actionBtn}
                      onClick={handleTogglePause}
                      aria-label={isPaused ? "Resume subscription" : "Pause subscription"}
                    >
                      <img src="/assets/icons/pause.svg" alt="" />
                    </button>
                    <p>{isPaused ? "Resume" : "Pause"}</p>
                  </div>
                  <div className={s.action}>
                    <button
                      type="button"
                      className={s.actionBtn}
                      onClick={handleScrollToSwitchPlan}
                      aria-label="Change plan"
                    >
                      <img src="/assets/icons/swap.svg" alt="" />
                    </button>
                    <p>Change plan</p>
                  </div>
                  <div className={s.action}>
                    <button
                      type="button"
                      className={s.actionBtn}
                      onClick={() => setShowCancelModal(true)}
                      aria-label="Cancel subscription"
                    >
                      <img src="/assets/icons/close.svg" alt="" />
                    </button>
                    <p>Cancel</p>
                  </div>
                </div>

                {/* Delivery days selector */}
                <div className={s.days}>
                  <div className={s.daysHeader}>
                    <p className={s.daysLabel}>Delivery days</p>
                    <span className={s.daysSub}>Tap to toggle</span>
                  </div>
                  <div className={s.daysRow}>
                    {deliveryDays.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        className={`${s.day} ${d.active ? s.dayOn : ""}`}
                        onClick={() => handleToggleDay(d.id)}
                        aria-pressed={d.active}
                        title={`${d.name}: ${d.active ? "Active" : "Off"}`}
                      >
                        <p>{d.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Right column */}
              <section className={s.right} aria-label="Delivery details and plan switcher">
                {/* Next Delivery Card */}
                <div className={s.next}>
                  <div className={s.nextText}>
                    <p className={s.nextLabel}>Next Delivery</p>
                    <p className={s.nextWhen}>
                      {isSkipped
                        ? "Skipped — Delivery scheduled for next active cycle"
                        : "Tomorrow  , 1 P.M. - Amma's Kitchen"}
                    </p>
                    <p className={s.nextMenu}>Dal Tadka , Jeera rice + Roti</p>
                  </div>
                  <button
                    className={`${s.nextBtn} ${isSkipped ? s.nextBtnSkipped : ""}`}
                    type="button"
                    onClick={handleToggleSkip}
                  >
                    {isSkipped ? "Undo Skip" : "Skip the Delivery"}
                  </button>
                </div>

                {/* Delivery History */}
                <div className={s.history}>
                  <div className={s.historyHead}>
                    <div className={s.historyTitles}>
                      <p className={s.historyTitle}>Delivery history</p>
                      <p className={s.historySub}>Your recent subscription deliveries</p>
                    </div>
                    <div className={s.searchHistory}>
                      <img src="/assets/icons/search.svg" alt="" />
                      <input
                        type="search"
                        placeholder="Search tiffin, kitchen, cuisine..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search delivery history"
                      />
                    </div>
                  </div>

                  <div className={s.tableWrapper}>
                    <div className={s.table} role="table" aria-label="Recent deliveries">
                      <div className={`${s.row} ${s.rowHead}`} role="row">
                        <div className={`${s.cell} ${s.cellDate}`} role="columnheader">Date</div>
                        <div className={`${s.cell} ${s.cellMeal}`} role="columnheader">Meal</div>
                        <div className={`${s.cell} ${s.cellKitchen}`} role="columnheader">Kitchen</div>
                        <div className={`${s.cell} ${s.cellStatus}`} role="columnheader">Status</div>
                      </div>

                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((item, index) => {
                          const isLast = index === filteredHistory.length - 1;
                          let pillClass = s.pillD;
                          if (item.pillType === "s") pillClass = s.pillS;
                          if (item.pillType === "p") pillClass = s.pillP;

                          return (
                            <div
                              key={item.id}
                              className={`${s.row} ${isLast ? s.cellLast : ""}`}
                              role="row"
                            >
                              <div className={`${s.cell} ${s.cellDate}`} role="cell">
                                {item.date}
                              </div>
                              <div className={`${s.cell} ${s.cellMeal}`} role="cell">
                                {item.meal}
                              </div>
                              <div className={`${s.cell} ${s.cellKitchen}`} role="cell">
                                {item.kitchen}
                              </div>
                              <div className={`${s.cell} ${s.cellStatus}`} role="cell">
                                <span className={`${s.pill} ${pillClass}`}>{item.status}</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className={s.noResults}>
                          No deliveries found matching &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Switch Plan Section */}
                <div className={s.switch} ref={switchPlanRef}>
                  <p className={s.switchTitle}>Switch plan</p>
                  <p className={s.switchSub}>Change your meal plan for next month</p>
                </div>

                <div className={s.plans}>
                  {INITIAL_PLANS.map((plan) => {
                    const isSelected = plan.id === selectedPlanId;
                    return (
                      <div
                        key={plan.id}
                        className={`${s.plan} ${isSelected ? s.planSelected : ""}`}
                        onClick={() => handleSelectPlan(plan)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectPlan(plan);
                          }
                        }}
                      >
                        {isSelected && <span className={s.planBadge}>Current</span>}
                        <p className={s.planName}>{plan.name}</p>
                        <p className={s.planMeals}>{plan.meals}</p>
                        <div className={s.planPrice}>
                          <span className={s.planAmt}>{plan.amt} </span>
                          <span className={s.planPer}>{plan.per}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </>
        )}
      </main>

      {/* Footer matching standard Tiffexx design */}
      <Footer />
    </div>
  );
}
