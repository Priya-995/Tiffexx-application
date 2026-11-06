"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  getSavedAddresses,
  saveSavedAddresses,
  setActiveAddressId,
} from "@/lib/addresses";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./AddressesSection.module.css";

export default function AddressesSection() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const formRef = useRef(null);

  const [addresses, setAddresses] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showAreasModal, setShowAreasModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formType, setFormType] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    instructions: "",
    isDefault: false,
  });

  useEffect(() => {
    setAddresses(getSavedAddresses(user));
  }, [user]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const displayName = user?.name || "User";
  const displayPhone = user?.phone || "+91 98XXX XXX10";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleSignOut = () => {
    if (logout) logout();
    router.push("/signin");
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      const firstInput = formRef.current.querySelector("input[name='name']");
      if (firstInput) firstInput.focus();
    }
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    setAddresses(updated);
    saveSavedAddresses(updated, user);
    setActiveAddressId(id, user);

    const target = addresses.find((a) => a.id === id);
    showToast(`Default address set to "${target?.title || target?.tag || "selected"}".`);
  };

  const handleRemove = (id) => {
    const toRemove = addresses.find((a) => a.id === id);
    if (addresses.length === 1) {
      showToast("You must maintain at least one delivery address.");
      return;
    }
    const remaining = addresses.filter((a) => a.id !== id);
    if (toRemove?.isDefault && remaining.length > 0) {
      remaining[0].isDefault = true;
      setActiveAddressId(remaining[0].id, user);
    }
    setAddresses(remaining);
    saveSavedAddresses(remaining, user);
    showToast(`Address "${toRemove?.title || toRemove?.tag || "Delivery address"}" removed.`);
  };

  const handleEdit = (addr) => {
    setEditingId(addr.id);
    setFormType(addr.type || "home");
    setFormData({
      name: addr.name || user?.name || "",
      phone: addr.phone ? addr.phone.replace(/^Phone:\s*/, "") : (user?.phone || ""),
      line1: addr.line1 || addr.shortAddress || "",
      line2: addr.line2 || "",
      landmark: addr.landmark || "",
      pincode: addr.pincode || "",
      city: addr.city || "Noida",
      state: addr.state || "Uttar Pradesh",
      instructions: addr.instructions || "",
      isDefault: addr.isDefault || false,
    });
    scrollToForm();
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      line1: "",
      line2: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      instructions: "",
      isDefault: false,
    });
    setFormType("home");
  };

  const getAddressIcon = (icon) => {
    if (icon === "home" || icon === "/assets/icon-home.svg") return "/assets/icon-home.svg";
    if (icon === "building" || icon === "work" || icon === "/assets/icon-work.svg") return "/assets/icon-work.svg";
    return "/assets/icon-pin.svg";
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.line1.trim() || !formData.pincode.trim()) {
      showToast("Please fill in receiver name, phone, address line 1, and pincode.");
      return;
    }

    const titleMap = {
      home: "Home",
      work: "Work",
      other: "Other",
    };

    const iconType = formType === "work" ? "building" : formType === "home" ? "home" : "pin";
    const line1 = formData.line1.trim();
    const line2 = formData.line2.trim();
    const city = formData.city.trim() || "Noida";
    const fullAddress = [line1, line2, city, formData.pincode.trim()].filter(Boolean).join(", ");
    const shortAddress = line1;

    let updatedList;

    if (editingId) {
      updatedList = addresses.map((a) => {
        if (a.id === editingId) {
          return {
            ...a,
            type: formType,
            tag: formType.toUpperCase(),
            title: titleMap[formType] || "Address",
            icon: iconType,
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            line1,
            line2,
            landmark: formData.landmark.trim(),
            pincode: formData.pincode.trim(),
            city,
            state: formData.state.trim() || "Uttar Pradesh",
            instructions: formData.instructions.trim(),
            fullAddress,
            shortAddress,
            isDefault: formData.isDefault ? true : a.isDefault,
          };
        }
        if (formData.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      setAddresses(updatedList);
      saveSavedAddresses(updatedList, user);
      if (formData.isDefault) {
        setActiveAddressId(editingId, user);
      }
      showToast("Address updated successfully!");
    } else {
      const newId = `addr-${Date.now()}`;
      const newAddress = {
        id: newId,
        type: formType,
        tag: formType.toUpperCase(),
        title: titleMap[formType] || "Address",
        icon: iconType,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        line1,
        line2,
        landmark: formData.landmark.trim(),
        pincode: formData.pincode.trim(),
        city,
        state: formData.state.trim() || "Uttar Pradesh",
        instructions: formData.instructions.trim(),
        fullAddress,
        shortAddress,
        isDefault: formData.isDefault || addresses.length === 0,
      };

      if (formData.isDefault || addresses.length === 0) {
        updatedList = [newAddress, ...addresses.map((a) => ({ ...a, isDefault: false }))];
        setActiveAddressId(newId, user);
      } else {
        updatedList = [...addresses, newAddress];
      }

      setAddresses(updatedList);
      saveSavedAddresses(updatedList, user);
      showToast("New address saved successfully!");
    }

    handleCancelForm();
  };

  return (
    <ProfileLayout>
      {/* Main */}
      <div className={s.main}>
        <button
          className={s.back}
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <img src="/assets/back.svg" alt="" width="24" height="24" />
        </button>

        <div className={s.pageHeader}>
          <h1 className={s.pageTitle}>MY ADDRESSES</h1>
          <button
            className={`${s.btn} ${s.btnPrimary} ${s.btnAdd}`}
            type="button"
            onClick={scrollToForm}
          >
            + Add new address
          </button>
        </div>

        <p className={s.pageSub}>
          {addresses.length} saved {addresses.length === 1 ? "address" : "addresses"}. Your default address is used for new orders and subscriptions.
        </p>

        {/* Address cards */}
        <section className={s.addressGrid} aria-label="Saved addresses">
          {addresses.map((addr) => {
            const cardName = user?.name || addr.name || displayName;

            return (
              <article
                key={addr.id}
                className={`${s.addressCard} ${addr.isDefault ? s.isDefault : ""}`}
              >
                <header className={s.addressHead}>
                  <span className={s.addressIcon}>
                    <img src={getAddressIcon(addr.icon)} alt="" width="18" height="18" />
                  </span>
                  <h2>{addr.title || addr.tag || (addr.type ? addr.type.toUpperCase() : "HOME")}</h2>
                  {addr.isDefault && <span className={s.badge}>Default</span>}
                </header>
                <strong className={s.addressName}>{cardName}</strong>
                <p className={s.addressLines}>
                  {addr.line1 ? (
                    <>
                      {addr.line1}, {addr.line2}
                      {addr.landmark && (
                        <>
                          <br />
                          {addr.landmark}
                        </>
                      )}
                      <br />
                      {addr.city || "Noida"} – {addr.pincode}
                    </>
                  ) : (
                    addr.fullAddress || addr.shortAddress || "Sector 62, Noida"
                  )}
                </p>
                <p className={s.addressPhone}>Phone: {addr.phone ? addr.phone.replace(/^Phone:\s*/, "") : displayPhone}</p>
                <footer className={s.addressActions}>
                  <button
                    className={s.linkBtn}
                    type="button"
                    onClick={() => handleEdit(addr)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${s.linkBtn} ${s.danger}`}
                    type="button"
                    onClick={() => handleRemove(addr.id)}
                  >
                    Remove
                  </button>
                  {!addr.isDefault && (
                    <button
                      className={s.linkBtn}
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                    >
                      Set as default
                    </button>
                  )}
                </footer>
              </article>
            );
          })}
        </section>

        {/* Add new address form */}
        <section
          ref={formRef}
          className={s.formCard}
          aria-labelledby="add-address-title"
          id="address-form"
        >
          <header className={s.formCardHead}>
            <h2 id="add-address-title">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              type="button"
              className={s.formCardLink}
              onClick={() => setShowAreasModal(true)}
            >
              Check delivery areas ›
            </button>
          </header>

          <form className={s.form} onSubmit={handleSaveForm}>
            <fieldset className={s.chipGroup}>
              <legend>Save address as</legend>
              <label className={s.chip}>
                <input
                  type="radio"
                  name="label"
                  value="home"
                  checked={formType === "home"}
                  onChange={() => setFormType("home")}
                />
                <span>Home</span>
              </label>
              <label className={s.chip}>
                <input
                  type="radio"
                  name="label"
                  value="work"
                  checked={formType === "work"}
                  onChange={() => setFormType("work")}
                />
                <span>Work</span>
              </label>
              <label className={s.chip}>
                <input
                  type="radio"
                  name="label"
                  value="other"
                  checked={formType === "other"}
                  onChange={() => setFormType("other")}
                />
                <span>Other</span>
              </label>
            </fieldset>

            <div className={s.formRow}>
              <label className={s.field}>
                <span className={s.fieldLabel}>Full name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Name of receiver"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  autoComplete="name"
                  required
                />
              </label>
              <label className={s.field}>
                <span className={s.fieldLabel}>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  autoComplete="tel-national"
                  required
                />
              </label>
            </div>

            <div className={s.formRow}>
              <label className={s.field}>
                <span className={s.fieldLabel}>Flat / House no., Building</span>
                <input
                  type="text"
                  name="line1"
                  placeholder="e.g. Flat 302, Palm Heights"
                  value={formData.line1}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, line1: e.target.value }))
                  }
                  autoComplete="address-line1"
                  required
                />
              </label>
              <label className={s.field}>
                <span className={s.fieldLabel}>Street, Area</span>
                <input
                  type="text"
                  name="line2"
                  placeholder="e.g. Sector 62, Commercial Hub"
                  value={formData.line2}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, line2: e.target.value }))
                  }
                  autoComplete="address-line2"
                />
              </label>
            </div>

            <div className={s.formRow}>
              <label className={s.field}>
                <span className={s.fieldLabel}>Landmark (optional)</span>
                <input
                  type="text"
                  name="landmark"
                  placeholder="e.g. Near metro station"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, landmark: e.target.value }))
                  }
                />
              </label>
              <label className={s.field}>
                <span className={s.fieldLabel}>Pincode</span>
                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, pincode: e.target.value }))
                  }
                  autoComplete="postal-code"
                  required
                />
              </label>
            </div>

            <div className={s.formRow}>
              <label className={s.field}>
                <span className={s.fieldLabel}>City</span>
                <input
                  type="text"
                  name="city"
                  placeholder="Noida"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                  autoComplete="address-level2"
                />
              </label>
              <label className={s.field}>
                <span className={s.fieldLabel}>State</span>
                <input
                  type="text"
                  name="state"
                  placeholder="Uttar Pradesh"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                  autoComplete="address-level1"
                />
              </label>
            </div>

            <label className={s.field}>
              <span className={s.fieldLabel}>Delivery instructions (optional)</span>
              <textarea
                name="instructions"
                rows={3}
                placeholder="e.g. Leave with security, ring bell once"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
              />
            </label>

            <label className={s.checkbox}>
              <input
                type="checkbox"
                name="default"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }))
                }
              />
              <span>Make this my default address</span>
            </label>

            <div className={s.formActions}>
              <button
                className={`${s.btn} ${s.btnOutline}`}
                type="button"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button className={`${s.btn} ${s.btnPrimary}`} type="submit">
                {editingId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Delivery Areas Modal */}
      {showAreasModal && (
        <div
          className={s.modalOverlay}
          onClick={() => setShowAreasModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHead}>
              <h3>Serviced Delivery Areas</h3>
              <button
                type="button"
                className={s.closeBtn}
                onClick={() => setShowAreasModal(false)}
              >
                ✕
              </button>
            </div>
            <p style={{ margin: 0, fontSize: "13.5px", color: "var(--dorado)" }}>
              Tiffexx serves fresh homemade meals across the following major regions:
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "13px",
                color: "var(--coffee-bean)",
              }}
            >
              <li><strong>Noida:</strong> Sectors 1 through 150 (PIN: 201301 - 201309)</li>
              <li><strong>Greater Noida &amp; Expressway:</strong> Knowledge Park, Pari Chowk, TechZone (PIN: 201310)</li>
              <li><strong>Ghaziabad:</strong> Indirapuram, Vaishali, Vasundhara (PIN: 201010 - 201014)</li>
            </ul>
            <button
              type="button"
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={() => setShowAreasModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}
