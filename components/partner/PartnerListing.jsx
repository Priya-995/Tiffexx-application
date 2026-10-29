"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getInitialCart, saveCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import s from "./PartnerListing.module.css";

const CUISINES = [
  { name: "South Indian", img: "/assets/cuisine-1.png", fit: "contain" },
  { name: "North Indian", img: "/assets/cuisine-2.png" },
  { name: "Chinese", img: "/assets/cuisine-3.png" },
  { name: "Gujarati", img: "/assets/cuisine-4.png" },
  { name: "Continental", img: "/assets/cuisine-5.png" },
  { name: "Bengali", img: "/assets/cuisine-6.png" },
];

const INITIAL_MENU = [
  {
    id: 1,
    name: "Dal Tadka Thali",
    desc: "Dal · Roti × 3 · Rice · Sabzi · Pickle · Sweet",
    price: 99,
    veg: true,
    meal: "lunch",
    img: "/assets/thali.png",
  },
  {
    id: 2,
    name: "Paneer Butter Masala Thali",
    desc: "Paneer Curry · Roti × 3 · Jeera Rice · Raita · Sweet",
    price: 139,
    veg: true,
    meal: "dinner",
    img: "/assets/thali.png",
  },
  {
    id: 3,
    name: "Rajma Masala Thali",
    desc: "Special Rajma · Steamed Rice · Roti × 2 · Salad · Papad",
    price: 119,
    veg: true,
    meal: "lunch",
    img: "/assets/thali.png",
  },
  {
    id: 4,
    name: "Aloo Parantha Breakfast Box",
    desc: "Aloo Parantha × 2 · Fresh Curd · Mint Chutney · Pickle",
    price: 79,
    veg: true,
    meal: "breakfast",
    img: "/assets/thali.png",
  },
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Akshay Kohli",
    when: "26 minutes ago",
    stars: "★★★★★",
    text: "Authentic home-style taste! The Dal Tadka is comforting, not oily at all, and the rotis arrived piping hot and soft. Highly recommended for daily tiffin subscriptions.",
    likes: 12400,
    comments: "1.2k",
    saves: "450",
  },
  {
    id: 2,
    name: "Sneha Kapur",
    when: "2 hours ago",
    stars: "★★★★★",
    text: "Clean, consistent, and feels like mother's cooking. The portion size is very generous and billing through Tiffexx wallet makes renewal super hassle-free.",
    likes: 8900,
    comments: "820",
    saves: "310",
  },
  {
    id: 3,
    name: "Priya Sharma",
    when: "Yesterday",
    stars: "★★★★★",
    text: "The thali is always fresh, balanced spices, and delivered on the dot every lunch break at 12:45 PM. Have subscribed for the whole month!",
    likes: 5600,
    comments: "340",
    saves: "190",
  },
];

export default function PartnerListing() {
  const { isLoggedIn } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(true);
  const [sortOrder, setSortOrder] = useState("Popular");
  const [heroDot, setHeroDot] = useState(0);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [likedMap, setLikedMap] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleToggleWishlist = (item) => {
    const isNowSaved = toggleWishlist(item);
    showToast(
      isNowSaved
        ? `✓ Saved "${item.name}" to Wishlist!`
        : `Removed "${item.name}" from Wishlist`
    );
  };

  const handleAddToCart = (item) => {
    const currentCart = getInitialCart();
    const items = [...(currentCart.items || [])];
    const existingIndex = items.findIndex((x) => x.id === item.id || x.name === item.name);
    if (existingIndex > -1) {
      items[existingIndex].qty = Math.min((items[existingIndex].qty || 1) + 1, 9);
    } else {
      items.push({
        id: item.id,
        name: item.name,
        tag: item.meal === "dinner" ? "Dinner" : item.meal === "breakfast" ? "Breakfast" : "Lunch",
        sub: item.desc || "Daily home-style meal",
        perDay: item.price,
        qty: 1,
        kitchen: "Amma's Kitchen",
        liked: false,
      });
    }
    const updated = { ...currentCart, items };
    saveCart(updated);
    showToast(`✓ Added ${item.name} to cart!`);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("AMMA20");
    }
    showToast("Promo code AMMA20 copied to clipboard!");
  };

  const handleLikeReview = (id) => {
    const isLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, likes: r.likes + (isLiked ? -1 : 1) } : r
      )
    );
  };

  const toggleSort = () => {
    if (sortOrder === "Popular") setSortOrder("Price: Low to High");
    else if (sortOrder === "Price: Low to High") setSortOrder("Rating: High to Low");
    else setSortOrder("Popular");
  };

  // Filtered menu
  const filteredMenu = INITIAL_MENU.filter((item) => {
    if (vegOnly && !item.veg) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className={s.page}>
      <main className={s.main}>
        {/* Breadcrumb Navigation */}
        <nav className={s.crumbs} aria-label="Breadcrumb">
          <Link href="/" className={s.crumbs__link}>
            Home
          </Link>
          <span className={s.crumbs__sep}>/</span>
          <Link href="/kitchens" className={s.crumbs__link}>
            Noida
          </Link>
          <span className={s.crumbs__sep}>/</span>
          <span className={s.crumbs__current}>Amma&apos;s Kitchen</span>
        </nav>

        <div className={s.section}>
          {/* Hero Banner */}
          <div className={s.hero}>
            <div className={s.hero__img}>
              <img src="/assets/hero.png" alt="Amma's Kitchen banner" />
            </div>
            <div className={s.hero__overlay}></div>

            {/* Ratings & Verified Chips */}
            <div className={s.hero__ratings}>
              <div className={s.chip}>
                <div className={s.chip__verified}>
                  <div className={s.chip__check}>
                    <img className={s.fill} src="/assets/icon-check-circle.svg" alt="" />
                  </div>
                  <span className={s.chip__verified_t}>Verified</span>
                </div>
              </div>
              <div className={`${s.chip} ${s["chip--rating"]}`}>
                <span className={s.chip__star}>★</span>
                <span className={s.chip__score}>4.6</span>
                <span className={s.chip__label}>Food</span>
              </div>
              <div className={`${s.chip} ${s["chip--rating"]}`}>
                <span className={s.chip__star}>★</span>
                <span className={s.chip__score}>4.4</span>
                <span className={s.chip__label}>Delivery</span>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className={s.hero__dots}>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`${s.hero__dot} ${heroDot === idx ? s["hero__dot--active"] : ""}`}
                  onClick={() => setHeroDot(idx)}
                />
              ))}
            </div>

            {/* Hero Text */}
            <div className={s.hero__text}>
              <p className={s.hero__eyebrow}>HOME-STYLE · NORTH INDIAN THALI</p>
              <h1 className={s.hero__title}>Amma&apos;s Kitchen</h1>
              <p className={s.hero__meta}>
                📍 Freshly prepared daily · 👝 Wallet billing supported · 🏠 Home kitchen
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={s.stats}>
            <div className={s.stat}>
              <span className={s.stat__emoji}>⭐</span>
              <div>
                <div className={s.stat__label}>RATING</div>
                <div className={s.stat__value}>4.6 (12k+)</div>
              </div>
            </div>
            <div className={s.stat}>
              <span className={s.stat__emoji}>🍽</span>
              <div>
                <div className={s.stat__label}>AVG. PRICE</div>
                <div className={s.stat__value}>₹120 / thali</div>
              </div>
            </div>
            <div className={s.stat}>
              <span className={s.stat__emoji}>⏱</span>
              <div>
                <div className={s.stat__label}>DELIVERY</div>
                <div className={s.stat__value}>25–35 min</div>
              </div>
            </div>
            <div className={s.stat}>
              <span className={s.stat__emoji}>🧾</span>
              <div>
                <div className={s.stat__label}>ORDERS</div>
                <div className={s.stat__value}>250+ completed</div>
              </div>
            </div>
            <div className={s.stat}>
              <span className={s.stat__emoji}>🪪</span>
              <div>
                <div className={s.stat__label}>FSSAI</div>
                <div className={s.stat__value}>12345678</div>
              </div>
            </div>
            <div className={s.stat}>
              <span className={s.stat__emoji}>📍</span>
              <div>
                <div className={s.stat__label}>ADDRESS</div>
                <div className={s.stat__value}>Malviya Nagar, Noida</div>
              </div>
            </div>
          </div>

          {/* Loyalty & Promo Row */}
          <div className={s.offers}>
            <div className={s.loyalty}>
              <div className={s.loyalty__head}>
                <span className={s.loyalty__emoji}>🏆</span>
                <div>
                  <div className={s.loyalty__title}>Loyalty Card</div>
                  <div className={s.loyalty__sub}>Earn a stamp with every order</div>
                </div>
              </div>
              <div className={s.loyalty__stamps}>
                <div className={`${s.stamp} ${s["stamp--done"]}`}>✓</div>
                <div className={`${s.stamp} ${s["stamp--done"]}`}>✓</div>
                <div className={`${s.stamp} ${s["stamp--done"]}`}>✓</div>
                <div className={`${s.stamp} ${s["stamp--todo"]}`}>4</div>
                <div className={`${s.stamp} ${s["stamp--todo"]}`}>5</div>
                <div className={`${s.stamp} ${s["stamp--todo"]}`}>6</div>
                <div className={`${s.stamp} ${s["stamp--todo"]}`}>🎁</div>
              </div>
              <p className={s.loyalty__note}>3 of 8 stamps · 5 more for a free meal</p>
            </div>

            <div className={s.promo}>
              <div className={s.promo__text}>
                <div className={s.promo__code}>Use code AMMA20</div>
                <div className={s.promo__desc}>Get 20% off, first-time subscribers only</div>
                <div className={s.promo__exp}>Expires 31 Aug 2026</div>
              </div>
              <button
                className={s.promo__btn}
                type="button"
                onClick={handleCopyCode}
              >
                Copy Code
              </button>
            </div>
          </div>

          {/* Shop by Cuisine */}
          <section className={s.cuisines}>
            <div className={s.cuisines__head}>
              <h2 className={s.cuisines__title}>Shop by cuisine</h2>
            </div>
            <div className={s.cuisines__list}>
              {CUISINES.map((c) => (
                <button
                  key={c.name}
                  className={s.cuisine}
                  type="button"
                  onClick={() => {
                    setSearchQuery(c.name);
                    showToast(`Filtering for ${c.name} dishes`);
                  }}
                >
                  <div className={s.cuisine__img}>
                    <img
                      className={c.fit === "contain" ? s.fillContain : s.fillCover}
                      src={c.img}
                      alt={c.name}
                    />
                  </div>
                  <span className={s.cuisine__name}>{c.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Controls: Tabs, Search, Veg toggle, Sort */}
          <div className={s.controls}>
            <div className={s.tabs}>
              <button
                className={`${s.tab} ${activeTab === "breakfast" ? s["tab--active"] : ""}`}
                type="button"
                onClick={() => setActiveTab("breakfast")}
              >
                <div className={`${s.tab__icon} ${s["tab__icon--sun"]}`}>
                  <img className={s.tab__sun} src="/assets/icon-sun.svg" alt="" />
                </div>
                <div className={s.tab__text}>
                  <p className={s.tab__title}>Breakfast</p>
                  <p className={s.tab__sub}>Closes 10:30 AM</p>
                </div>
              </button>

              <button
                className={`${s.tab} ${activeTab === "lunch" ? s["tab--active"] : ""}`}
                type="button"
                onClick={() => setActiveTab("lunch")}
              >
                <div className={s.tab__icon}>
                  <img className={`${s.fill} ${s.fillCover}`} src="/assets/meal-lunch.png" alt="" />
                </div>
                <div className={s.tab__text}>
                  <p className={s.tab__title}>Lunch</p>
                  <p className={s.tab__sub}>Closes 12:45 PM</p>
                </div>
              </button>

              <button
                className={`${s.tab} ${activeTab === "dinner" ? s["tab--active"] : ""}`}
                type="button"
                onClick={() => setActiveTab("dinner")}
              >
                <div className={s.tab__icon}>
                  <img className={`${s.fill} ${s.fillCover}`} src="/assets/meal-dinner.png" alt="" />
                </div>
                <div className={s.tab__text}>
                  <p className={s.tab__title}>Dinner</p>
                  <p className={s.tab__sub}>Opens 6:00 PM</p>
                </div>
              </button>
            </div>

            {/* In-page search */}
            <div className={s.search}>
              <img className={s.search__icon} src="/assets/icon-search.svg" alt="" />
              <div className={s.search__input}>
                <input
                  className={s.search__field}
                  type="text"
                  placeholder="Search tiffin, kitchen, cuisine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className={s.search__sep} />
                <button
                  type="button"
                  className={s.search__mic}
                  aria-label="Voice search"
                  onClick={() => showToast("Listening for meal search...")}
                >
                  <img className={s.fill} src="/assets/icon-mic.svg" alt="" />
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className={s.toggles}>
              <div
                className={s.veg}
                role="button"
                tabIndex={0}
                onClick={() => setVegOnly(!vegOnly)}
              >
                <span className={s.veg__label}>Veg only</span>
                <div
                  className={`${s.veg__switch} ${vegOnly ? s["veg__switch--on"] : s["veg__switch--off"]}`}
                >
                  <div className={s.veg__knob} />
                </div>
              </div>

              <div
                className={s.sort}
                role="button"
                tabIndex={0}
                onClick={toggleSort}
              >
                <span className={s.sort__label}>Sort: {sortOrder}</span>
              </div>
            </div>
          </div>

          {/* Thali / Menu Section */}
          <div className={s.thali}>
            <div className={s.thali__label}>
              <div className={s.thali__label_left}>
                <img className={s.thali__layers} src="/assets/icon-layers.svg" alt="" />
                <span className={s.thali__label_text}>North Indian Thali · Rotating daily menu</span>
              </div>
              <div className={s.badge_available}>
                <span className={s.badge_available__dot} />
                <span className={s.badge_available__text}>Available</span>
              </div>
            </div>

            <div className={s.menu_head}>
              <h2 className={s.menu_head__title}>Menu</h2>
              <button
                type="button"
                className={s.menu_head__link}
                onClick={() => setSearchQuery("")}
              >
                View All
              </button>
            </div>

            <div className={s.menu_row}>
              {filteredMenu.map((item) => (
                <article key={item.id} className={s.menu_card}>
                  <div className={s.menu_card__main}>
                    <div className={s.menu_card__img}>
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className={s.menu_card__details}>
                      <p className={s.menu_card__name}>{item.name}</p>
                      <p className={s.menu_card__desc}>{item.desc}</p>
                      <div className={s.menu_card__price_row}>
                        <span className={s.menu_card__price}>₹{item.price}</span>
                        <div className={s.veg_badge}>
                          <div className={s.veg_badge__in}>
                            <img className={s.veg_badge__leaf} src="/assets/icon-leaf.svg" alt="" />
                            <span className={s.veg_badge__text}>Veg</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={s.menu_card__add}
                          onClick={() => handleAddToCart(item)}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`${s.menu_card__heart} ${isInWishlist(item.id) ? s["menu_card__heart--active"] : ""}`}
                    onClick={() => handleToggleWishlist(item)}
                    aria-label={isInWishlist(item.id) ? `Remove ${item.name} from wishlist` : `Save ${item.name} to wishlist`}
                    title={isInWishlist(item.id) ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={isInWishlist(item.id) ? "#c0522f" : "none"}
                      stroke={isInWishlist(item.id) ? "#c0522f" : "#807469"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          </div>

          {/* Ratings & Reviews Section */}
          <section className={s.reviews}>
            <div className={s.reviews__head}>
              <h2 className={s.reviews__title}>Ratings &amp; Reviews</h2>
              <div className={s.reviews__rule} />
            </div>

            {/* Score Summary */}
            <div className={s.summary}>
              <div className={s.summary__score}>
                <p className={s.summary__num}>4.6</p>
                <p className={s.summary__stars}>★★★★★</p>
                <p className={s.summary__count}>128 reviews</p>
              </div>
              <div className={s.bars}>
                <div className={s.bar}>
                  <span className={s.bar__label}>5 ★</span>
                  <div className={s.bar__track}>
                    <div className={s.bar__fill} style={{ width: "74%" }} />
                  </div>
                  <span className={s.bar__pct}>74%</span>
                </div>
                <div className={s.bar}>
                  <span className={s.bar__label}>4 ★</span>
                  <div className={s.bar__track}>
                    <div className={s.bar__fill} style={{ width: "18%" }} />
                  </div>
                  <span className={s.bar__pct}>18%</span>
                </div>
                <div className={s.bar}>
                  <span className={s.bar__label}>3 ★</span>
                  <div className={s.bar__track}>
                    <div className={s.bar__fill} style={{ width: "5%" }} />
                  </div>
                  <span className={s.bar__pct}>5%</span>
                </div>
                <div className={s.bar}>
                  <span className={s.bar__label}>2 ★</span>
                  <div className={s.bar__track}>
                    <div className={s.bar__fill} style={{ width: "2%" }} />
                  </div>
                  <span className={s.bar__pct}>2%</span>
                </div>
                <div className={s.bar}>
                  <span className={s.bar__label}>1 ★</span>
                  <div className={s.bar__track}>
                    <div className={s.bar__fill} style={{ width: "1%" }} />
                  </div>
                  <span className={s.bar__pct}>1%</span>
                </div>
              </div>
            </div>

            {/* Review Cards */}
            <div className={s.review_row}>
              {reviews.map((rev) => (
                <article key={rev.id} className={s.review}>
                  <div className={s.review__body}>
                    <div className={s.review__top}>
                      <div className={s.review__who}>
                        <div className={s.review__avatar}>
                          <img src="/assets/avatar.png" alt={rev.name} />
                        </div>
                        <div className={s.review__who_text}>
                          <p className={s.review__name}>{rev.name}</p>
                          <p className={s.review__when}>{rev.when}</p>
                        </div>
                      </div>
                      <p className={s.review__stars}>{rev.stars}</p>
                    </div>
                    <p className={s.review__text}>{rev.text}</p>
                  </div>

                  <div className={s.review__actions}>
                    <button
                      type="button"
                      className={s.review__action}
                      onClick={() => handleLikeReview(rev.id)}
                    >
                      <img
                        className={s.review__action_ico}
                        src="/assets/icon-review-like.svg"
                        alt=""
                      />
                      <span className={s.review__action_n}>
                        {rev.likes.toLocaleString()}
                      </span>
                    </button>
                    <button type="button" className={s.review__action}>
                      <img
                        className={s.review__action_ico}
                        src="/assets/icon-review-comment.svg"
                        alt=""
                      />
                      <span className={s.review__action_n}>{rev.comments}</span>
                    </button>
                    <button type="button" className={s.review__action}>
                      <img
                        className={s.review__action_ico}
                        src="/assets/icon-review-save.svg"
                        alt=""
                      />
                      <span className={s.review__action_n}>{rev.saves}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className={s.see_all}
              onClick={() => showToast("Showing all 128 verified customer reviews")}
            >
              See all 128 reviews →
            </button>

            {/* Previously Ordered Plans */}
            <section className={s.plans}>
              <div className={s.plans__head}>
                <div className={s.plans__titles}>
                  <h2 className={s.plans__title}>
                    {isLoggedIn ? "Previously Ordered" : "Plans for You"}
                  </h2>
                  <p className={s.plans__sub}>
                    {isLoggedIn
                      ? "Daily tiffin on autopilot, picked from kitchens you've ordered from"
                      : "Daily tiffin on autopilot, freshly curated from top-rated kitchens"}
                  </p>
                </div>
                <Link className={s.plans__all} href="/kitchens">
                  See all →
                </Link>
              </div>

              <div className={s.plans__list}>
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <article key={idx} className={s.plan}>
                    <div className={s.plan__media}>
                      <div className={s.plan__media_bg}>
                        <img src="/assets/plan-bg.png" alt="Ananya's Kitchen" />
                        <div className={s.plan__media_shade} />
                      </div>
                      <span className={s.plan__save}>Save 18%</span>
                    </div>

                    <div className={s.plan__body}>
                      <span className={s.plan__cuisine}>South Indian</span>
                      <h3 className={s.plan__name}>Ananya&apos;s Kitchen</h3>
                      <p className={s.plan__term}>Monthly · 30 meals</p>

                      <div className={s.plan__price}>
                        <span className={s.plan__amount}>₹89</span>
                        <span className={s.plan__per}>/day</span>
                        <span className={s.plan__was}>₹109</span>
                      </div>

                      <Link href="/cart" className={s.plan__cta}>
                        Order Again
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </main>

      {/* Floating notification toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </div>
  );
}
