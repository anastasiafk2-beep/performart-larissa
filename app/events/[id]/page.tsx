"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { events } from "@/content/events";

const categoryNames: Record<string, string> = {
  theatre: "ΘΕΑΤΡΟ",
  music: "ΜΟΥΣΙΚΗ",
  dance: "ΧΟΡΟΣ",
  venue: "ΕΚΔΗΛΩΣΗ",
  kids: "ΠΑΙΔΙ",
  other: "ΑΛΛΟ",
};

export default function EventPage() {
  const params = useParams();

  const eventId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <main className="min-h-screen bg-[#F0DFDE] text-white flex items-center justify-center px-8">
        <div className="text-center ">
          <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">
            ΕΚΔΗΛΩΣΕΙΣ
          </p>

          <h1 className="text-4xl md:text-6xl font-serif uppercase">
            Η ΕΚΔΗΛΩΣΗ ΔΕΝ ΒΡΕΘΗΚΕ
          </h1>

          <Link
            href="/events"
            className="inline-block mt-8 border border-white/30 px-5 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition"
          >
            ← ΠΙΣΩ ΣΤΙΣ ΕΚΔΗΛΩΣΕΙΣ
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    event.date + "T12:00:00"
  ).toLocaleDateString("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const today = new Date().toISOString().split("T")[0];

const relatedEvents = events
  .filter(
    (item) =>
      item.id !== event.id &&
      item.date >= today
  )
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 3);

  return (
    <main className="min-h-screen events-page bg-[#F0DFDE] text-white">

      {/* HEADER / BACK */}

      <section className="px-8 md:px-12 pt-10">

        <Link
  href="/events"
  className="absolute left-8 top-32 z-30 inline-flex border border-black/30 bg-red-800 px-4 py-2 text-[14px] uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white lg:left-[1550px] lg:top-30"
>
  ← ΠΙΣΩ ΣΤΙΣ ΕΚΔΗΛΩΣΕΙΣ
</Link>

      </section>

<br></br>
<br></br>
<br></br>
<br></br>
      {/* MAIN EVENT */}

      <section className="max-w-7xl mx-auto px-8 md:px-12 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">

          {/* POSTER */}

          <div className="relative">

            <div className="relative w-full bg-white/5">

              <Image
                src={event.image}
                alt={event.title}
                width={900}
                height={1200}
                className="w-full h-auto object-contain"
                priority
              />

            </div>

          </div>


          {/* INFORMATION */}

          <div className="flex flex-col justify-between">

            <div>
<br></br>
<br></br>
<br></br>
              <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-6">
                {categoryNames[event.category] ?? event.category}
              </p>

              <h1 className="text-6xl md:text-5xl xl:text-4xl text-black font-serif uppercase leading-[0.95]">
                {event.title}
              </h1>
<br></br>

              {/* DATE / TIME / VENUE */}

              <div className="mt-12 border-t border-white/15">

                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/15">

                  <div className="py-6 border-b md:border-b-0 md:border-r border-white/15 md:pr-8">
<br></br>
<br></br>
<br></br>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-black mb-2">
                      ΗΜΕΡΟΜΗΝΙΑ
                    </p>

                    <p className="text-black uppercase">
                      {formattedDate}
                    </p>

                  </div>


                  <div className="py-6 md:pl-8">
<br></br>
<br></br>

<br></br>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-black mb-2">
                      ΩΡΑ
                    </p>

                    <p className="text-black">
                      {event.time || "—"}
                    </p>

                  </div>

                </div>


<br></br>

                <div className="py-6 border-b border-white/15">

                  <p className="text-[10px] uppercase tracking-[0.25em] text-black
                  
                mb-2">
                    ΧΩΡΟΣ
                  </p>

                  <p className="text-black">
                    {event.venue}
                  </p>

                  {event.location && (
                    <p className="text-sm text-black mt-1">
                      {event.location}
                    </p>
                  )}

                </div>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="mt-8">

              <p className="text-[12px] uppercase tracking-[0.25em] text-red-700 mb-5">
                ΠΕΡΙΓΡΑΦΗ
              </p>

              <p className="text-[17px] leading-relaxed text-black max-w-2xl">
                {event.description}
              </p>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
            </div>

          </div>

        </div>

      </section>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
      {/* RELATED EVENTS */}

      {relatedEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 md:px-12 pb-24">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-red-700">
              ΙΣΩΣ ΣΑΣ ΕΝΔΙΑΦΕΡΟΥΝ
            </p>

            <h2 className="mt-3 text-[40px] text-black font-serif uppercase">
              ΑΛΛΕΣ ΕΚΔΗΛΩΣΕΙΣ
            </h2>

          </div>
<br></br>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {relatedEvents.map((relatedEvent) => (

              <Link
                key={relatedEvent.id}
                href={`/events/${relatedEvent.id}`}
                className="group block border border-white/10"
              >

                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">

                  <Image
                    src={relatedEvent.image}
                    alt={relatedEvent.title}
                    fill
                    className="object-contain group-hover:scale-[1.02] transition duration-700"
                  />

                </div>

<br></br>
                <div className="p-5">

                  <p className="text-red-700 text-[10px] uppercase tracking-[0.2em]">
                    {categoryNames[relatedEvent.category] ??
                      relatedEvent.category}
                  </p>

                  <h3 className="mt-3 text-xl text-black font-serif uppercase leading-tight">
                    {relatedEvent.title}
                  </h3>

                  <p className="mt-4 text-xs text-black">
                    {relatedEvent.venue}
                  </p>

                  <p className="mt-2 text-red-700 text-sm">
                    {relatedEvent.time}
                  </p>
<br></br>
                  <p className="mt-5 text-xs text-black uppercase tracking-[0.15em] border-b border-red-700 inline-block pb-1">
                    ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
                  </p>

                </div>
<br></br>
              </Link>

            ))}
<br></br>
<br></br>
          </div>

        </section>
      )}

    </main>
  );
}