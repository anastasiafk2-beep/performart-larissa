"use client";

import Link from "next/link";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/performart_larissa?igsh=dm92c3YxYnd3Ymdk&utm_source=qr",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/1LNa7jmHzy/?mibextid=wwXIfr",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@performart_larissa?_r=1&_t=ZN-9857txAuBoE",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isOpinionsPage = pathname === "/opinions" || pathname.startsWith("/opinions/");

  return (
    <footer className={`relative overflow-hidden ${isOpinionsPage ? "footer--opinions" : ""}`}>
      <div className="footer-background absolute inset-0 bg-red-800">
        <div className="footer-overlay absolute inset-0 bg-black/40" />
      </div>

      <div className="footer-inner relative mx-auto">
        <NewsletterSignup />
        <div className="footer-main">
          <div className="footer-column footer-contact">
            <div className="footer-heading flex items-center gap-4">
              <span className="h-px w-8 bg-red-600" />
              <h3 className="text-[17px] font-bold uppercase tracking-[0.45em] text-white/90">
                ΕΠΙΚΟΙΝΩΝΙΑ
              </h3>
            </div>

            <div className="footer-contact-links">
              <a
                href="mailto:performart.lar@gmail.com"
                className="group flex items-center justify-center gap-5 text-zinc-400 transition hover:text-white"
              >
                <HiOutlineEnvelope
                  size={22}
                  className="shrink-0 text-white transition group-hover:text-red-600"
                />
                <span className="text-white">performart.lar@gmail.com</span>
              </a>

              <a
                href="tel:+306977948210"
                className="group flex items-center justify-center gap-5 text-zinc-400 transition hover:text-white"
              >
                <HiOutlinePhone
                  size={22}
                  className="shrink-0 text-white transition group-hover:text-red-600"
                />
                <span className="text-white">+30 697 7948210</span>
              </a>
            </div>
          </div>

          <div className="footer-column footer-social">
            <div className="footer-heading flex items-center gap-4">
              <span className="h-px w-8 bg-red-600" />
              <h3 className="text-[17px] font-bold uppercase tracking-[0.45em] text-white/90">
                FOLLOW US
              </h3>
            </div>

            <div className="footer-social-links">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="group flex items-center justify-center gap-5 text-zinc-300 transition hover:text-white"
                  >
                    <Icon size={22} className="transition group-hover:scale-110" />
                    <span className="text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      <div className="footer-legal">
  <Link href="/privacy">
    Πολιτική Απορρήτου
  </Link>

  <span>·</span>

  <Link href="/cookies">
    Πολιτική Cookies
  </Link>

  <span>·</span>

  <Link href="/terms">
    Όροι Χρήσης
  </Link>

  <span>·</span>

  <button
    type="button"
    onClick={() => {
      window.dispatchEvent(
        new Event("performart-open-cookie-settings")
      );
    }}
  >
    Ρυθμίσεις Cookies
  </button>
</div>

<div className="footer-copyright">
  <p className="text-center text-[11px] uppercase tracking-[0.45em] text-zinc-300">
    © 2026 THE PERFORMART LARISSA
  </p>
</div>
      </div>

      <style jsx>{`
        .footer--opinions .footer-background {
          background: #000000;
        }

        .footer--opinions .footer-overlay {
          display: none;
          background: #000000;
        }

        .footer--opinions :global(.footer-heading > span) {
          background: #fe1f24 !important;
        }

        .footer--opinions :global(.footer-heading h3),
        .footer--opinions :global(.footer-column a),
        .footer--opinions :global(.footer-column a span),
        .footer--opinions :global(.footer-column svg),
        .footer--opinions :global(.footer-copyright p) {
          color: #ffffff !important;
        }

        .footer--opinions :global(.footer-column a:hover),
        .footer--opinions :global(.footer-column a:hover svg) {
          color: #fe1f24 !important;
        }

        .footer--opinions .footer-contact {
          border-color: #ffffff;
        }

        .footer-inner {
          width: min(100%, 1400px);
          padding: clamp(36px, 5vmin, 64px) clamp(20px, 4vw, 56px)
            clamp(24px, 3vmin, 40px);
        }

        .footer-main {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(24px, 4vmin, 44px);
        }

        .footer-contact {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-heading {
          margin-bottom: clamp(22px, 3vmin, 34px);
        }

        .footer-contact-links,
        .footer-social-links {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-contact-links {
          gap: clamp(18px, 2.4vmin, 28px);
        }

        .footer-social-links {
          gap: clamp(12px, 1.8vmin, 20px);
        }

.footer-legal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: clamp(20px, 3vmin, 30px);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.75);
}

.footer-legal :global(a),
.footer-legal button {
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.2s ease;
}

.footer-legal :global(a:hover),
.footer-legal button:hover {
  color: #ffffff;
}

.footer-legal button {
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  letter-spacing: inherit;
  cursor: pointer;
}

.footer-legal span {
  color: rgba(255, 255, 255, 0.4);
}

        .footer-copyright {
          padding-top: clamp(22px, 3vmin, 34px);
        }

        @media (max-width: 767px) {
          .footer-inner {
            padding: 28px 20px 24px;
          }

          .footer-main {
            grid-template-columns: 1fr;
          }

          .footer-column {
            padding: 30px 16px;
          }

          .footer-contact {
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .footer--opinions .footer-contact {
            border-bottom-color: #ffffff;
          }

          .footer-heading {
            margin-bottom: 22px;
          }

          .footer-contact-links {
            gap: 18px;
          }

          .footer-social-links {
            gap: 12px;
          }

          .footer-column h3 {
            font-size: 13px !important;
            letter-spacing: 0.32em !important;
          }

          .footer-column a,
          .footer-column span {
            font-size: 15px !important;
          }

          .footer-column svg {
            width: 19px !important;
            height: 19px !important;
          }

.footer-legal {
  gap: 8px;
  padding-top: 20px;
  font-size: 11px;
  text-align: center;
}

          .footer-copyright {
            padding-top: 24px;
          }
        }

        @media (max-width: 480px) {
          .footer-inner {
            padding-left: 16px;
            padding-right: 16px;
          }

          .footer-column {
            padding: 26px 10px;
          }

          .footer-column h3 {
            font-size: 12px !important;
            letter-spacing: 0.28em !important;
          }

          .footer-column a,
          .footer-column span {
            font-size: 14px !important;
          }

          .footer-column svg {
            width: 18px !important;
            height: 18px !important;
          }

          .footer-copyright p {
            font-size: 9px !important;
            letter-spacing: 0.32em !important;
          }
        }
      `}</style>
    </footer>
  );
}
