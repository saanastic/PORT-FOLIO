import React, { useEffect, useState } from "react";

const Desktop3 = () => {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-aspect-ratio: 1/1)");

    setIsNarrow(mql.matches);

    const handleChange = (e) => {
      setIsNarrow(e.matches);
    };

    mql.addEventListener("change", handleChange);

    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[rgb(174,50,50)] overflow-hidden flex justify-center items-center">
      {/* ================= OVERALL SCALE ================= */}
      <div
        className="origin-top w-full"
        style={{
          transform: `scale(${isNarrow ? 1 : 0.82})`,
        }}
      >
        {/* ================= TOP HEADING ================= */}
        <div
          className={`flex items-start justify-between px-4 sm:px-0 ${
            isNarrow ? "w-[80%] mx-auto" : ""
          }`}
        >
          <h1 className="font-display font-black uppercase text-white leading-none text-4xl sm:text-6xl lg:text-7xl">
            ABOUT

            <span
              className="rotate-[-20deg] font-normal lowercase text-black text-2xl sm:text-4xl lg:text-5xl ml-2 sm:ml-4 inline-block align-middle"
              data-flip-target="name"
              style={{ fontFamily: "'Splash', cursive" }}
            >
              Saanvi
              <br />

              <span
                className="ml-4 sm:ml-8 rotate-[-10deg] inline-block"
                style={{ fontFamily: "'Splash', cursive" }}
              >
                Arora
              </span>
            </span>
          </h1>

          {/* ================= FUN FACT ================= */}
          <div className="hidden sm:flex flex-col items-center justify-center bg-[#3D0E0E] text-white text-center text-xs sm:text-sm font-bold uppercase tracking-wide px-4 py-3 rounded-md shadow-md shrink-0">
            <span className="text-[10px] sm:text-xs">#</span>
            <span>FUN</span>
            <span>FACT</span>
          </div>
        </div>

        {/* ================= CONTENT CARD ================= */}
        <div
          className={`content-card relative mt-8 sm:mt-12 rounded-[32px] p-6 sm:p-10 lg:p-14 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl ${
            isNarrow
              ? "w-[80%] mx-auto"
              : "mx-4 sm:mx-0 min-h-[500px] sm:min-h-[560px] lg:min-h-[600px]"
          }`}
          style={{
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.12)",
          }}
        >
          {/* ================= TEXT ================= */}
          <div
            className={
              isNarrow
                ? "w-full text-left pl-4 sm:pl-6"
                : "w-[65%] lg:w-[62%]"
            }
            style={{
              color: "#fff",
            }}
          >
            {/* ================= HI I'M ================= */}
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(20px, 4.5vw, 50px)",
                fontWeight: 600,
                lineHeight: "clamp(26px, 5.5vw, 60px)",
                color: "#fff",
                opacity: 0.75,
                marginTop: "clamp(-8px, -1.8vw, -25px)",
              }}
            >
              Hi, I'm
            </p>

            {/* ================= NAME ================= */}
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(28px, 6.5vw, 70px)",
                fontWeight: 600,
                lineHeight: "clamp(32px, 5.5vw, 60px)",
                color: "#fff",
              }}
            >
              Saanvi Arora
            </h2>

            {/* ================= TAGLINE ================= */}
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(15px, 2.8vw, 30px)",
                fontWeight: 200,
                color: "#FFFFFF",
                lineHeight: "1.7",
                marginTop: "10px",
              }}
            >
              Code caught my attention. Frontend made me stay
            </p>

            {/* ================= DESCRIPTION ================= */}
            <div
              style={{
                marginTop: "clamp(20px, 3.5vw, 40px)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(12px, 1.9vw, 20px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  lineHeight: "1.5",
                  marginBottom: "16px",
                }}
              >
                B.Tech Computer Science student and a self-taught MERN Stack
                developer, has soft spot for front end
              </p>

              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(12px, 1.9vw, 20px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  lineHeight: "1.5",
                  marginBottom: "16px",
                }}
              >
                [creativity meets code]
              </p>

              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "clamp(12px, 1.9vw, 20px)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  lineHeight: "1.5",
                  marginBottom: 0,
                }}
              >
                When I'm not coding, I'm probably watching a movie, listening
                to music, revisiting Harry Potter, or trying out the latest AI
                tools just to see what they can do.
              </p>
            </div>
          </div>

          {/* ================= DESKTOP IMAGE ================= */}
          {!isNarrow && (
            <img
              src="/src/assets/image.png"
              alt="Saanvi Arora portrait"
              data-flip-target="image"
              className="
                desktop-photo
                absolute
                bottom-0
                right-[-14%]
                w-[460px]
                sm:w-[580px]
                md:w-[670px]
                lg:w-[770px]
                xl:w-[860px]
                object-contain
                object-bottom
                grayscale
                z-10
              "
            />
          )}

          {/* ================= MOBILE FUN FACT ================= */}
          <div className="sm:hidden absolute -top-4 right-4 flex flex-col items-center justify-center bg-[#3D0E0E] text-white text-center text-[10px] font-bold uppercase tracking-wide px-3 py-2 rounded-md shadow-md">
            <span>#</span>
            <span>FUN</span>
            <span>FACT</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          TABLET / MEDIUM WIDTH FIX
          688px → 1028px
          ========================================================= */}
      <style>{`
        @media (min-width: 688px) and (max-width: 1028px) {
          /* Hide portrait */
          .desktop-photo {
            display: none !important;
          }

          /* Shrink the card so there is no huge empty area */
          .content-card {
            width: 80% !important;
            margin-left: auto !important;
            margin-right: auto !important;

            min-height: 0 !important;
            height: auto !important;
          }

          /* Let the text use the entire card */
          .content-card > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Desktop3;