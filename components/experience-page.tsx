"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Gift, Heart, Volume2, VolumeX } from "lucide-react";

import type { ExperienceAssets, SiteConfig } from "@/types/experience";
import { CelebrationField } from "@/components/celebration-field";
import { GiftReveal } from "@/components/gift-reveal";
import { PhotoStory } from "@/components/photo-story";
import { FatherLetter } from "@/components/father-letter";
import { FatherMessage } from "@/components/father-message";
import { SchoolReveal } from "@/components/school-reveal";
import { FinalSection } from "@/components/final-section";

type ExperiencePageProps = {
  config: SiteConfig;
  assets: ExperienceAssets;
};

const giftBurstPieces = Array.from({ length: 54 }, (_, index) => {
  const isHeart = index % 2 === 0;
  const side = index % 3;

  return {
    id: index,
    isHeart,
    left: `${(index * 37 + 11) % 100}%`,
    startX: side === 0 ? -90 : side === 1 ? 0 : 90,
    endX: side === 0 ? -170 - (index % 5) * 22 : side === 1 ? (index % 2 === 0 ? -70 : 70) : 170 + (index % 5) * 22,
    endY: 560 + (index % 8) * 48,
    rotate: index % 2 === 0 ? 140 + (index % 6) * 24 : -150 - (index % 6) * 24,
    size: isHeart ? 18 + (index % 5) * 4 : 8 + (index % 4) * 3,
    color:
      index % 5 === 0
        ? "#D8B46A"
        : index % 4 === 0
          ? "#D9D2F2"
          : index % 3 === 0
            ? "#FFFFFF"
            : "#F3A6BB",
    delay: (index % 12) * 0.035,
  };
});

export function ExperiencePage({ config, assets }: ExperiencePageProps) {
  const [started, setStarted] = useState(false);
  const [showGiftBurst, setShowGiftBurst] = useState(false);
  const [muted, setMuted] = useState(false);
  const giftRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const firstName = config.name || "Simay";
  const fatherName = config.father || "Baban";

  const messageLines = useMemo(() => {
    const message = config.message || "";

    return message
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }, [config.message]);

  const handleStart = async () => {
    if (!started) {
      setShowGiftBurst(true);
      window.setTimeout(() => setShowGiftBurst(false), shouldReduceMotion ? 900 : 3600);
    }

    setStarted(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.42;
      audioRef.current.muted = muted;
      await audioRef.current.play().catch(() => undefined);
    }

    window.setTimeout(
      () => giftRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" }),
      shouldReduceMotion ? 0 : 260,
    );
  };

  const toggleMusic = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const animateAudioVolume = (targetVolume: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const startVolume = audio.volume;
    const startedAt = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = startVolume + (targetVolume - startVolume) * eased;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <main className="relative min-h-screen">
      {assets.musicSrc ? <audio ref={audioRef} src={assets.musicSrc} loop preload="auto" /> : null}
      <GiftBurst isVisible={showGiftBurst} shouldReduceMotion={Boolean(shouldReduceMotion)} />

      {started && assets.musicSrc ? (
        <button
          aria-label={muted ? config.copy.musicOff : config.copy.musicOn}
          className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/60 text-text shadow-[0_12px_40px_rgba(61,61,61,0.12)] backdrop-blur-md transition hover:scale-105 md:right-6 md:top-6"
          type="button"
          onClick={toggleMusic}
          title={muted ? config.copy.musicOff : config.copy.musicOn}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      ) : null}

      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6">
        <CelebrationField density="full" className="opacity-80" />
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.p
            className="font-serif text-[clamp(2.45rem,8vw,5.8rem)] leading-[1.02] text-text drop-shadow-[0_18px_45px_rgba(184,89,118,0.12)]"
            initial={{ opacity: 0, filter: "blur(10px)", y: 16 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {config.copy.introFirst}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 3, duration: 0.9 }}
          >
            <p className="text-base text-muted md:text-lg">{config.copy.introSecond}</p>
            <button
              className="group/gift relative mt-2 h-36 w-44 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              type="button"
              onClick={handleStart}
              aria-label={config.copy.openGift}
            >
              <div className="absolute left-1/2 top-2 h-12 w-48 -translate-x-1/2 rounded-[1.2rem] border border-white/70 bg-[linear-gradient(135deg,#F3A6BB,#E8C8D1_48%,#D9D2F2)] shadow-[0_22px_52px_rgba(184,89,118,0.18)]" />
              <div className="absolute bottom-0 left-1/2 h-28 w-40 -translate-x-1/2 rounded-[1.35rem] border border-white/75 bg-white/72 shadow-[0_24px_60px_rgba(184,89,118,0.16)] backdrop-blur transition group-hover/gift:-translate-y-1" />
              <div className="absolute bottom-0 left-1/2 h-28 w-7 -translate-x-1/2 rounded-full bg-accent/80" />
              <div className="absolute bottom-10 left-1/2 h-7 w-40 -translate-x-1/2 bg-secondary/70" />
              <div className="absolute bottom-8 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border border-white bg-white/82 shadow-[0_14px_34px_rgba(61,61,61,0.1)]">
                <span className="font-serif text-4xl leading-none text-[#B85A75]">S</span>
              </div>
            </button>
            <motion.div
              className="relative -mt-1 h-36 w-36 md:h-44 md:w-44"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 3.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <span className="absolute inset-8 rounded-full bg-accent/20 blur-2xl" />
              <Image
                src="/api/media/hero/birthday-cake.png"
                alt=""
                width={360}
                height={360}
                className="relative h-full w-full object-contain drop-shadow-[0_28px_48px_rgba(184,89,118,0.28)] transition duration-500 group-hover/gift:-translate-y-1 group-hover/gift:scale-[1.03]"
                draggable={false}
                priority
              />
            </motion.div>
            <motion.button
              className="group relative inline-flex min-h-16 items-center gap-3 rounded-full border-2 border-white/85 bg-[#B85A75] px-9 py-4 text-base font-bold text-white shadow-[0_22px_70px_rgba(184,89,118,0.42)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#A94B69] focus:outline-none focus:ring-4 focus:ring-accent/45 md:text-lg"
              type="button"
              onClick={handleStart}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.045, 1],
                      boxShadow: [
                        "0 22px 70px rgba(184,89,118,0.42)",
                        "0 28px 90px rgba(184,89,118,0.58)",
                        "0 22px 70px rgba(184,89,118,0.42)",
                      ],
                    }
              }
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute inset-[-0.45rem] -z-10 rounded-full bg-accent/30 blur-md" />
              <Gift size={23} className="text-white transition group-hover:scale-110" />
              {config.copy.openGift}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {started ? (
        <>
          <div ref={giftRef}>
            <GiftReveal
              birthdayTitle={config.copy.birthdayTitle}
              name={firstName}
              isOpen={started}
              shouldReduceMotion={Boolean(shouldReduceMotion)}
            />
          </div>

          <PhotoStory copy={config.copy} photos={assets.photos} />

          <FatherLetter
            letter={config.letter}
            father={fatherName}
            onOpen={() => animateAudioVolume(0.147)}
            onClose={() => animateAudioVolume(0.42)}
          />

          {messageLines.length > 0 ? <FatherMessage father={fatherName} lines={messageLines} /> : null}

          <SchoolReveal
            copy={config.copy}
            school={config.school || "Yeni okulun"}
            logoSrc={assets.schoolLogoSrc}
            extraImageSrc={assets.schoolExtraImageSrc}
          />

          <FinalSection copy={config.copy} finalImageSrc={assets.finalImageSrc} />

          <div className="pointer-events-none fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/65 bg-white/55 px-4 py-2 text-xs text-muted shadow-[0_10px_36px_rgba(61,61,61,0.08)] backdrop-blur-md">
            <Heart size={13} className="fill-primary text-primary" />
            <span>{firstName}</span>
          </div>
        </>
      ) : null}
    </main>
  );
}

type GiftBurstProps = {
  isVisible: boolean;
  shouldReduceMotion: boolean;
};

function GiftBurst({ isVisible, shouldReduceMotion }: GiftBurstProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute left-1/2 top-[58%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-2xl"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: shouldReduceMotion ? 1.6 : 4.8, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.6 : 1.1, ease: "easeOut" }}
          />
          {giftBurstPieces.map((piece) => (
            <motion.span
              key={piece.id}
              className={piece.isHeart ? "absolute text-center font-serif leading-none" : "absolute rounded-[3px]"}
              style={{
                left: piece.left,
                top: "52%",
                width: piece.isHeart ? "auto" : piece.size,
                height: piece.isHeart ? "auto" : piece.size * 1.7,
                color: piece.color,
                backgroundColor: piece.isHeart ? "transparent" : piece.color,
                fontSize: piece.size,
                textShadow: piece.isHeart ? "0 10px 24px rgba(184,89,118,0.28)" : undefined,
              }}
              initial={{ x: piece.startX, y: 0, scale: 0.25, rotate: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: [0, 0.9, 0], scale: [0.6, 1, 0.8], y: [0, 80, 160] }
                  : {
                      x: [piece.startX, piece.endX * 0.45, piece.endX],
                      y: [0, -180 - (piece.id % 6) * 22, piece.endY],
                      scale: [0.2, 1.18, 0.92],
                      rotate: [0, piece.rotate * 0.45, piece.rotate],
                      opacity: [0, 1, 1, 0],
                    }
              }
              transition={{ delay: piece.delay, duration: shouldReduceMotion ? 1.1 : 3.05, ease: "easeOut" }}
            >
              {piece.isHeart ? "♥" : null}
            </motion.span>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
