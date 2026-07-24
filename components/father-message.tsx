"use client";

import { motion } from "framer-motion";

type FatherMessageProps = {
  lines: string[];
  father: string;
};

export function FatherMessage({ lines, father }: FatherMessageProps) {
  return (
    <section className="grid min-h-screen place-items-center bg-white px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <div className="space-y-5">
          {lines.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              className="font-serif text-[clamp(2rem,6.5vw,4.8rem)] leading-[1.16] text-text"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: index * 0.22, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: lines.length * 0.2, duration: 0.7 }}
        >
          <div className="text-2xl text-primary">❤️</div>
          <p className="mt-3 text-sm font-medium text-muted">{father}</p>
        </motion.div>
      </div>
    </section>
  );
}
