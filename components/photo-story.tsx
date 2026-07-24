"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

import type { PhotoAsset, SiteConfig } from "@/types/experience";

type PhotoStoryProps = {
  copy: SiteConfig["copy"];
  photos: PhotoAsset[];
};

const variants = {
  calm: { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" },
  softZoom: { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" },
  tilt: { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" },
};

function initialFor(photo: PhotoAsset) {
  if (photo.variant === "tilt") {
    return { opacity: 0, y: 28, scale: 0.985, rotate: -1.4, filter: "blur(10px)" };
  }

  if (photo.variant === "softZoom") {
    return { opacity: 0, y: 22, scale: 0.965, rotate: 0, filter: "blur(8px)" };
  }

  return { opacity: 0, y: 24, scale: 1, rotate: 0, filter: "blur(8px)" };
}

export function PhotoStory({ copy, photos }: PhotoStoryProps) {
  return (
    <section className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <motion.h2
            className="font-serif text-[clamp(2.4rem,7vw,5.2rem)] leading-[1.04]"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.9 }}
          >
            {copy.photosTitle}
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {copy.photosSubtitle}
          </motion.p>
        </div>

        {photos.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
            {photos.map((photo, index) => (
              <motion.figure
                key={photo.id}
                className="mb-4 break-inside-avoid overflow-hidden rounded-[1.15rem] border border-white/70 bg-white/64 p-2 shadow-[0_18px_50px_rgba(61,61,61,0.11)] backdrop-blur-sm"
                initial={initialFor(photo)}
                whileInView={variants[photo.variant]}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: Math.min((index % 9) * 0.035, 0.22), duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, (max-width: 1536px) 30vw, 20vw"
                  className="h-auto w-full rounded-[0.85rem] object-contain"
                  loading={index < 6 ? "eager" : "lazy"}
                  priority={index < 3}
                />
              </motion.figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto grid min-h-72 max-w-xl place-items-center rounded-[1.4rem] border border-white/75 bg-white/58 px-8 text-center shadow-[0_20px_70px_rgba(61,61,61,0.1)] backdrop-blur-md">
            <div>
              <ImageIcon className="mx-auto text-accent" size={30} />
              <h3 className="mt-5 font-serif text-3xl">{copy.noPhotosTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{copy.noPhotosBody}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
