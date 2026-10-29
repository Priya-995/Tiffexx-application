"use client";

export const WHEEL_SEGMENTS = [
  {
    id: "ten",
    label: "₹10",
    deg: 22.5,
    styleDeg: "22.5deg",
    color: "#ffffff",
    bgColor: "#4a1410",
    type: "cash",
    value: 10,
    title: "₹10 Wallet Cash Won!",
    desc: "₹10 credited straight to your Tiffexx Money balance.",
  },
  {
    id: "again",
    label: "Again",
    deg: 67.5,
    styleDeg: "67.5deg",
    color: "#3a4212",
    bgColor: "#ffc90e",
    type: "again",
    value: 0,
    title: "1 Free Spin Again! 🔄",
    desc: "Lady luck is giving you another instant spin!",
  },
  {
    id: "twenty",
    label: "₹20",
    deg: 112.5,
    styleDeg: "112.5deg",
    color: "#9c3555",
    bgColor: "#f2a8b8",
    type: "cash",
    value: 20,
    title: "₹20 Wallet Cash Won!",
    desc: "₹20 credited straight to your Tiffexx Money balance.",
  },
  {
    id: "free_deal",
    label: "Free Deal",
    deg: 157.5,
    styleDeg: "157.5deg",
    color: "#591a11",
    bgColor: "#ec9e02",
    type: "coupon",
    code: "FREEDEAL",
    value: 45,
    title: "Free Meal Deal Unlocked! 🍱",
    desc: "Use code FREEDEAL on your next lunch or dinner tiffin.",
  },
  {
    id: "five_pct",
    label: "5% Off",
    deg: 202.5,
    styleDeg: "-157.5deg",
    color: "#4a1410",
    bgColor: "#f4e7e5",
    type: "coupon",
    code: "SPIN5OFF",
    value: 35,
    title: "5% Discount Unlocked! 🎟",
    desc: "Use code SPIN5OFF at checkout for 5% instant discount.",
  },
  {
    id: "fifty",
    label: "₹50",
    deg: 247.5,
    styleDeg: "-112.5deg",
    color: "#8a5a10",
    bgColor: "#fbf0dc",
    type: "cash",
    value: 50,
    title: "Jackpot: ₹50 Wallet Cash! 💰",
    desc: "Big win! ₹50 credited straight to your wallet.",
  },
  {
    id: "no_luck",
    label: "No Luck",
    deg: 292.5,
    styleDeg: "-67.5deg",
    color: "#5c5952",
    bgColor: "#e9e5da",
    type: "miss",
    value: 0,
    title: "Better Luck Tomorrow! ✨",
    desc: "Come back tomorrow for another free daily spin.",
  },
  {
    id: "five",
    label: "₹5",
    deg: 337.5,
    styleDeg: "-22.5deg",
    color: "#9c3555",
    bgColor: "#fbe7ec",
    type: "cash",
    value: 5,
    title: "₹5 Wallet Cash Won!",
    desc: "₹5 credited straight to your Tiffexx Money balance.",
  },
];

export const RECENT_WINNERS = [
  { name: "Aarav M.", location: "Noida Sec 62", prize: "₹50 Wallet Cash", time: "2m ago", avatar: "AM", color: "#3c5b43" },
  { name: "Priya S.", location: "Indirapuram", prize: "Free Meal Deal", time: "5m ago", avatar: "PS", color: "#591a11" },
  { name: "Rohit K.", location: "Noida Sec 18", prize: "₹20 Tiffexx Money", time: "9m ago", avatar: "RK", color: "#8a5a10" },
  { name: "Sneha D.", location: "Gaur City", prize: "5% Off Coupon", time: "14m ago", avatar: "SD", color: "#9c3555" },
  { name: "Vikram N.", location: "Sector 75", prize: "₹10 Wallet Cash", time: "18m ago", avatar: "VN", color: "#2f6b3a" },
];

/**
 * Calculates the exact rotation angle needed to land on target segment.
 * Pointer is at top (12 o'clock = 0deg).
 * Conic-gradient starts at 0deg (top) and runs clockwise.
 * Segment at original angle `segDeg` will reach the top pointer when wheel rotates by:
 * `(360 - segDeg) % 360`.
 */
export function calculateTargetRotation(targetSegment, currentRotation = 0, fullTurns = 6) {
  const normDeg = (360 - targetSegment.deg) % 360;
  // Ensure we always add at least `fullTurns` full 360-degree spins forward
  const currentTurnOffset = Math.floor(currentRotation / 360) * 360;
  const targetRotation = currentTurnOffset + 360 * fullTurns + normDeg;
  return targetRotation;
}
