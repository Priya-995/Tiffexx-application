import Link from "next/link";
import { popularPicks } from "@/lib/data";
import PriceRow from "@/components/ui/PriceRow";

export default function PopularPicks() {
  return (
    <section className="section" aria-labelledby="picks-title">
      <div className="sec-head">
        <div>
          <h2 id="picks-title">Your Popular Picks</h2>
          <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
        </div>
        <Link className="link-all" href="/kitchens">
          See all →
        </Link>
      </div>
      <div className="scroller" id="popular-picks">
        {popularPicks.map((p, i) => (
          <article className="pick" key={i}>
            <div className="pick__media">
              <img src="/assets/kitchen-cover.png" alt="" />
              <span className="pick__save">{p.save}</span>
            </div>
            <div className="pick__body">
              <p className="pick__cuisine">{p.cuisine}</p>
              <h3 className="pick__name">{p.kitchen}</h3>
              <p className="pick__meta">{p.meta}</p>
              <PriceRow price={p.price} oldPrice={p.oldPrice} />
              <Link className="pick__cta" href="/partner-listing">
                Subscribe
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
