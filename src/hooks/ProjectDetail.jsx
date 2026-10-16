import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Square, X, Folder } from 'lucide-react';
import { PROJECT_DETAILS } from '../constants/projectData';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = PROJECT_DETAILS[projectId] || PROJECT_DETAILS['bagsphere'];

  return (
    <div className="min-h-screen bg-[rgb(54,23,23)] flex items-center justify-center p-4 md:p-8 font-sans text-[#f1d0d0]">
      <div className="w-full max-w-4xl border border-white/10 rounded bg-[rgb(44,18,18)] shadow-2xl flex flex-col">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5 select-none">
          <div className="flex items-center gap-2">
            <Folder size={16} className="text-[#f4be4f] fill-[#f4be4f]" />
            <span className="text-sm font-medium tracking-wide text-white">{project.name}</span>
          </div>
          {/* Only the X button is active, redirecting cleanly to Desktop 5 */}
          <div className="flex items-center gap-3 text-white/40">
            <Minus size={14} className="pointer-events-none select-none" />
            <Square size={11} className="pointer-events-none select-none" />
            <button 
              onClick={() => navigate('/#projects')} 
              className="hover:text-red-400 transition cursor-pointer text-white/60"
              aria-label="Close Window"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Menu Bar - Purely Decorative */}
        <div className="flex gap-4 px-4 py-1.5 border-b border-white/5 text-xs text-white/50 select-none pointer-events-none">
          {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {/* Body Details Frame */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto max-h-[85vh] select-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="space-y-4">
              <div className="w-full aspect-video bg-[#c4c4c4] rounded shadow-inner flex items-center justify-center overflow-hidden border border-black/20">
                <span className="text-gray-500 text-sm">No Preview Image Available</span>
              </div>
              <p className="text-sm leading-relaxed text-white/90">{project.description}</p>
            </div>

            <div className="space-y-4 text-sm md:pl-4">
              <h3 className="text-base font-semibold text-white tracking-wide">Project Information</h3>
              <div className="space-y-2 font-mono text-white/80">
                <div className="flex"><span className="w-28 text-white/50">Name</span><span>: {project.name}</span></div>
                <div className="flex"><span className="w-28 text-white/50">Version</span><span>: {project.version}</span></div>
                <div className="flex"><span className="w-28 text-white/50">Language</span><span>: {project.language}</span></div>
                <div className="flex"><span className="w-28 text-white/50">Framework</span><span>: {project.framework}</span></div>
                <div className="flex"><span className="w-28 text-white/50">Started</span><span>: {project.started}</span></div>
                <div className="flex"><span className="w-28 text-white/50">Completed</span><span>: {project.completed}</span></div>
                <div className="flex"><span className="w-28 text-white/50">Lines of Code</span><span>: {project.linesOfCode}</span></div>
              </div>
              
              {/* Clickable Live Demo Link */}
              <div className="pt-2">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition cursor-pointer pointer-events-auto"
                >
                  live demo link
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider mb-3">Features</h4>
              <ul className="space-y-1.5 text-sm text-white/80 list-disc list-inside pl-1">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="leading-normal">{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider mb-3">Tech Stack</h4>
              <ul className="space-y-1.5 text-sm text-white/80 list-none pl-1 space-y-2">
                <li><span className="font-medium text-white/60">• Frontend:</span> {project.techStack.frontend}</li>
                <li><span className="font-medium text-white/60">• Backend:</span> {project.techStack.backend || 'N/A'}</li>
                <li><span className="font-medium text-white/60">• Database:</span> {project.techStack.database || 'N/A'}</li>
                <li><span className="font-medium text-white/60">• Authentication:</span> {project.techStack.authentication || 'None'}</li>
                <li><span className="font-medium text-white/60">• Tools:</span> {project.techStack.tools}</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}