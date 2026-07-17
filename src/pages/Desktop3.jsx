import React, { useEffect, useState } from 'react'

const Desktop3 = () => {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-aspect-ratio: 1/1)');
    setIsNarrow(mql.matches);

    const handleChange = (e) => setIsNarrow(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[rgb(174,50,50)] overflow-hidden flex justify-center items-center">
      <div
        className="origin-top w-full"
        style={{
          transform: `scale(${isNarrow ? 1 : 0.82})`, // ---- OVERALL SCALE TUNING CONTROL ----
        }}
      >
        {/* Top heading row */}
        <div className={`flex items-start justify-between px-4 sm:px-0 ${isNarrow ? 'w-[80%] mx-auto' : ''}`}>
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

          {/* Fun fact badge */}
          <div className="hidden sm:flex flex-col items-center justify-center bg-[#3D0E0E] text-white text-center text-xs sm:text-sm font-bold uppercase tracking-wide px-4 py-3 rounded-md shadow-md shrink-0">
            <span className="text-[10px] sm:text-xs">#</span>
            <span>FUN</span>
            <span>FACT</span>
          </div>
        </div>

        {/* Content card */}
        <div
          className={`relative mt-8 sm:mt-12 rounded-[32px] p-6 sm:p-10 lg:p-14 grid gap-4 sm:gap-8 items-end bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl ${
            isNarrow ? 'grid-cols-1 w-[80%] mx-auto' : 'grid-cols-3 mx-4 sm:mx-0'
          }`}
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.12)" }}
        >
          {/* Text column */}
          <div
            className={isNarrow ? 'w-full text-left pl-4 sm:pl-6' : 'col-span-2'}
            style={{ color: '#fff' }}
          >
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
            <div style={{ marginTop: "clamp(20px, 3.5vw, 40px)" }}>
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
                B.Tech Computer Science student and a self-taught MERN Stack developer,
                has soft spot for front end
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
                When I'm not coding, I'm probably watching a movie, listening to music,
                revisiting Harry Potter, or trying out the latest AI tools just to see
                what they can do.
              </p>
            </div>
          </div>

          {/* Image column — only rendered when width > height */}
          {!isNarrow && (
            <div className="relative col-span-1 flex justify-end items-end h-full min-h-[140px] sm:min-h-[220px] lg:min-h-[480px] overflow-visible">
              <img
                src="/src/assets/image.png"
                alt="Saanvi Arora portrait"
                data-flip-target="image"
                className="w-full max-w-[180px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[520px] object-contain object-bottom grayscale scale-210 translate-x-6 translate-y-6 sm:translate-x-8 sm:translate-y-[-65px] lg:translate-x-12 lg:translate-y-[-210px]"
              />
            </div>
          )}

          {/* Mobile fun fact badge */}
          <div className="sm:hidden absolute -top-4 right-4 flex flex-col items-center justify-center bg-[#3D0E0E] text-white text-center text-[10px] font-bold uppercase tracking-wide px-3 py-2 rounded-md shadow-md">
            <span>#</span>
            <span>FUN</span>
            <span>FACT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Desktop3