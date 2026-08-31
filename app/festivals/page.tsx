"use client";

import { useEffect, useState } from "react";

import FestivalHero from "@/components/festivals/FestivalHero";
import FestivalSection from "@/components/festivals/FestivalSection";
import FestivalUpcomingCard from "@/components/festivals/FestivalUpcomingCard";
import FestivalCalendar from "@/components/festivals/FestivalCalendar";

import type { Festival } from "@/content/festivals/festivals";

export default function FestivalsPage() {
    const [festivals, setFestivals] = useState<Festival[]>([]);

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
          setFestivals(data as Festival[]);
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
  return (
    <main className="festivals-page overflow-hidden bg-white">
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white pointer-events-none" />

      <div className="relative z-10">

        {/* HERO */}
        <div className="festivals-hero">
          <FestivalHero />
        </div>

        {/* ΗΜΕΡΟΛΟΓΙΟ + ΕΠΕΡΧΟΜΕΝΑ */}
        <section className="festivals-main-section mx-auto flex justify-center px-8 py-12">
          <div className="festivals-main-grid grid w-full max-w-[1300px] grid-cols-[700px_1fr] gap-20 items-center">

            {/* ΗΜΕΡΟΛΟΓΙΟ ΦΕΣΤΙΒΑΛ */}
            <div className="festivals-calendar-column flex flex-col">
              <h2 className="font-serif mb-5 text-[20px] tracking-[0.18em] text-[#C13B3A]">
                ΗΜΕΡΟΛΟΓΙΟ ΦΕΣΤΙΒΑΛ
              </h2>

              <FestivalCalendar />
            </div>

            {/* ΕΠΕΡΧΟΜΕΝΑ ΦΕΣΤΙΒΑΛ */}
            <div className="festivals-upcoming-column flex flex-col">
              <div className="mb-6">
                <br />
                <h2 className="mt-3 font-serif text-[20px] tracking-[0.08em] text-[#C13B3A]">
                  ΕΠΕΡΧΟΜΕΝΑ ΦΕΣΤΙΒΑΛ
                </h2>
              </div>

              <br />

              <div className="festivals-upcoming-list w-[95%] h-[280px] max-w-[600px] mx-auto grid grid-cols-1 gap-6 bg-black/3">
                {festivals
                  .filter((festival) => festival.upcoming)
                  .map((festival) => (
                    <FestivalUpcomingCard
                      key={festival.id}
                      id={festival.id}
                      title={festival.title}
                      year={festival.year}
                      dates={festival.dates}
                      location={festival.location}
                      description={festival.description}
                      image={festival.image}
                    />
                  ))}
              </div>

              <br />
              <br />
              <br />
              <br />

              <div className="festivals-archive-button-wrap mt-8">
                <a
                  href="/festivals/archive"
                  style={{
                    padding: "6px 22px",
                    minWidth: "220px",
                    marginLeft: "100px",
                    color: "#000000",
                  }}
                  className="festivals-archive-button border border-[#C13B3A] bg-white/10 px-8 py-3 uppercase tracking-[0.2em] text-black transition hover:bg-[#C13B3A] hover:text-black"
                >
                  ΔΕΙΤΕ ΟΛΑ ΤΑ ΦΕΣΤΙΒΑΛ →
                </a>
              </div>
            </div>
          </div>
        </section>

        <br />
        <br />
        <br />
        <br />
        <br />

        {/* ΑΡΧΕΙΟ ΦΕΣΤΙΒΑΛ */}
        <section className="festivals-archive-section mx-auto mt-40 flex w-full max-w-[1900px] flex-col items-center px-6">

          <div className="mb-16 text-center">
            <h2 className="font-[Spectral] w-full text-center text-4xl tracking-[0.18em] uppercase text-black">
              ΑΡΧΕΙΟ ΦΕΣΤΙΒΑΛ
            </h2>

            <br />
            <br />

            <div className="mx-auto mt-6 h-px w-32 bg-[#C13B3A]" />
          </div>

          <div className="festivals-archive-grid mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2">

            <FestivalSection
              id="anilio-park-festival"
              year="2025"
              title="ANILIO PARK FESTIVAL"
              description="..."
              images={
                festivals.find(
                  (festival) => festival.id === "anilio-park-festival"
                )?.images ?? []
              }
            />

            <FestivalSection
              id="plastiras-lake-festival"
              year="2025"
              title="PLASTIRAS LAKE FESTIVAL"
              description="..."
              images={
                festivals.find(
                  (festival) => festival.id === "plastiras-lake-festival"
                )?.images ?? []
              }
            />

            <br />
          </div>
        </section>
      </div>

      {/* =========================================================
          MOBILE ONLY
          Το desktop μένει όπως είναι.
          Όλες οι παρακάτω αλλαγές ενεργοποιούνται μόνο κάτω
          από 767px.
         ========================================================= */}
      <style>{`
        @media (max-width: 767px) {

          /* ΒΑΣΙΚΟ MOBILE CONTAINER */
          .festivals-page {
            width: 100% !important;
            max-width: 100vw !important;
            min-width: 0 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          /* HERO
             Κρατάμε το component, αλλά δεν το αφήνουμε να
             δημιουργεί οριζόντιο overflow στο κινητό. */
          .festivals-page .festivals-hero {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          .festivals-page .festivals-hero > * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* ΚΥΡΙΟ SECTION */
          .festivals-page .festivals-main-section {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 35px 20px 20px !important;
            box-sizing: border-box !important;
            display: block !important;
          }

          .festivals-page .festivals-main-grid {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;

            display: flex !important;
            flex-direction: column !important;
            gap: 55px !important;

            box-sizing: border-box !important;
          }

          /* ΗΜΕΡΟΛΟΓΙΟ */
          .festivals-page .festivals-calendar-column {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .festivals-page .festivals-calendar-column h2 {
            width: 100% !important;
            margin: 0 0 18px !important;
            text-align: center !important;

            font-size: 16px !important;
            line-height: 1.35 !important;
            letter-spacing: 0.14em !important;
          }

          /* Αν το calendar έχει δικό του μεγάλο fixed width,
             το περιορίζουμε στο mobile container. */
          .festivals-page .festivals-calendar-column > * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* ΕΠΕΡΧΟΜΕΝΑ */
          .festivals-page .festivals-upcoming-column {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          .festivals-page .festivals-upcoming-column > div:first-child {
            margin: 0 0 18px !important;
            padding: 0 !important;
          }

          .festivals-page .festivals-upcoming-column > div:first-child br {
            display: none !important;
          }

          .festivals-page .festivals-upcoming-column h2 {
            width: 100% !important;
            margin: 0 !important;
            text-align: center !important;

            font-size: 16px !important;
            line-height: 1.35 !important;
            letter-spacing: 0.12em !important;
          }

          /* ΛΙΣΤΑ ΚΑΡΤΩΝ */
          .festivals-page .festivals-upcoming-list {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            display: flex !important;
            flex-direction: column !important;
            gap: 22px !important;

            box-sizing: border-box !important;
          }

          .festivals-page .festivals-upcoming-list > * {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }

          /* Αφαιρούμε τα μεγάλα κενά που υπήρχαν για desktop. */
          .festivals-page .festivals-upcoming-column > br {
            display: none !important;
          }

          /* ΚΟΥΜΠΙ ΑΡΧΕΙΟΥ */
          .festivals-page .festivals-archive-button-wrap {
            width: 100% !important;
            max-width: 100% !important;

            margin: 28px 0 0 !important;
            padding: 0 !important;

            display: flex !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }

          .festivals-page .festivals-archive-button {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;

            width: auto !important;
            max-width: 100% !important;
            min-width: 0 !important;

            margin: 0 !important;
            padding: 11px 18px !important;

            font-size: 10px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.15em !important;

            box-sizing: border-box !important;
            white-space: nowrap !important;
          }

          /* ΑΡΧΕΙΟ */
          .festivals-page .festivals-archive-section {
            width: 100% !important;
            max-width: 100% !important;

            margin: 45px 0 0 !important;
            padding: 0 20px 50px !important;

            box-sizing: border-box !important;
          }

          .festivals-page .festivals-archive-section > div:first-child {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 0 35px !important;
            text-align: center !important;
          }

          .festivals-page .festivals-archive-section h2 {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            font-size: 27px !important;
            line-height: 1.15 !important;
            letter-spacing: 0.11em !important;

            box-sizing: border-box !important;
          }

          .festivals-page .festivals-archive-section > div:first-child br {
            display: none !important;
          }

          .festivals-page .festivals-archive-section > div:first-child > div {
            margin-top: 18px !important;
          }

          .festivals-page .festivals-archive-grid {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;

            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;

            box-sizing: border-box !important;
          }

          .festivals-page .festivals-archive-grid > * {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }

          /* Το τελευταίο <br> δεν χρειάζεται στο mobile. */
          .festivals-page .festivals-archive-grid > br {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
