"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SpinWheel from "./SpinWheel";
import SpinModal from "./SpinModal";
import { WHEEL_SEGMENTS, RECENT_WINNERS } from "@/lib/playzone";
import { getStoredWalletBalance, getSpinState } from "@/lib/wallet";

export default function PlayZonePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [balance, setBalance] = useState(350);
  const [spinState, setSpinState] = useState({
    spinsAvailable: 1,
    streakDays: 3,
    prizeHistory: [],
  });

  useEffect(() => {
    setBalance(getStoredWalletBalance());
    setSpinState(getSpinState());

    const onWalletUpdate = (e) => {
      if (e.detail?.balance !== undefined) setBalance(e.detail.balance);
    };
    const onSpinUpdate = (e) => {
      if (e.detail) setSpinState(e.detail);
    };

    window.addEventListener("tiffexx:wallet-updated", onWalletUpdate);
    window.addEventListener("tiffexx:spin-state-updated", onSpinUpdate);

    return () => {
      window.removeEventListener("tiffexx:wallet-updated", onWalletUpdate);
      window.removeEventListener("tiffexx:spin-state-updated", onSpinUpdate);
    };
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px 80px" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: "14px", color: "var(--sand)", marginBottom: "20px" }}>
        <Link href="/" style={{ color: "var(--sand)" }}>Home</Link> / <b>Play Zone</b>
      </div>

      {/* Hero header */}
      <div
        style={{
          background: "linear-gradient(135deg, #fffdfa 0%, #fbf3e9 50%, #f7ece1 100%)",
          border: "1px solid var(--orange-88)",
          borderRadius: "24px",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "40px",
          alignItems: "center",
          marginBottom: "40px",
          boxShadow: "0 8px 24px rgba(74, 20, 16, 0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            width: "260px",
            height: "260px",
            background: "#f2a8b8",
            opacity: 0.25,
            borderRadius: "50%",
            left: "-80px",
            bottom: "-80px",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: "#d6f25c",
            opacity: 0.35,
            borderRadius: "50%",
            right: "-40px",
            top: "-40px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              background: "#faeee4",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--maroon)",
              marginBottom: "16px",
            }}
          >
            <span>🎮</span>
            <span>TIFFEXX GAMIFIED REWARDS</span>
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "var(--red-18)",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Play Zone: Spin &amp; Win Daily Tiffin Rewards!
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "var(--grey-34)",
              lineHeight: 1.6,
              marginBottom: "24px",
              maxWidth: "540px",
            }}
          >
            Every 24 hours you get 1 free lucky spin. Win wallet cash credited instantly to your account, 5% off subscription vouchers, or free meal add-ons.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                background: "var(--maroon)",
                borderRadius: "14px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 700,
                border: 0,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(89, 26, 17, 0.28)",
              }}
            >
              <span>🎯</span>
              <span>Spin the Wheel Now</span>
            </button>
            <Link
              href="/wallet"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 24px",
                background: "#ffffff",
                border: "1px solid var(--orange-88)",
                borderRadius: "14px",
                color: "var(--grey-10)",
                fontSize: "14.5px",
                fontWeight: 600,
              }}
            >
              <span>🪙 Wallet Balance: ₹{balance.toFixed(2)}</span>
            </Link>
          </div>
        </div>

        {/* Live Wheel Preview Stage */}
        <div
          onClick={() => setModalOpen(true)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              background: "radial-gradient(circle, #ffffff 0%, rgba(251, 240, 220, 0.5) 70%, transparent 100%)",
              padding: "24px",
              borderRadius: "50%",
            }}
          >
            <SpinWheel isSpinning={false} rotation={15} onHubClick={() => setModalOpen(true)} />
          </div>
          <p style={{ marginTop: "12px", fontSize: "13px", fontWeight: 600, color: "var(--sand)" }}>
            Tap the wheel to spin &amp; claim today&apos;s prize!
          </p>
        </div>
      </div>

      {/* Grid: 7-Day Streak & Prize Catalog */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px",
          marginBottom: "40px",
        }}
      >
        {/* Streak card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--orange-88)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--red-18)" }}>
              🔥 7-Day Check-in Streak
            </h3>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#2f6b3a",
                background: "#e6f1e1",
                padding: "3px 10px",
                borderRadius: "999px",
              }}
            >
              Day {spinState.streakDays || 3} of 7 Active
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "var(--grey-34)", marginBottom: "20px" }}>
            Spin daily without skipping to level up your rewards. Reaching Day 7 unlocks a guaranteed ₹50 jackpot spin!
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {daysOfWeek.map((day, idx) => {
              const isDone = idx < (spinState.streakDays || 3);
              const isToday = idx === (spinState.streakDays || 3) - 1;
              return (
                <div
                  key={day}
                  style={{
                    padding: "12px 6px",
                    textAlign: "center",
                    borderRadius: "12px",
                    background: isToday ? "var(--maroon)" : isDone ? "#faeee4" : "#fbf6ec",
                    color: isToday ? "#ffffff" : isDone ? "var(--maroon)" : "var(--sand)",
                    border: isToday ? "1px solid var(--maroon)" : "1px solid var(--orange-88)",
                  }}
                >
                  <div style={{ fontSize: "11px", fontWeight: 600 }}>{day}</div>
                  <div style={{ fontSize: "14px", marginTop: "4px" }}>
                    {isDone ? "✓" : `+${(idx + 1) * 5}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prize Catalog */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--orange-88)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--red-18)", marginBottom: "16px" }}>
            🎁 Wheel Prize Breakdown
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {WHEEL_SEGMENTS.map((seg) => (
              <div
                key={seg.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  background: "#fbf6ec",
                  border: "1px solid var(--orange-88)",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: seg.bgColor,
                    color: seg.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {seg.label}
                </span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--grey-10)" }}>{seg.label}</div>
                  <div style={{ fontSize: "11px", color: "var(--sand)" }}>{seg.type === "cash" ? "Instant Cash" : seg.type === "coupon" ? "Discount Deal" : seg.type === "again" ? "Extra Chance" : "Try Again"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Winners */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid var(--orange-88)",
          borderRadius: "20px",
          padding: "24px 28px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--grey-10)", marginBottom: "14px" }}>
          🏆 Community Winners This Hour
        </h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {RECENT_WINNERS.map((w, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 14px",
                borderRadius: "12px",
                background: "#fbf6ec",
                border: "1px solid var(--orange-88)",
                fontSize: "12.5px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: w.color,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "11px",
                }}
              >
                {w.avatar}
              </div>
              <div>
                <b>{w.name}</b> ({w.location}) won <span style={{ color: "var(--maroon)", fontWeight: 700 }}>{w.prize}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <SpinModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRewardClaimed={() => {
          setBalance(getStoredWalletBalance());
        }}
      />
    </main>
  );
}
