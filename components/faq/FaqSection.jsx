"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./FaqSection.module.css";

const FAQ_DATA = [
  {
    id: "orders",
    name: "Orders",
    count: "4 questions",
    icon: "/assets/icon-receipt.svg",
    questions: [
      {
        q: "Can I order a single meal without subscribing?",
        a: "Yes. Browse any kitchen and place a one-off order. Subscriptions are optional, and you can start one whenever it suits you.",
      },
      {
        q: "Can I cancel an order after placing it?",
        a: "Yes, you can cancel your order within the kitchen's preparation cut-off window. Once the chef starts preparing your home-style meal, orders cannot be cancelled to prevent food waste.",
      },
      {
        q: "What if my order arrives wrong or incomplete?",
        a: "If any item is missing or incorrect, tap 'Report Issue' on your order details page or contact our support team. We'll issue an instant wallet refund or coordinate a speedy replacement.",
      },
      {
        q: "Can I order for a group or an event?",
        a: "Yes! Tiffexx supports bulk orders for gatherings, office meetings, and special events. Please contact our support team or the kitchen at least 24 hours in advance for custom group packages.",
      },
    ],
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    count: "4 questions",
    icon: "/assets/icon-calendar.svg",
    questions: [
      {
        q: "How does the daily tiffin subscription work?",
        a: "Select your preferred kitchen, pick lunch or dinner (or both), choose your duration (weekly or monthly), and your mealtime runs on autopilot. Hot, homemade tiffins arrive at your doorstep on schedule.",
      },
      {
        q: "Can I pause or skip meals if I am traveling?",
        a: "Yes, you have full control. You can pause, skip, or reschedule meals directly from the Subscriptions dashboard up to 2 hours before the cooking cut-off time. Skipped meals are credited back to your wallet.",
      },
      {
        q: "Can I switch kitchens or menu choices mid-subscription?",
        a: "Absolutely! You can change your daily cuisine choices or switch to a different partner kitchen at any time without paying any cancellation penalty.",
      },
      {
        q: "How does subscription renewal and billing work?",
        a: "Subscriptions renew automatically using your wallet or saved payment method, and you'll always receive a reminder notification 48 hours prior to renewal so you can edit or cancel anytime.",
      },
    ],
  },
  {
    id: "wallet",
    name: "Wallet & payments",
    count: "3 questions",
    icon: "/assets/icon-wallet.svg",
    questions: [
      {
        q: "What payment methods are supported on Tiffexx?",
        a: "We support UPI (Google Pay, PhonePe, Paytm), Credit & Debit cards (Visa, Mastercard, RuPay), Net Banking, and your Tiffexx Wallet for 1-click checkout.",
      },
      {
        q: "How do Tiffexx Coins and wallet cashback work?",
        a: "Every order and subscription top-up earns you Tiffexx Coins. You can redeem coins directly at checkout for instant discounts on future meals.",
      },
      {
        q: "Can I withdraw or refund my wallet balance?",
        a: "Yes, any unutilized balance added through bank or UPI channels can be refunded back to your source account within 3–5 working days upon contacting support.",
      },
    ],
  },
  {
    id: "delivery",
    name: "Delivery",
    count: "4 questions",
    icon: "/assets/icon-truck.svg",
    questions: [
      {
        q: "What are your meal delivery windows?",
        a: "Lunch is typically delivered between 12:00 PM and 1:30 PM, while dinner is delivered between 7:30 PM and 9:00 PM. Exact delivery times are visible during checkout based on your address.",
      },
      {
        q: "How is the food packaged during transit?",
        a: "Meals are packed in spill-resistant, high-grade eco-friendly containers and transported in insulated thermal carrier bags to ensure the food stays hot and fresh.",
      },
      {
        q: "Can I change my delivery location for a specific day?",
        a: "Yes! If you're working from home or at the office, you can change your delivery address for any scheduled meal up to 2 hours before the delivery window.",
      },
      {
        q: "What should I do if my delivery is delayed?",
        a: "You can track your delivery partner live on the map. If there's an unexpected delay due to traffic or weather, our support team proactively alerts you with updated ETAs.",
      },
    ],
  },
  {
    id: "account",
    name: "Account",
    count: "3 questions",
    icon: "/assets/icon-user.svg",
    questions: [
      {
        q: "How do I update my dietary restrictions or allergies?",
        a: "Visit your Profile > Dietary Preferences. You can mark pure vegetarian, non-veg, vegan, low-spice, or mention specific allergy notes that our partner kitchens follow.",
      },
      {
        q: "Can I manage multiple delivery addresses?",
        a: "Yes, you can save multiple addresses such as Home, Office, or Friends' places in your account and quickly switch between them when placing orders.",
      },
      {
        q: "How do I reach out to customer care or file a complaint?",
        a: "Our customer care team is available 7 days a week via in-app chat, email, or WhatsApp. Simply click the 'Contact support' button or visit the Help section.",
      },
    ],
  },
];

export default function FaqSection() {
  const [activeCategoryId, setActiveCategoryId] = useState("orders");
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  const activeCategory =
    FAQ_DATA.find((c) => c.id === activeCategoryId) || FAQ_DATA[0];

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    setOpenQuestionIndex(0); // Open first question of newly selected category
  };

  const handleQuestionToggle = (index) => {
    setOpenQuestionIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-main-title">
      <div className={styles.faqCard}>
        {/* Ambient atmospheric orbs matching Figma */}
        <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true"></div>
        <div className={`${styles.orb} ${styles.orbRed}`} aria-hidden="true"></div>

        {/* Hero title & lead */}
        <div className={styles.faqHero}>
          <div className={styles.faqHeroTitle}>
            <h1 id="faq-main-title">
              Got questions about your<br />tiffin?
            </h1>
            <div className={styles.faqHeroAccent}>We’ve got answers.</div>
          </div>
          <p className={styles.faqHeroLead}>
            Everything you need to know about ordering, subscriptions, wallet and delivery,
            from your first tiffin to bulk orders.
          </p>
        </div>

        {/* Main interactive layout */}
        <div className={styles.faqLayout}>
          {/* Category sidebar */}
          <nav className={styles.categories} aria-label="Browse by category">
            <h2 className={styles.categoriesTitle}>Browse by category</h2>
            <div className={styles.categoriesList} role="tablist">
              {FAQ_DATA.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`faq-tabpanel-${category.id}`}
                    id={`faq-tab-${category.id}`}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`${styles.category} ${
                      isActive ? styles.categoryActive : ""
                    }`}
                  >
                    <span className={styles.categoryIcon}>
                      <img src={category.icon} alt="" width="20" height="20" />
                    </span>
                    <span className={styles.categoryText}>
                      <span className={styles.categoryName}>{category.name}</span>
                      <span className={styles.categoryCount}>{category.count}</span>
                    </span>
                    <img
                      className={styles.categoryChevron}
                      src={
                        isActive
                          ? "/assets/icon-chevron-right-active.svg"
                          : "/assets/icon-chevron-right.svg"
                      }
                      alt=""
                      width="18"
                      height="18"
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Accordion Questions */}
          <section
            className={styles.questions}
            id={`faq-tabpanel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${activeCategory.id}`}
          >
            {activeCategory.questions.map((item, idx) => {
              const isOpen = openQuestionIndex === idx;
              return (
                <div
                  key={`${activeCategory.id}-${idx}`}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                >
                  <h3>
                    <button
                      className={styles.faqItemQ}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => handleQuestionToggle(idx)}
                    >
                      <span>{item.q}</span>
                      <img
                        className={`${styles.faqItemChevron} ${
                          isOpen ? styles.faqItemChevronOpen : ""
                        }`}
                        src="/assets/icon-chevron-down.svg"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </button>
                  </h3>
                  {isOpen && <div className={styles.faqItemA}>{item.a}</div>}
                </div>
              );
            })}
          </section>

          {/* Support callout card */}
          <aside className={styles.support}>
            <h3>Still have questions?</h3>
            <p>
              Can’t find the answer you’re looking for?<br />
              Our support team replies within a few hours, every day.
            </p>
            <Link
              className={styles.supportCta}
              href="/contact"
              aria-label="Contact support"
            >
              Contact support
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
