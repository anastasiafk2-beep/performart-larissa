

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center overflow-hidden mb-0"
      style={{
        backgroundImage: "url('/images/heroo.jpg')",
      }}
    >
      {/* Μαύρο overlay */}
      <div className="absolute inset-0 bg-black/45" />

   

      <div className="relative z-10 flex min-h-screen items-center pb-16">
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5">
          {/* Κείμενο */}
          <div className="max-w-xl translate-x-20">
            <h1 className="text-5xl xl:text-5xl font-black uppercase leading-[1.3] text-white">
              <div className="mb-4">
                Ο,ΤΙ ΣΥΜΒΑΙΝΕΙ
              </div>

              <div className="mb-4">
                ΣΤΟΝ <span className="text-red-600">ΠΟΛΙΤΙΣΜΟ...</span>
              </div>

              <div>
                ΠΡΙΝ ΤΟ ΜΑΘΟΥΝ ΟΛΟΙ.
              </div>
            </h1>
<br />
<br></br>
<br></br>
            <p className="mt-10 max-w-lg text-2xl font serif leading-10 text-gray-100">
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