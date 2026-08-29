export type Event = {
  id: string;
  title: string;
  category: "theatre" | "music" | "dance" | "venue" | "kids" | "other";

  date: string;
  time?: string;

  venue: string;
  location?: string;

  description: string;

  image: string;

  upcoming: boolean;
};

export const events: Event[] = [
  {
    id: "ai-laos-2026",
    title: "ΑΗ ΛΑΟΣ",
    category: "theatre",

    date: "2026-08-02",
    time: "21:15",

    venue: "Δημοτικό Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Ο «ΑΗ ΛΑΟΣ», το εμβληματικό έργο του Δημήτρη Λάγιου, σε στίχους Μιχάλη Μπουρμπούλη και με σημείο αναφοράς την ιστορική ερμηνεία της Σωτηρίας Μπέλλου, παρουσιάζεται για πρώτη φορά στη σκηνή, σε μια μοναδική συνάντηση με τις «Τρωάδες» του Ευριπίδη. Ο Στέλιος Βραχνής δημιουργεί ένα σκηνικό ρέκβιεμ για την ήττα, την απώλεια και τη μνήμη, όπου ο λόγος, η μουσική και το σώμα γίνονται μία συγκλονιστική εμπειρία.",

    image: "/images/events/ai-laos-2026.png",

    upcoming: true,
  },

  {
    id: "ksenodoxeio-synaisthimaton-2026",
    title: "ΤΟ ΞΕΝΟΔΟΧΕΙΟ ΤΩΝ ΣΥΝΑΙΣΘΗΜΑΤΩΝ",
    category: "kids",

    date: "2026-08-05",
    time: "21:00",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Η επίσημη θεατρική παράσταση του παγκόσμιου best seller της Lidia Brankovic. Μια τρυφερή ιστορία για τα συναισθήματα και τον τρόπο που αλλάζουν από μέρα σε μέρα, με ειδικά εφέ, ζογκλερικά, ξυλοπόδαρους, πρωτότυπο κείμενο και μουσική. Κατάλληλο για παιδιά 3–12 ετών. Εισιτήριο: 12€.",

    image: "/images/events/ksenodoxeio-synaisthimatwn-2026.png",

    upcoming: true,
  },

  {
    id: "romeo-juliet-bost-2026",
    title: "ΡΩΜΑΙΟΣ ΚΑΙ ΙΟΥΛΙΕΤΑ ΤΟΥ ΜΠΟΣΤ",
    category: "theatre",

    date: "2026-08-23",
    time: "21:00",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Ο Μποστ συναντά τον Ρωμαίο και την Ιουλιέτα σε μια ανατρεπτική κωμωδία γεμάτη σάτιρα, γέλιο, ζωντανή μουσική και ξεκαρδιστικές ανατροπές. Σκηνοθεσία: Νικορέστης Χανιωτάκης. Πρωτότυπη μουσική: Γιώργος Ανδρέου.",

    image: "/images/events/romeo&juliet-bost-2026.png",

    upcoming: true,
  },

  {
    id: "katerina-lioliou-2026",
    title: "ΚΑΤΕΡΙΝΑ ΛΙΟΛΙΟΥ – LOGARIASMOS TOUR",
    category: "music",

    date: "2026-08-25",
    time: "21:30",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Η Κατερίνα Λιόλιου κάνει την πρώτη συναυλία της στη Λάρισα, στο πλαίσιο της περιοδείας «Λογαριασμός summer tour». Μια δυναμική μουσική εμπειρία με τις μεγάλες επιτυχίες της, εντυπωσιακή σκηνική παρουσία και αμεσότητα με το κοινό. Μαζί της ο Γιάννης Φακίνος. Συμμετέχει ο Jordee.",

    image: "/images/events/katerina-lioliou-2026.png",

    upcoming: true,
  },

  {
    id: "ioulia-kallimani-2026",
    title: "ΙΟΥΛΙΑ ΚΑΛΛΙΜΑΝΗ LIVE",
    category: "music",

    date: "2026-08-26",
    time: "21:30",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Η Ιουλία Καλλιμάνη, μία από τις πιο δυναμικές φωνές του σύγχρονου λαϊκού τραγουδιού, έρχεται για μία μοναδική εμφάνιση στη Λάρισα. Μια βραδιά γεμάτη ένταση, συγκίνηση και αυθεντική διασκέδαση, με μεγάλες επιτυχίες αλλά και την παρουσίαση νέων τραγουδιών.",

    image: "/images/events/ioulia-kallimani-2026.png",

    upcoming: true,
  },

  {
    id: "mikri-gorgona-2026",
    title: "ΜΙΚΡΗ ΓΟΡΓΟΝΑ ΚΑΤΩ ΑΠΟ ΤΑ ΚΥΜΑΤΑ",
    category: "kids",

    date: "2026-08-27",
    time: "20:00",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Ένα ταξίδι στον βυθό παρέα με την Άριελ και τους φίλους της. Ψάρια, σουπιές, ιππόκαμποι, ο Σεμπάστιαν, ο βασιλιάς Τρίτων, ο πρίγκιπας Έρικ και η Κακιά Μάγισσα Ούρσουλα ζωντανεύουν σε μια φαντασμαγορική θεατρική εμπειρία από την Art Muppets Production.",

    image: "/images/events/mikri-gorgona-2026.png",

    upcoming: true,
  },

  {
    id: "swzwn-swthitw-2026",
    title: "Ο ΣΩΖΩΝ ΕΑΥΤΟΝ ΣΩΘΗΤΩ",
    category: "theatre",

    date: "2026-08-28",
    time: "21:00",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Η κλασική κωμωδία του Εντουάρντο ντε Φίλιππο παρουσιάζεται στη Λάρισα, στο πλαίσιο της καλοκαιρινής της περιοδείας. Σκηνοθεσία: Ταμίλλα Κουλίεβα. Εισιτήρια από 18€.",

    image: "/images/events/swzwn-swthitw-2026.png",

    upcoming: true,
  },

  {
    id: "rack-2026",
    title: "RACK LIVE",
    category: "music",

    date: "2026-08-29",
    time: "19:00",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Ο Rack κάνει στάση στη Λάρισα στο πλαίσιο της καλοκαιρινής του περιοδείας, παρουσιάζοντας ένα μεγάλο urban και rap show με τις γνωστότερες επιτυχίες του. Ώρες: 19:00–23:00. Εισιτήρια από 15€.",

    image: "/images/events/rack-2026.png",

    upcoming: true,
  },

  {
    id: "paixnidi-xaras-2026",
    title: "ΠΟΛΥΑΝΝΑ – ΤΟ ΠΑΙΧΝΙΔΙ ΤΗΣ ΧΑΡΑΣ",
    category: "theatre",

    date: "2026-08-31",
    time: "21:00",

    venue: "Κηποθέατρο Αλκαζάρ",
    location: "Λάρισα",

    description:
      "Το Παιχνίδι της Χαράς, βασισμένο στη νουβέλα της Έλενορ Πόρτερ «Πολυάννα».",

    image: "/images/events/paixnidi-xaras-2026.png",

    upcoming: true,
  },
];