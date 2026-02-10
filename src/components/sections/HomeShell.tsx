"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ChatDrawer from "@/components/ui/ChatDrawer";
import { profile } from "@/content/portfolio";

export default function HomeShell() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
      {/* Tejas AI — fixed bottom-right, opens chat on click; stays visible on scroll */}
      {!chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <span className="rounded-lg border border-white/15 bg-base-800/90 px-3 py-2 text-xs font-medium text-white/90 shadow-lg backdrop-blur-sm">
            Talk with Tejas AI
          </span>
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-base-800 shadow-lg ring-2 ring-neon-500/30 transition hover:scale-105 hover:border-neon-500/50 hover:ring-neon-500/50 focus:outline-none focus:ring-2 focus:ring-neon-500"
            aria-label="Open Tejas AI chat"
          >
            <span className="relative block h-full w-full">
              <Image
                src={profile.avatarUrl}
                alt=""
                fill
                sizes="56px"
                className="object-cover object-top"
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
