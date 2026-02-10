"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Brain, Database, Cloud, Cpu } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { skillsDominant, skillsSupporting, toolingChips, skillsSubtitle } from "@/content/portfolio";

const blockIcons = [Database, Cloud];

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const sectionVariants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
  const stagger = 0.08;

  return (
    <section id="skills" className="section-pad py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeading title="Skills" subtitle={skillsSubtitle} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column: AI Systems Engineering + AI Development Tooling */}
          <div className="flex flex-col gap-6">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ delay: 0, duration: 0.45 }}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(98,224,255,0.1)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-500/20 text-neon-400">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {skillsDominant.title}
                </h3>
              </div>
              <ul className="mt-6 space-y-2">
                {skillsDominant.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    whileInView={reduceMotion ? false : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    className="flex items-baseline gap-2 text-sm text-white/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon-500 mt-1.5" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* AI Development Tooling — left column, second card */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ delay: stagger, duration: 0.45 }}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(98,224,255,0.06)]"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-neon-400">
                  <Cpu className="h-4 w-4" />
                </div>
                <h4 className="text-lg font-semibold text-white">AI Development Tooling</h4>
              </div>
              <ul className="mt-4 space-y-1.5">
                {toolingChips.map((chip, i) => (
                  <motion.li
                    key={chip}
                    initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                    whileInView={reduceMotion ? false : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: stagger + 0.03 * i, duration: 0.28 }}
                    className="flex items-baseline gap-2 text-sm text-white/70"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-white/40 mt-1.5" />
                    {chip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right column: Data & Backend, Cloud */}
          <div className="flex flex-col gap-6">
            {skillsSupporting.map((block, blockIndex) => {
              const Icon = blockIcons[blockIndex] ?? Cloud;
              return (
                <motion.div
                  key={block.title}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  transition={{ delay: stagger * (blockIndex + 1), duration: 0.45 }}
                  className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(98,224,255,0.06)]"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-neon-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">{block.title}</h4>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {block.skills.map((skill, i) => (
                      <motion.li
                        key={skill}
                        initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                        whileInView={reduceMotion ? false : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: stagger * (blockIndex + 1) + 0.03 * i, duration: 0.28 }}
                        className="flex items-baseline gap-2 text-sm text-white/70"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-white/40 mt-1.5" />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
