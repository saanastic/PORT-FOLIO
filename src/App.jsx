import { useRef } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { usePageMeta } from "./hooks/usePageMeta";
import Desktop1 from "./pages/Desktop1";
import Desktop2 from "./pages/Desktop2";
import Desktop3 from "./pages/Desktop3"; 
import Desktop4 from "./pages/Desktop4";
import Desktop5 from "./pages/Desktop5"; 

// The wrapper layout that handles the full-page smooth scrolling sequence
function ScrollFlowContainer() {
  const scrollerRef = useRef(null);

  return (
    <div
      ref={scrollerRef}
      className="h-screen w-screen overflow-y-scroll select-none"
    >

      {/* Page 1 */}
      <div className="w-full">
        <Desktop1 scrollerRef={scrollerRef} />
      </div>

      {/* Page 2 */}
      <div className="w-full">
        <Desktop2 scrollerRef={scrollerRef} />
      </div>

      {/* Page 3 */}
      <div className="w-full">
        <Desktop3 />
      </div>

      {/* Page 4 */}
      <div className="w-full">
        <Desktop4 scrollerRef={scrollerRef} />
      </div>

      {/* Page 5: The Interactive Folders Desktop */}
      <div className="w-full">
        <Desktop5 />
      </div>

    </div>
  );
}

// Dynamic Project View Page when a folder is double-clicked
function ProjectStoryPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#b23b3b] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-white/10 p-8 rounded-lg border border-white/20 max-w-md text-center shadow-xl">
        <h2 className="text-3xl font-bold mb-4 capitalize">
          {projectId ? projectId.replace(/-/g, ' ') : 'Project Details'}
        </h2>
        <p className="mb-6 opacity-90">
          This is the unique story page and content view for the {projectId} project.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-white text-[#b23b3b] font-semibold rounded hover:bg-opacity-95 transition"
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}

function App() {
  usePageMeta();

  return (
    <Routes>
      {/* The root landing URL holds the entire fluid scrolling dashboard experience */}
      <Route path="/" element={<ScrollFlowContainer />} />
      
      {/* Separate individual page to showcase a project's deep-dive story */}
      <Route path="/projects/:projectId" element={<ProjectStoryPage />} />
    </Routes>
  );
}

export default App;