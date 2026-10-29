"use client";

import { useState, useEffect } from "react";
import SpinWheel from "@/components/playzone/SpinWheel";
import SpinModal from "@/components/playzone/SpinModal";
import { RECENT_WINNERS } from "@/lib/playzone";
import { getStoredWalletBalance, getSpinState } from "@/lib/wallet";
import s from "./PlayZone.module.css";

export default function PlayZone() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(0);
  const [spinState, setSpinState] = useState({ spinsAvailable: 1, streakDays: 3 });
  const [walletBalance, setWalletBalance] = useState(350);

  useEffect(() => {
    setSpinState(getSpinState());
    setWalletBalance(getStoredWalletBalance());

    const onWalletUpdate = (e) => {
      if (e.detail?.balance !== undefined) setWalletBalance(e.detail.balance);
    };
    const onSpinUpdate = (e) => {
      if (e.detail) setSpinState(e.detail);
    };

    window.addEventListener("tiffexx:wallet-updated", onWalletUpdate);
    window.addEventListener("tiffexx:spin-state-updated", onSpinUpdate);

    // Winner ticker rotation
    const tickerInterval = setInterval(() => {
      setWinnerIndex((prev) => (prev + 1) % RECENT_WINNERS.length);
    }, 3800);

    return () => {
      window.removeEventListener("tiffexx:wallet-updated", onWalletUpdate);
      window.removeEventListener("tiffexx:spin-state-updated", onSpinUpdate);
      clearInterval(tickerInterval);
    };
  }, []);

  const activeWinner = RECENT_WINNERS[winnerIndex];

  return (
    <section className={s.playzone} aria-labelledby="playzone-title" id="playzone">
      <div className={s.head}>
        <div>
          <p className={s.kicker}>Play Zone &amp; Daily Rewards</p>
          <h2 id="playzone-title" className={s.title}>
            Spin the Wheel &amp; Win Every Day
          </h2>
          <p className={s.subtitle}>
            Win wallet cash, discounts on lunch/dinner subscriptions, or free meals. 1 free spin every 24 hours!
          </p>
        </div>
        <div className={s.headBadge}>
          <span>🪙</span>
          <span>Wallet: ₹{walletBalance.toFixed(0)}</span>
        </div>
      </div>

      <div className={s.card}>
        {/* Ambient background glow */}
        <span className={`${s.cardBlob} ${s.cardBlobPink}`} aria-hidden="true" />
        <span className={`${s.cardBlob} ${s.cardBlobLime}`} aria-hidden="true" />

        {/* Left Column: Information & Actions */}
        <div className={s.leftCol}>
          <div className={s.streakPill}>
            <span>🔥</span>
            <span>Day {spinState.streakDays || 3} Foodie Streak · Spin for 2x Rewards</span>
          </div>

          <h3 className={s.heroHeading}>
            Unlock daily surprises with <span>Tiffexx Spin &amp; Win</span>
          </h3>

          <p className={s.heroDesc}>
            Every tiffin order and daily login gives you lucky chances. Win wallet cash deposited directly to your Tiffexx Money, 5% off subscription codes, or surprise meal deals.
          </p>

          {/* Key prizes grid */}
          <div className={s.prizesGrid}>
            <div className={s.prizeItem}>
              <span className={s.prizeIcon}>💰</span>
              <span className={s.prizeVal}>₹50 Cash</span>
              <span className={s.prizeLabel}>Jackpot</span>
            </div>
            <div className={s.prizeItem}>
              <span className={s.prizeIcon}>🍱</span>
              <span className={s.prizeVal}>Free Deal</span>
              <span className={s.prizeLabel}>Meal add-on</span>
            </div>
            <div className={s.prizeItem}>
              <span className={s.prizeIcon}>🎟</span>
              <span className={s.prizeVal}>5% Off</span>
              <span className={s.prizeLabel}>Checkout coupon</span>
            </div>
            <div className={s.prizeItem}>
              <span className={s.prizeIcon}>🔄</span>
              <span className={s.prizeVal}>Spin Again</span>
              <span className={s.prizeLabel}>Bonus spin</span>
            </div>
          </div>

          {/* Actions & Ticker */}
          <div className={s.actionsRow}>
            <button
              className={s.spinBtn}
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <span className={s.spinBtnIcon}>🎯</span>
              <span>Spin the Wheel</span>
            </button>
            <span className={s.rulesNote}>
              <span>✨</span>
              <span>100% Free · No minimum order needed</span>
            </span>
          </div>

          {/* Live Recent Winners Ticker */}
          <div className={s.winnersTicker}>
            <span className={s.tickerIcon}>🎉</span>
            <p className={s.tickerText}>
              <span className={s.tickerHighlight}>{activeWinner.name}</span> ({activeWinner.location}) won{" "}
              <span className={s.tickerHighlight}>{activeWinner.prize}</span> · {activeWinner.time}
            </p>
          </div>
        </div>

        {/* Right Column: Live Wheel Stage */}
        <div className={s.rightCol}>
          <div
            className={s.wheelStage}
            onClick={() => setIsModalOpen(true)}
            title="Click to launch Spin & Win"
          >
            <SpinWheel
              isSpinning={false}
              rotation={15}
              onHubClick={() => setIsModalOpen(true)}
            />
          </div>
          <p className={s.stageHint}>
            <span>👆</span>
            <span>Tap wheel to play today&apos;s free spin</span>
          </p>
        </div>
      </div>

      {/* Full Interactive Modal */}
      <SpinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRewardClaimed={(prize) => {
          // Updates wallet balance and state
          setWalletBalance(getStoredWalletBalance());
        }}
      />
    </section>
  );
}
