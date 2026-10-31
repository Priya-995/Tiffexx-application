"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { setStoredUser } from "@/lib/auth";

export default function SignIn({ initialMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/";
  const modeParam = searchParams.get("mode");
  const [authMode, setAuthMode] = useState("password"); // "password" | "otp"
  const [isSignUp, setIsSignUp] = useState(
    initialMode === "signup" || modeParam === "signup"
  );

  useEffect(() => {
    if (initialMode === "signup" || searchParams.get("mode") === "signup") {
      setIsSignUp(true);
    } else if (initialMode === "signin" || searchParams.get("mode") === "signin") {
      setIsSignUp(false);
    }
  }, [initialMode, searchParams]);
  
  // Password mode state
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP mode state
  const [otpPhone, setOtpPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // Sign up state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = () => {
    if (!otpPhone.trim()) {
      showToast("Please enter a valid mobile number.");
      return;
    }
    setOtpSent(true);
    setTimer(30);
    showToast(`OTP sent successfully to ${otpPhone}`);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (!signupName || !signupEmail || !signupPhone || !signupPassword) {
        showToast("Please fill in all registration fields.");
        return;
      }
      setStoredUser({
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        role: "Customer"
      });
      showToast("Account created successfully! Welcome to Tiffexx.");
      setTimeout(() => router.push(redirectTarget), 1200);
      return;
    }

    if (authMode === "password") {
      if (!identifier || !password) {
        showToast("Please enter your email/mobile and password.");
        return;
      }
      const isEmail = identifier.includes("@");
      const nameFromId = isEmail
        ? identifier.split("@")[0].charAt(0).toUpperCase() + identifier.split("@")[0].slice(1)
        : "Rohit Kumar";
      setStoredUser({
        name: nameFromId,
        email: isEmail ? identifier : "rohit.k@tiffexx.com",
        phone: isEmail ? "+91 98765 43210" : identifier,
        role: "Customer"
      });
      showToast("Signed in successfully! Welcome back.");
      setTimeout(() => router.push(redirectTarget), 1200);
    } else {
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      const fullOtp = otpCode.join("");
      if (fullOtp.length < 6) {
        showToast("Please enter the complete 6-digit OTP.");
        return;
      }
      setStoredUser({
        name: "Rohit Kumar",
        phone: otpPhone || "+91 98765 43210",
        email: "rohit.k@tiffexx.com",
        role: "Customer"
      });
      showToast("OTP verified successfully! Welcome back.");
      setTimeout(() => router.push(redirectTarget), 1200);
    }
  };

  return (
    <div className="auth-page">
      {toastMessage && (
        <div className="auth-toast" role="alert">
          {toastMessage}
        </div>
      )}

      <div className="auth-card card">
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
                <a href="#about" onClick={(e) => { e.preventDefault(); showToast("Tiffexx: Fresh, authentic homemade meals."); }}>About</a>
              </li>
              <li>
                <a href="#help" onClick={(e) => { e.preventDefault(); showToast("Customer support: support@tiffexx.com"); }}>Help</a>
              </li>
            </ul>
            <button
              type="button"
              className="hero__signup"
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="hero__art">
            <img src="/assets/hero-illustration.png" alt="Fresh meals delivered daily" />
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

        {/* ========== RIGHT: form ========== */}
        <section className="form-wrap">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__logo">
              <Link href="/">
                <img src="/assets/logo.png" alt="Tiffexx" />
              </Link>
            </div>

            <h2 className="form__title">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="form__sub">
              {isSignUp
                ? "Start receiving authentic, hot tiffins every day."
                : "Sign in to keep your tiffins coming."}
            </p>

            {!isSignUp && (
              <div className="tabs" role="tablist">
                <button
                  type="button"
                  className={`tab ${authMode === "otp" ? "is-active" : ""}`}
                  role="tab"
                  aria-selected={authMode === "otp"}
                  onClick={() => setAuthMode("otp")}
                >
                  Login With OTP
                </button>
                <button
                  type="button"
                  className={`tab ${authMode === "password" ? "is-active" : ""}`}
                  role="tab"
                  aria-selected={authMode === "password"}
                  onClick={() => setAuthMode("password")}
                >
                  Password
                </button>
              </div>
            )}

            {/* PASSWORD TAB CONTENT */}
            {!isSignUp && authMode === "password" && (
              <>
                <div className="group group--first">
                  <label htmlFor="id">Email or Mobile</label>
                  <input
                    id="id"
                    className="input"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder=""
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
                    placeholder="••••••••••"
                    required
                  />
                </div>

                <div className="forgot">
                  <Link href="/reset-password">
                    Forgot password?
                  </Link>
                </div>

                <button className="submit" type="submit">
                  Sign in
                </button>
              </>
            )}

            {/* OTP TAB CONTENT */}
            {!isSignUp && authMode === "otp" && (
              <>
                <div className="group group--first">
                  <label htmlFor="otp-phone">Mobile Number</label>
                  <div className="phone-input-wrap">
                    <input
                      id="otp-phone"
                      className="input"
                      type="tel"
                      value={otpPhone}
                      onChange={(e) => setOtpPhone(e.target.value)}
                      placeholder="+91 Mobile number"
                      required
                    />
                    {!otpSent && (
                      <button
                        type="button"
                        className="btn-send-otp"
                        onClick={handleSendOtp}
                      >
                        Get OTP
                      </button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div className="group">
                    <div className="otp-head">
                      <label>Enter 6-Digit OTP</label>
                      <button
                        type="button"
                        className="resend-link"
                        disabled={timer > 0}
                        onClick={handleSendOtp}
                      >
                        {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                      </button>
                    </div>
                    <div className="otp-boxes">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-digit-${idx}`}
                          className="otp-digit"
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="forgot" style={{ minHeight: "24px" }}></div>

                <button className="submit" type="submit">
                  {otpSent ? "Verify & Sign In" : "Get OTP"}
                </button>
              </>
            )}

            {/* SIGN UP FORM */}
            {isSignUp && (
              <>
                <div className="group group--first">
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    id="signup-name"
                    className="input"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Aditi Mukherjee"
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="signup-email">Email Address</label>
                  <input
                    id="signup-email"
                    className="input"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="aditi@example.com"
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="signup-phone">Mobile Number</label>
                  <input
                    id="signup-phone"
                    className="input"
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="signup-pw">Create Password</label>
                  <input
                    id="signup-pw"
                    className="input"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                  />
                </div>

                <div className="forgot" style={{ minHeight: "16px" }}></div>

                <button className="submit" type="submit">
                  Create Account
                </button>
              </>
            )}

            <p className="switch">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="switch-link"
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="switch-link"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
