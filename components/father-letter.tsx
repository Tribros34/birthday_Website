"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Heart } from "lucide-react";

import type { SiteConfig } from "@/types/experience";

type FatherLetterProps = {
  letter: SiteConfig["letter"];
  father: string;
  onOpen: () => void;
  onClose: () => void;
};

function playPaperSound() {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const buffer = context.createBuffer(1, context.sampleRate * 0.42, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index += 1) {
    const fade = 1 - index / data.length;
    data[index] = (Math.random() * 2 - 1) * 0.035 * fade;
  }

  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  noise.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.value = 900;
  gain.gain.setValueAtTime(0.18, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.42);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  noise.start();
  noise.stop(context.currentTime + 0.42);
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.58 + index * 0.36,
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function FatherLetter({ letter, father, onOpen, onClose }: FatherLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const allLines = [...letter.paragraphs, ...letter.highlight, ...letter.closing];

  const handleOpen = () => {
    setIsOpen(true);
    playPaperSound();
    onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    window.setTimeout(onClose, shouldReduceMotion ? 0 : 700);
  };

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(243,166,187,0.26),transparent_26rem),radial-gradient(circle_at_80%_72%,rgba(201,191,244,0.28),transparent_24rem)]" />

      <motion.button
        type="button"
        className="group relative z-10 h-64 w-[min(86vw,27rem)] cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
        whileHover={shouldReduceMotion ? undefined : { y: -8 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleOpen}
        aria-label="Babandan bir mektup"
      >
        <div className="absolute inset-x-4 bottom-0 h-52 rounded-[1.4rem] bg-[#F8F3E9] shadow-[0_34px_90px_rgba(184,89,118,0.22)]" />
        <div className="absolute inset-x-4 bottom-0 h-52 overflow-hidden rounded-[1.4rem] border border-white/80 bg-[linear-gradient(145deg,#FFFDF8,#F8F3E9)]">
          <div className="absolute inset-x-0 top-0 h-32 origin-top bg-[linear-gradient(160deg,#FFF9F1,#EEDFD0)] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          <div className="absolute bottom-0 left-0 h-36 w-1/2 bg-[linear-gradient(40deg,#EFE2D2,#FFF9F1)] [clip-path:polygon(0_0,100%_56%,0_100%)]" />
          <div className="absolute bottom-0 right-0 h-36 w-1/2 bg-[linear-gradient(320deg,#EFE2D2,#FFF9F1)] [clip-path:polygon(100%_0,0_56%,100%_100%)]" />
          <div className="absolute left-9 top-12 font-serif text-3xl text-text/82 md:text-4xl">
            {letter.greeting}
          </div>
          <div className="absolute bottom-8 right-8 grid h-12 w-12 place-items-center rounded-full bg-[#B85A75] text-white shadow-[0_10px_26px_rgba(184,89,118,0.28)] transition group-hover:scale-105">
            <Heart size={19} className="fill-white" />
          </div>
        </div>
        <p className="absolute -bottom-14 left-1/2 w-full -translate-x-1/2 text-center text-lg font-semibold text-muted md:text-xl">
          Babandan bir mektup
        </p>
      </motion.button>

      <LetterOverlay
        isOpen={isOpen}
        letter={letter}
        father={father}
        allLines={allLines}
        lineVariants={lineVariants}
        onClose={handleClose}
      />
    </section>
  );
}

type LetterOverlayProps = {
  isOpen: boolean;
  letter: SiteConfig["letter"];
  father: string;
  allLines: string[];
  lineVariants: typeof lineVariants;
  onClose: () => void;
};

function LetterOverlay({ isOpen, letter, father, allLines, lineVariants, onClose }: LetterOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="letter-layer"
          className="fixed inset-0 z-[70] overflow-y-auto bg-white/38 px-4 py-8 backdrop-blur-xl md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mx-auto flex min-h-full w-full max-w-4xl items-center justify-center py-10">
            <motion.div
              className="relative w-full"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                closed: { opacity: 0, y: 42, scale: 0.92, filter: "blur(10px)" },
                open: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none absolute left-1/2 top-8 h-56 w-[min(74vw,31rem)] -translate-x-1/2 rounded-[1.5rem] bg-[#F8F3E9] shadow-[0_34px_110px_rgba(122,56,88,0.24)]">
                <motion.div
                  className="absolute inset-x-0 top-0 h-32 origin-top rounded-t-[1.5rem] bg-[linear-gradient(160deg,#FFF9F1,#EEDFD0)] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -142 }}
                  exit={{ rotateX: 0 }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 900 }}
                />
                <motion.div
                  className="absolute bottom-8 right-8 grid h-12 w-12 place-items-center rounded-full bg-[#B85A75] text-white shadow-[0_10px_26px_rgba(184,89,118,0.28)]"
                  initial={{ scale: 1, rotate: 0, opacity: 1 }}
                  animate={{ scale: [1, 1.05, 0], rotate: [0, -8, 18], opacity: [1, 1, 0] }}
                  exit={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Heart size={19} className="fill-white" />
                </motion.div>
              </div>

              <motion.article
                className="relative mx-auto mt-12 max-h-[82vh] w-full max-w-3xl overflow-y-auto rounded-[1.35rem] border border-white/70 bg-[#F8F3E9] px-6 py-8 text-text shadow-[0_34px_120px_rgba(122,56,88,0.25)] md:px-12 md:py-11"
                initial={{ y: 58, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 54, scale: 0.9 }}
                transition={{ delay: 0.3, duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),inset_0_-22px_70px_rgba(216,180,106,0.08)]" />
                <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  {letter.date}
                </p>
                <h2 className="relative mt-6 font-serif text-4xl leading-tight text-[#7A3858] md:text-5xl">
                  {letter.greeting}
                </h2>

                <div className="relative mt-8 space-y-5 text-[1.02rem] leading-8 text-text/82 md:text-lg md:leading-9">
                  {allLines.map((line, index) => {
                    const highlightStart = letter.paragraphs.length;
                    const isHighlight =
                      index >= highlightStart && index < highlightStart + letter.highlight.length;
                    const isFinal = index >= allLines.length - 2;

                    return (
                      <motion.p
                        key={`${line}-${index}`}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={lineVariants}
                        className={
                          isHighlight
                            ? "my-8 rounded-[1rem] border border-white/75 bg-white/52 px-5 py-4 font-serif text-[1.35rem] leading-8 text-[#7A3858] shadow-[0_16px_45px_rgba(184,89,118,0.11)] md:text-2xl md:leading-10"
                            : isFinal
                              ? "font-medium text-[#7A3858]"
                              : ""
                        }
                      >
                        {line}
                      </motion.p>
                    );
                  })}
                </div>

                <motion.div
                  className="relative mt-10 flex flex-col gap-6 border-t border-[#D8B46A]/24 pt-7 sm:flex-row sm:items-end sm:justify-between"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58 + allLines.length * 0.36, duration: 0.62 }}
                >
                  <button
                    type="button"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#B85A75] px-6 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(184,89,118,0.28)] transition hover:-translate-y-0.5 hover:bg-[#A94B69] focus:outline-none focus:ring-2 focus:ring-accent/60"
                    onClick={onClose}
                  >
                    {letter.foldButton}
                  </button>
                  <div className="text-right font-[var(--font-hand)] text-4xl leading-none text-[#7A3858] md:text-5xl">
                    {father}
                  </div>
                </motion.div>
              </motion.article>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
