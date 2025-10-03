import * as React from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { glowIntensity as computeGlowIntensity } from "@/utils/animations";

const glowMap: Record<string, string> = {
  subtle: "shadow-ethereal",
  medium: "shadow-quantum",
  intense: "shadow-phoenix",
};

type GlowMode = "subtle" | "medium" | "intense";
type RippleState = { key: number; x: number; y: number; size: number };

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
type MagneticButtonVariant = "primary" | "secondary" | "accent" | "phoenix" | ButtonVariantProps["variant"];

type MagneticButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: ButtonVariantProps["variant"];
  size?: ButtonVariantProps["size"];
  magneticStrength?: number;
  magneticRadius?: number;
  glowIntensity?: GlowMode;
  variantStyle?: MagneticButtonVariant;
  children?: React.ReactNode;
};

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
};

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      className,
      children,
      magneticStrength = 0.3,
      magneticRadius = 140,
      glowIntensity = "medium",
      variantStyle = "primary",
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    React.useEffect(() => {
      const node = buttonRef.current;
      if (!node) return;
      node.style.setProperty("--magnetic-glow", "0.35");
      node.style.setProperty("--cursor-x", "50%");
      node.style.setProperty("--cursor-y", "50%");
      node.style.setProperty("--glow-intensity", "0");
    }, []);

    const prefersReducedMotion = usePrefersReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
    const springY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });

  const [ripples, setRipples] = React.useState<RippleState[]>([]);

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (prefersReducedMotion) return;
        const node = buttonRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const relativeX = event.clientX - rect.left - rect.width / 2;
        const relativeY = event.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(relativeX ** 2 + relativeY ** 2);
        const ratio = Math.min(distance / magneticRadius, 1);
        x.set(relativeX * magneticStrength);
        y.set(relativeY * magneticStrength);
        node.style.setProperty("--magnetic-glow", (0.35 + (1 - ratio) * 0.35).toString());
        node.style.setProperty("--cursor-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        node.style.setProperty("--cursor-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        node.style.setProperty("--glow-intensity", computeGlowIntensity(distance, magneticRadius).toString());
      },
      [magneticRadius, magneticStrength, prefersReducedMotion, x, y],
    );

    const handleMouseLeave = React.useCallback(() => {
      x.set(0);
      y.set(0);
      const node = buttonRef.current;
      if (node) {
        node.style.setProperty("--magnetic-glow", "0.35");
        node.style.setProperty("--cursor-x", "50%");
        node.style.setProperty("--cursor-y", "50%");
        node.style.setProperty("--glow-intensity", "0");
      }
    }, [x, y]);

    const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      const node = buttonRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const rippleX = event.clientX - rect.left - rippleSize / 2;
      const rippleY = event.clientY - rect.top - rippleSize / 2;
      const key = Date.now();
      setRipples((current) => [...current, { key, x: rippleX, y: rippleY, size: rippleSize }]);
      const removeRipple = (targetKey: number) => {
        setRipples((current) => {
          const next: RippleState[] = [];
          for (const ripple of current) {
            if (ripple.key !== targetKey) {
              next.push(ripple);
            }
          }
          return next;
        });
      };
      window.setTimeout(removeRipple, 680, key);
      props.onClick?.(event);
    }, [props]);

    const resolvedVariant = React.useMemo(() => {
      if (variant) return variant;
      switch (variantStyle) {
        case "phoenix":
          return "cosmic";
        case "accent":
          return "accent";
        case "secondary":
          return "secondary";
        default:
          return "hero";
      }
    }, [variant, variantStyle]);

    return (
      <motion.button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden will-change-transform transition-[transform,box-shadow] duration-300",
          glowMap[glowIntensity] ?? "",
          buttonVariants({ variant: resolvedVariant, size }),
          className,
        )}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: "calc(var(--glow-intensity, 0) * 0.85)",
            background:
              "radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), hsla(var(--quantum-violet) / calc(var(--magnetic-glow, 0.45))), transparent 70%)",
          }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        {ripples.map((ripple) => (
          <span
            key={ripple.key}
            className="pointer-events-none absolute block rounded-full bg-white/40 mix-blend-overlay animate-[ripple_0.7s_ease-out]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </motion.button>
    );
  },
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
