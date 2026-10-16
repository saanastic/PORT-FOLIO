import React, { useEffect, useState, useRef } from "react";
import {
  ChevronRight,
  ArrowDownRight,
  Monitor,
  X,
  Code2,
  ExternalLink,
  ChevronLeft,
  Minus,
  Square,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react";

const PROJECTS = [
  {
    id: "bagsphere",
    name: "BagSphere",
    details: {
      tagline: "A Full-Stack E-Commerce Ecosystem for Premium Bags & Accessories",
      description:
        "BagSphere is an online shopping website for bags and accessories. I built it to bring the main parts of an online store together, from browsing products to managing a cart and handling user accounts.",
      screenshots: [
        "/projects/bagsphere1.png",
        "/projects/bagsphere2.png",
        "/projects/bagsphere3.png",
        "/projects/bagsphere4.png",
        "/projects/bagsphere5.png",
        "/projects/bagsphere6.png",
        "/projects/bagsphere7.png",
      ],
      features: [
        "Dynamic product filtering, sorting, and keyword search",
        "Secure JWT-based user authentication & role management",
        "Persistent shopping cart and wishlist synchronization",
        "RESTful backend API with MongoDB schema validation",
      ],
      contribution:
        "Worked on the store's main features and connected the website to the backend so product and user data could be handled through the database.",
      tech: ["EJS", "JavaScript", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/saanastic/Bag-sphere",
      live: "",
    },
  },
   {
  id: "dinemate",
  name: "DineMate",
  details: {
    tagline: "AI-Powered Restaurant Operating System",
    description:
      "Managing a restaurant involves a lot of things happening at once. DineMate brings those tasks together in one platform, from handling orders and kitchen activity to managing tables and bills. It also uses AI to assist with routine operations while keeping people involved in important decisions.",
    screenshots: [
      "/projects/dinemate1.png",
      "/projects/dinemate2.png",
      "/projects/dinemate3.png",
      "/projects/dinemate4.png",
    ],
    features: [
      "Centralized dashboard with restaurant KPIs and operational insights",
      "Integrated menu, order management, kitchen queue, and billing workflows",
      "AI-powered assistant for restaurant operations and decision support",
      "Inventory, reservations, customers, staff, and notification management",
      "Human approval checkpoints and auditable operational workflows",
    ],
    contribution:
      "Built and connected different parts of the restaurant management system, including the dashboard, operational workflows, and API integrations.",
    tech: ["React", "Vite", "FastAPI", "Python", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/saanastic/DineMate",
    live: "https://dine-mate-seven.vercel.app/  ",
  },  
},
  {
    id: "currency-exchanger",
    name: "Currency-Exchanger",
    details: {
      tagline: "A Simple Tool for Converting Currencies",
      description:
        "Currency Exchanger is a small web project that lets users convert one currency into another. I built it using HTML, CSS, and JavaScript, with exchange-rate data fetched through an API so users can check conversions without looking up rates manually.",
      screenshots: [
        "/projects/currency1.png",
        "/projects/currency2.png",
      ],
      features: [
       "Convert amounts between different currencies",
"Fetch exchange-rate data using an API",
"Swap the selected currencies with a single click",
"Simple interface built with HTML, CSS, and JavaScript",
      ],
      contribution:
        "Built the interface and JavaScript logic, connected the app to an exchange-rate API, and handled currency selection and conversion.",
     tech: ["HTML", "CSS", "JavaScript", "REST API"],
      github: "https://github.com/saanastic/Currency-Exchanger",
      live: "https://saanastic.github.io/Currency-Exchanger/",
    },
  },
  {
    id: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    details: {
      tagline: "An Interactive Strategy Game with Intelligent Win-Detectio",
      description:
        "A browser-based version of Tic-Tac-Toe where two players take turns marking the board with X and O. I built it using JavaScript to handle player turns, check for a winner, and keep track of the game as it progresses.",
      screenshots: [
        "/projects/tic1.png",
        "/projects/tic2.png",
        "/projects/tic3.png",
      ],
      features: [
        "Interactive game board for two players",
"Checks rows, columns, and diagonals for a win",
"Detects draws when all cells are filled",
"Option to restart and play again",
      ],
      contribution:
"Built the game board and added the JavaScript logic for player turns, win detection, and restarting the game.",
tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/saanastic/tic-tac-toe",
      live: "https://saanastic.github.io/tic-tac-toe/",
    },
  },
  {
  id: "rock-paper-scissors",
  name: "Rock Paper Scissors",
  details: {
    tagline: "A Classic Game Built for the Browser",
    description:
      "A browser-based version of Rock Paper Scissors where players compete against the computer. I used JavaScript to handle player choices, generate the computer's move, and decide who wins each round.",
    screenshots: [
      "/projects/r1.png",
      "/projects/r2.png",
    ],
    features: [
      "Play against the computer",
      "Random computer choices for each round",
      "Automatic winner detection based on game rules",
      "Simple interface with clear results for each round",
    ],
    contribution:
      "Built the game interface and wrote the JavaScript logic for computer moves, comparing choices, and displaying the result.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/saanastic/stonepaperscissor",
    live: "https://saanastic.github.io/stonepaperscissor/",
  },
},
  
  {
    id: "posts-app",
    name: "Posts-app",
    details: {
      tagline: "Full-Featured CRUD Dashboard for Content Management",
      description:
        "An intuitive CRUD dashboard allowing users to create, read, update, and delete posts dynamically with instant UI updates and backend persistence.",
      screenshots: [
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      ],
      features: [
        "Complete Create, Read, Update, and Delete (CRUD) workflows",
        "Optimistic UI updates for instantaneous feedback",
        "Pagination and search filtering for large dataset lists",
        "REST API integration with Express and MongoDB backend",
      ],
      contribution:
        "Engineered the API integration layer with asynchronous error handling and loading skeletons to ensure high perceived performance.",
      tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
      github: "https://github.com/your-username/posts-app",
      live: "",
    },
  },
 
];

export default function Desktop5() {
  const [isNarrow, setIsNarrow] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const modalCloseBtnRef = useRef(null);

  // Handle responsive check
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 564px)");
    setIsNarrow(mql.matches);
    const handleChange = (e) => setIsNarrow(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Prevent background scrolling and handle focus trap when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
      setTimeout(() => {
        modalCloseBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "unset";
      setLightboxOpen(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProject]);

  // Global key navigation (Escape, Left, Right)
  useEffect(() => {
    if (!activeProject) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          setActiveProject(null);
        }
      } else if (!lightboxOpen && activeProject.details?.screenshots?.length > 1) {
        if (e.key === "ArrowLeft") {
          setCurrentImageIndex((prev) =>
            prev === 0 ? activeProject.details.screenshots.length - 1 : prev - 1
          );
        } else if (e.key === "ArrowRight") {
          setCurrentImageIndex((prev) =>
            prev === activeProject.details.screenshots.length - 1 ? 0 : prev + 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeProject, lightboxOpen]);

  const openProject = (id) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (project) {
      setActiveProject(project);
    }
  };

  const handleFolderDoubleClick = (id) => openProject(id);
  const handleFolderTap = (id) => {
    if (isNarrow) openProject(id);
  };

  const screenshots = activeProject?.details?.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  const nextImage = (e) => {
    e?.stopPropagation();
    if (!hasScreenshots) return;
    setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (!hasScreenshots) return;
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const projectIndex = activeProject
    ? PROJECTS.findIndex((p) => p.id === activeProject.id) + 1
    : 1;

  return (
    <>
      {isNarrow ? (
        /* ================= MOBILE ================= */
        <div className="min-h-screen bg-[rgb(174,50,50)] flex flex-col items-center justify-center p-4 text-white font-sans">
          <h1 className="text-base font-semibold mb-4 self-start w-full tracking-wide leading-snug">
            Tap a folder. Every project has a story inside.
          </h1>
          <div className="w-full border border-white/30 rounded-lg overflow-hidden bg-[#b23b3b] shadow-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/20 text-[11px] tracking-wide select-none overflow-x-auto whitespace-nowrap">
              <Monitor size={13} className="text-gray-300 shrink-0" />
              <span className="opacity-90">My Computer</span>
              <ChevronRight size={11} className="opacity-60 shrink-0" />
              <span className="opacity-90">Portfolio</span>
              <ChevronRight size={11} className="opacity-60 shrink-0" />
              <span className="font-semibold">Projects</span>
            </div>
            {/* Folders */}
            <div className="p-4 grid grid-cols-2 gap-4 content-start select-none">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleFolderTap(project.id)}
                  className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="relative w-12 h-9 mb-1.5 bg-[#f4be4f] rounded-r-md rounded-bl-md shadow-md">
                    <div className="absolute -top-1 left-0 w-5 h-1.5 bg-[#f4be4f] rounded-t-sm" />
                    <div className="absolute inset-x-0 bottom-0 top-1 bg-[#f8cb66] rounded-md border-t border-white/20" />
                  </div>
                  <span className="text-[11px] font-medium leading-tight px-1">
                    {project.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================= DESKTOP ================= */
        <div className="min-h-screen bg-[rgb(174,50,50)] flex flex-col items-center justify-center p-6 text-white font-sans">
          <h1 className="text-2xl font-semibold mb-6 self-start max-w-4xl mx-auto w-full tracking-wide">
            Double-click a folder. Every project has a story inside.
          </h1>
          <div className="w-full max-w-4xl border border-white/30 rounded-lg overflow-hidden bg-[#b23b3b] shadow-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/20 text-sm tracking-wide select-none">
              <Monitor size={16} className="text-gray-300" />
              <span className="opacity-90">My Computer</span>
              <ChevronRight size={14} className="opacity-60" />
              <span className="opacity-90">Portfolio</span>
              <ChevronRight size={14} className="opacity-60" />
              <span className="font-semibold">Projects</span>
            </div>
            <div className="flex min-h-[420px]">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/20 p-4 space-y-2 text-sm tracking-wide select-none">
                <div className="flex items-center gap-1 opacity-90">
                  <span className="text-xs">↓</span> My Computer
                </div>
                <div className="flex items-center gap-1 pl-4 opacity-90">
                  <span className="text-xs">↓</span> Portfolio
                </div>
                <div className="flex items-center gap-1 pl-8 font-semibold">
                  <span className="text-xs">↓</span> Projects
                </div>
                <div className="pl-12 space-y-2 pt-1">
                  {PROJECTS.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => openProject(project.id)}
                      className="flex items-center gap-1 text-white/80 hover:text-white hover:underline text-left w-full transition"
                    >
                      <ArrowDownRight size={12} className="opacity-70" />
                      {project.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Folder Area */}
              <div className="w-2/3 p-6 grid grid-cols-4 gap-6 content-start select-none">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onDoubleClick={() => handleFolderDoubleClick(project.id)}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    <div className="relative w-16 h-12 mb-2 bg-[#f4be4f] rounded-r-md rounded-bl-md shadow-md group-hover:scale-105 transition-transform">
                      <div className="absolute -top-1.5 left-0 w-7 h-2 bg-[#f4be4f] rounded-t-sm" />
                      <div className="absolute inset-x-0 bottom-0 top-1 bg-[#f8cb66] rounded-md border-t border-white/20" />
                    </div>
                    <span className="text-xs font-medium leading-tight px-1 group-hover:underline">
                      {project.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= REDESIGNED PROJECT DETAILS MODAL ================= */}
      {/* ================= REDESIGNED PROJECT DETAILS MODAL ================= */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in font-sans"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col rounded-xl border border-white/30 bg-[#b23b3b] shadow-2xl text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Retro Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/10 border-b border-white/20 select-none shrink-0">
              <div className="flex items-center gap-2">
               <span className="text-xs px-2 py-0.5 rounded bg-white/15 text-gray-300 font-mono font-bold uppercase tracking-[0.2em]">
  PROJECT #{String(projectIndex).padStart(2, "0")}
</span>
               <h3
  id="modal-title"
  className="text-sm sm:text-base tracking-widest truncate font-['Anton','Impact',sans-serif] font-normal "
>
  {activeProject.name} — Showcase Window
</h3>
              </div>
              <div className="flex items-center gap-2">
                {/* Decorative Window Controls */}
                <div className="hidden sm:flex items-center gap-1.5 opacity-60 mr-2">
                  <div className="w-3 h-3 rounded-full bg-white/30 flex items-center justify-center text-[9px]"><Minus size={8} /></div>
                  <div className="w-3 h-3 rounded-full bg-white/30 flex items-center justify-center text-[9px]"><Square size={8} /></div>
                </div>
                <button
                  ref={modalCloseBtnRef}
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 rounded-md bg-white/10 hover:bg-white/25 transition text-white focus:outline-none focus:ring-2 focus:ring-[#f4be4f]"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Case Study Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
              
              {/* VISUAL SHOWCASE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                 
                  {hasScreenshots && (
                    <span className="text-xs bg-black/30 px-2.5 py-1 rounded-full font-mono tracking-widest text-white/90">
                      {String(currentImageIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div className="relative w-full h-64 sm:h-96 bg-black/40 rounded-xl overflow-hidden border border-white/20 group">
                  {hasScreenshots ? (
                    <>
                      <img
                        src={screenshots[currentImageIndex]}
                        alt={`${activeProject.name} screenshot ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                        onClick={() => setLightboxOpen(true)}
                      />
                      {/* Navigation Arrows */}
                      {screenshots.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/30 transition shadow-lg"
                            aria-label="Previous screenshot"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/30 transition shadow-lg"
                            aria-label="Next screenshot"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-md text-xs text-white/90 border border-white/20 pointer-events-none font-mono">
                        Click image to expand
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-white/70">
                      <Monitor className="opacity-40 mb-2" size={48} />
                      <p className="text-sm font-medium">Screenshots will be added soon.</p>
                      <p className="text-xs opacity-60 mt-1">Check back later for visual previews of this application.</p>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {hasScreenshots && screenshots.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {screenshots.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                          idx === currentImageIndex ? "border-[#f4be4f] scale-105" : "border-white/20 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PROJECT INTRODUCTION & TAGLINE */}
              <div className="space-y-3 bg-black/20 p-5 rounded-xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-3xl sm:text-4xl font-normal tracking-wider text-white uppercase font-['Anton','Impact',sans-serif]">
                    {activeProject.name}
                  </h2>
                  <span className="text-[#E8C8B0] font-light text-sm tracking-wide italic">
                    {activeProject.details.tagline}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-light leading-relaxed text-white/90">
                  {activeProject.details.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* KEY FEATURES */}
                {activeProject.details.features && activeProject.details.features.length > 0 && (
                  <div className="space-y-3 bg-black/15 p-5 rounded-xl border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9B7B7] font-mono font-bold flex items-center gap-1.5">
                      <Layers size={14} /> Key Features
                    </h4>
                    <ul className="space-y-2 text-sm font-light text-white/90">
                      {activeProject.details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#D9B7B7] mt-1">▪</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MY CONTRIBUTION AND LEARNING */}
                {activeProject.details.contribution && (
                  <div className="space-y-3 bg-black/15 p-5 rounded-xl border border-white/10">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9B7B7] font-mono font-bold flex items-center gap-1.5">
                      <Cpu size={14} /> Contribution & Learnings
                    </h4>
                    <p className="text-sm font-light text-white/90 leading-relaxed">
                      {activeProject.details.contribution}
                    </p>
                  </div>
                )}
              </div>

              {/* TECHNOLOGY STACK */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9B7B7] font-mono font-bold">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.details.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-white/15 border border-white/30 text-white shadow-sm tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer with Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white/10 border-t border-white/20 shrink-0 gap-3">
              <span className="text-xs text-white/70 font-mono tracking-wider">
                Press <kbd className="px-1.5 py-0.5 bg-black/40 rounded text-white font-mono">Esc</kbd> to close
              </span>
              {/* GITHUB AND LIVE DEMO BUTTONS */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {activeProject.details.github && (
                  <a
                    href={activeProject.details.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 transition border border-white/30 shadow-md text-white font-sans"
                  >
                    <Code2 size={16} />
                    View Code
                  </a>
                )}
                {activeProject.details.live && (
                  <a
                    href={activeProject.details.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-[#f4be4f] text-black hover:bg-[#e0ab41] transition shadow-md font-sans"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN LIGHTBOX ================= */}
      {lightboxOpen && hasScreenshots && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="max-w-6xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={screenshots[currentImageIndex]}
              alt="Enlarged screenshot preview"
              className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-white/80 text-sm font-mono tracking-widest">
              {String(currentImageIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}