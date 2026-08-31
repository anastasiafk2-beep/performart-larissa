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
  className="text-red-600 transition hover:text-red-700"
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
<style jsx global>{`
   /* =========================
     MOBILE HEADER
     ========================= */
  @media (max-width: 767px) {

    header > div {
      padding-left: 0 !important;
    }

 header > div {
    position: relative !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

    /* LOGO — τέρμα αριστερά */
  header > div > a {
    position: absolute !important;
    left: 0 !important;
    margin-left: 0 !important;
    transform: none !important;
  }

      /* MENU — τέρμα δεξιά */
  header button {
    position: absolute !important;
    right: 0 !important;
    left: auto !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
    transform: none !important;
  }

    /* =========================
       FULL SCREEN MENU
       ========================= */

    /* Menu logo */
    header ~ div > a img {
      width: 180px !important;
      height: auto !important;
      max-width: 180px !important;
    }

    /* Menu close button */
    header ~ div > button svg {
      width: 38px !important;
      height: 38px !important;
    }

    /* Menu links */
    header ~ div nav a {
      font-size: 22px !important;
      line-height: 1.15 !important;
      letter-spacing: 0.18em !important;
      gap: 12px !important;
    }

    /* Space between menu items */
    header ~ div nav {
      gap: 20px !important;
    }

  }


  /* =========================
     VERY SMALL PHONES
     ========================= */
  @media (max-width: 480px) {

  header > div {
    height: 82px !important;
    padding-left: 0 !important;
    padding-right: 14px !important;
  }

  header > div > a {
    margin-left: 0 !important;
    left: 0 !important;
    transform: none !important;
  }

  header > div > a img {
  width: 155px !important;
  max-width: 155px !important;
  height: auto !important;
  margin-left: 0 !important;
}
  
    header button svg {
      width: 31px !important;
      height: 31px !important;
    }

    header ~ div > a img {
      width: 155px !important;
      max-width: 155px !important;
    }

    header ~ div > button svg {
      width: 34px !important;
      height: 34px !important;
    }

    header ~ div nav a {
      font-size: 19px !important;
      letter-spacing: 0.16em !important;
    }

    header ~ div nav {
      gap: 17px !important;
    }
  }
`}</style>
</>
);

}