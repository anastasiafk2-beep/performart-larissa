import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Σινεμά στη Λάρισα — Προβολές και κριτικές",
  description:
    "Πρόγραμμα κινηματογραφικών προβολών, ταινίες και κριτικές σινεμά στη Λάρισα.",
  path: "/cinema",
  image: "/images/menu/cinema.png",
});

export default function CinemaLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
