"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { CelebrationField } from "@/components/celebration-field";

type GiftRevealProps = {
  birthdayTitle: string;
  name: string;
  isOpen: boolean;
  shouldReduceMotion: boolean;
};

export function GiftReveal({ birthdayTitle, name, isOpen, shouldReduceMotion }: GiftRevealProps) {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-24">
      <CelebrationField density="soft" className="opacity-70" />
      <div className="relative mx-auto flex min-h-[30rem] w-full max-w-3xl flex-col items-center justify-center">
        <motion.div
          className="relative h-48 w-60"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <motion.div
            className="absolute left-1/2 top-4 z-30 h-16 w-64 -translate-x-1/2 rounded-[1.65rem] border border-white/70 bg-[linear-gradient(135deg,#F3A6BB,#E8C8D1_48%,#D9D2F2)] shadow-[0_30px_80px_rgba(184,89,118,0.22)] backdrop-blur"
            variants={{
              closed: { y: 0, rotate: 0 },
              open: shouldReduceMotion ? { y: -22 } : { y: -70, rotate: -7 },
            }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute bottom-0 left-1/2 h-34 w-56 -translate-x-1/2 rounded-[1.85rem] border border-white/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(232,200,209,0.88))] shadow-[0_24px_70px_rgba(184,89,118,0.18)] backdrop-blur-md" />
          <div className="absolute bottom-0 left-1/2 h-34 w-9 -translate-x-1/2 rounded-full bg-accent/80" />
          <div className="absolute bottom-12 left-1/2 h-9 w-56 -translate-x-1/2 bg-secondary/70" />
          <div className="absolute bottom-10 left-1/2 z-20 grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border border-white/80 bg-white/76 shadow-[0_18px_42px_rgba(61,61,61,0.12)] backdrop-blur">
            <div className="text-center">
              <div className="font-serif text-5xl leading-none text-[#B85A75]">S</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Simay
              </div>
            </div>
          </div>
          <motion.div
            className="absolute -right-3 top-0 z-40 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-accent shadow-[0_14px_32px_rgba(61,61,61,0.12)]"
            animate={shouldReduceMotion ? undefined : { rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={18} />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-7 text-center"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: shouldReduceMotion ? 0 : 1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium uppercase text-accent">{birthdayTitle}</p>
          <h1 className="mt-3 font-serif text-[clamp(3rem,12vw,7rem)] leading-none text-text">
            {name}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
