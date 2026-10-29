"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./BlogSection.module.css";

const HERO_ARTICLES = {
  1: {
    slug: "meet-amma-koramangala-best-tiffin",
    title: "Meet Amma: The heart behind Koramangala's best tiffin",
    tag: "Kitchen Spotlight",
    date: "Aug 10",
    readTime: "6 min read",
    image: "/assets/hero-photo.png",
    excerpt: "Every morning at 5:00 AM, Amma begins grinding fresh spices and soaking dal for over 180 hot, home-style tiffins across South Bengaluru.",
  },
  2: {
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    title: "How Home Kitchens Are Changing Food Delivery in India",
    tag: "Kitchen Spotlight",
    date: "15th July 2025",
    readTime: "6 min read",
    image: "/assets/hero-photo.png",
    excerpt: "From weekend cooks to full-time tiffin partners — home kitchens on Tiffexx are quietly rewriting what 'food delivery' means in Indian cities.",
  },
  3: {
    slug: "eating-healthy-on-a-budget",
    title: "Eating healthy on a budget with tiffin subscriptions",
    tag: "Nutrition",
    date: "Aug 10",
    readTime: "5 min read",
    image: "/assets/hero-photo.png",
    excerpt: "How subscribing to home-cooked meals saves average professionals up to ₹4,200 each month compared to ad-hoc ordering.",
  },
  4: {
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    title: "The Art of Slow-Cooked Dal: Why Grandma's recipes beat restaurant shortcuts",
    tag: "Heritage Cooking",
    date: "Jul 28",
    readTime: "5 min read",
    image: "/assets/hero-photo.png",
    excerpt: "How our verified home cooks preserve slow-simmering traditions without commercial thickening agents or synthetic food coloring.",
  },
  5: {
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    title: "Nutrition Matters: How daily home meals stabilize energy levels",
    tag: "Wellness & Health",
    date: "Jul 12",
    readTime: "6 min read",
    image: "/assets/hero-photo.png",
    excerpt: "Certified clinical dieticians discuss the long-term metabolic benefits of switching from erratic restaurant ordering to balanced home tiffins.",
  },
};

const LATEST_POSTS_BY_PAGE = {
  1: [
    {
      id: "lp-1",
      slug: "eating-healthy-on-a-budget",
      title: "Eating healthy on a budget with tiffin subscriptions",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-2",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "How home kitchens are changing food delivery in India",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-3",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Why freshly cooked beats frozen every time",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-4",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "The rise of subscription meals in metro cities",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
  ],
  2: [
    {
      id: "lp-5",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "How weekly pause-and-resume is changing daily meal habits",
      meta: "Blog · 4 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-6",
      slug: "eating-healthy-on-a-budget",
      title: "Nutrition breakdown: Home-cooked lentils vs restaurant meals",
      meta: "Blog · 6 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-7",
      slug: "meet-amma-koramangala-best-tiffin",
      title: "Behind the scenes: Morning kitchen routines across 5 cities",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-8",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Custom spice profiles: Catering to diabetic and low-sodium diets",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
  ],
  3: [
    {
      id: "lp-9",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Eco-friendly packaging: Say goodbye to single-use plastic",
      meta: "Blog · 4 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-10",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "The Sunday Special: How regional weekend thalis bring nostalgia home",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-11",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Hygiene checklist: 24 points every Tiffexx kitchen passes",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-12",
      slug: "eating-healthy-on-a-budget",
      title: "Student survival guide: Healthy eating during semester exams",
      meta: "Blog · 4 min read",
      image: "/assets/post-thumb.png",
    },
  ],
  4: [
    {
      id: "lp-13",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Community tiffins: Supporting women micro-entrepreneurs",
      meta: "Blog · 6 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-14",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Busting myths about meal delivery: Is home food really scalable?",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-15",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Mastering the phulka: The science behind perfectly puffed rotis",
      meta: "Blog · 4 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-16",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Morning breakfast subscriptions: Fueling early bird productivity",
      meta: "Blog · 4 min read",
      image: "/assets/post-thumb.png",
    },
  ],
  5: [
    {
      id: "lp-17",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "The culinary map of India: 14 regional thalis on Tiffexx",
      meta: "Blog · 7 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-18",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Corporate wellness: How companies subsidize daily tiffins",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-19",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Seasonal eating: Why winter saag and summer mango kadhi matter",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
    {
      id: "lp-20",
      slug: "how-home-kitchens-are-changing-food-delivery-in-india",
      title: "Customer voices: Real stories from 10,000+ daily subscribers",
      meta: "Blog · 5 min read",
      image: "/assets/post-thumb.png",
    },
  ],
};

const ALL_SPOTLIGHTS = [
  {
    id: "spot-1",
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    image: "/assets/spotlight-thumb.png",
    tag: "Partner Spotlight",
    title: "Partner spotlight: Sunita's Kitchen, Mumbai",
    description: "How a home cook turned her weekend thalis into a full-time tiffin business on Tiffexx.",
    time: "Aug 10 · 5 min read",
  },
  {
    id: "spot-2",
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    image: "/assets/spotlight-thumb.png",
    tag: "Partner Spotlight",
    title: "Our people make the difference",
    description: "We're an extension of your kitchen's own team — support is free and our team is on call 24/7.",
    time: "Aug 10 · 5 min read",
  },
  {
    id: "spot-3",
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    image: "/assets/spotlight-thumb.png",
    tag: "Partner Spotlight",
    title: "Rajesh's Maharashtrian Tiffins: Pune",
    description: "Scaling authentic Poha & Pitla Bhakri boxes from 12 orders to over 240 corporate daily lunches.",
    time: "Aug 12 · 4 min read",
  },
  {
    id: "spot-4",
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    image: "/assets/spotlight-thumb.png",
    tag: "Partner Spotlight",
    title: "Anita's Ghar Ka Khana: Noida Sector 62",
    description: "Serving authentic North Indian thalis with zero soda and hand-rolled ghee rotis.",
    time: "Aug 15 · 5 min read",
  },
  {
    id: "spot-5",
    slug: "how-home-kitchens-are-changing-food-delivery-in-india",
    image: "/assets/spotlight-thumb.png",
    tag: "Partner Spotlight",
    title: "Chef Shanthi's South Indian Kitchen: HSR Layout",
    description: "Three generations of Thanjavur sambar recipes delivered piping hot each afternoon.",
    time: "Aug 18 · 6 min read",
  },
];

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Spotlight carousel items (3 visible at a time on desktop)
  const visibleCount = 3;
  const maxSpotlightIndex = Math.max(0, ALL_SPOTLIGHTS.length - visibleCount);

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => Math.min(maxSpotlightIndex, prev + 1));
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    const blogEl = document.getElementById("blog-section");
    if (blogEl) {
      blogEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const heroItem = HERO_ARTICLES[currentPage] || HERO_ARTICLES[1];
  const latestPosts = LATEST_POSTS_BY_PAGE[currentPage] || LATEST_POSTS_BY_PAGE[1];

  return (
    <main className={styles.mainBlog}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/locations">Noida</Link>
        <span>/</span>
        <strong>Blog</strong>
      </div>

      {/* Main Blog Card */}
      <section className={styles.blog} id="blog-section">
        <h1>Blog</h1>
        <p className={styles.blogUpdated}>Last updated: July 2025</p>

        {/* Top Hero and Latest Posts Grid */}
        <div className={styles.blogTop}>
          {/* Featured Hero Article - links to article screen */}
          <Link
            href={`/blog/${heroItem.slug}`}
            className={styles.hero}
            aria-label={`Read article: ${heroItem.title}`}
          >
            <img src={heroItem.image} alt={heroItem.title} />
            <span className={styles.heroTag}>
              <i></i>
              {heroItem.tag}
            </span>
            <div className={styles.heroText}>
              <h2>{heroItem.title}</h2>
              <p>Blog · {heroItem.date} · {heroItem.readTime}</p>
            </div>
          </Link>

          {/* Latest Posts List - each links to article screen */}
          <div className={styles.latest}>
            <h2>Latest posts</h2>
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={styles.post}
                aria-label={`Read article: ${post.title}`}
              >
                <img src={post.image} alt="" />
                <div>
                  <h4>{post.title}</h4>
                  <span>{post.meta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Partner Spotlight Section */}
        <div className={styles.spotHead}>
          <h2>Partner spotlight</h2>
          <div className={styles.arrows}>
            <button
              type="button"
              onClick={handlePrevSpotlight}
              disabled={spotlightIndex === 0}
              aria-label="Previous partner spotlight"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNextSpotlight}
              disabled={spotlightIndex >= maxSpotlightIndex}
              aria-label="Next partner spotlight"
            >
              →
            </button>
          </div>
        </div>

        {/* Spotlight Carousel Track */}
        <div className={styles.spotRowWrapper}>
          <div
            className={styles.spotRow}
            style={{
              transform: `translateX(calc(-${spotlightIndex} * (100% / 3 + 6.66px)))`,
            }}
          >
            {ALL_SPOTLIGHTS.map((spot) => (
              <Link
                key={spot.id}
                href={`/blog/${spot.slug}`}
                className={styles.spot}
              >
                <img className={styles.spotImg} src={spot.image} alt={spot.title} />
                <span className={styles.tag}>
                  <i></i>
                  {spot.tag}
                </span>
                <h3>{spot.title}</h3>
                <p>{spot.description}</p>
                <time>{spot.time}</time>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <nav className={styles.pager} aria-label="Blog pages">
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => handlePageChange(pageNum)}
              className={currentPage === pageNum ? styles.pagerOn : ""}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
