"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredWalletBalance, saveStoredWalletBalance } from "@/lib/wallet";
import { useAuth } from "@/lib/auth";

const PRESET_AMOUNTS = [
  { value: 500, label: "₹500", bonus: "+₹50" },
  { value: 1000, label: "₹1K", bonus: "+₹150" },
  { value: 2000, label: "₹2K", bonus: "+₹400" },
  { value: 5000, label: "₹5K", bonus: "+₹1,000" },
];

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    time: "1h ago",
    kitchen: "Amma's Kitchen",
    orderId: "#12345",
    type: "Lunch",
    badgeType: "lunch",
    amount: "-₹85",
    isPositive: false,
  },
  {
    id: 2,
    time: "4h ago",
    kitchen: "Wallet top-up",
    orderId: "#12345",
    type: "UPI",
    badgeType: "green",
    amount: "+₹200",
    isPositive: true,
  },
  {
    id: 3,
    time: "12 Jul",
    kitchen: "Subscription charge",
    orderId: "#12345",
    type: "Lunch",
    badgeType: "lunch",
    amount: "-₹1,200",
    isPositive: false,
  },
  {
    id: 4,
    time: "10 Jul",
    kitchen: "Refund · order #4521",
    orderId: "#12345",
    type: "Refund",
    badgeType: "green",
    amount: "+₹85",
    isPositive: true,
  },
  {
    id: 5,
    time: "8 Jul",
    kitchen: "Meena's Tiffin",
    orderId: "#12345",
    type: "Dinner",
    badgeType: "dinner",
    amount: "-₹95",
    isPositive: false,
  },
];

export default function WalletSection() {
  const { user, isLoggedIn } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [inputValue, setInputValue] = useState("1,000");
  const [searchFilter, setSearchFilter] = useState("");
  const [balance, setBalance] = useState(350.0);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setBalance(getStoredWalletBalance());
    const onWalletUpdate = (e) => {
      if (e.detail?.balance !== undefined) setBalance(e.detail.balance);
    };
    window.addEventListener("tiffexx:wallet-updated", onWalletUpdate);
    return () => window.removeEventListener("tiffexx:wallet-updated", onWalletUpdate);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  const handleSelectPreset = (amount) => {
    setSelectedAmount(amount);
    setInputValue(amount.toLocaleString("en-IN"));
  };

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(raw, 10);
    if (!isNaN(num)) {
      setInputValue(num.toLocaleString("en-IN"));
      setSelectedAmount(num);
    } else {
      setInputValue("");
      setSelectedAmount(0);
    }
  };

  const handlePay = () => {
    const num = selectedAmount || parseInt(inputValue.replace(/,/g, ""), 10) || 0;
    if (num <= 0) {
      showToast("Please enter a valid amount to top up.");
      return;
    }

    let bonus = 0;
    if (num === 500) bonus = 50;
    else if (num === 1000) bonus = 150;
    else if (num === 2000) bonus = 400;
    else if (num === 5000) bonus = 1000;

    const totalAdded = num + bonus;
    const newBal = balance + totalAdded;
    setBalance(newBal);
    saveStoredWalletBalance(newBal);

    const newTx = {
      id: Date.now(),
      time: "Just now",
      kitchen: bonus > 0 ? `Wallet top-up (+₹${bonus} bonus)` : "Wallet top-up",
      orderId: `#${Math.floor(10000 + Math.random() * 90000)}`,
      type: "UPI",
      badgeType: "green",
      amount: `+₹${totalAdded.toLocaleString("en-IN")}`,
      isPositive: true,
    };

    setTransactions([newTx, ...transactions]);
    showToast(`Successfully added ₹${totalAdded.toLocaleString("en-IN")} to your wallet!`);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (!searchFilter.trim()) return true;
    const term = searchFilter.toLowerCase();
    return (
      tx.kitchen.toLowerCase().includes(term) ||
      tx.orderId.toLowerCase().includes(term) ||
      tx.type.toLowerCase().includes(term) ||
      tx.amount.toLowerCase().includes(term)
    );
  });

  return (
    <main className="wallet-main">
      {toastMessage && (
        <div className="wallet-toast" role="alert">
          <span>{toastMessage}</span>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="notifications-auth-card" style={{ margin: "48px auto 60px" }}>
          <div className="notifications-auth-icon">
            <img src="/assets/icon-coin.png" alt="" width="36" height="36" />
          </div>
          <h2>Sign in to view your Wallet</h2>
          <p>
            You need an active account to view your balance, top up your wallet, earn cashback bonuses, and pay for meal orders.
          </p>
          <div className="notifications-auth-actions">
            <Link href="/signin?redirect=/wallet" className="btn-auth-login">
              Login
            </Link>
            <Link href="/signup" className="btn-auth-signup">
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="welcome">Welcome back, {user?.name || "Customer"}</p>
          <h1 className="title">Your wallet.</h1>

          <div className="layout">
            {/* Left column */}
            <section className="left">
              <div className="balance-card">
                <img
                  className="balance-card__icon"
                  src="/assets/icon-coin.png"
                  alt="Wallet coin"
                  width="36"
                  height="36"
                />
                <p className="balance-card__label">Wallet balance</p>
                <p className="balance-card__amount">₹{balance.toFixed(2)}</p>
                <p className="balance-card__name">{(user?.name || "CUSTOMER").toUpperCase()}</p>
              </div>

          <div className="actions">
            <button
              className="action"
              type="button"
              onClick={() => {
                const inputEl = document.querySelector(".field__input");
                inputEl?.focus();
                showToast("Enter amount below to add money.");
              }}
            >
              <span className="action__circle">
                <img src="/assets/icon-plus.svg" alt="" width="24" height="24" />
              </span>
              <span className="action__label">Add money</span>
            </button>
            <button
              className="action"
              type="button"
              onClick={() => showToast("Auto-reload settings enabled for active subscriptions.")}
            >
              <span className="action__circle">
                <img src="/assets/icon-reload.svg" alt="" width="24" height="24" />
              </span>
              <span className="action__label">Auto-reload</span>
            </button>
            <button
              className="action"
              type="button"
              onClick={() => showToast("Downloading latest 30-day wallet statement PDF...")}
            >
              <span className="action__circle">
                <img src="/assets/icon-statement.svg" alt="" width="24" height="24" />
              </span>
              <span className="action__label">Statement</span>
            </button>
            <Link href="/refer" className="action">
              <span className="action__circle" style={{ fontSize: "16px" }}>
                🎁
              </span>
              <span className="action__label">Refer &amp; Earn</span>
            </Link>
          </div>

          <div className="topup">
            <div className="topup__head">
              <img
                className="topup__logo"
                src="/assets/icon-razorpay.png"
                alt="Razorpay"
                width="38"
                height="38"
              />
              <div>
                <h2 className="topup__title">Add Money via Razorpay</h2>
                <p className="topup__sub">UPI · Cards · Net Banking · Wallets</p>
              </div>
            </div>

            <div className="amounts">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset.value}
                  className={`amount ${selectedAmount === preset.value ? "is-selected" : ""}`}
                  type="button"
                  onClick={() => handleSelectPreset(preset.value)}
                >
                  <b>{preset.label}</b>
                  <span>{preset.bonus}</span>
                </button>
              ))}
            </div>

            <label className="field" htmlFor="wallet-amount-input">
              <span className="field__prefix">₹</span>
              <input
                id="wallet-amount-input"
                className="field__input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                inputMode="numeric"
                placeholder="0"
              />
            </label>

            <p className="topup__hint">
              Top up ₹500, ₹1,000, ₹2,000 or ₹5,000 to earn a bonus.
            </p>

            <button className="pay" type="button" onClick={handlePay}>
              <img src="/assets/icon-razorpay.png" alt="" width="24" height="24" />
              <span>Pay with Razorpay</span>
            </button>
          </div>

          <div className="spent">
            <p className="spent__label">Total spent this month</p>
            <p className="spent__value">₹1,465</p>
            <p className="spent__delta">−₹120 vs last month</p>
          </div>
        </section>

        {/* Right column */}
        <section className="right">
          <div className="sub-card">
            <div>
              <p className="sub-card__label">Active subscription</p>
              <p className="sub-card__name">Amma&apos;s Kitchen — Lunch plan</p>
              <p className="sub-card__next">Next charge ₹1,200 on 12 Aug</p>
            </div>
            <Link href="/cart" className="btn-outline">
              Manage
            </Link>
          </div>

          <div className="history-head">
            <div>
              <h2 className="history-head__title">Transaction history</h2>
              <p className="history-head__sub">Your recent wallet activity</p>
            </div>
            <label className="search search--history" htmlFor="history-search-input">
              <img src="/assets/icon-search.svg" alt="" width="16" height="16" />
              <input
                id="history-search-input"
                type="text"
                placeholder="Search tiffin, kitchen, cuisine..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </label>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Kitchen</th>
                  <th>Order ID</th>
                  <th>Meal</th>
                  <th className="r">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="muted">{tx.time}</td>
                      <td className="strong">{tx.kitchen}</td>
                      <td className="strong">{tx.orderId}</td>
                      <td>
                        <span className={`badge badge--${tx.badgeType}`}>{tx.type}</span>
                      </td>
                      <td className={`r ${tx.isPositive ? "pos" : ""}`}>{tx.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="table-empty">
                      No transactions match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )}
</main>
  );
}
