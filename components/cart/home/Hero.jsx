export default function Hero() {
  return (
    <section className="hero" aria-label="Featured">
      <img
        className="hero__img"
        src="/assets/hero-banner.png"
        alt="Introducing homely subscriptions"
      />
      <div className="dots" aria-hidden="true">
        <i className="is-active"></i>
        <i></i>
        <i></i>
      </div>
    </section>
  );
}
