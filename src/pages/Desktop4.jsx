import React, { useEffect, useRef, useState } from "react";

const bootText = `> Booting Developer Profile...

[✓] Checking coffee levels............ OK
[✓] Loading creativity............... OK
[✓] Importing React.................. DONE
[✓] Mounting Node.js................. DONE
[✓] Connecting to MongoDB............ DONE
[✓] Compiling problem-solving........ COMPLETE
[✓] Enabling GSAP animations......... ACTIVE
[✓] Starting portfolio............... READY

---------------------------------------------`;

const skillsText = `System Status: READY
Launching Portfolio...

C:\\Users\\Saanvi> skills
Loading skillset...

[Frontend]
├── HTML5
├── CSS3
├── JavaScript (ES6+)
├── React.js
├── Tailwind CSS
├── GSAP
└── Responsive Design

[Backend]
├── Node.js
├── Express.js
├── MongoDB
└── REST APIs

[Programming]
├── C
└── Data Structures & Algorithms

[Tools]
├── Git & GitHub
├── VS Code
├── Figma
├── Postman
└── Vite

[Currently Learning]
└── Next.js

Status: ████████████████████ 100%
C:\\Users\\Saanvi> _`;

const Desktop4 = ({ scrollerRef }) => {
  const [phase, setPhase] = useState("idle"); // idle -> booting -> prompt -> skills -> done
  const [bootDisplay, setBootDisplay] = useState("");
  const [skillsDisplay, setSkillsDisplay] = useState("");
  const phaseRef = useRef(phase);
  const sectionRef = useRef(null);
  const terminalRef = useRef(null); // NEW: scrollable content ref
  const hasBootedRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Trigger boot sequence once when section enters view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBootedRef.current) {
          hasBootedRef.current = true;
          setPhase("booting");
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Type boot text
  useEffect(() => {
    if (phase !== "booting") return;
    let i = 0;
    const interval = setInterval(() => {
      setBootDisplay(bootText.slice(0, i + 1));
      i++;
      if (i >= bootText.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("prompt"), 1200);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [phase]);

  // Type skills text, then unlock scroll when done
  useEffect(() => {
    if (phase !== "skills") return;
    let i = 0;
    const interval = setInterval(() => {
      setSkillsDisplay(skillsText.slice(0, i + 1));
      i++;
      if (i >= skillsText.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 600);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [phase]);

  // NEW: auto-scroll terminal content to bottom as skills text grows
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [skillsDisplay]);

  // Lock the actual scroll container during "prompt" and "skills"
  useEffect(() => {
    const scroller = scrollerRef?.current;
    if (!scroller) return;

    const shouldLock = phase === "prompt" || phase === "skills";
    scroller.style.overflow = shouldLock ? "hidden" : "";

    return () => {
      scroller.style.overflow = "";
    };
  }, [phase, scrollerRef]);

  // Listen for the "further scroll" gesture while locked in "prompt"/"skills"
  useEffect(() => {
    const isLocked = () =>
      phaseRef.current === "prompt" || phaseRef.current === "skills";

    const handleWheel = (e) => {
      if (!isLocked()) return;
      e.preventDefault();
      if (phaseRef.current === "prompt" && e.deltaY > 0) {
        setPhase("skills");
      }
    };

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isLocked()) return;
      e.preventDefault();
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (phaseRef.current === "prompt" && deltaY > 20) {
        setPhase("skills");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen bg-[rgb(174,50,50)] flex items-center justify-center overflow-hidden font-mono"
    >
      <div
        className="w-[800px] h-[550px] border border-white/60 rounded-[14px] flex flex-col overflow-hidden bg-[#a63939]"
        style={{ transform: "scale(0.85)" }}
      >
        {/* Header */}
        <div className="w-full h-[45px] border-b border-white/60 bg-black/20 backdrop-blur-md flex items-center justify-between px-5">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-white text-base">skillset.exe v2.6.0</div>
          <div className="w-14" />
        </div>

        {/* Terminal body — scrollable + auto-scrolling */}
        <div
          ref={terminalRef}
          className="flex-1 bg-black/10 p-10 text-white overflow-y-auto relative scrollbar-hide"
        >
          {phase === "booting" && (
            <pre className="whitespace-pre-wrap leading-9 text-[17px] font-medium">
              {bootDisplay}
              <span className="animate-pulse">▋</span>
            </pre>
          )}

          {phase === "prompt" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <p className="text-white/80 text-lg tracking-wide">Scroll to continue</p>
              <span className="text-2xl animate-bounce">↓</span>
            </div>
          )}

          {(phase === "skills" || phase === "done") && (
            <pre className="whitespace-pre-wrap leading-8 text-[15px] font-medium">
              {skillsDisplay}
              <span className="animate-pulse">▋</span>
            </pre>
          )}
        </div>
      </div>
    </section>
  );
};

export default Desktop4;