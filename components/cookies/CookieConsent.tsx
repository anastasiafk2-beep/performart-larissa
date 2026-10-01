"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

import { ANALYTICS_CONSENT_KEY as CONSENT_KEY, updateAnalyticsConsent } from "@/lib/analytics";

type ConsentValue = "accepted" | "rejected" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
  let savedConsent: string | null = null;
  try { savedConsent = localStorage.getItem(CONSENT_KEY); } catch { /* Keep analytics off if storage is unavailable. */ }
  updateAnalyticsConsent(savedConsent === "accepted");

  if (savedConsent === "accepted" || savedConsent === "rejected") {
    setConsent(savedConsent);
  }

  function openCookieSettings() {
    setConsent(null);
  }

  window.addEventListener(
    "performart-open-cookie-settings",
    openCookieSettings
  );

  setReady(true);

  return () => {
    window.removeEventListener(
      "performart-open-cookie-settings",
      openCookieSettings
    );
  };
}, []);

  function acceptCookies() {
    try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch { return; }
    updateAnalyticsConsent(true);
    setConsent("accepted");
  }

  function rejectCookies() {
    try { localStorage.setItem(CONSENT_KEY, "rejected"); } catch { /* Still disable the loaded tag. */ }
    updateAnalyticsConsent(false);
    setConsent("rejected");
  }

  if (!ready) {
    return null;
  }

  return (
    <>
      {consent === "accepted" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />


        </>
      )}

      {consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/20 bg-black px-5 py-5 text-white shadow-2xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-base font-semibold">
                Η επιλογή σου για τα cookies
              </p>

              <p className="mt-2 text-sm leading-6 text-white/75">
                Χρησιμοποιούμε απαραίτητες τεχνολογίες για τη λειτουργία του
                site και, με τη συγκατάθεσή σου, Google Analytics για
                στατιστικά επισκεψιμότητας. Μπορείς να αποδεχτείς ή να
                απορρίψεις τα μη απαραίτητα cookies.{" "}
                <Link
                  href="/cookies"
                  className="underline underline-offset-4 hover:text-white"
                >
                  Πολιτική Cookies
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={rejectCookies}
                className="border border-white/50 px-5 py-3 text-sm uppercase tracking-[0.12em] transition hover:bg-white hover:text-black"
              >
                Απόρριψη
              </button>

              <button
                type="button"
                onClick={acceptCookies}
                className="bg-white px-5 py-3 text-sm uppercase tracking-[0.12em] text-black transition hover:bg-zinc-200"
              >
                Αποδοχή
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}