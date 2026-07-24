"use client";

import { motion, useReducedMotion } from "framer-motion";

type CelebrationFieldProps = {
  density?: "soft" | "full";
  className?: string;
};

const pieces = Array.from({ length: 34 }, (_, index) => {
  const isHeart = index % 3 === 0;

  return {
    id: index,
    isHeart,
    left: `${(index * 29 + 8) % 100}%`,
    top: `${(index * 17 + 11) % 100}%`,
    size: isHeart ? 13 + (index % 4) * 2 : 5 + (index % 3) * 3,
    rotate: (index * 23) % 90,
    color:
      index % 5 === 0
        ? "#D8B46A"
        : index % 4 === 0
          ? "#D9D2F2"
          : index % 2 === 0
            ? "#E8C8D1"
            : "#F3A6BB",
    delay: (index % 9) * 0.18,
  };
});

export function CelebrationField({ density = "soft", className = "" }: CelebrationFieldProps) {
  const shouldReduceMotion = useReducedMotion();
  const visiblePieces = density === "full" ? pieces : pieces.slice(0, 18);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {visiblePieces.map((piece) => (
        <motion.span
          key={piece.id}
          className={piece.isHeart ? "absolute text-center leading-none" : "absolute rounded-[2px]"}
          style={{
            left: piece.left,
            top: piece.top,
            width: piece.isHeart ? "auto" : piece.size,
            height: piece.isHeart ? "auto" : Math.max(9, piece.size * 1.8),
            color: piece.color,
            backgroundColor: piece.isHeart ? "transparent" : piece.color,
            fontSize: piece.size,
            rotate: piece.rotate,
            opacity: 0.52,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.42 }
              : {
                  y: density === "full" ? [-12, 18, -12] : [-6, 8, -6],
                  x: piece.id % 2 === 0 ? [-3, 4, -3] : [4, -3, 4],
                  opacity: [0.22, 0.72, 0.22],
                }
          }
          transition={{
            duration: density === "full" ? 8 + (piece.id % 4) : 10 + (piece.id % 5),
            repeat: Infinity,
            delay: piece.delay,
            ease: "easeInOut",
          }}
        >
          {piece.isHeart ? "♥" : null}
        </motion.span>
      ))}
    </div>
  );
}
