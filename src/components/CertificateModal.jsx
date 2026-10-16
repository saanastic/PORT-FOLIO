import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, Award } from 'lucide-react';

const CertificateModal = ({ achievement, onClose }) => {
  useEffect(() => {
    if (!achievement) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // lock background scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-[28px] bg-white/10 backdrop-blur-2xl
                       border border-white/25 shadow-[0_30px_80px_rgba(0,0,0,0.4)] p-6 md:p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center
                         bg-white text-[#A63939] shadow-lg
                         hover:scale-110 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2 mb-5 text-white">
              <Award className="w-4 h-4" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">
                {achievement.title} — Certificate
              </span>
            </div>

            {/* Certificate image */}
            <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/20 flex items-center justify-center min-h-[300px] max-h-[60vh]">
              <CertificateFull achievement={achievement} />
            </div>

            {/* Download */}
            <div className="mt-6 flex justify-center">
              <a
                href={achievement.certificateImage || '#'}
                download
                onClick={(e) => {
                  if (!achievement.certificateImage) e.preventDefault();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-widest
                           bg-white text-[#A63939] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
                           transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CertificateFull = ({ achievement }) => {
  const [errored, setErrored] = React.useState(false);

  if (!achievement.certificateImage || errored) {
    return (
      <div className="flex flex-col items-center justify-center text-white/50 gap-2 py-16">
        <Award className="w-10 h-10" />
        <span className="text-xs font-mono uppercase tracking-widest">
          Certificate preview unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      src={achievement.certificateImage}
      alt={`${achievement.title} certificate`}
      onError={() => setErrored(true)}
      className="w-full h-full max-h-[60vh] object-contain"
    />
  );
};

export default CertificateModal;