"use client";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="
        contact-modal-page
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/80
        backdrop-blur-md
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          contact-modal-panel
          relative
          w-[90%]
          max-w-5xl
          px-24
          py-28
        "
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute
            right-8
            top-6
            text-4xl
            text-white/70
            transition
            hover:text-white
          "
        >
          ×
        </button>

        {/* TITLE */}
        <h2
          className="
            contact-modal-title
            mb-16
            text-center
            font-serif
            tracking-[0.25em]
            text-4xl
            text-white
          "
        >
          ΕΠΙΚΟΙΝΩΝΙΑ
        </h2>
<br></br>
<br></br>
        {/* CONTACT INFORMATION */}
        <div className="contact-modal-grid grid grid-cols-1 gap-1 md:grid-cols-2">

          {/* EMAIL */}
          <div className="text-center">

            <p
              className="
                mb-5
                text-2sm
                uppercase
                tracking-[0.45em]
                text-[#C13B3A]
              "
            >
              Email
            </p>

            <a
              href="mailto:performart.lar@gmail.com"
              className="
                text-2xl
                text-white
                transition
                hover:text-[#C13B3A]
              "
            >
              performart.lar@gmail.com
            </a>

          </div>

          {/* PHONE */}
          <div className="text-center">

            <p
              className="
                mb-5
                text-2sm
                uppercase
                tracking-[0.45em]
                text-[#C13B3A]
              "
            >
              Τηλέφωνο
            </p>

            <a
              href="tel:+306977948210"
              className="
                text-2xl
                text-white
                transition
                hover:text-[#C13B3A]
              "
            >
              +30 697 7948210
            </a>

          </div>

        </div>

      <style>{`
        /* =====================================================
           MOBILE ONLY
           Το desktop παραμένει ακριβώς όπως είναι.
           ===================================================== */

        @media (max-width: 767px) {

          /* OVERLAY */
          .contact-modal-page {
            width: 100% !important;
            max-width: 100vw !important;
            overflow: hidden !important;
          }

          /* MODAL PANEL
             Ακυρώνουμε το μεγάλο desktop px-24 / py-28
             ώστε το περιεχόμενο να χωράει σωστά στο κινητό. */
          .contact-modal-panel {
            width: calc(100% - 32px) !important;
            max-width: calc(100% - 32px) !important;

            margin: 0 !important;
            padding: 62px 20px 45px !important;

            box-sizing: border-box !important;
          }

          /* CLOSE */
          .contact-modal-panel > button {
            top: 14px !important;
            right: 14px !important;

            width: 32px !important;
            height: 32px !important;

            display: flex !important;
            align-items: center !important;
            justify-content: center !important;

            padding: 0 !important;

            font-size: 30px !important;
            line-height: 1 !important;
          }

          /* TITLE */
          .contact-modal-title {
            width: 100% !important;
            max-width: 100% !important;

            margin: 0 0 32px !important;
            padding: 0 !important;

            font-size: 27px !important;
            line-height: 1.1 !important;
            letter-spacing: 0.15em !important;

            text-align: center !important;
          }

          /* Τα δύο desktop <br> δημιουργούν περιττό κενό */
          .contact-modal-panel > br {
            display: none !important;
          }

          /* CONTACT GRID */
          .contact-modal-grid {
            width: 100% !important;
            max-width: 100% !important;

            display: flex !important;
            flex-direction: column !important;

            gap: 30px !important;

            box-sizing: border-box !important;
          }

          /* EMAIL / PHONE */
          .contact-modal-grid > div {
            width: 100% !important;
            max-width: 100% !important;

            text-align: center !important;
            box-sizing: border-box !important;
          }

          .contact-modal-grid > div p {
            margin: 0 0 10px !important;

            font-size: 9px !important;
            line-height: 1.4 !important;
            letter-spacing: 0.28em !important;
          }

          .contact-modal-grid > div a {
            display: inline-block !important;

            max-width: 100% !important;

            font-size: 16px !important;
            line-height: 1.4 !important;

            overflow-wrap: anywhere !important;
            word-break: break-word !important;
          }
        }

        @media (max-width: 480px) {

          .contact-modal-panel {
            width: calc(100% - 24px) !important;
            max-width: calc(100% - 24px) !important;

            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .contact-modal-title {
            font-size: 24px !important;
            letter-spacing: 0.12em !important;
          }

          .contact-modal-grid > div a {
            font-size: 14px !important;
          }
        }
      `}</style>

      </div>
    </div>
  );
}