"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./CouponsSection.module.css";

const COUPONS_DATA = {
  active: [
    {
      id: "c1",
      code: "TIFF20",
      kind: "DISCOUNT",
      title: "Voucher",
      desc: "Get a flat discount on your next tiffin order from any partner kitchen.",
      value: "20%",
      type: "dark-discount",
      validity: "Valid 20 Oct – 20 Nov 2026",
    },
    {
      id: "c2",
      code: "FLAT20",
      kind: "DISCOUNT",
      title: "Voucher",
      desc: "Flat ₹20 off on orders above ₹149 from partner kitchens.",
      value: "₹ 20OFF",
      type: "dark-discount",
      validity: "Valid 20 Oct – 30 Nov 2026",
    },
    {
      id: "c3",
      code: "DELIVFREE",
      kind: "DELIVERY",
      title: "Voucher",
      desc: "Free delivery on every subscription renewal this month.",
      value: "FREE DELIVERY",
      type: "dark-delivery",
      validity: "Valid 20 Oct – 15 Nov 2026",
    },
    {
      id: "c4",
      code: "FREEMEAL",
      kind: "REWARD",
      title: "Voucher",
      desc: "Redeem free delivery on your next three orders. No minimum order value.",
      value: "FREE MEAL",
      type: "light-reward",
      validity: "VALID 20 OCT – 20 NOV 2026",
    },
    {
      id: "c5",
      code: "FIVE4FREE",
      kind: "REWARD",
      title: "Voucher",
      desc: "Win a free tiffin when you complete five orders in a month.",
      value: "FREE TIFFIN",
      type: "light-reward",
      validity: "VALID 20 OCT – 31 DEC 2026",
    },
    {
      id: "c6",
      code: "REFER2026",
      kind: "REWARD",
      title: "Voucher",
      desc: "Refer a friend and both of you get a free meal on the first order.",
      value: "FREE MEAL",
      type: "light-reward",
      validity: "VALID 20 OCT – 31 DEC 2026",
    },
  ],
  used: [
    {
      id: "c7",
      code: "WELCOME50",
      kind: "DISCOUNT",
      title: "Voucher",
      desc: "50% off on your first homemade tiffin order.",
      value: "50% OFF",
      type: "dark-discount",
      statusNote: "Used on 15 Oct 2026",
    },
    {
      id: "c8",
      code: "DIWALI30",
      kind: "REWARD",
      title: "Voucher",
      desc: "₹30 festive cashback credited to your wallet.",
      value: "₹30 CASHBACK",
      type: "light-reward",
      validity: "USED 24 OCT 2026",
      statusNote: "Used on 24 Oct 2026",
    },
  ],
  expired: [
    {
      id: "c9",
      code: "SUMMERDEAL",
      kind: "DISCOUNT",
      title: "Voucher",
      desc: "Flat ₹25 off on orders above ₹199.",
      value: "₹ 25OFF",
      type: "dark-discount",
      statusNote: "Expired 30 Sep 2026",
    },
    {
      id: "c10",
      code: "MONSOONFREE",
      kind: "DELIVERY",
      title: "Voucher",
      desc: "Complimentary beverage with any regular lunch combo.",
      value: "FREE DRINK",
      type: "dark-delivery",
      statusNote: "Expired 15 Oct 2026",
    },
    {
      id: "c11",
      code: "TRYTIFFIN",
      kind: "REWARD",
      title: "Voucher",
      desc: "15% off any 7-day meal trial package.",
      value: "15% OFF",
      type: "light-reward",
      validity: "EXPIRED 20 OCT 2026",
      statusNote: "Expired 20 Oct 2026",
    },
    {
      id: "c12",
      code: "FRESH10",
      kind: "REWARD",
      title: "Voucher",
      desc: "10% off all weekend subscription renewals.",
      value: "10% OFF",
      type: "light-reward",
      validity: "EXPIRED 25 OCT 2026",
      statusNote: "Expired 25 Oct 2026",
    },
  ],
};

export default function CouponsSection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("active"); // "active" | "used" | "expired"
  const [applyCode, setApplyCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

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

  const handleCopyCode = (code) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    showToast(`Code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = applyCode.trim().toUpperCase();
    if (!code) {
      showToast("Please enter a valid coupon code.");
      return;
    }

    const allActive = COUPONS_DATA.active.find((c) => c.code === code);
    if (allActive) {
      showToast(`Coupon "${code}" applied successfully! You unlocked ${allActive.value}.`);
      setApplyCode("");
    } else {
      showToast(`Coupon "${code}" is invalid or expired.`);
    }
  };

  const currentList = COUPONS_DATA[activeTab] || [];

  return (
    <ProfileLayout>
      {/* Main */}
      <div className={s.main}>
        <button
          className={s.back}
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <img src="/assets/back.svg" alt="" width="24" height="24" />
        </button>

        <h1 className={s.pageTitle}>MY COUPONS</h1>
        <p className={s.pageSub}>
          Spin, join contests and win rewards on every order.
        </p>

        {/* Apply coupon */}
        <form className={s.apply} onSubmit={handleApplyCoupon}>
          <label className={s.field}>
            <span className={s.fieldLabel}>Have a coupon code?</span>
            <input
              type="text"
              name="code"
              placeholder="Enter code"
              autoComplete="off"
              value={applyCode}
              onChange={(e) => setApplyCode(e.target.value)}
            />
          </label>
          <button className={`${s.btn} ${s.btnApply}`} type="submit">
            Apply
          </button>
        </form>

        {/* Status filter */}
        <div className={s.tabs} role="tablist" aria-label="Coupon status">
          <button
            className={`${s.tab} ${activeTab === "active" ? s.isActive : ""}`}
            role="tab"
            aria-selected={activeTab === "active"}
            type="button"
            onClick={() => setActiveTab("active")}
          >
            Active ({COUPONS_DATA.active.length})
          </button>
          <button
            className={`${s.tab} ${activeTab === "used" ? s.isActive : ""}`}
            role="tab"
            aria-selected={activeTab === "used"}
            type="button"
            onClick={() => setActiveTab("used")}
          >
            Used ({COUPONS_DATA.used.length})
          </button>
          <button
            className={`${s.tab} ${activeTab === "expired" ? s.isActive : ""}`}
            role="tab"
            aria-selected={activeTab === "expired"}
            type="button"
            onClick={() => setActiveTab("expired")}
          >
            Expired ({COUPONS_DATA.expired.length})
          </button>
        </div>

        {/* Coupons */}
        <section
          className={s.couponGrid}
          aria-label={`${activeTab} coupons`}
        >
          {currentList.length === 0 ? (
            <div className={s.emptyState}>
              <p>No {activeTab} coupons found.</p>
            </div>
          ) : (
            currentList.map((c) => {
              const isDark = c.type.startsWith("dark");
              const isDelivery = c.type === "dark-delivery";
              const isLight = c.type.startsWith("light");
              const isCopied = copiedCode === c.code;

              const cardModifier = isDark
                ? `${s.couponDark} ${isDelivery ? s.couponDelivery : ""}`
                : s.couponLight;

              const stateModifier =
                activeTab === "used"
                  ? s.couponUsed
                  : activeTab === "expired"
                  ? s.couponExpired
                  : "";

              return (
                <article
                  key={c.id}
                  className={`${s.coupon} ${cardModifier} ${stateModifier}`}
                >
                  {isDark && (
                    <div className={s.couponStub}>
                      <img
                        src="/assets/coupon-icon.svg"
                        alt=""
                        width="76"
                        height="76"
                      />
                    </div>
                  )}

                  {isLight && c.validity && (
                    <p className={s.couponValidity}>{c.validity}</p>
                  )}

                  <div className={s.couponBody}>
                    {isLight && <span className={s.couponBar} aria-hidden="true" />}
                    <div>
                      <p className={s.couponKind}>{c.kind}</p>
                      <h3 className={s.couponTitle}>{c.title}</h3>
                    </div>

                    {isDelivery ? (
                      <div className={s.couponMid}>
                        <p className={s.couponDesc}>{c.desc}</p>
                        <div className={s.couponCodeRow}>
                          <code className={s.couponCode}>{c.code}</code>
                          {activeTab === "active" && (
                            <button
                              className={`${s.btn} ${s.btnCopy}`}
                              type="button"
                              onClick={() => handleCopyCode(c.code)}
                              aria-label={`Copy code ${c.code}`}
                            >
                              {isCopied ? "Copied!" : "Copy code"}
                            </button>
                          )}
                          {c.statusNote && (
                            <span className={s.usedBadge}>{c.statusNote}</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className={s.couponDesc}>{c.desc}</p>
                        <p className={s.couponValue}>
                          {isLight && c.value.includes(" ") ? (
                            <>
                              {c.value.split(" ")[0]}{" "}
                              <span className={s.accent}>
                                {c.value.split(" ")[1]}
                              </span>
                            </>
                          ) : (
                            c.value
                          )}
                        </p>
                        <div className={s.couponCodeRow}>
                          <code className={s.couponCode}>{c.code}</code>
                          {activeTab === "active" && (
                            <button
                              className={`${s.btn} ${s.btnCopy}`}
                              type="button"
                              onClick={() => handleCopyCode(c.code)}
                              aria-label={`Copy code ${c.code}`}
                            >
                              {isCopied ? "Copied!" : "Copy code"}
                            </button>
                          )}
                          {c.statusNote && (
                            <span className={s.usedBadge}>{c.statusNote}</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {c.validity && isDark && (
                    <span className={s.srOnly}>{c.validity}</span>
                  )}
                </article>
              );
            })
          )}
        </section>

        <p className={s.finePrint}>
          Coupons can’t be combined. Terms apply to each voucher.
        </p>
      </div>

      {/* Toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}

