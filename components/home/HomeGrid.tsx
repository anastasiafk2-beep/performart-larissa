"use client";

import { useState } from "react";

import HomeCard from "@/components/cards/HomeCard";
import ContactModal from "@/components/ContactModal";

import {
  Shapes,
  CalendarDays,
  Mic,
  BookOpen,
  Music,
  Clapperboard,
  Tent,
  Gift,
  MessageSquareText
} from "lucide-react";


const cards = [
  

  {
    number: "01",
    title: "Η ΦΙΛΟΣΟΦΙΑ ΜΑΣ",
    href: "/about",
    icon: Shapes,
    image: "/images/menu/philosophy.png",
  },

  {
    number: "02",
    title: "ΕΚΔΗΛΩΣΕΙΣ",
    href: "/events",
    icon: CalendarDays,
    image: "/images/menu/events.jpg",
  },

  {
    number: "03",
    title: "ΣΥΝΕΝΤΕΥΞΕΙΣ",
    href: "/interviews",
    icon: Mic,
    image: "/images/menu/interviews.png",
  },

 {
  number: "04",
  title: "ΑΠΟΨΕΙΣ",
  href: "/opinions",
  icon: MessageSquareText,
  image: "/images/menu/interviews.png",
},

  {
    number: "05",
    title: "ΒΙΒΛΙΟ",
    href: "/books",
    icon: BookOpen,
    image: "/images/menu/book.png",
  },

  {
    number: "06",
    title: "ΜΟΥΣΙΚΗ",
    href: "/music",
    icon: Music,
    image: "/images/menu/music.png",
  },

  {
    number: "07",
    title: "ΣΙΝΕΜΑ",
    href: "/cinema",
    icon: Clapperboard,
    image: "/images/menu/cinema.png",
  },

  {
    number: "08",
    title: "ΦΕΣΤΙΒΑΛ",
    href: "/festivals",
    icon: Tent,
    image: "/images/menu/festivals.png",
  },

  {
    number: "09",
    title: "GIVEAWAYS",
    href: "/giveaways",
    icon: Gift,
    image: "/images/menu/giveaways.png",
  },


];

export default function HomeGrid() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <section className="home-grid-section relative z-20 bg-black">
        <div className="w-full flex justify-center">

          <div className="home-grid-wrap">
            <div className="home-grid">

              {cards.map((card) => (
                <HomeCard
                  key={card.title}
                  image={card.image}
                  href={card.href}
                  title={card.title}
                  number={card.number}
                  icon={card.icon}
                  onClick={
                    card.title === "ΕΠΙΚΟΙΝΩΝΙΑ"
                      ? () => setContactOpen(true)
                      : undefined
                  }
                />
              ))}
            </div>
          </div>

        </div>
        <style jsx>{`
  .home-grid {
    display: grid;
    width: calc(100vw - 40px);
    max-width: 1880px;
    margin: 0 auto;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .home-grid-section {
    padding-top: clamp(48px, 7vmin, 80px);
    padding-bottom: clamp(48px, 7vmin, 80px);
  }

  .home-grid-wrap {
    margin-bottom: 0;
  }

  @media (min-width: 640px) {
    .home-grid {
      width: calc(100vw - 64px);
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) and (max-width: 1599px) {
    .home-grid {
      width: min(1320px, calc(100vw - clamp(80px, 8vw, 128px)));
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 28px;
    }

    .home-grid-wrap {
      margin-bottom: 0;
    }
  }

@media (min-width: 1600px) {
  .home-grid {
    width: min(1320px, calc(100vw - 96px));
    grid-template-columns: repeat(3, minmax(0, 1fr));

    column-gap: 0 !important;
    row-gap: 16px !important;
  }

  .home-grid > :global(a) {
    width: calc(100% - 16px) !important;
    justify-self: center !important;
  }
}

`}</style>
      </section>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
