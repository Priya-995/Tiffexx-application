"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/lib/auth";
import {
  getSavedAddresses,
  addSavedAddress,
  setLiveCurrentAddress,
  formatLiveAddress,
  CURRENT_LOCATION_ID,
} from "@/lib/addresses";
import s from "./AddressDrawer.module.css";

export default function AddressDrawer({
  isOpen,
  activeAddress,
  ownerName,
  onSelectAddress,
  onClose,
}) {
  const { user, isLoggedIn } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [detectingLoc, setDetectingLoc] = useState(false);
  const [newType, setNewType] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fullAddress: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setShowAddForm(false);
      setSearchQuery("");
      return;
    }

    setAddresses(getSavedAddresses(user));

    const handleUpdate = () => {
      setAddresses(getSavedAddresses(user));
    };

    window.addEventListener("tiffexx:addresses-list-updated", handleUpdate);
    window.addEventListener("tiffexx:user-updated", handleUpdate);
    window.addEventListener("tiffexx_auth_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("tiffexx:addresses-list-updated", handleUpdate);
      window.removeEventListener("tiffexx:user-updated", handleUpdate);
      window.removeEventListener("tiffexx_auth_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [isOpen, user]);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        name: user?.name || ownerName || "",
        phone: user?.phone || prev.phone || "",
      }));
    }
  }, [isOpen, user, ownerName]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter addresses by search query, strictly ensuring live location is never shown in saved addresses
  const filteredAddresses = useMemo(() => {
    const list = addresses.filter(
      (a) => a && a.id !== CURRENT_LOCATION_ID && a.type !== "current" && a.tag !== "LIVE GPS"
    );
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (a) =>
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.shortAddress && a.shortAddress.toLowerCase().includes(q)) ||
        (a.fullAddress && a.fullAddress.toLowerCase().includes(q)) ||
        (a.pincode && a.pincode.includes(q))
    );
  }, [addresses, searchQuery]);

  if (!isOpen) return null;

  const handleSaveNew = (e) => {
    e.preventDefault();
    if (!formData.fullAddress.trim()) return;

    const shortAddress =
      formData.fullAddress.split(",")[0] || formData.fullAddress.slice(0, 30);

    const created = addSavedAddress(
      {
        name: formData.name || user?.name || ownerName || "User",
        phone: formData.phone || user?.phone || "+91 98XXX XXX10",
        pincode: formData.pincode || "201301",
        fullAddress: formData.fullAddress.trim(),
        shortAddress: shortAddress.trim(),
        type: newType,
        tag: newType.toUpperCase(),
        icon: newType === "work" ? "building" : newType === "home" ? "home" : "pin",
      },
      user
    );

    setShowAddForm(false);
    onSelectAddress(created);
  };

  const handleUseCurrentLocation = async () => {
    if (detectingLoc) return;
    setDetectingLoc(true);

    const fallbackLocName = user?.name || ownerName || "Live GPS";

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      const loc = setLiveCurrentAddress(
        {
          shortAddress: "Sector 62, Noida",
          fullAddress: "Sector 62, Noida, Uttar Pradesh – 201309",
          pincode: "201309",
          name: fallbackLocName,
        },
        user
      );
      setDetectingLoc(false);
      onSelectAddress(loc);
      onClose();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let formatted = {
          shortAddress: "Sector 62, Noida",
          fullAddress: "Sector 62, Noida, Uttar Pradesh – 201309",
          pincode: "201309",
        };

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { signal: controller.signal, headers: { "Accept-Language": "en" } }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            formatted = formatLiveAddress(data, pos.coords);
          }
        } catch (err) {
          console.warn("Live reverse geocode timeout or offline:", err?.message);
        }

        const liveAddr = setLiveCurrentAddress(
          {
            latitude,
            longitude,
            shortAddress: formatted.shortAddress,
            fullAddress: formatted.fullAddress,
            pincode: formatted.pincode,
            name: fallbackLocName,
          },
          user
        );

        setDetectingLoc(false);
        onSelectAddress(liveAddr);
        onClose();
      },
      (err) => {
        console.warn("Live GPS position error or denied:", err?.message);
        const loc = setLiveCurrentAddress(
          {
            shortAddress: "Sector 62, Noida",
            fullAddress: "Sector 62, Noida, Uttar Pradesh – 201309",
            pincode: "201309",
            name: fallbackLocName,
          },
          user
        );
        setDetectingLoc(false);
        onSelectAddress(loc);
        onClose();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const getIconGlyph = (iconType, type) => {
    if (iconType === "crosshair" || type === "current") {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
      );
    }
    if (iconType === "building" || type === "work") {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
          <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
        </svg>
      );
    }
    if (iconType === "home" || type === "home") {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    }
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  };

  return (
    <div
      className={s.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-drawer-title"
    >
      <div className={s.panel}>
        <div className={s.grabHandle} aria-hidden="true" />

        <div className={s.header}>
          <h2 id="address-drawer-title" className={s.title}>
            Select delivery address
          </h2>
          <button
            type="button"
            className={s.closeBtn}
            onClick={onClose}
            aria-label="Close delivery address drawer"
          >
            ✕
          </button>
        </div>

        {/* Search input */}
        <div className={s.searchWrap}>
          <span className={s.searchIcon} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className={s.searchInput}
            placeholder="Search by area, street name, pin code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Use my current location row */}
        <button
          type="button"
          className={s.currentLocationRow}
          onClick={handleUseCurrentLocation}
          disabled={detectingLoc}
        >
          <div className={s.currentLocationIcon} aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={detectingLoc ? s.spinIcon : ""}
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
            </svg>
          </div>
          <span className={s.currentLocationLabel}>
            {detectingLoc ? "Detecting live location..." : "Use my current location"}
          </span>
        </button>

        <hr className={s.dashedDivider} />

        <div className={s.subHead}>
          <span className={s.sectionTitle}>Saved addresses</span>
          <button
            type="button"
            className={s.addNewBtn}
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            {showAddForm ? "− Cancel" : "+ Add New"}
          </button>
        </div>

        <div className={s.list}>
          {showAddForm && (
            <form className={s.addForm} onSubmit={handleSaveNew}>
              <h4 className={s.formTitle}>Add New Delivery Address</h4>

              <div className={s.typeSelectRow}>
                {["home", "work", "other"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`${s.typeBtn} ${newType === t ? s.typeBtnActive : ""}`}
                    onClick={() => setNewType(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <div className={s.formRow}>
                <input
                  type="text"
                  className={s.inputField}
                  placeholder="Recipient Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  className={s.inputField}
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="text"
                  className={s.inputField}
                  placeholder="Pincode (e.g. 201301)"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                />
                <textarea
                  className={s.textareaField}
                  placeholder="Complete Address (House/Flat no., Area, Sector/Locality)"
                  value={formData.fullAddress}
                  onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                  required
                />
              </div>

              <div className={s.formActions}>
                <button type="submit" className={s.saveBtn}>
                  Save &amp; Deliver Here
                </button>
                <button
                  type="button"
                  className={s.cancelFormBtn}
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {filteredAddresses.length === 0 ? (
            <div style={{ textAlign: "center", padding: "28px 16px", color: "#8c827a", fontSize: "13.5px", lineHeight: "1.5" }}>
              {searchQuery ? (
                `No addresses found matching "${searchQuery}"`
              ) : !isLoggedIn ? (
                "No saved addresses. Sign in to access your saved addresses, or click \"+ Add New\" to add a delivery address."
              ) : (
                "No saved addresses yet. Click \"+ Add New\" to add your delivery address."
              )}
            </div>
          ) : (
            filteredAddresses.map((addr) => {
              const isSelected = activeAddress?.id === addr.id;
              const displayName = user?.name || addr.name || ownerName || "User";

              return (
                <div
                  key={addr.id}
                  className={`${s.item} ${isSelected ? s.itemSelected : ""}`}
                  onClick={() => onSelectAddress(addr)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelectAddress(addr);
                  }}
                >
                  <div className={s.itemIcon} aria-hidden="true">
                    {getIconGlyph(addr.icon, addr.type)}
                  </div>

                  <div className={s.itemBody}>
                    <div className={s.itemTopRow}>
                      <span className={s.itemName}>{displayName}</span>
                      {isSelected && <span className={s.selectedBadge}>Selected</span>}
                      <span className={s.tagBadge}>
                        {addr.tag || (addr.type ? addr.type.toUpperCase() : "WORK")}
                      </span>
                    </div>

                    <p className={s.itemAddress} title={addr.fullAddress}>
                      {addr.fullAddress}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={s.moreBtn}
                    aria-label="Address actions"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    ···
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
