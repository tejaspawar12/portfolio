"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ButtonLink } from "../ui/Button";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const observerOptions = useMemo(
    () => ({ rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }),
    []
  );

  useEffect(() => {
    const targets = sections.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [observerOptions]);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-base-900/80 backdrop-blur-xl">
      <nav className="section-pad flex h-16 items-center justify-between">
        <a href="#hero" className="text-sm font-semibold tracking-[0.3em] text-neon-400">
          Tejas Pawar
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-xs uppercase tracking-[0.2em] transition ${
                active === section.id ? "text-neon-400" : "text-white/60 hover:text-white"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
          >
            {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <span className="inline-block h-4 w-4" />}
          </button>
          <ButtonLink href="#contact" variant="primary">
            Let&apos;s Talk
          </ButtonLink>
        </div>

        <button
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/5 bg-base-900/95 md:hidden">
          <div className="section-pad flex flex-col gap-3 py-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className={`text-sm uppercase tracking-[0.2em] ${
                  active === section.id ? "text-neon-400" : "text-white/70"
                }`}
              >
                {section.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <ButtonLink href="#contact" variant="primary">
                Let&apos;s Talk
              </ButtonLink>
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
              >
                {mounted ? (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />) : <span className="inline-block h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
