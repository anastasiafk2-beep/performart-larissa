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
            <div className="grid w-fit grid-cols-2 gap-5 lg:grid-cols-4">

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
      </section>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}