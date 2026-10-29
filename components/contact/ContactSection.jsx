"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <strong>Contact</strong>
      </div>

      <section className={styles.contact} aria-labelledby="contact-heading">
        {/* Contact Info Sidebar */}
        <aside className={styles.contactInfo}>
          <h1 id="contact-heading">Get in touch</h1>
          <p className={styles.contactUpdated}>Last updated: July 2025</p>

          <div className={`${styles.infoBlock} ${styles.infoBlockFirst} ${styles.infoBlockInter}`}>
            <span>Email</span>
            <p>
              <a href="mailto:hello@tiffexx.com">hello@tiffexx.com</a>
            </p>
          </div>

          <div className={styles.infoBlock}>
            <span>Phone</span>
            <p>
              <a href="tel:+918012345678">+91 80 1234 5678</a>
            </p>
          </div>

          <div className={styles.infoBlock}>
            <span>Address</span>
            <p>
              Tiffexx HQ, Koramangala,<br />
              Bengaluru 560034
            </p>
          </div>

          <div className={styles.infoBlock}>
            <span>Hours</span>
            <p>Mon–Sat, 8 AM – 8 PM IST</p>
          </div>

          <div className={styles.follow}>
            <span>Follow us</span>
            <div className={styles.followIcons}>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <img src="/assets/youtube.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/assets/linkedin.svg" alt="" width="24" height="24" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/assets/instagram.svg" alt="" width="24" height="24" />
              </a>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <div className={styles.contactForm}>
          <h2>Send us a message</h2>

          {isSubmitted && (
            <div className={styles.successBanner} role="status">
              <span>✓ Thank you! Your message has been sent. We will get back to you shortly.</span>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                aria-label="Dismiss confirmation"
              >
                ✕
              </button>
            </div>
          )}

          <form id="contact-form" onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={`${styles.field} ${styles.fieldMessage}`}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Write something..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              className={styles.btnSubmit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
