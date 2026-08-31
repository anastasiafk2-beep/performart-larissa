"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useCinemaMovies from "@/hooks/useCinemaMovies";

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

export default function CinemaCalendar() {
  const movies = useCinemaMovies();
  const today = new Date();

  const events = useMemo(
    () =>
      movies.flatMap((movie) =>
        movie.screenings.map((screening) => ({
          date: screening.date,
          target: movie.id,
          title: movie.title,
        }))
      ),
    [movies]
  );

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const calendar = useMemo(() => {
    const firstDay = new Date(year, month, 1);

    let startDay = firstDay.getDay();

    // Κυριακή -> 6
    // Δευτέρα -> 0
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

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
    <div
      className="
        cinema-calendar

        w-[600px]

        border
        border-[#E9D8C8]/70

        bg-transparent

        backdrop-blur-[2px]

        shadow-none

        p-5
      "
    >

      {/* =====================================================
          MONTH HEADER
          ===================================================== */}

      <div
        className="
          cinema-calendar-header

          relative

          flex
          items-center
          justify-center
        "
        style={{
          paddingTop: "18px",
          paddingBottom: "18px",
        }}
      >

        {/* PREVIOUS */}

        <button
          onClick={previousMonth}
          className="
            cinema-calendar-prev

            absolute

            left-[calc(50%-150px)]

            text-[12px]
            font-light

            text-[#C2272D]

            transition
            hover:scale-110
          "
          aria-label="Προηγούμενος μήνας"
        >
          ←
        </button>


        {/* MONTH */}

        <h2
          className="
            cinema-calendar-month

            text-2xl

            tracking-[0.18em]

            font-light

            text-black
          "
        >
          {MONTHS[month]} {year}
        </h2>


        {/* NEXT */}

        <button
          onClick={nextMonth}
          className="
            cinema-calendar-next

            absolute

            right-[calc(50%-150px)]

            text-[12px]
            font-light

            text-[#C2272D]

            transition
            hover:scale-110
          "
          aria-label="Επόμενος μήνας"
        >
          →
        </button>

      </div>


      {/* =====================================================
          WEEKDAYS
          ===================================================== */}

      <div
        className="
          cinema-calendar-weekdays

          grid
          grid-cols-7

          mt-2
          mb-4
        "
      >

        {WEEKDAYS.map((day) => (

          <div
            key={day}
            className="
              text-center

              text-xs

              tracking-[0.28em]

              text-black/80

              uppercase

              py-2
            "
          >
            {day}
          </div>

        ))}

      </div>


      {/* =====================================================
          DAYS
          ===================================================== */}

      <div
        className="
          cinema-calendar-days

          grid
          grid-cols-7

          gap-y-0
        "
      >

        {calendar.map((day, index) => {

          const dateString =
            day === null
              ? ""
              : `${year}-${String(month + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`;

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
              className="
                cinema-calendar-day

                group
                relative

                flex
                h-12

                items-center
                justify-center
              "
            >

              {day && (
                <>

                  {/* =================================================
                      DAY
                      ================================================= */}

                  <button
                    className={`
                      relative
                      z-10

                      h-9
                      w-9

                      rounded-full

                      flex
                      items-center
                      justify-center

                      transition-all

                      hover:bg-[#F5E7E0]
                      hover:text-[#C2272D]

                      ${
                        isToday
                          ? "bg-red-700 text-white font-semibold"
                          : "text-[#2A2A2A]"
                      }
                    `}
                  >
                    {day}


                    {/* EVENT DOT */}

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

                          bg-red-700
                        "
                      />
                    )}

                  </button>


                  {/* =================================================
                      EVENT POPUP
                      ================================================= */}

                  {hasEvent && (
                    <div
                      className={`
                        absolute

                        top-full

                        z-50

                        hidden

                        w-64

                        mt-2

                        rounded-none

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
                      style={{
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                    >

                      <div
                        className="
                          absolute
                          -bottom-3
                          left-0
                          right-0
                          h-6
                        "
                      />


                      {dayEvents.map((event) => {

                        const movie = movies.find(
                          (movie) =>
                            movie.id === event.target
                        );

                        const screening =
                          movie?.screenings.find(
                            (screening) =>
                              screening.date === event.date
                          );

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

                            <p
                              className="
                                font-serif
                                text-lg
                                text-[#252321]
                              "
                            >
                              {event.title}
                            </p>


                            {screening && (
                              <p
                                className="
                                  mt-1

                                  text-xs

                                  tracking-[0.15em]

                                  text-[#8B8178]
                                "
                              >
                                {screening.time}
                              </p>
                            )}


                            <Link
                              href={`/cinema/${event.target}`}
                              className="
                                !text-black/60

                                inline-flex

                                items-center

                                gap-1

                                text-xs

                                font-medium

                                uppercase
                              "
                            >
                              ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ →
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


      {/* =====================================================
          MOBILE
          ===================================================== */}

      <style>{`

        @media (max-width: 767px) {

          /* ===============================================
             CALENDAR CONTAINER
             =============================================== */

          .cinema-calendar {

            width: 100% !important;
            max-width: 100% !important;

            margin: 0 auto !important;

            padding: 12px !important;

            box-sizing: border-box !important;

            overflow: visible !important;
          }


          /* ===============================================
             HEADER
             =============================================== */

          .cinema-calendar-header {

            width: 100% !important;

            padding-top: 14px !important;
            padding-bottom: 14px !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             MONTH TITLE
             =============================================== */

          .cinema-calendar-month {

            margin: 0 !important;

            font-size: 16px !important;

            line-height: 1.2 !important;

            letter-spacing: 0.12em !important;

            white-space: nowrap !important;
          }


          /* ===============================================
             ARROWS
             =============================================== */

          .cinema-calendar-prev,
          .cinema-calendar-next {

            position: absolute !important;

            top: 50% !important;

            transform: translateY(-50%) !important;

            margin: 0 !important;

            font-size: 11px !important;

            line-height: 1 !important;
          }


          .cinema-calendar-prev {

            left: 12px !important;
          }


          .cinema-calendar-next {

            right: 12px !important;
          }


          /* ===============================================
             WEEKDAYS
             =============================================== */

          .cinema-calendar-weekdays {

            width: 100% !important;

            margin-top: 4px !important;
            margin-bottom: 6px !important;

            grid-template-columns:
              repeat(7, minmax(0, 1fr)) !important;
          }


          .cinema-calendar-weekdays > div {

            width: 100% !important;

            padding-top: 7px !important;
            padding-bottom: 7px !important;

            font-size: 8px !important;

            line-height: 1 !important;

            letter-spacing: 0.12em !important;

            text-align: center !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             DAYS GRID
             =============================================== */

          .cinema-calendar-days {

            width: 100% !important;

            grid-template-columns:
              repeat(7, minmax(0, 1fr)) !important;

            gap: 0 !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             DAY CELL
             =============================================== */

          .cinema-calendar-day {

            width: 100% !important;

            height: 42px !important;

            min-width: 0 !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             DAY BUTTON
             =============================================== */

          .cinema-calendar-day > button {

            width: 30px !important;
            height: 30px !important;

            min-width: 30px !important;
            min-height: 30px !important;

            margin: 0 !important;
            padding: 0 !important;

            font-size: 11px !important;

            box-sizing: border-box !important;
          }


          /* ===============================================
             EVENT DOT
             =============================================== */

          .cinema-calendar-day > button span {

            width: 5px !important;
            height: 5px !important;

            bottom: 3px !important;
          }


          /* ===============================================
             POPUP
             =============================================== */

          .cinema-calendar-day > div {

            max-width: calc(100vw - 48px) !important;

            box-sizing: border-box !important;
          }

        }


        /* =================================================
           VERY SMALL PHONES
           ================================================= */

        @media (max-width: 480px) {

          .cinema-calendar {

            padding: 10px !important;
          }


          .cinema-calendar-month {

            font-size: 15px !important;

            letter-spacing: 0.10em !important;
          }


          .cinema-calendar-prev {

            left: 8px !important;
          }


          .cinema-calendar-next {

            right: 8px !important;
          }


          .cinema-calendar-weekdays > div {

            font-size: 7px !important;

            letter-spacing: 0.08em !important;
          }


          .cinema-calendar-day {

            height: 40px !important;
          }


          .cinema-calendar-day > button {

            width: 28px !important;
            height: 28px !important;

            min-width: 28px !important;
            min-height: 28px !important;

            font-size: 10px !important;
          }

        }

      `}</style>

    </div>
  );
}
