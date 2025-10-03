import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment, Stars } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { LiquidBackground } from "./liquid-background";
import { ParticleField } from "./particle-field";
import SacredGeometry from "../SacredGeometry";

interface UnifiedBackgroundProps {
  children: ReactNode;
  variant?: "hero" | "philosophy" | "timeline" | "vision" | "education" | "disruption" | "cta";
  className?: string;
  intensity?: "subtle" | "medium" | "intense";
}

interface SphereConfig {
  position: [number, number, number];
  color: string;
  size: number;
  id: string;
}

interface SceneConfig {
  spheres: SphereConfig[];
  environment: "sunset" | "dawn" | "warehouse" | "city" | "forest" | "night";
  stars: {
    count: number;
    speed: number;
  };
}

interface SceneConfigs {
  hero: SceneConfig;
  philosophy: SceneConfig;
  timeline: SceneConfig;
  vision: SceneConfig;
  education: SceneConfig;
  disruption: SceneConfig;
  cta: SceneConfig;
}

// Scene configurations for different sections
const sceneConfigs: SceneConfigs = {
  hero: {
    spheres: [
      { position: [-0.4, -0.2, 0], color: "#ff6b6b", size: 1.2, id: "hero-sphere-1" },
      { position: [2.6, 1.2, -2.4], color: "#a855f7", size: 0.78, id: "hero-sphere-2" },
      { position: [-3.1, -1.6, -1.8], color: "#f6c667", size: 0.62, id: "hero-sphere-3" }
    ],
    environment: "sunset",
    stars: { count: 4200, speed: 0.8 }
  },
  philosophy: {
    spheres: [
      { position: [1.5, 0.8, -1], color: "#ff6b6b", size: 0.9, id: "philosophy-sphere-1" },
      { position: [-2, -0.5, -2], color: "#a855f7", size: 0.7, id: "philosophy-sphere-2" },
      { position: [0, 1.5, -3], color: "#f6c667", size: 0.8, id: "philosophy-sphere-3" },
      { position: [-1.8, 1.2, 1], color: "#06b6d4", size: 0.6, id: "philosophy-sphere-4" }
    ],
    environment: "dawn",
    stars: { count: 3500, speed: 0.6 }
  },
  timeline: {
    spheres: [
      { position: [2, 0, -2], color: "#ff6b6b", size: 1.0, id: "timeline-sphere-1" },
      { position: [-1.5, 1, -1.5], color: "#a855f7", size: 0.8, id: "timeline-sphere-2" },
      { position: [0, -1.2, -2.5], color: "#f6c667", size: 0.9, id: "timeline-sphere-3" }
    ],
    environment: "warehouse",
    stars: { count: 3000, speed: 0.7 }
  },
  vision: {
    spheres: [
      { position: [1, 1, -1], color: "#06b6d4", size: 1.1, id: "vision-sphere-1" },
      { position: [-2, -0.8, -2], color: "#8b5cf6", size: 0.85, id: "vision-sphere-2" },
      { position: [2.5, -1, -1.5], color: "#f59e0b", size: 0.75, id: "vision-sphere-3" }
    ],
    environment: "city",
    stars: { count: 4000, speed: 0.9 }
  },
  education: {
    spheres: [
      { position: [0.8, 0.5, -1.2], color: "#10b981", size: 0.95, id: "education-sphere-1" },
      { position: [-1.8, -0.3, -2.2], color: "#3b82f6", size: 0.8, id: "education-sphere-2" },
      { position: [1.5, -1.1, -1.8], color: "#f97316", size: 0.7, id: "education-sphere-3" }
    ],
    environment: "forest",
    stars: { count: 3200, speed: 0.5 }
  },
  disruption: {
    spheres: [
      { position: [1.2, 0, -1.5], color: "#dc2626", size: 1.0, id: "disruption-sphere-1" },
      { position: [-2.2, 0.8, -2], color: "#7c3aed", size: 0.9, id: "disruption-sphere-2" },
      { position: [0, -1.5, -3], color: "#ea580c", size: 0.8, id: "disruption-sphere-3" }
    ],
    environment: "night",
    stars: { count: 3800, speed: 1.1 }
  },
  cta: {
    spheres: [
      { position: [0, 0, -2], color: "#ff6b6b", size: 1.3, id: "cta-sphere-1" },
      { position: [-2.5, 1, -1], color: "#a855f7", size: 0.9, id: "cta-sphere-2" },
      { position: [2.5, -1, -1], color: "#f6c667", size: 0.9, id: "cta-sphere-3" }
    ],
    environment: "sunset",
    stars: { count: 4500, speed: 0.8 }
  }
};

const AnimatedSphereCluster = ({ config }: { config: SceneConfig }) => (
  <>
    <Stars 
      radius={120} 
      depth={60} 
      count={config.stars.count} 
      factor={3.4} 
      saturation={0} 
      fade 
      speed={config.stars.speed} 
    />

    {config.spheres.map((sphere: SphereConfig, index: number) => (
      <Float 
        key={sphere.id}
        speed={1.8 + index * 0.3} 
        rotationIntensity={0.8 + index * 0.2} 
        floatIntensity={1.2 + index * 0.3}
      >
        <Sphere args={[sphere.size, 96, 96]} position={sphere.position}>
          <MeshDistortMaterial
            color={sphere.color}
            distort={0.5 + index * 0.1}
            speed={1.5 + index * 0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>
    ))}

    <Environment preset={config.environment} />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.3}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
    />
  </>
);

export const UnifiedBackground = ({ 
  children, 
  variant = "hero", 
  className = "", 
  intensity = "medium" 
}: UnifiedBackgroundProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const geometryY = useTransform(scrollYProgress, [0, 1], [-40, 120]);
  const geometryScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const nebulaOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2]);

  const config = sceneConfigs[variant];
  
  // Color schemes based on variant
  const colorSchemes: Record<string, string[]> = {
    hero: ["hsl(var(--phoenix-red))", "hsl(var(--renaissance-gold))", "hsl(var(--cosmic-dawn))"],
    philosophy: ["hsl(var(--phoenix-red))", "hsl(var(--quantum-violet))", "hsl(var(--cosmic-dawn))"],
    timeline: ["hsl(var(--renaissance-gold))", "hsl(var(--phoenix-red))", "hsl(var(--quantum-violet))"],
    vision: ["hsl(var(--cosmic-dawn))", "hsl(var(--quantum-violet))", "hsl(var(--phoenix-red))"],
    education: ["hsl(var(--quantum-violet))", "hsl(var(--cosmic-dawn))", "hsl(var(--renaissance-gold))"],
    disruption: ["hsl(var(--phoenix-red))", "hsl(var(--renaissance-gold))", "hsl(var(--quantum-violet))"],
    cta: ["hsl(var(--phoenix-red))", "hsl(var(--quantum-violet))", "hsl(var(--cosmic-dawn))"]
  };

  const intensityMap: Record<string, { speed: number; particles: number; opacity: number }> = {
    subtle: { speed: 8, particles: 150, opacity: 0.3 },
    medium: { speed: 12, particles: 250, opacity: 0.5 },
    intense: { speed: 16, particles: 350, opacity: 0.7 }
  };

  const settings = intensityMap[intensity];
  const currentColors = colorSchemes[variant];

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <LiquidBackground
        colors={currentColors}
        intensity={intensity}
        speed={settings.speed}
        interactive
        className="relative"
      >
        {/* Phoenix Rising Particle Field */}
        <ParticleField
          count={settings.particles}
          mode="phoenix"
          interactive
          connectionDistance={120}
          color={currentColors[0]}
          className="z-10 pointer-events-none"
        />

        {/* Constellation Background */}
        <ParticleField
          count={settings.particles + 50}
          mode="constellation"
          interactive
          connectionDistance={160}
          color={currentColors[1]}
          className="z-10"
        />

        {/* 3D Scene */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ opacity: nebulaOpacity }}
        >
          <Canvas camera={{ position: [0, 0, 9], fov: 52 }}>
            <AnimatedSphereCluster config={config} />
          </Canvas>
        </motion.div>

        {/* Sacred Geometry Overlays */}
        <motion.div
          className="pointer-events-none absolute -right-24 top-16 z-10 hidden xl:block"
          style={{ y: geometryY, scale: geometryScale, opacity: settings.opacity }}
        >
          <SacredGeometry
            type="flower-of-life"
            size={400}
            color={currentColors[0]}
            complexity="complex"
            interactive
            animated
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-20 bottom-0 z-10 hidden lg:block"
          style={{ y: geometryY, opacity: settings.opacity * 0.8 }}
        >
          <SacredGeometry 
            type="golden-spiral" 
            size={320} 
            color={currentColors[2]} 
            animated 
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>
      </LiquidBackground>
    </section>
  );
};