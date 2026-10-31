"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import s from "./ProfileSidebar.module.css";

const NAV_ITEMS = [
  // Top group
  {
    label: "My Orders",
    href: "/orders",
    group: "top",
    isActive: (p) => p.startsWith("/orders"),
  },
  {
    label: "My Coupons",
    href: "/coupons",
    group: "top",
    isActive: (p) => p.startsWith("/coupons") || p.startsWith("/my-coupons"),
  },

  // My Account group
  {
    label: "My Profile",
    href: "/profile",
    group: "account",
    isActive: (p) => p === "/profile",
  },
  {
    label: "My Addresses",
    href: "/addresses",
    group: "account",
    isActive: (p) => p.startsWith("/addresses") || p.startsWith("/my-addresses"),
  },
  {
    label: "My Reviews",
    href: "/reviews",
    group: "account",
    isActive: (p) => p.startsWith("/reviews") || p.startsWith("/my-reviews"),
  },
  {
    label: "My Subscription",
    href: "/subscriptions",
    group: "account",
    isActive: (p) => p.startsWith("/subscriptions") || p.startsWith("/subscription"),
  },
  {
    label: "My Wallet",
    href: "/wallet",
    group: "account",
    isActive: (p) => p.startsWith("/wallet"),
  },

  // Help Center group
  {
    label: "Customer Service",
    href: "/contact",
    group: "help",
    isActive: (p) => p.startsWith("/contact") || p.startsWith("/customer-service"),
  },
  {
    label: "Return Policy",
    href: "/return-policy",
    group: "help",
    isActive: (p) => p.startsWith("/return-policy") || p.startsWith("/returns"),
  },
  {
    label: "Shipping & Delivery",
    href: "/terms",
    group: "help",
    isActive: (p) => p.startsWith("/terms") || p.startsWith("/shipping"),
  },
];

function getInitials(name) {
  if (!name) return "AR";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName = user?.name || "Ananya Rao";
  const displayPhone = user?.phone || "+91 98XXX XXX10";
  const initials = getInitials(displayName);

  const handleSignOut = () => {
    if (logout) logout();
    router.push("/signin");
  };

  const topItems = NAV_ITEMS.filter((i) => i.group === "top");
  const accountItems = NAV_ITEMS.filter((i) => i.group === "account");
  const helpItems = NAV_ITEMS.filter((i) => i.group === "help");

  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar__user}>
        <div className={s.avatar} aria-hidden="true">
          {initials}
        </div>
        <div className={s.sidebar__info}>
          <p className={s.sidebar__name}>{displayName}</p>
          <p className={s.sidebar__phone}>{displayPhone}</p>
        </div>
      </div>

      <nav className={s.nav} aria-label="Account Navigation">
        {/* Top group */}
        <div className={s.nav__group}>
          {topItems.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`${s.nav__link} ${active ? s["nav__link--active"] : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <hr className={s.divider} />

        {/* My Account group */}
        <div className={s.nav__group}>
          <p className={s.nav__heading}>My Account</p>
          {accountItems.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`${s.nav__link} ${active ? s["nav__link--active"] : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <hr className={s.divider} />

        {/* Help Center group */}
        <div className={s.nav__group}>
          <p className={s.nav__heading}>Help Center</p>
          {helpItems.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`${s.nav__link} ${active ? s["nav__link--active"] : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <hr className={s.divider} />

        <button
          type="button"
          className={`${s.nav__link} ${s["nav__link--danger"]}`}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
