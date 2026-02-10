import { profile } from "@/content/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="section-pad border-t border-white/5 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-white/60">© 2026 {profile.name}. All rights reserved.</p>
          <p className="text-xs text-white/40">Built with Next.js + Tailwind + Framer Motion.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <a href="#hero" className="hover:text-neon-400">
            Back to top <ArrowUpRight className="inline h-3 w-3" />
          </a>
          <a href="#projects" className="hover:text-neon-400">Projects</a>
          <a href="#contact" className="hover:text-neon-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}
