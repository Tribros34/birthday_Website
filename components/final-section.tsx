"use client";

import { motion } from "framer-motion";

import { CelebrationField } from "@/components/celebration-field";
import type { SiteConfig } from "@/types/experience";

type FinalSectionProps = {
  copy: SiteConfig["copy"];
};

const stars = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  size: index % 4 === 0 ? 2 : 1,
  delay: (index % 7) * 0.35,
}));

export function FinalSection({ copy }: FinalSectionProps) {
  return (
    <section className="relative grid min-h-screen overflow-hidden bg-[linear-gradient(160deg,#FFF7F4_0%,#F4B8C8_38%,#C7BDF4_100%)] px-6 py-28 text-text">
      <CelebrationField density="full" className="opacity-75" />
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white/90"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.18, 0.82, 0.18], y: [-4, 4, -4] }}
          transition={{ duration: 7 + (star.id % 5), repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto grid max-w-3xl place-items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[1.04]">{copy.finalTitle}</h2>
          <p className="mt-8 text-lg text-text/70 md:text-2xl">{copy.finalBody}</p>
        </motion.div>
      </div>
    </section>
  );
}
