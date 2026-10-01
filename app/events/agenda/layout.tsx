import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ατζέντα εκδηλώσεων στη Λάρισα",
  description:
    "Ημερολόγιο πολιτιστικών εκδηλώσεων στη Λάρισα με ημερομηνίες για θέατρο, μουσική, χορό και δράσεις για παιδιά.",
  path: "/events/agenda",
  image: "/images/menu/events.jpg",
});

export default function EventsAgendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
