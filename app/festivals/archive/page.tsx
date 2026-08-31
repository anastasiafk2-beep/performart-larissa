"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  festivals as localFestivals,
  type Festival,
} from "@/content/festivals/festivals";

const MONTHS = [
  "ΙΑΝΟΥΑΡΙΟΣ",
  "ΦΕΒΡΟΥΑΡΙΟΣ",
  "ΜΑΡΤΙΟΣ",
  "ΑΠΡΙΛΙΟΣ",
  "ΜΑΪΟΣ",
  "ΙΟΥΝΙΟΣ",
  "ΙΟΥΛΙΟΣ",
  "ΑΥΓΟΥΣΤΟΣ",
  "ΣΕΠΤΕΜΒΡΙΟΣ",
  "ΟΚΤΩΒΡΙΟΣ",
  "ΝΟΕΜΒΡΙΟΣ",
  "ΔΕΚΕΜΒΡΙΟΣ",
];

const WEEKDAYS = [
  "ΔΕ",
  "ΤΡ",
  "ΤΕ",
  "ΠΕ",
  "ΠΑ",
  "ΣΑ",
  "ΚΥ",
];

export default function FestivalsArchivePage() {

    const [festivals, setFestivals] =
  useState<Festival[]>(localFestivals);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFestivals() {
      try {
        const response = await fetch("/api/festivals", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();

        if (Array.isArray(data)) {
  const sanityFestivals = data as Festival[];

  const merged = new Map(
    localFestivals.map(
      (festival) => [festival.id, festival] as const
    )
  );

  sanityFestivals.forEach((festival) => {
    merged.set(festival.id, festival);
  });

  setFestivals(Array.from(merged.values()));
}
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.error("Unable to load festivals:", error);
        }
      }
    }

    void loadFestivals();

    return () => controller.abort();
  }, []);

  const [view, setView] = useState<"list" | "calendar">("list");

  const [selectedDate, setSelectedDate] = useState("all");

  const [calendarDate, setCalendarDate] = useState(
    new Date(2026, 7, 1)
  );

  /*
   * Φίλτρα
   *
   * Φεστιβάλ με πραγματικές ημερομηνίες:
   * εμφανίζουμε το εύρος ημερομηνιών.
   *
   * Φεστιβάλ χωρίς ημερομηνίες:
   * εμφανίζουμε μόνο το έτος.
   */
  const dateOptions = useMemo(() => {
    return festivals.map((festival) => ({
      value: festival.year,
label: festival.year,
    }));
  }, []);

  /*
   * Φιλτράρισμα φεστιβάλ
   */
  const filteredFestivals = useMemo(() => {
  const filtered =
    selectedDate === "all"
      ? festivals
      : festivals.filter(
          (festival) => festival.year === selectedDate
        );

  return [...filtered].sort((a, b) => {
    const dateA = a.startDate
      ? new Date(`${a.startDate}T12:00:00`).getTime()
      : new Date(`${a.year}-01-01T12:00:00`).getTime();

    const dateB = b.startDate
      ? new Date(`${b.startDate}T12:00:00`).getTime()
      : new Date(`${b.year}-01-01T12:00:00`).getTime();

    return dateB - dateA;
  });
}, [festivals, selectedDate]);

  /*
   * Ημερολόγιο
   */
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  // Μετατρέπουμε την Κυριακή από 0 σε 6,
  // ώστε η εβδομάδα να ξεκινά Δευτέρα.
  const mondayFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarDays = [
    ...Array(mondayFirstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  /*
   * Έλεγχος αν μία συγκεκριμένη ημέρα
   * ανήκει σε κάποιο φεστιβάλ.
   */
 
 const festivalsOnDay = (day: number) => {
  const currentDate = new Date(year, month, day);

  return festivals.filter((festival) => {
    if (!festival.startDate) {
      return false;
    }

    const startDate = new Date(`${festival.startDate}T12:00:00`);

    const endDate = festival.endDate
      ? new Date(`${festival.endDate}T12:00:00`)
      : startDate;

    return (
      currentDate >= startDate &&
      currentDate <= endDate
    );
  });
};

  const previousMonth = () => {
    setCalendarDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCalendarDate(new Date(year, month + 1, 1));
  };

  return (
    <main
      className="festivals-archive-page relative min-h-screen overflow-hidden bg-white text-[#2B2B2B]"
      style={{
       
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}


    >
      {/* Κεντρικό περιεχόμενο */}
      <div className="pointer-events-none absolute inset-0 bg-white/70" />
     <section className="relative z-10 w-full">
 <div
  style={{
    width: "90%",
    maxWidth: "1260px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
  className="festivals-archive-container pb-24 pt-24"
>
<br></br>
<br></br>
<br></br>
<br></br>
        {/* Πίσω στα Φεστιβάλ */}
        <div className="festivals-archive-back mb-8">
          <Link
            href="/festivals"
            className="inline-flex items-center text-[14px] uppercase tracking-[0.18em] text-[#2B2B2B] transition hover:text-[#C9252D]"
          >
            ← ΠΙΣΩ ΣΤΑ ΦΕΣΤΙΒΑΛ
          </Link>
        </div>
<br></br>
<br></br>
        {/* Τίτλος */}
        <header className="festivals-archive-header mb-16 ">
          <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-[#C9252D]">
            ΦΕΣΤΙΒΑΛ
          </p>

          <h1 className="font-serif text-[45px] uppercase tracking-[0.08em] ">
            ΟΛΑ ΤΑ ΦΕΣΤΙΒΑΛ
          </h1>
<br></br>
<br></br>
         
        </header>

        {/* ΦΙΛΤΡΑ */}
       <div className="festivals-archive-filters mb-10 grid w-full border border-[#D8CEC6] md:grid-cols-2">

          {/* ΗΜΕΡΟΜΗΝΙΑ */}
          <div className="border-b border-[#D8CEC6] p-4 md:border-b-0 md:border-r">
            <label className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#8A817A]">
              ΕΠΙΛΕΞΤΕ ΗΜΕΡΟΜΗΝΙΑ
            </label>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full appearance-none bg-transparent text-sm uppercase tracking-[0.08em] outline-none"
            >
              <option value="all">
                ΟΛΕΣ ΟΙ ΗΜΕΡΟΜΗΝΙΕΣ
              </option>

              {dateOptions.map((option, index) => (
                <option
                  key={`${option.value}-${index}`}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* ΠΡΟΒΟΛΗ ΩΣ */}
          <div className="p-4">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#8A817A]">
              ΠΡΟΒΟΛΗ ΩΣ
            </span>

            <div className="flex gap-6 text-[11px] uppercase tracking-[0.12em]">

              <button
                type="button"
                onClick={() => setView("list")}
                className={`transition ${
                  view === "list"
                    ? "text-[#C9252D]"
                    : "text-[#777] hover:text-[#2B2B2B]"
                }`}
              >
                ☷ ΛΙΣΤΑ
              </button>

              <button
                type="button"
                onClick={() => setView("calendar")}
                className={`transition ${
                  view === "calendar"
                    ? "text-[#C9252D]"
                    : "text-[#777] hover:text-[#2B2B2B]"
                }`}
              >
                ▦ ΗΜΕΡΟΛΟΓΙΟ
              </button>

            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* LISTA */}
        {/* ========================= */}

        {view === "list" && (
          <div className="festivals-archive-list w-full ">
<br></br>
            <div className="festivals-archive-list-header grid grid-cols-[130px_1fr_180px] border-b border-[#BFB4AA] pb-3 text-[12px] uppercase tracking-[0.2em] text-[#5F5751]">
              <span>ΗΜΕΡΟΜΗΝΙΑ</span>
              <span>ΦΕΣΤΙΒΑΛ</span>
              <span className="text-right">ΠΛΗΡΟΦΟΡΙΕΣ</span>
            </div>

            {filteredFestivals.map((festival) => (
              <article
                key={festival.id}
                className="festivals-archive-row grid grid-cols-[130px_1fr_180px] items-center border-b border-[#D8CEC6] py-5"
              >

                {/* ΗΜΕΡΟΜΗΝΙΑ */}
                <div>
              <p className="text-xl text-[#B51F29]">
  {festival.year}
</p>

{festival.dates && (
  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#777]">
    {festival.dates}
  </p>
)}
                </div>

                {/* ΦΕΣΤΙΒΑΛ */}
                <div className="flex items-center gap-5">

                  {festival.image ? (
                    <img
                      src={festival.image}
                      alt={festival.title}
                      className="h-20 w-28 object-cover"
                    />
                  ) : (
                    <div className="h-20 w-28 border border-[#D8CEC6]" />
                  )}

                  <div>
                    <h2 className="font-serif text-2xl uppercase tracking-[0.04em]">
                      {festival.title}
                    </h2>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#777]">
                      {festival.location || festival.year}
                    </p>
                  </div>
                </div>

                {/* ΠΛΗΡΟΦΟΡΙΕΣ */}
                <div className="text-right">
                  <Link
                    href={`/festivals/${festival.id}`}
                    className="inline-flex border border-[#C9252D] px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#C9252D] transition hover:bg-[#C9252D] hover:text-white"
                  >
                    ΔΕΙΤΕ ΤΟ ΦΕΣΤΙΒΑΛ →
                  </Link>
                </div>

              </article>
            ))}

          </div>
        )}

        {/* ========================= */}
        {/* ΗΜΕΡΟΛΟΓΙΟ */}
        {/* ========================= */}

        {view === "calendar" && (
          <div className="festivals-archive-calendar-layout grid gap-10  lg:grid-cols-[1fr_320px]">

            {/* CALENDAR */}
            <div className="festivals-archive-calendar border border-[#D8CEC6] p-6 md:p-8">

              {/* MONTH HEADER */}
              <div className="mb-8 flex items-center justify-between">

                <button
                  type="button"
                  onClick={previousMonth}
                  className="text-[#C9252D] transition hover:scale-110"
                >
                  ←
                </button>

                <h2 className="font-serif text-2xl uppercase tracking-[0.18em]">
                  {MONTHS[month]} {year}
                </h2>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="text-[#C9252D] transition hover:scale-110"
                >
                  →
                </button>

              </div>

              {/* WEEKDAYS */}
              <div className="grid grid-cols-7 mb-3 ">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[10px] uppercase tracking-[0.15em] text-[#8A817A]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* DAYS */}
              <div className="grid grid-cols-7">

                {calendarDays.map((day, index) => {
                  if (!day) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="min-h-[80px] border-t border-transparent"
                      />
                    );
                  }

                  const dayFestivals = festivalsOnDay(day);

                  return (
                    <div
                      key={day}
                      className={`relative min-h-[80px] border-t border-[#E4DCD5] p-2 ${
                        dayFestivals.length
                          ? "cursor-pointer"
                          : ""
                      }`}
                    >

                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                          dayFestivals.length
                            ? "bg-[#F3D8D5] text-[#C9252D]"
                            : ""
                        }`}
                      >
                        {day}
                      </span>

                      {dayFestivals.length > 0 && (
                        <div className="mt-2 space-y-1">

                          {dayFestivals.map((festival) => (
                            <Link
                              key={festival.id}
                              href={`/festivals/${festival.id}`}
                              className="block text-[8px] uppercase leading-tight tracking-[0.05em] text-[#C9252D] hover:underline"
                            >
                              {festival.title}
                            </Link>
                          ))}

                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            </div>

            {/* FESTIVALS ΤΟΥ ΜΗΝΑ */}
            <aside className="festivals-archive-month">

              <h3 className="mb-5 font-serif text-xl uppercase tracking-[0.12em]">
                ΦΕΣΤΙΒΑΛ ΤΟΥ ΜΗΝΑ
              </h3>

              <div className="space-y-5">

               {festivals
  .filter((festival) => {
    if (!festival.startDate) {
      return false;
    }

    const startDate = new Date(`${festival.startDate}T12:00:00`);
    const endDate = festival.endDate
      ? new Date(`${festival.endDate}T12:00:00`)
      : startDate;

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    return (
      startDate <= monthEnd &&
      endDate >= monthStart
    );
  })
                  .map((festival) => (
                    <Link
                      key={festival.id}
                      href={`/festivals/${festival.id}`}
                      className="group block border-t border-[#D8CEC6] pt-4"
                    >
                        
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#C9252D]">
                        {festival.dates}
                      </p>
<br></br>
                      <h4 className="mt-2 text-[17px] font-serif text-xl text-black/70 uppercase">
                        {festival.title}
                      </h4>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[#777]">
                        {festival.location}
                      </p>

                      <span className="mt-3 inline-block text-[9px] uppercase tracking-[0.15em] text-[#C9252D] group-hover:underline">
                        ΔΕΙΤΕ ΤΟ ΦΕΣΤΙΒΑΛ →
                      </span>
                    </Link>
                  ))}

              </div>

            </aside>

          </div>
        )}
</div>
      </section>

      

      {/* =========================================================
          MOBILE ONLY
          Το desktop παραμένει ακριβώς όπως είναι.
         ========================================================= */}
      <style>{`
        @media (max-width: 767px) {

          /* PAGE */
          .festivals-archive-page {
            width: 100% !important;
            max-width: 100vw !important;
            min-width: 0 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          /* MAIN CONTAINER */
          .festivals-archive-page .festivals-archive-container {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 145px 20px 60px !important;

            box-sizing: border-box !important;
          }

          /* DESKTOP <br> SPACING */
          .festivals-archive-page .festivals-archive-container > br {
            display: none !important;
          }

          /* BACK */
          .festivals-archive-page .festivals-archive-back {
            width: 100% !important;
            margin: 0 0 38px !important;
            padding: 0 !important;
          }

          .festivals-archive-page .festivals-archive-back a {
            font-size: 10px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.12em !important;
            white-space: nowrap !important;
          }

          /* HEADER */
          .festivals-archive-page .festivals-archive-header {
            width: 100% !important;
            margin: 0 0 34px !important;
            padding: 0 !important;
            text-align: center !important;
          }

          .festivals-archive-page .festivals-archive-header > br {
            display: none !important;
          }

          .festivals-archive-page .festivals-archive-header p {
            margin: 0 0 12px !important;
            font-size: 9px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.24em !important;
            text-align: center !important;
          }

          .festivals-archive-page .festivals-archive-header h1 {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 30px !important;
            line-height: 1.08 !important;
            letter-spacing: 0.055em !important;

            text-align: center !important;
            white-space: normal !important;
          }

          /* FILTERS */
          .festivals-archive-page .festivals-archive-filters {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 0 35px !important;

            display: flex !important;
            flex-direction: column !important;

            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-filters > div {
            width: 100% !important;
            min-width: 0 !important;

            border-right: none !important;
            border-bottom: 1px solid #D8CEC6 !important;

            padding: 14px !important;

            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-filters > div:last-child {
            border-bottom: none !important;
          }

          .festivals-archive-page .festivals-archive-filters label,
          .festivals-archive-page .festivals-archive-filters span {
            font-size: 8px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.13em !important;
          }

          .festivals-archive-page .festivals-archive-filters select {
            width: 100% !important;
            max-width: 100% !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-filters > div:last-child > div {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 14px !important;
          }

          .festivals-archive-page .festivals-archive-filters button {
            font-size: 9px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.09em !important;
          }

          /* LIST */
          .festivals-archive-page .festivals-archive-list {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-list > br {
            display: none !important;
          }

          .festivals-archive-page .festivals-archive-list-header {
            display: none !important;
          }

          /* EACH FESTIVAL */
          .festivals-archive-page .festivals-archive-row {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;

            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;

            gap: 16px !important;

            padding: 18px 0 !important;
            box-sizing: border-box !important;
          }

          /* DATE */
          .festivals-archive-page .festivals-archive-row > div:nth-child(1) {
            width: 100% !important;
            padding: 0 !important;
          }

          .festivals-archive-page .festivals-archive-row > div:nth-child(1) p:first-child {
            font-size: 25px !important;
            line-height: 1 !important;
          }

          .festivals-archive-page .festivals-archive-row > div:nth-child(1) p:nth-child(2) {
            margin-top: 5px !important;
            font-size: 9px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.10em !important;
          }

          /* FESTIVAL + IMAGE */
          .festivals-archive-page .festivals-archive-row > div:nth-child(2) {
            width: 100% !important;
            min-width: 0 !important;

            display: flex !important;
            align-items: center !important;

            gap: 12px !important;
          }

          .festivals-archive-page .festivals-archive-row > div:nth-child(2) img,
          .festivals-archive-page .festivals-archive-row > div:nth-child(2) > div:first-child {
            width: 62px !important;
            min-width: 62px !important;
            height: 72px !important;

            object-fit: cover !important;
            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-row > div:nth-child(2) > div:last-child {
            min-width: 0 !important;
            flex: 1 !important;
          }

          .festivals-archive-page .festivals-archive-row h2 {
            margin: 0 !important;
            font-size: 16px !important;
            line-height: 1.2 !important;
            letter-spacing: 0.02em !important;
            overflow-wrap: break-word !important;
          }

          .festivals-archive-page .festivals-archive-row > div:nth-child(2) p {
            margin-top: 5px !important;
            font-size: 8px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.08em !important;
          }

          /* INFO BUTTON */
          .festivals-archive-page .festivals-archive-row > div:nth-child(3) {
            width: 100% !important;
            text-align: left !important;
          }

          .festivals-archive-page .festivals-archive-row > div:nth-child(3) a {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;

            width: auto !important;
            max-width: 100% !important;

            padding: 8px 12px !important;

            font-size: 8px !important;
            line-height: 1.3 !important;
            letter-spacing: 0.10em !important;

            box-sizing: border-box !important;
            white-space: nowrap !important;
          }

          /* CALENDAR VIEW */
          .festivals-archive-page .festivals-archive-calendar-layout {
            width: 100% !important;
            max-width: 100% !important;

            display: flex !important;
            flex-direction: column !important;
            gap: 35px !important;

            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-calendar {
            width: 100% !important;
            max-width: 100% !important;

            min-width: 0 !important;

            padding: 12px !important;

            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:first-child {
            margin-bottom: 18px !important;
          }

          .festivals-archive-page .festivals-archive-calendar h2 {
            font-size: 14px !important;
            line-height: 1.2 !important;
            letter-spacing: 0.09em !important;
            white-space: nowrap !important;
          }

          .festivals-archive-page .festivals-archive-calendar button {
            font-size: 12px !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:nth-child(2),
          .festivals-archive-page .festivals-archive-calendar > div:nth-child(3) {
            width: 100% !important;
            min-width: 0 !important;

            grid-template-columns: repeat(7, minmax(0, 1fr)) !important;

            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:nth-child(2) > div {
            min-width: 0 !important;
            padding: 5px 1px !important;

            font-size: 7px !important;
            line-height: 1.2 !important;
            letter-spacing: 0.03em !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:nth-child(3) > div {
            min-width: 0 !important;
            min-height: 56px !important;

            padding: 4px !important;

            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:nth-child(3) span {
            width: 24px !important;
            height: 24px !important;

            font-size: 10px !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:nth-child(3) a {
            display: block !important;

            max-width: 100% !important;

            font-size: 6px !important;
            line-height: 1.2 !important;
            letter-spacing: 0 !important;

            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          /* FESTIVALS OF THE MONTH */
          .festivals-archive-page .festivals-archive-month {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .festivals-archive-page .festivals-archive-month h3 {
            margin-bottom: 18px !important;
            font-size: 19px !important;
            line-height: 1.2 !important;
            letter-spacing: 0.08em !important;
          }

          .festivals-archive-page .festivals-archive-month br {
            display: none !important;
          }

          .festivals-archive-page .festivals-archive-month h4 {
            margin-top: 8px !important;
            font-size: 16px !important;
            line-height: 1.2 !important;
          }

          .festivals-archive-page .festivals-archive-month p {
            font-size: 8px !important;
            line-height: 1.4 !important;
          }

          .festivals-archive-page .festivals-archive-month span {
            margin-top: 10px !important;
            font-size: 8px !important;
            line-height: 1.3 !important;
          }
        }

        @media (max-width: 480px) {

          .festivals-archive-page .festivals-archive-container {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .festivals-archive-page .festivals-archive-header h1 {
            font-size: 27px !important;
          }

          .festivals-archive-page .festivals-archive-row h2 {
            font-size: 15px !important;
          }

          .festivals-archive-page .festivals-archive-calendar h2 {
            font-size: 13px !important;
          }

          .festivals-archive-page .festivals-archive-calendar > div:nth-child(3) > div {
            min-height: 52px !important;
            padding: 3px !important;
          }
        }
      `}</style>

    </main>
  );
}