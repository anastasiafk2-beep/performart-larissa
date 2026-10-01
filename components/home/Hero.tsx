import TrackedLink from "@/components/analytics/TrackedLink";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero-section relative mb-0 min-h-[100svh] overflow-hidden bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/heroo.jpg')",
          filter: "brightness(0.62) contrast(1.22) saturate(0.8)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.48) 100%), linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 28%, rgba(0,0,0,0.12) 65%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div className="hero-content relative z-10 flex min-h-[100svh] items-center pb-16">
        <div className="hero-container mx-auto w-full max-w-7xl px-[clamp(20px,3vw,48px)]">
          <div className="hero-copy relative mx-auto w-full max-w-[900px] text-center">
  <h1 className="hero-title mx-auto w-fit max-w-full text-[clamp(28px,4vw,28px)] leading-[1.22] font-black tracking-[0.03em] text-white uppercase [overflow-wrap:break-word]">
    <div className="mb-3 md:mb-4">Ο,ΤΙ ΣΥΜΒΑΙΝΕΙ</div>
    <div className="mb-3 md:mb-4">
      ΣΤΟΝ <span className="text-red-600">ΠΟΛΙΤΙΣΜΟ...</span>
    </div>
    <div>ΠΡΙΝ ΤΟ ΜΑΘΟΥΝ ΟΛΟΙ.</div>
  </h1>

 <p className="hero-description mx-auto [overflow-wrap:break-word]">
    Εκδηλώσεις, συνεντεύξεις, αφιερώματα, προτάσεις
    και συνεργασίες με καλλιτέχνες, παραγωγές και φεστιβάλ
    της Λάρισας.
  </p>
</div>
        </div>
      </div>
      <div className="hero-edge-label" aria-hidden="true">
        <span>CULTURE<br />LIVES<br />HERE</span>
      </div>
      <a className="hero-scroll-cue" href="#home-content" aria-label="Δείτε το περιεχόμενο της σελίδας">
        <span aria-hidden="true">↓</span>
        <span>SCROLL</span>
      </a>
      <nav className="hero-social-links" aria-label="Κοινωνικά δίκτυα">
        <TrackedLink eventName="social_click" eventParams={{ platform: "instagram", link_location: "hero", account_type: "performart" }} href="https://www.instagram.com/performart_larissa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram aria-hidden="true" /></TrackedLink>
        <TrackedLink eventName="social_click" eventParams={{ platform: "facebook", link_location: "hero", account_type: "performart" }} href="https://www.facebook.com/share/1LNa7jmHzy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF aria-hidden="true" /></TrackedLink>
        <TrackedLink eventName="social_click" eventParams={{ platform: "tiktok", link_location: "hero", account_type: "performart" }} href="https://www.tiktok.com/@performart_larissa" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok aria-hidden="true" /></TrackedLink>
      </nav>
    </section>
  );
}
