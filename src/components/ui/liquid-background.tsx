import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { useMotionPreferences, easeOrganic } from "@/utils/animations";

type LiquidBackgroundProps = {
  /** Array of color values used to generate liquid layers. */
  colors?: string[];
  /** Visual intensity mapped to displacement strength and blur. */
  intensity?: "subtle" | "medium" | "intense";
  /** Duration (in seconds) of one full morph cycle. */
  speed?: number;
  /** Enables pointer-reactive gradients and motion. */
  interactive?: boolean;
  /** Optional noise seed for deterministic turbulence. */
  noiseSeed?: number;
  /** Additional class name overrides. */
  className?: string;
  /** Children rendered above the liquid layers. */
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const defaultColors = [
  "hsl(var(--phoenix-red))",
  "hsl(var(--renaissance-gold))",
  "hsl(var(--cosmic-dawn))",
];

const intensityToScale = {
  subtle: 22,
  medium: 34,
  intense: 48,
} as const;

const intensityToSize = {
  subtle: "70%",
  medium: "95%",
  intense: "120%",
} as const;

const intensityToBlur = {
  subtle: "45px",
  medium: "65px",
  intense: "90px",
} as const;

const baseFrequencyMap = {
  subtle: 0.005,
  medium: 0.008,
  intense: 0.012,
} as const;

const layerOffsets = [
  { x: [-16, 14], y: [-10, 18] },
  { x: [12, -18], y: [20, -14] },
  { x: [-10, 8], y: [18, -22] },
];

export const LiquidBackground = React.forwardRef<HTMLDivElement, LiquidBackgroundProps>(
  (
    {
      colors = defaultColors,
      intensity = "medium",
      speed = 12,
      interactive = false,
      noiseSeed = 12,
      className,
      children,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(forwardedRef, () => containerRef.current);

    const assignRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

  const filterId = React.useId();
  const noiseId = React.useId();

    const { prefersReducedMotion } = useMotionPreferences();

    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const smoothX = useSpring(pointerX, { stiffness: 60, damping: 18 });
    const smoothY = useSpring(pointerY, { stiffness: 60, damping: 18 });

    React.useEffect(() => {
      const node = containerRef.current;
      if (!interactive || !node || prefersReducedMotion) {
        return;
      }

      let frame: number | null = null;

      const handlePointer = (event: PointerEvent) => {
        if (!node) return;
        const update = () => {
          const rect = node.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          pointerX.set(Math.min(Math.max(x, 0), 1));
          pointerY.set(Math.min(Math.max(y, 0), 1));
        };

        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      };

      const resetPointer = () => {
        pointerX.set(0.5);
        pointerY.set(0.5);
      };

  window.addEventListener("pointermove", handlePointer);
  window.addEventListener("pointerleave", resetPointer);

      return () => {
        if (frame) cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", handlePointer);
        window.removeEventListener("pointerleave", resetPointer);
      };
    }, [interactive, pointerX, pointerY, prefersReducedMotion]);

    React.useEffect(() => {
      const node = containerRef.current;
      if (!node) return;
      node.style.setProperty("--pointer-x", "50%");
      node.style.setProperty("--pointer-y", "50%");
    }, []);

    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

    const gradientCenterX = useTransform(smoothX, [0, 1], [10, 90]);
    const gradientCenterY = useTransform(smoothY, [0, 1], [12, 88]);
    const gradientBackground = useMotionTemplate`radial-gradient(circle at ${gradientCenterX}% ${gradientCenterY}%, ${
      colors[0]
    }, transparent 65%)`;

    const motionStyles = React.useMemo(
      () => ({
        filter: `url(#${filterId})`,
        mixBlendMode: "screen" as const,
        opacity: 0.75,
        width: intensityToSize[intensity],
        height: intensityToSize[intensity],
        borderRadius: "50%",
        boxShadow: `0 0 ${intensityToBlur[intensity]} ${colors[0] ?? "rgba(255,255,255,0.2)"}`,
      }),
      [colors, filterId, intensity],
    );

    if (prefersReducedMotion) {
      return (
        <div
          ref={assignRef}
          className={cn("relative isolate overflow-hidden", className)}
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors[0]}, transparent 55%), radial-gradient(circle at 70% 60%, ${
              colors[1] ?? colors[0]
            }, transparent 60%)`,
            ...style,
          }}
          {...rest}
        >
          <div className="absolute inset-0 bg-black/10 mix-blend-soft-light" />
          <div className="relative z-[1]">{children}</div>
        </div>
      );
    }

    return (
      <div
        ref={assignRef}
        className={cn("relative isolate overflow-hidden", className)}
        style={{
          "--pointer-x": "50%",
          "--pointer-y": "50%",
          ...style,
        } as React.CSSProperties}
        {...rest}
      >
        <svg className="pointer-events-none absolute h-0 w-0">
          <defs>
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequencyMap[intensity]}
                numOctaves={3}
                seed={noiseSeed}
                result="turbulence"
              >
                <animate
                  attributeName="baseFrequency"
                  dur={`${speed}s`}
                  values={`${baseFrequencyMap[intensity]};${baseFrequencyMap[intensity] * 1.4};${baseFrequencyMap[intensity]}`}
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={intensityToScale[intensity]} />
            </filter>
            <filter id={noiseId} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed={noiseSeed + 8} />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.12" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: gradientBackground,
            filter: `url(#${filterId})`,
          }}
        />

        {colors.slice(0, 3).map((color, index) => {
          const offset = layerOffsets[index % layerOffsets.length];
          const duration = speed + index * 2.4;
          return (
            <motion.div
              key={`${color}-${index}`}
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                ...motionStyles,
                background: `radial-gradient(circle at 30% 30%, ${color}, transparent 65%)`,
              }}
              animate={{
                x: offset.x,
                y: offset.y,
                rotate: [0, 4, -2, 0],
              }}
              transition={{
                duration,
                ease: easeOrganic,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          );
        })}

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{ filter: `url(#${noiseId})`, y: parallaxY }}
        />

        <div className="relative z-[1]">{children}</div>
      </div>
    );
  },
);

LiquidBackground.displayName = "LiquidBackground";

export default LiquidBackground;
