import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Συνεντεύξεις — Πρόσωπα του πολιτισμού",
  description:
    "Συνεντεύξεις με καλλιτέχνες, δημιουργούς και ανθρώπους του πολιτισμού από τη Λάρισα και όλη την Ελλάδα.",
  path: "/interviews",
  image: "/images/menu/interviews.png",
});

export default function InterviewsLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
