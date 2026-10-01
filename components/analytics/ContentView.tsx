"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ANALYTICS_READY_EVENT, trackEvent, type AnalyticsEvent, type AnalyticsParams } from "@/lib/analytics";

type Props = {
  event: Extract<AnalyticsEvent, "article_view" | "interview_view" | "event_view" | "festival_view">;
  contentId: string;
  params?: AnalyticsParams;
  ready?: boolean;
};

export default function ContentView({ event, contentId, params = {}, ready = true }: Props) {
  const pathname = usePathname();
  const sent = useRef<string | null>(null);
  const serializedParams = JSON.stringify(params);
  useEffect(() => {
    const key = JSON.stringify([pathname, event, contentId]);
    if (sent.current !== key) sent.current = null;
    function send() {
      if (!ready || sent.current === key) return;
      if (trackEvent(event, { ...JSON.parse(serializedParams), content_id: contentId })) sent.current = key;
    }
    send();
    window.addEventListener(ANALYTICS_READY_EVENT, send);
    return () => window.removeEventListener(ANALYTICS_READY_EVENT, send);
  }, [pathname, event, contentId, ready, serializedParams]);
  return null;
}
