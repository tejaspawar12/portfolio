"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Briefcase, Clock, Download, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "../ui/Button";
import { profile } from "@/content/portfolio";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    const parallax = parallaxRef.current;
    if (!container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--spot-x", `${x}%`);
      container.style.setProperty("--spot-y", `${y}%`);

      if (parallax) {
        const tiltX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
        const tiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        parallax.style.setProperty("--tilt-x", `${tiltX}deg`);
        parallax.style.setProperty("--tilt-y", `${tiltY}deg`);
      }
    };

    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  return (
    <section id="hero" className="relative overflow-hidden pt-32">
      <div ref={containerRef} className="relative section-pad pb-20">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute inset-0 -z-10 noise-bg" />
        <div className="absolute inset-0 -z-10 gradient-spotlight animate-pulseGlow" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">{profile.focusAreas}</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl lg:text-6xl">
              {profile.name}
              <span className="block text-neon-400">{profile.title}</span>
            </h1>
            {profile.subRoles?.length > 0 && (
              <p className="mt-2 text-lg text-white/60 sm:text-xl">
                {profile.subRoles.join(" · ")}
              </p>
            )}
            <p className="mt-4 text-base text-white/70 sm:text-lg">{profile.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
              {profile.highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="#projects" variant="primary">
                View Case Study <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={profile.resumeUrl} variant="outline">
                Resume (PDF) <Download className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={`mailto:${profile.email}`} variant="ghost">
                Email Me <Mail className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <span className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-neon-400" />
                {profile.location}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase className="h-3 w-3 text-neon-400" />
                {profile.openTo}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-neon-400" />
                {profile.timezone}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div
              ref={parallaxRef}
              className="glass relative flex flex-col items-center gap-5 rounded-3xl p-8 text-center"
              style={{
                transform: prefersReducedMotion ? "none" : "perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                transition: "transform 0.15s ease",
              }}
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-neon-500/30 via-white/5 to-emerald-400/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-base-800/80">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={profile.avatarUrl}
                      alt={`${profile.name} avatar`}
                      fill
                      sizes="(max-width: 1024px) 70vw, 360px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-neon-400">Portfolio</p>
                <p className="text-sm text-white/80">{profile.availability}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                  <MapPin className="h-3 w-3" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex flex-col items-center gap-1 pt-1 text-xs text-white/60">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 transition hover:text-neon-400"
                  >
                    <Mail className="h-3 w-3" />
                    {profile.email}
                  </a>
                  <a
                    href="tel:+13024442983"
                    className="flex items-center gap-2 transition hover:text-neon-400"
                  >
                    <Phone className="h-3 w-3" />
                    +1 (302) 444-2983
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-neon-500/30 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-indigo-500/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
