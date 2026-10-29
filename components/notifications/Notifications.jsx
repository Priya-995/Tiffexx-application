"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "Orders",
    title: "Your order from Amma's Kitchen has been delivered.",
    time: "2 min ago",
    icon: "/assets/notif-order.png",
    bg: "#fbf0dc",
    isUnread: true,
    isCenter: true,
    hasChevron: true,
    isVeg: true,
  },
  {
    id: 2,
    type: "Orders",
    title: "Subscription renewed successfully. 30 meals added.",
    time: "1 day ago",
    icon: "/assets/notif-subscription.png",
    bg: "#e5ecf6",
    isUnread: true,
    isCenter: true,
    hasChevron: true,
    isVeg: true,
  },
  {
    id: 3,
    type: "Offers",
    title: "Wallet offer: Add ₹500, get ₹50 free.",
    time: "2 days ago",
    icon: "/assets/notif-wallet.png",
    bg: "#efe7f6",
    isUnread: true,
    isCenter: false,
    hasChevron: true,
    isVeg: true,
    detail:
      "Valid for the next 48 hours. Add money to your wallet and the bonus is credited instantly — use it toward your next order or subscription renewal.",
    actions: [
      { label: "Dismiss", variant: "out", action: "dismiss" },
      { label: "Add Money", variant: "fill", link: "/wallet" },
    ],
  },
  {
    id: 4,
    type: "Kitchens",
    title: "Rate your last meal from Amma's Kitchen.",
    time: "3 days ago",
    icon: "/assets/notif-rate.png",
    bg: "#fbf0dc",
    isUnread: false,
    isCenter: false,
    hasChevron: false,
    isVeg: true,
    actions: [
      { label: "Later", variant: "out", action: "later" },
      { label: "Rate Now", variant: "fill", action: "rate" },
    ],
  },
  {
    id: 5,
    type: "Kitchens",
    title: "New kitchen in your area: Sunita's Home Kitchen.",
    time: "5 days ago",
    icon: "/assets/notif-kitchen.png",
    bg: "#e6f1e1",
    isUnread: false,
    isCenter: false,
    hasChevron: false,
    isVeg: true,
    singleAction: { label: "View Kitchen", variant: "fill", link: "/kitchens" },
  },
];

export default function Notifications() {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleMarkAllRead = (e) => {
    e.preventDefault();
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    showToast("All notifications marked as read.");
  };

  const handleAction = (notifId, actionType) => {
    if (actionType === "dismiss" || actionType === "later") {
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
      showToast("Notification dismissed.");
    } else if (actionType === "rate") {
      showToast("Thank you for your rating! ⭐️⭐️⭐️⭐️⭐️");
      setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    }
  };

  // Counts
  const countAll = notifications.length;
  const countOrders = notifications.filter((n) => n.type === "Orders").length;
  const countOffers = notifications.filter((n) => n.type === "Offers").length;
  const countKitchens = notifications.filter((n) => n.type === "Kitchens").length;

  // Filtered list
  const filteredList = notifications.filter((n) => {
    if (isVegOnly && !n.isVeg) return false;
    if (activeFilter === "Orders") return n.type === "Orders";
    if (activeFilter === "Offers") return n.type === "Offers";
    if (activeFilter === "Kitchens") return n.type === "Kitchens";
    return true;
  });

  return (
    <div className="notifications-page">
      {toastMessage && (
        <div className="auth-toast" role="alert">
          {toastMessage}
        </div>
      )}

      <main className="notifications-main main">
        <div className="wrap">
          {!isLoggedIn ? (
            /* Logged-out state: No notifications screen displayed */
            <div className="notifications-auth-card">
              <div className="notifications-auth-icon">
                <img src="/assets/icon-bell.svg" alt="" width="30" height="30" />
              </div>
              <h2>Sign in to view notifications</h2>
              <p>
                You need an active account to view your meal delivery alerts, subscription renewals, and kitchen offers.
              </p>
              <div className="notifications-auth-actions">
                <Link href="/signin?redirect=/notifications" className="btn-auth-login">
                  Login
                </Link>
                <Link href="/signup" className="btn-auth-signup">
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Header Title Row */}
              <div className="row-title">
                <h1>Your notifications</h1>
                {notifications.some((n) => n.isUnread) && (
                  <button
                    className="mark-read"
                    type="button"
                    onClick={handleMarkAllRead}
                  >
                    ✓ Mark all as read
                  </button>
                )}
              </div>

              {/* Filters Row */}
              <div className="row-filters">
                <div className="filters">
                  <span className="filters__vline"></span>
                  <div className="filters__btns">
                    <button
                      className={`filter ${activeFilter === "All" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveFilter("All")}
                    >
                      All <i>{countAll}</i>
                    </button>
                    <button
                      className={`filter ${activeFilter === "Orders" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveFilter("Orders")}
                    >
                      Orders <i>{countOrders}</i>
                    </button>
                    <button
                      className={`filter ${activeFilter === "Offers" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveFilter("Offers")}
                    >
                      Offers <i>{countOffers}</i>
                    </button>
                    <button
                      className={`filter ${activeFilter === "Kitchens" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => setActiveFilter("Kitchens")}
                    >
                      Kitchens <i>{countKitchens}</i>
                    </button>
                  </div>
                </div>

                {/* Properly placed Veg toggle button */}
               
              </div>

          {/* Notifications List or Empty State */}
          {filteredList.length > 0 ? (
            <div className="list">
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  className={`item ${item.isUnread ? "is-unread" : ""} ${
                    item.isCenter ? "is-center" : ""
                  }`}
                >
                  <span className="item__icon" style={{ background: item.bg }}>
                    <img src={item.icon} alt="" />
                  </span>

                  <div className="item__body">
                    <p className="item__title">{item.title}</p>
                    <p
                      className={`item__time ${
                        item.detail ? "item__time--pb" : ""
                      }`}
                    >
                      {item.time}
                    </p>

                    {item.detail && <div className="detail">{item.detail}</div>}

                    {item.actions && (
                      <div className="actions-row">
                        <div className="btns">
                          {item.actions.map((act, i) =>
                            act.link ? (
                              <Link
                                key={i}
                                className={`btn btn--${act.variant}`}
                                href={act.link}
                              >
                                {act.label}
                              </Link>
                            ) : (
                              <button
                                key={i}
                                type="button"
                                className={`btn btn--${act.variant}`}
                                onClick={() => handleAction(item.id, act.action)}
                              >
                                {act.label}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {item.singleAction && (
                      <div className="actions-row">
                        <Link
                          className="btn btn--fill btn--single"
                          href={item.singleAction.link}
                        >
                          {item.singleAction.label}
                        </Link>
                      </div>
                    )}
                  </div>

                  {item.hasChevron && (
                    <img
                      className="item__chev"
                      src="/assets/icon-chevron.svg"
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="empty" style={{ position: "static", paddingTop: "60px" }}>
              <img
                className="empty__img"
                src="/assets/empty-notifications.png"
                alt="No notifications"
              />
              <div className="empty__title">
                <h2>Sorry but there’s no Notifications related to your meal.</h2>
              </div>
              <Link className="empty__btn" href="/kitchens">
                Explore Kitchens
              </Link>
            </div>
          )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
