import React, { useEffect, useState } from "react";
import portrait from "../assets/image.png";

/* ================= FUN FACTS ================= */
const FUN_FACTS = [
  "My Hogwarts letter is clearly just running late.",
  "Half my personality is Harry Potter references.",
  "Frontend development: where 2 pixels can ruin your entire day.",
  "My watchlist is longer than my free time.",
  "I click 'try it out' before I finish reading the instructions.",
  "I like figuring out what technology can do beyond what it's supposed to do.",
  "I love turning random ideas into things that actually exist.",
  "I can get weirdly invested in the smallest details.",
  "My brain has 17 tabs open, and at least 4 are playing music.",
  "I have a soft spot for things that look as good as they work.",
];

const HAND_FONT = { fontFamily: "'Splash', cursive" };
const BODY_FONT = { fontFamily: "'Lato', sans-serif" };

// Returns a random index that differs from `excludeIndex` (when possible).
const pickRandomIndex = (excludeIndex, length) => {
  if (length <= 1) return 0;
  if (excludeIndex < 0) return Math.floor(Math.random() * length);
  return (excludeIndex + 1 + Math.floor(Math.random() * (length - 1))) % length;
};

/* ================= TINY DECORATIVE PIECES ================= */
const Sparkle = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={className}
    fill="currentColor"
  >
    <path d="M12 0 c0.6 6.2 5.8 11.4 12 12 c-6.2 0.6 -11.4 5.8 -12 12 c-0.6 -6.2 -5.8 -11.4 -12 -12 c6.2 -0.6 11.4 -5.8 12 -12 z" />
  </svg>
);

const Squiggle = ({ className = "" }) => (
  <svg
    viewBox="0 0 84 8"
    aria-hidden="true"
    focusable="false"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M2 5 Q12 0 22 5 T42 5 T62 5 T82 5" />
  </svg>
);

/* ================= FUN FACT TRIGGER (stamp / label) ================= */
const FunFactTrigger = ({ isOpen, onClick, controls, compact = false }) => (
  <button
    type="button"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls={controls}
    className={`group relative flex flex-col items-center justify-center gap-1 select-none cursor-pointer rounded-[4px] border border-[#3D0E0E]/20 text-[#3D0E0E] transition-all duration-300 ease-out motion-reduce:transition-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(174,50,50)] ${
      compact ? "w-[60px] py-2 text-[11px]" : "w-[76px] py-3 text-sm"
    } ${
      isOpen
        ? "bg-[#EBC3BB] rotate-0 translate-y-0.5 shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
        : "bg-[#F7F0E2] rotate-[4deg] shadow-[0_6px_14px_rgba(0,0,0,0.28)] hover:rotate-0 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,0.3)]"
    }`}
  >
    {/* washi tape */}
    <span
      aria-hidden="true"
      className="absolute -top-2 left-1/2 h-3.5 w-7 -translate-x-1/2 -rotate-3 bg-[#E3A9A0]/80 shadow-sm"
    />

    {/* delicate stitched border */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-[3px] rounded-[2px] border border-dashed border-[#3D0E0E]/30"
    />

    <Sparkle
      className={`h-2.5 w-2.5 text-[#AE3232] transition-transform duration-500 motion-reduce:transition-none ${
        isOpen ? "rotate-90 scale-125" : "group-hover:rotate-45"
      }`}
    />

    <span
      className="font-black uppercase leading-none tracking-[0.2em] pl-[0.2em]"
      style={BODY_FONT}
    >
      FUN
    </span>

    <span aria-hidden="true" className="h-px w-5 bg-[#3D0E0E]/40" />

    <span
      className="font-black uppercase leading-none tracking-[0.2em] pl-[0.2em]"
      style={BODY_FONT}
    >
      FACT
    </span>
  </button>
);

/* ================= FUN FACT CARD (scrapbook note) ================= */
const FunFactCard = ({ id, isOpen, fact, number, total, className = "" }) => (
  <div
    id={id}
    role="region"
    aria-label="Fun fact"
    aria-hidden={!isOpen}
    className={`transition-all duration-500 ease-out motion-reduce:transition-none -rotate-1 ${
      isOpen
        ? "visible opacity-100 translate-x-0 translate-y-0"
        : "invisible opacity-0 translate-x-4 translate-y-2 pointer-events-none"
    } ${className}`}
  >
    <div
      className="relative rounded-[3px] border border-[#3D0E0E]/15 px-5 pb-4 pt-6 text-[#3D0E0E] shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 8%, #FFFBF1 0%, #F7EEDC 100%)",
      }}
    >
      {/* washi tape */}
      <span
        aria-hidden="true"
        className="absolute -top-2 left-5 h-4 w-12 -rotate-6 bg-[#E3A9A0]/75 shadow-sm"
      />

      {/* delicate inner border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[5px] rounded-[2px] border border-dashed border-[#AE3232]/25"
      />

      {/* sparkles */}
      <Sparkle className="absolute right-3 top-3 h-4 w-4 text-[#AE3232]/80" />
      <Sparkle
        className={`absolute right-8 top-6 h-2 w-2 text-[#E3A9A0] ${
          isOpen ? "animate-pulse" : ""
        }`}
      />

      {/* heading */}
      <p
        className="pr-8 text-[21px] leading-none text-[#AE3232]"
        style={HAND_FONT}
      >
        random saanvi lore
      </p>
      <Squiggle className="mt-1 h-2 w-20 text-[#E3A9A0]" />

      {/* the fact */}
      <p
        className="mt-3 text-[15px] font-medium normal-case leading-[1.65] tracking-normal"
        style={BODY_FONT}
      >
        {fact}
      </p>

      {/* footer annotation */}
      <div className="mt-4 flex items-end justify-between">
        <span
          className="text-[9px] uppercase tracking-[0.25em] text-[#3D0E0E]/55"
          style={BODY_FONT}
        >
          No. {String(number).padStart(2, "0")} / {total}
        </span>
        <span className="text-[18px] leading-none text-[#AE3232]" style={HAND_FONT}>
          xo, s.
        </span>
      </div>
    </div>
  </div>
);

const Desktop3 = () => {
  const [isNarrow, setIsNarrow] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [factIndex, setFactIndex] = useState(-1);

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

  // Escape closes the fun fact card
  useEffect(() => {
    if (!showFact) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowFact(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFact]);

  // Opening picks a new random fact (never the same one twice in a row).
  // Closing leaves the fact untouched so it doesn't change mid-fade.
  const toggleFact = () => {
    if (!showFact) {
      setFactIndex(pickRandomIndex(factIndex, FUN_FACTS.length));
    }
    setShowFact((prev) => !prev);
  };

  const currentFact = FUN_FACTS[factIndex] ?? "";

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

          {/* ================= DESKTOP FUN FACT ================= */}
          <div className="hidden sm:block relative z-30 shrink-0">
            {/* Card is absolutely positioned so opening it never shifts layout */}
            <FunFactCard
              id="fun-fact-card-desktop"
              isOpen={showFact}
              fact={currentFact}
              number={factIndex + 1}
              total={FUN_FACTS.length}
              className="absolute right-full top-0 mr-4 w-[240px] origin-top-right"
            />

            <FunFactTrigger
              isOpen={showFact}
              onClick={toggleFact}
              controls="fun-fact-card-desktop"
            />
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
              src={portrait}
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
          <div className="sm:hidden absolute -top-4 right-4 z-30">
            <FunFactTrigger
              compact
              isOpen={showFact}
              onClick={toggleFact}
              controls="fun-fact-card-mobile"
            />
          </div>

          <FunFactCard
            id="fun-fact-card-mobile"
            isOpen={showFact}
            fact={currentFact}
            number={factIndex + 1}
            total={FUN_FACTS.length}
            className="sm:hidden absolute top-12 right-4 z-20 w-[220px] max-w-[calc(100%-2rem)] origin-top-right"
          />
        </div>
      </div>

      {/* ================= TABLET / MEDIUM WIDTH FIX ================= */}
      <style>{`
        @media (min-width: 688px) and (max-width: 1028px) {
          .desktop-photo {
            display: none !important;
          }

          .content-card {
            width: 80% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            min-height: 0 !important;
            height: auto !important;
          }

          .content-card > div:first-child {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Desktop3;