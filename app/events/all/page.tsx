"use client";

import Image from "next/image";
import Link from "next/link";
import { events } from "@/content/events";
import { useMemo, useState } from "react";

const categoryLabels: Record<string, string> = {
  theatre: "ΘΕΑΤΡΟ",
  music: "ΜΟΥΣΙΚΗ",
  dance: "ΧΟΡΟΣ",
  event: "ΕΚΔΗΛΩΣΗ",
  workshop: "ΣΕΜΙΝΑΡΙΟ",
 
};

export default function AllEventsPage() {

      const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedVenue, setSelectedVenue] = useState("all");
const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [
    { value: "all", label: "Όλες οι κατηγορίες" },
    { value: "theatre", label: "Θέατρο" },
    { value: "music", label: "Μουσική" },
    { value: "dance", label: "Χορός" },
    { value: "event", label: "Εκδήλωση" },
    { value: "workshop", label: "Σεμινάριο" },
   
  ];

  const venues = Array.from(
    new Set(events.map((event) => event.venue).filter(Boolean))
  );

  const filteredEvents = useMemo(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    const dateFromTodayMatch = eventDate >= today;

    const categoryMatch =
      selectedCategory === "all" ||
      event.category === selectedCategory;

    const venueMatch =
      selectedVenue === "all" ||
      event.venue === selectedVenue;

    const monthMatch =
      selectedDate === "all" ||
      eventDate.toISOString().slice(0, 7) === selectedDate;

    return (
      dateFromTodayMatch &&
      categoryMatch &&
      venueMatch &&
      monthMatch
    );
  });
}, [selectedCategory, selectedDate, selectedVenue]);

  return (
    <main className="min-h-screen events-page bg-[#F0DFDE] text-[#111]">

      {/* HERO */}
      <section className="relative min-h-[25vh] overflow-hidden  text-white">
<Link
  href="/events"
  className="absolute left-8 top-32 z-30 inline-flex border border-black/30 bg-red-800 px-4 py-2 text-[14px] uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white lg:left-[1050px] lg:top-25"
>
  ← ΠΙΣΩ ΣΤΙΣ ΕΚΔΗΛΩΣΕΙΣ
</Link>
        <div />

        <div className=" z-10 mx-auto flex min-h-[20vh] max-w-[1400px] items-end px-8 pb-20 lg:px-16">

          <div className="max-w-[1100px] ">

          

            <p className="mb-5 text-[12px] uppercase tracking-[0.35em] text-[#e62b2b]">
              ΕΚΔΗΛΩΣΕΙΣ
            </p>

            <h1 className="font-serif text-black text-[55px] leading-[0.98] tracking-[-0.001em]">
              ΟΛΕΣ ΟΙ ΕΚΔΗΛΩΣΕΙΣ 
             
            </h1>
<br></br>
            <p className="mt-10 max-w-[520px] text-black leading-relaxed">
              Παραστάσεις, συναυλίες, χορός, φεστιβάλ,
              σεμινάρια και πολιτιστικές δράσεις σε όλη την πόλη.
            </p>

          </div>

        </div>
      </section>

{/* FILTER BAR */}

<section className="border-b border-black/15 ">

  <div className="mx-auto max-w-[1500px] px-8 lg:px-16">

    {/* TOP BAR */}

    <div className="flex items-center justify-between py-6">

      <button
        onClick={() => setFiltersOpen(!filtersOpen)}
        className="group flex items-center gap-3 text-xs uppercase tracking-[0.25em]"
      >

        <span className="border border-black/40 px-5 py-3 transition-all duration-300 group-hover:bg-black group-hover:text-white">
          ΦΙΛΤΡΑ
        </span>

        <span className="text-lg">
          {filtersOpen ? "−" : "+"}
        </span>

      </button>


      <div className="flex items-center gap-12">

      </div>

    </div>


    {/* FILTER PANEL */}

    {filtersOpen && (

      <div className="border-t border-black/15 py-8">

        <div className="grid gap-10 md:grid-cols-3">


          {/* ΚΑΤΗΓΟΡΙΑ */}

          <div>

            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-black/50">
              ΚΑΤΗΓΟΡΙΑ
            </p>

            <div className="space-y-3">

              {categories.map((category) => (

                <label
                  key={category.value}
                  className="flex cursor-pointer items-center gap-3 text-sm"
                >

                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={() =>
                      setSelectedCategory(category.value)
                    }
                    className="accent-[#e62b2b]"
                  />

                  <span>{category.label}</span>

                </label>

              ))}

            </div>

          </div>


          {/* ΗΜΕΡΟΜΗΝΙΑ */}

          <div>

            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-black/50">
              ΗΜΕΡΟΜΗΝΙΑ
            </p>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border-b border-black/30 bg-transparent py-3 text-sm outline-none"
            >

              <option value="all">
                Όλες οι ημερομηνίες
              </option>

              <option value="2026-08">
                Αύγουστος 2026
              </option>

              <option value="2026-09">
                Σεπτέμβριος 2026
              </option>

              <option value="2026-10">
                Οκτώβριος 2026
              </option>

              <option value="2026-11">
                Νοέμβριος 2026
              </option>

              <option value="2026-12">
                Δεκέμβριος 2026
              </option>

            </select>

          </div>


          {/* ΧΩΡΟΣ */}

          <div>

            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-black/50">
              ΧΩΡΟΣ
            </p>

            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full border-b border-black/30 bg-transparent py-3 text-sm outline-none"
            >

              <option value="all">
                Όλοι οι χώροι
              </option>

              {venues.map((venue) => (

                <option key={venue} value={venue}>
                  {venue}
                </option>

              ))}

            </select>

          </div>

        </div>


        {/* CLEAR FILTERS */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDate("all");
              setSelectedVenue("all");
            }}
            className="border border-black/30 px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
          >
            ΚΑΘΑΡΙΣΜΟΣ ΦΙΛΤΡΩΝ ×
          </button>

        </div>

      </div>

    )}

  </div>

</section>
     

      {/* EVENTS LIST */}
      <section className="mx-auto max-w-[1700px] px-8 py-16 lg:px-16">
<br></br>
        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#e62b2b]">
              ΠΡΟΓΡΑΜΜΑ
            </p>

            
          </div>

        </div>


        <div className="border-t border-black/20">
<br></br>
{filteredEvents.length === 0 ? (
  <div className="py-24 text-center">
    <p className="font-serif text-4xl">
      Δεν βρέθηκαν εκδηλώσεις.
    </p>

    <p className="mt-4 text-sm text-black/50">
      Δοκιμάστε διαφορετικά φίλτρα.
    </p>
  </div>
) : (
  filteredEvents.map((event, index) => (
        

            <article
              key={event.id}
              className="group grid border-b border-black/15 py-8 transition-all duration-300 hover:bg-white/20 lg:grid-cols-[100px_320px_1fr_220px] lg:gap-8"
            >

              {/* DATE */}

              <div className="flex flex-col justify-start">

                <span className="font-serif text-[35px] leading-none">
                  {new Date(event.date).getDate()}
                </span>

                <span className="mt-2 text-xs uppercase tracking-[0.2em]">
                  {new Date(event.date).toLocaleDateString("el-GR", {
                    month: "short",
                  })}
                </span>

              </div>


              {/* IMAGE */}

              <div className="relative aspect-[4/3] overflow-hidden ">

                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />

              </div>


              {/* INFO */}

              <div className="flex flex-col justify-between py-1">

                <div>
<br></br>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#e62b2b]">
                    {categoryLabels[event.category] || event.category}
                  </p>

                  <h3 className="max-w-[650px] font-serif text-[28px] leading-tight">
                    {event.title}
                  </h3>
<br></br>
                  <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-black/65">
                    {event.description}
                  </p>

                </div>

              </div>


              {/* META */}

              <div className="flex flex-col justify-between py-1">

                <div className="space-y-5 text-sm">

                  <div>
                    <br></br>
                    <br></br>
                 
                    <span className="block text-xs uppercase tracking-[0.2em] text-black/40">
                      ΩΡΑ
                    </span>

                    <span>
                      {event.time}
                    </span>
                  </div>
<br></br>

                  <div>
                    <span className="block text-xs uppercase tracking-[0.2em] text-black/40">
                      ΧΩΡΟΣ
                    </span>

                    <span>
                      {event.venue}
                    </span>
                  </div>

                </div>


                <Link
                  href={`/events/${event.id}`}
                  className="mt-8 inline-flex w-fit border border-red-800 text-[12px] text-red-800 uppercase tracking-[0.2em]"
                >
                  ΠΕΡΙΣΣΟΤΕΡΑ →
                </Link>

              </div>
<br></br>
            </article>

                    ))
          )}
<br></br>

        </div>

      </section>


    </main>
    
  );
}
            