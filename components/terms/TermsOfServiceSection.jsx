"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./TermsOfServiceSection.module.css";

const TOC_SECTIONS = [
  { id: "acceptance", title: "Acceptance of terms" },
  { id: "using-tiffexx", title: "Using Tiffexx" },
  { id: "orders-payments", title: "Orders & payments" },
  { id: "subscriptions", title: "Subscriptions" },
  { id: "wallet", title: "Wallet" },
  { id: "partners", title: "Kitchen & delivery partners" },
  { id: "cancellations", title: "Cancellations & refunds" },
  { id: "conduct", title: "User conduct" },
  { id: "liability", title: "Limitation of liability" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact" },
];

export default function TermsOfServiceSection() {
  const [activeSectionId, setActiveSectionId] = useState("acceptance");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = TOC_SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(TOC_SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSectionId(TOC_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <main className={styles.terms}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Legal</span>
        <span>/</span>
        <strong>Terms of Service</strong>
      </div>

      <div className={styles.termsHead}>
        <div className={styles.termsHeadInner}>
          <p className={styles.eyebrow}>LEGAL</p>
          <h1>Terms of Service</h1>
          <p className={styles.meta}>
            Last updated: July 2025 · Effective for all Tiffexx customers, kitchen partners and delivery partners
          </p>
        </div>
      </div>

      <div className={styles.termsBody}>
        {/* Table of Contents */}
        <aside className={styles.toc}>
          <nav aria-label="Terms sections">
            {TOC_SECTIONS.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`${styles.tocLink} ${isActive ? styles.isActive : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {sec.title}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <article className={styles.content}>
          <section id="acceptance" className={`${styles.section} ${styles.sectionLead}`}>
            <h2>Acceptance of terms</h2>
            <p>
              By creating a Tiffexx account or placing an order through our app or website, you agree to be bound by these
              Terms of Service and our Privacy Policy. If you do not agree, please do not use Tiffexx.
            </p>
            <p>
              These terms apply to all users of the platform — customers browsing and ordering meals, kitchen partners listing
              their food, and delivery partners fulfilling orders.
            </p>
          </section>

          <section id="using-tiffexx" className={styles.section}>
            <h2>Using Tiffexx</h2>
            <p>
              You must be at least 18 years old, or have a parent or guardian&apos;s consent, to create an account. You&apos;re
              responsible for keeping your login credentials secure and for all activity under your account.
            </p>
            <ul className={styles.bullets}>
              <li>You agree to provide accurate delivery address and contact information.</li>
              <li>You agree not to misuse the platform to place fraudulent or abusive orders.</li>
              <li>Tiffexx may suspend or terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section id="orders-payments" className={styles.section}>
            <h2>Orders &amp; payments</h2>
            <p>
              Prices shown at checkout include the kitchen&apos;s listed price, applicable taxes, and any delivery fee. Once a
              kitchen accepts your order, it moves into preparation and may no longer be modified.
            </p>
            <p>
              Payments can be made via your Tiffexx Wallet, UPI, debit/credit card, or netbanking. All transactions are
              processed through PCI-compliant third-party payment gateways — Tiffexx does not store your card details.
            </p>
          </section>

          <section id="subscriptions" className={styles.section}>
            <h2>Subscriptions</h2>
            <p>
              Meal plan subscriptions renew automatically at the start of each billing cycle unless paused or cancelled
              beforehand. You can skip individual deliveries or pause a plan from the Subscriptions screen, subject to each
              kitchen&apos;s cutoff times.
            </p>
            <p>
              Prices for subscription plans may change between billing cycles; you&apos;ll be notified in-app before any change
              takes effect on your next renewal.
            </p>
          </section>

          <section id="wallet" className={styles.section}>
            <h2>Wallet</h2>
            <p>
              The Tiffexx Wallet is a prepaid balance you can add funds to and use toward orders and subscriptions. Wallet
              balance is non-transferable between accounts and is used automatically at checkout before other payment methods.
            </p>
            <p>
              Unused wallet balance can be withdrawn to your original payment method, subject to standard processing timelines
              described in our FAQ.
            </p>
          </section>

          <section id="partners" className={styles.section}>
            <h2>Kitchen &amp; delivery partners</h2>
            <p>
              Kitchen partners are independent businesses responsible for the quality, hygiene and preparation of the food they
              list. Tiffexx verifies FSSAI licensing at onboarding but does not itself prepare or handle food.
            </p>
            <p>
              Delivery partners are independent contractors who choose their own working hours. Tiffexx facilitates order
              assignment and payment but does not control how partners conduct deliveries beyond platform safety guidelines.
            </p>
          </section>

          <section id="cancellations" className={styles.section}>
            <h2>Cancellations &amp; refunds</h2>
            <p>
              Orders can be cancelled free of charge before a kitchen accepts them. Once preparation begins, cancellation and
              refund eligibility depends on the individual kitchen&apos;s policy, shown on the order screen.
            </p>
            <p>
              Issues with delivered orders — wrong items, quality concerns, or non-delivery — should be reported within 2 hours
              of the expected delivery time for a refund or wallet credit to be issued.
            </p>
          </section>

          <section id="conduct" className={styles.section}>
            <h2>User conduct</h2>
            <p className={styles.conductText}>
              You agree not to use Tiffexx to harass kitchen or delivery partners, submit false reviews, exploit promotional
              offers through multiple accounts, or attempt to reverse-engineer or disrupt the platform.
            </p>
            <div className={styles.callout}>
              Violation of this section may result in immediate suspension of your account, forfeiture of wallet balance
              obtained through fraud, and — where applicable — legal action.
            </div>
          </section>

          <section id="liability" className={styles.section}>
            <h2>Limitation of liability</h2>
            <p>
              Tiffexx acts as an intermediary platform connecting customers, kitchens and delivery partners. To the maximum
              extent permitted by law, Tiffexx is not liable for food quality, allergic reactions, or delivery delays caused
              by third parties, though we will assist in resolving disputes in good faith.
            </p>
          </section>

          <section id="changes" className={styles.section}>
            <h2>Changes to these terms</h2>
            <p>
              We may update these Terms of Service from time to time. Material changes will be notified in-app or via email at
              least 7 days before taking effect. Continued use of Tiffexx after that date constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section id="contact" className={styles.section}>
            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a className={styles.link} href="mailto:legal@tiffexx.com">
                legal@tiffexx.com
              </a>
              , or via our{" "}
              <Link className={styles.link} href="/contact">
                Contact Us
              </Link>{" "}
              page.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
