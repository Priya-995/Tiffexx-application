"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");

  const [step, setStep] = useState(initialRole === "customer" ? "customer_form" : "role");
  const [selectedRole, setSelectedRole] = useState(initialRole || null);
  const [toastMessage, setToastMessage] = useState("");

  // Customer form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(true);

  useEffect(() => {
    if (initialRole === "customer") {
      setStep("customer_form");
      setSelectedRole("Customer");
    }
  }, [initialRole]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleRoleSelect = (roleName) => {
    setSelectedRole(roleName);
    if (roleName === "Customer") {
      setStep("customer_form");
    } else {
      showToast(`${roleName} onboarding portal is opening soon!`);
    }
  };

  const handleCopyReferral = () => {
    if (referralCode) {
      navigator.clipboard?.writeText(referralCode);
      showToast("Referral code copied to clipboard!");
    } else {
      showToast("Enter a referral code first.");
    }
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      showToast("Please enter your first and last name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      showToast("Password must be at least 6 characters.");
      return;
    }
    if (!agreedTerms) {
      showToast("Please agree to the Terms and Privacy Notice.");
      return;
    }

    showToast("Account created successfully! Welcome to Tiffexx.");
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="signup-page page">
      {toastMessage && (
        <div className="auth-toast" role="alert">
          {toastMessage}
        </div>
      )}

      {/* Back button */}
      <div className="back">
        {step === "customer_form" ? (
          <button
            type="button"
            onClick={() => setStep("role")}
            aria-label="Back to Who are You"
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
          {step === "role" && (
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
              <Link className="hero__signup" href="/signin">
                Sign In
              </Link>
            </div>
          )}

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

        {/* ========== RIGHT: Dynamic Form / Role Picker ========== */}
        <section className="form-wrap">
          {step === "role" ? (
            /* Screen 1: Who Are You */
            <div className="who">
              <div className="who__logo">
                <Link href="/">
                  <img src="/assets/logo.png" alt="Tiffexx" />
                </Link>
              </div>
              <h2 className="who__title">Who are You ?</h2>
              <div className="who__spacer"></div>

              <div className="roles">
                <button
                  className={`role ${selectedRole === "Customer" ? "is-active" : ""}`}
                  type="button"
                  onClick={() => handleRoleSelect("Customer")}
                >
                  <img
                    src="/assets/role-customer.png"
                    alt="Customer"
                    width="120"
                    height="120"
                  />
                  <span>Customer</span>
                </button>

                <button
                  className={`role ${selectedRole === "Tiffexx Chef" ? "is-active" : ""}`}
                  type="button"
                  onClick={() => handleRoleSelect("Tiffexx Chef")}
                >
                  <img
                    src="/assets/role-chef.png"
                    alt="Tiffexx Chef"
                    width="120"
                    height="120"
                  />
                  <span>Tiffexx Chef</span>
                </button>

                <button
                  className={`role ${selectedRole === "Delivery Partner" ? "is-active" : ""}`}
                  type="button"
                  onClick={() => handleRoleSelect("Delivery Partner")}
                >
                  <img
                    src="/assets/role-delivery.png"
                    alt="Delivery Partner"
                    width="120"
                    height="120"
                  />
                  <span>Delivery Partner</span>
                </button>
              </div>

              <div className="who__foot"></div>
            </div>
          ) : (
            /* Screen 2: Customer Account Creation Form */
            <form className="form" onSubmit={handleCustomerSubmit}>
              <div className="form__logo">
                <Link href="/">
                  <img
                    src="/assets/logo.png"
                    alt="Tiffexx"
                    style={{ width: "181px", height: "44px", objectFit: "contain" }}
                  />
                </Link>
              </div>
              <h2 className="form__title">Create your account</h2>
              <p className="form__sub">Start your daily Meal plan</p>

              <div className="names">
                <div className="group">
                  <label htmlFor="fn">First Name</label>
                  <input
                    id="fn"
                    className="input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="ln">Last Name</label>
                  <input
                    id="ln"
                    className="input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="group group--first">
                <label htmlFor="em">Email</label>
                <input
                  id="em"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="group">
                <label htmlFor="pw">Password</label>
                <input
                  id="pw"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="group">
                <label htmlFor="ref">+ Have a referral code? (optional)</label>
                <div className="input-wrap">
                  <input
                    id="ref"
                    className="input"
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Enter referral code"
                  />
                  <button
                    type="button"
                    className="copy"
                    aria-label="Copy Referral Code"
                    onClick={handleCopyReferral}
                  >
                    <img src="/assets/icon-copy.svg" alt="Copy" />
                  </button>
                </div>
              </div>

              <label
                className="terms"
                onClick={() => setAgreedTerms(!agreedTerms)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={agreedTerms ? "/assets/icon-checkbox.svg" : "/assets/icon-checkbox.svg"}
                  alt="Checkbox"
                  style={{ opacity: agreedTerms ? 1 : 0.4 }}
                />
                <p>
                  By signing up, you agree to <b>Terms</b> and <b>Privacy Notice.</b>
                </p>
              </label>

              <div className="forgot">
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Password reset link sent to your registered email.");
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button className="submit" type="submit">
                Sign Up
              </button>
              <div className="foot"></div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

