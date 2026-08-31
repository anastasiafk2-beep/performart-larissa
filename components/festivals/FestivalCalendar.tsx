"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const MONTHS = [
  "ΙΑΝΟΥΑΡΙΟΣ",
  "ΦΕΒΡΟΥΑΡΙΟΣ",
  "ΜΑΡΤΙΟΣ",
  "ΑΠΡΙΛΙΟΣ",
  "ΜΑΙΟΣ",
  "ΙΟΥΝΙΟΣ",
  "ΙΟΥΛΙΟΣ",
  "ΑΥΓΟΥΣΤΟΣ",
  "ΣΕΠΤΕΜΒΡΙΟΣ",
  "ΟΚΤΩΒΡΙΟΣ",
  "ΝΟΕΜΒΡΙΟΣ",
  "ΔΕΚΕΜΒΡΙΟΣ",
];

const WEEKDAYS = ["ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ", "ΚΥ"];



export default function FestivalCalendar() {

  type CalendarFestival = {
    id: string;
    title: string;
    dates: string;
    location: string;
    startDate?: string;
    endDate?: string;
  };

  const [festivals, setFestivals] = useState<CalendarFestival[]>([]);

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
          setFestivals(data as CalendarFestival[]);
        }
      } catch (error) {
        if (
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          console.error("Unable to load festival calendar:", error);
        }
      }
    }

    void loadFestivals();

    return () => controller.abort();
  }, []);

  const events = useMemo(() => {
    const result: {
      date: string;
      target: string;
    }[] = [];

    festivals.forEach((festival) => {
      if (!festival.startDate) {
        return;
      }

      const start = new Date(`${festival.startDate}T12:00:00`);
      const end = festival.endDate
        ? new Date(`${festival.endDate}T12:00:00`)
        : start;

      const current = new Date(start);

      while (current <= end) {
        const date = [
          current.getFullYear(),
          String(current.getMonth() + 1).padStart(2, "0"),
          String(current.getDate()).padStart(2, "0"),
        ].join("-");

        result.push({
          date,
          target: festival.id,
        });

        current.setDate(current.getDate() + 1);
      }
    });

    return result;
  }, [festivals]);

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const calendar = useMemo(() => {
    const firstDay = new Date(year, month, 1);

    let startDay = firstDay.getDay();

    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(d);
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [month, year]);

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  return (
    <div className="w-[600px] bg-black/2 border border-black/3 p-5">

      {/* HEADER ΜΗΝΑ */}
      <div
        className="relative flex items-center justify-center"
        style={{
          paddingTop: "18px",
          paddingBottom: "18px",
        }}
      >

        <button
          onClick={previousMonth}
          className="absolute left-[calc(50%-150px)] text-[12px] font-light text-[#C2272D] transition hover:scale-110"
          aria-label="Προηγούμενος μήνας"
        >
          ←
        </button>

        <h2 className="text-2xl tracking-[0.18em] font-light text-[#2A2A2A]">
          {MONTHS[month]} {year}
        </h2>

        <button
          onClick={nextMonth}
          className="absolute right-[calc(50%-150px)] text-[12px] font-light text-[#C2272D] transition hover:scale-110"
          aria-label="Επόμενος μήνας"
        >
          →
        </button>

      </div>

      {/* ΗΜΕΡΕΣ ΕΒΔΟΜΑΔΑΣ */}
      <div className="grid grid-cols-7 mt-2 mb-4">

        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs tracking-[0.28em] text-[#8B8178] uppercase"
          >
            {day}
          </div>
        ))}

      </div>

      {/* ΗΜΕΡΟΛΟΓΙΟ */}
      <div className="grid grid-cols-7 gap-y-0">

        {calendar.map((day, index) => {

          const dateString =
            day === null
              ? ""
              : `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const dayEvents = events.filter(
  (event) => event.date === dateString
);

          const hasEvent = dayEvents.length > 0;

          const column = index % 7;

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={index}
              className="group relative flex h-12 items-center justify-center"
            >

              {day && (
                <>
                  {/* ΗΜΕΡΑ */}
                  <button
                    className={`
                      relative z-10
                      h-9 w-9
                      rounded-full
                      flex items-center justify-center
                      transition-all
                      hover:bg-[#F5E7E0]
                      hover:text-[#C2272D]

                      ${
                        isToday
                          ? "bg-[#F3DAD5] text-[#C2272D] font-semibold"
                          : "text-[#2A2A2A]"
                      }
                    `}
                  >
                    {day}

                    {/* ΚΟΥΚΚΙΔΑ ΦΕΣΤΙΒΑΛ */}
                    {hasEvent && (
                      <span
                        className="
                          absolute
                          bottom-1
                          left-1/2
                          -translate-x-1/2
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-[#C2272D]
                        "
                      />
                    )}
                  </button>

                  {/* POPUP */}
                  {hasEvent && (
                    <div
                      className={`
                        absolute
                        top-full
                        z-50
                        hidden
                        w-64
                        mt-2
                        border
                        border-[#E9D8C8]
                        bg-[#FBF7F2]
                        p-4
                        text-left
                        shadow-xl
                        group-hover:block

                        ${
                          column <= 1
                            ? "left-0"
                            : column >= 5
                              ? "right-0"
                              : "left-1/2 -translate-x-1/2"
                        }
                      `}
                    >

                      <div className="absolute -bottom-3 left-0 right-0 h-6" />

                      {dayEvents.map((event) => {

                        const festival = festivals.find(
                          (festival) => festival.id === event.target
                        );

                        if (!festival) return null;

                        return (
                          <div
                            key={`${event.date}-${event.target}`}
                            className="
                              border-b
                              border-[#E9D8C8]
                              pb-4
                              mb-4
                              last:border-0
                              last:mb-0
                              last:pb-0
                            "
                          >

                            <p className="font-serif text-lg text-[#252321]">
                              {festival.title}
                            </p>

                            <p className="mt-1 text-xs tracking-[0.15em] text-[#8B8178]">
                              {festival.dates}
                            </p>

                            <p className="mt-1 text-xs text-[#8B8178]">
                              {festival.location}
                            </p>

                            <Link
                              href={`/festivals/${festival.id}`}
                              style={{ color: "#474646" }}

                              className="
                                mt-3
                                inline-flex
                                items-center
                                gap-1
                                text-xs
                                font-medium
                                uppercase
                                text-black/60
                                
                              "
                            >
                              ΜΑΘΕΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
                            </Link>

                          </div>
                        );
                      })}

                    </div>
                  )}

                </>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}