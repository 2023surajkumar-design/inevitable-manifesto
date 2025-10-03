import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

type ScrollProgressCallbacks = {
  onSectionEnter?: (sectionId: string) => void;
  onSectionLeave?: (sectionId: string) => void;
  onScrollThreshold?: (progress: number) => void;
};

export type UseScrollProgressOptions = ScrollProgressCallbacks & {
  sectionSelectors?: string[];
  thresholds?: number[];
};

export type ScrollProgressReturn = {
  scrollProgress: number;
  currentSection: string | null;
  sectionProgress: number;
  direction: ScrollDirection;
};

const DEFAULT_THRESHOLD = [0.1, 0.5, 0.9];

export const useScrollProgress = (options: UseScrollProgressOptions = {}): ScrollProgressReturn => {
  const { onSectionEnter, onSectionLeave, onScrollThreshold, sectionSelectors = [], thresholds = DEFAULT_THRESHOLD } = options;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [direction, setDirection] = useState<ScrollDirection>("down");

  const lastScrollTopRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  const getSections = useCallback(() => {
    if (typeof document === "undefined") return [];
    if (sectionSelectors.length === 0) {
      return Array.from(document.querySelectorAll<HTMLElement>("section[data-section-id]"));
    }
    const nodes = sectionSelectors
      .map((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)))
      .flat();
    return nodes;
  }, [sectionSelectors]);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const { scrollY, innerHeight } = window;
    const docHeight = document.body.scrollHeight - innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;
    const bounded = Number(Math.min(Math.max(progress, 0), 1).toFixed(4));

    setScrollProgress(bounded);

    if (onScrollThreshold) {
      thresholds.forEach((threshold) => {
        if (Math.abs(bounded - threshold) < 0.005) {
          onScrollThreshold(threshold);
        }
      });
    }

    const directionValue: ScrollDirection = scrollY > lastScrollTopRef.current ? "down" : "up";
    if (directionValue !== direction) {
      setDirection(directionValue);
    }
    lastScrollTopRef.current = scrollY;
  }, [direction, onScrollThreshold, thresholds]);

  const updateSectionProgress = useCallback(() => {
    if (!currentSection) {
      setSectionProgress(0);
      return;
    }

    const element = document.getElementById(currentSection);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const start = viewportHeight;
    const end = -rect.height;
    const current = rect.bottom;
    const progress = (start - current) / (start - end || 1);
    setSectionProgress(Number(Math.min(Math.max(progress, 0), 1).toFixed(3)));
  }, [currentSection]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    sectionsRef.current = getSections();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section-id") ?? entry.target.id;
          if (!id) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setCurrentSection(id);
            onSectionEnter?.(id);
          } else if (!entry.isIntersecting && currentSection === id) {
            onSectionLeave?.(id);
          }
        });
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -40% 0px" },
    );

    sectionsRef.current.forEach((section) => observerRef.current?.observe(section));

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionsRef.current.forEach((section) => observerRef.current?.unobserve(section));
      observerRef.current?.disconnect();
    };
  }, [currentSection, getSections, handleScroll, onSectionEnter, onSectionLeave]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => updateSectionProgress();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [updateSectionProgress]);

  return { scrollProgress, currentSection, sectionProgress, direction };
};
