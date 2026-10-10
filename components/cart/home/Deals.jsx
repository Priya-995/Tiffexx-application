import { deals, pillContent } from "@/lib/data";

export default function Deals() {
  return (
    <section className="deals" aria-labelledby="deals-title">
      <div className="deals__head">
        <div>
          <h2 id="deals-title">Biggest Deals on Meals</h2>
          <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
        </div>
        <a className="link-all" href="#">
          See all →
        </a>
      </div>
      <div className="deals__list" id="deals">
        {deals.map((d, i) => (
          <article className="ticket" key={i}>
            <div className="ticket__stub">
              <div className="ticket__icon">
                <img src="/assets/deal-icon.png" alt="" />
              </div>
            </div>
            <div className="ticket__line">
              <img src="/assets/ticket-dash.png" alt="" />
            </div>
            <div className="ticket__main">
              <div className="ticket__inner">
                <div className="ticket__stack">
                  <p className="ticket__name">{d.kitchen}</p>
                  <div className="ticket__deco">
                    <img src="/assets/deco-line.svg" alt="" width="16" height="1.5" />
                    <img src="/assets/deco-dot.svg" alt="" width="3" height="3" />
                    <img src="/assets/deco-line.svg" alt="" width="16" height="1.5" />
                  </div>
                  <p className="ticket__off">{d.offer}</p>
                  <div className="ticket__pills">
                    {d.pills.map((k) => (
                      <span className="ticket__pill" key={k}>
                        <img src={pillContent[k].icon} alt="" />
                        {pillContent[k].label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
