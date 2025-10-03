import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment, Stars } from "@react-three/drei";
import { motion, useTransform } from "framer-motion";

import { LiquidBackground } from "./liquid-background";
import { ParticleField } from "./particle-field";
import { useDeviceCapabilities, getRenderQuality, PerformanceMonitor } from "@/lib/performance";
import { useReducedMotion, useInViewport } from "@/lib/accessibility";

type QualityTier = 'high' | 'medium' | 'low';

type SectionVariant = "hero" | "philosophy" | "timeline" | "vision" | "education" | "disruption" | "join";

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

// Scene configurations for different sections
const sceneConfigs: Record<SectionVariant, SceneConfig> = {
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
      { position: [0, 1.5, -3], color: "#f6c667", size: 0.8, id: "philosophy-sphere-3" }
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
  join: {
    spheres: [
      { position: [0, 0, -2], color: "#ff6b6b", size: 1.3, id: "cta-sphere-1" },
      { position: [-2.5, 1, -1], color: "#a855f7", size: 0.9, id: "cta-sphere-2" },
      { position: [2.5, -1, -1], color: "#f6c667", size: 0.9, id: "cta-sphere-3" }
    ],
    environment: "sunset",
    stars: { count: 4500, speed: 0.8 }
  }
};

// Color mapping by section
const colorSchemes: Record<SectionVariant, string[]> = {
  hero: ["hsl(var(--phoenix-red))", "hsl(var(--renaissance-gold))", "hsl(var(--cosmic-dawn))"],
  philosophy: ["hsl(var(--phoenix-red))", "hsl(var(--quantum-violet))", "hsl(var(--cosmic-dawn))"],
  timeline: ["hsl(var(--renaissance-gold))", "hsl(var(--phoenix-red))", "hsl(var(--quantum-violet))"],
  vision: ["hsl(var(--cosmic-dawn))", "hsl(var(--quantum-violet))", "hsl(var(--phoenix-red))"],
  education: ["hsl(var(--quantum-violet))", "hsl(var(--cosmic-dawn))", "hsl(var(--renaissance-gold))"],
  disruption: ["hsl(var(--phoenix-red))", "hsl(var(--renaissance-gold))", "hsl(var(--quantum-violet))"],
  join: ["hsl(var(--phoenix-red))", "hsl(var(--quantum-violet))", "hsl(var(--cosmic-dawn))"]
};

const AnimatedSphereCluster = ({ config, quality }: { config: SceneConfig; quality: QualityTier }) => {
  // Adjust sphere count based on quality
  const visibleSpheres = quality === 'low' ? config.spheres.slice(0, 2) : config.spheres;
  
  const starCount = quality === 'high' 
    ? config.stars.count 
    : quality === 'medium' 
      ? Math.floor(config.stars.count * 0.5) 
      : Math.floor(config.stars.count * 0.2);

  return (
    <>
      {starCount > 0 && (
        <Stars 
          radius={120} 
          depth={60} 
          count={starCount} 
          factor={3.4} 
          saturation={0} 
          fade 
          speed={config.stars.speed} 
        />
      )}

      {visibleSpheres.map((sphere, index) => (
        <Float 
          key={sphere.id}
          speed={1.8 + index * 0.3} 
          rotationIntensity={0.8 + index * 0.2} 
          floatIntensity={1.2 + index * 0.3}
        >
          <Sphere args={[sphere.size, quality === 'low' ? 32 : 96, quality === 'low' ? 32 : 96]} position={sphere.position}>
            <MeshDistortMaterial
              color={sphere.color}
              distort={quality === 'low' ? 0.2 : 0.5 + index * 0.1}
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
        autoRotate={quality !== 'low'}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

interface ImmersiveBackgroundContextValue {
  currentSection: SectionVariant;
  setCurrentSection: (section: SectionVariant) => void;
  scrollProgress: number;
  quality: QualityTier;
}

const ImmersiveBackgroundContext = React.createContext<ImmersiveBackgroundContextValue | null>(null);

export const useImmersiveBackground = () => {
  const context = React.useContext(ImmersiveBackgroundContext);
  if (!context) {
    throw new Error('useImmersiveBackground must be used within ImmersiveBackgroundProvider');
  }
  return context;
};

interface ImmersiveBackgroundProviderProps {
  children: React.ReactNode;
  className?: string;
}

export const ImmersiveBackgroundProvider: React.FC<ImmersiveBackgroundProviderProps> = ({
  children,
  className,
}) => {
  const [currentSection, setCurrentSection] = React.useState<SectionVariant>("hero");
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [quality, setQuality] = React.useState<QualityTier>('high');
  const [fps, setFps] = React.useState(60);
  
  const capabilities = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useInViewport();

  // Initialize quality based on device capabilities
  React.useEffect(() => {
    const initialQuality = getRenderQuality();
    setQuality(initialQuality);
  }, []);

  // FPS monitoring with auto-degradation
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const monitor = new PerformanceMonitor((currentFps) => {
      setFps(currentFps);
      
      // Auto-degrade quality if FPS drops
      if (currentFps < 30 && quality !== 'low') {
        setQuality(quality === 'high' ? 'medium' : 'low');
        console.info(`Performance degradation: FPS ${currentFps}, quality set to ${quality === 'high' ? 'medium' : 'low'}`);
      }
    });

    monitor.start();
  }, [prefersReducedMotion, quality]);

  // Track scroll progress
  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const config = sceneConfigs[currentSection];
  const currentColors = colorSchemes[currentSection];
  
  const particleCount = quality === 'high' 
    ? 300 
    : quality === 'medium' 
      ? 180 
      : 90;

  const contextValue: ImmersiveBackgroundContextValue = {
    currentSection,
    setCurrentSection,
    scrollProgress,
    quality,
  };

  if (prefersReducedMotion) {
    return (
      <ImmersiveBackgroundContext.Provider value={contextValue}>
        <div className={className} ref={ref as React.RefObject<HTMLDivElement>}>
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          {children}
        </div>
      </ImmersiveBackgroundContext.Provider>
    );
  }

  return (
    <ImmersiveBackgroundContext.Provider value={contextValue}>
      <div className={className} ref={ref as React.RefObject<HTMLDivElement>}>
        {/* Single shared 3D Canvas */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          animate={{ opacity: isInView ? 0.6 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Canvas camera={{ position: [0, 0, 9], fov: 52 }}>
            <AnimatedSphereCluster config={config} quality={quality} />
          </Canvas>
        </motion.div>

        {/* Single shared LiquidBackground */}
        <LiquidBackground
          colors={currentColors}
          intensity={quality === 'low' ? 'subtle' : 'medium'}
          speed={quality === 'low' ? 8 : 12}
          interactive={quality !== 'low'}
          className="fixed inset-0 z-0"
        >
          {/* Single shared ParticleField */}
          <ParticleField
            count={particleCount}
            mode="phoenix"
            interactive={quality !== 'low'}
            connectionDistance={quality === 'low' ? 80 : 120}
            color={currentColors[0]}
            className="pointer-events-none"
          />
        </LiquidBackground>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ImmersiveBackgroundContext.Provider>
  );
};
