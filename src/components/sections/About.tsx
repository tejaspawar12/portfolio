"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Layers, Code, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { aboutOverview, aboutSpotlight } from "@/content/portfolio";
import Link from "next/link";


export default function About() {
  const reduceMotion = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlightStyle, setSpotlightStyle] = useState({ "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties);

  useEffect(() => {
    if (reduceMotion || !spotlightRef.current) return;
    const el = spotlightRef.current;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlightStyle({ "--spot-x": `${x}%`, "--spot-y": `${y}%` } as React.CSSProperties);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };
  const stagger = reduceMotion ? 0 : 0.08;

  return (
    <section id="about" className="section-pad py-20">
      <SectionHeading title="About" subtitle="Overview" />

      <motion.div
        className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left: Profile Overview (60%) */}
        <motion.div
          className="flex flex-col gap-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.06 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45 }}
            className="glass rounded-2xl p-6 transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-glow hover:shadow-[0_0_28px_rgba(98,224,255,0.15)]"
          >
            <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
              <motion.h3 variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className="text-lg font-semibold text-white">{aboutOverview.title}</motion.h3>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
                className="mt-3 text-sm leading-relaxed text-white/70"
              >
                {aboutOverview.intro}
              </motion.p>

            <div className="mt-6 space-y-5 border-t border-white/10 pt-5">
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }}>
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neon-400">
                  <Check className="h-4 w-4" />
                  Core strengths
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                  {aboutOverview.coreStrengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }}>
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neon-400">
                  <Code className="h-4 w-4" />
                  Tech I work with
                </p>
                <ul className="mt-2 space-y-2 text-sm text-white/70">
                  {aboutOverview.tech.map((t, i) => (
                    <li key={i}>
                      <span className="font-medium text-white/90">{t.label}:</span> {t.items}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }}>
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neon-400">
                  <Layers className="h-4 w-4" />
                  What I&apos;m looking for
                </p>
                <p className="mt-2 text-sm text-white/70">{aboutOverview.lookingFor}</p>
              </motion.div>
            </div>

            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/50">
              <MapPin className="h-3.5 w-3.5 text-neon-400" />
              Location: {aboutOverview.locationLine}
            </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Flagship spotlight (40%) */}
        <div className="flex flex-col gap-4">
          {/* Flagship card with gradient border + mouse spotlight */}
          <motion.div
            ref={spotlightRef}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            transition={{ delay: stagger * 2, duration: 0.45 }}
            className="relative overflow-hidden rounded-2xl p-[1px] transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-glow bg-[length:200%_200%]"
            style={{
              background: "linear-gradient(110deg, rgba(124,247,255,0.25), rgba(52,211,153,0.2), rgba(124,247,255,0.2), rgba(124,247,255,0.25))",
              ...(reduceMotion ? {} : { animation: "gradientBorder 10s ease infinite" }),
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12] transition-opacity duration-300"
              style={{
                background: `radial-gradient(400px circle at ${spotlightStyle["--spot-x"]} ${spotlightStyle["--spot-y"]}, rgba(124,247,255,0.35), transparent 60%)`,
              }}
            />
            <div className="relative rounded-2xl bg-base-800/95 p-6 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-neon-400">{aboutSpotlight.badge}</p>
              <h4 className="mt-2 text-xl font-semibold text-white">{aboutSpotlight.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {aboutSpotlight.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-500" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={aboutSpotlight.caseStudyHref}
                  className="rounded-full bg-neon-500 px-4 py-2 text-sm font-medium text-base-900 transition hover:bg-neon-400"
                >
                  View Case Study
                </Link>
                <Link
                  href={aboutSpotlight.architectureHref}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-neon-500/50 hover:text-white"
                >
                  Architecture
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stack used */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ delay: stagger * 3, duration: 0.45 }}
            className="glass rounded-2xl px-5 py-4 transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(98,224,255,0.1)]"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-white/60">Stack used in this project</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {aboutSpotlight.stackChips.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  whileInView={reduceMotion ? false : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Key capabilities */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ delay: stagger * 4, duration: 0.45 }}
            className="glass rounded-2xl px-5 py-4 transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(98,224,255,0.1)]"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-white/60">{aboutSpotlight.capabilitiesTitle}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/70">
              {aboutSpotlight.capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 shrink-0 text-neon-400" />
                  {cap}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
