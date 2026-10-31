"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./OrdersSection.module.css";

const ORDERS_DATA = [
  {
    id: "TX-10501",
    name: "Paneer Thali × 1",
    kitchen: "Amma’s Kitchen",
    date: "28 Oct 2026, 12:05 pm",
    status: "transit",
    statusText: "Out for delivery",
    total: "₹129",
    details: {
      items: "1× Shahi Paneer, 4× Whole Wheat Phulkas, Steamed Rice, Dal & Salad",
      subtotal: "₹119",
      delivery: "₹10",
      payment: "Paid via Tiffexx Wallet",
    },
    actions: ["track", "help"],
  },
  {
    id: "TX-10482",
    name: "Home-style Veg Thali × 1",
    kitchen: "Amma’s Kitchen",
    date: "27 Oct 2026, 12:10 pm",
    status: "delivered",
    statusText: "Delivered",
    total: "₹129",
    details: {
      items: "1× Dal Tadka, Seasonal Mix Veg Sabzi, 4× Phulkas, Jeera Rice, Curd",
      subtotal: "₹119",
      delivery: "₹10",
      payment: "Paid via UPI",
    },
    actions: ["track", "help"],
  },
  {
    id: "TX-10463",
    name: "Kadhi Chawal Box × 1",
    kitchen: "Shree Rasoi",
    date: "26 Oct 2026, 12:20 pm",
    status: "delivered",
    statusText: "Delivered",
    total: "₹129",
    details: {
      items: "Punjabi Pakora Kadhi (350ml), Steamed Basmati Rice, Roasted Papad",
      subtotal: "₹119",
      delivery: "₹10",
      payment: "Paid via Tiffexx Wallet",
    },
    actions: ["reorder", "help"],
  },
  {
    id: "TX-10431",
    name: "Dal Tadka Combo × 2",
    kitchen: "Mom’s Flavour",
    date: "25 Oct 2026, 12:00 pm",
    status: "delivered",
    statusText: "Delivered",
    total: "₹129",
    details: {
      items: "2× Yellow Dal Tadka, 8× Phulkas, Pickle & Onion salad",
      subtotal: "₹119",
      delivery: "₹10",
      payment: "Paid via Credit Card",
    },
    actions: ["reorder", "help"],
  },
  {
    id: "TX-10290",
    name: "Rajma Chawal Box × 1",
    kitchen: "Punjabi Rasoi",
    date: "18 Oct 2026, 11:45 am",
    status: "cancelled",
    statusText: "Cancelled",
    total: "₹99",
    details: {
      items: "Order cancelled by customer before kitchen preparation.",
      subtotal: "₹99",
      delivery: "₹0",
      payment: "Refunded to Tiffexx Wallet",
    },
    actions: ["reorder-outline", "refund"],
  },
];

export default function OrdersSection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "active" | "delivered" | "cancelled"
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [olderOrdersLoaded, setOlderOrdersLoaded] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const displayName = user?.name || "Ananya Rao";
  const displayPhone = user?.phone || "+91 98XXX XXX10";

  const getInitials = (name) => {
    if (!name) return "AR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleSignOut = () => {
    if (logout) logout();
    router.push("/signin");
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return ORDERS_DATA.filter((order) => {
      // Filter tab
      if (activeFilter === "active" && order.status !== "transit") return false;
      if (activeFilter === "delivered" && order.status !== "delivered") return false;
      if (activeFilter === "cancelled" && order.status !== "cancelled") return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = order.name.toLowerCase().includes(query);
        const matchesKitchen = order.kitchen.toLowerCase().includes(query);
        const matchesId = order.id.toLowerCase().includes(query);
        if (!matchesName && !matchesKitchen && !matchesId) return false;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const handleReorder = (dishName) => {
    showToast(`Added "${dishName}" to your cart!`);
  };

  const handleRefundStatus = (orderId, amount) => {
    showToast(`Refund of ${amount} for Order #${orderId} was credited to your Tiffexx Wallet.`);
  };

  const handleLoadMore = () => {
    setOlderOrdersLoaded(true);
    showToast("All previous orders have been loaded.");
  };

  return (
    <ProfileLayout>
      {/* Main */}
      <div className={s.main}>
        <div className={s.mainInner}>
          <button
            type="button"
            className={s.back}
            onClick={() => router.back()}
            aria-label="Back"
          >
            <img src="/assets/icon-back.svg" alt="" width="24" height="24" />
          </button>

          <h1 className={s.pageTitle}>MY ORDERS</h1>

          {/* Active order summary */}
          <section className={s.activeOrder} aria-label="Active order">
            <div className={s.activeOrderHead}>
              <p className={s.activeOrderEyebrow}>Active order · #TX-10501</p>
              <h2 className={s.activeOrderTitle}>Paneer Thali × 1</h2>
              <p className={s.activeOrderKitchen}>Amma’s Kitchen</p>
              <p className={s.pill}>Arriving by 1:15 pm</p>
            </div>

            <ol className={s.progress} aria-label="Order progress">
              <li className={`${s.progressStep} ${s.progressStepDone}`}>
                <span className={s.progressDot}>✓</span>
                <span className={s.progressLabel}>Order placed</span>
              </li>
              <li className={`${s.progressStep} ${s.progressStepDone}`}>
                <span className={s.progressDot}>✓</span>
                <span className={s.progressLabel}>Cooking fresh</span>
              </li>
              <li
                className={`${s.progressStep} ${s.progressStepCurrent}`}
                aria-current="step"
              >
                <span className={s.progressDot}>3</span>
                <span className={s.progressLabel}>Out for delivery</span>
              </li>
              <li className={`${s.progressStep} ${s.progressStepTodo}`}>
                <span className={s.progressDot}>4</span>
                <span className={s.progressLabel}>Delivered</span>
              </li>
            </ol>
          </section>

          {/* Filters + search */}
          <div className={s.toolbar}>
            <div className={s.chips} role="group" aria-label="Filter orders">
              <button
                className={`${s.chip} ${activeFilter === "all" ? s.chipActive : ""}`}
                type="button"
                onClick={() => setActiveFilter("all")}
              >
                All (5)
              </button>
              <button
                className={`${s.chip} ${activeFilter === "active" ? s.chipActive : ""}`}
                type="button"
                onClick={() => setActiveFilter("active")}
              >
                Active (1)
              </button>
              <button
                className={`${s.chip} ${activeFilter === "delivered" ? s.chipActive : ""}`}
                type="button"
                onClick={() => setActiveFilter("delivered")}
              >
                Delivered (3)
              </button>
              <button
                className={`${s.chip} ${activeFilter === "cancelled" ? s.chipActive : ""}`}
                type="button"
                onClick={() => setActiveFilter("cancelled")}
              >
                Cancelled (1)
              </button>
            </div>
            <input
              className={s.search}
              type="search"
              placeholder="Search by dish or order ID"
              aria-label="Search by dish or order ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Orders */}
          {filteredOrders.length === 0 ? (
            <div className={s.emptyState}>
              <p>No orders match your filter criteria.</p>
            </div>
          ) : (
            <div className={s.orderList}>
              {filteredOrders.map((order) => {
                const isTransit = order.status === "transit";
                const isDelivered = order.status === "delivered";
                const isCancelled = order.status === "cancelled";

                const badgeClass = isTransit
                  ? s.badgeTransit
                  : isDelivered
                  ? s.badgeDelivered
                  : s.badgeCancelled;

                return (
                  <article className={s.orderCard} key={order.id}>
                    <div className={s.orderCardTop}>
                      <div className={s.itemIcon}>
                        <img
                          src="/assets/icon-meal.svg"
                          alt=""
                          width="32"
                          height="32"
                        />
                      </div>
                      <div className={s.orderCardText}>
                        <p className={s.orderCardName}>{order.name}</p>
                        <p className={s.itemMeta}>
                          {order.kitchen} · {order.date}
                        </p>
                        <p className={s.itemMeta}>Order #{order.id}</p>
                      </div>
                      <span className={`${s.badge} ${badgeClass}`}>
                        {order.statusText}
                      </span>
                    </div>

                    <details className={s.details}>
                      <summary>View order details</summary>
                      <div className={s.orderDetailsContent}>
                        <div className={s.detailRow}>
                          <span>Items:</span>
                          <strong>{order.details.items}</strong>
                        </div>
                        <div className={s.detailRow}>
                          <span>Subtotal:</span>
                          <span>{order.details.subtotal}</span>
                        </div>
                        <div className={s.detailRow}>
                          <span>Delivery fee:</span>
                          <span>{order.details.delivery}</span>
                        </div>
                        <div className={s.detailRow}>
                          <span>Payment method:</span>
                          <strong>{order.details.payment}</strong>
                        </div>
                      </div>
                    </details>

                    <div
                      className={`${s.orderCardFoot} ${
                        isCancelled ? s.orderCardFootRuled : ""
                      }`}
                    >
                      <p className={s.total}>
                        <span className={s.totalLabel}>Order total</span>
                        <span className={s.totalAmount}>{order.total}</span>
                      </p>
                      <div className={s.orderCardActions}>
                        {order.actions.includes("track") && (
                          <button
                            className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                            type="button"
                            onClick={() => setTrackingOrder(order)}
                          >
                            Track Order
                          </button>
                        )}
                        {order.actions.includes("reorder") && (
                          <button
                            className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                            type="button"
                            onClick={() => handleReorder(order.name)}
                          >
                            Reorder
                          </button>
                        )}
                        {order.actions.includes("reorder-outline") && (
                          <button
                            className={s.btnOutline}
                            type="button"
                            onClick={() => handleReorder(order.name)}
                          >
                            Reorder
                          </button>
                        )}
                        {order.actions.includes("refund") && (
                          <button
                            type="button"
                            className={s.link}
                            onClick={() =>
                              handleRefundStatus(order.id, order.total)
                            }
                            style={{ background: "none", border: 0, padding: 0 }}
                          >
                            Refund status
                          </button>
                        )}
                        {order.actions.includes("help") && (
                          <Link className={s.link} href="/contact">
                            Get help
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className={s.loadMore}>
            <button
              className={s.btnOutline}
              type="button"
              onClick={handleLoadMore}
            >
              {olderOrdersLoaded ? "All orders loaded" : "Load older orders"}
            </button>
          </div>
        </div>
      </div>

      {/* Tracking Modal */}
      {trackingOrder && (
        <div
          className={s.modalOverlay}
          onClick={() => setTrackingOrder(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHead}>
              <h3>Tracking Order #{trackingOrder.id}</h3>
              <button
                type="button"
                className={s.closeBtn}
                onClick={() => setTrackingOrder(null)}
              >
                ✕
              </button>
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--dorado)" }}>
              Dish: <strong>{trackingOrder.name}</strong> from{" "}
              {trackingOrder.kitchen}
            </p>
            <div
              style={{
                background: "#fbf9f5",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid var(--bizarre)",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontWeight: 700,
                  color: "var(--van-cleef)",
                }}
              >
                Delivery Partner: Ramesh Kumar
              </p>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "13px",
                  color: "var(--ash)",
                }}
              >
                Estimated Arrival: <strong>1:15 pm</strong> (approx. 10 mins away)
              </p>
              <a
                href="tel:+919876543210"
                className={s.btnOutline}
                style={{ width: "100%", textAlign: "center" }}
              >
                📞 Call Rider (+91 98765 43210)
              </a>
            </div>
            <button
              type="button"
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={() => setTrackingOrder(null)}
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}

