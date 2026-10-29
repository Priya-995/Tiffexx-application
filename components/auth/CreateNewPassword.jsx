"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateNewPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      showToast("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match. Please try again.");
      return;
    }

    setIsSuccess(true);
    showToast("Password updated successfully! Redirecting to Sign In...");
    setTimeout(() => {
      router.push("/signin");
    }, 1500);
  };

  return (
    <div className="newpw-page page">
      {toastMessage && (
        <div className="auth-toast" role="alert">
          {toastMessage}
        </div>
      )}

      {/* Back button */}
      <div className="back">
        <Link href="/reset-password" aria-label="Back to Reset Password">
          <img src="/assets/icon-back.svg" alt="Back" width="24" height="24" />
        </Link>
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

        {/* ========== RIGHT: new password form ========== */}
        <section className="form-wrap">
          <form className="form" onSubmit={handlePasswordReset}>
            <div className="form__logo">
              <Link href="/">
                <img
                  src="/assets/logo.png"
                  alt="Tiffexx"
                  style={{ width: "181px", height: "44px", objectFit: "contain" }}
                />
              </Link>
            </div>
            <h2 className="form__title">Create New Password</h2>
            <p className="form__sub">Create your New Password</p>

            <div className="group group--first">
              <label htmlFor="pw1">New Password</label>
              <input
                id="pw1"
                className="input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="pw2">Confirm Password</label>
              <input
                id="pw2"
                className="input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <p className="hint">
              <span>Weak Passwords must contain 1 lowercase ,1 uppercase ,</span>
              <span>1 number and atleast 8 characters</span>
            </p>

            <div className="spacer"></div>

            <button className="submit" type="submit">
              {isSuccess ? "Password Updated ✓" : "Reset Password"}
            </button>
            <div className="foot"></div>
          </form>
        </section>
      </div>
    </div>
  );
}
