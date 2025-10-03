import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { shouldReduceMotion } from "@/utils/animations";

export type CursorGlowOptions = {
  lagAmount?: number;
  glowSize?: number;
  enabled?: boolean;
};

export type CursorGlowReturn = {
  cursorPosition: { x: number; y: number };
  glowIntensity: number;
  glowColor: string;
  isVisible: boolean;
};

const DEFAULT_COLORS = [
  "hsla(var(--cosmic-dawn) / 0.35)",
  "hsla(var(--quantum-violet) / 0.35)",
  "hsla(var(--phoenix-red) / 0.35)",
];

export const useCursorGlow = (options: CursorGlowOptions = {}): CursorGlowReturn => {
  const { lagAmount = 0.15, glowSize = 220, enabled = true } = options;

  const frameRef = useRef<number | null>(null);
  const lastPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const visibleRef = useRef(false);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [glowColor, setGlowColor] = useState(DEFAULT_COLORS[0]);
  const [isVisible, setIsVisible] = useState(false);

  const prefersReducedMotion = shouldReduceMotion();
  const isTouchDevice = useMemo(() => typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches, []);

  const active = enabled && !prefersReducedMotion && !isTouchDevice;

  const calculateGlowColor = useCallback((x: number, y: number) => {
    if (!active) return DEFAULT_COLORS[0];

    const { innerWidth, innerHeight } = window;
    const xRatio = x / innerWidth;
    const yRatio = y / innerHeight;
    const colorIndex = Math.min(
      DEFAULT_COLORS.length - 1,
      Math.floor((xRatio + yRatio) * (DEFAULT_COLORS.length - 1)),
    );
    return DEFAULT_COLORS[colorIndex];
  }, [active]);

  const updateCursor = useCallback(
    (event: MouseEvent) => {
      if (!active) return;

      const { clientX, clientY } = event;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
        setCursorPosition({ x: clientX, y: clientY });
        lastPositionRef.current = { x: clientX, y: clientY };
        return;
      }

      const loop = () => {
        const last = lastPositionRef.current;
        const nextX = last.x + (clientX - last.x) * (1 - lagAmount);
        const nextY = last.y + (clientY - last.y) * (1 - lagAmount);

        lastPositionRef.current = { x: nextX, y: nextY };
        setCursorPosition({ x: nextX, y: nextY });

        const dx = clientX - nextX;
        const dy = clientY - nextY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const intensity = Math.max(0, 1 - distance / glowSize);

        setGlowIntensity(Number(intensity.toFixed(3)));
        setGlowColor(calculateGlowColor(nextX, nextY));

        if (Math.abs(nextX - clientX) > 0.5 || Math.abs(nextY - clientY) > 0.5) {
          frameRef.current = requestAnimationFrame(loop);
        } else {
          lastPositionRef.current = { x: clientX, y: clientY };
          setCursorPosition({ x: clientX, y: clientY });
          setGlowIntensity(1);
          setGlowColor(calculateGlowColor(clientX, clientY));
          frameRef.current = null;
        }
      };

      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(loop);
      }
    },
    [active, lagAmount, glowSize, calculateGlowColor],
  );

  useEffect(() => {
    if (!active) {
      setIsVisible(false);
      return;
    }

    let lastActivity = Date.now();

    const handleMouseMove = (event: MouseEvent) => {
      lastActivity = Date.now();
      updateCursor(event);
    };

    const handleVisibility = () => {
      const now = Date.now();
      if (now - lastActivity > 4000) {
        visibleRef.current = false;
        setIsVisible(false);
      } else if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const visibilityInterval = window.setInterval(handleVisibility, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.clearInterval(visibilityInterval);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [active, updateCursor]);

  useEffect(() => {
    if (!active) {
      setGlowIntensity(0);
    }
  }, [active]);

  return { cursorPosition, glowIntensity, glowColor, isVisible: active && isVisible };
};
