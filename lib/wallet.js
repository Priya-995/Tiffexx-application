"use client";

export const WALLET_BALANCE_KEY = "tiffexx.wallet_balance";
export const WALLET_TRANSACTIONS_KEY = "tiffexx.wallet_transactions";
export const SPIN_STATE_KEY = "tiffexx.spin_state";

export function getStoredWalletBalance() {
  if (typeof window === "undefined") return 350.0;
  try {
    const val = localStorage.getItem(WALLET_BALANCE_KEY);
    if (val !== null) return parseFloat(val) || 0;
  } catch (e) {
    console.error("Error reading wallet balance:", e);
  }
  return 350.0;
}

export function saveStoredWalletBalance(newBalance) {
  if (typeof window === "undefined") return;
  try {
    const num = Math.max(0, Number(newBalance) || 0);
    localStorage.setItem(WALLET_BALANCE_KEY, num.toFixed(2));
    window.dispatchEvent(
      new CustomEvent("tiffexx:wallet-updated", { detail: { balance: num } })
    );
  } catch (e) {
    console.error("Error saving wallet balance:", e);
  }
}

export function addWalletAmount(amount, reason = "Play Zone Reward") {
  if (typeof window === "undefined") return 350.0;
  const current = getStoredWalletBalance();
  const updated = current + (Number(amount) || 0);
  saveStoredWalletBalance(updated);

  // Record transaction in history
  try {
    const raw = localStorage.getItem(WALLET_TRANSACTIONS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const newTx = {
      id: Date.now(),
      time: "Just now",
      kitchen: reason,
      orderId: `#PZ-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Reward",
      badgeType: "green",
      amount: `+₹${amount}`,
      isPositive: true,
    };
    localStorage.setItem(WALLET_TRANSACTIONS_KEY, JSON.stringify([newTx, ...list]));
  } catch (e) {
    console.error("Error recording transaction:", e);
  }

  return updated;
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
