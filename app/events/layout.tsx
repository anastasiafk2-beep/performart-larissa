import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Εκδηλώσεις στη Λάρισα",
  description:
    "Οι πολιτιστικές εκδηλώσεις της Λάρισας: θέατρο, μουσική, χορός, παιδικές δράσεις και όσα αξίζει να δείτε.",
  path: "/events",
  image: "/images/menu/events.jpg",
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
