"use client";

import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

type Props = ComponentProps<"a"> & {
  eventName: "social_click" | "giveaway_click";
  eventParams: AnalyticsParams;
};

export default function TrackedLink({ eventName, eventParams, onClick, onAuxClick, ...props }: Props) {
  function track() {
    if (props.href) trackEvent(eventName, { ...eventParams, link_url: props.href });
  }
  return <a {...props} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented) track();
  }} onAuxClick={(event) => {
    onAuxClick?.(event);
    if (!event.defaultPrevented && event.button === 1) track();
  }} />;
}
