import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Η φιλοσοφία μας",
  description:
    "Γνωρίστε τη φιλοσοφία και την ταυτότητα του The performART – Larissa, ενός χώρου αφιερωμένου στον πολιτισμό και την τέχνη.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
