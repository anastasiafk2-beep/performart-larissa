"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/content/events";
import useEvents from "@/hooks/useEvents";

export default function AgendaPage() {
  const { events } = useEvents();
    const [filtersOpen, setFiltersOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("Όλες");
const categoryMap: Record<string, Event["category"] | "all"> = {
  "Όλες": "all",
  "Θέατρο": "theatre",
  "Μουσική": "music",
  "Χορός": "dance",
  "Χώροι": "venue",
  "Παιδικά": "kids",
  "Άλλο": "other",
};
  const [currentWeek, setCurrentWeek] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);

    return monday;
  });

 const weekDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(currentWeek);
  date.setDate(currentWeek.getDate() + index);

  const dayNames = [
    "ΚΥΡΙΑΚΗ",
    "ΔΕΥΤΕΡΑ",
    "ΤΡΙΤΗ",
    "ΤΕΤΑΡΤΗ",
    "ΠΕΜΠΤΗ",
    "ΠΑΡΑΣΚΕΥΗ",
    "ΣΑΒΒΑΤΟ",
  ];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return {
    day: dayNames[date.getDay()],
    date: `${day}/${month}`,
    isoDate: `${year}-${month}-${day}`,
  };
});

const weekEvents = events.filter((event) => {
  const eventDate = new Date(event.date + "T12:00:00");

  const weekStart = new Date(currentWeek);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(currentWeek);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const dateMatch =
    eventDate >= weekStart && eventDate <= weekEnd;

  const selectedCategoryValue =
    categoryMap[selectedCategory];

  const categoryMatch =
    selectedCategoryValue === "all" ||
    event.category === selectedCategoryValue;

  return dateMatch && categoryMatch;
});

  return (
    <main className="min-h-screen events-page bg-white text-black">
<br></br>
<br></br>
      {/* HERO */}

      <section className="relative overflow-hidden px-8 pt-20 pb-12">

        <div className="max-w-7xl mx-auto">

          <p className="text-red-700 text-xs uppercase tracking-[0.35em] mb-5">
            ΕΚΔΗΛΩΣΕΙΣ
          </p>

          <h1 className="text-[55px] font-serif uppercase leading-[1.3]">
            ΑGENDA ΤΗΣ ΕΒΔΟΜΑΔΑΣ
          </h1>

        <Link
  href="/events"
  className="absolute left-8 top-32 z-30 text-white inline-flex border border-black/30 bg-white px-4 py-2 text-[14px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-white lg:left-[1050px] lg:top-25"
>
  ← ΠΙΣΩ ΣΤΙΣ ΕΚΔΗΛΩΣΕΙΣ
</Link>

<br></br>
<br></br>
<br></br>

        </div>

      </section>

      {/* CONTROLS */}
      <section className="max-w-7xl mx-auto px-8 pb-8">

        <div className="flex items-center justify-between mb-6">
  <button
    onClick={() => {
      const previousWeek = new Date(currentWeek);
      previousWeek.setDate(previousWeek.getDate() - 7);
      setCurrentWeek(previousWeek);
    }}
    className="border border-black/10 px-5 py-3 text-[10px] uppercase tracking-[0.2em] hover:border-red-700 hover:text-red-700 transition"
  >
    ← ΠΡΟΗΓΟΥΜΕΝΗ
  </button>

  <div className="text-[17px] uppercase tracking-[0.2em] text-black">
    {weekDays[0].date} — {weekDays[6].date}
  </div>

  <button
    onClick={() => {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentWeek(nextWeek);
    }}
    className="border border-black/10 px-5 py-3 text-xs uppercase tracking-[0.2em] hover:border-red-700 hover:text-red-700 transition"
  >
    ΕΠΟΜΕΝΗ →
  </button>
</div>
<br></br>
        <div className="flex items-center justify-between border-b border-black/10 pb-5">

          <button
  onClick={() => setFiltersOpen(!filtersOpen)}
  className="text-[10px] border border-black/10 px-5 py-3 uppercase tracking-[0.2em] hover:border-red-700 hover:text-red-700 transition"
>
  ΦΙΛΤΡΑ {filtersOpen ? "↑" : "→"}
</button>

          

        </div>

        {filtersOpen && (
  <div className="border-b border-white/10 py-6">
    <div className="flex flex-wrap gap-3">

      {[
  "Όλες",
  "Θέατρο",
  "Μουσική",
  "Χορός",
  "Χώροι",
  "Παιδικά",
  "Άλλο",
]
.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition ${
            selectedCategory === category
              ? "border-red-700 text-red-700"
              : "border-white/20 text-black hover:border-white/50 hover:text-white"
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  </div>
)}
<br></br>
      </section>

      {/* WEEK CALENDAR */}
<section className="max-w-7xl mx-auto px-8">

  <div className="grid grid-cols-7 border border-black/10">

      {weekDays.map((item) => (
        
      <div
        key={item.day}
        className="min-h-[320px] border-r border-black/10 last:border-r-0"
      >

        {/* DAY HEADER */}
        <div className="border-b border-white/10 px-4 py-5">

          <p className="text-xs uppercase tracking-[0.15em]">
            {item.day}
          </p>

          <p className="text-xs text-black mt-2">
            {item.date}
          </p>

        </div>
<br></br>

        {/* EVENTS OF THE DAY */}
        <div className="p-4 space-y-4">

          {events
            .filter((event) => {
  if (!event.date) return false;

  const dateMatch = event.date === item.isoDate;

  const selectedCategoryValue =
    categoryMap[selectedCategory];

  const categoryMatch =
    selectedCategoryValue === "all" ||
    event.category === selectedCategoryValue;

  return dateMatch && categoryMatch;
})

  
            .map((event) => (

              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block border-l-2 border-red-700 pl-3 group"
              >

                <p className="text-red-700 text-[10px] uppercase tracking-[0.15em]">
                  {event.time}
                </p>

                <h3 className="mt-1 text-sm font-serif uppercase leading-tight group-hover:text-red-700 transition">
                  {event.title}
                </h3>

                <p className="mt-2 text-[10px] text-black">
                  {event.venue}
                </p>

              </Link>

            ))}

        </div>

      </div>

    ))}

  </div>

</section>
<br></br>
<br></br>
      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-8 py-16">

        <div className="flex items-center gap-8 mb-8">

          <p className="text-[18px] uppercase tracking-[0.3em] text-black
          ">
            ΕΚΔΗΛΩΣΕΙΣ ΤΗΣ ΕΒΔΟΜΑΔΑΣ
          </p>

          <div/>

        </div>
<br></br>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {weekEvents.map((event) => (

            <article
              key={event.id}
              className="border border-white/10  group"
            >

              <div className="relative aspect-[4/5] overflow-hidden">

                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain transition duration-700 group-hover:scale-[1.02]"/>

              </div>

              <div className="p-5">

                <p className="text-red-700 text-[10px] uppercase tracking-[0.2em]">
                  {event.category}
                </p>

                <h2 className="mt-3 text-xl font-serif uppercase leading-tight">
                  {event.title}
                </h2>

                <p className="mt-4 text-xs text-black">
                  {event.venue}
                </p>

                <p className="mt-2 text-red-700 text-sm">
                  {event.time}
                </p>

                <Link
                  href={`/events/${event.id}`}
                  className="inline-block mt-6 text-xs uppercase tracking-[0.15em] border-b border-red-700 pb-1"
                >
                  ΔΕΣ ΠΕΡΙΣΣΟΤΕΡΑ →
                </Link>

              </div>

            </article>

          ))}
<br></br>

        </div>

      </section>
<br></br>
<br></br>

  

    <style>{`
      @media (max-width: 767px) {

        /* =========================
           MOBILE — AGENDA PAGE
           ========================= */

        /* HERO */
        .events-page section:first-of-type {
          padding-left: 24px !important;
          padding-right: 24px !important;
          padding-top: 35px !important;
          padding-bottom: 20px !important;
        }

        .events-page section:first-of-type > div {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
        }

        /* ΕΚΔΗΛΩΣΕΙΣ */
        .events-page section:first-of-type p {
          font-size: 9px !important;
          letter-spacing: 0.3em !important;
          margin-bottom: 14px !important;
        }

        /* AGENDA ΤΗΣ ΕΒΔΟΜΑΔΑΣ */
        .events-page section:first-of-type h1 {
          font-size: 38px !important;
          line-height: 1.05 !important;
          letter-spacing: 0 !important;
          white-space: normal !important;
          max-width: 100% !important;
        }

        /* BACK BUTTON */
        .events-page section:first-of-type a {
          position: static !important;
          display: inline-block !important;
          margin-top: 22px !important;
          font-size: 9px !important;
          padding: 8px 10px !important;
        }


        /* =========================
           CONTROLS
           ========================= */

        .events-page section:nth-of-type(2) {
          width: 100% !important;
          max-width: none !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
          padding-bottom: 25px !important;
        }

        /* προηγούμενη / ημερομηνία / επόμενη */
        .events-page section:nth-of-type(2) > div:first-child {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 14px !important;
          margin-bottom: 20px !important;
        }

        .events-page section:nth-of-type(2) > div:first-child button {
          font-size: 9px !important;
          padding: 8px 12px !important;
          width: auto !important;
        }

        .events-page section:nth-of-type(2) > div:first-child > div {
          font-size: 13px !important;
          order: -1 !important;
        }

        /* FILTER */
        .events-page section:nth-of-type(2) > div:nth-child(2) {
          display: block !important;
          padding-bottom: 12px !important;
        }

        .events-page section:nth-of-type(2) > div:nth-child(2) button {
          font-size: 9px !important;
          padding: 8px 12px !important;
        }


        /* =========================
           WEEK CALENDAR
           ========================= */

        .events-page section:nth-of-type(3) {
          width: 100% !important;
          max-width: none !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
        }

        /* 7 στήλες → 1 στήλη */
        .events-page section:nth-of-type(3) > div {
          display: grid !important;
          grid-template-columns: 1fr !important;
          width: 100% !important;
        }

        /* Κάθε ημέρα */
        .events-page section:nth-of-type(3) > div > div {
          min-height: 180px !important;
          border-right: 0 !important;
          border-bottom: 1px solid rgba(0,0,0,0.1) !important;
        }

        /* Ημέρα */
        .events-page section:nth-of-type(3) > div > div > div:first-child {
          padding: 14px 16px !important;
        }

        .events-page section:nth-of-type(3) > div > div > div:first-child p {
          font-size: 10px !important;
        }

        /* Events μέσα στην ημέρα */
        .events-page section:nth-of-type(3) > div > div > div:nth-child(3) {
          padding: 16px !important;
        }

        /* Ώρα */
        .events-page section:nth-of-type(3) a p:first-child {
          font-size: 9px !important;
        }

        /* Τίτλος event */
        .events-page section:nth-of-type(3) a h3 {
          font-size: 13px !important;
          line-height: 1.15 !important;
        }

        /* Χώρος */
        .events-page section:nth-of-type(3) a p:last-child {
          font-size: 9px !important;
        }


        /* =========================
           EVENTS LIST
           ========================= */

        .events-page section:nth-of-type(4) {
          width: 100% !important;
          max-width: none !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
          padding-top: 45px !important;
        }

        .events-page section:nth-of-type(4) > div:first-child p {
          font-size: 11px !important;
          letter-spacing: 0.2em !important;
        }

        .events-page section:nth-of-type(4) > div:last-child {
          grid-template-columns: 1fr !important;
        }

        .events-page section:nth-of-type(4) h2 {
          font-size: 18px !important;
        }

        .events-page section:nth-of-type(4) .p-5 {
          padding: 16px !important;
        }

      }
    `}</style>
  

    </main>
  );
}
