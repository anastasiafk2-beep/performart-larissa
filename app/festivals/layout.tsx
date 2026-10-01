import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Φεστιβάλ στη Λάρισα και τη Θεσσαλία",
  description:
    "Φεστιβάλ μουσικής και πολιτισμού στη Λάρισα και τη Θεσσαλία, με ημερομηνίες, πρόγραμμα και χρήσιμες πληροφορίες.",
  path: "/festivals",
  image: "/images/menu/festivals.png",
});

export default function FestivalsLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
