export type Giveaway = {
  id: string;

  title: string;

  subtitle?: string;

  date: string;

  venue?: string;

  eventDate?: string;

  time?: string;

  description: string;

  image: string;

  participation: string[];

  winners?: string;

  instagramUrl?: string;

  endDate?: string;

  active: boolean;
};

export const giveaways: Giveaway[] = [
  {
    id: "romaios-kai-ioulieta",

    title: "ΚΕΡΔΙΣΤΕ 3 ΔΙΠΛΕΣ ΠΡΟΣΚΛΗΣΕΙΣ",

    subtitle: "για την παράσταση «Ρωμαίος και Ιουλιέτα του Μποστ»",

    date: "20 ΑΥΓΟΥΣΤΟΥ 2026",

    venue: "Κηποθέατρο Αλκαζάρ",

    eventDate: "23 ΑΥΓΟΥΣΤΟΥ 2026",

    time: "21:00",

    endDate: "22 ΑΥΓΟΥΣΤΟΥ 2026, 23:59",

    description:
      "Κερδίστε 3 διπλές προσκλήσεις για την παράσταση «Ρωμαίος και Ιουλιέτα του Μποστ»!",

    image: "/images/giveaways/romeo-juliet-bost-2026.png",

    participation: [
      "Κάνε like στο post",
      "Κάνε tag ένα άτομο που θέλεις να πάρεις μαζί",
      "Follow τη σελίδα @performart_larissa",
    ],

    winners: "3 νικητές — 3 διπλές προσκλήσεις",

    instagramUrl: "https://www.instagram.com/p/DcQltnSgRuk/",

  

    active: true,

   
  },
];