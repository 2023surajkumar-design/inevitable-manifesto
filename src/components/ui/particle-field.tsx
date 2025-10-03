import * as React from "react";

import { cn } from "@/lib/utils";
import { useMotionPreferences } from "@/utils/animations";

type ParticleMode = "constellation" | "cosmic" | "phoenix" | "quantum";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  life: number;
  seed: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type ParticleFieldProps = {
  /** Total number of particles rendered. */
  count?: number;
  /** Visual mode controlling behaviour + styling. */
  mode?: ParticleMode;
  /** Base color or gradient array for particles. */
  color?: string | string[];
  /** Enable pointer interaction forces. */
  interactive?: boolean;
  /** Max connection distance (constellation mode). */
  connectionDistance?: number;
  /** Strength of scroll velocity influence. */
  scrollInfluence?: number;
  /** Automatically scale particle count on resize. */
  responsive?: boolean;
  /** Additional class name for wrapper element. */
  className?: string;
  /** Canvas opacity override. */
  opacity?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const defaultColors = [
  "hsl(var(--cosmic-dawn))",
  "hsl(var(--quantum-violet))",
  "hsl(var(--phoenix-red))",
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const devicePixelRatioSafe = typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 2);

const toRgba = (input: string, alpha: number) => {
  if (/^hsl/i.test(input)) {
    return input.replace(/hsl/i, "hsla").replace(/\)$/i, `, ${alpha})`);
  }
  if (/^rgb/i.test(input)) {
    return input.replace(/rgb/i, "rgba").replace(/\)$/i, `, ${alpha})`);
  }
  if (/^#[0-9a-f]{3,8}$/i.test(input)) {
    const hex = input.replace("#", "");
    const bigint = parseInt(hex.length === 3 ? hex.repeat(2) : hex.slice(0, 6), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return input;
};

export const ParticleField = React.forwardRef<HTMLDivElement, ParticleFieldProps>(
  (
    {
      count = 260,
      mode = "constellation",
      color,
      interactive = true,
      connectionDistance = 140,
      scrollInfluence = 0.25,
      responsive = true,
      className,
      opacity = 0.7,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const particlesRef = React.useRef<Particle[]>([]);
    const frameRef = React.useRef<number>();
  const scrollVelocityRef = React.useRef(0);
  const lastScrollYRef = React.useRef<number>(typeof window === "undefined" ? 0 : window.scrollY);
    const pointerRef = React.useRef<PointerState>({ x: 0, y: 0, active: false });
    const lastTimestampRef = React.useRef<number | null>(null);

    React.useImperativeHandle(forwardedRef, () => wrapperRef.current);

    const { prefersReducedMotion } = useMotionPreferences();

    const palette = React.useMemo(() => {
      if (!color) return defaultColors;
      if (Array.isArray(color)) return color.length ? color : defaultColors;
      return [color];
    }, [color]);

    const spawnParticle = React.useCallback(
      (width: number, height: number): Particle => {
        const hueSeed = palette[Math.floor(Math.random() * palette.length)];
        const hue = hueSeed.startsWith("hsl") ? hueSeed : `rgba(${hueSeed})`;
        const baseSize = rand(0.6, 2.6);
        const baseOpacity = rand(0.35, 0.85);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.4, 0.4),
          vy: rand(-0.3, 0.3),
          size: baseSize,
          baseSize,
          opacity: baseOpacity,
          baseOpacity,
          hue: Math.random(),
          life: rand(0.6, 1),
          seed: Math.random(),
        };
      },
      [palette],
    );

    const resizeCanvas = React.useCallback(() => {
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      if (!canvas || !wrapper) return;

      const { width, height } = wrapper.getBoundingClientRect();
      const dpr = devicePixelRatioSafe;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const targetCount = responsive ? Math.floor(count * (width * height) / (1440 * 900)) || count : count;

      const particles = particlesRef.current;
      if (particles.length > targetCount) {
        particles.splice(targetCount, particles.length - targetCount);
      } else {
        while (particles.length < targetCount) {
          particles.push(spawnParticle(canvas.width, canvas.height));
        }
      }
    }, [count, responsive, spawnParticle]);

    const handlePointer = React.useCallback(
      (event: PointerEvent) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        pointerRef.current = {
          x: (event.clientX - rect.left) * devicePixelRatioSafe,
          y: (event.clientY - rect.top) * devicePixelRatioSafe,
          active: true,
        };
      },
      [],
    );

    const resetPointer = React.useCallback(() => {
      pointerRef.current.active = false;
    }, []);

    const handleScroll = React.useCallback(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      scrollVelocityRef.current = clamp(scrollVelocityRef.current + delta * 0.003, -1.6, 1.6);
      lastScrollYRef.current = currentY;
    }, []);

    const drawParticles = React.useCallback(
      (ctx: CanvasRenderingContext2D) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = devicePixelRatioSafe;
        const width = canvas.width;
        const height = canvas.height;
        const pointer = pointerRef.current;

        ctx.clearRect(0, 0, width, height);

        const particles = particlesRef.current;
        const scrollVelocity = scrollVelocityRef.current;

        for (let i = 0; i < particles.length; i += 1) {
          const particle = particles[i];

          const pointerDX = pointer.x - particle.x;
          const pointerDY = pointer.y - particle.y;
          const pointerDistance = Math.sqrt(pointerDX * pointerDX + pointerDY * pointerDY);

          if (interactive && pointer.active) {
            const influenceRadius = mode === "phoenix" ? 180 * dpr : 140 * dpr;
            if (pointerDistance < influenceRadius) {
              const force = (1 - pointerDistance / influenceRadius) * (mode === "constellation" ? 0.8 : 1.2);
              const angle = Math.atan2(pointerDY, pointerDX);
              if (mode === "quantum") {
                particle.vx += Math.sin(angle * 3 + particle.seed * 6) * force * 0.9;
                particle.vy += Math.cos(angle * 3 + particle.seed * 4) * force * 0.9;
              } else {
                particle.vx += Math.cos(angle) * force * (mode === "phoenix" ? 1.6 : 1.1);
                particle.vy += Math.sin(angle) * force * (mode === "phoenix" ? 1.6 : 1.1);
              }
            }
          }

          // Apply scroll influence and slight noise drift
          particle.vy += scrollVelocity * scrollInfluence;
          particle.vx += (Math.random() - 0.5) * 0.02;
          particle.vy += (Math.random() - 0.5) * 0.02;

          particle.x += particle.vx;
          particle.y += particle.vy;

          if (mode === "phoenix") {
            particle.life -= 0.0025;
            if (particle.life <= 0) {
              const newborn = spawnParticle(width, height);
              newborn.y = height + newborn.size * 10;
              newborn.vy = rand(-1.4, -0.4);
              particles[i] = newborn;
              continue;
            }
            particle.opacity = clamp(particle.baseOpacity * (1.2 - particle.life), 0.15, 1);
            particle.size = particle.baseSize * (1.3 - particle.life * 0.3);
          } else {
            particle.life -= 0.0003;
            if (particle.life <= 0) {
              particles[i] = spawnParticle(width, height);
              continue;
            }
            particle.opacity = clamp(particle.baseOpacity + Math.sin(performance.now() * 0.0008 + particle.seed * 12) * 0.2, 0.1, 1);
            particle.size = clamp(particle.baseSize + Math.sin(performance.now() * 0.0006 + particle.seed * 8) * 0.65, 0.4, 4);
          }

          // Boundary handling (wrap around for cosmic/quantum, bounce for constellation)
          if (mode === "constellation") {
            if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
            if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;
          } else {
            if (particle.x < -10) particle.x = width + 10;
            if (particle.x > width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = height + 10;
            if (particle.y > height + 10) particle.y = -10;
          }

          ctx.beginPath();
          const fill = palette[Math.floor(particle.hue * palette.length)] ?? palette[0];
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 6);
          gradient.addColorStop(0, toRgba(fill, mode === "phoenix" ? 0.95 : 0.8));
          gradient.addColorStop(1, toRgba(fill, 0));
          ctx.fillStyle = gradient;

          if (mode === "quantum") {
            ctx.globalCompositeOperation = "lighter";
            ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2);
            ctx.globalCompositeOperation = "source-over";
          } else {
            ctx.globalAlpha = particle.opacity;
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }

        if (mode === "constellation" || mode === "quantum") {
          for (let i = 0; i < particles.length; i += 1) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j += 1) {
              const b = particles[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              const threshold = mode === "quantum" ? connectionDistance * 0.8 : connectionDistance;
              if (dist < threshold) {
                const alpha = (1 - dist / threshold) * (mode === "quantum" ? 0.35 : 0.2);
                ctx.beginPath();
                ctx.strokeStyle = toRgba(palette[0] ?? defaultColors[0], alpha);
                ctx.lineWidth = mode === "quantum" ? 0.8 : 0.5;
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
        }
      },
      [connectionDistance, interactive, mode, palette, scrollInfluence, spawnParticle],
    );

    const animate = React.useCallback(
      (timestamp: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (lastTimestampRef.current != null) {
          scrollVelocityRef.current *= 0.92;
        }
        lastTimestampRef.current = timestamp;

        drawParticles(ctx);
        frameRef.current = requestAnimationFrame(animate);
      },
      [drawParticles],
    );

    React.useEffect(() => {
      if (prefersReducedMotion) {
        return;
      }

      resizeCanvas();
      frameRef.current = requestAnimationFrame(animate);

      const onResize = () => resizeCanvas();
      window.addEventListener("resize", onResize);

      if (interactive) {
        window.addEventListener("pointermove", handlePointer, { passive: true });
        window.addEventListener("pointerleave", resetPointer, { passive: true });
      }

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        window.removeEventListener("resize", onResize);
        if (interactive) {
          window.removeEventListener("pointermove", handlePointer);
          window.removeEventListener("pointerleave", resetPointer);
        }
        window.removeEventListener("scroll", handleScroll);
      };
    }, [animate, handlePointer, handleScroll, interactive, prefersReducedMotion, resetPointer, resizeCanvas]);

    if (prefersReducedMotion) {
      return (
        <div
          ref={(node) => {
            wrapperRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={cn("pointer-events-none absolute inset-0", className)}
          style={{
            background: `radial-gradient(circle at 50% 40%, ${palette[0]}, transparent 60%)`,
            opacity,
            ...style,
          }}
          {...rest}
        />
      );
    }

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{ opacity, ...style }}
        {...rest}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    );
  },
);

ParticleField.displayName = "ParticleField";

export default ParticleField;
