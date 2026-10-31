"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DEFAULT_ITEM,
  DATES,
  PLANS,
  SLOTS,
  ADDRESSES,
  getInitialCart,
  saveCart,
  getStoredUser,
  saveStoredUser,
  calculatePrice,
  formatInr,
  ORDERS_STORAGE_KEY,
} from "@/lib/cart";
import s from "./CartFlow.module.css";
import SpinModal from "@/components/playzone/SpinModal";

export default function CartFlow() {
  const searchParams = useSearchParams();
  const isCheckout = searchParams?.get("checkout") === "true";

  const [cart, setCart] = useState({
    items: [DEFAULT_ITEM],
    days: 7,
    date: DATES[0].key,
  });
  const [user, setUser] = useState(null);
  const [view, setView] = useState("cart"); // 'cart' | 'confirm' | 'address' | 'payment' | 'success'
  const [selectedSlot, setSelectedSlot] = useState(SLOTS[0]);
  const [selectedAddr, setSelectedAddr] = useState(ADDRESSES[0]);
  const [selectedPay, setSelectedPay] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isMobileEditable, setIsMobileEditable] = useState(false);
  const [spinModalOpen, setSpinModalOpen] = useState(false);

  // Address form fields & errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Auth Modal State
  const [authOpen, setAuthOpen] = useState(false);
  const [authStep, setAuthStep] = useState("login"); // 'login' | 'otp' | 'ok'
  const [authPhoneInput, setAuthPhoneInput] = useState("");
  const [authPhoneError, setAuthPhoneError] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [timerCount, setTimerCount] = useState(20);
  const timerRef = useRef(null);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Universal Picker Modal
  const [pickerConfig, setPickerConfig] = useState(null);

  // Shake animation trigger for login gate
  const [shakeGate, setShakeGate] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  function addToast(msg, type = "") {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }

  // Load cart and user on mount + listen for window events
  useEffect(() => {
    const initialCart = getInitialCart();
    const initialUser = getStoredUser();
    setCart(initialCart);
    setUser(initialUser);
    if (initialUser && initialUser.phone) {
      setPhone(initialUser.phone);
    }

    if (isCheckout) {
      const items = initialCart?.items || [];
      if (items.length > 0) {
        if (initialUser) {
          setView("address");
        } else {
          setView("confirm");
          setAuthOpen(true);
          setShakeGate(true);
        }
      }
    }

    const onCartUpdated = (e) => {
      if (e.detail) setCart(e.detail);
    };
    const onUserUpdated = (e) => {
      setUser(e.detail);
      if (e.detail && e.detail.phone) setPhone(e.detail.phone);
    };

    window.addEventListener("tiffexx:cart-updated", onCartUpdated);
    window.addEventListener("tiffexx:user-updated", onUserUpdated);

    window.TiffexxCart = {
      add: (item) => {
        setCart((prev) => {
          const items = [...prev.items];
          const found = items.find((x) => x.id === item.id);
          if (found) {
            found.qty = Math.min(found.qty + 1, 9);
          } else {
            items.push({ ...item, qty: 1 });
          }
          const updated = { ...prev, items };
          saveCart(updated);
          return updated;
        });
        addToast(`${item.name || "Item"} added to cart`, "success");
      },
      clear: () => {
        const updated = { ...cart, items: [] };
        setCart(updated);
        saveCart(updated);
      },
    };

    return () => {
      window.removeEventListener("tiffexx:cart-updated", onCartUpdated);
      window.removeEventListener("tiffexx:user-updated", onUserUpdated);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const priceDetails = calculatePrice(cart.items, cart.days);

  const triggerGateShake = () => {
    setShakeGate(true);
    setTimeout(() => setShakeGate(false), 500);
    addToast("Please log in or sign up to continue.", "error");
  };

  const stepIndex = { cart: 0, confirm: 0, address: 1, payment: 2, success: 3 }[view] || 0;

  const navigateTo = (targetView) => {
    if ((targetView === "address" || targetView === "payment" || targetView === "confirm") && !cart.items.length) {
      addToast("Your cart is empty.", "error");
      return setView("cart");
    }
    if ((targetView === "address" || targetView === "payment") && !user) {
      setView("confirm");
      setAuthOpen(true);
      setTimeout(triggerGateShake, 100);
      return;
    }
    if (targetView === "confirm" && user) {
      return setView("address");
    }
    setView(targetView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateQty = (index, delta) => {
    const items = [...cart.items];
    const it = items[index];
    if (!it) return;
    const newQty = it.qty + delta;
    if (newQty <= 0) {
      const removed = items.splice(index, 1)[0];
      addToast(`${removed.name} removed from cart.`);
    } else {
      it.qty = Math.min(newQty, 9);
    }
    const updated = { ...cart, items };
    setCart(updated);
    saveCart(updated);
  };

  const removeItem = (index) => {
    const items = [...cart.items];
    const removed = items.splice(index, 1)[0];
    const updated = { ...cart, items };
    setCart(updated);
    saveCart(updated);
    addToast(`${removed.name} removed from cart.`);
  };

  const toggleLike = (index) => {
    const items = [...cart.items];
    if (items[index]) {
      items[index].liked = !items[index].liked;
      const updated = { ...cart, items };
      setCart(updated);
      saveCart(updated);
      addToast(items[index].liked ? "Added to wishlist" : "Removed from wishlist");
    }
  };

  const openAuthModal = () => {
    setAuthStep("login");
    setAuthPhoneInput(user?.phone || "");
    setAuthPhoneError(false);
    setOtpValues(["", "", "", ""]);
    setAuthOpen(true);
  };

  const startOtpTimer = () => {
    setTimerCount(20);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimerCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    const digits = authPhoneInput.replace(/\D/g, "");
    if (digits.length < 10) {
      setAuthPhoneError(true);
      return addToast("Enter a valid 10-digit mobile number.", "error");
    }
    const formatted = authPhoneInput.startsWith("+91") ? authPhoneInput : `+91-${digits.slice(-10)}`;
    setAuthPhoneInput(formatted);
    setAuthPhoneError(false);
    setAuthStep("otp");
    startOtpTimer();
    addToast("Demo OTP sent — any 4 digits work.", "success");
    setTimeout(() => {
      otpRefs[0].current?.focus();
    }, 100);
  };

  const handleOtpInput = (index, val) => {
    const clean = val.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otpValues];
    newOtp[index] = clean;
    setOtpValues(newOtp);
    if (clean && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otpValues.join("");
    if (code.length < 4) {
      return addToast("Enter all 4 digits.", "error");
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setAuthStep("ok");

    setTimeout(() => {
      const loggedUser = { phone: authPhoneInput };
      setUser(loggedUser);
      setPhone(loggedUser.phone);
      saveStoredUser(loggedUser);
      setAuthOpen(false);
      addToast("Signed in successfully.", "success");
      navigateTo("address");
    }, 1200);
  };

  const handleMainCta = () => {
    if (!cart.items.length && view !== "success") {
      return addToast("Your cart is empty.", "error");
    }

    if (view === "cart") {
      return navigateTo(user ? "address" : "confirm");
    }

    if (view === "confirm") {
      if (!user) {
        triggerGateShake();
        openAuthModal();
      } else {
        navigateTo("address");
      }
      return;
    }

    if (view === "address") {
      const f = firstName.trim();
      const l = lastName.trim();
      const e = email.trim();
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

      const errors = {};
      if (!f) errors.fn = true;
      if (!l) errors.ln = true;
      if (!emailValid) errors.em = true;
      setFormErrors(errors);

      if (errors.fn || errors.ln || errors.em) {
        addToast("Please fill all required address details correctly.", "error");
        return;
      }

      navigateTo("payment");
      return;
    }

    if (view === "payment") {
      if (!user) {
        setView("confirm");
        openAuthModal();
        return;
      }
      if (!selectedPay) {
        return addToast("Choose a payment method first.", "error");
      }

      const methodNames = {
        wallet: "Tiffexx Money",
        gpay: "Google Pay UPI",
        netbanking: "Net Banking",
      };

      addToast(`Payment successful via ${methodNames[selectedPay] || selectedPay}.`, "success");

      try {
        const storedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || "[]");
        storedOrders.push({
          items: cart.items,
          total: priceDetails.total,
          date: new Date().toISOString(),
          paymentMethod: selectedPay,
        });
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(storedOrders));
      } catch (err) { }

      const clearedCart = { ...cart, items: [] };
      setCart(clearedCart);
      saveCart(clearedCart);

      setView("success");
      setSpinModalOpen(true);
    }
  };

  const openDateModal = () => {
    setPickerConfig({
      title: "Change Delivery Dates",
      sub: "Pick a new subscription start date.",
      options: DATES.map((d) => ({ key: d.key, title: d.label, sub: d.sub })),
      selectedKey: cart.date,
      onSelect: (key) => {
        const updated = { ...cart, date: key };
        setCart(updated);
        saveCart(updated);
        addToast("Dates updated.", "success");
      },
    });
  };

  const openPlanModal = () => {
    setPickerConfig({
      title: "Change Plan",
      sub: "Choose a new subscription length.",
      options: PLANS.map((p) => ({ key: p.days, title: p.label, sub: p.sub })),
      selectedKey: cart.days,
      onSelect: (days) => {
        const updated = { ...cart, days };
        setCart(updated);
        saveCart(updated);
        addToast("Plan updated.", "success");
      },
    });
  };

  const openSlotModal = () => {
    setPickerConfig({
      title: "Select Delivery Slot",
      sub: "Choose when you’d like your tiffin delivered.",
      options: SLOTS.map((s) => ({ key: s.key, title: s.label, sub: s.sub })),
      selectedKey: selectedSlot.key,
      onSelect: (key) => {
        const found = SLOTS.find((s) => s.key === key) || SLOTS[0];
        setSelectedSlot(found);
        addToast("Delivery slot updated.", "success");
      },
    });
  };

  const openAddressModal = () => {
    setPickerConfig({
      title: "Choose Delivery Address",
      sub: "Pick a saved address for this order.",
      options: ADDRESSES.map((a) => ({ key: a.tag, title: a.tag, sub: a.detail })),
      selectedKey: selectedAddr.tag,
      onSelect: (tag) => {
        const found = ADDRESSES.find((a) => a.tag === tag) || ADDRESSES[0];
        setSelectedAddr(found);
        addToast("Delivery address updated.", "success");
      },
    });
  };

  const restartDemoOrder = () => {
    const resetCart = { items: [{ ...DEFAULT_ITEM }], days: 7, date: DATES[0].key };
    setCart(resetCart);
    saveCart(resetCart);
    setSelectedPay(null);
    setView("cart");
    addToast("Started fresh demo order.", "success");
  };

  let ctaLabel = "Proceed to Order";
  let ctaDisabled = false;

  if (view === "cart") {
    ctaDisabled = !cart.items.length;
  } else if (view === "confirm") {
    ctaLabel = "Log in to continue";
    ctaDisabled = true;
  } else if (view === "address") {
    ctaLabel = "Proceed to Checkout";
  } else if (view === "payment") {
    ctaLabel = "Proceed to Checkout";
    ctaDisabled = !selectedPay;
  }

  const crumbLabel =
    view === "address" ? "Address" : view === "payment" ? "Payment" : view === "success" ? "Order Placed" : "Cart";

  return (
    <main className={s.shell}>
      {/* Breadcrumb */}
      <div className={s.crumb}>
        <Link href="/">Home</Link> / <span>Noida</span> / <b>{crumbLabel}</b>
      </div>

      <div className={`${s.grid} ${view === "success" ? s.gridSolo : ""}`}>
        <div>
          {/* STEP 1: CART */}
          {view === "cart" && (
            <section className={s.view}>
              <div className={s.title}>Your Cart</div>

              {/* STEPPER — Figma-exact with curve SVGs and underline */}
              <div className={s.stepper}>
                {/* Dashed curve connectors: gradient brown→yellow = done, grey = pending */}
                <img className={`${s.curve} ${s.curveL}`} src="/assets/step-curve-3.svg" alt="" aria-hidden="true" />
                <img className={`${s.curve} ${s.curveR}`} src="/assets/step-curve-2.svg" alt="" aria-hidden="true" />

                {/* Cart step — active */}
                <button className={`${s.step} ${stepIndex === 0 ? s.stepOn : ""}`} onClick={() => navigateTo("cart")}>
                  <img src="/assets/step-cart.png" alt="Cart" />
                  <span>Cart</span>
                  {stepIndex === 0 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>

                {/* Address step */}
                <button className={`${s.step} ${stepIndex === 1 ? s.stepOn : ""}`} onClick={() => navigateTo("address")}>
                  <img src="/assets/step-address.png" alt="Address" />
                  <span>Address</span>
                  {stepIndex === 1 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>

                {/* Payment step */}
                <button className={`${s.step} ${stepIndex === 2 ? s.stepOn : ""}`} onClick={() => navigateTo("payment")}>
                  <img src="/assets/step-payment.png" alt="Payment" />
                  <span>Payment</span>
                  {stepIndex === 2 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
              </div>

              <div className={s.promo}>
                <span>Hurry ....Order it on time so that we can deliver it on time.</span>
                <img src="/assets/promo-hourglass.svg" alt="Hourglass" />
              </div>

              {cart.items.length === 0 ? (
                <div className={s.empty}>
                  <div style={{ fontSize: "38px" }}>🧺</div>
                  <b>Your cart is empty</b>
                  <p>Add a tiffin or subscription to get started.</p>
                  <button className={s.cta} style={{ maxWidth: "220px", margin: "16px auto 0" }} onClick={restartDemoOrder}>
                    Add Thali
                  </button>
                </div>
              ) : (
                cart.items.map((item, idx) => (
                  <div key={item.id + idx} className={s.cartCard}>
                    {/* LEFT: item info */}
                    <div className={s.meta}>
                      <div className={s.tag}>{item.tag}</div>
                      <div className={s.cname}>{item.name}</div>
                      <div className={s.csub}>{item.sub}</div>
                    </div>

                    {/* MIDDLE: price + qty stepper */}
                    <div className={s.itemBuy}>
                      <div className={s.price}>
                        <b>₹{item.perDay}</b>
                        <span>/day</span>
                      </div>
                      <div className={s.qty}>
                        <button onClick={() => updateQty(idx, -1)} aria-label="Decrease quantity">
                          <img src="/assets/qty-minus.svg" alt="−" width="24" height="24" />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(idx, 1)} aria-label="Increase quantity">
                          <img src="/assets/qty-plus.svg" alt="+" width="24" height="24" />
                        </button>
                      </div>
                    </div>

                    {/* RIGHT: remove + wishlist */}
                    <div className={s.itemActions}>
                      <button className={s.ic} onClick={() => removeItem(idx)} aria-label="Remove item">
                        <img src="/assets/remove.svg" alt="Remove" width="24" height="24" />
                      </button>
                      <button className={`${s.ic} ${item.liked ? s.icLiked : ""}`} onClick={() => toggleLike(idx)} aria-label="Save to favorites">
                        <img src="/assets/icon-heart.svg" alt="Wishlist" width="24" height="24" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {/* STEP 1.5: CONFIRM & LOGIN GATE */}
          {view === "confirm" && (
            <section className={s.view}>
              <button className={s.back} onClick={() => navigateTo("cart")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                Confirm &amp; Pay
              </button>

              <div className={s.gate}>
                {!user && (
                  <div className={`${s.flash} ${shakeGate ? s.shake : ""}`}>
                    <span>Log in or sign up first — Address &amp; Payment unlock right after.</span>
                  </div>
                )}

                <div
                  className={`${s.row} ${user ? s.rowDone : ""} ${shakeGate ? s.shake : ""}`}
                  onClick={() => (!user ? openAuthModal() : null)}
                  style={{ cursor: user ? "default" : "pointer" }}
                >
                  <span>{user ? `✓ Logged in as ${user.phone}` : "1. Log in or sign up"}</span>
                </div>

                <div className={`${s.row} ${!user ? s.rowLocked : ""}`} onClick={() => (!user ? triggerGateShake() : navigateTo("address"))}>
                  <span>2. Add address &amp; delivery slot</span>
                </div>

                <div className={`${s.row} ${!user ? s.rowLocked : ""}`} onClick={() => (!user ? triggerGateShake() : navigateTo("payment"))}>
                  <span>3. Choose a payment method</span>
                </div>
              </div>
            </section>
          )}

          {/* STEP 2: ADDRESS */}
          {view === "address" && (
            <section className={s.view}>
              <div className={s.title}>Your Address</div>

              <div className={s.stepper}>
                {/* curveL: Cart→Address done (brown); curveR: Address→Payment pending (grey) */}
                <img className={`${s.curve} ${s.curveL}`} src="/assets/step-curve-1.svg" alt="" aria-hidden="true" />
                <img className={`${s.curve} ${s.curveR}`} src="/assets/step-curve-2.svg" alt="" aria-hidden="true" />
                <button className={`${s.step} ${stepIndex === 0 ? s.stepOn : ""}`} onClick={() => navigateTo("cart")}>
                  <img src="/assets/step-cart.png" alt="Cart" />
                  <span>Cart</span>
                  {stepIndex === 0 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
                <button className={`${s.step} ${stepIndex === 1 ? s.stepOn : ""}`} onClick={() => navigateTo("address")}>
                  <img src="/assets/step-address.png" alt="Address" />
                  <span>Address</span>
                  {stepIndex === 1 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
                <button className={`${s.step} ${stepIndex === 2 ? s.stepOn : ""}`} onClick={() => navigateTo("payment")}>
                  <img src="/assets/step-payment.png" alt="Payment" />
                  <span>Payment</span>
                  {stepIndex === 2 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
              </div>

              <div className={s.promo}>
                <span>Hurry ....Order it on time so that we can deliver it on time.</span>
                <img src="/assets/promo-hourglass.svg" alt="Hourglass" />
              </div>

              <div className={`${s.card} ${s.form}`}>
                <div className={s.fld}>
                  <label>First Name</label>
                  <div className={`${s.inp} ${formErrors.fn ? s.inpError : ""}`}>
                    <input
                      placeholder="Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFormErrors((prev) => ({ ...prev, fn: false }));
                      }}
                    />
                  </div>
                  {formErrors.fn && <div className={s.err}>Required.</div>}
                </div>

                <div className={s.fld}>
                  <label>Last Name</label>
                  <div className={`${s.inp} ${formErrors.ln ? s.inpError : ""}`}>
                    <input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setFormErrors((prev) => ({ ...prev, ln: false }));
                      }}
                    />
                  </div>
                  {formErrors.ln && <div className={s.err}>Required.</div>}
                </div>

                <div className={s.fld}>
                  <label>Email ID</label>
                  <div className={`${s.inp} ${formErrors.em ? s.inpError : ""}`}>
                    <input
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFormErrors((prev) => ({ ...prev, em: false }));
                      }}
                    />
                  </div>
                  {formErrors.em && <div className={s.err}>Enter a valid email.</div>}
                </div>

                <div className={s.fld}>
                  <label>Mobile Number</label>
                  <div className={s.inp}>
                    <input
                      placeholder="+91 -"
                      disabled={!isMobileEditable}
                      value={phone || (user ? user.phone : "")}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label="Edit mobile"
                      onClick={() => setIsMobileEditable((prev) => !prev)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className={`${s.card} ${s.deliv}`}>
                <div className={s.eta}>
                  <svg width="26" height="32" viewBox="0 0 24 24" fill="#591a11">
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                  </svg>
                  <span>
                    Delivery in <b>{selectedSlot.key}</b>
                  </span>
                </div>

                <div className={s.slot}>
                  Select your{" "}
                  <a className={s.ul} onClick={openSlotModal}>
                    Delivery Slot
                  </a>
                </div>

                <div className={s.at} onClick={openAddressModal}>
                  <div>
                    <small>
                      Deliver at <b>{selectedAddr.tag}</b>
                    </small>
                    <span>{selectedAddr.detail}</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#591a11" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </section>
          )}

          {/* STEP 3: PAYMENT */}
          {view === "payment" && (
            <section className={s.view}>
              <div className={s.title}>Payment</div>

              <div className={s.stepper}>
                {/* Both segments done: solid brown for both */}
                <img className={`${s.curve} ${s.curveL}`} src="/assets/step-curve-1.svg" alt="" aria-hidden="true" />
                <img className={`${s.curve} ${s.curveR}`} src="/assets/step-curve-1.svg" alt="" aria-hidden="true" />
                <button className={`${s.step} ${stepIndex === 0 ? s.stepOn : ""}`} onClick={() => navigateTo("cart")}>
                  <img src="/assets/step-cart.png" alt="Cart" />
                  <span>Cart</span>
                  {stepIndex === 0 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
                <button className={`${s.step} ${stepIndex === 1 ? s.stepOn : ""}`} onClick={() => navigateTo("address")}>
                  <img src="/assets/step-address.png" alt="Address" />
                  <span>Address</span>
                  {stepIndex === 1 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
                <button className={`${s.step} ${stepIndex === 2 ? s.stepOn : ""}`} onClick={() => navigateTo("payment")}>
                  <img src="/assets/step-payment.png" alt="Payment" />
                  <span>Payment</span>
                  {stepIndex === 2 && <img className={s.stepUnderline} src="/assets/step-underline.svg" alt="" aria-hidden="true" />}
                </button>
              </div>

              <div className={s.promo}>
                <span>Hurry ....Order it on time so that we can deliver it on time.</span>
                <img src="/assets/promo-hourglass.svg" alt="Hourglass" />
              </div>

              <div className={s.sec}>Recommended</div>

              <div
                className={`${s.pay} ${selectedPay === "wallet" ? s.paySel : ""}`}
                onClick={() => setSelectedPay("wallet")}
              >
                <span>🪙</span>
                <span className={s.lbl}>Tiffexx Money</span>
                <button
                  className={s.mini}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPay("wallet");
                  }}
                >
                  Continue
                </button>
              </div>

              <div
                className={`${s.pay} ${selectedPay === "gpay" ? s.paySel : ""}`}
                onClick={() => setSelectedPay("gpay")}
              >
                <span className={s.rd}></span>
                <span className={s.lbl}>Google Pay UPI</span>
              </div>

              <div
                className={`${s.pay} ${selectedPay === "netbanking" ? s.paySel : ""}`}
                onClick={() => setSelectedPay("netbanking")}
              >
                <span className={s.rd}></span>
                <span className={s.lbl}>Net Banking</span>
              </div>
            </section>
          )}

          {/* STEP 4: SUCCESS */}
          {view === "success" && (
            <section className={s.view}>
              <div className={s.doneWrap}>
                <img src="/assets/order-placed.png" alt="Order placed" />
                <h2>Heya ! your order placed Successfuly.</h2>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", flexWrap: "wrap", margin: "16px auto" }}>
                  <button className={s.cta} onClick={() => addToast("Demo — live order tracking opened.", "success")}>
                    Track your Order
                  </button>
                  <button
                    className={s.cta}
                    style={{ background: "#8a5a10" }}
                    onClick={() => setSpinModalOpen(true)}
                  >
                    🎯 Spin &amp; Win Rewards
                  </button>
                </div>
                <a className={s.again} onClick={restartDemoOrder}>
                  Start another demo order
                </a>
              </div>

              <SpinModal
                isOpen={spinModalOpen}
                onClose={() => setSpinModalOpen(false)}
                onRewardClaimed={(prize) => {
                  addToast(`Claimed ${prize.title}!`, "success");
                }}
              />
            </section>
          )}
        </div>

        {/* SUMMARY SIDEBAR */}
        {view !== "success" && (
          <aside className={s.side}>
            <div className={s.sum}>
              <div className={s.kit}>
                <img src="/assets/kitchen.png" alt="Amma's Kitchen" />
                <div>
                  <b>{cart.items[0]?.kitchen || "Amma’s Kitchen"}</b>
                  <small>
                    <span>★ 5.0 (3)</span>
                    <span>🛡 Verified</span>
                  </small>
                </div>
              </div>

              <div>
                <b style={{ fontWeight: 600 }}>Pause Subscriptions</b>
                <div>
                  Pause within 24 hours for a full refund.{" "}
                  <a className={s.ul} onClick={() => addToast("Pause subscription anytime from order history.")}>
                    Full policy
                  </a>
                </div>
              </div>

              <div className={s.hr}></div>

              <div className={s.kv}>
                <div>
                  <b>Dates</b>
                  <span>{cart.date}</span>
                </div>
                <button className={s.chg} onClick={openDateModal}>
                  Change
                </button>
              </div>

              <div className={s.hr}></div>

              <div className={s.kv}>
                <div>
                  <b>Plan</b>
                  <span>{cart.days} Days</span>
                </div>
                <button className={s.chg} onClick={openPlanModal}>
                  Change
                </button>
              </div>

              <div className={s.hr}></div>

              <div>
                <b style={{ fontWeight: 600, display: "block", marginBottom: "8px" }}>Price details</b>
                <div className={s.pl}>
                  <span>
                    {cart.days} days x ₹ {priceDetails.perDay}
                  </span>
                  <span>{formatInr(priceDetails.base)}</span>
                </div>
                <div className={s.pl}>
                  <span>Taxes</span>
                  <span>₹{priceDetails.tax.toFixed(2)}</span>
                </div>
                <div className={`${s.pl} ${s.plT}`}>
                  <span>
                    Total <u className={s.ul} style={{ fontWeight: 500 }}>INR</u>
                  </span>
                  <span>{formatInr(priceDetails.total)}</span>
                </div>

                <a className={s.ul} onClick={() => setShowBreakdown((prev) => !prev)}>
                  Price breakdown
                </a>

                {showBreakdown && (
                  <div className={s.bd}>
                    <div>
                      <span>Base</span>
                      <span>{formatInr(priceDetails.base)}</span>
                    </div>
                    <div>
                      <span>Plan discount</span>
                      <span>− {formatInr(priceDetails.discount)}</span>
                    </div>
                    <div>
                      <span>Taxes (3.88%)</span>
                      <span>{formatInr(priceDetails.tax)}</span>
                    </div>
                    <div>
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              className={`${s.cta} ${ctaDisabled ? s.ctaDisabled : ""}`}
              onClick={handleMainCta}
            >
              {ctaLabel}
            </button>

            {view === "confirm" && !user && (
              <div className={s.lockhint}>
                <span>Log in or sign up to continue to address &amp; payment.</span>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* AUTH MODAL */}
      {authOpen && (
        <div className={s.ov} onClick={(e) => e.target === e.currentTarget && setAuthOpen(false)}>
          <div className={s.modal}>
            <button className={s.x} onClick={() => setAuthOpen(false)} aria-label="Close">
              ✕
            </button>

            {authStep === "login" && (
              <div>
                <img className={s.logo} src="/assets/logo.png" alt="Tiffexx" />
                <h3>Enter Mobile Number</h3>
                <p className={s.sub}>Enter your mobile number and we'll send you OTP for verifications.</p>

                <div className={`${s.inp} ${authPhoneError ? s.inpError : ""}`} style={{ textAlign: "left", marginBottom: "16px" }}>
                  <input
                    placeholder="+91-9586532221"
                    inputMode="tel"
                    value={authPhoneInput}
                    onChange={(e) => {
                      setAuthPhoneInput(e.target.value);
                      setAuthPhoneError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                    autoFocus
                  />
                </div>

                <button className={s.cta} onClick={handleSendOtp} style={{ marginTop: 0 }}>
                  Login
                </button>

                <p className={s.small} style={{ margin: "16px 0 0" }}>
                  Don&apos;t have an account?{" "}
                  <Link className={s.lnk} href="/signup?redirect=/cart?checkout=true">
                    Sign up
                  </Link>
                </p>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <Link
                    href="/login?redirect=/cart?checkout=true"
                    style={{
                      fontSize: "12px",
                      color: "var(--brand-primary, #b3261e)",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    Log in with email &amp; password
                  </Link>
                </div>
                <div className={s.or}>or</div>
                <button className={s.g} onClick={() => addToast("Google login coming soon.")}>
                  G
                </button>
              </div>
            )}

            {authStep === "otp" && (
              <div>
                <img className={s.logo} src="/assets/logo.png" alt="Tiffexx" />
                <h3>Verify the OTP</h3>
                <p className={s.sub}>sent to <b>{authPhoneInput}</b></p>

                <div className={s.otp}>
                  {otpValues.map((val, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      maxLength={1}
                      inputMode="numeric"
                      value={val}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    />
                  ))}
                </div>

                <div className={s.small}>
                  Resend OTP in <b>00:{String(timerCount).padStart(2, "0")}</b> sec
                </div>

                <button className={s.cta} onClick={handleVerifyOtp} style={{ marginTop: 0 }}>
                  Submit
                </button>
              </div>
            )}

            {authStep === "ok" && (
              <div>
                <img className={s.vbadge} src="/assets/otp-verified.svg" alt="OTP Verified" />
                <h3>OTP Verified</h3>
                <p className={s.sub} style={{ marginBottom: 0 }}>Redirecting to address details...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UNIVERSAL PICKER MODAL */}
      {pickerConfig && (
        <div className={s.ov} onClick={(e) => e.target === e.currentTarget && setPickerConfig(null)}>
          <div className={s.modal}>
            <button className={s.x} onClick={() => setPickerConfig(null)} aria-label="Close">
              ✕
            </button>
            <h3>{pickerConfig.title}</h3>
            <p className={s.sub}>{pickerConfig.sub}</p>

            <div>
              {pickerConfig.options.map((opt) => (
                <button
                  key={opt.key}
                  className={`${s.opt} ${opt.key === pickerConfig.selectedKey ? s.optSel : ""}`}
                  onClick={() => {
                    pickerConfig.onSelect(opt.key);
                    setPickerConfig(null);
                  }}
                >
                  <b>{opt.title}</b>
                  <span>{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOASTS */}
      <div className={s.toasts}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${s.toast} ${t.type === "success" ? s.toastSuccess : ""} ${t.type === "error" ? s.toastError : ""
              }`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </main>
  );
}
