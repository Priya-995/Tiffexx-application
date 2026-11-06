// Central delivery address state and persistence for Tiffexx
import { getStoredUser } from "@/lib/auth";

export const ADDRESSES_BASE_KEY = "tiffexx.addresses";
export const ACTIVE_ADDRESS_KEY = "tiffexx.activeAddressId";
export const CURRENT_LIVE_ADDRESS_KEY = "tiffexx.currentLiveAddress";
export const CURRENT_LOCATION_ID = "addr-current-gps";

export function getUserAddressKey(user) {
  const u = user || (typeof window !== "undefined" ? getStoredUser() : null);
  if (!u) return null;
  const rawId = u.email || u.phone || u.id || u.name || "default_user";
  return String(rawId).toLowerCase().replace(/[^a-z0-9]/g, "_");
}

export const GUEST_DEFAULT_ADDRESS = {
  id: "addr-guest-default",
  type: "work",
  tag: "DELIVER TO",
  name: "Guest",
  phone: "+91 98XXX XXX10",
  pincode: "201307",
  shortAddress: "Sector 62, Noida",
  fullAddress: "Sector 62, Noida, Uttar Pradesh – 201309",
  isDefault: true,
  icon: "pin",
};

/**
 * Generate starter addresses for an authenticated user using their actual profile name
 */
export function createDefaultUserAddresses(user) {
  const u = user || (typeof window !== "undefined" ? getStoredUser() : null);
  const name = u?.name || "User";
  const phone = u?.phone || "+91 98XXX XXX10";
  const uKey = getUserAddressKey(u) || "user";

  return [
    {
      id: `addr-work-${uKey}`,
      type: "work",
      tag: "WORK",
      name,
      phone,
      pincode: "201307",
      shortAddress: "H-Block, Sector - 63, Noida",
      fullAddress: "H-187 Sector 63 WorkWings, H Block, Lohia Road, Sector 63, Noida",
      isDefault: true,
      icon: "building",
    },
    {
      id: `addr-home-${uKey}`,
      type: "home",
      tag: "HOME",
      name,
      phone,
      pincode: "201301",
      shortAddress: "Sector 50, Noida",
      fullAddress: "Flat 4B, Sunrise Apartments, Sector 50, Noida – 201301",
      isDefault: false,
      icon: "home",
    },
    {
      id: `addr-other-${uKey}`,
      type: "work",
      tag: "WORK",
      name,
      phone,
      pincode: "201009",
      shortAddress: "Chipiyana Buzurg, Ghaziabad",
      fullAddress: "Plot no. 40 harshdeep public school, Chipiyana Buzurg, Ghaziabad",
      isDefault: false,
      icon: "pin",
    },
  ];
}

/**
 * Format live reverse geocode data from Nominatim into a clean, real location address
 */
export function formatLiveAddress(data, coords) {
  if (!data) {
    return {
      shortAddress: "Sector 62, Noida",
      fullAddress: "Sector 62, Noida, Uttar Pradesh – 201309",
      pincode: "201309",
    };
  }

  const a = data.address || {};
  const rawDisplay = (data.display_name || "").trim();

  // Locality / Area / Colony / Road
  const area =
    a.suburb ||
    a.neighbourhood ||
    a.residential ||
    a.subdistrict ||
    a.village ||
    a.hamlet ||
    a.road ||
    null;

  // City / Town / District
  const city =
    a.city ||
    a.town ||
    a.municipality ||
    a.state_district ||
    a.county ||
    a.district ||
    null;

  const district =
    a.state_district && a.state_district !== city
      ? a.state_district
      : a.county && a.county !== city
      ? a.county
      : null;

  const pincode = a.postcode || a.postal_code || "";

  let shortAddress = "";
  if (area && city && area.toLowerCase() !== city.toLowerCase()) {
    shortAddress = `${area}, ${city}`;
  } else if (city && district && city.toLowerCase() !== district.toLowerCase()) {
    shortAddress = `${city}, ${district}`;
  } else if (city) {
    shortAddress = city;
  } else if (area) {
    shortAddress = area;
  } else if (rawDisplay) {
    const parts = rawDisplay
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p && !/^\d{5,6}$/.test(p) && p.toLowerCase() !== "india");
    shortAddress = parts.slice(0, 2).join(", ");
  }

  // Strip any accidental placeholder words like "Current Location"
  shortAddress = (shortAddress || "Sector 62, Noida")
    .replace(/current location,?\s*/gi, "")
    .replace(/live location,?\s*/gi, "")
    .trim();

  if (!shortAddress) shortAddress = "Sector 62, Noida";

  const fullAddress = rawDisplay || `${shortAddress}${pincode ? " – " + pincode : ""}`;

  return {
    shortAddress,
    fullAddress,
    pincode: pincode || "201309",
  };
}

export function createCurrentLocationAddress(options = {}) {
  const shortAddress =
    (options.shortAddress || "Sector 62, Noida")
      .replace(/current location,?\s*/gi, "")
      .replace(/live location,?\s*/gi, "")
      .trim() || "Sector 62, Noida";

  const fullAddress = options.fullAddress || `${shortAddress} – ${options.pincode || "201309"}`;
  const pincode = options.pincode || "201309";
  const name = options.name || "Live Location";

  return {
    id: CURRENT_LOCATION_ID,
    type: "current",
    tag: "LIVE GPS",
    name,
    phone: "+91 98XXX XXX10",
    pincode,
    shortAddress,
    fullAddress,
    isDefault: false,
    icon: "crosshair",
  };
}

/**
 * Set active address to live GPS location WITHOUT adding it to saved addresses.
 */
export function setLiveCurrentAddress(options = {}, user) {
  const u = user || (typeof window !== "undefined" ? getStoredUser() : null);
  const name = options.name || u?.name || "Live Location";
  const currentLoc = createCurrentLocationAddress({ ...options, name });

  if (typeof window === "undefined") return currentLoc;

  try {
    localStorage.setItem(CURRENT_LIVE_ADDRESS_KEY, JSON.stringify(currentLoc));

    const uKey = u ? getUserAddressKey(u) : null;
    const activeKey = uKey ? `${ACTIVE_ADDRESS_KEY}_${uKey}` : ACTIVE_ADDRESS_KEY;
    localStorage.setItem(activeKey, CURRENT_LOCATION_ID);
    localStorage.setItem(ACTIVE_ADDRESS_KEY, CURRENT_LOCATION_ID);

    window.dispatchEvent(new CustomEvent("tiffexx:address-updated", { detail: currentLoc }));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to store live address:", e);
  }

  return currentLoc;
}

export function selectCurrentLocation(options = {}, user) {
  return setLiveCurrentAddress(options, user);
}

/**
 * Returns saved addresses for the specified user or stored authenticated user.
 * Unauthenticated users return an empty list.
 * Live GPS / temporary items are strictly excluded.
 */
export function getSavedAddresses(user) {
  if (typeof window === "undefined") return [];

  const u = user || getStoredUser();
  if (!u) {
    // Unauthenticated user has NO saved addresses
    return [];
  }

  const uKey = getUserAddressKey(u);
  const storageKey = `${ADDRESSES_BASE_KEY}_${uKey}`;

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Exclude live GPS location
        const cleaned = parsed.filter(
          (a) => a && a.id !== CURRENT_LOCATION_ID && a.type !== "current" && a.tag !== "LIVE GPS"
        );
        // Ensure recipient name reflects user's profile name
        const synced = cleaned.map((a) => ({
          ...a,
          name: u.name || a.name || "User",
        }));
        return synced;
      }
    }

    // Seed default addresses for this authenticated user if none exist yet
    const initial = createDefaultUserAddresses(u);
    localStorage.setItem(storageKey, JSON.stringify(initial));
    return initial;
  } catch (e) {
    console.error("Failed to read addresses:", e);
  }

  return createDefaultUserAddresses(u);
}

/**
 * Save addresses isolated to the specific user
 */
export function saveSavedAddresses(addresses, user) {
  if (typeof window === "undefined") return;

  const u = user || getStoredUser();
  if (!u) return;

  const uKey = getUserAddressKey(u);
  const storageKey = `${ADDRESSES_BASE_KEY}_${uKey}`;

  try {
    // Strictly filter out any live GPS location
    const filtered = (addresses || []).filter(
      (a) => a && a.id !== CURRENT_LOCATION_ID && a.type !== "current" && a.tag !== "LIVE GPS"
    );
    localStorage.setItem(storageKey, JSON.stringify(filtered));
    window.dispatchEvent(
      new CustomEvent("tiffexx:addresses-list-updated", {
        detail: { addresses: filtered, userKey: uKey },
      })
    );
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save addresses:", e);
  }
}

/**
 * Get active delivery address for the user
 */
export function getActiveAddress(user) {
  if (typeof window === "undefined") return GUEST_DEFAULT_ADDRESS;

  try {
    const u = user || getStoredUser();
    const uKey = u ? getUserAddressKey(u) : null;
    const activeKey = uKey ? `${ACTIVE_ADDRESS_KEY}_${uKey}` : ACTIVE_ADDRESS_KEY;

    const activeId = localStorage.getItem(activeKey) || localStorage.getItem(ACTIVE_ADDRESS_KEY);

    // If active address is the live GPS location, retrieve it from live storage
    if (activeId === CURRENT_LOCATION_ID) {
      const rawLive = localStorage.getItem(CURRENT_LIVE_ADDRESS_KEY);
      if (rawLive) {
        const live = JSON.parse(rawLive);
        if (u?.name) live.name = u.name;
        return live;
      }
    }

    if (u) {
      const addresses = getSavedAddresses(u);
      if (activeId) {
        const found = addresses.find((a) => a.id === activeId);
        if (found) return found;
      }
      if (addresses.length > 0) {
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        return defaultAddr;
      }
    } else {
      // Guest: if GPS was clicked, check live storage
      if (activeId === CURRENT_LOCATION_ID) {
        const rawLive = localStorage.getItem(CURRENT_LIVE_ADDRESS_KEY);
        if (rawLive) return JSON.parse(rawLive);
      }
      return GUEST_DEFAULT_ADDRESS;
    }
  } catch (e) {}

  return GUEST_DEFAULT_ADDRESS;
}

/**
 * Set active address ID for the user
 */
export function setActiveAddressId(id, user) {
  if (typeof window === "undefined") return;

  const u = user || getStoredUser();
  const uKey = u ? getUserAddressKey(u) : null;
  const activeKey = uKey ? `${ACTIVE_ADDRESS_KEY}_${uKey}` : ACTIVE_ADDRESS_KEY;

  try {
    localStorage.setItem(activeKey, id);
    localStorage.setItem(ACTIVE_ADDRESS_KEY, id);

    let active;
    if (id === CURRENT_LOCATION_ID) {
      const rawLive = localStorage.getItem(CURRENT_LIVE_ADDRESS_KEY);
      active = rawLive
        ? JSON.parse(rawLive)
        : createCurrentLocationAddress({ name: u?.name || "Live Location" });
    } else if (u) {
      const addresses = getSavedAddresses(u);
      active = addresses.find((a) => a.id === id) || addresses[0];
    } else {
      active = GUEST_DEFAULT_ADDRESS;
    }

    window.dispatchEvent(new CustomEvent("tiffexx:address-updated", { detail: active }));
    window.dispatchEvent(new Event("storage"));
    return active;
  } catch (e) {
    console.error("Failed to set active address:", e);
  }
}

/**
 * Add a new saved address for the authenticated user
 */
export function addSavedAddress(newAddr, user) {
  const u = user || getStoredUser();
  const current = getSavedAddresses(u);
  const id = "addr-" + Date.now();
  const addressItem = {
    id,
    name: newAddr.name || u?.name || "User",
    ...newAddr,
  };
  const updated = [addressItem, ...current];
  saveSavedAddresses(updated, u);
  setActiveAddressId(id, u);
  return addressItem;
}

/**
 * Sync user profile name updates into all their saved addresses
 */
export function updateUserNameInAddresses(newName, user) {
  if (typeof window === "undefined" || !newName) return;
  const u = user || getStoredUser();
  if (!u) return;

  const current = getSavedAddresses(u);
  if (!current || current.length === 0) return;

  const updated = current.map((a) => ({
    ...a,
    name: newName,
  }));

  saveSavedAddresses(updated, u);

  const active = getActiveAddress(u);
  if (active && active.id !== CURRENT_LOCATION_ID) {
    active.name = newName;
    window.dispatchEvent(new CustomEvent("tiffexx:address-updated", { detail: active }));
  }
}
