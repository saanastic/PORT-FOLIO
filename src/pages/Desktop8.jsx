import React, { useState } from 'react';
import { Trophy, Mic, Cog, Compass, Sparkles } from 'lucide-react';
import AchievementCard from '../components/AchievementCard';
import CertificateModal from '../components/CertificateModal';

// Store all achievement data here — swap certificateImage paths for real
// files placed in /public/certificates/, e.g. "/certificates/dsa-sprint.png"
const ACHIEVEMENTS = [
  {
    id: '#01',
    title: 'DSA Sprint',
    date: 'OCT 2024',
    description:
      '45 days of consistency, problem solving, and building the habit of showing up every day.',
    certificateImage: '/certificates/dsa-sprint.png',
    reflection: 'Small daily reps beat sporadic bursts of motivation.',
    skills: ['Consistency', 'Problem Solving', 'Discipline'],
    icon: Trophy,
  },
  {
    id: '#02',
    title: 'Mic Drop',
    date: 'FEB 2025',
    description:
      'Stepped away from the screen and onto the stage, hosting a college event.',
    certificateImage: '/certificates/mic-drop.png',
    reflection: 'Clear communication is its own kind of engineering.',
    skills: ['Communication', 'Leadership', 'Improvisation'],
    icon: Mic,
  },
  {
    id: '#03',
    title: 'Screderia',
    date: 'MAY 2025',
    description:
      'Explored something beyond my usual domain in a mechanical engineering event.',
    certificateImage: '/certificates/screderia.png',
    reflection: 'Being a beginner again is a great way to stay sharp.',
    skills: ['Exploration', 'Teamwork', 'Adaptability'],
    icon: Cog,
  },
  {
    id: '#04',
    title: 'Design Hackathon',
    date: 'AUG 2025',
    description:
      'Crafted seamless UI/UX systems under a 24-hour deadline with a team.',
    certificateImage: '/certificates/design-hackathon.png',
    reflection: 'Constraints force the clearest design decisions.',
    skills: ['UI/UX', 'Time Management', 'Collaboration'],
    icon: Compass,
  },
];

const Desktop8 = () => {
  const [flippedId, setFlippedId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const handleFlip = (id) => {
    setFlippedId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-[rgb(174,50,50)] text-white selection:bg-black selection:text-white font-sans relative w-full py-24 md:py-32 overflow-hidden">
      

      {/* ---------------- CONTENT ---------------- */}
      <div className="relative z-10 px-6 md:px-16 lg:px-20">
        {/* HEADER */}
        <div className="max-w-3xl mb-14 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white/90 text-xs uppercase tracking-[0.35em] font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Milestones</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-wide text-white uppercase font-['Anton','Impact',sans-serif]">
            BEYOND THE KEYBOARD
          </h2>

          <p className="text-white/80 text-base md:text-lg font-light tracking-wide max-w-xl">
            Things I've done, learned, and experienced outside the usual code editor. Click a card to flip it.
          </p>
        </div>

        {/* GRID: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              isFlipped={flippedId === achievement.id}
              onFlip={handleFlip}
              onViewCertificate={setActiveModal}
            />
          ))}
        </div>
      </div>

      <CertificateModal achievement={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
};

export default Desktop8;