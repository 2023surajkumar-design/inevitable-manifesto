import { useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

type BezierCurve = [number, number, number, number];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.6, 0, 0.2, 1] },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const fragmentIn: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 24 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
  },
};

export const morphIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, borderRadius: "42% 58% 62% 38% / 42% 42% 58% 58%" },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: "48% 52% 32% 68% / 58% 58% 42% 42%",
    transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] },
  },
};

export const quantumIn: Variants = {
  hidden: { opacity: 0, rotateX: -35, y: 20 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
  },
};

export const phoenixRise: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.92, filter: "hue-rotate(-10deg)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "hue-rotate(0deg)",
    transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] },
  },
};

export const liquidFlow: Variants = {
  hidden: { opacity: 0.4, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 10, ease: [0.6, 0, 0.2, 1], repeat: Infinity, repeatType: "reverse" },
  },
};

export const parallaxConfig = (offset = 60) => ({
  hidden: { y: offset, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
});

export const scrollReveal = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
});

export const scrollProgress = (amount = 0.4): Variants => ({
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { viewport: { amount } },
  },
});

export const easeOrganic: BezierCurve = [0.33, 1, 0.68, 1];
export const easeCosmic: BezierCurve = [0.6, 0, 0.2, 1];
export const easeTranscendent: BezierCurve = [0.19, 1, 0.22, 1];

export const magneticPull = (distance: number, strength = 0.3) =>
  Math.min(distance * strength, 24);

export const cursorFollow = (cursorValue: number, targetValue: number, lag = 0.15) =>
  targetValue + (cursorValue - targetValue) * (1 - lag);

export const glowIntensity = (distance: number, radius = 120) =>
  Math.max(0, 1 - distance / radius);

export const getStaggerDelay = (index: number, base = 0.12) => index * base;
export const getRandomDelay = (min = 0.05, max = 0.35) =>
  Number((Math.random() * (max - min) + min).toFixed(3));

export const getSpringConfig = (stiffness = 220, damping = 26): Transition => ({
  type: "spring",
  stiffness,
  damping,
});

export const shouldReduceMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getOptimizedVariant = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      hidden: variants.hidden ?? { opacity: 0 },
      visible: {
        ...(variants.visible ?? { opacity: 1 }),
        transition: { duration: 0.01 },
      },
    };
  }

  return variants;
};

export const useMotionPreferences = () => {
  const prefersReducedMotion = useReducedMotion();
  return { prefersReducedMotion };
};
