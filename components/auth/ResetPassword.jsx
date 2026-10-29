"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = searchParams.get("step");
  const initialEmail = searchParams.get("email");

  const [step, setStep] = useState(initialStep === "sent" ? "sent" : "input");
  const [identifier, setIdentifier] = useState(initialEmail || "");
  const [toastMessage, setToastMessage] = useState("");
  const [resendSeconds, setResendSeconds] = useState(28);

  useEffect(() => {
    let interval = null;
    if (step === "sent" && resendSeconds > 0) {
      interval = setInterval(() => {
        setResendSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendSeconds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const trimmed = identifier.trim();
    if (!trimmed) {
      showToast("Please enter your registered email or mobile number.");
      return;
    }

    setStep("sent");
    setResendSeconds(28);
    showToast(`Password reset link sent to ${trimmed}!`);
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (resendSeconds > 0) return;
    setResendSeconds(28);
    showToast(`New reset link sent to ${identifier || "your email"}!`);
  };

  const formatTimer = (sec) => {
    const s = sec < 10 ? `0${sec}` : sec;
    return `00:${s}`;
  };

  return (
    <div className="reset-page page">
      {toastMessage && (
        <div className="auth-toast" role="alert">
          {toastMessage}
        </div>
      )}

      {/* Back button */}
      <div className="back">
        {step === "sent" ? (
          <button
            type="button"
            onClick={() => setStep("input")}
            aria-label="Back to Reset Password"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <img src="/assets/icon-back.svg" alt="Back" width="24" height="24" />
          </button>
        ) : (
          <Link href="/signin" aria-label="Back to Sign In">
            <img src="/assets/icon-back.svg" alt="Back" width="24" height="24" />
          </Link>
        )}
      </div>

      <div className="card">
        {/* ========== LEFT: brand panel ========== */}
        <section className="hero">
          <div className="hero__nav">
            <ul className="hero__links">
              <li>
                <Link href="/kitchens">Kitchens</Link>
              </li>
              <li>
                <Link href="/cart">Subscriptions</Link>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Tiffexx: Fresh, authentic homemade meals.");
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Customer support: support@tiffexx.com");
                  }}
                >
                  Help
                </a>
              </li>
            </ul>
            <Link className="hero__signup" href="/signup">
              Sign Up
            </Link>
          </div>

          <div className="hero__art">
            <img
              src="/assets/hero-illustration.png"
              alt="Fresh meals delivered daily"
            />
          </div>

          <div className="hero__copy">
            <h1>
              Fresh Meals
              <br />
              <span>Delivered Daily</span>
            </h1>
            <p>
              Subscribe to homemade meals from trusted local
              <br />
              kitchens — breakfast, lunch &amp; dinner, right at your door.
            </p>
          </div>

          <div className="hero__app">
            <div className="app-card">
              <img className="app-card__qr" src="/assets/qr.png" alt="QR code" />
              <div className="app-card__text">
                <p className="app-card__title">Get the Tiffexx app</p>
                <p className="app-card__sub">Scan to download</p>
              </div>
              <span className="app-card__arrow">
                <span>↗</span>
              </span>
            </div>
          </div>
        </section>

        {/* ========== RIGHT: reset / confirmation form ========== */}
        <section className="form-wrap">
          {step === "sent" ? (
            /* Screen 2: Check your email Confirmation */
            <div className="form">
              <div className="form__logo">
                <Link href="/">
                  <img
                    src="/assets/logo.png"
                    alt="Tiffexx"
                    style={{ width: "181px", height: "44px", objectFit: "contain" }}
                  />
                </Link>
              </div>
              <h2 className="form__title">Check your email</h2>
              <p className="form__sub">
                We&apos;ve sent a reset link to {identifier || "you@example.com"}
              </p>

              <div className="resend">
                <p>
                  Didn’t recieve the link?{" "}
                  {resendSeconds > 0 ? (
                    <span style={{ color: "var(--heath)", fontWeight: 700 }}>
                      Resend in {formatTimer(resendSeconds)}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      style={{
                        color: "var(--heath)",
                        fontWeight: 700,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Resend link
                    </button>
                  )}
                </p>
              </div>

              <div className="spacer"></div>

              <p className="switch" style={{ marginTop: "12px" }}>
                Back to <Link href="/signin">Sign In</Link>
              </p>
            </div>
          ) : (
            /* Screen 1: Reset Password Input Form */
            <form className="form" onSubmit={handleResetSubmit}>
              <div className="form__logo">
                <Link href="/">
                  <img
                    src="/assets/logo.png"
                    alt="Tiffexx"
                    style={{ width: "181px", height: "44px", objectFit: "contain" }}
                  />
                </Link>
              </div>
              <h2 className="form__title">Reset Your Password</h2>
              <p className="form__sub">Enter your account email to get a reset link.</p>

              <div className="group group--first">
                <label htmlFor="id">Email or Mobile</label>
                <input
                  id="id"
                  className="input"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="priya9nk@gmail.com"
                  required
                />
              </div>

              <div className="spacer"></div>

              <button className="submit" type="submit">
                Sent Resent Link
              </button>

              <p className="switch" style={{ marginTop: "18px" }}>
                Remember your password? <Link href="/signin">Sign In</Link>
              </p>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

