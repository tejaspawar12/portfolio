"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getInViewProps, getReveal, getTransition } from "@/lib/motion";

export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  const inView = getInViewProps(reduceMotion);
  return (
    <motion.div
      variants={getReveal(reduceMotion, "fadeUp")}
      transition={getTransition(reduceMotion, "default")}
      {...inView}
      className="mb-10"
    >
      <p className="text-sm uppercase tracking-[0.3em] text-neon-400">{subtitle}</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
    </motion.div>
  );
}
