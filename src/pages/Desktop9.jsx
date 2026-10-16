import React, { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  FileText,
  Copy,
  Check,
  Send,
  Loader2,
  ExternalLink,
} from 'lucide-react';
// Inline brand icons — lucide-react dropped Github/Linkedin exports
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.03 1.78 2.71 1.26 3.37.97.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.17v3.21c0 .31.2.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

// ============================================================
// DATA — swap these for your real details
// ============================================================
const CONTACTS = [
  {
    id: 'email',
    label: 'Email',
    value: 'arorasaanvi777@gmail.com',
    href: 'mailto: arorasaanvi777@gmail.com',
    icon: Mail,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'https://github.com/saanastic',
    href: 'https://github.com/saanastic',
    icon: GithubIcon,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'https://www.linkedin.com/in/saanvi-arora2',
    href: 'https://www.linkedin.com/in/saanvi-arora2',
    icon: LinkedinIcon,
  },
];

const INTRO_LINES = [
  { text: '$ establishing_connection...', variant: 'prompt' },
  { text: '✓ Connected', variant: 'success', pauseAfter: 300 },
  { text: "You've reached the end of my portfolio.", variant: 'body' },
  { text: "If something here sparked an idea, let's connect.", variant: 'body' },
];

const CLOSING_LINES = [
  { text: '$ session_complete', variant: 'prompt' },
  { text: 'Thanks for stopping by.', variant: 'body' },
  { text: "Let's build something amazing together.", variant: 'body' },
];

// ============================================================
// HOOK — sequential line-by-line typewriter
// ============================================================
function useSequentialTypewriter(lines, { speed = 32, lineDelay = 350, startDelay = 300 } = {}, enabled = true) {
  const [output, setOutput] = useState(() => lines.map(() => ''));
  const [activeLine, setActiveLine] = useState(-1);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    const timers = [];

    const typeLine = (li) => {
      if (cancelled) return;
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      setActiveLine(li);
      const text = lines[li].text;
      let ci = 0;

      const step = () => {
        if (cancelled) return;
        ci++;
        setOutput((prev) => {
          const next = [...prev];
          next[li] = text.slice(0, ci);
          return next;
        });
        if (ci < text.length) {
          timers.push(setTimeout(step, speed));
        } else {
          timers.push(setTimeout(() => typeLine(li + 1), lines[li].pauseAfter ?? lineDelay));
        }
      };
      step();
    };

    timers.push(setTimeout(() => typeLine(0), startDelay));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { output, activeLine, done };
}

// ============================================================
// SUBCOMPONENT — Terminal line renderer
// ============================================================
const TerminalLine = ({ text, variant, showCursor }) => {
  const styles = {
    prompt: 'text-white/60 font-mono',
    success: 'text-emerald-300 font-mono',
    body: 'text-white/90 font-light',
  };

  return (
    <div className={`text-sm md:text-base leading-relaxed ${styles[variant]}`}>
      {text}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1em] bg-white/80 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
      )}
    </div>
  );
};

// ============================================================
// SUBCOMPONENT — Terminal intro
// ============================================================
const TerminalIntro = () => {
  const { output, activeLine, done } = useSequentialTypewriter(INTRO_LINES, {}, true);

  return (
    <div className="max-w-2xl mx-auto rounded-2xl bg-black/25 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-6 py-6 md:px-8 md:py-7">
      {/* fake terminal chrome */}
      <div className="flex items-center gap-1.5 mb-5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
        <span className="ml-2 text-[10px] font-mono tracking-widest text-white/40 uppercase">
          contact.sh
        </span>
      </div>

      <div className="space-y-2 min-h-[9rem]">
        {INTRO_LINES.map((line, i) => {
          if (i > activeLine && !(done && i <= INTRO_LINES.length - 1)) return null;
          if (i > activeLine) return null;
          const isCurrentlyTyping = i === activeLine && !done;
          const isLastLine = i === INTRO_LINES.length - 1;
          return (
            <TerminalLine
              key={i}
              text={output[i]}
              variant={line.variant}
              showCursor={isCurrentlyTyping || (done && isLastLine)}
            />
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// SUBCOMPONENT — animated success checkmark (SVG path draw)
// ============================================================
const AnimatedCheck = () => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    initial="hidden"
    animate="visible"
  >
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
    <motion.path
      d="M7 12.5L10.5 16L17 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.35 }}
    />
  </motion.svg>
);

// ============================================================
// SUBCOMPONENT — the glass chat / contact form
// ============================================================
const ContactForm = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'idle') return;

    if (
      !fields.name.trim() ||
      !fields.email.trim() ||
      !fields.message.trim()
    ) {
      return;
    }

    setStatus('loading');

    try {
      await emailjs.sendForm(
        'service_ye1vhlz',
        'template_qy1hak6',
        formRef.current,
        {
          publicKey: '7JkyKmzHEK3iltdF3',
        }
      );

      setStatus('success');

      setTimeout(() => {
        setStatus('idle');
        setFields({
          name: '',
          email: '',
          message: '',
        });
      }, 2600);

    } catch (error) {
      console.error('FULL EMAILJS ERROR:', error);
      setStatus('idle');
      alert(
        `Email failed!\n\nStatus: ${error?.status || 'Unknown'}\nMessage: ${
          error?.text || error?.message || 'Unknown error'
        }`
      );
    }
  };

  const inputBase =
    'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 ' +
    'focus:outline-none focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(255,255,255,0.08)] ' +
    'transition-all duration-300 disabled:opacity-50';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto rounded-[28px] bg-white/8 backdrop-blur-2xl border border-white/20
                 shadow-[0_30px_80px_rgba(0,0,0,0.3)] p-6 md:p-10 mt-8 relative overflow-hidden"
    >
      <div className="grid gap-4 md:gap-5">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={fields.name}
            onChange={handleChange}
            disabled={status !== 'idle'}
            placeholder="Your name"
            className={inputBase}
          />
          <input
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            disabled={status !== 'idle'}
            placeholder="you@email.com"
            className={inputBase}
          />
        </div>

        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          disabled={status !== 'idle'}
          placeholder="What's on your mind?"
          rows={5}
          className={`${inputBase} resize-none`}
        />

        <motion.button
          type="submit"
          disabled={status !== 'idle'}
          whileHover={status === 'idle' ? { scale: 1.015 } : {}}
          whileTap={status === 'idle' ? { scale: 0.98 } : {}}
          className="relative overflow-hidden mt-2 w-full py-4 rounded-xl font-mono text-sm uppercase tracking-widest
                     bg-white text-[#A63939] shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                     hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]
                     disabled:cursor-not-allowed transition-shadow duration-300
                     flex items-center justify-center gap-2"
        >
          {status === 'loading' && (
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[#A63939]/15"
            />
          )}

          <span className="relative z-10 flex items-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'idle' && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </motion.span>
              )}
              {status === 'loading' && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </motion.span>
              )}
              {status === 'success' && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <AnimatedCheck /> Message Sent
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </form>
  );
};

// ============================================================
// SUBCOMPONENT — single contact card
// ============================================================
const ContactCard = ({ contact }) => {
  const [copied, setCopied] = useState(false);
  const Icon = contact.icon;

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contact.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group w-full sm:w-[280px] rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15
                 hover:border-white/35 hover:bg-white/12
                 shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                 transition-colors duration-300 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#A63939] group-hover:rotate-6 transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/50">
            {contact.label}
          </p>
          <p className="text-sm text-white/90 truncate">{contact.value}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-mono uppercase tracking-widest
                     bg-white/10 border border-white/20 text-white/85
                     hover:bg-white hover:text-[#A63939] hover:scale-[1.03]
                     transition-all duration-300"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <a
          href={contact.href}
          target={contact.href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-mono uppercase tracking-widest
                     bg-white text-[#A63939]
                     hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                     transition-all duration-300"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Open
        </a>
      </div>
    </motion.div>
  );
};

// ============================================================
// SUBCOMPONENT — closing terminal (typewriter on scroll into view)
// ============================================================
const ClosingTerminal = () => {
  const wrapperRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { output, activeLine, done } = useSequentialTypewriter(CLOSING_LINES, { speed: 30 }, inView);

  return (
    <div ref={wrapperRef} className="max-w-xl mx-auto text-center mt-24">
      <div className="space-y-1.5">
        {CLOSING_LINES.map((line, i) => {
          if (i > activeLine) return null;
          const isCurrentlyTyping = i === activeLine && !done;
          return (
            <div
              key={i}
              className={`text-sm md:text-base font-mono ${
                line.variant === 'prompt' ? 'text-white/50' : 'text-white/85 font-sans font-light'
              }`}
            >
              {output[i]}
              {isCurrentlyTyping && (
                <span className="inline-block w-[2px] h-[1em] bg-white/80 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
              )}
            </div>
          );
        })}
      </div>

      {done && (
        <div className="mt-4 font-mono text-white/70 text-lg">
          <span className="inline-block w-[10px] h-[1.1em] bg-white/70 animate-[blink_1s_step-end_infinite]" />
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN — Desktop9
// ============================================================
const Desktop9 = () => {
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 45%)`;
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[rgb(174,50,50)] text-white font-sans overflow-hidden py-24 md:py-32 px-6"
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none transition-[background] duration-100 z-0" />

      <div className="relative z-10">
        <TerminalIntro />
        <ContactForm />

        {/* Updated Container for Centered Contact Cards Layout */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-5 mt-14">
          {CONTACTS.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

        <ClosingTerminal />
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Desktop9;