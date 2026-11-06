"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ className = "" }) {
  const pathname = usePathname();

  // Hide footer on authentication screens
  if (
    pathname === "/signin" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/reset-password" ||
    pathname === "/create-new-password" ||
    pathname === "/new-password"
  ) {
    return null;
  }

  return (
    <footer className={`footer ${className}`.trim()}>
      <div className="footer__top">
        <div className="footer__brand">
          <Link href="/" aria-label="Tiffexx home">
            <img src="/assets/logo.png" alt="Tiffexx" width="108" height="26" />
          </Link>
          <p>
            Fresh, home-style tiffins delivered daily — order once or subscribe and let
            mealtime run on autopilot.
          </p>
          <div className="footer__socials" aria-label="Follow Tiffexx on social media">
            <a
              href="https://www.instagram.com/tiffexx.com_/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Tiffexx on Instagram"
              title="Instagram"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/p/Tiffexx-61584848297200/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Tiffexx on Facebook"
              title="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            
            <a
              href="https://www.linkedin.com/company/tiffexxindia"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Tiffexx on LinkedIn"
              title="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@Tiffexx"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Tiffexx on YouTube"
              title="YouTube"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
              </svg>
            </a>
          </div>
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
              <Link href="/contact">Careers</Link>
            </li>
            <li>
              <Link href="/blog">Press</Link>
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
        <div className="footer__bottom-left">
          <p className="footer__fssai">FSSAI Lic. No. 12724999000697</p>
          <p className="footer__copyright">© 2026 Tiffexx. All rights reserved.</p>
        </div>
        <div className="footer__bottom-right">
          <span className="footer__made-in-india">Made in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
