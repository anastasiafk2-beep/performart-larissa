"use client";

import ProtectedImage from "@/components/ProtectedImage";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ContactModal from "@/components/ContactModal";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
const [contactOpen, setContactOpen] = useState(false);

const pathname = usePathname();
const isHomePage = pathname === "/";
 

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-500">

     <div className="mx-auto flex h-25 max-w-none items-center justify-between pl-10 pr-4">
        <a href="/" className="relative -top-0">
          <ProtectedImage
            src={isHomePage ? "/logos/logo-white.png" : "/logos/logo-black.png"}
            alt="The PerformArt Larissa"
            width={320}
            height={150}
            priority
          />
        </a>



        <button
  onClick={() => setMenuOpen(true)}
  aria-label="Άνοιγμα μενού"
  className="text-red-700 transition hover:text-red-600"
>
          <Menu size={42} strokeWidth={1.5} />
        </button>
      </div>
    </header>
    {menuOpen && (
  <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md animate-fadeIn">

    <a href="/" className="absolute left-10 top-8 z-50">
      <ProtectedImage
        src="/logos/logo-white.png"
        alt="The PerformArt Larissa"
        width={300}
        height={210}
        priority
      />
    </a>

    <button
      onClick={() => setMenuOpen(false)}
      className="absolute right-10 top-10 text-white transition hover:text-red-600"
    >
      <X size={56} strokeWidth={1.5} />
    </button>

    

    <nav className="flex h-full flex-col justify-center items-center gap-8">
      <a
  href="/"
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>

  Αρχική
</a>

<a href="/about" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Η Φιλοσοφία μας
      </a>

      <a href="/events" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Εκδηλώσεις
      </a>

      <a href="/interviews" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Συνεντεύξεις
      </a>

      <a href="/books" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Βιβλίο
      </a>

      <a href="/music" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Μουσική
      </a>

      <a href="/cinema" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Σινεμά
      </a>

      <a href="/festivals" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Φεστιβάλ
      </a>

      <a href="/giveaways" 
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
        Giveaways
      </a>

   <a
  href="#"
  onClick={(e) => {
    e.preventDefault();

    setMenuOpen(false);

    setTimeout(() => {
      setContactOpen(true);
    }, 200);
  }}
  className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
>
  <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>

  Επικοινωνία
</a>

</nav>
</div>
)}

<ContactModal
  isOpen={contactOpen}
  onClose={() => setContactOpen(false)}
/>

</>
);
}