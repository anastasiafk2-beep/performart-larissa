"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alegreya, Spectral } from "next/font/google";
import useEvents from "@/hooks/useEvents";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
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

  const { events } = useEvents();

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
        (event) => event.date === dateKey
      )
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  };

  return (
    
    <main className="min-h-screen events-page bg-white text-[#171717]">



<br></br>
<br></br>
<br></br>
      {/* HERO */}
     <section className="mx-auto max-w-[1100px] px-8 pt-28 pb-20 max-md:px-5 max-md:pt-10 max-md:pb-6">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div className="max-w-[900px] ">

          <p
            className={`${alegreya.className} mb-5 text-xs uppercase tracking-[0.35em] text-red-600 lg:text-[15px]`}
          >
           EVENTS
            </p>
<br></br>
            <h1
  className={`${spectral.className} events-main-title text-5xl uppercase tracking-[0.15em] text-black md:text-6xl lg:text-[55px]`}>
    ΕΚΔΗΛΩΣΕΙΣ
            </h1>
<br></br>
            

            <p
            className={`${alegreya.className} mx-auto mt-6 max-w-2xl text-lg italic leading-[1.9] text-black md:text-xl max-md:mt-4 max-md:text-[15px] max-md:leading-[1.6] max-md:text-center`}
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

      {/* ΤΩΡΑ ΠΑΙΖΟΥΝ */}
      <section className="px-8 py-20 max-md:px-6 max-md:py-10">

        <div className="mx-auto max-w-[1400px] max-md:overflow-x-auto">

          <div className="mb-10 flex items-end justify-between">

            <div>
              <h2 className="font-serif now-playing-title text-[30px]">
                ΤΩΡΑ ΠΑΙΖΟΥΝ
              </h2>

              <br></br>
            </div>

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">

           {nowPlayingEvents.map((event) => (

              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group transition hover:-translate-y-1"
              >
               <div className="relative aspect-[4/3] overflow-hidden ">

  <Image
    src={event.image}
    alt={event.title}
    fill
    className="object-contain transition duration-500 group-hover:scale-[1.02]"
  />

</div>

<br></br>
                <div className="p-5 max-md:px-0">
<br></br>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#d92929]">
                    {categoryLabels[event.category]}
                  </p>

                  <h3 className="font-serif now-playing-event-title text-[22px] leading-tight">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-1 text-[13px] leading-5 max-md:text-[11px] max-md:leading-4">

                    <p>{event.venue}</p>

                    <p>
                      {event.date} · {event.time}
                    </p>

                  </div>
<br></br>

                  <div className="mt-4 inline-block border border-red-700 text-black px-3 py-1.5 text-[9px] uppercase tracking-[0.12em]">
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
      <section className="px-8 py-20 max-md:px-6 max-md:py-10">
        <div className="mx-auto max-w-[1400px] max-md:overflow-x-auto">

          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif agenda-title text-[30px]">
                AGENDA ΤΗΣ ΕΒΔΟΜΑΔΑΣ
              </h2>
            </div>

            <Link
              href="/events/agenda"
              className="text-[12px] uppercase tracking-[0.18em] underline-offset-4 hover:underline max-md:text-[8px] max-md:tracking-[0.12em]"
            >
              ΠΡΟΒΟΛΗ ΟΛΗΣ ΤΗΣ ΑΤΖΕΝΤΑΣ →
            </Link>
          </div>

          <div className="grid grid-cols-2 border border-black/5 md:grid-cols-4 lg:grid-cols-7 max-md:grid-cols-1 max-md:min-w-0 max-md:w-full max-md:max-w-[360px] max-md:mx-auto">

            {weekDays.map((date, index) => {
              const dayEvents = getEventsForAgendaDay(date);

              const isToday =
                formatDateKey(date) === todayKey;

              return (
                <div
                  key={formatDateKey(date)}
                  className={`min-h-[220px] border-black/10 p-5 max-md:min-h-[180px] max-md:p-4 ${
                    index !== 6 ? "border-r" : ""
                  } ${
                    isToday ? "bg-white" : ""
                  }`}
                >

                  {/* ΗΜΕΡΑ */}
                  <div className="text-center">

                    <p
                      className={`text-[12px] font-medium max-md:text-[10px] ${
                        isToday ? "text-[#d92929]" : ""
                      }`}
                    >
                      {weekDayNames[date.getDay()]}
                    </p>

                    <p className="mt-1 text-[11px] text-black/50 max-md:text-[9px]">
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

                          <p className="mt-1 font-serif agenda-event-title text-[15px] leading-tight">
                            {event.title}
                          </p>

                          <p className="mt-2 text-[10px] text-black/50 max-md:text-[8px]">
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


      {/* ΕΡΧΟΝΤΑΙ */}
      <section className="px-8 py-20 max-md:px-6 max-md:py-10">
<br></br>
<br></br>
        <div className="mx-auto max-w-[1400px] max-md:w-full">

          <div className="mb-10 flex items-end justify-between">

            <div>
            <h2 className="font-serif coming-title text-[30px]">
                ΕΡΧΟΝΤΑΙ ΣΥΝΤΟΜΑ
              </h2>

             <br></br>
            </div>

           

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">

           {comingSoonEvents.map((event) => (

              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="border border-black/5 p-5 transition hover:-translate-y-1"
              >

                <p className="text-[11px] uppercase tracking-[0.2em] text-[#d92929]">
                  {categoryLabels[event.category]}
                </p>

                <h3 className="mt-3 font-serif coming-event-title text-2xl">
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
<style jsx>{`
  @media (max-width: 767px) {

    /* Κενό ανάμεσα στο logo και το EVENTS */
    .events-page section:first-of-type p:first-child {
      margin-top: 40px !important;
    }

    /* Τίτλος ΕΚΔΗΛΩΣΕΙΣ */
    .events-main-title {
      font-size: 20px !important;
      letter-spacing: 0.03em !important;
      line-height: 1.1 !important;
    }

    /* Περιγραφή κάτω από τον τίτλο */
    .events-page section:first-of-type p:last-child {
      font-size: 12px !important;
      line-height: 1.5 !important;
    }

    /* ΤΩΡΑ ΠΑΙΖΟΥΝ */
    .now-playing-title {
      font-size: 18px !important;
      line-height: 1.1 !important;
    }

    /* Τίτλος εκδήλωσης */
    .now-playing-event-title {
      font-size: 14px !important;
      line-height: 1.15 !important;
    }

    /* Πληροφορίες εκδήλωσης */
    .now-playing-event-title + div {
      font-size: 10px !important;
      line-height: 1.4 !important;
    }

    /* Κουμπί ΠΕΡΙΣΣΟΤΕΡΑ */
    .now-playing-event-title ~ div:last-child {
      font-size: 8px !important;
    }

    /* AGENDA — ΔΕΝ ΤΗΝ ΠΕΙΡΑΖΟΥΜΕ */
    .agenda-title {
      font-size: 18px !important;
      line-height: 1.1 !important;
    }

    .agenda-event-title {
      font-size: 11px !important;
      line-height: 1.2 !important;
    }

    /* ΕΡΧΟΝΤΑΙ ΣΥΝΤΟΜΑ */
    .coming-title {
      font-size: 18px !important;
      line-height: 1.1 !important;
    }

    .coming-event-title {
      font-size: 14px !important;
      line-height: 1.15 !important;
    }

    /* Γενικά μικρότερα στοιχεία στο mobile */
    .events-page {
      font-size: 12px;
    }

  }
`}</style>
    </main>
  );
}
