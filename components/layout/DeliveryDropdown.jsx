"use client";

import s from "./DeliveryDropdown.module.css";

export default function DeliveryDropdown({
  activeAddress,
  ownerName,
  onChangeClick,
}) {
  if (!activeAddress) return null;

  const displayName = ownerName || activeAddress.name || "User";
  const pincode = activeAddress.pincode || "201301";
  const tag = activeAddress.tag || (activeAddress.type ? activeAddress.type.toUpperCase() : "WORK");
  const fullAddress = activeAddress.fullAddress || activeAddress.shortAddress || "Sector 62, Noida";

  return (
    <div
      className={s.card}
      onClick={(e) => e.stopPropagation()}
      role="menu"
      aria-label="Delivery location preview"
    >
      <div className={s.content}>
        <div className={s.topRow}>
          <span>
            Deliver to: <strong>{displayName}, {pincode}</strong>
          </span>
          <span className={s.tag}>{tag}</span>
        </div>
        <p className={s.addressText} title={fullAddress}>
          {fullAddress}
        </p>
      </div>

      <button
        type="button"
        className={s.changeBtn}
        onClick={(e) => {
          e.stopPropagation();
          onChangeClick();
        }}
      >
        Change
      </button>
    </div>
  );
}
