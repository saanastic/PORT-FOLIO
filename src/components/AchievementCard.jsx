import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Award, ExternalLink } from 'lucide-react';

const AchievementCard = ({ achievement, isFlipped, onFlip, onViewCertificate }) => {
  const { id, title, date, description, reflection, skills, icon: Icon } = achievement;

  const handleFlip = () => onFlip(id);

  const handleViewCertificate = (e) => {
    e.stopPropagation();
    onViewCertificate(achievement);
  };

  return (
    <div className="w-full h-[460px]" style={{ perspective: '1600px' }}>
      <motion.div
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onClick={handleFlip}
        className="relative w-full h-full cursor-pointer group"
      >
        {/* Ambient glow on hover — sits behind both faces */}
        <div className="absolute -inset-1 rounded-[36px] bg-white/0 group-hover:bg-white/10 blur-2xl transition-all duration-500 pointer-events-none" />

        {/* Flip wrapper */}
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ---------------- FRONT ---------------- */}
          <div
            className="absolute inset-0 rounded-[32px] p-8 flex flex-col justify-between
                       bg-white/10 backdrop-blur-xl border border-white/25
                       shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                       group-hover:border-white/45
                       transition-colors duration-500"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white">
                  {id}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase">
                  {date}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white mb-6">
                <Icon className="w-6 h-6 stroke-[1.5]" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                {title}
              </h3>

              <p className="text-white/80 text-sm leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Flip to View indicator */}
            <div className="pt-6 border-t border-white/20 flex items-center justify-between text-white/70 group-hover:text-white transition-colors duration-300">
              <span className="font-mono text-[10px] tracking-widest uppercase">
                Flip to view
              </span>
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="group-hover:rotate-180 transition-transform duration-500"
              >
                <RotateCw className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* ---------------- BACK ---------------- */}
          <div
            className="absolute inset-0 rounded-[32px] p-7 flex flex-col
                       bg-white/10 backdrop-blur-xl border border-white/25
                       shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 text-white">
              <Award className="w-4 h-4" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">
                Certificate Earned
              </span>
            </div>

            <p className="text-white/85 text-xs leading-relaxed font-light mb-4">
              {description}
            </p>

            {/* Certificate preview */}
            <div
              onClick={handleViewCertificate}
              className="relative rounded-2xl overflow-hidden border border-white/25 bg-white/5 h-28 mb-3
                         flex items-center justify-center cursor-pointer group/cert"
            >
              <CertificateThumb achievement={achievement} />
              <div className="absolute inset-0 bg-black/0 group-hover/cert:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/cert:opacity-100">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>

            <button
              onClick={handleViewCertificate}
              className="mb-4 w-full py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest
                         bg-white/15 border border-white/25 text-white
                         hover:bg-white hover:text-[#A63939] hover:scale-[1.02]
                         transition-all duration-300"
            >
              View Certificate
            </button>

            {/* Skills */}
            <div className="mb-4">
              <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-white/70 mb-2">
                ✓ Skills Learned
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Reflection */}
            <div className="mt-auto pt-3 border-t border-white/15">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1">
                Reflection
              </p>
              <p className="text-white/85 text-xs italic leading-relaxed">
                {reflection}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Small subcomponent: tries to load the real certificate image,
// falls back to a clean placeholder if the path doesn't resolve.
const CertificateThumb = ({ achievement }) => {
  const [errored, setErrored] = React.useState(false);

  if (!achievement.certificateImage || errored) {
    return (
      <div className="flex flex-col items-center justify-center text-white/50 gap-1">
        <Award className="w-6 h-6" />
        <span className="text-[9px] font-mono uppercase tracking-widest">
          Preview unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      src={achievement.certificateImage}
      alt={`${achievement.title} certificate`}
      onError={() => setErrored(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover/cert:scale-105"
    />
  );
};

export default AchievementCard;