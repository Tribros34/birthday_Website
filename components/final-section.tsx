"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { CelebrationField } from "@/components/celebration-field";
import type { SiteConfig } from "@/types/experience";

type FinalSectionProps = {
  copy: SiteConfig["copy"];
  finalImageSrc?: string;
};

const stars = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  size: index % 4 === 0 ? 2 : 1,
  delay: (index % 7) * 0.35,
}));

export function FinalSection({ copy, finalImageSrc }: FinalSectionProps) {
  const finalPhotoSrc = finalImageSrc ?? "/api/media/photos/son%20foot.jpeg";
  const bodyLines = copy.finalBody
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[1.04]">{copy.finalTitle}</h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-text/74 md:text-xl md:leading-9">
            {bodyLines.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
          <motion.figure
            className="mx-auto mt-10 w-full max-w-[min(78vw,21rem)] overflow-hidden rounded-[1.05rem] border border-white/70 bg-white/48 p-2 shadow-[0_24px_70px_rgba(122,56,88,0.18)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.14, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={finalPhotoSrc}
              alt="Aile anısı"
              width={923}
              height={2048}
              sizes="(max-width: 768px) 78vw, 21rem"
              className="h-auto w-full rounded-[0.75rem] object-contain"
              unoptimized
            />
          </motion.figure>
          <motion.div
            className="relative mx-auto mt-12 h-44 w-72 max-w-[82vw] md:h-56 md:w-96"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <span className="absolute inset-x-8 bottom-5 h-10 rounded-full bg-[#B85A75]/18 blur-2xl" />
            <Image
              src="/api/media/hero/rose-bouquet.png"
              alt=""
              width={768}
              height={512}
              sizes="(max-width: 768px) 82vw, 24rem"
              className="relative h-full w-full object-contain drop-shadow-[0_24px_42px_rgba(184,89,118,0.24)]"
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
