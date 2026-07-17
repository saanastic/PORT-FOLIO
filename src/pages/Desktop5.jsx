import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowDownRight, Monitor } from 'lucide-react';

// The list of folders/projects matching your image
const PROJECTS = [
  { id: 'bagsphere', name: 'BagSphere' },
  { id: 'currency-exchanger', name: 'Currency-Exchanger' },
  { id: 'tic-tac-toe', name: 'Tic-Tac-Toe' },
  { id: 'entry-form', name: 'Entry-Form' },
  { id: 'posts-app', name: 'Posts-app' },
];

export default function Desktop5() {
  const navigate = useNavigate();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 564px)');
    setIsNarrow(mql.matches);

    const handleChange = (e) => setIsNarrow(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Redirects to the specific project page when double-clicked (desktop)
  const handleFolderDoubleClick = (id) => {
    navigate(`/projects/${id}`);
  };

  // On narrow screens, a single tap navigates (double-click is unreliable on touch)
  const handleFolderTap = (id) => {
    if (isNarrow) navigate(`/projects/${id}`);
  };

  // ---------------- NARROW / MOBILE LAYOUT ----------------
  if (isNarrow) {
    return (
      <div className="min-h-screen bg-[rgb(174,50,50)]  flex flex-col items-center justify-center p-4 text-white font-sans">

        {/* Top Banner Heading */}
        <h1 className="text-base font-semibold mb-4 self-start w-full tracking-wide leading-snug">
          Tap a folder. Every project has a story inside.
        </h1>

        {/* Main Container Wrapper */}
        <div className="w-full border border-white/30 rounded-lg overflow-hidden bg-[#b23b3b] shadow-2xl">

          {/* Top Breadcrumb Navigation Bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/20 text-[11px] tracking-wide select-none overflow-x-auto whitespace-nowrap">
            <Monitor size={13} className="text-gray-300 shrink-0" />
            <span className="opacity-90">My Computer</span>
            <ChevronRight size={11} className="opacity-60 shrink-0" />
            <span className="opacity-90">Portfolio</span>
            <ChevronRight size={11} className="opacity-60 shrink-0" />
            <span className="font-semibold">Projects</span>
          </div>

          {/* Folder Grid — 2 columns, no sidebar */}
          <div className="p-4 grid grid-cols-2 gap-4 content-start select-none">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => handleFolderTap(project.id)}
                className="flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
              >
                {/* Visual Folder Icon Structure */}
                <div className="relative w-12 h-9 mb-1.5 bg-[#f4be4f] rounded-r-md rounded-bl-md shadow-md">
                  <div className="absolute -top-1 left-0 w-5 h-1.5 bg-[#f4be4f] rounded-t-sm"></div>
                  <div className="absolute inset-x-0 bottom-0 top-1 bg-[#f8cb66] rounded-md border-t border-white/20"></div>
                </div>

                {/* Text underneath folder icon */}
                <span className="text-[11px] font-medium leading-tight px-1">
                  {project.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- WIDE / DESKTOP LAYOUT ----------------
  return (
    <div className="min-h-screen bg-[rgb(174,50,50)]  flex flex-col items-center justify-center p-6 text-white font-sans">
      
      {/* Top Banner Heading */}
      <h1 className="text-2xl font-semibold mb-6 self-start max-w-4xl mx-auto w-full tracking-wide">
        Double-click a folder. Every project has a story inside.
      </h1>

      {/* Main Container Wrapper */}
      <div className="w-full max-w-4xl border border-white/30 rounded-lg overflow-hidden bg-[#b23b3b] shadow-2xl">
        
        {/* Top Breadcrumb Navigation Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/20 text-sm tracking-wide select-none">
          <Monitor size={16} className="text-gray-300" />
          <span className="opacity-90">My Computer</span>
          <ChevronRight size={14} className="opacity-60" />
          <span className="opacity-90">Portfolio</span>
          <ChevronRight size={14} className="opacity-60" />
          <span className="font-semibold">Projects</span>
        </div>

        {/* Dynamic Split Screen Body */}
        <div className="flex min-h-[420px]">
          
          {/* Left Navigation Sidebar */}
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
            
            {/* Sidebar Nested Projects Links */}
            <div className="pl-12 space-y-2 pt-1">
              {PROJECTS.map((project) => (
                <button
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="flex items-center gap-1 text-white/80 hover:text-white hover:underline block text-left w-full transition"
                >
                  <ArrowDownRight size={12} className="opacity-70" />
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Folder Grid */}
          <div className="w-2/3 p-6 grid grid-cols-4 gap-6 content-start select-none">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                onDoubleClick={() => handleFolderDoubleClick(project.id)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Visual Folder Icon Structure */}
                <div className="relative w-16 h-12 mb-2 bg-[#f4be4f] rounded-r-md rounded-bl-md shadow-md group-hover:scale-105 transition-transform">
                  {/* Top folder tab */}
                  <div className="absolute -top-1.5 left-0 w-7 h-2 bg-[#f4be4f] rounded-t-sm"></div>
                  {/* Inner lighter folder fold for depth */}
                  <div className="absolute inset-x-0 bottom-0 top-1 bg-[#f8cb66] rounded-md border-t border-white/20"></div>
                </div>
                
                {/* Text underneath folder icon */}
                <span className="text-xs font-medium leading-tight px-1 group-hover:underline">
                  {project.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}