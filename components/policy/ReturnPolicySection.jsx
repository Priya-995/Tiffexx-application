"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./ReturnPolicySection.module.css";

export default function ReturnPolicySection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName = user?.name || "Ananya Rao";
  const displayPhone = user?.phone || "+91 98XXX XXX10";

  const getInitials = (name) => {
    if (!name) return "AR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleSignOut = () => {
    if (logout) logout();
    router.push("/signin");
  };

  return (
    <ProfileLayout>
      {/* Main */}
      <div className={s.main}>
        <button
          className={s.back}
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <img src="/assets/back.svg" alt="" width="24" height="24" />
        </button>

        <h1 className={s.pageTitle}>RETURN POLICY</h1>

        {/* Hero */}
        <section className={s.hero}>
          <p className={s.heroEyebrow}>Fair and simple</p>
          <h2 className={s.heroTitle}>
            Something not right? We’ll make it right.
          </h2>
          <p className={s.heroSub}>
            Because food can’t be returned, we offer refunds or credits for eligible issues.
          </p>
        </section>

        {/* Key facts */}
        <section className={s.facts} aria-label="Key facts">
          <div className={s.fact}>
            <strong>2 hours</strong>
            <span>Window to report an issue</span>
          </div>
          <div className={s.fact}>
            <strong>Wallet or original payment</strong>
            <span>Refund options</span>
          </div>
          <div className={s.fact}>
            <strong>3–5 days</strong>
            <span>Refund to bank or card</span>
          </div>
        </section>

        {/* Eligible / not eligible */}
        <div className={s.split}>
          <section className={s.card}>
            <header className={s.cardHead}>
              <h2>When You Can Get a Refund</h2>
            </header>
            <ul className={s.checkList}>
              <li className={s.yes}>
                <span className={s.mark} aria-hidden="true">
                  ✓
                </span>
                Wrong item delivered
              </li>
              <li className={s.yes}>
                <span className={s.mark} aria-hidden="true">
                  ✓
                </span>
                Item missing from your order
              </li>
              <li className={s.yes}>
                <span className={s.mark} aria-hidden="true">
                  ✓
                </span>
                Food arrived spoiled or unsafe to eat
              </li>
              <li className={s.yes}>
                <span className={s.mark} aria-hidden="true">
                  ✓
                </span>
                Order not delivered or delivered excessively late
              </li>
              <li className={s.yes}>
                <span className={s.mark} aria-hidden="true">
                  ✓
                </span>
                Damaged meal packaging causing major food spillage
              </li>
            </ul>
          </section>

          <section className={s.card}>
            <header className={s.cardHead}>
              <h2>When We Can’t Refund</h2>
            </header>
            <ul className={s.checkList}>
              <li className={s.no}>
                <span className={s.mark} aria-hidden="true">
                  ✕
                </span>
                Change of mind after the meal is prepared
              </li>
              <li className={s.no}>
                <span className={s.mark} aria-hidden="true">
                  ✕
                </span>
                Issues reported after 2 hours of delivery
              </li>
              <li className={s.no}>
                <span className={s.mark} aria-hidden="true">
                  ✕
                </span>
                Delay caused by an incorrect address or unreachable phone
              </li>
              <li className={s.no}>
                <span className={s.mark} aria-hidden="true">
                  ✕
                </span>
                Subjective taste, texture, or mild spice preferences
              </li>
              <li className={s.no}>
                <span className={s.mark} aria-hidden="true">
                  ✕
                </span>
                Orders consumed in full before reporting
              </li>
            </ul>
          </section>
        </div>

        {/* Steps */}
        <section className={s.card}>
          <header className={s.cardHead}>
            <h2>How to Request a Refund</h2>
          </header>
          <ol className={s.steps}>
            <li>
              <span className={s.stepNum} aria-hidden="true">
                1
              </span>
              <strong>Report the issue</strong>
              <span>Open My Orders, pick the order and tap Report an issue.</span>
            </li>
            <li>
              <span className={s.stepNum} aria-hidden="true">
                2
              </span>
              <strong>Add details</strong>
              <span>Share what went wrong and attach a photo if you can.</span>
            </li>
            <li>
              <span className={s.stepNum} aria-hidden="true">
                3
              </span>
              <strong>We review it</strong>
              <span>Our support team checks your request within 2 hours.</span>
            </li>
            <li>
              <span className={s.stepNum} aria-hidden="true">
                4
              </span>
              <strong>Get your refund</strong>
              <span>Money goes to your wallet or original payment method.</span>
            </li>
          </ol>
        </section>

        {/* Timelines */}
        <section className={s.card}>
          <header className={s.cardHead}>
            <h2>Refund Timelines</h2>
          </header>
          <div className={s.tableWrap}>
            <table className={s.timeline}>
              <thead>
                <tr>
                  <th scope="col">Refunded to</th>
                  <th scope="col">Time taken</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiffexx Wallet</td>
                  <td>Instant</td>
                </tr>
                <tr>
                  <td>UPI</td>
                  <td>1–2 business days</td>
                </tr>
                <tr>
                  <td>Debit or credit card</td>
                  <td>3–5 business days</td>
                </tr>
                <tr>
                  <td>Net banking</td>
                  <td>3–7 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className={s.card}>
          <header className={s.cardHead}>
            <h2>Return Policy FAQs</h2>
          </header>
          <div className={s.faq}>
            <details>
              <summary>Can I cancel an order after placing it?</summary>
              <p>
                You can cancel your order within 60 seconds of placing it without any charge. Once the home kitchen accepts the ticket and begins cooking fresh ingredients, cancellations cannot be accepted.
              </p>
            </details>
            <details>
              <summary>What happens to my subscription if I cancel mid-week?</summary>
              <p>
                You can pause or skip upcoming delivery days up to 7:00 PM the evening before. If you decide to cancel your subscription entirely, the unused meal balance is credited pro-rata directly to your Tiffexx Wallet.
              </p>
            </details>
            <details>
              <summary>Will I get a replacement instead of a refund?</summary>
              <p>
                Yes! If a meal is missing or wrong, you can choose between an immediate priority redelivery from the kitchen or an instant credit back to your Tiffexx Wallet.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className={s.cta}>
          <div className={s.ctaText}>
            <p className={s.ctaTitle}>Need a refund for an order?</p>
            <p className={s.ctaSub}>
              Raise a request and our support team will take care of it right away.
            </p>
          </div>
          <Link className={s.btnCta} href="/contact">
            Raise a request
          </Link>
        </section>

        <p className={s.updated}>Last updated: October 2026</p>
      </div>
    </ProfileLayout>
  );
}

