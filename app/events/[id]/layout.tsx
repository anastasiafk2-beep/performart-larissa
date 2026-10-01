import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import { getEvents } from "@/lib/events-data";
import {
  createBreadcrumbJsonLd,
  createEventJsonLd,
  createPageMetadata,
  eventDateTime,
} from "@/lib/seo";

type EventDetailLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EventDetailLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const event = (await getEvents()).find((item) => item.id === id);
  const path = `/events/${encodeURIComponent(id)}`;

  if (!event) {
    return createPageMetadata({
      title: "Η εκδήλωση δεν βρέθηκε",
      description: "Η εκδήλωση που ζητήσατε δεν είναι διαθέσιμη.",
      path,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: event.title,
    description: event.description,
    path,
    image: event.image,
    imageAlt: `Αφίσα της εκδήλωσης ${event.title}`,
  });
}

export default async function EventDetailLayout({
  children,
  params,
}: EventDetailLayoutProps) {
  const { id } = await params;
  const event = (await getEvents()).find((item) => item.id === id);

  if (!event) return children;

  const path = `/events/${encodeURIComponent(event.id)}`;

  return (
    <>
      <JsonLd
        data={[
          createEventJsonLd({
            name: event.title,
            description: event.description,
            path,
            startDate: eventDateTime(event.date, event.time),
            image: event.image,
            venue: event.venue,
            locality: event.location,
          }),
          createBreadcrumbJsonLd([
            { name: "Αρχική", path: "/" },
            { name: "Εκδηλώσεις", path: "/events" },
            { name: event.title, path },
          ]),
        ]}
      />
      {children}
    </>
  );
}
