import Link from "next/link";
import s from "./SearchResults.module.css";

const IMG = "/assets/kitchen-cover.png";

/* Catalog of available kitchens & thalis */
const CATALOG = [
  { name: "Amma's Kitchen", cuisine: "South Indian · (312)", price: 99, rating: "4.5", tag: "Best value", tags: ["thali", "south indian", "amma", "kitchen", "tiffin", "meal"] },
  { name: "Punjab Rasoi", cuisine: "North Indian · (208)", price: 129, rating: "4.3", nonveg: true, tags: ["thali", "north indian", "punjab", "rasoi", "tiffin", "meal"] },
  { name: "Dragon Wok Express", cuisine: "Chinese · (96)", price: 149, rating: "4.1", nonveg: true, closed: true, tags: ["chinese", "dragon", "wok", "express", "tiffin"] },
  { name: "Ghar Ka Swaad", cuisine: "North Indian · (450)", price: 105, rating: "4.6", tag: "Top rated", tags: ["thali", "north indian", "ghar", "swaad", "tiffin", "meal"] },
  { name: "Annapurna Cloud Kitchen", cuisine: "Multi-cuisine · (167)", price: 114, rating: "4.2", tint: true, tags: ["thali", "multi-cuisine", "annapurna", "cloud", "kitchen", "tiffin"] },
  { name: "Bong Bhoj", cuisine: "Bengali · (140)", price: 135, rating: "4.4", nonveg: true, tint: true, tags: ["bengali", "bong", "bhoj", "thali", "tiffin"] },
  { name: "Gujarat Rasoi", cuisine: "Gujarati · (58)", price: 110, rating: "4.7", tag: "New", tint: true, tags: ["gujarati", "gujarat", "rasoi", "thali", "tiffin"] },
  { name: "Continental Bites", cuisine: "Continental · (74)", price: 159, rating: "4.1", tint: true, tags: ["continental", "bites", "tiffin", "meal"] },
];

export default function SearchResults({ query }) {
  const normalized = (query || "").trim().toLowerCase();

  // Find matches across name, cuisine, and keywords
  const results = normalized
    ? CATALOG.filter((item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.cuisine.toLowerCase().includes(normalized) ||
        item.tags.some((t) => t.includes(normalized) || normalized.includes(t))
      )
    : [];

  const hasResults = results.length > 0;

  return (
    <div className={s.page}>
      <main>
        {hasResults ? (
          /* ---------- Results Found State (Node 34-1548) ---------- */
          <div className={s.main}>
            <section className={s.section}>
              <div className={s.section__head}>
                <h1 className={s.section__title}>
                  Showing {results.length} results for &quot;{query}&quot;
                </h1>
              </div>
              <div className={s.grid}>
                {results.map((r) => (
                  <article key={r.name} className={`${s.card} ${r.closed ? s["card--closed"] : ""}`}>
                    <div className={`${s.card__media} ${r.tint ? s["card__media--tint"] : ""}`}>
                      <img src={IMG} alt="" />
                      <span className={`${s.diet} ${r.nonveg ? s["diet--nonveg"] : ""}`}></span>
                      {r.tag && <span className={s.tag}>{r.tag}</span>}
                      {r.closed && <div className={s.overlay}>Closed · opens 6:00 PM</div>}
                    </div>
                    <div className={s.card__body}>
                      <div className={s.card__top}>
                        <h3 className={s.card__name}>{r.name}</h3>
                        <span className={s.rating}>
                          <img src="/assets/icon-star.svg" alt="" />
                          {r.rating}
                        </span>
                      </div>
                      <p className={s.card__cuisine}>{r.cuisine}</p>
                      <p className={s.card__price}>From ₹{r.price}/meal</p>
                      <div className={s.card__actions}>
                        <Link href="/partner-listing" className={`${s.btn} ${s["btn--solid"]}`}>Order now</Link>
                        <Link href="/partner-listing" className={`${s.btn} ${s["btn--outline"]}`}>Subscribe</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={s.section}>
              <div className={s.section__head}>
                <div>
                  <h2 className={s.section__title}>Subscription plans for you</h2>
                  <p className={s.section__sub}>
                    Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from
                  </p>
                </div>
                <Link className={s.section__link} href="/kitchens">See all →</Link>
              </div>
              <div className={s.plans}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <article key={i} className={s.plan}>
                    <div className={s.plan__media}>
                      <img src="/assets/subscription-food.png" alt="Palak paneer" />
                      <span className={s.plan__badge}>Top rated</span>
                    </div>
                    <button className={s.plan__fav} aria-label="Save">
                      <img src="/assets/btn-favorite.svg" alt="" />
                    </button>
                    <div className={s.plan__content}>
                      <div className={s.plan__info}>
                        <span className={s.plan__name}>Ananya&apos;s Kitchen</span>
                        <span className={s.plan__meta}>Monthly · 30 meals</span>
                      </div>
                      <div className={s.plan__price}>
                        <span className={s.plan__amount}>₹89</span>
                        <span className={s.plan__unit}>/day</span>
                        <span className={s.plan__old}>₹109</span>
                      </div>
                      <button className={s.plan__cta}>Subscribe</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* ---------- Empty State: No Thalis or Kitchens Found (Node 830-6) ---------- */
          <>
            <section className={s.empty}>
              <div className={s.empty__art}>
                <img src="/assets/empty-state.png" alt="Tiffin box looking into an empty cupboard" />
              </div>
              <h2 className={s.empty__title}>Oops! No Thalis or Kitchens found.</h2>
            </section>

            <section className={s.tilesSection}>
              <div className={s.section__head}>
                <div>
                  <h2 className={s.section__title}>Hungry? Start Here</h2>
                  <p className={s.section__sub}>Enjoy home-style meals delivered fresh to your doorstep</p>
                </div>
                <Link className={s.section__link} href="/kitchens">See all →</Link>
              </div>
              <div className={s.cards}>
                {[0, 1, 2, 3].map((i) => (
                  <article key={i} className={s.tile}>
                    <img src="/assets/subscription-food.png" alt="Palak paneer" />
                    <span className={s.tile__badge}>Top rated</span>
                    <div className={s.tile__card}>
                      <div className={s.tile__row}>
                        <div className={s.tile__left}>
                          <span className={s.tile__name}>Ananya&apos;s Kitchen</span>
                          <span className={s.tile__about}>About</span>
                        </div>
                        <div className={s.tile__right}>
                          <div className={s.price}>
                            <span className={s.price__amount}>₹89</span>
                            <span className={s.price__unit}>/day</span>
                            <span className={s.price__old}>₹109</span>
                          </div>
                          <span className={s.tile__meta}>Monthly · 30 meals</span>
                        </div>
                      </div>
                      <button className={s.tile__cta}>Explore Menu</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className={`${s.footer} ${!hasResults ? s["footer--empty"] : ""}`}>
        <div className={s.footer__grid}>
          <div>
            <img className={s.footer__logo} src="/assets/logo.png" alt="Tiffexx" />
            <p className={s.footer__blurb}>
              Fresh, home-style tiffins delivered daily — order once or subscribe and let mealtime run on autopilot.
            </p>
          </div>
          <div>
            <h6>Company</h6>
            <ul><li>About us</li><li>Blog</li><li>Careers</li><li>Press</li></ul>
          </div>
          <div>
            <h6>For kitchens</h6>
            <ul><li>Partner with us</li><li>Kitchen dashboard</li><li>Partner terms</li></ul>
          </div>
          <div>
            <h6>Support</h6>
            <ul><li>FAQ</li><li>Contact us</li><li>Privacy policy</li><li>Terms</li></ul>
          </div>
        </div>
        <div className={s.footer__bottom}>
          <span>© 2026 Tiffexx Technologies Pvt. Ltd. All rights reserved.</span>
          <span>Bengaluru · Mumbai · Pune · Hyderabad</span>
        </div>
      </footer>
    </div>
  );
}
