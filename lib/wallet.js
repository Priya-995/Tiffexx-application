"use client";

import { getStoredUser } from "@/lib/auth";

export const WALLET_BASE_KEY = "tiffexx.wallet_balance";
export const TRANSACTIONS_BASE_KEY = "tiffexx.wallet_transactions";
export const SPIN_STATE_KEY = "tiffexx.spin_state";

export function getUserKey(user) {
  const u = user || (typeof window !== "undefined" ? getStoredUser() : null);
  if (!u) return null;
  const rawId = u.email || u.phone || u.id || u.name || "default_user";
  return String(rawId).toLowerCase().replace(/[^a-z0-9]/g, "_");
}

export function getStoredWalletBalance(user) {
  if (typeof window === "undefined") return 0;
  
  const u = user || getStoredUser();
  // Unauthenticated user always has 0 balance
  if (!u) return 0;

  const key = `${WALLET_BASE_KEY}_${getUserKey(u)}`;
  try {
    const val = localStorage.getItem(key);
    if (val !== null) return Math.max(0, parseFloat(val) || 0);

    // Initial default starting balance for newly registered/authenticated users
    const defaultInitial = 250.0;
    localStorage.setItem(key, defaultInitial.toFixed(2));
    return defaultInitial;
  } catch (e) {
    console.error("Error reading wallet balance:", e);
    return 0;
  }
}

export function saveStoredWalletBalance(newBalance, user) {
  if (typeof window === "undefined") return 0;

  const u = user || getStoredUser();
  if (!u) return 0;

  const key = `${WALLET_BASE_KEY}_${getUserKey(u)}`;
  try {
    const num = Math.max(0, Number(newBalance) || 0);
    localStorage.setItem(key, num.toFixed(2));
    window.dispatchEvent(
      new CustomEvent("tiffexx:wallet-updated", {
        detail: { balance: num, userKey: getUserKey(u) },
      })
    );
    window.dispatchEvent(new Event("storage"));
    return num;
  } catch (e) {
    console.error("Error saving wallet balance:", e);
    return 0;
  }
}

export function addWalletAmount(amount, reason = "Wallet Top-up", user) {
  if (typeof window === "undefined") return 0;

  const u = user || getStoredUser();
  if (!u) return 0;

  const amtNum = Number(amount) || 0;
  if (amtNum <= 0) return getStoredWalletBalance(u);

  const current = getStoredWalletBalance(u);
  const updated = current + amtNum;
  saveStoredWalletBalance(updated, u);

  // Record transaction in history for this specific user
  try {
    const uKey = getUserKey(u);
    const txKey = `${TRANSACTIONS_BASE_KEY}_${uKey}`;
    const raw = localStorage.getItem(txKey);
    const list = raw ? JSON.parse(raw) : getStoredWalletTransactions(u);

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTx = {
      id: `tx-${Date.now()}`,
      title: reason,
      meta: `Transaction ID: TX-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: `+₹${amtNum}`,
      type: "credit",
      date: `${dateStr}, ${timeStr}`,
    };

    localStorage.setItem(txKey, JSON.stringify([newTx, ...list]));
    window.dispatchEvent(new CustomEvent("tiffexx:wallet-transactions-updated"));
  } catch (e) {
    console.error("Error recording wallet transaction:", e);
  }

  return updated;
}

export function deductWalletAmount(amount, reason = "Meal Order Payment", user) {
  if (typeof window === "undefined") return 0;

  const u = user || getStoredUser();
  if (!u) return 0;

  const amtNum = Number(amount) || 0;
  if (amtNum <= 0) return getStoredWalletBalance(u);

  const current = getStoredWalletBalance(u);
  const updated = Math.max(0, current - amtNum);
  saveStoredWalletBalance(updated, u);

  // Record debit transaction in history for this specific user
  try {
    const uKey = getUserKey(u);
    const txKey = `${TRANSACTIONS_BASE_KEY}_${uKey}`;
    const raw = localStorage.getItem(txKey);
    const list = raw ? JSON.parse(raw) : getStoredWalletTransactions(u);

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTx = {
      id: `tx-${Date.now()}`,
      title: reason,
      meta: `Transaction ID: TX-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: `−₹${amtNum}`,
      type: "debit",
      date: `${dateStr}, ${timeStr}`,
    };

    localStorage.setItem(txKey, JSON.stringify([newTx, ...list]));
    window.dispatchEvent(new CustomEvent("tiffexx:wallet-transactions-updated"));
  } catch (e) {
    console.error("Error recording debit transaction:", e);
  }

  return updated;
}

export function getStoredWalletTransactions(user) {
  if (typeof window === "undefined") return [];

  const u = user || getStoredUser();
  if (!u) return [];

  const uKey = getUserKey(u);
  const txKey = `${TRANSACTIONS_BASE_KEY}_${uKey}`;

  try {
    const raw = localStorage.getItem(txKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Error reading wallet transactions:", e);
  }

  // Default initial transactions for new users
  const defaultTxns = [
    {
      id: `tx-init-1-${uKey}`,
      title: "Welcome Bonus",
      meta: "Promotional credit added to your account",
      amount: "+₹50",
      type: "credit",
      date: "26 Oct 2026, 10:00",
    },
    {
      id: `tx-init-2-${uKey}`,
      title: "Order refund",
      meta: "Order ID: TX-10431",
      amount: "+₹34",
      type: "credit",
      date: "25 Oct 2026, 14:52",
    },
  ];

  try {
    localStorage.setItem(txKey, JSON.stringify(defaultTxns));
  } catch (e) {}

  return defaultTxns;
}

export function getSpinState() {
  if (typeof window === "undefined") {
    return { spinsAvailable: 1, lastSpinDate: null, streakDays: 3, prizeHistory: [] };
  }
  try {
    const raw = localStorage.getItem(SPIN_STATE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading spin state:", e);
  }
  return { spinsAvailable: 1, lastSpinDate: null, streakDays: 3, prizeHistory: [] };
}

export function saveSpinState(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SPIN_STATE_KEY, JSON.stringify(state));
    window.dispatchEvent(
      new CustomEvent("tiffexx:spin-state-updated", { detail: state })
    );
  } catch (e) {
    console.error("Error saving spin state:", e);
  }
}
