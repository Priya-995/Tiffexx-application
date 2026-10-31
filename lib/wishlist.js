"use client";

import { useState, useEffect, useCallback } from "react";

export const WISHLIST_STORAGE_KEY = "tiffexx.wishlist";

// Master static catalog of meals & plans available across the app
export const MASTER_MEALS = [
  {
    id: "1",
    name: "Dal Tadka Thali",
    desc: "Dal · Roti × 3 · Rice · Sabzi · Pickle · Sweet",
    price: 99,
    veg: true,
    meal: "lunch",
    tag: "Lunch",
    kitchen: "Amma's Kitchen",
    rating: 4.6,
    img: "/assets/thali.png",
    link: "/partner-listing",
  },
  {
    id: "2",
    name: "Paneer Butter Masala Thali",
    desc: "Paneer Curry · Roti × 3 · Jeera Rice · Raita · Sweet",
    price: 139,
    veg: true,
    meal: "dinner",
    tag: "Dinner",
    kitchen: "Amma's Kitchen",
    rating: 4.8,
    img: "/assets/thali.png",
    link: "/partner-listing",
  },
  {
    id: "3",
    name: "Rajma Masala Thali",
    desc: "Special Rajma · Steamed Rice · Roti × 2 · Salad · Papad",
    price: 119,
    veg: true,
    meal: "lunch",
    tag: "Lunch",
    kitchen: "Amma's Kitchen",
    rating: 4.7,
    img: "/assets/thali.png",
    link: "/partner-listing",
  },
  {
    id: "4",
    name: "Aloo Parantha Breakfast Box",
    desc: "Aloo Parantha × 2 · Fresh Curd · Mint Chutney · Pickle",
    price: 79,
    veg: true,
    meal: "breakfast",
    tag: "Breakfast",
    kitchen: "Amma's Kitchen",
    rating: 4.5,
    img: "/assets/thali.png",
    link: "/partner-listing",
  },
  {
    id: "meal-aloo-parantha",
    name: "Aloo Parantha + Dahi",
    desc: "Crispy whole wheat flatbreads with spiced potato mash and fresh curd",
    price: 35,
    veg: true,
    meal: "breakfast",
    tag: "Breakfast",
    kitchen: "Ghar Ka Swaad",
    rating: 4.4,
    img: "/assets/kitchen-cover.png",
    link: "/partner-listing",
  },
  {
    id: "meal-dal-makhani",
    name: "Dal Makhani + Naan",
    desc: "Slow-cooked creamy black lentils paired with freshly baked butter garlic naan",
    price: 65,
    veg: true,
    meal: "lunch",
    tag: "Lunch",
    kitchen: "Punjab Rasoi",
    rating: 4.7,
    img: "/assets/meal-lunch.png",
    link: "/partner-listing",
  },
  {
    id: "meal-butter-chicken",
    name: "Butter Chicken + Rice",
    desc: "Tender tandoori chicken simmered in rich makhani gravy served with basmati rice",
    price: 120,
    veg: false,
    meal: "dinner",
    tag: "Dinner",
    kitchen: "Meena's Tiffin",
    rating: 4.6,
    img: "/assets/meal-dinner.png",
    link: "/partner-listing",
  },
  {
    id: "meal-thali-special",
    name: "Thali Special",
    desc: "Paneer butter masala, yellow dal fry, 3 rotis, jeera rice, salad & gulab jamun",
    price: 85,
    veg: true,
    meal: "lunch",
    tag: "Lunch",
    kitchen: "Annapurna Cloud Kitchen",
    rating: 4.8,
    img: "/assets/dish-thali.png",
    link: "/partner-listing",
  },
  {
    id: "plan-0",
    name: "Ananya's Kitchen Monthly Tiffin",
    desc: "Top rated · Monthly · 30 meals",
    price: 89,
    oldPrice: "₹109",
    veg: true,
    meal: "lunch",
    tag: "Plan",
    kitchen: "Ananya's Kitchen",
    rating: 4.8,
    img: "/assets/plan-food.png",
    link: "/partner-listing",
  },
  {
    id: "plan-1",
    name: "Ananya's Kitchen Monthly Tiffin",
    desc: "Top rated · Monthly · 30 meals",
    price: 89,
    oldPrice: "₹109",
    veg: true,
    meal: "lunch",
    tag: "Plan",
    kitchen: "Ananya's Kitchen",
    rating: 4.8,
    img: "/assets/plan-food.png",
    link: "/partner-listing",
  },
  {
    id: "plan-2",
    name: "Ananya's Kitchen Monthly Tiffin",
    desc: "Top rated · Monthly · 30 meals",
    price: 89,
    oldPrice: "₹109",
    veg: true,
    meal: "lunch",
    tag: "Plan",
    kitchen: "Ananya's Kitchen",
    rating: 4.8,
    img: "/assets/plan-food.png",
    link: "/partner-listing",
  },
  {
    id: "plan-3",
    name: "Ananya's Kitchen Monthly Tiffin",
    desc: "Top rated · Monthly · 30 meals",
    price: 89,
    oldPrice: "₹109",
    veg: true,
    meal: "lunch",
    tag: "Plan",
    kitchen: "Ananya's Kitchen",
    rating: 4.8,
    img: "/assets/plan-food.png",
    link: "/partner-listing",
  },
  {
    id: "plan-4",
    name: "Ananya's Kitchen Monthly Tiffin",
    desc: "Top rated · Monthly · 30 meals",
    price: 89,
    oldPrice: "₹109",
    veg: true,
    meal: "lunch",
    tag: "Plan",
    kitchen: "Ananya's Kitchen",
    rating: 4.8,
    img: "/assets/plan-food.png",
    link: "/partner-listing",
  },
  {
    id: "sub-plan-veg-1",
    name: "Veg Lunch Plan (30 Days)",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    desc: "Special Thali (Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    oldPrice: "₹109",
    rating: "4.2",
    veg: true,
    tag: "Plan",
    badge: "Top Rated",
    mealType: "Lunch",
    img: "/assets/sub-plan.png",
    link: "/partner-listing",
  },
  {
    id: "sub-plan-nonveg-1",
    name: "Non - Veg Lunch Plan (30 Days)",
    title: "Non - Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    desc: "Special Thali (Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    oldPrice: "₹109",
    rating: "4.2",
    veg: false,
    tag: "Plan",
    badge: "Top Rated",
    mealType: "Lunch",
    img: "/assets/sub-plan.png",
    link: "/partner-listing",
  },
  {
    id: "sub-plan-veg-2",
    name: "Veg Lunch Plan (30 Days)",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    desc: "Special Thali (Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    oldPrice: "₹109",
    rating: "4.2",
    veg: true,
    tag: "Plan",
    badge: "Top Rated",
    mealType: "Lunch",
    img: "/assets/sub-plan.png",
    link: "/partner-listing",
  },
  {
    id: "sub-plan-nonveg-2",
    name: "Non - Veg Lunch Plan (30 Days)",
    title: "Non - Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    desc: "Special Thali (Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    oldPrice: "₹109",
    rating: "4.2",
    veg: false,
    tag: "Plan",
    badge: "Top Rated",
    mealType: "Lunch",
    img: "/assets/sub-plan.png",
    link: "/partner-listing",
  },
  {
    id: "sub-plan-veg-3",
    name: "Veg Lunch Plan (30 Days)",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    desc: "Special Thali (Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    oldPrice: "₹109",
    rating: "4.2",
    veg: true,
    tag: "Plan",
    badge: "Top Rated",
    mealType: "Lunch",
    img: "/assets/sub-plan.png",
    link: "/partner-listing",
  },
];

/**
 * Lookup meal object by ID or name from static master catalog.
 */
export function getMealById(id) {
  if (id === null || id === undefined) return null;
  const strId = String(id);
  const found = MASTER_MEALS.find((m) => String(m.id) === strId);
  if (found) return found;

  return (
    MASTER_MEALS.find((m) => m.name.toLowerCase() === strId.toLowerCase()) || null
  );
}

/**
 * Normalizes any stored item or raw ID into a complete meal object.
 */
export function normalizeMealItem(raw) {
  if (!raw) return null;

  if (typeof raw === "object") {
    const id = String(raw.id !== undefined ? raw.id : raw.name || "");
    const fallback = getMealById(id) || {};
    return {
      id,
      name: raw.name || raw.title || fallback.name || fallback.title || "Special Meal",
      title: raw.title || raw.name || fallback.title || fallback.name || "Special Meal",
      kitchen: raw.kitchen || fallback.kitchen || "Perfect Kitchen",
      desc: raw.desc || fallback.desc || "Special Thali (Dali ,Sabji & 4 Roti )",
      descBold: raw.descBold || fallback.descBold || "Special Thali  ",
      descLight: raw.descLight || fallback.descLight || "(Dali ,Sabji & 4 Roti )",
      price: raw.price !== undefined ? raw.price : fallback.price || 89,
      wasPrice: raw.wasPrice || raw.oldPrice || fallback.wasPrice || fallback.oldPrice || 109,
      oldPrice: raw.oldPrice || raw.wasPrice || fallback.oldPrice || fallback.wasPrice || 109,
      veg: raw.veg !== undefined ? raw.veg : fallback.veg !== undefined ? fallback.veg : true,
      meal: raw.meal || fallback.meal || "lunch",
      tag: raw.tag || fallback.tag || "Plan",
      badge: raw.badge || fallback.badge || "Top Rated",
      mealType: raw.mealType || fallback.mealType || "Lunch",
      rating: raw.rating || fallback.rating || "4.2",
      img: raw.img || fallback.img || "/assets/sub-plan.png",
      link: raw.link || fallback.link || "/partner-listing",
      ...raw,
    };
  }

  // Primitive ID
  const fallback = getMealById(raw);
  if (fallback) return { ...fallback, id: String(fallback.id) };

  // Fallback if not found in catalog
  return {
    id: String(raw),
    name: "Veg Lunch Plan (30 Days)",
    title: "Veg Lunch Plan (30 Days)",
    kitchen: "Perfect Kitchen",
    desc: "Special Thali (Dali ,Sabji & 4 Roti )",
    descBold: "Special Thali  ",
    descLight: "(Dali ,Sabji & 4 Roti )",
    price: 89,
    wasPrice: 109,
    oldPrice: 109,
    veg: true,
    meal: "lunch",
    tag: "Plan",
    badge: "Top Rated",
    mealType: "Lunch",
    rating: "4.2",
    img: "/assets/sub-plan.png",
    link: "/partner-listing",
  };
}

/**
 * Safely parse raw wishlist items from localStorage.
 * Returns array of normalized meal objects.
 */
export function getStoredWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const map = new Map();
    for (const entry of parsed) {
      const normalized = normalizeMealItem(entry);
      if (normalized && normalized.id && !map.has(normalized.id)) {
        map.set(normalized.id, normalized);
      }
    }
    return Array.from(map.values());
  } catch (err) {
    console.error("Failed to read wishlist from localStorage:", err);
    return [];
  }
}

/**
 * Returns array of string IDs currently in wishlist.
 */
export function getStoredWishlistIds() {
  return getStoredWishlist().map((item) => String(item.id));
}

/**
 * Writes array of items to localStorage and dispatches sync events.
 */
export function saveStoredWishlist(items) {
  if (typeof window === "undefined") return;
  try {
    const map = new Map();
    for (const item of items) {
      const normalized = normalizeMealItem(item);
      if (normalized && normalized.id && !map.has(normalized.id)) {
        map.set(normalized.id, normalized);
      }
    }
    const cleanList = Array.from(map.values());
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(cleanList));
    window.dispatchEvent(new CustomEvent("tiffexx:wishlist-updated", { detail: cleanList }));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Failed to save wishlist to localStorage:", err);
  }
}

/**
 * Backwards compatible alias for saving array of IDs or items.
 */
export function saveStoredWishlistIds(idsOrItems) {
  saveStoredWishlist(idsOrItems);
}

/**
 * Get full meal objects for all stored wishlist items.
 */
export function getWishlistItems() {
  return getStoredWishlist();
}

/**
 * Check if a meal ID is currently saved in wishlist.
 */
export function isItemInWishlist(itemOrId) {
  if (!itemOrId) return false;
  const targetId =
    typeof itemOrId === "object" && itemOrId !== null
      ? String(itemOrId.id !== undefined ? itemOrId.id : itemOrId.name || "")
      : String(itemOrId);
  const ids = getStoredWishlistIds();
  return ids.includes(targetId);
}

/**
 * Add a meal/plan to the wishlist.
 */
export function addToWishlist(itemOrId) {
  if (!itemOrId) return;
  const normalized = normalizeMealItem(itemOrId);
  if (!normalized || !normalized.id) return;

  const current = getStoredWishlist();
  if (!current.some((x) => String(x.id) === String(normalized.id))) {
    saveStoredWishlist([...current, normalized]);
  }
}

/**
 * Remove a meal/plan from the wishlist by ID or object.
 */
export function removeFromWishlist(itemOrId) {
  if (!itemOrId) return;
  const targetId =
    typeof itemOrId === "object" && itemOrId !== null
      ? String(itemOrId.id !== undefined ? itemOrId.id : itemOrId.name || "")
      : String(itemOrId);

  const current = getStoredWishlist();
  const next = current.filter((x) => String(x.id) !== targetId);
  saveStoredWishlist(next);
}

/**
 * Toggle a meal/plan in the wishlist. Returns boolean: true if added, false if removed.
 */
export function toggleWishlist(itemOrId) {
  if (!itemOrId) return false;
  const targetId =
    typeof itemOrId === "object" && itemOrId !== null
      ? String(itemOrId.id !== undefined ? itemOrId.id : itemOrId.name || "")
      : String(itemOrId);

  const exists = isItemInWishlist(targetId);
  if (exists) {
    removeFromWishlist(targetId);
    return false;
  } else {
    addToWishlist(itemOrId);
    return true;
  }
}

/**
 * React hook to synchronize wishlist state reactively across all components and pages.
 */
export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const sync = useCallback(() => {
    const items = getStoredWishlist();
    setWishlistItems(items);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    sync();

    const handleUpdate = () => sync();
    window.addEventListener("tiffexx:wishlist-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("tiffexx:wishlist-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [sync]);

  const isInWishlistCheck = useCallback(
    (itemOrId) => {
      if (!itemOrId) return false;
      const targetId =
        typeof itemOrId === "object" && itemOrId !== null
          ? String(itemOrId.id !== undefined ? itemOrId.id : itemOrId.name || "")
          : String(itemOrId);
      return wishlistItems.some((x) => String(x.id) === targetId);
    },
    [wishlistItems]
  );

  return {
    wishlistItems,
    wishlistIds: wishlistItems.map((x) => String(x.id)),
    count: wishlistItems.length,
    isLoaded,
    isInWishlist: isInWishlistCheck,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
  };
}
