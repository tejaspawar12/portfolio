"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, Copy, Mic, RotateCcw, Send, Sparkles, Volume2, X } from "lucide-react";
import { profile } from "@/content/portfolio";
import { getTransition } from "@/lib/motion";

const suggestions = [
  "What do you build?",
  "What's your AI stack?",
  "Are you open to full-time roles?",
  "Where are you based?",
  "What's your email?",
  "Share your resume link",
];

type Message = { role: "assistant" | "user"; text: string };

const baseMessages: Message[] = [
  {
    role: "assistant",
    text: `Hi! I'm ${profile.name}'s AI assistant. Ask me about skills, experience, or availability.`,
  },
];

export default function ChatDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const [input, setInput] = useState("");
  const [voiceOn, setVoiceOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(baseMessages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasSentMessage = messages.some((m) => m.role === "user");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!voiceOn) return;
    const last = messages[messages.length - 1];
    if (last?.role !== "assistant") return;
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(last.text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }, [messages, voiceOn]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Request failed");
      }
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, the assistant is unavailable right now. Please try again soon." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
  };

  const handleClearChat = () => {
    setMessages(baseMessages);
  };

  const transition = getTransition(reduceMotion ?? false, "fast");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />

          <motion.aside
            className="absolute right-4 top-4 flex h-[92vh] w-[92vw] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-base-900/90 backdrop-blur-2xl"
            initial={reduceMotion ? false : { x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={getTransition(reduceMotion ?? false, "default")}
            role="dialog"
            aria-label="Chat with AI assistant"
          >
            <div className="relative px-6 pt-5">
              <div className="absolute inset-0 ai-grid opacity-30" />
              <div className="absolute inset-0 scanline" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-neon-400">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{profile.name} AI</p>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Available · Fast replies
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`rounded-full border border-white/10 px-3 py-1 text-xs ${
                      voiceOn ? "bg-neon-500 text-base-900" : "bg-white/5 text-white/70"
                    }`}
                    onClick={() => setVoiceOn((prev) => !prev)}
                    aria-label="Toggle voice output"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    className={`rounded-full border border-white/10 px-3 py-1 text-xs ${
                      micOn ? "bg-emerald-400 text-base-900" : "bg-white/5 text-white/70"
                    }`}
                    onClick={() => setMicOn((prev) => !prev)}
                    aria-label="Toggle voice input"
                  >
                    <Mic className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
                    onClick={onClose}
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-6 pb-4 pt-6"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={`${msg.role}-${index}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={transition}
                >
                  <div
                    className={`relative max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-glass ${
                      msg.role === "user"
                        ? "bg-neon-500 text-base-900"
                        : "bg-white/5 text-white/80"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="chat-markdown max-w-none [&_a]:text-neon-400 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:my-0.5 [&_strong]:font-semibold">
                        <ReactMarkdown
                          components={{
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-neon-400 underline">
                                {children}
                              </a>
                            ),
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="my-0.5">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span>{msg.text}</span>
                    )}
                    {msg.role === "assistant" && (
                      <button
                        type="button"
                        className="absolute right-2 top-2 rounded p-1 text-white/50 hover:text-white/80 hover:bg-white/10"
                        onClick={() => handleCopy(msg.text)}
                        aria-label="Copy message"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading ? (
                <motion.div
                  className="flex justify-start"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={transition}
                >
                  <div className="max-w-[80%] rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/60 shadow-glass">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-neon-500 animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-neon-500 animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-neon-500 animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-6 py-4">
              {hasSentMessage && (
                <div className="mb-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:text-white"
                    onClick={handleClearChat}
                    aria-label="Start over"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Start over
                  </button>
                </div>
              )}
              {!hasSentMessage && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:text-white"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <Sparkles className="h-4 w-4 shrink-0 text-neon-400" />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, stack, or availability..."
                  className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/40 focus:outline-none"
                  aria-label="Message"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-neon-500 p-2 text-base-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neon-400"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-white/40">Powered by AWS Bedrock · Answers from {profile.name}&apos;s knowledge base.</p>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
