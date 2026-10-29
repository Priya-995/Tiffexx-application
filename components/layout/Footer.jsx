import Link from "next/link";

export default function Footer({ className = "" }) {
  return (
    <footer className={`footer ${className}`.trim()}>
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/assets/logo.png" alt="Tiffexx" width="108" height="26" />
          <p>
            Fresh, home-style tiffins delivered daily — order once or subscribe and let
            mealtime run on autopilot.
          </p>
        </div>
        <nav className="footer__col" aria-label="Company">
          <h5>Company</h5>
          <ul>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="For kitchens">
          <h5>For kitchens</h5>
          <ul>
            <li>
              <a href="#">Partner with us</a>
            </li>
            <li>
              <a href="#">Kitchen dashboard</a>
            </li>
            <li>
              <a href="#">Partner terms</a>
            </li>
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Support">
          <h5>Support</h5>
          <ul>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <p>© 2026 Tiffexx Technologies Pvt. Ltd. All rights reserved.</p>
        <p>Bengaluru · Mumbai · Pune · Hyderabad</p>
      </div>
    </footer>
  );
}
