export default function YourPlan() {
  return (
    <section className="your-plan" aria-labelledby="yourplan-title">
      <header className="your-plan__head">
        <h2 id="yourplan-title">Your plan</h2>
        <p>Daily tiffin on autopilot, picked from kitchens you&apos;ve ordered from</p>
      </header>

      <article className="plan">
        <div className="plan__header">
          <h3>Meal subscription</h3>
          <span className="plan__badge">
            <img src="/assets/active-dot.svg" alt="" width="7" height="7" />
            Active
          </span>
        </div>

        <div className="plan__body">
          <div className="donut" role="img" aria-label="5 of 7 meals used">
            <img className="donut__track" src="/assets/donut-track.svg" alt="" />
            <img className="donut__progress" src="/assets/donut-progress.svg" alt="" />
            <div className="donut__label">
              <b>5/7</b>
              <small>meals</small>
            </div>
          </div>

          <div className="plan__info">
            <h4>Ananya&apos;s Kitchen</h4>
            <div className="plan__row">
              <span>Price</span>
              <div className="plan__price">
                <b>₹89 / day</b>
                <s>₹109</s>
              </div>
            </div>
            <div className="plan__row">
              <span>Dates</span>
              <b className="plan__dates">Monthly · 6 meals</b>
            </div>
          </div>
        </div>

        <div className="plan__footer">
          <p>
            <span>Next delivery</span> <b>tomorrow, 1 PM</b>
          </p>
          <div className="plan__actions">
            <button className="btn btn--white" type="button">
              Upgrade Plan
            </button>
            <button className="btn btn--ghost-white" type="button">
              Pause Subscribe
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
