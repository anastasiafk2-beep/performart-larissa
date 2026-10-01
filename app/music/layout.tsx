import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Μουσική — Νέες κυκλοφορίες και καλλιτέχνες",
  description:
    "Νέες μουσικές κυκλοφορίες, καλλιτέχνες και μουσικά νέα από το The performART – Larissa.",
  path: "/music",
  image: "/images/menu/music.png",
});

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
