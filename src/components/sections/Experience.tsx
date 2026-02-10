"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { experience } from "@/content/portfolio";
import { getInViewProps, getReveal, getTransition, staggerContainer } from "@/lib/motion";

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const inView = getInViewProps(reduceMotion);
  return (
    <section id="experience" className="section-pad py-20">
      <SectionHeading title="Experience" subtitle="Timeline" />
      <motion.div className="relative space-y-8 border-l border-white/10 pl-6" variants={staggerContainer} {...inView}>
        {experience.map((item) => (
          <motion.div
            key={`${item.role}-${item.company}`}
            variants={getReveal(reduceMotion, "slideLeft")}
            transition={getTransition(reduceMotion, "fast")}
            className="relative"
          >
            <span className="absolute -left-[30px] top-1 h-3 w-3 rounded-full bg-neon-500 shadow-glow" />
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{item.role}</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">{item.period}</span>
              </div>
              <p className="mt-2 text-sm text-neon-400">{item.company}</p>
              {item.location && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {item.location}
                </p>
              )}
              <p className="mt-3 text-sm text-white/70">{item.summary}</p>
              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                  {item.highlights.slice(0, 4).map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-500/80" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
