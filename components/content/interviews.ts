export type Interview = {
  id: string;
  type: "video" | "article";
  guest?: string;
  title: string;
  date: string;
  description: string;
  youtubeId?: string;
  image?: string;
  url?: string;
};

export const interviews: Interview[] = [
  {
  id: "ioanna-pappa",

  type: "video",

  guest: "Ιωάννα Παππά",

  title: "Η Ιωάννα Παππά στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",

  date: "2024-07-05",

  description:
    "Με μεγάλη χαρά σας παρουσιάζουμε την Ιωάννα Παππά στη στήλη «Interview Stories». Σε μια αποκλειστική συνέντευξη μοιράζεται τις σκέψεις και τις εμπειρίες της, μιλώντας για την πορεία της, τη ζωή της και τα μελλοντικά επαγγελματικά της σχέδια.",

  youtubeId: "UFme5_IKZvA",
},



  {
  id: "kostas-kappas",

  type: "video",

  guest: "Κώστας Κάππας",

  title: "Ο Κώστας Κάππας στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",

  date: "2024-07-11",

  description:
    "Στα Interview Stories του The performART_Larissa, ο ηθοποιός Κωνσταντίνος Κάππας μιλάει για την τέχνη, την καριέρα του, τον ρόλο του στην παράσταση «ΤΕΛΕΙΟΙ ΞΕΝΟΙ» και τα επόμενα επαγγελματικά σχέδιά του.",

  youtubeId: "yyZG01hPkDM",
},

{
  id: "christos-chatzipanagiotis",
  title: "Ο Χρήστος Χατζηπαναγιώτης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-07-13",
  description:
    "Ο Χρήστος Χατζηπαναγιώτης μιλά στο The performART_Larissa για τον ρόλο του στην παράσταση «Μπαμπάδες με ρούμι», τη ζωή του και τα μελλοντικά επαγγελματικά του σχέδια.",
  type: "video",
  youtubeId: "n8BOzdH7Kxw",
},

{
  id: "thanasis-tsaltampasis",
  title: "Ο Θανάσης Τσαλταμπάσης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-07-23",
  description:
    "Ο Θανάσης Τσαλταμπάσης μιλά για την παράσταση «Δον Κιχώτης», τους σημαντικότερους ρόλους της καριέρας του, την αγάπη του για το θέατρο και τα μελλοντικά καλλιτεχνικά του σχέδια.",
  type: "video",
  youtubeId: "Nxn56vYgcxI",
},

{
  id: "lena-papaligoura",
  title: "Η Λένα Παπαληγούρα στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-07-25",
  description:
    "Η Λένα Παπαληγούρα μιλά αποκλειστικά για την παράσταση «Ικέτιδες» και μοιράζεται τις σκέψεις της για την τέχνη, το θέατρο και τη δημιουργική διαδικασία.",
  type: "video",
  youtubeId: "grxRg74-rT4",
},

{
  id: "mando",
  title: "Η Μαντώ στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-07-15",
  description:
    "Η αγαπημένη τραγουδίστρια Μαντώ μιλά για το «80s, 90s Party» στο Κηποθέατρο Αλκαζάρ, θυμάται μεγάλες μουσικές στιγμές και μοιράζεται ιστορίες από την πορεία της.",
  type: "video",
  youtubeId: "4m0t9QD9CLI",
},

{
  id: "eleni-tsaligopoulou",
  title: "Η Ελένη Τσαλιγοπούλου στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-08-02",
  description:
    "Η Ελένη Τσαλιγοπούλου μιλά για την παράσταση «Μαρίκα με είπανε, Μαρίκα με βγάλανε» και τη συνάντησή της με το κοινό της Λάρισας.",
  type: "video",
  youtubeId: "rtLqiBKADcM",
},

{
  id: "dimitris-makalias",
  title: "Ο Δημήτρης Μακαλιάς στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-08-26",
  description:
    "Ο Δημήτρης Μακαλιάς μιλά για την παράσταση «Σεσουάρ για δολοφόνους», την τηλεόραση και τα επόμενα καλλιτεχνικά του σχέδια.",
  type: "video",
  youtubeId: "ry0HDEv6a_A",
},

{
  id: "ioannis-apergis",
  title: "Ο Ιωάννης Απέργης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-08-26",
  description:
    "Ο Ιωάννης Απέργης μιλά για την παράσταση «Σεσουάρ για δολοφόνους», τη ζωή του και τα επόμενα επαγγελματικά του σχέδια.",
  type: "video",
  youtubeId: "JbKyoP7B0rw",
},

{
  id: "nikorestis-chaniotakis",
  title: "Ο Νικορέστης Χανιωτάκης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-08-26",
  description:
    "Ο Νικορέστης Χανιωτάκης μιλά στα Interview Stories του The performART_Larissa για την παράσταση «Σεσουάρ για δολοφόνους», τη ζωή του και τα μελλοντικά του σκηνοθετικά όνειρα.",
  type: "video",
  youtubeId: "8spiV8C5wd8",
},

{
  id: "iraklis-tzafetas-giorgos-konstantinidis",
  title: "Ο Ηρακλής Τζαφέτας και ο Γιώργος Κωνσταντινίδης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-10-31",
  description:
    "Οι Ηρακλής Τζαφέτας και Γιώργος Κωνσταντινίδης μιλούν για την παράσταση «Lebensraum 3000», τις προκλήσεις του έργου και το κοινωνικό του αποτύπωμα.",
  type: "video",
  youtubeId: "jiOqyyaFCUw",
},

{
  id: "rena-morfi",
  title: "Η Ρένα Μόρφη στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-11-22",
  description:
    "Η Ρένα Μόρφη μιλά αποκλειστικά για τη μουσική της, την έμπνευσή της και την εμφάνισή της στη Λάρισα στο Circus.",
  type: "video",
  youtubeId: "yloie_sHkeI",
},

{
  id: "stelios-rokkos",
  title: "Ο Στέλιος Ρόκκος στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-12-04",
  description:
    "Ο Στέλιος Ρόκκος μιλά για τη ζωή στη Λήμνο, τη μουσική του πορεία, τις εμφανίσεις του, τη σχέση του με το κοινό και τις ευχές του για τις γιορτές.",
  type: "video",
  youtubeId: "AU8h1-zVl9Q",
},

{
  id: "kyrios-x",
  title: "Ο Κύριος Χ στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2024-12-20",
  description:
    "Ο Κύριος Χ μας προσκαλεί στην ξεχωριστή χριστουγεννιάτικη εμφάνισή του στο Circus, σε μια βραδιά γεμάτη μουσική και γιορτινή διάθεση.",
  type: "video",
  youtubeId: "KNCJ5tnI3Fk",
},

{
  id: "dimitris-basis",
  title: "Ο Δημήτρης Μπάσης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-01-17",
  description:
    "Ο Δημήτρης Μπάσης μοιράζεται σκέψεις για τη μουσική, την πορεία του, τις προσωπικές του εμπειρίες και όσα συνεχίζουν να τον εμπνέουν.",
  type: "video",
  youtubeId: "I5-kGn1mmnw",
},

{
  id: "elli-paspala",
  title: "Η Έλλη Πασπαλά στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-02-01",
  description:
    "Η Έλλη Πασπαλά μιλά για τη μουσική της διαδρομή, τις αναμνήσεις από τη Νέα Υόρκη και τη δύναμη της μνήμης και της τέχνης.",
  type: "video",
  youtubeId: "bIpVAX6kEPM",
},

{
  id: "nikos-ziogalas",
  title: "Ο Νίκος Ζιώγαλας στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-02-13",
  description:
    "Ο Νίκος Ζιώγαλας μιλά για το τραγούδι «Βασιλική», τη μουσική του πορεία, το καρναβάλι και τη σχέση του με το κοινό.",
  type: "video",
  youtubeId: "UzNn3VeCbfs",
},

{
  id: "martha-frintzila",
  title: "Η Μάρθα Φριντζήλα στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-03-07",
  description:
    "Η Μάρθα Φριντζήλα μιλά για την τέχνη, την κοινωνία, τα προσωπικά της βιώματα και την ανάγκη ο καλλιτέχνης να παίρνει θέση απέναντι στη βαρβαρότητα της εποχής.",
  type: "video",
  youtubeId: "WTiXSrsABzE",
},

{
  id: "giorgos-ninios",
  title: "Ο Γιώργος Νινιός στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-03-09",
  description:
    "Ο Γιώργος Νινιός μιλά για τον θεατρικό μονόλογο «Τσιτάχ. Η ερημιά του τερματοφύλακα» και τις προκλήσεις της σκηνικής ερμηνείας.",
  type: "video",
  youtubeId: "J-7_mVXb4Lk",
},

{
  id: "ioulia-karapataki",
  title: "Η Ιουλία Καραπατάκη στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-03-28",
  description:
    "Η Ιουλία Καραπατάκη μιλά για τον νέο της δίσκο, τις sold-out εμφανίσεις της, την πορεία της στη μουσική και τα καλοκαιρινά της σχέδια.",
  type: "video",
  youtubeId: "tg3NZTOwjf8",
},

{
  id: "grigoris-bithikotsis",
  title: "Ο Γρηγόρης Μπιθικώτσης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-04-10",
  description:
    "Ο Γρηγόρης Μπιθικώτσης μιλά για τη μουσική του πορεία, την οικογενειακή παρακαταθήκη και τη συναυλία του στο Δημοτικό Θέατρο Τυρνάβου.",
  type: "video",
  youtubeId: "Php30BU0p9g",
},

{
  id: "despoina-vandi",
  title: "Η Δέσποινα Βανδή στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-07-07",
  description:
    "Η Δέσποινα Βανδή μιλά για τη σχέση της με τη σκηνή, τη δημιουργία, τις αλλαγές στη ζωή της και τα όνειρα που συνεχίζει να κυνηγά.",
  type: "video",
  youtubeId: "CM_jCT921Wo",
},

{
  id: "aimilios-cheilakis",
  title: "Ο Αιμίλιος Χειλάκης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-07-08",
  description:
    "Ο Αιμίλιος Χειλάκης μιλά για τον «Άμλετ», τη σχέση σκέψης και πράξης, την ευθύνη του καλλιτέχνη και τον ρόλο του θεάτρου στη σύγχρονη κοινωνία.",
  type: "video",
  youtubeId: "X8cE9mqeMEI",
},

{
  id: "giannis-bezos",
  title: "Ο Γιάννης Μπέζος στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-07-09",
  description:
    "Ο Γιάννης Μπέζος μιλά για τις «Αινιγματικές Παραλλαγές», τη μοναξιά, τον χρόνο, την αγάπη και τις πολλές όψεις της ανθρώπινης ύπαρξης.",
  type: "video",
  youtubeId: "08gJV8ZbqqY",
},

{
  id: "lydia-koniordou",
  title: "Η Λυδία Κονιόρδου στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-07-20",
  description:
    "Η Λυδία Κονιόρδου μιλά για την παράσταση «Ελένη - Η δίκη μιας πόρνης», τη δύναμη της γυναικείας αφήγησης και τη διαχρονική αξία του θεάτρου.",
  type: "video",
  youtubeId: "trJQ0r-ev7E",
},

{
  id: "vladimiros-kyriakidis",
  title: "Ο Βλαδίμηρος Κυριακίδης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-08-01",
  description:
    "Ο Βλαδίμηρος Κυριακίδης μιλά για τον «Θάνατο του Εμποράκου», τον Γουίλι Λόμαν, την επικαιρότητα του έργου και τη νέα του συνεργασία με τον Σωτήρη Τσαφούλια.",
  type: "video",
  youtubeId: "0Mn73z_0CfA",
},

{
  id: "giota-negka",
  title: "Η Γιώτα Νέγκα στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-08-09",
  description:
    "Η Γιώτα Νέγκα μιλά για τη μουσική, την ποίηση, τους μεγάλους Έλληνες συνθέτες και τη συνεργασία της με τη Μαρία Φαραντούρη.",
  type: "video",
  youtubeId: "121wxdg6OYw",
},

{
  id: "konstantinos-kazakos",
  title: "Ο Κωνσταντίνος Καζάκος στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-11-30",
  description:
    "Ο Κωνσταντίνος Καζάκος μιλά για την παράσταση «Άγουρα Κεράσια», την ενδοοικογενειακή βία, τη δύναμη του θεάτρου και τις προκλήσεις της σύγχρονης εποχής.",
  type: "video",
  youtubeId: "jEVmcHc6lDI",
},

{
  id: "dj-alx",
  title: "Ο DJ ALX στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-03-09",
  description:
    "Ο DJ ALX μιλά για την ιστορία της Ηχοκρατορίας, τους Terror X Crew, την επιστροφή του «ΡΙΜΑ για ΧΡΗΜΑ 3» και το μέλλον της ελληνικής hip hop σκηνής.",
  type: "video",
  youtubeId: "W5s6ffPXgO0",
},

{
  id: "taki-tsan",
  title: "Ο Taki Tsan στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-03-11",
  description:
    "Ο Taki Tsan μιλά για τα 26 χρόνια του «ΡΙΜΑ για ΧΡΗΜΑ», την περιοδεία, την αυθεντικότητα και τη διαχρονική κουλτούρα του hip hop.",
  type: "video",
  youtubeId: "GA3TmTgELGI",
},

{
  id: "dionysis-tsaknis",
  title: "Ο Διονύσης Τσακνής στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-03-20",
  description:
    "Ο Διονύσης Τσακνής μιλά για τη μουσική, την ευθύνη του καλλιτέχνη, τον Λαυρέντη Μαχαιρίτσα, τον πόλεμο και τη δύναμη της τέχνης να παίρνει θέση.",
  type: "video",
  youtubeId: "LvD2vKvjXiI",
},

{
  id: "joys-eveidi",
  title: "Η Τζόυς Ευείδη στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-04-01",
  description:
    "Η Τζόυς Ευείδη μιλά για την υποκριτική, τις προσωπικές επιλογές, την ειλικρίνεια, την κωμωδία και την παράσταση «Χάσαμε τη Θεία Στοπ».",
  type: "video",
  youtubeId: "nzHkutGOgPg",
},

{
  id: "dora-chrysikou",
  title: "Η Δώρα Χρυσικού στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-04-16",
  description:
    "Η Δώρα Χρυσικού μιλά για την παράσταση «Vaginahood», το #MeToo, την ταυτότητα, τα όρια και τη θέση της γυναίκας στη σύγχρονη κοινωνία.",
  type: "video",
  youtubeId: "g80WrM5bVDA",
},

{
  id: "karmen-rouggeri",
  title: "Η Κάρμεν Ρουγγέρη στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-08-29",
  description:
    "Η Κάρμεν Ρουγγέρη μιλά για το θέατρο για παιδιά, τα όνειρά της και τη δύναμη της τέχνης να διαμορφώνει τις επόμενες γενιές.",
  type: "article",
  url: "https://paidis.com/karmen-rougkeri-to-oneiro-mou-einai-mia-epidavros-gemati-me-paidia/",
},

{
  id: "marina-spanou",
  title: "Η Μαρίνα Σπανού στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-10-30",
  description:
    "Η Μαρίνα Σπανού μιλά για τη μουσική, τη δημιουργία και την προσωπική της καλλιτεχνική πορεία.",
  type: "article",
  url: "https://paidis.com/i-marina-spanou-synomilei-me-ton-evripidi-koutsina/",
},

{
  id: "kadebostany",
  title: "Οι KADEBOSTANY στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2025-12-10",
  description:
    "Οι KADEBOSTANY μιλούν για τη μουσική τους ταυτότητα, τις επιρροές τους και τη διεθνή τους πορεία.",
  type: "article",
  url: "https://paidis.com/oi-kadebostany-synomiloun-me-ton-evripidi-koutsina/",
},

{
  id: "maria-papageorgiou",
  title: "Η Μαρία Παπαγεωργίου στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-01-29",
  description:
    "Η Μαρία Παπαγεωργίου μιλά για την τέχνη, τη δημιουργία και την ανάγκη ο καλλιτέχνης να μη φοβάται να προκαλεί.",
  type: "article",
  url: "https://paidis.com/maria-papageorgiou-i-techni-den-prepei-na-fovatai-na-prokalei/",
},

{
  id: "paidi-travma",
  title: "Το Παιδί Τραύμα στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-03-17",
  description:
    "Το Παιδί Τραύμα μιλά για τη δημιουργία, τη γραφή, τον νέο του δίσκο και τις ιστορίες πίσω από τα τραγούδια του.",
  type: "article",
  url: "https://paidis.com/to-paidi-travma-synomilei-me-ton-evripidi-koutsina/",
},

{
  id: "giorgos-chatzipavlou",
  title: "Ο Γιώργος Χατζηπαύλου στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-05-19",
  description:
    "Ο Γιώργος Χατζηπαύλου μιλά για την κωμωδία, την καθημερινότητα και τον ρεαλισμό στη σκηνή και στη ζωή.",
  type: "article",
  url: "https://paidis.com/o-evripidis-koutsinas-syzita-me-ton-giorgo-chatzipavlou-gia-tin-komodia-tin-kathimerinotita-kai-to-realismo/",
},

{
  id: "giorgos-kapoutzidis",
  title: "Ο Γιώργος Καπουτζίδης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-06-08",
  description:
    "Ο Γιώργος Καπουτζίδης μιλά για την κοινωνία, την Ελλάδα και όσα σημαίνει να αγαπάς πραγματικά τη χώρα σου.",
  type: "article",
  image: "/images/interviews/giorgos-kapoutzidis.png",
  url: "https://paidis.com/giorgos-kapoutzidis-oi-anthropoi-pou-agapoun-pragmatika-ti-chora-tous-den-to-fonazoun/",
},

{
  id: "dimitris-samolis",
  title: "Ο Δημήτρης Σαμόλης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-06-23",
  description:
    "Ο Δημήτρης Σαμόλης μιλά για την έκθεση, την ειλικρίνεια και τη δημιουργία μέσα από την προσωπική ευαλωτότητα.",
  type: "article",
  image: "/images/interviews/dimitris-samolis.png",
  url: "https://paidis.com/dimitris-samolis-afto-pou-fovomaste-na-ekthesoume-einai-telika-kai-to-pio-polytimo-kommati-mas/",
},

{
  id: "tolis-papadimitriou",
  title: "Ο Τόλης Παπαδημητρίου στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-06-23",
  description:
    "Ο Τόλης Παπαδημητρίου μιλά για την πορεία του, το θέατρο και τη σύγχρονη κωμωδία.",
  type: "article",
  image: "/images/interviews/tolis-papadimitriou.png",
  
},

{
  id: "christos-chatzipanagiotis-article",
  title: "Ο Χρήστος Χατζηπαναγιώτης στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-07-08",
  description:
    "Ο Χρήστος Χατζηπαναγιώτης μιλά για την αισιοδοξία, τη ζωή και τη σημασία να εστιάζουμε στο καλό.",
  type: "article",
  image: "/images/interviews/christos-chatzipanagiotis.png",
  url: "https://paidis.com/christos-chatzipanagiotis-sto-cheri-mas-einai-na-estiazoume-sto-kalo-kai-na-palevoume-gi-afto/",
},

{
  id: "karyofyllia-karampeti",
  title: "Η Καρυοφυλλιά Καραμπέτη στα INTERVIEW STORIES με τον Ευριπίδη | The performART_Larissa",
  date: "2026-07-15",
  description:
    "Η Καρυοφυλλιά Καραμπέτη μιλά για τη «Μήδεια», το τραγικό στοιχείο και τη δύναμη του αρχαίου δράματος.",
  type: "article",

  image: "/images/interviews/karyofyllia-karampeti.png",

  url: "https://paidis.com/i-mideia-skotonei-ta-paidia-tis-alla-stin-pragmatikotita-skotonei-prota-ton-idio-tis-ton-eafto/",
},

];