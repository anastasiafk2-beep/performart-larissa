export interface Screening {
  date: string;
  time: string;
  venue?: string;
}

export interface Movie {
  id: string;
  year: number;
  title: string;
  location: string;

  poster: string;

  description: string[];

  screenings: Screening[];

  duration: string;
  genre: string;
  rating: string;
  ticket: string;
}

export const movies: Movie[] = [

  {
    id: "obsession",

    year: 2026,

    title: "OBSESSION",

    location: "Κηποθέατρο Αλκαζάρ",

    poster: "/images/cinema/obsession.png",

    description: [

      "Στις 23:00, το πρόγραμμα συνεχίζεται με το «Obsession», μια ταινία τρόμου σε σκηνοθεσία και σενάριο του Curry Barker.",

      "Στην προσπάθειά του να κερδίσει την καρδιά του μεγάλου του έρωτα, ο Μπέαρ καταφεύγει σε ένα υπερφυσικό παιχνίδι που ονομάζεται «One Wish Willow».",

      "Όταν οι επιθυμίες του αρχίζουν να πραγματοποιούνται, ανακαλύπτει ότι κάθε ευχή κρύβει ένα σκοτεινό και επικίνδυνο αντίτιμο.",

      "Το «Obsession» απευθύνεται αποκλειστικά σε ενήλικο κοινό."

    ],

    screenings: [

      {
        date: "2026-08-03",
        time: "23:00",
      },

      {
        date: "2026-08-06",
        time: "23:00",
      }

    ],

    duration: "108 λεπτά",

    genre: "Τρόμου",

    rating: "K18",

    ticket: "8€"

 },

  {
    id: "toy-story-5",

    year: 2026,

    title: "TOY STORY 5",

    location: "Κηποθέατρο Αλκαζάρ",

    poster: "/images/cinema/toystory5.png",

    description: [

      "Ο Woody, ο Buzz Lightyear, η Jessie και η υπόλοιπη αγαπημένη παρέα επιστρέφουν στη μεγάλη οθόνη.",

      "Η τεχνολογία μπαίνει στο δωμάτιο και οι αγαπημένοι ήρωες καλούνται να ανακαλύψουν ποια είναι πλέον η θέση των παιχνιδιών σε έναν κόσμο που αλλάζει.",

      "Η ταινία προβάλλεται σε μεταγλωττισμένη έκδοση και είναι κατάλληλη για όλες τις ηλικίες."

    ],

    screenings: [

      {
        date: "2026-08-03",
        time: "21:00",
      },

      {
        date: "2026-08-04",
        time: "21:00",
      },

      {
        date: "2026-08-06",
        time: "21:00",
      }

    ],

    duration: "102 λεπτά",

    genre: "Animation | Μεταγλωττισμένο",

    rating: "Κατάλληλο για όλους",

    ticket: "7€"

  }

];
