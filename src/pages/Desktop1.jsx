import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Desktop1 = () => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  // Desktop refs
  const frontendRef = useRef(null);
  const backendRef  = useRef(null);
  const lineRef     = useRef(null);
  const portRef     = useRef(null);
  const folioRef    = useRef(null);
  const photoRef    = useRef(null);
  const nameRef     = useRef(null);
  const taglineRef  = useRef(null);

  // Mobile refs
  const mFrontendRef = useRef(null);
  const mBackendRef  = useRef(null);
  const mLineRef     = useRef(null);
  const mPortRef     = useRef(null);
  const mFolioRef    = useRef(null);
  const mPhotoRef    = useRef(null);
  const mNameRef     = useRef(null);
  const mTaglineRef  = useRef(null);

  // Scale desktop canvas
  useEffect(() => {
    const scaleInner = () => {
      const el = innerRef.current;
      if (!el) return;
      if (window.innerWidth >= 689) {
        const scaleX = window.innerWidth / 760;
        const scaleY = window.innerHeight / 480;
        const scale = Math.min(scaleX, scaleY) * 0.75;
        el.style.transform = `scale(${scale})`;
      } else {
        el.style.transform = "none";
      }
    };
    scaleInner();
    window.addEventListener("resize", scaleInner);
    return () => window.removeEventListener("resize", scaleInner);
  }, []);

  // GSAP animations — picks active ref set based on viewport
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 689;

      const fe = isMobile ? mFrontendRef.current : frontendRef.current;
      const be = isMobile ? mBackendRef.current  : backendRef.current;
      const ln = isMobile ? mLineRef.current     : lineRef.current;
      const po = isMobile ? mPortRef.current     : portRef.current;
      const fo = isMobile ? mFolioRef.current    : folioRef.current;
      const ph = isMobile ? mPhotoRef.current    : photoRef.current;
      const nm = isMobile ? mNameRef.current     : nameRef.current;
      const tg = isMobile ? mTaglineRef.current  : taglineRef.current;

      const inTl = gsap.timeline({ delay: 0.1 });

      inTl
        .from(fe, { x: isMobile ? -40 : -80, opacity: 0, duration: 1.4, ease: "power3.out" }, 0)
        .from(be, { x: isMobile ? 40  :  80, opacity: 0, duration: 1.4, ease: "power3.out" }, 0)
        .from(ln, { scaleX: 0, transformOrigin: "left center", duration: 1.6, ease: "power3.out" }, 0.3)
        .from(po, { x: -120, opacity: 0, duration: 1.5, ease: "power3.out" }, 0.2)
        .from(fo, { x: -120, opacity: 0, duration: 1.5, ease: "power3.out" }, 0.4)
        .from(ph, { y: -60,  opacity: 0, duration: 1.5, ease: "power3.out" }, 0.5)
        .from(nm, { y: 20,   opacity: 0, duration: 1.2, ease: "power3.out" }, 0.7)
        .from(tg, { y: 20,   opacity: 0, duration: 1.2, ease: "power3.out" }, 0.85);

      inTl.call(() => {
        const outTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1.2,
            pin: true,
          },
        });

        outTl
          .to(po, { x: -300, opacity: 0, ease: "power2.in" }, 0)
          .to(fo, { x: -300, opacity: 0, ease: "power2.in" }, 0.1)
          .to(fe, { y: -40,  opacity: 0, ease: "power2.in" }, 0)
          .to(be, { y: -40,  opacity: 0, ease: "power2.in" }, 0.05)
          .to(ln, { scaleX: 0, transformOrigin: "right center", opacity: 0, ease: "power2.in" }, 0)
          .to(ph, { scale: 0.8, opacity: 0, ease: "power2.in" }, 0.1)
          .to(nm, { y: 30,   opacity: 0, ease: "power2.in" }, 0.15)
          .to(tg, { y: 30,   opacity: 0, ease: "power2.in" }, 0.2);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 688px) {
          .hero-inner-mobile  { display: flex !important; }
          .hero-inner-desktop { display: none !important; }
        }
        @media (min-width: 689px) {
          .hero-inner-mobile  { display: none !important; }
          .hero-inner-desktop { display: block !important; }
        }

        .hero-mobile-wrap {
          width: 92vw;
          background: #ae3232;
          font-family: 'Anton', sans-serif;
          display: flex;
          flex-direction: column;
          padding: 6vw 5vw;
          box-sizing: border-box;
        }

        .m-topbar {
          display: flex;
          align-items: center;
          gap: 2vw;
          margin-bottom: 4vw;
        }
        .m-frontend { color: #f7f1e9; font-size: 5vw; white-space: nowrap; }
        .m-line     { flex: 1; height: 3vw; background: #f7f1e9; }
        .m-backend  { color: #f7f1e9; font-size: 3.8vw; white-space: nowrap; }

        .m-middle {
          display: flex;
          align-items: stretch;
          gap: 3vw;
        }
        .m-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-shrink: 0;
        }
        .m-port, .m-folio {
          color: #f7f1e9;
          font-size: 22vw;
          line-height: 0.88;
        }
        .m-photo-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }
        .m-photo-frame {
          background: #f7f1e9;
          padding: 2.5vw;
          width: 100%;
        }
        .m-photo-frame img {
          width: 100%;
          height: 52vw;
          object-fit: cover;
          display: block;
        }
        .m-name-row {
          display: flex;
          align-items: center;
          gap: 2vw;
          margin-top: 4vw;
        }
        .m-name-text { color: #f7f1e9; font-size: 4vw; white-space: nowrap; }
        .m-name-line { flex: 1; height: 2.5vw; background: #f7f1e9; }
        .m-tagline {
          color: #f7f1e9;
          font-size: 3.8vw;
          margin-top: 1.5vw;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ fontFamily: "'Anton', sans-serif" }}
        className="w-screen h-screen bg-[#ae3232] flex items-center justify-center overflow-hidden"
      >

        {/* DESKTOP ≥ 689px */}
        <div
          ref={innerRef}
          className="hero-inner-desktop relative bg-[#ae3232]"
          style={{ width: "760px", height: "480px", transformOrigin: "center center" }}
        >
          <div className="flex items-center gap-2 tracking-widest absolute"
            style={{ top: "0px", left: "0px", right: "0px" }}>
            <span ref={frontendRef} className="text-[#f7f1e9] text-[32px]">FRONTEND</span>
            <div ref={lineRef} className="flex-1 h-[20px] bg-[#f7f1e9]" />
            <span ref={backendRef} className="text-[#f7f1e9] text-[22px]">BACKEND</span>
          </div>

          <div ref={portRef} className="text-[#f7f1e9] absolute leading-none"
            style={{ fontSize: "210px", top: "38px", left: "0px" }}>PORT</div>

          <div ref={folioRef} className="text-[#f7f1e9] absolute leading-none"
            style={{ fontSize: "210px", top: "240px", left: "0px" }}>FOLIO</div>

          <div ref={photoRef} className="bg-[#f7f1e9] absolute"
            style={{ top: "55px", left: "437px", right: "2px", padding: "18px" }}>
            <img src="/Rectangle-6@2x.png" alt="Saanvi Arora"
              style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
          </div>

          <div ref={nameRef} className="flex items-center gap-3 tracking-widest absolute"
            style={{ top: "359px", left: "440px", right: "2px" }}>
            <span className="text-[#f7f1e9] text-3xl">SAANVI ARORA</span>
            <div style={{ flex: 1, height: "25px", background: "#f7f1e9" }} />
          </div>

          <div ref={taglineRef} className="tracking-widest absolute text-[#f7f1e9] text-3xl"
            style={{ top: "399px", left: "437px" }}>
            BTECH'29 | WEB INTERN
          </div>
        </div>

        {/* MOBILE < 689px */}
        <div className="hero-inner-mobile hero-mobile-wrap">
          <div className="m-topbar">
            <span ref={mFrontendRef} className="m-frontend">FRONTEND</span>
            <div ref={mLineRef} className="m-line" />
            <span ref={mBackendRef} className="m-backend">BACKEND</span>
          </div>

          <div className="m-middle">
            <div className="m-text-col">
              <div ref={mPortRef} className="m-port">PORT</div>
              <div ref={mFolioRef} className="m-folio">FOLIO</div>
            </div>
            <div className="m-photo-col">
              <div ref={mPhotoRef} className="m-photo-frame">
                <img src="/Rectangle-6@2x.png" alt="Saanvi Arora" />
              </div>
            </div>
          </div>

          <div ref={mNameRef} className="m-name-row">
            <span className="m-name-text">SAANVI ARORA</span>
            <div className="m-name-line" />
          </div>
          <div ref={mTaglineRef} className="m-tagline">BTECH'29 | WEB INTERN</div>
        </div>

      </div>
    </>
  );
};

export default Desktop1;