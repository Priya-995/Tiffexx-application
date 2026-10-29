"use client";

import { useState } from "react";
import s from "./ReferralSection.module.css";

export default function ReferralSection() {
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const referralCode = "PRIYA50X";

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
    }
    setCopied(true);
    showToast(`Referral code ${referralCode} copied!`);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleShare = () => {
    const shareText = `Use my code ${referralCode} to get ₹50 off your first home-style tiffin subscription on Tiffexx! https://tiffexx.com/refer?code=${referralCode}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "Join Tiffexx & Get ₹50",
          text: shareText,
          url: "https://tiffexx.com",
        })
        .catch(() => {});
    } else {
      handleCopy();
      showToast("Share text copied! Paste it to your friends on WhatsApp or SMS.");
    }
  };

  return (
    <main className={s.main}>
      {toastMsg && (
        <div className={s.toast}>
          <span>🎁</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <div className={s.content}>
        {/* Promo card */}
        <aside className={s.promo}>
          <span className={s.promoBlob1} aria-hidden="true"></span>
          <div className={s.promoGift}>🎁</div>
          <h2 className={s.promoTitle}>Give ₹50, Get ₹50</h2>
          <p className={s.promoDesc}>
            Share your code — your friend gets ₹50 off,
            <br />
            you get ₹50 wallet credit when they order.
          </p>
          <div className={s.promoCode}>
            <b>{referralCode}</b>
            <button
              className={s.promoCopy}
              type="button"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <span className={s.promoBlob2} aria-hidden="true"></span>
          <button
            className={s.promoShare}
            type="button"
            onClick={handleShare}
          >
            Share Code
          </button>
        </aside>

        {/* Right column */}
        <section className={s.col}>
          <h3 className={s.label}>How it works</h3>
          <div className={s.steps}>
            <div className={s.step}>
              <span className={s.stepNum} style={{ background: "#fbe7ec", color: "#9c3555" }}>
                1
              </span>
              <h3>Share your code</h3>
              <p>
                Send your unique code to
                <br />
                friends via WhatsApp, SMS or social.
              </p>
            </div>
            <div className={s.step}>
              <span className={s.stepNum} style={{ background: "#fbf0dc", color: "#8a5a10" }}>
                2
              </span>
              <h3>Friend signs up &amp; orders</h3>
              <p>They get ₹50 off their first tiffin order.</p>
            </div>
            <div className={s.step}>
              <span className={s.stepNum} style={{ background: "#e6f1e1", color: "#2f6b3a" }}>
                3
              </span>
              <h3>You both get rewarded</h3>
              <p>
                ₹50 wallet credit lands in your
                <br />
                account instantly.
              </p>
            </div>
          </div>

          <h3 className={`${s.label} ${s.labelHist}`}>Referral history</h3>
          <div className={s.history}>
            <div className={s.hrow}>
              <span className={s.hrowAv}>R</span>
              <div className={s.hrowWho}>
                <span className={s.hrowName}>Ruhi S.</span>
                <span className={s.hrowDate}>18 Jul 2025</span>
              </div>
              <span className={`${s.pill} ${s.pillGreen}`}>Reward credited</span>
            </div>
            <div className={s.hrow}>
              <span className={s.hrowAv}>A</span>
              <div className={s.hrowWho}>
                <span className={s.hrowName}>Aastha M.</span>
                <span className={s.hrowDate}>12 Jul 2025</span>
              </div>
              <span className={`${s.pill} ${s.pillAmber}`}>First order placed</span>
            </div>
            <div className={s.hrow}>
              <span className={s.hrowAv}>K</span>
              <div className={s.hrowWho}>
                <span className={s.hrowName}>Kanak P.</span>
                <span className={s.hrowDate}>5 Jul 2025</span>
              </div>
              <span className={`${s.pill} ${s.pillGrey}`}>Signed up</span>
            </div>
            <div className={s.hrow}>
              <span className={s.hrowAv}>N</span>
              <div className={s.hrowWho}>
                <span className={s.hrowName}>Nitin R.</span>
                <span className={s.hrowDate}>1 Jul 2025</span>
              </div>
              <span className={`${s.pill} ${s.pillFaint}`}>Invited</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
