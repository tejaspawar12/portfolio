"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { testimonials } from "@/content/portfolio";
import { getTransition } from "@/lib/motion";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const current = testimonials[index];

  return (
    <section className="section-pad py-20">
      <SectionHeading title="Testimonials" subtitle="What people say" />
      <Card>
        <motion.div
          key={current.name}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(prefersReducedMotion, "fast")}
        >
          <p className="text-lg text-white/80">“{current.quote}”</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm text-neon-400">{current.name}</p>
            {"linkedin" in current && current.linkedin && (
              <a
                href={current.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neon-400 underline hover:text-neon-300"
              >
                LinkedIn
              </a>
            )}
          </div>
          <p className="text-xs text-white/50">{current.title}</p>
        </motion.div>
        {testimonials.length > 1 && (
          <div className="mt-6 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-neon-500" : "bg-white/20"}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}
