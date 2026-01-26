"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { cookieConsentEventName, readCookieConsent } from "./cookieConsent";

type TrackingScriptsProps = {
  enabled: boolean;
  googleAnalyticsId: string | null;
  facebookPixelId: string | null;
};

export function TrackingScripts({
  enabled,
  googleAnalyticsId,
  facebookPixelId,
}: TrackingScriptsProps) {
  const hasAnalytics = Boolean(googleAnalyticsId);
  const hasMarketing = Boolean(facebookPixelId);

  const initialConsent = useMemo(() => readCookieConsent(), []);
  const [consent, setConsent] = useState(initialConsent);

  useEffect(() => {
    const refresh = () => setConsent(readCookieConsent());
    window.addEventListener(cookieConsentEventName, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(cookieConsentEventName, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (googleAnalyticsId) {
      const windowKey = `ga-disable-${googleAnalyticsId}`;
      (window as unknown as Record<string, unknown>)[windowKey] = !(
        consent?.analytics ?? false
      );
    }

    if (typeof window !== "undefined" && "fbq" in window) {
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void })
        .fbq;
      if (typeof fbq === "function") {
        fbq("consent", consent?.marketing ? "grant" : "revoke");
      }
    }
  }, [consent?.analytics, consent?.marketing, enabled, googleAnalyticsId]);

  if (!enabled) return null;

  const allowAnalytics = hasAnalytics && Boolean(consent?.analytics);
  const allowMarketing = hasMarketing && Boolean(consent?.marketing);

  return (
    <>
      {allowAnalytics && googleAnalyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
              googleAnalyticsId,
            )}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`}
          </Script>
        </>
      ) : null}

      {allowMarketing && facebookPixelId ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${facebookPixelId}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}

