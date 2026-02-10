"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { featuredProject } from "@/content/portfolio";
import {
  Dumbbell,
  MessageCircle,
  BarChart3,
  Calendar,
  FileText,
  User,
  WifiOff,
  Smartphone,
  Server,
  Github,
  ExternalLink,
  Sparkles,
  Check,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import { getInViewProps, getReveal, getTransition, staggerContainer } from "@/lib/motion";

const featureIcons = [
  Dumbbell,
  MessageCircle,
  BarChart3,
  Calendar,
  FileText,
  User,
  WifiOff,
  Smartphone,
  Server,
];

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const inView = getInViewProps(reduceMotion);
  const transition = getTransition(reduceMotion ?? false, "default");

  return (
    <section id="projects" className="section-pad py-20">
      <SectionHeading title="Featured Project" subtitle="Case Study" />

      {/* Hero / Project card */}
      <motion.div
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-base-800/90 via-base-900 to-neon-500/5 p-8 shadow-2xl backdrop-blur-sm md:p-10"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={transition}
      >
        <div className="absolute inset-0 ai-grid opacity-20" />
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-neon-500/15 blur-3xl transition group-hover:bg-neon-500/25" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative z-10">
          <motion.span
            className="inline-block rounded-full border border-neon-500/30 bg-neon-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neon-400"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 }}
          >
            Live on Railway
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.15 }}
          >
            {featuredProject.name}
          </motion.h2>
          <motion.p
            className="mt-3 text-lg text-neon-400"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.2 }}
          >
            {featuredProject.tagline}
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.25 }}
          >
            {featuredProject.summary}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.35 }}
          >
            <a
              href={featuredProject.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-neon-500 px-5 py-3 text-sm font-semibold text-base-900 transition hover:bg-neon-400 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:ring-offset-2 focus:ring-offset-base-900"
            >
              <ExternalLink className="h-4 w-4" />
              Live app
            </a>
            <a
              href={featuredProject.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:border-neon-500/50 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-base-900"
            >
              <Github className="h-4 w-4" />
              Source code
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Problem & Solution */}
      <motion.div
        className="mt-12 grid gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          variants={getReveal(reduceMotion ?? false, "fadeUp")}
          transition={getTransition(reduceMotion ?? false, "fast")}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-400">Problem</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{featuredProject.problem}</p>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          variants={getReveal(reduceMotion ?? false, "fadeUp")}
          transition={getTransition(reduceMotion ?? false, "fast")}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-400">Solution</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{featuredProject.solution}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {featuredProject.solutionBullets.map((bullet) => (
              <li key={bullet.slice(0, 40)} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Features grid */}
      <motion.div
        className="mt-14"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/60">
          What it does
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProject.features.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <motion.div
                key={feature.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-neon-500/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-neon-500/5"
                variants={getReveal(reduceMotion ?? false, "blurIn")}
                transition={getTransition(reduceMotion ?? false, "fast")}
              >
                <div className="flex items-center gap-3 text-neon-400">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-500/20">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/70">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Tech stack */}
      <motion.div
        className="mt-14 rounded-2xl border border-white/10 bg-base-800/50 p-6 backdrop-blur-sm md:p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/60">
          <Terminal className="h-4 w-4 text-neon-400" />
          Built with
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-base-900/80 p-4">
            <div className="flex items-center gap-2 text-neon-400">
              <Server className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Backend</span>
            </div>
            <p className="mt-3 font-mono text-xs leading-relaxed text-white/80">
              {featuredProject.techStack.backend}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-base-900/80 p-4">
            <div className="flex items-center gap-2 text-neon-400">
              <Layers className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Frontend</span>
            </div>
            <p className="mt-3 font-mono text-xs leading-relaxed text-white/80">
              {featuredProject.techStack.frontend}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-base-900/80 p-4">
            <div className="flex items-center gap-2 text-neon-400">
              <Cpu className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Infrastructure</span>
            </div>
            <p className="mt-3 font-mono text-xs leading-relaxed text-white/80">
              {featuredProject.techStack.infrastructure}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Why it stands out */}
      <motion.div
        className="mt-14 rounded-2xl border border-neon-500/20 bg-gradient-to-br from-neon-500/5 to-transparent p-6 md:p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-neon-400">
          <Sparkles className="h-4 w-4" />
          Why it stands out
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {featuredProject.highlights.map((highlight) => (
            <li
              key={highlight.slice(0, 50)}
              className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/85"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA footer */}
      <motion.div
        className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 py-8 text-center"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <p className="max-w-lg px-4 text-sm text-white/80">{featuredProject.ctaLine}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={featuredProject.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-neon-500 px-5 py-2.5 text-sm font-semibold text-base-900 transition hover:bg-neon-400"
          >
            <ExternalLink className="h-4 w-4" />
            Try live app
          </a>
          <a
            href={featuredProject.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-neon-500/50 hover:text-white"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
