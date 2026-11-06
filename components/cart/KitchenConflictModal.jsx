"use client";

import { useEffect } from "react";
import s from "./KitchenConflictModal.module.css";

export default function KitchenConflictModal({
  isOpen,
  currentKitchen,
  newKitchen,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={s.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="conflict-title"
    >
      <div className={s.modal}>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onCancel}
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className={s.iconWrap} aria-hidden="true">
          🍲
        </div>

        <h3 id="conflict-title" className={s.title}>
          Start a new order?
        </h3>

        <p className={s.desc}>
          Your cart currently has items from <strong>{currentKitchen || "another kitchen"}</strong>.
          <br />
          Adding items from <strong>{newKitchen || "this kitchen"}</strong> will discard your previous items and start a fresh order.
        </p>

        <div className={s.kitchenPillRow}>
          <div className={s.pillOld} title={currentKitchen}>
            {currentKitchen || "Old Kitchen"}
          </div>
          <span className={s.arrow} aria-hidden="true">
            ➔
          </span>
          <div className={s.pillNew} title={newKitchen}>
            {newKitchen || "New Kitchen"}
          </div>
        </div>

        <div className={s.actions}>
          <button
            type="button"
            className={s.confirmBtn}
            onClick={onConfirm}
          >
            Discard &amp; Start New Order
          </button>
          <button
            type="button"
            className={s.cancelBtn}
            onClick={onCancel}
          >
            Cancel / Keep Existing Cart
          </button>
        </div>
      </div>
    </div>
  );
}

