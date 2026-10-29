"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import SearchDropdown from "@/components/search/SearchDropdown";
import UserDropdown from "@/components/layout/UserDropdown";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setUserMenuOpen(false);
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

  // Hide header on homepage (which has its own exact Figma header) and auth pages
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



  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="/" aria-label="Tiffexx home">
          <img src="/assets/logo.png" alt="Tiffexx" width="108" height="26" />
        </a>

        <div className="header__bar">
          <button className="deliver" type="button">
            <span className="deliver__label">Deliver to</span>
            <span className="deliver__place">
              <img src="/assets/icon-location.svg" alt="" width="24" height="24" />
              Noida
            </span>
          </button>

          {/* Search container with attached dropdown */}
          <div className="search-wrapper" ref={searchWrapperRef}>
            <form className="search" role="search" onSubmit={handleFormSubmit}>
              <img src="/assets/icon-search.svg" alt="" width="16" height="16" />
              <div className="search__input">
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
                <span className="search__divider"></span>
                <button type="button" className="search__mic" aria-label="Voice search">
                  <img src="/assets/icon-mic.svg" alt="" width="24" height="24" />
                </button>
              </div>
            </form>

            {/* Seamless dropdown directly anchored to search input */}
            {isOpen && (
              <SearchDropdown
                onSelect={(term) => {
                  setQuery(term);
                  handleSearch(term);
                }}
              />
            )}
          </div>

          <nav className="nav" aria-label="Primary">
           
<ul className="nav__links">
  <li>
    <Link href="/subscriptions">
      {isLoggedIn ? "My Subscriptions" : "Subscriptions"}
    </Link>
  </li>

  {isLoggedIn && (
    <li>
      <Link href="/orders">My Orders</Link>
    </li>
  )}
</ul>

            <div className="nav__actions">
              {/* Wallet: hidden if user not logged in / signed up; kept inside My Account */}
              {isLoggedIn && (
                <Link href="/wallet" className="wallet" aria-label="Wallet balance">
                  <span className="wallet__flag">
                    <img src="/assets/icon-coin.png" alt="" width="20" height="20" />
                  </span>
                  <span>Rs.25</span>
                </Link>
              )}
              <button
                className="icon-btn"
                type="button"
                aria-label="Wishlist"
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push("/wishlist");
                  } else {
                    router.push("/wishlist");
                  }
                }}
              >
                <img src="/assets/icon-heart.svg" alt="" width="16" height="16" />
              </button>
              <a className="icon-btn" href="/cart" aria-label="Cart">
                <img src="/assets/icon-cart.svg" alt="" width="17" height="17" />
              </a>
              {/* Notifications: only shown when user is logged in / signed up */}
              {isLoggedIn && (
                <Link className="icon-btn icon-btn--notify" href="/notifications" aria-label="Notifications">
                  <img src="/assets/icon-bell.svg" alt="" width="16" height="16" />
                  <span className="icon-btn__dot"></span>
                </Link>
              )}
              {/* User Account / Profile button with dropdown */}
              <div className="user-menu-wrapper" ref={userMenuRef}>
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="avatar"
                    aria-label="User Profile"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                  >
                    {user?.name
                      ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                      : "RK"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="icon-btn icon-btn--user"
                    aria-label="User Account"
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
                    onClose={() => setUserMenuOpen(false)}
                    onLogout={logout}
                  />
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
