"use client";

import Link from "next/link";
import s from "./UserDropdown.module.css";

export default function UserDropdown({ isLoggedIn, user, onClose, onLogout }) {
  return (
    <div className={s.dropdown} role="menu" aria-label="User Account Menu">
      {/* Top action row */}
      {!isLoggedIn ? (
        <div className={s.authRow}>
          <Link href="/signin" className={s.btnLogin} onClick={onClose}>
            Login
          </Link>
          <Link href="/signup" className={s.btnSignup} onClick={onClose}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={s.userHeader}>
          <div className={s.userAvatar}>
            {user?.name
              ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
              : "RK"}
          </div>
          <div className={s.userInfo}>
            <p className={s.userName}>{user?.name || "Priya Sharma"}</p>
            <p className={s.userEmail}>{user?.email || "priya@gmail.com"}</p>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className={s.divider} />

      {/* Navigation List */}
      <nav className={s.menuList}>
        {/* Only show Overview if user IS logged in. When NOT logged in, NO Overview option. */}
        {isLoggedIn && (
          <Link href="/profile" className={s.menuItem} onClick={onClose}>
            <span className={s.menuIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
              </svg>
            </span>
            <span className={s.menuLabel}>Overview</span>
          </Link>
        )}

        <Link
          href={isLoggedIn ? "/cart" : "/kitchens"}
          className={s.menuItem}
          onClick={onClose}
        >
          <span className={s.menuIcon}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3.5 3.5 8.4v7.2L12 20.5l8.5-4.9V8.4L12 3.5z" />
              <path d="M3.5 8.4 12 13.3l8.5-4.9" />
              <path d="M12 13.3v7.2" />
              <path d="m7.8 5.9 8.5 4.9" />
            </svg>
          </span>
          <span className={s.menuLabel}>{isLoggedIn ? "My Orders" : "Explore Meals"}</span>
        </Link>

        {isLoggedIn && (
          <Link href="/subscriptions" className={s.menuItem} onClick={onClose}>
            <span className={s.menuIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <span className={s.menuLabel}>My Subscription</span>
          </Link>
        )}

        <Link href="/rewards" className={s.menuItem} onClick={onClose}>
          <span className={s.menuIcon}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6.5h18a2 2 0 0 1 2 2v1.5a2 2 0 0 0 0 4V15.5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1.5a2 2 0 0 0 0-4V8.5a2 2 0 0 1 2-2z" />
              <path d="M12 7v10" strokeDasharray="2.5 2" />
            </svg>
          </span>
          <span className={s.menuLabel}>My Coupon</span>
        </Link>

        {/* Wallet kept inside My Account when logged in */}
        {isLoggedIn && (
          <Link href="/wallet" className={s.menuItem} onClick={onClose}>
            <span className={s.menuIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </span>
            <span className={s.menuLabel}>Wallet</span>
            <span className={s.walletBadge}>₹25</span>
          </Link>
        )}

        <Link href="/faq" className={s.menuItem} onClick={onClose}>
          <span className={s.menuIcon}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.4c0 1.6-2 2.2-2 3.1" />
              <line x1="12" y1="16.5" x2="12.01" y2="16.5" strokeWidth="2.5" />
            </svg>
          </span>
          <span className={s.menuLabel}>Help Center</span>
        </Link>

        {isLoggedIn && (
          <button
            type="button"
            className={`${s.menuItem} ${s.logoutItem}`}
            onClick={() => {
              onLogout?.();
              onClose?.();
            }}
          >
            <span className={s.menuIcon}>
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className={s.menuLabel}>Log Out</span>
          </button>
        )}
      </nav>
    </div>
  );
}
