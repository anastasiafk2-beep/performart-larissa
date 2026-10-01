export const ANALYTICS_CONSENT_KEY = "performart-cookie-consent";
export const ANALYTICS_READY_EVENT = "performart-analytics-ready";
export type AnalyticsEvent = "newsletter_signup" | "giveaway_click" | "social_click" | "article_view" | "interview_view" | "event_view" | "festival_view";
export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
let initialized = false;

export function hasAnalyticsConsent(): boolean {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "accepted";
  } catch { return false; }
}

export function updateAnalyticsConsent(accepted: boolean): void {
  if (typeof window === "undefined") return;
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return;
  const browser = window as AnalyticsWindow;
  // Also disable an already-loaded Google tag when consent is withdrawn.
  Reflect.set(window, "ga-disable-" + id, !accepted);
  if (!accepted) {
    browser.gtag?.("consent", "update", { analytics_storage: "denied" });
    return;
  }
  if (!hasAnalyticsConsent()) return;
  if (!browser.gtag) {
    browser.dataLayer = browser.dataLayer || [];
    browser.gtag = function () {
      // The Google tag consumes an Arguments object, including before it loads.
      // eslint-disable-next-line prefer-rest-params -- gtag expects an Arguments object.
      browser.dataLayer!.push(arguments);
    };
  }
  browser.gtag("consent", "update", { analytics_storage: "granted" });
  if (!initialized) {
    initialized = true;
    browser.gtag("js", new Date());
    browser.gtag("config", id);
  }
  window.dispatchEvent(new Event(ANALYTICS_READY_EVENT));
}

export function trackEvent(name: AnalyticsEvent, params: AnalyticsParams = {}): boolean {
  if (!hasAnalyticsConsent() || !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return false;
  try {
    const browser = window as AnalyticsWindow;
    if (!browser.gtag || Reflect.get(window, "ga-disable-" + process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) === true) return false;
    browser.gtag("event", name, {
      ...params,
      page_path: window.location.pathname,
      // Never include form values or confirmation query parameters.
      page_location: window.location.origin + window.location.pathname,
    });
    return true;
  } catch { return false; }
}
