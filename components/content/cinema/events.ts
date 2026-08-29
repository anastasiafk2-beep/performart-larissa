export type CinemaEvent = {
  id: string;
  movieId: string;
  date: string;
  time: string;
  venue: string;
};

export const cinemaEvents: CinemaEvent[] = [
  {
    id: "obsession-2026-08-03",
    movieId: "obsession",
    date: "2026-08-03",
    time: "23:00",
    venue: "Κηποθέατρο Αλκαζάρ",
  },

  {
    id: "obsession-2026-08-06",
    movieId: "obsession",
    date: "2026-08-06",
    time: "23:00",
    venue: "Κηποθέατρο Αλκαζάρ",
  },

  {
    id: "toy-story-5-2026-08-03",
    movieId: "toy-story-5",
    date: "2026-08-03",
    time: "21:00",
    venue: "Κηποθέατρο Αλκαζάρ",
  },

  {
    id: "toy-story-5-2026-08-04",
    movieId: "toy-story-5",
    date: "2026-08-04",
    time: "21:00",
    venue: "Κηποθέατρο Αλκαζάρ",
  },

  {
    id: "toy-story-5-2026-08-06",
    movieId: "toy-story-5",
    date: "2026-08-06",
    time: "21:00",
    venue: "Κηποθέατρο Αλκαζάρ",
  },
];