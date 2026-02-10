import type { Transition, Variants } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

export const transitions: Record<"default" | "fast" | "slow" | "spring", Transition> = {
  default: { duration: 0.6, ease: easeOut },
  fast: { duration: 0.35, ease: easeOut },
  slow: { duration: 0.9, ease: easeOut },
  spring: { type: "spring", stiffness: 140, damping: 18, mass: 0.8 },
};

export const viewport = { once: true, margin: "-120px" };

export const revealVariants: Record<
  "fadeUp" | "fadeIn" | "slideLeft" | "scaleIn" | "blurIn",
  Variants
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export const staggerContainer: Variants = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function getReveal(reduceMotion: boolean, type: keyof typeof revealVariants) {
  return reduceMotion ? reducedReveal : revealVariants[type];
}

export function getTransition(reduceMotion: boolean, type: keyof typeof transitions) {
  return reduceMotion ? { duration: 0.01 } : transitions[type];
}

export function getInViewProps(reduceMotion: boolean) {
  return reduceMotion
    ? { initial: false, whileInView: undefined, viewport: undefined }
    : { initial: "hidden", whileInView: "show", viewport };
}
