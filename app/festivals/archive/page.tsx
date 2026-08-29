"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { festivals } from "@/content/festivals";
import Footer from "@/components/layout/Footer";

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
      value:
        festival.startDate && festival.endDate
          ? `${festival.startDate}_${festival.endDate}`
          : festival.year,
      label:
        festival.startDate && festival.endDate
          ? festival.dates
          : festival.year,
    }));
  }, []);

  /*
   * Φιλτράρισμα φεστιβάλ
   */
  const filteredFestivals = useMemo(() => {
    if (selectedDate === "all") {
      return festivals;
    }

    return festivals.filter((festival) => {
      const value =
        festival.startDate && festival.endDate
          ? `${festival.startDate}_${festival.endDate}`
          : festival.year;

      return value === selectedDate;
    });
  }, [selectedDate]);

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
    const current = new Date(year, month, day);

    return festivals.filter((festival) => {
      if (!festival.startDate || !festival.endDate) {
        return false;
      }

      const start = new Date(`${festival.startDate}T00:00:00`);
      const end = new Date(`${festival.endDate}T23:59:59`);

      return current >= start && current <= end;
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
      className="relative min-h-screen overflow-hidden bg-[#B5DED7] text-[#2B2B2B]"
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
  className="pb-24 pt-24"
>
<br></br>
<br></br>
<br></br>
<br></br>
        {/* Πίσω στα Φεστιβάλ */}
        <div className="mb-8">
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
        <header className="mb-16 ">
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
       <div className="mb-10 grid w-full border border-[#D8CEC6] md:grid-cols-2">

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
          <div className="w-full ">
<br></br>
            <div className="grid grid-cols-[130px_1fr_180px] border-b border-[#BFB4AA] pb-3 text-[12px] uppercase tracking-[0.2em] text-[#5F5751]">
              <span>ΗΜΕΡΟΜΗΝΙΑ</span>
              <span>ΦΕΣΤΙΒΑΛ</span>
              <span className="text-right">ΠΛΗΡΟΦΟΡΙΕΣ</span>
            </div>

            {filteredFestivals.map((festival) => (
              <article
                key={festival.id}
                className="grid grid-cols-[130px_1fr_180px] items-center border-b border-[#D8CEC6] py-5"
              >

                {/* ΗΜΕΡΟΜΗΝΙΑ */}
                <div>
                  <p className="text-xl text-[#B51F29]">
                    {festival.startDate
                      ? new Date(
                          `${festival.startDate}T00:00:00`
                        ).getDate()
                      : festival.year}
                  </p>

                  {festival.startDate && (
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
          <div className="grid gap-10  lg:grid-cols-[1fr_320px]">

            {/* CALENDAR */}
            <div className="border border-[#D8CEC6] p-6 md:p-8">

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
            <aside>

              <h3 className="mb-5 font-serif text-xl uppercase tracking-[0.12em]">
                ΦΕΣΤΙΒΑΛ ΤΟΥ ΜΗΝΑ
              </h3>

              <div className="space-y-5">

                {festivals
                  .filter((festival) => {
                    if (!festival.startDate) return false;

                    const date = new Date(
                      `${festival.startDate}T00:00:00`
                    );

                    return (
                      date.getFullYear() === year &&
                      date.getMonth() === month
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

      
    </main>
  );
}