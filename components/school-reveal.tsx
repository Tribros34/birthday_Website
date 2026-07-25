"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import type { SiteConfig } from "@/types/experience";

type SchoolRevealProps = {
  copy: SiteConfig["copy"];
  school: string;
  logoSrc?: string;
  extraImageSrc?: string;
};

export function SchoolReveal({ copy, school, logoSrc, extraImageSrc }: SchoolRevealProps) {
  const announcement =
    school.toLocaleLowerCase("tr-TR") === "kalem vakfı okulları"
      ? "Seni Kalem Vakfı Okullarına yazdırdım"
      : `Seni ${school}'na yazdırdım`;

  return (
    <section className="relative grid min-h-screen overflow-hidden bg-[linear-gradient(145deg,#7A3858_0%,#B85A75_42%,#D9D2F2_100%)] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.22),transparent_28rem),radial-gradient(circle_at_18%_85%,rgba(216,180,106,0.28),transparent_22rem)]" />
      <div className="relative mx-auto grid max-w-4xl place-items-center text-center">
        <motion.p
          className="font-serif text-[clamp(3rem,11vw,7rem)] leading-none"
          initial={{ opacity: 0, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {copy.schoolPreludeOne}
        </motion.p>

        <motion.p
          className="mt-10 max-w-2xl text-lg leading-8 text-white/72 md:text-2xl md:leading-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ delay: 2, duration: 0.9 }}
        >
          {copy.schoolPreludeTwo}
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col items-center"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid h-24 w-24 place-items-center rounded-full border border-white/32 bg-white/18 shadow-[0_24px_90px_rgba(122,56,88,0.34)] backdrop-blur-md md:h-32 md:w-32">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={school}
                width={96}
                height={96}
                className="max-h-18 w-auto object-contain md:max-h-24"
              />
            ) : (
              <GraduationCap size={42} className="text-accent" />
            )}
          </div>

          <div className="mt-10 grid justify-items-center">
            <p className="text-sm uppercase text-accent">{copy.schoolLineBefore}</p>
            <motion.p
              className="mt-4 max-w-3xl overflow-hidden text-balance font-serif text-[clamp(2rem,6vw,4.7rem)] italic leading-[1.12] text-white"
              initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(4px)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.95 }}
              transition={{ delay: 5.1, duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {announcement}
            </motion.p>
            <motion.svg
              className="mt-2 h-10 w-[min(82vw,31rem)] text-accent"
              viewBox="0 0 520 58"
              fill="none"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.95 }}
              transition={{ delay: 6.2, duration: 0.2 }}
            >
              <motion.path
                d="M18 35 C82 17 143 46 206 26 C259 9 288 46 337 29 C382 13 414 24 445 34 C468 41 488 40 503 30"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.95 }}
                transition={{ delay: 6.25, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>

            {extraImageSrc ? (
              <motion.figure
                className="mt-7 w-full max-w-[min(62vw,13rem)] overflow-hidden rounded-[0.85rem] border border-white/32 bg-white/14 p-1.5 shadow-[0_20px_54px_rgba(122,56,88,0.26)] backdrop-blur-md md:max-w-[15rem]"
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: 6.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={extraImageSrc}
                  alt={`${school} sürprizi`}
                  width={1055}
                  height={1491}
                  sizes="(max-width: 640px) 62vw, 15rem"
                  className="h-auto w-full rounded-[0.65rem] object-contain"
                />
              </motion.figure>
            ) : null}
          </div>
          <p className="mt-10 text-base text-white/64 md:text-lg">{copy.pride}</p>
        </motion.div>
      </div>
    </section>
  );
}
