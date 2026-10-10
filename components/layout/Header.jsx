"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import SearchDropdown from "@/components/search/SearchDropdown";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  // Smooth dismiss when clicking anywhere outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
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

  // Hide header on auth pages after hooks have executed
  if (pathname === "/signin" || pathname === "/login" || pathname === "/signup") {
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
                <a href="#">Subscriptions</a>
              </li>
              <li>
                <a href="/cart">Order</a>
              </li>
            </ul>
            <div className="nav__actions">
              <Link href="/wallet" className="wallet" aria-label="Wallet balance">
                <span className="wallet__flag">
                  <img src="/assets/icon-coin.png" alt="" width="20" height="20" />
                </span>
                <span>Rs.25</span>
              </Link>
              <button className="icon-btn" type="button" aria-label="Wishlist">
                <img src="/assets/icon-heart.svg" alt="" width="16" height="16" />
              </button>
              <a className="icon-btn" href="/cart" aria-label="Cart">
                <img src="/assets/icon-cart.svg" alt="" width="17" height="17" />
              </a>
              <button className="icon-btn icon-btn--notify" type="button" aria-label="Notifications">
                <img src="/assets/icon-bell.svg" alt="" width="16" height="16" />
                <span className="icon-btn__dot"></span>
              </button>
              <Link href="/signin" className="avatar" aria-label="Sign in / Account">
                RK
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
