"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { movies } from "@/content/cinema/movies";
import Footer from "@/components/layout/Footer";
import { Alegreya, Spectral } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
});



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

const WEEKDAYS = [
  "ΚΥΡΙΑΚΗ",
  "ΔΕΥΤΕΡΑ",
  "ΤΡΙΤΗ",
  "ΤΕΤΑΡΤΗ",
  "ΠΕΜΠΤΗ",
  "ΠΑΡΑΣΚΕΥΗ",
  "ΣΑΒΒΑΤΟ",
];

function formatDate(date: string) {
  const d = new Date(`${date}T12:00:00`);

  return {
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    weekday: WEEKDAYS[d.getDay()],
  };
}

const screenings = movies
  .flatMap((movie) =>
    movie.screenings.map((screening) => ({
      movie,
      date: screening.date,
      time: screening.time,
    }))
  )
  .sort((a, b) => {
    const dateA = `${a.date}T${a.time}`;
    const dateB = `${b.date}T${b.time}`;

    return dateA.localeCompare(dateB);
  });

export default function ScreeningsPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [calendarDate, setCalendarDate] = useState(() => {
    const firstDate = screenings[0]?.date ?? new Date().toISOString().slice(0, 10);
    return new Date(`${firstDate}T12:00:00`);
  });

  const availableDates = useMemo(() => {
    return Array.from(
      new Set(screenings.map((screening) => screening.date))
    ).sort();
  }, []);

  const availableMovies = useMemo(() => {
    return movies;
  }, []);

  const filteredScreenings = useMemo(() => {
    return screenings.filter((screening) => {
      const matchesDate =
        selectedDate === "" || screening.date === selectedDate;

      const matchesMovie =
        selectedMovie === "" || screening.movie.id === selectedMovie;

      return matchesDate && matchesMovie;
    });
  }, [selectedDate, selectedMovie]);

  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Monday-first calendar.
    const mondayFirstOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < mondayFirstOffset; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [calendarDate]);

  const calendarScreenings = useMemo(() => {
    return screenings.filter((screening) => {
      const matchesMovie =
        selectedMovie === "" || screening.movie.id === selectedMovie;

      return matchesMovie;
    });
  }, [selectedMovie]);

  const getScreeningsForCalendarDay = (day: number) => {
    const year = calendarDate.getFullYear();
    const month = String(calendarDate.getMonth() + 1).padStart(2, "0");
    const date = `${year}-${month}-${String(day).padStart(2, "0")}`;

    return calendarScreenings.filter((screening) => screening.date === date);
  };

  const changeCalendarMonth = (direction: number) => {
    setCalendarDate(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + direction,
          1
        )
    );
  };

  return (
    <>
  <main
   className="relative overflow-hidden bg-[#707BD4]/80">

  {/* Background overlay */}
  <div className="absolute inset-0 bg-white/70 pointer-events-none" />

  <div className="relative z-10">
        
        {/* ΤΙΤΛΟΣ */}
        <section className="px-6 pb-20  pt-10 md:px-10">
          <div
            className=""
            style={{
              width: "70%",
              marginLeft: "15%",
            }}
          >

            <div
  style={{
    width: "25%",
    marginLeft: "80%",
    position: "relative",
    top: "120px",
    marginBottom: "50px",
  }}
>
  <Link
    href="/cinema"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#252321",
      textDecoration: "none",
      fontSize: "15px",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
    }}
  >
    ← ΠΙΣΩ ΣΤΟ CINEMA
  </Link>
</div >
            
            <p
            className={`${alegreya.className} mb-5 text-xs uppercase tracking-[0.35em] text-[#C13B3A] lg:text-[15px]`}
          >
            CINEMA
            </p>
          <br></br>
          

           <h1
            className={`${spectral.className} text-5xl uppercase tracking-[0.15em] text-black md:text-6xl lg:text-[45px]`}
          >
              ΟΛΕΣ ΟΙ ΠΡΟΒΟΛΕΣ
            </h1>
  <br></br>
            
  
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-black/80">
              ΑΝΑΚΑΛΥΨΕ ΟΛΟ ΤΟ ΠΡΟΓΡΑΜΜΑ ΠΡΟΒΟΛΩΝ
            </p>
              <br></br>
                <br></br>
          </div>
        </section>
  
        {/* ΦΙΛΤΡΑ */}
<section className="px-6 md:px-10">
  <div
    style={{
        width: "70%",
  marginLeft: "15%",
  border: "1px solid #E9D8C8",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  minHeight: "54px",
    }}
  >

    {/* ΗΜΕΡΟΜΗΝΙΑ */}
    <div
      style={{
        padding: "7px 22px",
        borderRight: "1px solid #E9D8C8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span
        style={{
          fontSize: "8px",
          letterSpacing: "0.18em",
          color: "#857B73",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        ΕΠΙΛΕΞΤΕ ΗΜΕΡΟΜΗΝΙΑ
      </span>

     <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "12px",
          color: "#252321",
          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
          paddingRight: "24px",
        }}
      >
        <option value="">ΟΛΕΣ ΟΙ ΗΜΕΡΟΜΗΝΙΕΣ</option>

        {availableDates.map((date) => {
          const formatted = formatDate(date);

          return (
            <option key={date} value={date}>
              {formatted.day} {formatted.month} — {formatted.weekday}
            </option>
          );
        })}
      </select>

      <span
        style={{
          position: "absolute",
          right: "18px",
          bottom: "13px",
          fontSize: "11px",
          color: "#857B73",
        }}
      >
        ⌄
      </span>
    </div>

    {/* ΤΑΙΝΙΑ */}
    <div
      style={{
        padding: "8px 18px",
        borderRight: "1px solid #E9D8C8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span
        style={{
          fontSize: "8px",
          letterSpacing: "0.18em",
          color: "#857B73",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        ΕΠΙΛΕΞΤΕ ΤΑΙΝΙΑ
      </span>

      <select
        value={selectedMovie}
        onChange={(e) => setSelectedMovie(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "12px",
          color: "#252321",
          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
          paddingRight: "24px",
        }}
      >
        <option value="">ΟΛΕΣ ΟΙ ΤΑΙΝΙΕΣ</option>

        {availableMovies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>

      <span
        style={{
          position: "absolute",
          right: "18px",
          bottom: "13px",
          fontSize: "11px",
          color: "#857B73",
        }}
      >
        ⌄
      </span>
    </div>

    {/* ΠΡΟΒΟΛΗ ΩΣ */}
    <div
      style={{
        padding: "8px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: "8px",
          letterSpacing: "0.18em",
          color: "#857B73",
          textTransform: "uppercase",
          marginBottom: "5px",
        }}
      >
        ΠΡΟΒΟΛΗ ΩΣ
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
          fontSize: "11px",
        }}
      >
       <button
  type="button"
  onClick={() => setViewMode("list")}
  style={{
    color: viewMode === "list" ? "#C2272D" : "#857B73",
    borderBottom:
      viewMode === "list"
        ? "1px solid #C2272D"
        : "1px solid transparent",
    paddingBottom: "2px",
    background: "transparent",
    borderLeft: "none",
    borderTop: "none",
    borderRight: "none",
    cursor: "pointer",
  }}
>
  ☷ ΛΙΣΤΑ
</button>

<button
  type="button"
  onClick={() => setViewMode("calendar")}
  style={{
    color: viewMode === "calendar" ? "#C2272D" : "#857B73",
    borderBottom:
      viewMode === "calendar"
        ? "1px solid #C2272D"
        : "1px solid transparent",
    paddingBottom: "2px",
    background: "transparent",
    borderLeft: "none",
    borderTop: "none",
    borderRight: "none",
    cursor: "pointer",
  }}
>
  ▦ ΗΜΕΡΟΛΟΓΙΟ
</button>
      </div>
    </div>

  </div>

  {(selectedDate !== "" || selectedMovie !== "") && (
    <div
      style={{
        width: "70%",
        marginLeft: "15%",
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: "8px",
      }}
    >
      <button
        type="button"
        onClick={() => {
          setSelectedDate("");
          setSelectedMovie("");
        }}
        style={{
          border: "none",
          background: "transparent",
          color: "#C2272D",
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        ΚΑΘΑΡΙΣΜΟΣ ΦΙΛΤΡΩΝ ×
      </button>
    </div>
  )}

  <div style={{ height: "10px" }} />
</section>
  <br></br>
        {/* ΠΡΟΒΟΛΕΣ */}
        <section className="px-6 pb-20 pt-10 md:px-10">
          <div
            style={{
              width: "70%",
              marginLeft: "15%",
            }}
          >
            
            {viewMode === "list" ? (
              <>
                
                {/* ΕΠΙΚΕΦΑΛΙΔΕΣ */}
                <div
                  className="
                    hidden
                    grid-cols-[150px_1fr_130px_130px]
                    border-b
                    border-[#DCCFC5]
                    pb-4
                    text-[13px]
                    uppercase
                    tracking-[0.2em]
                    text-black
                    md:grid
                  "
                >
                    
                  <span>ΗΜΕΡΟΜΗΝΙΑ</span>
                  <span>ΤΑΙΝΙΑ</span>
                  <span>ΩΡΑ</span>
                  <span></span>
                   
                </div>

                {filteredScreenings.length === 0 ? (
                  <div
                    style={{
                      padding: "70px 20px",
                      textAlign: "center",
                      color: "#857B73",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    ΔΕΝ ΒΡΕΘΗΚΑΝ ΠΡΟΒΟΛΕΣ ΜΕ ΑΥΤΑ ΤΑ ΦΙΛΤΡΑ
                  </div>
                ) : (
                  filteredScreenings.map((screening, index) => {
                    const date = formatDate(screening.date);
                    const previous = filteredScreenings[index - 1];

                    const isNewDate =
                      !previous || previous.date !== screening.date;

                    return (
                      <div
                        key={`${screening.movie.id}-${screening.date}-${screening.time}`}
                        className="
                          grid
                          grid-cols-1
                          border-b
                          border-[#DCCFC5]
                          md:grid-cols-[150px_1fr_130px_130px]
                        "
                      >
                        <div className="flex items-center py-6">
                          {isNewDate && (
                            <div>
                              <p className="font-serif text-4xl text-[#8F2025]">
                                {date.day}
                              </p>
                              <p className="mt-1 text-[9px] text-black uppercase tracking-[0.18em]">
                                {date.month}
                              </p>
                              <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#857B73]">
                                {date.weekday}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-5 py-5">
                          <img
                            src={screening.movie.poster}
                            alt={screening.movie.title}
                            className="h-24 w-16 shrink-0 object-cover"
                          />

                          <div>
                            <h2 className="font-serif text-black/80 text-xl md:text-2xl">
                              {screening.movie.title}
                            </h2>

                            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#857B73]">
                              {screening.movie.genre}
                              {" • "}
                              {screening.movie.duration}
                            </p>
                          </div>
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            border-t
                            border-[#E9D8C8]
                            py-4
                            text-2xl
                            text-[#8F2025]
                            md:border-t-0
                          "
                        >
                          {screening.time}
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            pb-6
                            md:justify-end
                            md:py-5
                          "
                        >
                          <Link
                            href={`/cinema/${screening.movie.id}`}
                            className="
                              border
                              border-[#C2272D]
                              w-[300px]
                              h-[30px]
                              text-[12px]
                              flex
                              items-center
                              justify-center
                              uppercase
                              tracking-[0.16em]
                              bg-[#C2272D]
                              text-white
                              transition
                              hover:bg-[#C2272D]/80
                              hover:text-white
                            "
                          >
                            ΠΕΡΙΣΣΟΤΕΡΑ →
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}

                  <br></br>
                    <br></br>

                <div className="flex justify-center pt-12">
                  <button
                    type="button"
                    className="
                      border
                      border-[#252321]
                      w-[300px]
                              h-[40px]
            text-black
                              flex
                              items-center
                              justify-center
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      transition
                      hover:bg-white
                      hover:text-black
                    "
                  >
                    ΦΟΡΤΩΣΗ ΠΕΡΙΣΣΟΤΕΡΩΝ ↓
                  </button>
                </div>
              </>
            ) : (
              /* ΗΜΕΡΟΛΟΓΙΟ */
              <div
                style={{
                  borderTop: "1px solid #DCCFC5",
                  borderLeft: "1px solid #DCCFC5",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    borderRight: "1px solid #DCCFC5",
                    borderBottom: "1px solid #DCCFC5",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => changeCalendarMonth(-1)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#C2272D",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ←
                  </button>

                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "serif",
                        fontSize: "28px",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {MONTHS[calendarDate.getMonth()]}
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#857B73",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {calendarDate.getFullYear()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => changeCalendarMonth(1)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#C2272D",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    →
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    borderRight: "1px solid #DCCFC5",
                  }}
                >
                  {["ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ", "ΚΥ"].map((day) => (
                    <div
                      key={day}
                      style={{
                        padding: "14px 5px",
                        textAlign: "center",
                        borderBottom: "1px solid #DCCFC5",
                        color: "#857B73",
                        fontSize: "14px",
                        letterSpacing: "0.16em",
                      }}
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return (
                        <div
                          key={`empty-${index}`}
                          style={{
                            minHeight: "105px",
                            borderBottom: "1px solid #E9D8C8",
                            borderRight: "1px solid #E9D8C8",
                          }}
                        />
                      );
                    }

                    const dayScreenings = getScreeningsForCalendarDay(day);
                    const year = calendarDate.getFullYear();
                    const month = String(calendarDate.getMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const dateValue = `${year}-${month}-${String(day).padStart(
                      2,
                      "0"
                    )}`;

                    const isSelected = selectedDate === dateValue;

                    return (
                      <div
                        key={day}
                        onClick={() => {
                          if (dayScreenings.length > 0) {
                            setSelectedDate(dateValue);
                            setViewMode("list");
                          }
                        }}
                        style={{
                          minHeight: "105px",
                          padding: "10px",
                          borderBottom: "1px solid #E9D8C8",
                          borderRight: "1px solid #E9D8C8",
                          background: isSelected
                            ? "#F3E1DC"
                            : "transparent",
                          cursor:
                            dayScreenings.length > 0 ? "pointer" : "default",
                          transition: "background 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "serif",
                            fontSize: "22px",
                            color:
                              dayScreenings.length > 0
                                ? "#8F2025"
                                : "#252321",
                          }}
                        >
                          {day}
                        </div>

                        <div style={{ marginTop: "8px" }}>
                          {dayScreenings.slice(0, 3).map((screening) => (
                            <div
                              key={`${screening.movie.id}-${screening.time}`}
                              style={{
                                marginBottom: "5px",
                                padding: "5px 6px",
                                borderLeft: "2px solid #C2272D",
                                background: "#FBF7F3",
                                fontSize: "11px",
                                lineHeight: 1.3,
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "serif",
                                  fontSize: "14px",
                                }}
                              >
                                {screening.movie.title}
                              </div>
                              <div
                                style={{
                                  marginTop: "1px",
                                  color: "#8F2025",
                                }}
                              >
                                {screening.time}
                              </div>
                            </div>
                          ))}

                          {dayScreenings.length > 3 && (
                            <div
                              style={{
                                color: "#C2272D",
                                fontSize: "8px",
                                letterSpacing: "0.08em",
                              }}
                            >
                              +{dayScreenings.length - 3} ΑΚΟΜΑ
                            </div>
                          )}
                        
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

  <br></br>
    <br></br>
    </div>
      </main>
    </>
  );
}