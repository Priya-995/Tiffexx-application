"use client";

import { useState, useEffect } from "react";
import SpinWheel from "./SpinWheel";
import Confetti from "./Confetti";
import {
  WHEEL_SEGMENTS,
  calculateTargetRotation,
} from "@/lib/playzone";
import {
  addWalletAmount,
  getSpinState,
  saveSpinState,
} from "@/lib/wallet";
import s from "./SpinModal.module.css";

export default function SpinModal({ isOpen, onClose, onRewardClaimed }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinCount, setSpinCount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      const state = getSpinState();
      setSpinCount(state.spinsAvailable > 0 ? state.spinsAvailable : 1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;

    // Pick a rewarding segment: prioritize cash or free deals, with chance of 'Again'
    // Let's create realistic weighted random selection:
    const weights = [
      { seg: WHEEL_SEGMENTS[0], w: 20 }, // ₹10
      { seg: WHEEL_SEGMENTS[1], w: 15 }, // Again
      { seg: WHEEL_SEGMENTS[2], w: 20 }, // ₹20
      { seg: WHEEL_SEGMENTS[3], w: 15 }, // Free Deal
      { seg: WHEEL_SEGMENTS[4], w: 15 }, // 5% Off
      { seg: WHEEL_SEGMENTS[5], w: 10 }, // ₹50
      { seg: WHEEL_SEGMENTS[6], w: 5 },  // No Luck
      { seg: WHEEL_SEGMENTS[7], w: 25 }, // ₹5
    ];
    const totalW = weights.reduce((acc, curr) => acc + curr.w, 0);
    let rand = Math.random() * totalW;
    let selected = weights[0].seg;
    for (const item of weights) {
      if (rand < item.w) {
        selected = item.seg;
        break;
      }
      rand -= item.w;
    }

    const nextRotation = calculateTargetRotation(selected, rotation, 6);
    setIsSpinning(true);
    setHasSpun(true);
    setPrize(null);
    setShowConfetti(false);
    setRotation(nextRotation);

    // After 4.5 seconds (the transition duration):
    setTimeout(() => {
      setIsSpinning(false);
      setPrize(selected);

      if (selected.type !== "miss") {
        setShowConfetti(true);
      }

      // Handle rewards
      if (selected.type === "cash") {
        addWalletAmount(selected.value, `Spin & Win: ${selected.label}`);
      } else if (selected.type === "again") {
        setSpinCount((prev) => prev + 1);
      }

      // Update spin state
      const state = getSpinState();
      const updatedHistory = [
        {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          prize: selected.label,
          type: selected.type,
        },
        ...(state.prizeHistory || []),
      ];
      saveSpinState({
        ...state,
        spinsAvailable: selected.type === "again" ? spinCount : Math.max(0, spinCount - 1),
        lastSpinDate: new Date().toISOString(),
        prizeHistory: updatedHistory,
      });

      if (onRewardClaimed) {
        onRewardClaimed(selected);
      }
    }, 4500);
  };

  const handleClaim = () => {
    if (prize && prize.type === "again") {
      setPrize(null);
      setHasSpun(false);
      handleSpin();
      return;
    }
    onClose();
  };

  return (
    <div className={s.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Spin and win">
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {/* Dismiss Button */}
        <button className={s.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Decorative Blobs */}
        <span className={`${s.modalBlob} ${s.modalBlobPink}`} aria-hidden="true" />
        <span className={`${s.modalBlob} ${s.modalBlobLime}`} aria-hidden="true" />

        {/* Kicker */}
        <p className={s.modalKicker}>SPIN &amp; WIN</p>

        {/* Confetti celebration */}
        <Confetti active={showConfetti} />

        {/* Wheel container */}
        <div className={s.wheelArea}>
          <SpinWheel
            isSpinning={isSpinning}
            rotation={rotation}
            onHubClick={!isSpinning && !prize ? handleSpin : undefined}
          />
        </div>

        {/* Heading & Subtext */}
        {!hasSpun ? (
          <>
            <p className={s.modalH}>1 free spin today</p>
            <p className={s.modalP}>
              Win wallet cash, free delivery or a discount
              <br />
              coupon. Come back tomorrow for another spin.
            </p>
            <button
              className={s.modalBtn}
              type="button"
              onClick={handleSpin}
            >
              Spin the Wheel
            </button>
          </>
        ) : isSpinning ? (
          <>
            <p className={s.modalH}>Spinning the wheel...</p>
            <p className={s.modalP}>
              Good luck! Fingers crossed for that ₹50 jackpot...
            </p>
            <button className={s.modalBtn} type="button" disabled>
              Spinning...
            </button>
          </>
        ) : (
          <>
            <p className={`${s.modalH} ${s.modalHWin}`}>{prize?.title}</p>
            <p className={s.modalP}>
              {prize?.desc}
              {prize?.code && (
                <span className={s.couponTag}>Code: {prize.code}</span>
              )}
            </p>
            <button
              className={`${s.modalBtn} ${s.claimBtn}`}
              type="button"
              onClick={handleClaim}
            >
              {prize?.type === "again" ? "Spin Again! 🔄" : "Claim Reward 🎉"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
