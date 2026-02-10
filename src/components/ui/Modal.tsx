"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { getTransition } from "@/lib/motion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  layoutId?: string;
  className?: string;
};

export default function Modal({ open, onClose, title, children, layoutId, className = "" }: ModalProps) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={getTransition(reduceMotion, "fast")}
        >
          <motion.div
            layout
            layoutId={layoutId}
            className={`glass relative w-full max-w-2xl rounded-2xl p-6 ${className}`}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={getTransition(reduceMotion, "default")}
          >
            <button
              className="absolute right-4 top-4 text-white/70 hover:text-white"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="mt-4 text-white/80">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
