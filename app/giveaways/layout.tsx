import type { Metadata } from "next";

import CultureDarkTheme from "@/components/layout/CultureDarkTheme";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Giveaways — Διαγωνισμοί πολιτισμού",
  description:
    "Διαγωνισμοί και προσκλήσεις για παραστάσεις, συναυλίες και πολιτιστικές εκδηλώσεις από το The performART – Larissa.",
  path: "/giveaways",
  image: "/images/menu/giveaways.png",
});

export default function GiveawaysLayout({ children }: { children: React.ReactNode }) {
  return <CultureDarkTheme>{children}</CultureDarkTheme>;
}
