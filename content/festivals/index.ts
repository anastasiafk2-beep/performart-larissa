export type Festival = {
  id: string;
  title: string;
  year: string;
  dates: string;
  location: string;

  description: string;

  quote?: string;
  intro?: string;

  lineup?: {
    day: string;
    title: string;
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

  description: "",

  quote: "Η μουσική είναι η δύναμή μας",

  intro: `14 χρόνια και δε βάλαμε μυαλό. Και ευτυχώς!

Τέσσερις μέρες δίπλα στη λίμνη, κάτω από τα πλατάνια, με μουσική, χορό, ιδρωμένα mosh pits, αγκαλιές, τσίπουρα και εκείνη τη μοναδική αίσθηση που μόνο η Βρύση ξέρει να δημιουργεί.

Φέτος επιστρέφουμε για να κλείσουμε το καλοκαίρι όπως του αξίζει.`,

  lineup: [
    {
      day: "ΠΕΜΠΤΗ 27/8",
      title: "THE KICK-OFF",
      artists: [
        "ΒΑΝΔΑΛΟΥΠ",
        "ΜΕΓΑΛΗ ΦΥΓΗ",
        "ΓΙΩΡΓΟΣ ΚΑΡΡΑΣ",
        "THE KLAMMERS",
        "ONE DROP FORWARD",
      ],
    },

    {
      day: "ΠΑΡΑΣΚΕΥΗ 28/8",
      title: "GROOVE & FLOW",
      artists: [
        "BANDA ENTOPICA",
        "ΛΟΓΟΣ ΤΙΜΗΣ",
        "STOLEN MIC",
        "ΜΑΡΙΑΝΝΑ ΚΑΤΣΙΜΙΧΑ",
        "ΒΑΣΙΛΗΣ ΡΑΛΛΗΣ",
      ],
    },

    {
      day: "ΣΑΒΒΑΤΟ 29/8",
      title: "THE PEAK",
      artists: [
        "1000MODS",
        "ΚΟΙΝΟΙ ΘΝΗΤΟΙ",
        "PANX ROMANA",
        "BAD MOVIES",
        "KAPTEN",
      ],
    },

    {
      day: "ΚΥΡΙΑΚΗ 30/8",
      title: "13:30",
      artists: [
        "Μεσημεριανό γλέντι με ΜΠΡΑΤΙΜΙΑ",
        "ΕΛΕΥΘΕΡΗ ΕΙΣΟΔΟΣ",
      ],
    },
  ],

  activities: [
    "Pilates & ελεύθερη κίνηση",
    "Παιδικές δραστηριότητες",
    "Face painting",
    "Bubbles",
    "Water games",
    "Εργαστήρι φυσικού καλλυντικού",
    "και άλλα!",
  ],

  facilities: [
    "Free Camping",
    "Parking",
    "Bar",
    "BBQ",
    "Πρωινό",
    "Vegan/vegetarian επιλογές",
    "WC",
    "Ντους",
    "Παιδότοπος",
  ],

  ticketInfo: `Ο χώρος ανοίγει για κατασκηνωτές από Πέμπτη 27/8 το πρωί.

TIP: Έχετε μαζί σας μετρητά — δεν θα υπάρχει POS.

ΕΙΣΙΤΗΡΙΑ:
στο more.com

Δωρεάν`,

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

  description: "",

  quote: "",

  intro: `H Γιορτή κρασιού Αμπελώνα 2026, μια από τις σημαντικότερες διοργανώσεις του Δήμου Τυρνάβου σε συνεργασία με την Περιφέρεια Θεσσαλίας, κάνει την έναρξή της στις 3 Σεπτέμβρη στο άλσος του Αγίου Γεωργίου και θα διαρκέσει μέχρι και τις 6 Σεπτέμβρη.

Με δωρεάν είσοδο για όλους και στόχο την διατήρηση του παραδοσιακού της χαρακτήρα, φιλοδοξεί να προσφέρει ένα τετραήμερο με συναυλίες, οινογνωσία, δημιουργικές δραστηριότητες για τους μικρούς επισκέπτες.

Ενεργοί όπως κάθε χρόνο οι πολιτιστικοί και αθλητικοί σύλλογοι του Αμπελώνα, οι οποίοι με τη συμμετοχή και τις εκδηλώσεις τους αποτελούν αναπόσπαστο κομμάτι της γιορτής από την έναρξη έως και τη λήξη της.

Παρούσα θα είναι και η Ένωση Οινοποιών και Αποσταγματοποιών του Δήμου Τυρνάβου, προσφέροντας στους επισκέπτες τη δυνατότητα να γνωρίσουν και να γευτούν τα εκλεκτά κρασιά της περιοχής, αναδεικνύοντας τη μακραίωνη οινική παράδοση του τόπου.`,

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