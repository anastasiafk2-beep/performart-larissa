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
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">

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

      </div>
    </div>
  );
}