"use client";

import { useState, useRef, useEffect } from "react";
import { WHEEL_SEGMENTS, calculateTargetRotation } from "@/lib/playzone";
import s from "./SpinWheel.module.css";

export default function SpinWheel({
  onSpinStart,
  onSpinEnd,
  isSpinning,
  rotation,
  onHubClick,
  scale = 1,
}) {
  return (
    <div
      className={s.wheelContainer}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "center center",
      }}
    >
      {/* Pointer at the top */}
      <span
        className={`${s.wheelPointer} ${isSpinning ? s.pointerTicking : ""}`}
        aria-hidden="true"
      />

      {/* Rotating Platter */}
      <div
        className={`${s.wheelDisc} ${isSpinning ? s.spinningGlow : ""}`}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {WHEEL_SEGMENTS.map((seg) => (
          <span
            key={seg.id}
            className={s.wheelLabel}
            style={{
              "--a": seg.styleDeg,
              color: seg.color,
            }}
          >
            {seg.label}
          </span>
        ))}

        {/* Center Hub */}
        <div
          className={s.wheelHub}
          onClick={onHubClick}
          title={isSpinning ? "Spinning..." : "Click to Spin"}
        >
          <i className={s.wheelHubDot} />
        </div>
      </div>
    </div>
  );
}
