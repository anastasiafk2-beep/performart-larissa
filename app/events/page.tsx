"use client";

import Image from "next/image";
import Link from "next/link";
import { events } from "@/content/events";
import { useEffect, useState } from "react";
import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin", "greek"],
  weight: ["300", "400"],
});

const categoryLabels: Record<string, string> = {
  theatre: "ΘΕΑΤΡΟ",
  music: "ΜΟΥΣΙΚΗ",
  dance: "ΧΟΡΟΣ",
  venue: "ΕΚΔΗΛΩΣΗ",
  kids: "ΠΑΙΔΙ",
  other: "ΑΛΛΟ",
};

export default function EventsPage() {

  // ΣΗΜΕΡΙΝΗ ΗΜΕΡΟΜΗΝΙΑ
  const [today, setToday] = useState(() => new Date());

  // Ανανεώνει την ημερομηνία αυτόματα όσο η σελίδα παραμένει ανοιχτή
  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // YYYY-MM-DD με τοπική ώρα Ελλάδας
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // 30 ημέρες από σήμερα
  const thirtyDaysFromToday = new Date(today);
  thirtyDaysFromToday.setHours(0, 0, 0, 0);
  thirtyDaysFromToday.setDate(
    thirtyDaysFromToday.getDate() + 30
  );

  const thirtyDaysKey = [
    thirtyDaysFromToday.getFullYear(),
    String(thirtyDaysFromToday.getMonth() + 1).padStart(2, "0"),
    String(thirtyDaysFromToday.getDate()).padStart(2, "0"),
  ].join("-");

  // ΤΩΡΑ ΠΑΙΖΟΥΝ:
  // από σήμερα και μετά, ταξινομημένα χρονολογικά
  const nowPlayingEvents = [...events]
    .filter((event) => event.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  // ΕΡΧΟΝΤΑΙ ΣΥΝΤΟΜΑ:
  // από 30 ημέρες μετά και μετά
  const comingSoonEvents = [...events]
    .filter((event) => event.date >= thirtyDaysKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  const [calendarDate, setCalendarDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
  "theatre",
  "music",
  "dance",
  "venue",
  "kids",
]);

const toggleCategory = (category: string) => {
  setSelectedCategories((current) =>
    current.includes(category)
      ? current.filter((item) => item !== category)
      : [...current, category]
  );
};

  const monthNames = [
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

  const calendarYear = calendarDate.getFullYear();
  const calendarMonth = calendarDate.getMonth();

  const firstDayOfMonth = new Date(
    calendarYear,
    calendarMonth,
    1
  );

  const daysInMonth = new Date(
    calendarYear,
    calendarMonth + 1,
    0
  ).getDate();

  // Μετατροπή ώστε η εβδομάδα να ξεκινά Δευτέρα
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;

  const calendarDays = Array.from(
    { length: startingDay + daysInMonth },
    (_, index) => {
      if (index < startingDay) return null;
      return index - startingDay + 1;
    }
  );

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      if (!event.date) return false;

      const eventDate = new Date(`${event.date}T00:00:00`);

     return (
  eventDate.getFullYear() === calendarYear &&
  eventDate.getMonth() === calendarMonth &&
  eventDate.getDate() === day &&
  selectedCategories.includes(event.category)
);
    });
  };

  const goToPreviousMonth = () => {
    setCalendarDate(
      new Date(calendarYear, calendarMonth - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCalendarDate(
      new Date(calendarYear, calendarMonth + 1, 1)
    );
  };

    // AGENDA ΤΗΣ ΕΒΔΟΜΑΔΑΣ
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + index);

    return date;
  });

  const weekDayNames = [
    "ΚΥΡ",
    "ΔΕΥ",
    "ΤΡΙ",
    "ΤΕΤ",
    "ΠΕΜ",
    "ΠΑΡ",
    "ΣΑΒ",
  ];

  const formatDateKey = (date: Date) => {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  };

  const getEventsForAgendaDay = (date: Date) => {
    const dateKey = formatDateKey(date);

    return events
      .filter(
        (event) =>
          event.date === dateKey &&
          selectedCategories.includes(event.category)
      )
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  };

  return (
    
    <main className="min-h-screen events-page bg-[#F0DFDE] text-[#171717]">



<br></br>
<br></br>
<br></br>
      {/* HERO */}
      <section className="mx-auto  max-w-[1100px] px-8 pt-28 pb-20">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div className="max-w-[900px] ">

          <p
            className={`${alegreya.className} mb-5 text-xs uppercase tracking-[0.35em] text-[#C13B3A] lg:text-[15px]`}
          >
           EVENTS
            </p>
<br></br>
            <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.15em] text-black md:text-6xl lg:text-[55px]`}
          >
              ΕΚΔΗΛΩΣΕΙΣ 
            </h1>
<br></br>
            

            <p
            className={`${alegreya.className} mx-auto mt-8 max-w-2xl text-lg italic leading-[1.9] text-black/80 md:text-xl`}
          > Πολιτιστικές δράσεις σε όλη την πόλη.
          <br/>
               Ανακαλύψτε τι συμβαίνει τώρα και τι έρχεται.
            </p>
          </div>


        </div>
      </section>
<br></br>
<br></br>
<br></br>
<br></br>

      {/* ΤΩΡΑ ΠΑΙΖΟΥΝ */}
      <section className=" px-8 py-20">

        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10 flex items-end justify-between">

            <div>
              <h2 className="font-serif text-[30px]">
                ΤΩΡΑ ΠΑΙΖΟΥΝ
              </h2>

              <br></br>
            </div>

          </div>


          <div className="grid gap-5 md:grid-cols-2 bg-black/5 lg:grid-cols-4">

           {nowPlayingEvents.map((event) => (

              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group transition hover:bg-[#F0DFDE]/80 hover:-translate-y-1"
              >
               <div className="relative aspect-[4/3] overflow-hidden bg-[#F0DFDE]/10">

  <Image
    src={event.image}
    alt={event.title}
    fill
    className="object-contain transition duration-500 group-hover:scale-[1.02]"
  />

</div>

<br></br>
                <div className="p-5">
<br></br>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#d92929]">
                    {categoryLabels[event.category]}
                  </p>

                  <h3 className="font-serif text-[22px] leading-tight">
                    {event.title}
                  </h3>

                  <div className="mt-5 space-y-1 text-[13px] leading-5">

                    <p>{event.venue}</p>

                    <p>
                      {event.date} · {event.time}
                    </p>

                  </div>
<br></br>

                  <div className="mt-6 inline-block border border-red-700 text-red-800 px-4 py-2 text-[11px] uppercase tracking-[0.15em]">
                    ΠΕΡΙΣΣΟΤΕΡΑ →
                  </div>

                </div>
<br></br>
              </Link>

            ))}

          </div>

        </div>
      </section>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
           {/* AGENDA ΤΗΣ ΕΒΔΟΜΑΔΑΣ */}
      <section className=" px-8 py-20">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-[30px]">
                AGENDA ΤΗΣ ΕΒΔΟΜΑΔΑΣ
              </h2>
            </div>

            <Link
              href="/events/agenda"
              className="text-[12px] uppercase tracking-[0.18em] underline-offset-4 hover:underline"
            >
              ΠΡΟΒΟΛΗ ΟΛΗΣ ΤΗΣ ΑΤΖΕΝΤΑΣ →
            </Link>
          </div>

          <div className="grid grid-cols-2 border border-black/5 md:grid-cols-4 lg:grid-cols-7">

            {weekDays.map((date, index) => {
              const dayEvents = getEventsForAgendaDay(date);

              const isToday =
                formatDateKey(date) === todayKey;

              return (
                <div
                  key={formatDateKey(date)}
                  className={`min-h-[220px] border-black/10 p-5 ${
                    index !== 6 ? "border-r" : ""
                  } ${
                    isToday ? "bg-white/30" : ""
                  }`}
                >

                  {/* ΗΜΕΡΑ */}
                  <div className="text-center">

                    <p
                      className={`text-[12px] font-medium ${
                        isToday ? "text-[#d92929]" : ""
                      }`}
                    >
                      {weekDayNames[date.getDay()]}
                    </p>

                    <p className="mt-1 text-[11px] text-black/50">
                      {String(date.getDate()).padStart(2, "0")}/
                      {String(date.getMonth() + 1).padStart(2, "0")}
                    </p>

                  </div>
<br></br>

                  {/* ΕΚΔΗΛΩΣΕΙΣ */}
                  {dayEvents.length > 0 && (
                    <div className="mt-8 space-y-5">

                      {dayEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          className="block border-l-2 border-[#d92929] pl-3 transition hover:translate-x-1"
                        >

                          <p className="text-[11px] font-medium">
                            {event.time}
                          </p>

                          <p className="mt-1 font-serif text-[15px] leading-tight">
                            {event.title}
                          </p>

                          <p className="mt-2 text-[10px] text-black/50">
                            {event.venue}
                          </p>

                        </Link>
                      ))}

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </section>


<br></br>
<br></br>
<br></br>
<br></br>


      {/* ΗΜΕΡΟΛΟΓΙΟ */}
      <section className=" px-8 py-20">
<br></br>
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10">

            <h2 className="font-serif text-[30px]">
              ΗΜΕΡΟΛΟΓΙΟ ΕΚΔΗΛΩΣΕΩΝ
            </h2>
 
 <Link
              href="/events/all"
              className="absolute left-8 top-32 z-30 inline-flex px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-black transition-all duration-300  lg:left-[1420px] lg:top-355"
>
              ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΕΚΔΗΛΩΣΕΙΣ →
            </Link>
            

          </div>
<br></br>

          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">

          <div className="border border-black/10 p-6">

  {/* CALENDAR HEADER */}
  <div className="mb-8 flex items-center justify-between">

    <button
      onClick={goToPreviousMonth}
      className="text-xl transition hover:text-[#d92929]"
      aria-label="Προηγούμενος μήνας"
    >
      ←
    </button>

    <h3 className="font-serif text-2xl tracking-[0.19em]">
      {monthNames[calendarMonth]} {calendarYear}
    </h3>

    <button
      onClick={goToNextMonth}
      className="text-xl transition hover:text-[#d92929]"
      aria-label="Επόμενος μήνας"
    >
      →
    </button>

  </div>

  <div className="grid grid-cols-7 border-l border-t border-black/10">

    {[
      "ΔΕΥ",
      "ΤΡΙ",
      "ΤΕΤ",
      "ΠΕΜ",
      "ΠΑΡ",
      "ΣΑΒ",
      "ΚΥΡ",
    ].map((day) => (

      <div
        key={day}
        className="border-b border-r border-black/10 p-3 text-center text-[10px] tracking-[0.15em]"
      >
        {day}
      </div>

    ))}

    {calendarDays.map((day, index) => {

      const dayEvents = day
        ? getEventsForDay(day)
        : [];

      return (
        <div
          key={index}
          className="relative min-h-[90px] border-b border-r border-black/10 p-3 text-[12px]"
        >

          {day && (
            <>
              <span
  className={`inline-flex ${
    day === today.getDate() &&
    calendarMonth === today.getMonth() &&
    calendarYear === today.getFullYear()
      ? "h-7 w-7 items-center justify-center rounded-full bg-[#d92929] text-white"
      : ""
  }`}
>
  {day}
</span>

              {dayEvents.length > 0 && (
                <div className="mt-3 space-y-2">

                  {dayEvents.map((event) => (

                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block border-l-2 border-[#d92929] pl-2 transition hover:bg-white/30"
                    >

                      <p className="text-[10px] font-medium">
                        {event.time}
                      </p>

                      <p className="mt-1 font-serif text-[12px] leading-tight">
                        {event.title}
                      </p>

                      <p className="mt-1 text-[9px] text-black/50">
                        {event.venue}
                      </p>

                    </Link>

                  ))}

                </div>
              )}

            </>
          )}

        </div>
      );

    })}

  </div>

</div>         


            {/* FILTERS */}

            
            <aside className="border border-black/10 p-6">

              <p className="mb-6 text-[11px] uppercase tracking-[0.2em]">
                ΦΙΛΤΡΑ
              </p>

             <div className="space-y-3">

  {[
    { value: "theatre", label: "ΘΕΑΤΡΟ" },
    { value: "music", label: "ΜΟΥΣΙΚΗ" },
    { value: "dance", label: "ΧΟΡΟΣ" },
    { value: "venue", label: "ΕΚΔΗΛΩΣΕΙΣ ΧΩΡΩΝ" },
    { value: "kids", label: "ΠΑΙΔΙ" },
  ].map((category) => (

    <label
      key={category.value}
      className="flex cursor-pointer items-center gap-2 text-[11px] tracking-[0.08em]"
    >

      <input
        type="checkbox"
        checked={selectedCategories.includes(category.value)}
        onChange={() => toggleCategory(category.value)}
        className="h-3 w-3 accent-[#d92929]"
      />

      <span>
        {category.label}
      </span>

    </label>

  ))}

</div>

            </aside>

          </div>

        </div>
      </section>

<br></br>
<br></br>
      {/* ΕΡΧΟΝΤΑΙ */}
      <section className=" px-8 py-20">
<br></br>
<br></br>
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10 flex items-end justify-between">

            <div>
              <h2 className="font-serif text-[30px]">
                ΕΡΧΟΝΤΑΙ ΣΥΝΤΟΜΑ
              </h2>

             <br></br>
            </div>

           

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

           {comingSoonEvents.map((event) => (

              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="border border-black/5 p-5 transition hover:-translate-y-1"
              >

                <p className="text-[11px] uppercase tracking-[0.2em] text-[#d92929]">
                  {categoryLabels[event.category]}
                </p>

                <h3 className="mt-3 font-serif text-2xl">
                  {event.title}
                </h3>

                <p className="mt-4 text-[13px]">
                  {event.date}
                </p>

                <p className="text-[13px]">
                  {event.venue}
                </p>

              </Link>

            ))}
<br></br>
          </div>

        </div>
      </section>

    </main>
  );
}