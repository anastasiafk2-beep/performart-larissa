export default function Hero() {
  return (
    <section
      className="hero-section relative min-h-screen bg-cover bg-center overflow-hidden mb-0"
      style={{
        backgroundImage: "url('/images/heroo.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div className="hero-content relative z-10 flex min-h-screen items-center pb-16">
        <div className="hero-container mx-auto w-full max-w-7xl" style={{ paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)", boxSizing: "border-box" }}>
          <div className="hero-copy w-full max-w-[720px]" style={{ width: "100%", maxWidth: "720px", transform: "translateX(0)" }}>
            <h1 className="hero-title w-full max-w-full font-black uppercase text-white" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.18, letterSpacing: "-0.02em", maxWidth: "100%", overflowWrap: "break-word" }}>
              <div className="mb-4">Ο,ΤΙ ΣΥΜΒΑΙΝΕΙ</div>
              <div className="mb-4">
                ΣΤΟΝ <span className="text-red-600">ΠΟΛΙΤΙΣΜΟ...</span>
              </div>
              <div>ΠΡΙΝ ΤΟ ΜΑΘΟΥΝ ΟΛΟΙ.</div>
            </h1>
            <br />
            <br></br>
            <br></br>
            <p className="hero-description mt-8 w-full max-w-[430px] font serif text-gray-100" style={{ width: "100%", maxWidth: "430px", fontSize: "clamp(16px, 2vw, 24px)", lineHeight: 1.65, overflowWrap: "break-word" }}>
              Εκδηλώσεις, συνεντεύξεις, αφιερώματα,
              προτάσεις και συνεργασίες με καλλιτέχνες,
              παραγωγές και φεστιβάλ της Λάρισας.
            </p>
          </div>
        </div>
      </div>


    </section>
  );
}