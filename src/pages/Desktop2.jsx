import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CANVAS_W = 1440;
const CANVAS_H = 900;

const Desktop2 = ({ scrollerRef }) => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  const [isNarrow, setIsNarrow] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const mql = window.matchMedia('(max-aspect-ratio: 1/1)');
    setIsNarrow(mql.matches);

    const handleChange = (e) => setIsNarrow(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Scale the fixed 1440x900 canvas to fit any width>height viewport
  useEffect(() => {
    if (isNarrow) return;

    const updateScale = () => {
      const s = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
      setScale(s * 0.9); // ---- SCALE DOWN TUNING CONTROL ----
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isNarrow]);

  useEffect(() => {
    if (isNarrow) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scrollerRef?.current || undefined,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // ---- PARALLAX TUNING CONTROLS ----
      tl.to(headingRef.current, { y: -300, ease: "none" }, 0)
        .to(imageRef.current, { y: -420, ease: "none" }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, [isNarrow, scrollerRef]);

  // ---------------- NARROW / COMPACT LAYOUT ----------------
  if (isNarrow) {
    return (
      <section
        ref={containerRef}
        className="relative w-[100vw] min-h-screen bg-[rgb(174,50,50)] overflow-x-hidden flex flex-col"
      >
        {/* Small cute name tag, top-left */}
        <div
          className="absolute top-6 left-6 z-30"
          data-flip="name"
          style={{ transform: "rotate(-14deg)" }}
        >
          <p
            className="text-black leading-none"
            style={{
              fontFamily: "'Splash', cursive",
              fontSize: "clamp(28px, 9vw, 48px)",
              lineHeight: "0.85",
            }}
          >
            Saanvi
          </p>
          <p
            className="-mt-2 ml-6 text-black leading-none"
            style={{
              fontFamily: "'Splash', cursive",
              fontSize: "clamp(28px, 9vw, 48px)",
              lineHeight: "0.85",
            }}
          >
            Arora
          </p>
        </div>

        {/* ABOUT as a mid-sized heading */}
        <h1
          data-flip="about-heading"
          className="text-[#f7f1e9] uppercase select-none text-center mt-16 px-4"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(56px, 22vw, 140px)",
            lineHeight: "0.9",
            letterSpacing: "0",
          }}
        >
          ABOUT
        </h1>

        {/* Photo fills the remaining space, pulled up tight under the heading */}
        <img
          src="/src/assets/image.png"
          alt="Saanvi Arora portrait"
          data-flip="image"
          className="flex-1 w-full mt-[-296px] object-cover object-top grayscale z-20"
        />
      </section>
    );
  }

  // ---------------- WIDE LAYOUT (fixed-canvas + scale, responsive) ----------------
  return (
    <section
      ref={containerRef}
      className="relative w-[100vw] min-h-[150vh] bg-[rgb(174,50,50)] overflow-x-hidden"
    >
      {/* Sticky viewport that holds the scaled canvas while the scrub timeline runs */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="relative flex-shrink-0"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* Name tag — sits above everything so it overlaps the ABOUT text */}
          <div
            className="absolute top-[130px] left-[90px] z-30"
            data-flip="name"
            style={{ transform: "rotate(-20deg)" }}
          >
            <p
              className="text-black leading-none"
              style={{
                fontFamily: "'Splash', cursive",
                fontSize: "140px",
                lineHeight: "0.82",
              }}
            >
              Saanvi
            </p>
            <p
              className="-mt-8 ml-24 text-black leading-none"
              style={{
                fontFamily: "'Splash', cursive",
                fontSize: "140px",
                lineHeight: "0.82",
              }}
            >
              Arora
            </p>
          </div>

          {/* ABOUT heading — enlarged and shifted up so the name tag overlaps its top edge */}
          <div className="absolute inset-0 flex items-center justify-center overflow-visible">
            <h1
              ref={headingRef}
              className="absolute text-[#f7f1e9] uppercase select-none"
              data-flip="about-heading"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontWeight: 400,
                // ---- SIZE / OVERLAP TUNING CONTROLS ----
                fontSize: "620px",
                lineHeight: "400px",
                letterSpacing: "0",
                transform: "translateY(-60px)",
              }}
            >
              ABOUT
            </h1>
          </div>

         
        </div>
      </div>
    </section>
  );
}

export default Desktop2;