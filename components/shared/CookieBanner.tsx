"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearCookieConsent,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "./cookieConsent";

type CookieBannerProps = {
  enabled: boolean;
  googleAnalyticsId: string | null;
  facebookPixelId: string | null;
};

export function CookieBanner({
  enabled,
  googleAnalyticsId,
  facebookPixelId,
}: CookieBannerProps) {
  const hasAnalytics = Boolean(googleAnalyticsId);
  const hasMarketing = Boolean(facebookPixelId);
  const hasNonEssential = hasAnalytics || hasMarketing;

  const [open, setOpen] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selection, setSelection] = useState(() => ({
    analytics: hasAnalytics,
    marketing: hasMarketing,
  }));

  useEffect(() => {
    if (!enabled || !hasNonEssential) return;
    const timer = window.setTimeout(() => {
      const stored = readCookieConsent();
      setOpen(!stored);
      setManaging(false);
      setSelection(
        stored
          ? { analytics: stored.analytics, marketing: stored.marketing }
          : { analytics: hasAnalytics, marketing: hasMarketing },
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [enabled, hasAnalytics, hasMarketing, hasNonEssential]);

  useEffect(() => {
    if (!enabled || !hasNonEssential) return;

    const handleOpen = () => {
      setOpen(true);
      setManaging(true);
      const stored = readCookieConsent();
      setSelection(
        stored
          ? { analytics: stored.analytics, marketing: stored.marketing }
          : { analytics: hasAnalytics, marketing: hasMarketing },
      );
    };

    const handleReset = () => {
      clearCookieConsent();
      setOpen(true);
      setManaging(true);
      setSelection({ analytics: hasAnalytics, marketing: hasMarketing });
    };

    window.addEventListener("open-cookie-preferences", handleOpen);
    window.addEventListener("reset-cookie-preferences", handleReset);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpen);
      window.removeEventListener("reset-cookie-preferences", handleReset);
    };
  }, [enabled, hasAnalytics, hasMarketing, hasNonEssential]);

  if (!enabled || !hasNonEssential || !open) {
    return null;
  }

  const acceptAll = () => {
    const next: CookieConsent = {
      version: 1,
      analytics: hasAnalytics,
      marketing: hasMarketing,
      updatedAt: new Date().toISOString(),
    };
    writeCookieConsent(next);
    setOpen(false);
    setManaging(false);
  };

  const rejectAll = () => {
    const next: CookieConsent = {
      version: 1,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };
    writeCookieConsent(next);
    setOpen(false);
    setManaging(false);
  };

  const saveSelection = () => {
    const next: CookieConsent = {
      version: 1,
      analytics: hasAnalytics ? selection.analytics : false,
      marketing: hasMarketing ? selection.marketing : false,
      updatedAt: new Date().toISOString(),
    };
    writeCookieConsent(next);
    setOpen(false);
    setManaging(false);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-black/50"
        role="presentation"
        onClick={() => setManaging(true)}
      />
      <div className="relative w-full max-w-2xl rounded-3xl border border-(--color-foreground)/10 bg-white p-6 text-(--color-foreground) shadow-2xl shadow-black/25 ring-1 ring-black/5">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-(--color-foreground)/60">
                Cookie preferences
              </div>
              <div className="text-xl font-semibold">
                We respect your privacy
              </div>
            </div>
            <button
              type="button"
              onClick={() => setManaging(true)}
              className="self-start rounded-full border border-(--color-foreground)/15 bg-(--color-foreground)/5 px-4 py-2 text-xs font-semibold text-(--color-foreground) transition hover:bg-(--color-foreground)/10"
            >
              Manage
            </button>
          </div>

          <p className="text-sm leading-relaxed text-(--color-foreground)/75">
            We use cookies and similar technologies to help the website work
            and, if enabled, to measure traffic and marketing performance. You
            can accept all, reject non-essential, or manage your preferences.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <Link
                href="/cookies"
                className="text-(--color-primary) hover:text-(--color-primary)/80"
              >
                Cookies policy
              </Link>
              <Link
                href="/privacy-policy"
                className="text-(--color-primary) hover:text-(--color-primary)/80"
              >
                Privacy policy
              </Link>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-(--color-foreground)/15 bg-white px-5 py-2.5 text-sm font-semibold text-(--color-foreground) transition hover:bg-(--color-foreground)/5"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary)/90"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>

        {managing ? (
          <div className="mt-6 space-y-4 rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/3 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-semibold">Manage preferences</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    clearCookieConsent();
                    setSelection({
                      analytics: hasAnalytics,
                      marketing: hasMarketing,
                    });
                  }}
                  className="rounded-full border border-(--color-foreground)/15 bg-white px-4 py-2 text-xs font-semibold transition hover:bg-(--color-foreground)/5"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setManaging(false)}
                  className="rounded-full border border-(--color-foreground)/15 bg-white px-4 py-2 text-xs font-semibold transition hover:bg-(--color-foreground)/5"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">Essential</div>
                  <div className="text-sm text-(--color-foreground)/70">
                    Needed to provide the website and basic security. Always on.
                  </div>
                </div>
                <div className="rounded-full border border-(--color-foreground)/15 bg-white px-3 py-1 text-xs font-semibold text-(--color-foreground)/75">
                  On
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">Analytics</div>
                  <div className="text-sm text-(--color-foreground)/70">
                    Helps us understand traffic and improve the website.
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={!hasAnalytics}
                    checked={hasAnalytics ? selection.analytics : false}
                    onChange={(event) =>
                      setSelection((prev) => ({
                        ...prev,
                        analytics: event.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-(--color-foreground)/30 text-(--color-primary) disabled:opacity-40"
                  />
                  <span className="text-xs font-semibold text-(--color-foreground)/75">
                    {hasAnalytics ? "Allow" : "Not in use"}
                  </span>
                </label>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">Marketing</div>
                  <div className="text-sm text-(--color-foreground)/70">
                    Helps measure advertising and show relevant ads.
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={!hasMarketing}
                    checked={hasMarketing ? selection.marketing : false}
                    onChange={(event) =>
                      setSelection((prev) => ({
                        ...prev,
                        marketing: event.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-(--color-foreground)/30 text-(--color-primary) disabled:opacity-40"
                  />
                  <span className="text-xs font-semibold text-(--color-foreground)/75">
                    {hasMarketing ? "Allow" : "Not in use"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-(--color-foreground)/15 bg-white px-5 py-2.5 text-sm font-semibold text-(--color-foreground) transition hover:bg-(--color-foreground)/5"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={saveSelection}
                className="rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary)/90"
              >
                Save choices
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
