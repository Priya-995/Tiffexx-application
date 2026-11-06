"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import SearchDropdown from "@/components/search/SearchDropdown";
import UserDropdown from "@/components/layout/UserDropdown";
import DeliveryDropdown from "@/components/layout/DeliveryDropdown";
import AddressDrawer from "@/components/layout/AddressDrawer";
import { useAuth } from "@/lib/auth";
import { getInitialCart, getCartTotalCount } from "@/lib/cart";
import { getActiveAddress, setActiveAddressId } from "@/lib/addresses";
import { getStoredWalletBalance } from "@/lib/wallet";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  // Delivery location & Drawer state
  const [deliveryDropdownOpen, setDeliveryDropdownOpen] = useState(false);
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false);
  const [activeAddress, setActiveAddress] = useState(null);
  const deliverRef = useRef(null);

  // Sync wallet balance dynamically (0 for unauthenticated user, user-specific balance for logged-in user)
  useEffect(() => {
    const updateBalance = () => {
      setWalletBalance(isLoggedIn && user ? getStoredWalletBalance(user) : 0);
    };

    updateBalance();

    const handleWalletUpdate = () => {
      updateBalance();
    };

    window.addEventListener("tiffexx:wallet-updated", handleWalletUpdate);
    window.addEventListener("storage", handleWalletUpdate);
    return () => {
      window.removeEventListener("tiffexx:wallet-updated", handleWalletUpdate);
      window.removeEventListener("storage", handleWalletUpdate);
    };
  }, [isLoggedIn, user]);

  // Sync active address
  useEffect(() => {
    try {
      setActiveAddress(getActiveAddress(user));
    } catch (e) {}

    const handleAddrUpdate = (e) => {
      setActiveAddress(e.detail || getActiveAddress(user));
    };

    window.addEventListener("tiffexx:address-updated", handleAddrUpdate);
    window.addEventListener("tiffexx:user-updated", handleAddrUpdate);
    window.addEventListener("tiffexx_auth_change", handleAddrUpdate);
    return () => {
      window.removeEventListener("tiffexx:address-updated", handleAddrUpdate);
      window.removeEventListener("tiffexx:user-updated", handleAddrUpdate);
      window.removeEventListener("tiffexx_auth_change", handleAddrUpdate);
    };
  }, [user]);

  // Sync cart count from localStorage and cart events
  useEffect(() => {
    const updateCount = (cartData) => {
      const items = cartData?.items || [];
      const total = items.reduce((sum, it) => sum + (Number(it.qty) || 1), 0);
      setCartCount(total);
    };

    try {
      const initial = getInitialCart();
      updateCount(initial);
    } catch (e) {}

    const handleCartUpdate = (e) => {
      updateCount(e.detail);
    };

    window.addEventListener("tiffexx:cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("tiffexx:cart-updated", handleCartUpdate);
    };
  }, []);

  const [query, setQuery] = useState("");
  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);

  // Smooth dismiss when clicking anywhere outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (deliverRef.current && !deliverRef.current.contains(e.target)) {
        setDeliveryDropdownOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setUserMenuOpen(false);
        setDeliveryDropdownOpen(false);
        setAddressDrawerOpen(false);
        searchInputRef.current?.blur();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on pathname change
  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
    setDeliveryDropdownOpen(false);
  }, [pathname]);

  const handleSearch = (searchTerm) => {
    const q = (searchTerm !== undefined ? searchTerm : query).trim();
    if (!q) return;
    setIsOpen(false);
    searchInputRef.current?.blur();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Hide header on auth pages
  if (
    pathname === "/signin" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/reset-password" ||
    pathname === "/create-new-password" ||
    pathname === "/new-password"
  ) {
    return null;
  }

  const userInitials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "RK";

  return (
    <header className="header">
      <div className="header__bar">
        <div className="header__inner">
          <Link href="/" className="header__logo" aria-label="Tiffexx home">
            <img src="/assets/logo.png" alt="Tiffexx" width="150" height="37" />
          </Link>

          <div className="header__right">
            <div
              className="deliver"
              ref={deliverRef}
              onClick={() => setDeliveryDropdownOpen((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-label="Delivery location"
              aria-expanded={deliveryDropdownOpen}
              style={{ position: "relative", cursor: "pointer" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setDeliveryDropdownOpen((prev) => !prev);
              }}
            >
              <span className="deliver__label">Deliver to</span>
              <div className="deliver__row">
                <img src="/assets/icon-location.svg" alt="" width="24" height="24" />
                <span className="deliver__addr">
                  {activeAddress?.shortAddress || "H-Block, Sector - 63, Noida"}
                </span>
                <img
                  src="/assets/icon-chevron-down.svg"
                  alt=""
                  width="20"
                  height="20"
                  style={{
                    transform: deliveryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>

              {deliveryDropdownOpen && (
                <DeliveryDropdown
                  activeAddress={activeAddress}
                  ownerName={user?.name || activeAddress?.name || "User"}
                  onChangeClick={() => {
                    setDeliveryDropdownOpen(false);
                    setAddressDrawerOpen(true);
                  }}
                />
              )}
            </div>

            <nav className="nav" aria-label="Primary">
              <div className="search-wrapper" ref={searchWrapperRef}>
                <form className="search" role="search" onSubmit={handleFormSubmit}>
                  <img src="/assets/icon-search.svg" alt="" width="16" height="16" />
                  <span className="search__input">
                    <input
                      ref={searchInputRef}
                      type="search"
                      id="header-search-input"
                      placeholder="Search tiffin, kitchen, cuisine..."
                      aria-label="Search tiffin, kitchen, cuisine"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setIsOpen(true)}
                      onClick={() => setIsOpen(true)}
                    />
                    <i className="search__divider" />
                    <button
                      type="button"
                      className="search__action"
                      aria-label="Search"
                      onClick={() => handleSearch()}
                    >
                      <img src="/assets/icon-search-action.svg" alt="" width="24" height="24" />
                    </button>
                  </span>
                </form>

                {isOpen && (
                  <SearchDropdown
                    onSelect={(term) => {
                      setQuery(term);
                      handleSearch(term);
                    }}
                  />
                )}
              </div>

              <div className="actions">
                <Link
                  href="/wallet"
                  className={`wallet ${pathname === "/wallet" ? "wallet--active" : ""}`}
                  aria-label={`Wallet balance Rs.${Math.round(walletBalance)}`}
                >
                  <img src="/assets/icon-wallet.svg" alt="" width="20" height="20" />
                  Rs.{Math.round(walletBalance)}
                </Link>

                <Link
                  className={`icon-btn ${pathname === "/wishlist" ? "icon-btn--active" : ""}`}
                  href="/wishlist"
                  aria-label="Wishlist"
                >
                  <img src="/assets/icon-header-1.svg" alt="" width="16" height="16" />
                </Link>

                <Link
                  className={`icon-btn icon-btn--lg ${pathname === "/cart" ? "icon-btn--active" : ""}`}
                  href="/cart"
                  aria-label={`Cart with ${cartCount} items`}
                  title={cartCount > 0 ? `${cartCount} items in cart` : "Cart is empty"}
                >
                  <img src="/assets/icon-header-2.svg" alt="" width="17" height="17" />
                  {cartCount > 0 && (
                    <span className="icon-btn__badge">{cartCount > 99 ? "99+" : cartCount}</span>
                  )}
                </Link>

                {isLoggedIn && (
                  <Link
                    className={`icon-btn icon-btn--notify ${pathname === "/notifications" ? "icon-btn--active" : ""}`}
                    href="/notifications"
                    aria-label="Notifications"
                  >
                    <img src="/assets/icon-bell.svg" alt="" width="16" height="16" />
                    <span className="icon-btn__dot" />
                  </Link>
                )}

                <div className="user-menu-wrapper" ref={userMenuRef}>
                  {isLoggedIn ? (
                    <button
                      type="button"
                      className="avatar"
                      aria-label="Account"
                      aria-expanded={userMenuOpen}
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                    >
                      {userInitials}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="icon-btn icon-btn--user"
                      aria-label="Account"
                      aria-expanded={userMenuOpen}
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                    >
                      <img src="/assets/icon-user.svg" alt="" width="20" height="20" />
                    </button>
                  )}

                  {userMenuOpen && (
                    <UserDropdown
                      isLoggedIn={isLoggedIn}
                      user={user}
                      walletBalance={walletBalance}
                      onClose={() => setUserMenuOpen(false)}
                      onLogout={logout}
                    />
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <AddressDrawer
        isOpen={addressDrawerOpen}
        activeAddress={activeAddress}
        ownerName={user?.name || activeAddress?.name || "User"}
        onSelectAddress={(addr) => {
          setActiveAddressId(addr.id, user);
          setActiveAddress(addr);
          setAddressDrawerOpen(false);
        }}
        onClose={() => setAddressDrawerOpen(false)}
      />
    </header>
  );
}
