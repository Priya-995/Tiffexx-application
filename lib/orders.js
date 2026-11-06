// Central order history store and reorder helpers

export const ORDERS_STORAGE_KEY = "tiffexx.orders";

export const DEFAULT_ORDERS = [
  {
    id: "TX-10501",
    name: "Paneer Thali × 1",
    kitchen: "Amma's Kitchen",
    cuisine: "South Indian",
    dish: "Paneer Thali",
    date: "28 Oct 2026, 12:05 pm",
    status: "transit",
    statusText: "Out for delivery",
    price: 89,
    total: "₹129",
    rating: "4.6",
    isDay: false,
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
    kitchen: "Amma's Kitchen",
    cuisine: "South Indian",
    dish: "Home-style Veg Thali",
    date: "27 Oct 2026, 12:10 pm",
    status: "delivered",
    statusText: "Delivered",
    price: 89,
    total: "₹129",
    rating: "4.6",
    isDay: true,
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
    cuisine: "North Indian",
    dish: "Kadhi Chawal Box",
    date: "26 Oct 2026, 12:20 pm",
    status: "delivered",
    statusText: "Delivered",
    price: 99,
    total: "₹129",
    rating: "4.6",
    isDay: false,
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
    kitchen: "Mom's Flavour",
    cuisine: "North Indian",
    dish: "Dal Tadka Combo",
    date: "25 Oct 2026, 12:00 pm",
    status: "delivered",
    statusText: "Delivered",
    price: 99,
    total: "₹129",
    rating: "4.6",
    isDay: false,
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
    cuisine: "North Indian",
    dish: "Rajma Chawal Box",
    date: "18 Oct 2026, 11:45 am",
    status: "cancelled",
    statusText: "Cancelled",
    price: 99,
    total: "₹99",
    rating: "4.6",
    isDay: false,
    details: {
      items: "Order cancelled by customer before kitchen preparation.",
      subtotal: "₹99",
      delivery: "₹0",
      payment: "Refunded to Tiffexx Wallet",
    },
    actions: ["reorder-outline", "refund"],
  },
  {
    id: "TX-10211",
    name: "Regular Thali × 1",
    kitchen: "Ananya's Kitchen",
    cuisine: "South Indian",
    dish: "Regular Thali",
    date: "15 Oct 2026, 1:00 pm",
    status: "delivered",
    statusText: "Delivered",
    price: 89,
    total: "₹89",
    rating: "4.6",
    isDay: false,
    details: {
      items: "2× Porotta / 4 Phulka, Sambar, Avial, Steamed Rice, Payasam",
      subtotal: "₹89",
      delivery: "₹0",
      payment: "Paid via UPI",
    },
    actions: ["reorder", "help"],
  },
  {
    id: "TX-10185",
    name: "Dahi Bhalla × 1",
    kitchen: "Meena's Tiffin",
    cuisine: "North Indian",
    dish: "Dahi Bhalla",
    date: "12 Oct 2026, 7:30 pm",
    status: "delivered",
    statusText: "Delivered",
    price: 99,
    total: "₹99",
    rating: "4.6",
    isDay: false,
    details: {
      items: "2 Pcs Dahi Bhalla with sweet tamarind & mint chutney",
      subtotal: "₹99",
      delivery: "₹0",
      payment: "Paid via Tiffexx Wallet",
    },
    actions: ["reorder", "help"],
  },
  {
    id: "TX-10150",
    name: "Deluxe Thali × 1",
    kitchen: "Meena's Tiffin",
    cuisine: "North Indian",
    dish: "Deluxe Thali",
    date: "10 Oct 2026, 12:45 pm",
    status: "delivered",
    statusText: "Delivered",
    price: 99,
    total: "₹99",
    rating: "4.6",
    isDay: false,
    details: {
      items: "Paneer Butter Masala, Dal Makhani, 4 Phulkas, Jeera Rice, Gulab Jamun",
      subtotal: "₹99",
      delivery: "₹0",
      payment: "Paid via UPI",
    },
    actions: ["reorder", "help"],
  },
];

/**
 * Get reorder cards based on what authenticated user previously ordered
 */
export function getUserReorderPicks() {
  if (typeof window === "undefined") return [];

  const picks = [];
  const seenKeys = new Set();

  // 1. Check custom orders placed in localStorage
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) {
        stored.forEach((order, orderIdx) => {
          if (Array.isArray(order.items)) {
            order.items.forEach((it, itIdx) => {
              const kitchen = it.kitchen || order.kitchen || "Amma's Kitchen";
              const dish = it.name || it.dish || "Special Thali";
              const key = `${kitchen.toLowerCase()}_${dish.toLowerCase()}`;
              if (!seenKeys.has(key)) {
                seenKeys.add(key);
                picks.push({
                  id: `order-item-${orderIdx}-${itIdx}`,
                  kitchen,
                  cuisine: it.tag === "South Indian" ? "South Indian" : "North Indian",
                  dish,
                  price: it.perDay || it.price || 89,
                  rating: "4.6",
                  isDay: !!it.sub?.toLowerCase().includes("monthly") || !!it.sub?.toLowerCase().includes("weekly"),
                  img: "/assets/popular-bg.png",
                });
              }
            });
          }
        });
      }
    }
  } catch (e) {
    console.error("Failed to parse orders from localStorage:", e);
  }

  // 2. Add preset past orders from user's order history
  DEFAULT_ORDERS.forEach((ord) => {
    const key = `${ord.kitchen.toLowerCase()}_${ord.dish.toLowerCase()}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      picks.push({
        id: ord.id,
        kitchen: ord.kitchen,
        cuisine: ord.cuisine || "North Indian",
        dish: ord.dish,
        price: ord.price || 99,
        rating: ord.rating || "4.6",
        isDay: !!ord.isDay,
        img: "/assets/popular-bg.png",
      });
    }
  });

  return picks;
}

export function getAllUserOrders() {
  if (typeof window === "undefined") return DEFAULT_ORDERS;

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored) && stored.length > 0) {
        return [...stored, ...DEFAULT_ORDERS];
      }
    }
  } catch (e) {}

  return DEFAULT_ORDERS;
}

