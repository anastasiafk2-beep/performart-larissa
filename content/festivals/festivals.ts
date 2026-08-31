export type Festival = {
  id: string;

  title: string;
  year: string;

  dates: string;

  startDate?: string;
  endDate?: string;

  location: string;

  description: string;

  quote?: string;
  intro?: string;

  lineup?: {
    day: string;
    title?: string;
    artists: string[];
  }[];

  activities?: string[];
  facilities?: string[];

  ticketInfo?: string;

  image: string;

  images: string[];

  upcoming: boolean;
};

export const festivals: Festival[] = [
  {
    id: "vrisi-tyrnavou",
    title: "14ο ΦΕΣΤΙΒΑΛ ΒΡΥΣΗΣ ΤΥΡΝΑΒΟΥ",
    year: "2026",
    dates: "27–30 ΑΥΓΟΥΣΤΟΥ",
      startDate: "2026-08-27",
  endDate: "2026-08-30",
    location: "Τύρναβος",
    description: "Περισσότερες πληροφορίες σύντομα.",
    image: "/images/festivals/festival-vrysis-2026.png",
    images: [],
    upcoming: true,
  },

  {
    id: "giorti-krasiou-ambelona",
    title: "ΓΙΟΡΤΗ ΚΡΑΣΙΟΥ ΑΜΠΕΛΩΝΑ",
    year: "2026",
    dates: "3–6 ΣΕΠΤΕΜΒΡΙΟΥ",
      startDate: "2026-09-03",
  endDate: "2026-09-06",
    location: "Αμπελώνας",
    description: "Περισσότερες πληροφορίες σύντομα.",
    image: "/images/festivals/giorti-krasiou-2026.png",
    images: [],
    upcoming: true,
  },

  {
    id: "anilio-park-festival",
    title: "ANILIO PARK FESTIVAL",
    year: "2025",
    dates: "",
    location: "",
    description: "",
    image: "/images/festivals/anilio25/01.jpg",
    images: [
      "/images/festivals/anilio25/01.jpg",
      "/images/festivals/anilio25/02.jpg",
      "/images/festivals/anilio25/03.jpg",
      "/images/festivals/anilio25/04.jpg",
      "/images/festivals/anilio25/05.jpg",
      "/images/festivals/anilio25/06.jpg",
      "/images/festivals/anilio25/07.jpg",
      "/images/festivals/anilio25/08.jpg",
      "/images/festivals/anilio25/09.jpg",
      "/images/festivals/anilio25/10.jpg",
      "/images/festivals/anilio25/11.jpg",
      "/images/festivals/anilio25/12.jpg",
      "/images/festivals/anilio25/13.jpg",
      "/images/festivals/anilio25/14.jpg",
    ],
    upcoming: false,
  },

  {
    id: "plastiras-lake-festival",
    title: "PLASTIRAS LAKE FESTIVAL",
    year: "2025",
    dates: "",
    location: "",
    description: "",
    image: "/images/festivals/plastiras25/01.jpg",
    images: [
      "/images/festivals/plastiras25/01.jpg",
      "/images/festivals/plastiras25/02.jpg",
      "/images/festivals/plastiras25/03.jpg",
      "/images/festivals/plastiras25/04.jpg",
      "/images/festivals/plastiras25/05.jpg",
      "/images/festivals/plastiras25/06.jpg",
      "/images/festivals/plastiras25/07.jpg",
      "/images/festivals/plastiras25/08.jpg",
    ],
    upcoming: false,
  },
];