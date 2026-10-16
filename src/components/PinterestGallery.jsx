import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Movement presets per column index — alternating up/down, varying speed
const COLUMN_MOVEMENT = [-200, 300, -150, 250, -350]; // ← tune here

// Aspect ratios cycled across images for a Pinterest-style height mix
const ASPECT_PRESETS = [1.35, 0.7, 1, 1.6, 0.85, 1.2, 0.6, 1.45]; // ← tune here

function getColumnCount() {
  if (typeof window === "undefined") return 5;
  const w = window.innerWidth;
  if (w >= 1024) return 5; // desktop
  if (w >= 640) return 3; // tablet
  return 2; // mobile
}

// Evenly distribute images round-robin across N columns
function splitIntoColumns(images, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  images.forEach((src, i) => {
    columns[i % columnCount].push({
      src,
      aspect: ASPECT_PRESETS[i % ASPECT_PRESETS.length],
      key: `${i}-${src}`,
    });
  });
  return columns;
}

export default function PinterestGallery({ images = [], scrollerRef }) {
  const sectionRef = useRef(null);
  const columnRefs = useRef([]);
  const [columnCount, setColumnCount] = useState(getColumnCount());

  columnRefs.current = [];
  const addColumnRef = (el) => {
    if (el && !columnRefs.current.includes(el)) {
      columnRefs.current.push(el);
    }
  };

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = useMemo(
    () => splitIntoColumns(images, columnCount),
    [images, columnCount]
  );

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("all", () => {
      const ctx = gsap.context(() => {
        // Fade-in when section first appears
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: scrollerRef?.current || window,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Each column parallax-scrolls up/down at its own speed
        columnRefs.current.forEach((col, i) => {
          const distance = COLUMN_MOVEMENT[i % COLUMN_MOVEMENT.length];
          gsap.to(col, {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: scrollerRef?.current || window,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [columnCount, scrollerRef]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-transparent overflow-hidden flex items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex w-full gap-3 md:gap-4 px-3 md:px-4 box-border">
        {columns.map((col, colIndex) => (
          <div
            key={colIndex}
            ref={addColumnRef}
            className="flex flex-1 flex-col gap-3 md:gap-4 will-change-transform"
          >
            {col.map((img) => (
              <div
                key={img.key}
                className="group relative w-full overflow-hidden rounded-xl md:rounded-2xl cursor-pointer"
                style={{ aspectRatio: img.aspect }}
              >
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover block saturate-[0.3] opacity-30 scale-100 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:saturate-100 group-hover:scale-[1.06] will-change-[opacity,transform]"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
