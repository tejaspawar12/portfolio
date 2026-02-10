"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { profile } from "@/content/portfolio";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    toast.success("Opening your email client...");
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-pad py-20">
      <SectionHeading title="Contact" subtitle="Let’s build" />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="w-full rounded-xl border border-white/10 bg-base-800 px-4 py-3 text-sm text-white/80"
                aria-label="Name"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full rounded-xl border border-white/10 bg-base-800 px-4 py-3 text-sm text-white/80"
                aria-label="Email"
              />
            </div>
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="h-32 w-full rounded-xl border border-white/10 bg-base-800 px-4 py-3 text-sm text-white/80"
              aria-label="Message"
            />
            <button
              type="submit"
              className="rounded-full bg-neon-500 px-6 py-3 text-sm font-semibold text-base-900"
            >
              Send message
            </button>
          </form>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Let’s connect</h3>
          <p className="mt-3 text-sm text-white/70">
            Prefer social channels? I’m always open to collaboration, mentorship, and interesting product ideas.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            {profile.socials.map((social) => {
              const Icon =
                social.icon === "github"
                  ? Github
                  : social.icon === "linkedin"
                  ? Linkedin
                  : social.icon === "website"
                  ? Globe
                  : Mail;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-2 text-white/70 hover:text-neon-400"
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
