import React from "react";

import photo1 from "../assets/photos/photo1.jpg";
import photo2 from "../assets/photos/photo2.jpg";
import photo3 from "../assets/photos/photo3.jpg";
import photo4 from "../assets/photos/photo4.jpg";
import photo5 from "../assets/photos/photo5.jpg";
import photo6 from "../assets/photos/photo6.jpg";
import photo7 from "../assets/photos/photo7.jpg";
import photo8 from "../assets/photos/photo8.jpg";
import photo9 from "../assets/photos/photo9.jpg";
import photo10 from "../assets/photos/photo10.jpg";
import photo11 from "../assets/photos/photo11.jpg";
import photo12 from "../assets/photos/photo12.jpg";
import photo13 from "../assets/photos/photo13.jpg";
import photo14 from "../assets/photos/photo14.jpg";
import photo15 from "../assets/photos/photo15.jpg";
import photo16 from "../assets/photos/photo16.jpg";
import photo17 from "../assets/photos/photo17.jpg";
import photo18 from "../assets/photos/photo18.jpg";
import photo19 from "../assets/photos/photo19.jpg";
import photo20 from "../assets/photos/photo20.jpg";

const BASE_PHOTOS = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
  photo16,
  photo17,
  photo18,
  photo19,
  photo20,
];

const EXPANDED_PHOTOS = [
  ...BASE_PHOTOS,
  ...BASE_PHOTOS,
  ...BASE_PHOTOS,
  ...BASE_PHOTOS,
];

const HEIGHT_CYCLE = [
  340,
  240,
  420,
  280,
  380,
  260,
  400,
  300,
  440,
  250,
  330,
  290,
];

const buildColumns = () => {
  const cols = [[], [], [], [], [], []];

  EXPANDED_PHOTOS.forEach((src, idx) => {
    const colIndex = idx % 6;

    cols[colIndex].push({
      id: idx,
      src,
      height: HEIGHT_CYCLE[idx % HEIGHT_CYCLE.length],
    });
  });

  return cols;
};

const Desktop6 = () => {
  const columns = buildColumns();

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center font-sans bg-[#AE3232]">
      {/* Continuous moving Pinterest masonry wall */}
      <div className="absolute inset-0 z-0 flex gap-3.5 p-3.5 overflow-hidden">
        {columns.map((colItems, colIdx) => {
          const doubledItems = [...colItems, ...colItems];
          const isEven = colIdx % 2 === 0;

          return (
            <div
              key={colIdx}
              className="flex-1 flex flex-col gap-3.5 min-w-35 sm:min-w-45"
            >
              <div
                className={`flex flex-col gap-3.5 ${
                  isEven
                    ? "animate-scroll-down"
                    : "animate-scroll-up"
                }`}
              >
                {doubledItems.map((item, idx) => (
                  <div
                    key={`${colIdx}-${idx}`}
                    className="photo-card relative w-full rounded-[18px] overflow-hidden border border-white/20 opacity-90 saturate-[0.75] transition-all duration-300 ease-out cursor-pointer group shrink-0"
                    style={{ height: `${item.height}px` }}
                  >
                    <img
                      src={item.src}
                      alt={`Camera Roll ${item.id}`}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";

                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.style.background =
                            "rgba(0,0,0,0.2)";
                        }
                      }}
                    />

                    <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 z-1 bg-[#AE3232]/50 pointer-events-none" />

      {/* Foreground text */}
      <div className="relative z-3 text-center text-white px-5 flex flex-col items-center justify-center gap-6 w-full max-w-6xl pointer-events-none">
        <span className="font-mono text-[clamp(0.7rem,1vw,0.85rem)] tracking-[0.4em] uppercase text-white/80">
          Camera Roll
        </span>

        <h1
          style={{
            textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
          className="font-['Anton','Druk',impact,sans-serif] text-[clamp(2.8rem,4.5vw,4.8rem)] font-black uppercase leading-[1.1] m-0 tracking-wider"
        >
          THERE IS LIFE OUTSIDE VS CODE
        </h1>

        <h2
          style={{
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
          }}
          className="font-['Anton','Druk',impact,sans-serif] text-[clamp(1.1rem,2.6vw,2.6rem)] font-normal uppercase leading-[1.2] m-0 tracking-wider text-white/95"
        >
          I PICKED UP A CAMERA BEFORE I PICKED UP REACT
        </h2>

        <h3
          style={{
            textShadow: "0 4px 14px rgba(0,0,0,0.6)",
          }}
          className="font-['Lato',sans-serif] text-[clamp(0.9rem,1.6vw,1.4rem)] font-normal uppercase leading-[1.3] m-0 tracking-[0.18em] text-white/80"
        >
          It all started with an HTML file
        </h3>

        <div
          style={{
            textShadow: "0 2px 8px rgba(0,0,0,0.75)",
          }}
          className="mt-2 font-mono text-[clamp(0.7rem,1.1vw,0.85rem)] tracking-[0.3em] text-white/60 uppercase flex flex-col items-center gap-1.5"
        >
          <span>[ 2805 Photos Taken ]</span>
        </div>
      </div>

      {/* Styles and animations */}
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }

          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }

          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-up {
          animation: scrollUp 45s linear infinite;
        }

        .animate-scroll-down {
          animation: scrollDown 45s linear infinite;
        }

        .photo-card:hover {
          opacity: 1 !important;
          filter: saturate(1) !important;
          transform: scale(1.05);
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.5),
            0 0 0 2px rgba(255, 255, 255, 0.6);
          z-index: 20;
        }
      `}</style>
    </div>
  );
};

export default Desktop6;