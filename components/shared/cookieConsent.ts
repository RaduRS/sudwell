export type CookieConsent = {
  version: 1;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const cookieConsentStorageKey = "driveway_cookie_consent_v1";
export const cookieConsentCookieName = "cookie_consent_v1";
export const cookieConsentEventName = "cookie-consent-updated";

export const safeParseConsent = (raw: string | null): CookieConsent | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (parsed.version !== 1) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    if (typeof parsed.marketing !== "boolean") return null;
    if (typeof parsed.updatedAt !== "string") return null;
    return parsed as CookieConsent;
  } catch {
    return null;
  }
};

export const getCookieValue = (name: string) => {
  const cookieString = typeof document === "undefined" ? "" : document.cookie;
  const match = cookieString.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const readCookieConsent = (): CookieConsent | null => {
  if (typeof window !== "undefined") {
    const local = safeParseConsent(
      window.localStorage.getItem(cookieConsentStorageKey),
    );
    if (local) return local;
  }
  return safeParseConsent(getCookieValue(cookieConsentCookieName));
};

export const writeCookieConsent = (value: CookieConsent) => {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(value);
  window.localStorage.setItem(cookieConsentStorageKey, serialized);
  document.cookie = `${cookieConsentCookieName}=${encodeURIComponent(
    serialized,
  )}; Max-Age=15552000; Path=/; SameSite=Lax`;
  window.dispatchEvent(new Event(cookieConsentEventName));
};

export const clearCookieConsent = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(cookieConsentStorageKey);
  document.cookie = `${cookieConsentCookieName}=; Max-Age=0; Path=/; SameSite=Lax`;
  window.dispatchEvent(new Event(cookieConsentEventName));
};

