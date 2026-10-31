"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./ContactSection.module.css";

const TOPICS = [
  {
    id: "order-issues",
    title: "Order issues",
    desc: "Missing, late or wrong items",
    icon: "/assets/icon-order-issues.svg",
    formValue: "Order issue",
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    desc: "Pause, skip or change a plan",
    icon: "/assets/icon-subscriptions.svg",
    formValue: "Subscriptions",
  },
  {
    id: "payments",
    title: "Payments & refunds",
    desc: "Wallet, refunds and charges",
    icon: "/assets/icon-payments.svg",
    formValue: "Payments & refunds",
  },
  {
    id: "delivery",
    title: "Delivery",
    desc: "Slots, areas and tracking",
    icon: "/assets/icon-delivery.svg",
    formValue: "Delivery",
  },
  {
    id: "account",
    title: "My account",
    desc: "Profile, address and login",
    icon: "/assets/icon-account.svg",
    formValue: "My account",
  },
  {
    id: "coupons",
    title: "Coupons & wallet",
    desc: "Offers and vouchers",
    icon: "/assets/icon-coupons.svg",
    formValue: "Coupons & wallet",
  },
];

const INITIAL_REQUESTS = [
  {
    id: "req-1",
    title: "Item missing in order #TX-10431",
    date: "Raised 25 Oct 2026",
    status: "Resolved",
    badgeClass: "badgeResolved",
  },
  {
    id: "req-2",
    title: "Change delivery slot for weekly plan",
    date: "Raised 27 Oct 2026",
    status: "In progress",
    badgeClass: "badgeProgress",
  },
];

export default function ContactSection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [selectedTopic, setSelectedTopic] = useState("Order issue");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [toastMessage, setToastMessage] = useState("");
  const [showAllRequests, setShowAllRequests] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const displayName = user?.name || "Ananya Rao";
  const displayPhone = user?.phone || "+91 98XXX XXX10";
  const firstName = displayName.split(" ")[0];

  const getInitials = (name) => {
    if (!name) return "AR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleSelectTopicCard = (topicValue) => {
    setSelectedTopic(topicValue);
    const formEl = document.getElementById("raise-request-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
    showToast(`Selected topic: "${topicValue}"`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast("Please describe your issue so our team can help.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newReq = {
        id: `req-${Date.now()}`,
        title: `${selectedTopic}${orderId.trim() ? ` (Order #${orderId.trim()})` : ""}`,
        date: "Raised Just now",
        status: "In progress",
        badgeClass: "badgeProgress",
      };

      setRequests((prev) => [newReq, ...prev]);
      setOrderId("");
      setMessage("");
      setIsSubmitting(false);
      showToast("Request submitted successfully! Our support team will respond shortly.");
    }, 700);
  };

  const handleSignOut = () => {
    if (logout) logout();
    router.push("/signin");
  };

  return (
    <ProfileLayout>
      {/* Main Content */}
      <div className={s.main}>
        <div className={s.content}>
          <div className={s.topNav}>
            <button
              type="button"
              className={s.backBtn}
              onClick={() => router.back()}
              aria-label="Back"
            >
              <img src="/assets/back.svg" alt="" width="24" height="24" />
            </button>
            <div className={s.spacer} />
          </div>

          <h1 className={s.title}>Customer Service</h1>

          <section className={s.hero}>
            <small>We here for you</small>
            <h3>How can we help, {firstName}?</h3>
          </section>

          {/* Browse by Topic */}
          <section className={s.card}>
            <div className={s.cardHead}>
              <h2>Browse by Topic</h2>
            </div>
            <div className={s.topics}>
              {TOPICS.map((topic) => (
                <button
                  type="button"
                  key={topic.id}
                  className={`${s.topic} ${selectedTopic === topic.formValue ? s.topicSelected : ""}`}
                  onClick={() => handleSelectTopicCard(topic.formValue)}
                >
                  <img src={topic.icon} alt="" width="28" height="28" />
                  <strong>{topic.title}</strong>
                  <small>{topic.desc}</small>
                </button>
              ))}
            </div>
          </section>

          {/* Contact grid */}
          <section className={s.contactGrid}>
            <div className={s.card}>
              <h4>Chat with us</h4>
              <p>Every day, 8 am – 9 pm</p>
              <button
                type="button"
                className={s.btnOutline}
                onClick={() => showToast("Connecting to live chat support... Agent will join in ~1 min.")}
              >
                Start chat
              </button>
            </div>
            <div className={s.card}>
              <h4>Call us</h4>
              <p>+91 80 4710 9988</p>
              <a href="tel:+918047109988" className={s.btnOutline}>
                Call now
              </a>
            </div>
            <div className={s.card}>
              <h4>Email us</h4>
              <p>support@tiffexx.com</p>
              <a
                href="mailto:support@tiffexx.com?subject=Tiffexx%20Customer%20Support"
                className={s.btnOutline}
              >
                Send email
              </a>
            </div>
          </section>

          {/* Raise a Request */}
          <section className={s.card} id="raise-request-form">
            <div className={s.cardHead}>
              <h2>Raise a Request</h2>
            </div>
            <form className={s.form} onSubmit={handleFormSubmit}>
              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="order-id">Order ID (optional)</label>
                  <input
                    id="order-id"
                    type="text"
                    placeholder="TX-00000"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor="topic">Topic</label>
                  <select
                    id="topic"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    <option value="Order issue">Order issue</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Payments & refunds">Payments &amp; refunds</option>
                    <option value="Delivery">Delivery</option>
                    <option value="My account">My account</option>
                    <option value="Coupons & wallet">Coupons &amp; wallet</option>
                  </select>
                </div>
              </div>

              <div className={s.field}>
                <label htmlFor="msg">How can we help?</label>
                <textarea
                  id="msg"
                  placeholder="Please describe your query or issue with meal delivery, items, or subscription..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className={s.btnPrimary}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Search"}
                </button>
              </div>
            </form>
          </section>

          {/* Recent Requests */}
          <section className={s.card}>
            <div className={s.cardHead}>
              <h2>Your Recent Requests</h2>
              <button
                type="button"
                className={s.viewAll}
                onClick={() => {
                  setShowAllRequests((prev) => !prev);
                  showToast(showAllRequests ? "Showing recent requests" : "Showing all ticket history");
                }}
              >
                {showAllRequests ? "Show less" : "View all ›"}
              </button>
            </div>
            {requests.map((req) => (
              <div className={s.request} key={req.id}>
                <div>
                  <strong>{req.title}</strong>
                  <small>{req.date}</small>
                </div>
                <span className={`${s.badge} ${s[req.badgeClass] || s.badgeProgress}`}>
                  {req.status}
                </span>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section className={`${s.card} ${s.faq}`}>
            <div className={s.cardHead}>
              <h2>Frequently Asked Questions</h2>
            </div>
            <details>
              <summary>How do I get a refund for a wrong or missing item?</summary>
              <p>
                If any item in your order is missing or incorrect, please raise a request above with your Order ID or chat with our live support within 2 hours of delivery. Once verified, refunds are credited instantly to your Tiffexx Wallet or your original payment method within 2-4 business hours.
              </p>
            </details>
            <details>
              <summary>How do I pause or skip a subscription day?</summary>
              <p>
                You can pause or skip any delivery day directly from your My Subscription dashboard up to 7:00 PM on the preceding evening. Paused meals automatically roll over to extend your active subscription cycle at no extra cost.
              </p>
            </details>
            <details>
              <summary>Why was my payment deducted but the order not placed?</summary>
              <p>
                In rare cases of bank gateway timeouts, deducted funds are held by your issuing bank and automatically reconciled. If not reflected within 30 minutes, it will be refunded to your source account within 3–5 working days, or credited instantly to your Tiffexx Wallet.
              </p>
            </details>
            <details>
              <summary>How do I change my phone number or email?</summary>
              <p>
                Go to My Account &gt; My Profile to update your registered email address and primary phone number. For security, an OTP verification code will be sent to confirm ownership of the new contact details.
              </p>
            </details>
          </section>

          {/* Related Policies */}
          <section className={s.card}>
            <h2>Related Policies</h2>
            <div className={s.policies}>
              <Link href="/return-policy">Return Policy</Link>
              <Link href="/terms">Shipping &amp; Delivery</Link>
            </div>
          </section>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}
