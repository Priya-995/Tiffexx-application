export const plansForYou = Array.from({ length: 5 }, () => ({
  badge: "Top rated",
  kitchen: "Ananya's Kitchen",
  meta: "Monthly · 30 meals",
  price: "₹89",
  oldPrice: "₹109",
}));

export const deals = [
  { kitchen: "Ananya's Kitchen", offer: "30-60% OFF", pills: ["wallet", "heart"] },
  { kitchen: "Ananya's Kitchen", offer: "Upto 50% OFF", pills: ["heart", "wallet"] },
  { kitchen: "Ananya's Kitchen", offer: "Upto 50% OFF", pills: ["heart", "wallet"] },
  { kitchen: "Ananya's Kitchen", offer: "40% OFF", pills: ["heart", "wallet"] },
];

export const pillContent = {
  wallet: { icon: "/assets/icon-wallet.svg", label: "Best value" },
  heart: { icon: "/assets/icon-heart-small.svg", label: "Fan favorite" },
};

export const cuisines = [
  { name: "South Indian", img: "/assets/cuisine-south-indian.png", fit: "contain" },
  { name: "North Indian", img: "/assets/cuisine-north-indian.png" },
  { name: "Chinese", img: "/assets/cuisine-chinese.png" },
  { name: "Gujarati", img: "/assets/cuisine-gujarati.png" },
  { name: "Continental", img: "/assets/cuisine-continental.png" },
  { name: "Bengali", img: "/assets/cuisine-bengali.png" },
];

export const popularPicks = [
  { cuisine: "South Indian", kitchen: "Ananya's Kitchen", meta: "Monthly · 30 meals", price: "₹89", oldPrice: "₹109", save: "Save 18%" },
  { cuisine: "South Indian", kitchen: "Ananya's Kitchen", meta: "Monthly · 30 meals", price: "₹89", oldPrice: "₹109", save: "Save 18%" },
  { cuisine: "North Indian", kitchen: "Meena's Tiffin", meta: "Weekly · 7 meals", price: "₹99", oldPrice: "₹113", save: "Save 12%" },
  { cuisine: "Gujarati", kitchen: "Sundar's Home Kitchen", meta: "Monthly · 30 meals", price: "₹95", oldPrice: "₹119", save: "Save 20%" },
  { cuisine: "North Indian", kitchen: "Meena's Tiffin", meta: "Weekly · 7 meals", price: "₹99", oldPrice: "₹113", save: "Save 12%" },
  { cuisine: "Bengali", kitchen: "Nav's Kitchen", meta: "Weekly · 7 meals", price: "₹110", oldPrice: "₹122", save: "Save 10%" },
];

export const partners = [
  { name: "Amma's Kitchen", veg: true, badge: "Best value", rating: 4.5, cuisine: "South Indian", reviews: 312, price: 99, star: 1 },
  { name: "Punjab Rasoi", veg: false, rating: 4.3, cuisine: "North Indian", reviews: 208, price: 129, star: 1 },
  { name: "Dragon Wok Express", veg: false, closed: true, rating: 4.1, cuisine: "Chinese", reviews: 96, price: 149, star: 1 },
  { name: "Ghar Ka Swaad", veg: true, badge: "Top rated", rating: 4.6, cuisine: "North Indian", reviews: 450, price: 105, star: 1 },
  { name: "Annapurna Cloud Kitchen", veg: true, tint: true, rating: 4.2, cuisine: "Multi-cuisine", reviews: 167, price: 114, star: 2 },
  { name: "Bong Bhoj", veg: false, tint: true, rating: 4.4, cuisine: "Bengali", reviews: 140, price: 135, star: 2 },
  { name: "Gujarat Rasoi", veg: true, tint: true, badge: "New", rating: 4.7, cuisine: "Gujarati", reviews: 58, price: 110, star: 2 },
  { name: "Continental Bites", veg: true, tint: true, rating: 4.1, cuisine: "Continental", reviews: 74, price: 159, star: 2 },
];

export const meals = [
  { name: "Aloo Parantha + Dahi", price: "₹35", img: "/assets/kitchen-cover.png" },
  { name: "Dal Makhani + Naan", price: "₹65", img: "/assets/meal-lunch.png", shade: true },
  { name: "Butter Chicken + Rice", price: "₹120", img: "/assets/meal-dinner.png", shade: true },
  { name: "Butter Chicken + Rice", price: "₹120", img: "/assets/meal-dinner.png", shade: true },
  { name: "Thali Special", price: "₹85", img: "/assets/dish-thali.png" },
];
