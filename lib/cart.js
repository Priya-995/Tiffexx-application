export const CART_STORAGE_KEY = "tiffexx.cart";
export const USER_STORAGE_KEY = "tiffexx.user";
export const ORDERS_STORAGE_KEY = "tiffexx.orders";

export const DEFAULT_ITEM = {
  id: "thali",
  name: "Thali",
  tag: "Lunch",
  sub: "Weekly · 7 meals",
  perDay: 89,
  qty: 1,
  kitchen: "Amma’s Kitchen",
  liked: false,
};

export const DATES = [
  { key: "9–16 Oct 2026", label: "9–16 Oct 2026", sub: "Starts tomorrow" },
  { key: "17–24 Oct 2026", label: "17–24 Oct 2026", sub: "Starts next week" },
  { key: "1–8 Nov 2026", label: "1–8 Nov 2026", sub: "Starts next month" },
];

export const PLANS = [
  { days: 7, discount: 0, label: "7 Days", sub: "Weekly plan" },
  { days: 14, discount: 6, label: "14 Days", sub: "Fortnightly · save 6%" },
  { days: 30, discount: 12, label: "30 Days", sub: "Monthly · best value" },
];

export const SLOTS = [
  { key: "20-25 mins", label: "Standard · 20-25 mins", sub: "Recommended" },
  { key: "12:30–1:00 PM", label: "Lunch · 12:30–1:00 PM", sub: "Fixed midday slot" },
  { key: "7:30–8:00 PM", label: "Evening · 7:30–8:00 PM", sub: "Fixed dinner slot" },
];

export const ADDRESSES = [
  { tag: "Work", detail: "H-187 , Sector 63" },
  { tag: "Home", detail: "Flat 4B, Sunrise Apartments, Sector 50" },
];

export function getInitialCart() {
  if (typeof window === "undefined") {
    return { items: [{ ...DEFAULT_ITEM }], days: 7, date: DATES[0].key };
  }
  try {
    const val = localStorage.getItem(CART_STORAGE_KEY);
    if (val) return JSON.parse(val);
  } catch (e) {
    console.error("Failed to read cart from localStorage:", e);
  }
  return { items: [{ ...DEFAULT_ITEM }], days: 7, date: DATES[0].key };
}

export function saveCart(cart) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("tiffexx:cart-updated", { detail: cart }));
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem("tiffexx_user") || localStorage.getItem(USER_STORAGE_KEY);
    return val ? JSON.parse(val) : null;
  } catch (e) {
    return null;
  }
}

export function saveStoredUser(user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem("tiffexx_user", JSON.stringify(user));
    window.dispatchEvent(new CustomEvent("tiffexx:user-updated", { detail: user }));
    window.dispatchEvent(new Event("tiffexx_auth_change"));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save user:", e);
  }
}

export function calculatePrice(items, days) {
  const perDay = (items || []).reduce((sum, item) => sum + (item.perDay || 0) * (item.qty || 0), 0);
  const plan = PLANS.find((p) => p.days === days) || PLANS[0];
  const base = perDay * (days || 7);
  const discount = (base * plan.discount) / 100;
  const tax = Math.round((base - discount) * 0.0388 * 100) / 100;
  const total = base - discount + tax;

  return {
    perDay,
    base,
    discount,
    tax,
    total,
  };
}

export function formatInr(num) {
  return "₹ " + Number(num || 0).toFixed(2);
}
