"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "./ProfileLayout";
import s from "./ProfileSection.module.css";

export default function ProfileSection() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  // User Profile Data & Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Ananya Rao",
    email: user?.email || "ananya.rao@example.com",
    phone: user?.phone || "+91 98XXX XXX10",
    dob: "14 July 1994",
    gender: "Female",
    password: "••••••••••",
  });

  // Edit form buffer
  const [editForm, setEditForm] = useState({ ...profileData });

  // Preferences States
  const [prefs, setPrefs] = useState({
    whatsapp: true,
    emailOffers: false,
    savePayment: true,
  });

  // Linked Accounts
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const getInitials = (name) => {
    if (!name) return "AR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setIsEditing(false);
    showToast("✓ Profile information updated successfully!");
  };

  const handleSignOut = () => {
    if (logout) logout();
    showToast("Signed out successfully");
    setTimeout(() => {
      router.push("/signin");
    }, 600);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your Tiffexx account? This action cannot be undone.");
    if (confirmDelete) {
      if (logout) logout();
      showToast("Your account has been deleted");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const currentInitials = getInitials(profileData.name);

  return (
    <ProfileLayout>
      {/* Main content */}
      <div className={s.main}>
        <header className={s.main__header}>
          <button
            type="button"
            className={s.back}
            aria-label="Go back"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
          >
            <img src="/assets/back.svg" width="24" height="24" alt="" />
          </button>
          <h1 className={s.main__title}>MY PROFILE</h1>
        </header>

        {/* Profile summary */}
        <section className={s.summary} aria-label="Profile summary">
          <div className={s.summary__who}>
            <div className={`${s.avatar} ${s["avatar--lg"]}`} aria-hidden="true">
              {currentInitials}
            </div>
            <div className={s.summary__text}>
              <p className={s.summary__welcome}>Welcome back</p>
              <p className={s.summary__name}>{profileData.name}</p>
              <p className={s.summary__since}>Member since March 2024</p>
            </div>
          </div>
          <dl className={s.stats}>
            <div className={s.stat}>
              <dt className={s.stat__label}>Orders</dt>
              <dd className={s.stat__value}>12</dd>
            </div>
            <div className={s.stat}>
              <dt className={s.stat__label}>Coupons</dt>
              <dd className={s.stat__value}>3</dd>
            </div>
            <div className={s.stat}>
              <dt className={s.stat__label}>Wallet</dt>
              <dd className={s.stat__value}>₹25</dd>
            </div>
          </dl>
        </section>

        {/* Personal information */}
        <section className={s.card}>
          <div className={s.card__head}>
            <h2 className={s.card__title}>Personal Information</h2>
            <button
              type="button"
              className={`${s.btn} ${s["btn--outline"]}`}
              onClick={() => {
                setEditForm({ ...profileData });
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          <hr className={s.divider} />

          {isEditing ? (
            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>Full name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--sand-85)", font: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>Email address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--sand-85)", font: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>Mobile number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--sand-85)", font: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>Date of birth</label>
                  <input
                    type="text"
                    value={editForm.dob}
                    onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--sand-85)", font: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--ink-3)", display: "block", marginBottom: 4 }}>Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--sand-85)", font: "inherit", background: "#fff" }}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 24px",
                    background: "var(--maroon)",
                    color: "#fff",
                    borderRadius: 8,
                    border: 0,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: "10px 18px",
                    background: "transparent",
                    color: "var(--ink-3)",
                    borderRadius: 8,
                    border: "1px solid var(--sand-85)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <dl className={s.fields}>
              <div className={`${s.field} ${s["field--grow"]}`}>
                <dt>Full name</dt>
                <dd>{profileData.name}</dd>
              </div>
              <div className={`${s.field} ${s["field--email"]}`}>
                <dt>Email address</dt>
                <dd className={s.jakarta}>{profileData.email}</dd>
              </div>
              <div className={`${s.field} ${s["field--mobile"]}`}>
                <dt>Mobile number</dt>
                <dd className={s.jakarta}>{profileData.phone} · Verified</dd>
              </div>
              <div className={`${s.field} ${s["field--grow"]}`}>
                <dt>Date of birth</dt>
                <dd>{profileData.dob}</dd>
              </div>
              <div className={`${s.field} ${s["field--grow"]}`}>
                <dt>Gender</dt>
                <dd>{profileData.gender}</dd>
              </div>
              <div className={`${s.field} ${s["field--grow"]}`}>
                <dt>Password</dt>
                <dd>{profileData.password}</dd>
              </div>
            </dl>
          )}
        </section>

        {/* Saved addresses */}
        <section className={s.card} id="addresses-card">
          <div className={s.card__head}>
            <h2 className={`${s.card__title} ${s["card__title--jakarta"]}`}>Saved Addresses</h2>
            <button
              type="button"
              className={s["link-small"]}
              style={{ background: "none", border: 0, padding: 0 }}
              onClick={() => showToast("Opening address manager")}
            >
              Manage addresses ›
            </button>
          </div>
          <hr className={s.divider} />
          <div className={s.addresses}>
            <article className={s.address}>
              <h3 className={s.address__label}>Home</h3>
              <p className={s.address__text}>Flat 4B, Sunrise Apartments, Sector 50, Noida – 201301</p>
              <span className={s.badge}>Default</span>
            </article>
            <article className={s.address}>
              <h3 className={s.address__label}>Work</h3>
              <p className={s.address__text}>
                H-Block, Sector - 63, Noida – 201307
              </p>
            </article>
          </div>
        </section>

        {/* Preferences */}
        <section className={`${s.card} ${s["card--prefs"]}`}>
          <h2 className={`${s.card__title} ${s["card__title--jakarta"]} ${s.prefs__title}`}>Preferences</h2>
          <hr className={s.divider} />
          <label className={s.pref}>
            <span>Order updates on WhatsApp and SMS</span>
            <input
              type="checkbox"
              checked={prefs.whatsapp}
              onChange={(e) => {
                setPrefs({ ...prefs, whatsapp: e.target.checked });
                showToast(e.target.checked ? "✓ WhatsApp updates enabled" : "WhatsApp updates disabled");
              }}
            />
          </label>
          <label className={s.pref}>
            <span>Offers and coupons by email</span>
            <input
              type="checkbox"
              checked={prefs.emailOffers}
              onChange={(e) => {
                setPrefs({ ...prefs, emailOffers: e.target.checked });
                showToast(e.target.checked ? "✓ Email offers enabled" : "Email offers disabled");
              }}
            />
          </label>
          <label className={s.pref}>
            <span>Save my payment preference for faster checkout</span>
            <input
              type="checkbox"
              checked={prefs.savePayment}
              onChange={(e) => {
                setPrefs({ ...prefs, savePayment: e.target.checked });
                showToast(e.target.checked ? "✓ Payment preference saved" : "Payment preference removed");
              }}
            />
          </label>
        </section>

        {/* Linked accounts + contact */}
        <div className={s.bottom}>
          <section className={`${s.card} ${s["card--compact"]}`}>
            <h2 className={s.card__subtitle}>Linked Accounts</h2>
            <div className={s.linked}>
              <span>Google</span>
              <button
                type="button"
                className={`${s.btn} ${s["btn--text"]}`}
                onClick={() => {
                  setGoogleConnected(!googleConnected);
                  showToast(!googleConnected ? "Google account connected" : "Google account disconnected");
                }}
              >
                {googleConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
            <div className={s.linked}>
              <span>Apple</span>
              <button
                type="button"
                className={`${s.btn} ${s["btn--text"]}`}
                onClick={() => {
                  setAppleConnected(!appleConnected);
                  showToast(!appleConnected ? "Apple account connected" : "Apple account disconnected");
                }}
              >
                {appleConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
          </section>

          <section className={`${s.card} ${s["card--compact"]} ${s["card--contact"]}`}>
            <h2 className={s.card__subtitle}>Contact Us</h2>
            <div className={s["contact-links"]}>
              <Link href="/terms">TERMS &amp; CONDITIONS</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">HELP &amp; SUPPORT</Link>
            </div>
            <button
              type="button"
              className={`${s.btn} ${s["btn--danger"]}`}
              onClick={handleDeleteAccount}
            >
              Delete My Account
            </button>
          </section>
        </div>
      </div>

      {/* Interactive feedback toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}
