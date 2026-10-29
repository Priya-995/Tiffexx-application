"use client";

import { useState, useEffect } from "react";

const AUTH_STORAGE_KEY = "tiffexx_user";
const AUTH_EVENT = "tiffexx_auth_change";

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem("tiffexx.user");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem("tiffexx.user", JSON.stringify(user));
    window.dispatchEvent(new Event(AUTH_EVENT));
    window.dispatchEvent(new CustomEvent("tiffexx:user-updated", { detail: user }));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to store user:", e);
  }
}

export function clearStoredUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem("tiffexx.user");
    window.dispatchEvent(new Event(AUTH_EVENT));
    window.dispatchEvent(new CustomEvent("tiffexx:user-updated", { detail: null }));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to clear user:", e);
  }
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setLoading(false);

    const handleAuthChange = () => {
      setUser(getStoredUser());
    };

    window.addEventListener(AUTH_EVENT, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const login = (userData) => {
    setStoredUser(userData);
    setUser(userData);
  };

  const logout = () => {
    clearStoredUser();
    setUser(null);
  };

  return {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
  };
}
