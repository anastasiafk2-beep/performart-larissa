"use client";

import ProtectedImage from "@/components/ProtectedImage";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ContactModal from "@/components/ContactModal";
import { isDarkCulturePath } from "@/lib/site-theme";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isOpinionsPage =
    pathname === "/opinions" || pathname.startsWith("/opinions/");
  const usesWhiteLogo =
    isHomePage || isOpinionsPage || isDarkCulturePath(pathname);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-500 ${
          isOpinionsPage ? "site-header--opinions" : ""
        }`}
      >
        <div className="site-header-inner mx-auto flex h-25 max-w-none items-center justify-between pl-10 pr-4">
          <Link href="/" className="site-header-logo relative -top-0">
            <ProtectedImage
              src={
                usesWhiteLogo
                  ? "/logos/logo-white.png"
                  : "/logos/logo-black.png"
              }
              alt="The PerformArt Larissa"
              width={320}
              height={150}
              priority
            />
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Άνοιγμα μενού"
            className="site-menu-button text-red-600 transition hover:text-red-700"
          >
            <Menu size={42} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className={`site-menu-overlay fixed inset-0 z-[999] overflow-y-auto bg-black/95 backdrop-blur-md animate-fadeIn ${
            isOpinionsPage ? "site-menu-overlay--opinions" : ""
          }`}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="site-menu-logo absolute left-10 top-8 z-50"
          >
            <ProtectedImage
              src="/logos/logo-white.png"
              alt="The PerformArt Larissa"
              width={280}
              height={180}
              priority
            />
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Κλείσιμο μενού"
            className="site-menu-close absolute right-10 top-10 z-50 text-white transition hover:text-red-600"
          >
            <X size={56} strokeWidth={1.5} />
          </button>

          <nav className="site-menu-nav flex min-h-full flex-col items-center justify-center gap-8 px-6 py-28">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Αρχική
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-6 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Η Φιλοσοφία μας
            </Link>

            <Link
              href="/events"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Εκδηλώσεις
            </Link>

            <Link
              href="/interviews"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Συνεντεύξεις
            </Link>

            <Link
              href="/opinions"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Απόψεις
            </Link>

            <Link
              href="/books"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Βιβλίο
            </Link>

            <Link
              href="/music"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Μουσική
            </Link>

            <Link
              href="/cinema"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Σινεμά
            </Link>

            <Link
              href="/festivals"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Φεστιβάλ
            </Link>

            <Link
              href="/giveaways"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 text-4xl font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:text-red-500"
            >
              <span className="h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-10"></span>
              Giveaways
            </Link>

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
        .site-menu-overlay {
          overscroll-behavior: contain;
        }

        .site-header--opinions {
          background: #000000 !important;
        }

        .site-header--opinions .site-menu-button {
          color: #fe1f24 !important;
        }

        .site-menu-overlay--opinions {
          background: #000000 !important;
          backdrop-filter: none !important;
        }

        .site-menu-overlay--opinions .site-menu-close,
        .site-menu-overlay--opinions .site-menu-nav > a {
          color: #ffffff !important;
        }

        .site-menu-overlay--opinions .site-menu-close:hover,
        .site-menu-overlay--opinions .site-menu-nav > a:hover {
          color: #fe1f24 !important;
        }

        .site-menu-overlay--opinions .site-menu-nav > a > span {
          background: #fe1f24 !important;
        }

        /* Laptop and intermediate desktop sizes. */
        @media (min-width: 768px) {
          .site-header-inner {
            height: var(--fluid-header-height) !important;
            padding-left: clamp(24px, 4vmin, 44px) !important;
            padding-right: clamp(20px, 3.5vmin, 40px) !important;
          }

          .site-header-logo img {
            width: clamp(340px, 46vmin, 480px) !important;
            max-width: clamp(340px, 46vmin, 480px) !important;
            height: auto !important;
            transform: translateY(clamp(14px, 1vmin, 25px));
          }

          .site-menu-button svg {
            width: clamp(40px, 5vmin, 54px) !important;
            height: clamp(40px, 5vmin, 54px) !important;
          }

          .site-menu-logo {
            left: clamp(24px, 3vw, 40px) !important;
            top: 24px !important;
          }

          .site-menu-logo img {
            width: clamp(340px, 46vmin, 480px) !important;
            max-width: clamp(340px, 46vmin, 480px) !important;
            height: auto !important;
          }

          .site-menu-close {
            top: 28px !important;
            right: clamp(24px, 3vw, 40px) !important;
          }

          .site-menu-close svg {
            width: clamp(42px, 5.4vmin, 58px) !important;
            height: clamp(42px, 5.4vmin, 58px) !important;
          }

          .site-menu-nav {
            gap: clamp(14px, 2vmin, 22px) !important;
            padding-top: clamp(104px, 14vmin, 145px) !important;
            padding-bottom: clamp(28px, 5vmin, 54px) !important;
          }

          .site-menu-nav > a {
            gap: 12px !important;
            font-size: clamp(28px, 4.15vmin, 44px) !important;
            line-height: 1.12 !important;
            letter-spacing: 0.16em !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1599px) and (max-height: 760px) {
          .site-menu-nav {
            justify-content: flex-start !important;
            gap: 14px !important;
            padding-top: 112px !important;
            padding-bottom: 28px !important;
          }

          .site-menu-nav > a {
            font-size: clamp(26px, 3.8vmin, 31px) !important;
            line-height: 1.08 !important;
          }
        }

        @media (min-width: 1600px) {
          .site-header-logo img {
            width: 350px !important;
            max-width: 350px !important;
          }
        }

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
            width: 130px !important;
            height: auto !important;
            max-width: 130px !important;
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