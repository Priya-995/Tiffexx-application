"use client";

import Link from "next/link";
import s from "./OrderDropdown.module.css";

export default function OrderDropdown({ isLoggedIn, onClose }) {
  return (
    <div
      className={s.dropdown}
      role="menu"
      aria-label="Order and Explore Meals Menu"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Serviceability & Location banner */}
      <div className={s.locationBanner}>
        <div className={s.locationLeft}>
          <span className={s.locationDot}></span>
          <span className={s.locationTitle}>Delivering to Noida</span>
        </div>
        <span className={s.locationBadge}>Serviceable</span>
      </div>

      <div className={s.divider} />

      {/* Menu items */}
      <nav className={s.menuList}>
        {/* Item 1: Explore Meals (Primary public listing) */}
        <Link
          href="/kitchens"
          className={`${s.menuItem} ${s.menuItemFeatured}`}
          onClick={onClose}
        >
          <div className={s.menuIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div className={s.menuText}>
            <div className={s.menuTitleRow}>
              <span className={s.menuTitle}>Explore Meals</span>
              <span className={s.tagBadge}>Browse All</span>
            </div>
            <p className={s.menuSub}>Over 1,000+ local home kitchens in Noida</p>
          </div>
        </Link>

        {/* Item 2: Today's Thali Menu (Direct food menu) */}
        <Link
          href="/partner-listing"
          className={s.menuItem}
          onClick={onClose}
        >
          <div className={s.menuIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20" />
            </svg>
          </div>
          <div className={s.menuText}>
            <div className={s.menuTitleRow}>
              <span className={s.menuTitle}>Today&apos;s Thali Menu</span>
              <span className={s.tagBadgeGreen}>Fresh</span>
            </div>
            <p className={s.menuSub}>Amma&apos;s Kitchen · Lunch &amp; Dinner from ₹99</p>
          </div>
        </Link>

        {/* Item 3: View Cart */}
        <Link
          href="/cart"
          className={s.menuItem}
          onClick={onClose}
        >
          <div className={s.menuIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <div className={s.menuText}>
            <div className={s.menuTitleRow}>
              <span className={s.menuTitle}>View Cart &amp; Checkout</span>
              <span className={s.tagBadge}>Cart</span>
            </div>
            <p className={s.menuSub}>Review chosen meals and delivery schedule</p>
          </div>
        </Link>

        {/* Authenticated user option */}
        {isLoggedIn && (
          <Link
            href="/profile"
            className={s.menuItem}
            onClick={onClose}
          >
            <div className={s.menuIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
            </div>
            <div className={s.menuText}>
              <div className={s.menuTitleRow}>
                <span className={s.menuTitle}>Track Past Orders</span>
              </div>
              <p className={s.menuSub}>View order status and delivery updates</p>
            </div>
          </Link>
        )}
      </nav>

      {/* Bottom helper text */}
      <div className={s.footerNote}>
        {!isLoggedIn ? (
          <span>✨ Discover menus freely — sign in only when checking out</span>
        ) : (
          <span>✓ Subscriptions and single orders ready for daily delivery</span>
        )}
      </div>
    </div>
  );
}
