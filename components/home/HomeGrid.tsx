"use client";

import { useState } from "react";

import HomeCard from "@/components/cards/HomeCard";
import ContactModal from "@/components/ContactModal";

import {
  House,
  Shapes,
  CalendarDays,
  Mic,
  BookOpen,
  Music,
  Clapperboard,
  Tent,
  Gift,
  Send,
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
    title: "ΒΙΒΛΙΟ",
    href: "/books",
    icon: BookOpen,
    image: "/images/menu/book.png",
  },

  {
    number: "05",
    title: "ΜΟΥΣΙΚΗ",
    href: "/music",
    icon: Music,
    image: "/images/menu/music.png",
  },

  {
    number: "06",
    title: "ΣΙΝΕΜΑ",
    href: "/cinema",
    icon: Clapperboard,
    image: "/images/menu/cinema.png",
  },

  {
    number: "07",
    title: "ΦΕΣΤΙΒΑΛ",
    href: "/festivals",
    icon: Tent,
    image: "/images/menu/festivals.png",
  },

  {
    number: "08",
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
      <section className="relative z-20 -mt-16 bg-black pt-0 pb-24">
        <div className="w-full flex justify-center">

          <div className="mb-28">
            <div
  className="home-grid"
  style={{
    width: "calc(100vw - 48px)",
    maxWidth: "1880px",
    margin: "0 auto",
  }}
>

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
<div></div>
            </div>
          </div>

        </div>
        <style jsx>{`
  .home-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 640px) {
    .home-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1600px) {
    .home-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
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