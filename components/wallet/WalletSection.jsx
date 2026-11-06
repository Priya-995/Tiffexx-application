"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  getStoredWalletBalance,
  getStoredWalletTransactions,
  addWalletAmount,
} from "@/lib/wallet";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./WalletSection.module.css";

export default function WalletSection() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  // Balance & transactions state
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [topupAmount, setTopupAmount] = useState(200);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    const syncWallet = () => {
      if (isLoggedIn && user) {
        setBalance(getStoredWalletBalance(user));
        setTransactions(getStoredWalletTransactions(user));
      } else {
        setBalance(0);
        setTransactions([]);
      }
    };

    syncWallet();

    const handleUpdate = () => syncWallet();
    window.addEventListener("tiffexx:wallet-updated", handleUpdate);
    window.addEventListener("tiffexx:wallet-transactions-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("tiffexx:wallet-updated", handleUpdate);
      window.removeEventListener("tiffexx:wallet-transactions-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [isLoggedIn, user]);

  const displayName = user?.name || "User";
  const displayPhone = user?.phone || "+91 98XXX XXX10";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleAddMoneySubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      showToast("Please sign in to add money to your wallet.");
      router.push("/signin?redirect=/wallet");
      return;
    }

    const amountNum = Number(topupAmount);
    if (!amountNum || amountNum <= 0) return;

    const newBalance = addWalletAmount(amountNum, "Instant Wallet Top-up", user);
    setBalance(newBalance);
    setTransactions(getStoredWalletTransactions(user));
    setShowAddMoney(false);
    showToast(`✓ Added ₹${amountNum} to your wallet! New balance: ₹${Math.round(newBalance)}`);
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
        <h1 className={s.main__title}>MY WALLET</h1>

        {/* Balance */}
        <section className={s.balance} aria-label="Wallet balance">
          <div className={s.balance__text}>
            <p className={s.balance__label}>Available Balance</p>
            <p className={s.balance__amount}>₹{balance.toFixed(0)}</p>
            <p className={s.balance__note}>This wallet can be used for all orders</p>
          </div>
          <button
            type="button"
            className={`${s.btn} ${s["btn--primary"]}`}
            onClick={() => {
              if (!isLoggedIn || !user) {
                showToast("Please sign in to add money to your wallet.");
                router.push("/signin?redirect=/wallet");
                return;
              }
              setShowAddMoney(true);
            }}
          >
            Add Money
          </button>
        </section>

        {/* Transaction log */}
        <section className={s.card}>
          <header className={s.card__head}>
            <h2 className={s.card__title}>Transaction Log</h2>
            <button
              type="button"
              className={s.link}
              onClick={() => showToast("Showing all past transactions")}
            >
              View more ›
            </button>
          </header>

          {transactions.length === 0 ? (
            <div style={{ padding: "32px 18px", textAlign: "center", color: "#6a625e" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>No transactions yet</p>
              <p style={{ margin: "6px 0 0", fontSize: "12.5px", color: "#9c8e82" }}>
                {isLoggedIn
                  ? "Top up your wallet or order meals to view transaction history."
                  : "Sign in to view your balance and transaction history."}
              </p>
            </div>
          ) : (
            <ul className={s.txns}>
              {transactions.map((tx) => (
                <li key={tx.id} className={s.txn}>
                  <div>
                    <p className={s.txn__title}>{tx.title}</p>
                    <p className={s.txn__meta}>{tx.meta}</p>
                  </div>
                  <div className={s.txn__end}>
                    <p
                      className={`${s.txn__amount} ${
                        tx.type === "credit" ? s["txn__amount--credit"] : s["txn__amount--debit"]
                      }`}
                    >
                      {tx.amount}
                    </p>
                    <p className={s.txn__meta}>{tx.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Help cards */}
        <div className={s.pair}>
          <section className={`${s.card} ${s["card--help"]}`}>
            <h2 className={s.card__title}>Can Not Find My Wallet</h2>
            <p className={s.help__text}>Try signing in with another account</p>
            <div className={s.chips}>
              <Link className={s.chip} href="/login">
                Google
              </Link>
              <Link className={s.chip} href="/login">
                Phone number
              </Link>
              <Link className={s.chip} href="/login">
                Email
              </Link>
            </div>
          </section>

          <section className={`${s.card} ${s["card--help"]}`}>
            <h2 className={s.card__title}>Contact Us</h2>
            <div className={s["contact-links"]}>
              <Link href="/terms">WALLET T&amp;C</Link>
              <Link href="/faq">WALLET FAQ</Link>
              <Link href="/contact">HELP &amp; SUPPORT</Link>
            </div>
          </section>
        </div>

        {/* Benefits */}
        <div className={s.benefits}>
          <article className={s.benefit}>
            <img src="/assets/quick-refund.svg" width="36" height="36" alt="" />
            <h3 className={s.benefit__title}>QUICK REFUND</h3>
            <p className={s.benefit__text}>Get instant refunds</p>
          </article>
          <article className={s.benefit}>
            <img src="/assets/instant-checkout.svg" width="36" height="36" alt="" />
            <h3 className={s.benefit__title}>INSTANT CHECKOUT</h3>
            <p className={s.benefit__text}>One-tap, easy and fast checkout</p>
          </article>
          <article className={s.benefit}>
            <img src="/assets/more-benefits.svg" width="36" height="36" alt="" />
            <h3 className={s.benefit__title}>MORE BENEFITS</h3>
            <p className={s.benefit__text}>Explore offers for using the wallet</p>
          </article>
        </div>
      </div>

      {/* Top-up Modal */}
      {showAddMoney && (
        <div className={s["modal-overlay"]} onClick={() => setShowAddMoney(false)}>
          <div className={s["modal-content"]} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--maroon)", margin: 0 }}>
              Add Money to Tiffexx Wallet
            </h3>
            <p style={{ fontSize: 13, color: "var(--ink-3)", margin: 0 }}>
              Balance is automatically used for meals, subscriptions, and instant deliveries.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[100, 200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    borderRadius: 6,
                    border: "1px solid var(--sand-85)",
                    background: topupAmount === amt ? "var(--yellow)" : "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--maroon)",
                    cursor: "pointer",
                  }}
                  onClick={() => setTopupAmount(amt)}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <form onSubmit={handleAddMoneySubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>
                  Enter Amount (₹)
                </label>
                <input
                  type="number"
                  min="10"
                  max="50000"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(Number(e.target.value))}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid var(--sand-85)",
                    fontSize: 16,
                    fontWeight: 700,
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "11px 0",
                    background: "var(--maroon)",
                    color: "#fff",
                    borderRadius: 8,
                    border: 0,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Proceed to Top-up
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMoney(false)}
                  style={{
                    padding: "11px 18px",
                    background: "transparent",
                    color: "var(--ink-3)",
                    borderRadius: 8,
                    border: "1px solid var(--sand-85)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive feedback toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}
