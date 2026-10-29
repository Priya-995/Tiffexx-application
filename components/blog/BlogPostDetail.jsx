"use client";

import Link from "next/link";
import styles from "./BlogPostDetail.module.css";

const ARTICLES_DATABASE = {
  "how-home-kitchens-are-changing-food-delivery-in-india": {
    date: "15th July 2025",
    category: "Kitchen Spotlight",
    readingTime: "6 Min",
    title: (
      <>
        How Home Kitchens Are<br />Changing Food Delivery in India
      </>
    ),
    plainTitle: "How Home Kitchens Are Changing Food Delivery in India",
    lead: (
      <>
        From weekend cooks to full-time tiffin partners — home kitchens on Tiffexx are<br />
        quietly rewriting what &ldquo;food delivery&rdquo; means in Indian cities, one dabba at a time.
      </>
    ),
    coverImage: "/assets/hero-gradient.png",
    sections: [
      {
        title: "Why home kitchens, and why now",
        text: "For years, \"food delivery\" meant restaurant menus and commercial kitchens. But a quieter shift has been happening in residential neighbourhoods — home cooks who've always fed their block are now feeding their city, through Tiffexx.",
      },
      {
        title: "A different kind of kitchen",
        text: "Most Tiffexx kitchens start small: one cook, one pressure cooker, a handful of regulars. What makes them different from restaurant chains is consistency — the same hands make your sambar every day, which is exactly what tiffin subscribers are looking for.",
      },
      {
        title: "What this means for subscribers",
        text: "Ordering from a home kitchen isn't just about taste — it's about trust. You know who's cooking, you can message them directly, and swaps happen based on what's fresh that morning, not what's sitting in a commercial freezer.",
      },
    ],
    callout: {
      label: "Conclusion",
      text: "Home kitchens aren't a trend on Tiffexx — they're the foundation. As more cooks come online, subscribers get more variety without losing the thing that made tiffins worth subscribing to in the first place: a kitchen that actually knows what you like.",
    },
  },
  "eating-healthy-on-a-budget": {
    date: "10th August 2025",
    category: "Nutrition & Budget",
    readingTime: "5 Min",
    title: <>Eating Healthy on a Budget with Tiffin Subscriptions</>,
    plainTitle: "Eating Healthy on a Budget with Tiffin Subscriptions",
    lead: "How pre-planned homestyle tiffins eliminate surge pricing, delivery markups, and food waste while feeding you fresh wholesome nutrition every single day.",
    coverImage: "/assets/hero-gradient.png",
    sections: [
      {
        title: "The hidden cost of ad-hoc meal deliveries",
        text: "Ordering meal-by-meal on regular food apps introduces surge pricing, small cart fees, packaging charges, and delivery commissions that inflate a ₹150 meal to ₹320. Subscriptions cut out all middleman overheads.",
      },
      {
        title: "Nutritional density over empty calories",
        text: "Home-style dal, seasonal sabzi, and freshly roasted rotis provide clean complex carbohydrates and fiber without heavy cream or palm oil shortcuts that induce afternoon fatigue.",
      },
      {
        title: "Predictable budgeting",
        text: "Knowing your exact monthly food expense upfront helps working professionals save an average of ₹4,200 every month without ever stepping into a kitchen after long workdays.",
      },
    ],
    callout: {
      label: "Takeaway",
      text: "Good health doesn't require luxury organic price tags. It simply requires freshly cooked, mindful meals made with pure ingredients by cooks who care.",
    },
  },
  "meet-amma-koramangala-best-tiffin": {
    date: "10th August 2025",
    category: "Kitchen Spotlight",
    readingTime: "6 Min",
    title: (
      <>
        Meet Amma: The Heart Behind<br />Koramangala&apos;s Best Tiffin
      </>
    ),
    plainTitle: "Meet Amma: The Heart Behind Koramangala's Best Tiffin",
    lead: "From 8 dabbas for college students to over 180 daily subscriptions — how Amma's slow-simmered rasam conquered South Bengaluru.",
    coverImage: "/assets/hero-photo.png",
    sections: [
      {
        title: "The 5:00 AM ritual",
        text: "Every morning before dawn breaks over Bengaluru, Amma is already hand-pounding spices in stone mortars. Zero soda, cold-pressed sesame oil, and freshly ground coconut chutneys prepared fresh daily.",
      },
      {
        title: "Small-batch integrity at scale",
        text: "Instead of commercial vats, Amma cooks in multiple smaller batches so flavors remain nuanced and fresh. Food is dispatched in insulated containers directly to offices and flats in Koramangala and HSR Layout.",
      },
      {
        title: "A mother's touch",
        text: "\"When people eat my food five days a week, their digestion and energy are my personal responsibility,\" Amma says with a warm smile.",
      },
    ],
    callout: {
      label: "Chef's Note",
      text: "Real comfort food isn't fancy. It is hot rice, fragrant ghee, homemade sambar, and the feeling that someone cooked just for you.",
    },
  },
};

export default function BlogPostDetail({ slug = "how-home-kitchens-are-changing-food-delivery-in-india" }) {
  // Use matching article or fallback to default
  const article = ARTICLES_DATABASE[slug] || ARTICLES_DATABASE["how-home-kitchens-are-changing-food-delivery-in-india"];

  const handleScrollToContent = (e) => {
    e.preventDefault();
    const target = document.getElementById("content");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const title = article.plainTitle || "Tiffexx Blog";

    if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <main className={styles.main}>
      {/* Breadcrumb matching exact design */}
      <div className={styles.breadcrumb}>
        <Link href="/">Home </Link>
        <span className={styles.breadcrumbSep}>/ </span>
        <Link href="/locations">Noida</Link>
        <span className={styles.breadcrumbSep}> / </span>
        <span className={styles.breadcrumbCurrent}>About Us</span>
      </div>

      <article className={styles.card}>
        <div className={styles.cardBody}>
          {/* Metadata */}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Date</div>
              <div className={styles.metaValue}>{article.date}</div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Category</div>
              <div className={styles.metaValue}>{article.category}</div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Reading time</div>
              <div className={styles.metaValue}>{article.readingTime}</div>
            </div>
          </div>

          {/* Hero Title & Lead */}
          <h1 className={styles.heroTitle}>{article.title}</h1>

          <p className={styles.heroLead}>{article.lead}</p>

          {/* Read More button */}
          <a
            className={styles.readMore}
            href="#content"
            onClick={handleScrollToContent}
            aria-label="Scroll to article content"
          >
            <span className={styles.readMoreBtn}>↓</span>
            <span className={styles.readMoreLabel}>READ MORE</span>
          </a>

          {/* Cover Image */}
          <div className={styles.cover}>
            <img src={article.coverImage} alt={article.plainTitle} />
          </div>

          {/* Article Main Body */}
          <div className={styles.article} id="content">
            {/* Social Share Column */}
            <div className={styles.share} aria-label="Share article">
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                in
              </button>
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare("twitter")}
                aria-label="Share on X (Twitter)"
                title="Share on X"
              >
                𝕏
              </button>
              <button
                type="button"
                className={styles.shareBtn}
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                f
              </button>
            </div>

            {/* Content Sections */}
            <div className={styles.articleContent}>
              {article.sections.map((sec, idx) => (
                <section key={idx} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{sec.title}</h2>
                  <p className={styles.sectionText}>{sec.text}</p>
                </section>
              ))}

              {article.callout && (
                <aside className={styles.callout}>
                  <div className={styles.calloutLabel}>{article.callout.label}</div>
                  <p className={styles.calloutText}>{article.callout.text}</p>
                </aside>
              )}

              {/* Navigation back to blog index */}
              <div className={styles.backBar}>
                <Link href="/blog" className={styles.backBtn}>
                  ← Back to all posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
