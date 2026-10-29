"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./PrivacyPolicySection.module.css";

const TOC_SECTIONS = [
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use-your-data", title: "How we use your data" },
  { id: "sharing-your-data", title: "Sharing your data" },
  { id: "data-retention", title: "Data retention" },
  { id: "security", title: "Security" },
  { id: "your-rights", title: "Your rights" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
  { id: "grievance", title: "Grievance Officer & contact" },
];

export default function PrivacyPolicySection() {
  const [activeSectionId, setActiveSectionId] = useState("information-we-collect");

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
    <main className={styles.policy}>
      <div className={styles.policyInner}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Legal</span>
          <span>/</span>
          <strong>Privacy Policy</strong>
        </div>

        <p className={styles.eyebrow}>LEGAL</p>
        <h1>Privacy Policy</h1>
        <p className={styles.effective}>Effective 14 June 2026</p>
        <p className={styles.lead}>
          Tiffexx (operated by the company registered under CIN U47912UP2023PTC178999) is committed to protecting
          your privacy. This policy explains what personal data we collect when you use the Tiffexx app, why we collect it,
          and the choices you have. It is published in accordance with the Digital Personal Data Protection Act, 2023 and
          the Information Technology (Reasonable Security Practices) Rules, 2011.
        </p>

        <div className={styles.policyBody}>
          {/* Table of Contents */}
          <aside className={styles.toc}>
            <nav aria-label="Policy sections">
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

          {/* Policy Content */}
          <article className={styles.content}>
            {/* 1. Information we collect */}
            <section id="information-we-collect" className={styles.policySection}>
              <p className={styles.contentIntro}>We collect the following categories of personal data:</p>
              <h2>Information we collect</h2>
              <ul className={styles.dataList}>
                <li>
                  <strong>Account details</strong> — your name, phone number, and email address used to sign in.
                </li>
                <li>
                  <strong>Delivery addresses</strong> — the addresses you save to receive tiffin orders, including their map coordinates.
                </li>
                <li>
                  <strong>Order &amp; subscription data</strong> — items ordered, meal preferences, schedules, and order history.
                </li>
                <li>
                  <strong>Payment &amp; wallet data</strong> — your Tiffexx wallet balance and transactions. Wallet top-ups are processed by our payment partner (Razorpay); we do not store your full card, UPI, or bank credentials.
                </li>
                <li>
                  <strong>Location data</strong> — while an order is out for delivery, we process the assigned delivery partner&apos;s live location to show you order tracking. We access your device location only with your permission, to help you set a delivery address.
                </li>
                <li>
                  <strong>Device &amp; usage data</strong> — app version, device type, and diagnostic logs used to keep the service reliable.
                </li>
              </ul>
            </section>

            {/* 2. How we use your data */}
            <section id="how-we-use-your-data" className={styles.policySection}>
              <h2>How we use your data</h2>
              <p>We process your personal information strictly for genuine business purposes and service fulfillment:</p>
              <ul className={styles.dataList}>
                <li>
                  <strong>Order Fulfillment</strong> — Coordinating meal preparation with your selected home chef and dispatching delivery partners to your exact address.
                </li>
                <li>
                  <strong>Subscription Management</strong> — Managing your recurring meal schedules, pausing or skipping days, and auto-crediting skipped meals to your wallet.
                </li>
                <li>
                  <strong>Customer Support &amp; Communication</strong> — Providing live order tracking notifications, service announcements, resolving delivery disputes, and answering inquiries.
                </li>
                <li>
                  <strong>Platform Safety &amp; Integrity</strong> — Detecting fraudulent transactions, preventing abuse, and verifying kitchen safety standards.
                </li>
              </ul>
            </section>

            {/* 3. Sharing your data */}
            <section id="sharing-your-data" className={styles.policySection}>
              <h2>Sharing your data</h2>
              <p>
                We value your trust and never sell your personal data to third-party advertisers. We share information only with authorized entities required to fulfill your orders:
              </p>
              <ul className={styles.dataList}>
                <li>
                  <strong>Home Kitchen Partners</strong> — Kitchens receive your meal choices, dietary instructions, and delivery window. They never receive your contact details directly unless required for meal customization.
                </li>
                <li>
                  <strong>Delivery Partners</strong> — Assigned delivery riders receive your delivery address and contact number to facilitate handoff and live dispatching.
                </li>
                <li>
                  <strong>Payment Gateways &amp; Banks</strong> — Secure payment processors (e.g. Razorpay, UPI aggregators) handle billing under PCI-DSS compliance standards.
                </li>
                <li>
                  <strong>Law Enforcement &amp; Legal Compliance</strong> — When mandatory under Indian law, court orders, or governmental directives.
                </li>
              </ul>
            </section>

            {/* 4. Data retention */}
            <section id="data-retention" className={styles.policySection}>
              <h2>Data retention</h2>
              <p>
                We retain your personal information for as long as your Tiffexx account remains active. Financial transaction records, invoices, and statutory tax details are maintained for statutory periods mandated under Indian corporate and taxation laws (typically 7–8 years).
              </p>
              <p>
                Upon account deletion, non-essential data including saved search history and inactive address bookmarks are permanently expunged or anonymized within 30 days.
              </p>
            </section>

            {/* 5. Security */}
            <section id="security" className={styles.policySection}>
              <h2>Security</h2>
              <p>
                We deploy industry-standard technical and organizational security protocols to safeguard your personal data against unauthorized access, loss, or alteration:
              </p>
              <ul className={styles.dataList}>
                <li>
                  <strong>Encryption</strong> — All communications between your device and Tiffexx servers are secured using 256-bit TLS/HTTPS encryption.
                </li>
                <li>
                  <strong>Secure Cloud Infrastructure</strong> — Data is stored in access-controlled, firewalled cloud data centers adhering to ISO/IEC 27001 standards.
                </li>
                <li>
                  <strong>OTP Authentication</strong> — Login sessions are verified using secure time-based SMS OTPs to prevent unauthorized account takeovers.
                </li>
              </ul>
            </section>

            {/* 6. Your rights */}
            <section id="your-rights" className={styles.policySection}>
              <h2>Your rights</h2>
              <p>Under the Digital Personal Data Protection Act, 2023, you have the following rights concerning your data:</p>
              <ul className={styles.dataList}>
                <li>
                  <strong>Right to Access &amp; Summary</strong> — Request a copy of your personal data processed by Tiffexx.
                </li>
                <li>
                  <strong>Right to Correction &amp; Erasure</strong> — Update inaccurate contact information, dietary tags, or delete saved addresses at any time.
                </li>
                <li>
                  <strong>Right to Withdraw Consent</strong> — Revoke permission for push notifications, location services, or marketing communications through device settings.
                </li>
                <li>
                  <strong>Right to Nominate</strong> — Designate an individual to manage your account rights in the event of incapacity.
                </li>
              </ul>
            </section>

            {/* 7. Children */}
            <section id="children" className={styles.policySection}>
              <h2>Children</h2>
              <p>
                Tiffexx does not knowingly solicit or collect personal information from individuals under 18 years of age without parental consent. If we discover that a minor has provided us with personal data, we will take immediate measures to delete that record from our databases.
              </p>
            </section>

            {/* 8. Changes to this policy */}
            <section id="changes" className={styles.policySection}>
              <h2>Changes to this policy</h2>
              <p>
                We may periodically update this Privacy Policy to reflect enhancements in our services, kitchen network, or statutory requirements. When material revisions are made, we will alert you via an in-app notice, email notification, or updated &quot;Effective Date&quot; at the top of this document.
              </p>
            </section>

            {/* 9. Grievance Officer & contact */}
            <section id="grievance" className={styles.policySection}>
              <h2>Grievance Officer &amp; contact</h2>
              <p>
                If you have queries, concerns, or grievances regarding our privacy practices or data handling, please contact our designated Grievance Officer in accordance with the Information Technology Act, 2000 and DPDP Act, 2023:
              </p>
              <div className={styles.officerCard}>
                <p><strong>Grievance Officer:</strong> Rajesh Kumar</p>
                <p><strong>Designation:</strong> Data Protection Officer &amp; Legal Head</p>
                <p><strong>Address:</strong> Tiffexx Technologies Pvt. Ltd., 4th Block, Koramangala, Bengaluru, Karnataka 560034, India</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:grievance@tiffexx.com">grievance@tiffexx.com</a> /{" "}
                  <a href="mailto:privacy@tiffexx.com">privacy@tiffexx.com</a>
                </p>
                <p><strong>Turnaround Time:</strong> We resolve all grievances within 36 business hours of receipt.</p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
