import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { useMotionPreferences, easeCosmic } from "@/utils/animations";

type GeometryType =
  | "flower-of-life"
  | "metatrons-cube"
  | "golden-spiral"
  | "platonic-solids"
  | "vesica-piscis"
  | "sri-yantra";

type Complexity = "simple" | "medium" | "complex";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

type SacredGeometryProps = {
  /** Select which sacred geometry pattern to render. */
  type?: GeometryType;
  /** Overall size in pixels. */
  size?: number;
  /** Stroke colors or gradients for the geometry. */
  color?: string | string[];
  /** Enable continuous animation (rotation/pulse). */
  animated?: boolean;
  /** Enable pointer-reactive tilt/parallax. */
  interactive?: boolean;
  /** Controls density of pattern details. */
  complexity?: Complexity;
  /** Opacity multiplier for the rendered SVG. */
  opacity?: number;
  /** Optional class name for container. */
  className?: string;
  /** Inline styles forwarded to container. */
  style?: MotionDivProps["style"];
} & Omit<MotionDivProps, "children" | "style" | "className">;

const defaultPalette = [
  "hsl(var(--quantum-violet))",
  "hsl(var(--phoenix-red))",
  "hsl(var(--cosmic-dawn))",
];

const toRgba = (input: string, alpha: number) => {
  if (/^hsl/i.test(input)) {
    return input.replace(/hsl/i, "hsla").replace(/\)$/i, `, ${alpha})`);
  }
  if (/^rgb/i.test(input)) {
    return input.replace(/rgb/i, "rgba").replace(/\)$/i, `, ${alpha})`);
  }
  if (/^#[0-9a-f]{3,8}$/i.test(input)) {
    const hex = input.replace("#", "");
    const normalized = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex.slice(0, 6);
    const bigint = parseInt(normalized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return input;
};

const lineWidthByComplexity: Record<Complexity, number> = {
  simple: 1.2,
  medium: 1.6,
  complex: 2,
};

const circleCountByComplexity: Record<Complexity, number> = {
  simple: 7,
  medium: 19,
  complex: 31,
};

const platonicPolygons: Record<Complexity, Array<{ sides: number; radius: number }>> = {
  simple: [
    { sides: 4, radius: 46 },
    { sides: 3, radius: 32 },
  ],
  medium: [
    { sides: 4, radius: 52 },
    { sides: 3, radius: 36 },
    { sides: 6, radius: 62 },
  ],
  complex: [
    { sides: 4, radius: 54 },
    { sides: 3, radius: 40 },
    { sides: 6, radius: 64 },
    { sides: 5, radius: 72 },
  ],
};

const sriYantraLayers: Record<Complexity, number> = {
  simple: 3,
  medium: 5,
  complex: 7,
};

const spiralTurnsByComplexity: Record<Complexity, number> = {
  simple: 2,
  medium: 3,
  complex: 4,
};

const createFlowerOfLife = (count: number, radius = 36) => {
  const circles: Array<{ cx: number; cy: number }>[] = [];
  let layers = 3;
  if (count === 7) layers = 1;
  else if (count === 19) layers = 2;
  const d = radius;
  const sqrt3 = Math.sqrt(3);

  // central circle
  circles.push([{ cx: 0, cy: 0 }]);

  for (let layer = 1; layer <= layers; layer += 1) {
    const positions: Array<{ cx: number; cy: number }> = [];
    for (let i = 0; i < 6 * layer; i += 1) {
      const angle = (Math.PI / 3) * i;
      const dist = d * layer;
      positions.push({
        cx: Math.cos(angle) * dist,
        cy: Math.sin(angle) * dist,
      });
    }
    circles.push(positions);
  }

  if (layers >= 2) {
    const offsets = [
      { cx: d * 2, cy: 0 },
      { cx: -d * 2, cy: 0 },
      { cx: d, cy: d * sqrt3 },
      { cx: -d, cy: d * sqrt3 },
      { cx: d, cy: -d * sqrt3 },
      { cx: -d, cy: -d * sqrt3 },
    ];
    circles.push(offsets);
    if (layers >= 3) {
      const thirdLayerOffsets = offsets.map((p) => ({ cx: p.cx * 1.5, cy: p.cy * 1.5 }));
      circles.push(thirdLayerOffsets);
    }
  }

  return circles.flat();
};

const createMetatronLines = (complexity: Complexity, radius = 56) => {
  const points: Array<{ x: number; y: number }> = [];
  let layers = 3;
  if (complexity === "simple") layers = 1;
  else if (complexity === "medium") layers = 2;

  points.push({ x: 0, y: 0 });

  for (let layer = 1; layer <= layers; layer += 1) {
    const count = layer === 1 ? 6 : 12;
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count;
      points.push({
        x: Math.cos(angle) * radius * (layer / layers),
        y: Math.sin(angle) * radius * (layer / layers),
      });
    }
  }

  const connections: Array<{ from: number; to: number }> = [];
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      if (Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y) <= radius * 1.2) {
        connections.push({ from: i, to: j });
      }
    }
  }

  return { points, connections };
};

const createGoldenSpiralPath = (turns: number, radius = 60) => {
  const points: Array<{ x: number; y: number }> = [];
  const total = turns * 90;
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i <= total; i += 1) {
    const theta = (i / total) * (Math.PI * turns * 2);
    const r = radius * Math.pow(phi, theta / (Math.PI * 2));
    points.push({ x: Math.cos(theta) * r, y: Math.sin(theta) * r });
  }

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(3)},${point.y.toFixed(3)}`)
    .join(" ");

  return `${path}`;
};

const createVesicaPiscis = (radius = 52) => [
  { cx: -radius / 2, cy: 0 },
  { cx: radius / 2, cy: 0 },
];

const createSriYantraTriangles = (layers: number, radius = 68) => {
  const triangles: Array<{ points: string }> = [];
  for (let i = 0; i < layers; i += 1) {
    const scale = 1 - i * (1 / (layers + 1));
    const up = [
      `${0},${-radius * scale}`,
      `${-radius * scale * 0.9},${radius * scale * 0.6}`,
      `${radius * scale * 0.9},${radius * scale * 0.6}`,
    ];
    const down = [
      `${0},${radius * scale}`,
      `${-radius * scale * 0.9},${-radius * scale * 0.6}`,
      `${radius * scale * 0.9},${-radius * scale * 0.6}`,
    ];
    triangles.push({ points: up.join(" ") });
    triangles.push({ points: down.join(" ") });
  }
  return triangles;
};

const SacredGeometry = React.forwardRef<HTMLDivElement, SacredGeometryProps>(
  (
    {
      type = "flower-of-life",
      size = 320,
      color,
      animated = true,
      interactive = false,
      complexity = "medium",
      opacity = 0.28,
      className,
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
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [forwardedRef],
    );

    const colors = React.useMemo(() => {
      if (!color) return defaultPalette;
      if (Array.isArray(color)) return color.length ? color : defaultPalette;
      return [color];
    }, [color]);

    const gradientId = React.useId();
    const glowId = React.useId();

    const strokeWidth = lineWidthByComplexity[complexity];

    const { prefersReducedMotion } = useMotionPreferences();

    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const springX = useSpring(pointerX, { stiffness: 60, damping: 18 });
    const springY = useSpring(pointerY, { stiffness: 60, damping: 18 });
    const rotateX = useTransform(springY, [0, 1], [8, -8]);
    const rotateY = useTransform(springX, [0, 1], [-8, 8]);
    const translateX = useTransform(springX, [0, 1], [-12, 12]);
    const translateY = useTransform(springY, [0, 1], [-8, 8]);
    const gradientCX = useTransform(springX, [0, 1], ["30%", "70%"]);
    const gradientCY = useTransform(springY, [0, 1], ["30%", "70%"]);
    const glowGradient = useMotionTemplate`radial-gradient(circle at ${gradientCX} ${gradientCY}, ${colors[0]}, transparent 70%)`;

    React.useEffect(() => {
      if (!interactive || prefersReducedMotion) return undefined;
      const node = containerRef.current;
      if (!node) return undefined;

      const handlePointer = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        pointerX.set(Math.min(Math.max(x, 0), 1));
        pointerY.set(Math.min(Math.max(y, 0), 1));
      };

      const resetPointer = () => {
        pointerX.set(0.5);
        pointerY.set(0.5);
      };

      node.addEventListener("pointermove", handlePointer);
      node.addEventListener("pointerleave", resetPointer);

      return () => {
        node.removeEventListener("pointermove", handlePointer);
        node.removeEventListener("pointerleave", resetPointer);
      };
    }, [interactive, pointerX, pointerY, prefersReducedMotion]);

    const renderGeometry = React.useMemo<React.ReactNode>(() => {
      switch (type) {
        case "flower-of-life": {
          const circles = createFlowerOfLife(circleCountByComplexity[complexity]);
          const seen = new Set<string>();
          return circles.reduce<React.ReactNode[]>((acc, { cx, cy }) => {
            const key = `${Math.round(cx * 100)}-${Math.round(cy * 100)}`;
            if (seen.has(key)) return acc;
            seen.add(key);
            acc.push(<circle key={key} cx={cx} cy={cy} r={36} fill="none" />);
            return acc;
          }, []);
        }
        case "metatrons-cube": {
          const { points, connections } = createMetatronLines(complexity);
          return (
            <>
              {connections.map((connection) => {
                const from = points[connection.from];
                const to = points[connection.to];
                const key = `${connection.from}-${connection.to}`;
                return <line key={key} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
              })}
              {points.map((point, index) => {
                const key = `${Math.round(point.x * 100)}-${Math.round(point.y * 100)}`;
                return <circle key={key} cx={point.x} cy={point.y} r={index === 0 ? 6 : 4} fill="none" />;
              })}
            </>
          );
        }
        case "golden-spiral": {
          const path = createGoldenSpiralPath(spiralTurnsByComplexity[complexity]);
          return (
            <>
              <path d={path} fill="none" strokeLinecap="round" />
              {Array.from({ length: spiralTurnsByComplexity[complexity] + 2 }).map((_, idx) => {
                const radiusValue = 34 * Math.pow(1.618, idx);
                return <circle key={`spiral-${radiusValue.toFixed(2)}`} cx={0} cy={0} r={radiusValue} fill="none" />;
              })}
            </>
          );
        }
        case "platonic-solids": {
          const polygons = platonicPolygons[complexity];
          return (
            <>
              {polygons.map((poly) => {
                const points = Array.from({ length: poly.sides }).map((_, vertex) => {
                  const angle = (Math.PI * 2 * vertex) / poly.sides - Math.PI / 2;
                  return `${Math.cos(angle) * poly.radius},${Math.sin(angle) * poly.radius}`;
                });
                return <polygon key={`poly-${poly.sides}-${poly.radius}`} points={points.join(" ")} fill="none" />;
              })}
            </>
          );
        }
        case "vesica-piscis": {
          const circles = createVesicaPiscis();
          return (
            <>
              {circles.map(({ cx, cy }) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={56} fill="none" />
              ))}
              <ellipse cx={0} cy={0} rx={58} ry={28} fill="none" />
            </>
          );
        }
        case "sri-yantra": {
          const triangles = createSriYantraTriangles(sriYantraLayers[complexity]);
          return (
            <>
              {triangles.map((triangle) => (
                <polygon key={triangle.points} points={triangle.points} fill="none" />
              ))}
              <circle cx={0} cy={0} r={72} fill="none" />
              <circle cx={0} cy={0} r={16} fill="none" />
            </>
          );
        }
        default:
          return null;
      }
    }, [complexity, type]);

    const svgProps = {
      viewBox: "-120 -120 240 240",
      stroke: `url(#${gradientId})`,
      strokeWidth,
      strokeLinejoin: "round" as const,
      strokeLinecap: "round" as const,
    };

    const animatedProps = animated && !prefersReducedMotion
      ? {
          animate: { rotate: [0, 360] },
          transition: { duration: 36, ease: easeCosmic, repeat: Infinity },
        }
      : undefined;

    const containerStyle = React.useMemo<MotionDivProps["style"]>(() => {
      const base: MotionDivProps["style"] = {
        width: size,
        height: size,
        opacity,
      };

      if (style) {
        Object.assign(base, style);
      }

      if (interactive && !prefersReducedMotion) {
        base.rotateX = rotateX;
        base.rotateY = rotateY;
        base.x = translateX;
        base.y = translateY;
      }

      return base;
    }, [interactive, opacity, prefersReducedMotion, rotateX, rotateY, size, style, translateX, translateY]);

    if (prefersReducedMotion) {
      // For reduced motion, render a simple div without motion-specific props
      return (
        <div
          ref={assignRef}
          className={cn("pointer-events-none select-none", className)}
          style={
            {
              width: size,
              height: size,
              opacity,
              background: `radial-gradient(circle at 50% 40%, ${colors[0]}, transparent 70%)`,
              ...style,
            } as React.CSSProperties
          }
        />
      );
    }

    // Extract motion-specific props for the motion.div
    const { onDrag, drag, dragConstraints, dragElastic, ...motionProps } = rest;
    
    return (
      <motion.div
        ref={assignRef}
        className={cn("pointer-events-none select-none", className)}
        style={containerStyle}
        onDrag={onDrag}
        drag={drag}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        {...motionProps}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: glowGradient,
            filter: "blur(40px)",
            opacity: 0.45,
          }}
        />
        <motion.svg
          width={size}
          height={size}
          {...svgProps}
          {...animatedProps}
        >
          <defs>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
              {colors.map((stopColor, index) => (
                <stop
                  key={`${gradientId}-stop-${index}`}
                  offset={`${(index / Math.max(colors.length - 1, 1)) * 100}%`}
                  stopColor={stopColor}
                  stopOpacity={0.9 - index * 0.15}
                />
              ))}
            </radialGradient>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter={`url(#${glowId})`} opacity={0.92}>
            <g fill="none">{renderGeometry}</g>
          </g>
        </motion.svg>
      </motion.div>
    );
  },
);

SacredGeometry.displayName = "SacredGeometry";

export { SacredGeometry };

export default SacredGeometry;
