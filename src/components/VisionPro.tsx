import { Card } from "@/components/ui/card";
import { BookOpen, Users2, Globe, Infinity as InfinityIcon, Sparkles, LucideIcon } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import { visionPillars } from "@/utils/manifestoContent";

// Icon mapping for vision pillars
const iconMap = {
  "reimagined-education": BookOpen,
  "holistic-development": Users2,
  "global-transformation": Globe,
  "free-knowledge": InfinityIcon,
  "evolutionary-purpose": Sparkles,
};

// Color mapping for vision pillars
const colorMap = {
  "reimagined-education": {
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconColor: "#4A9EFF",
    primary: "blue-500",
    glow: "blue-400"
  },
  "holistic-development": {
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    iconColor: "#A855F7",
    primary: "purple-500",
    glow: "purple-400"
  },
  "global-transformation": {
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    iconColor: "#10B981",
    primary: "green-500",
    glow: "green-400"
  },
  "free-knowledge": {
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    iconColor: "#FFC107",
    primary: "orange-500",
    glow: "orange-400"
  },
  "evolutionary-purpose": {
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    iconColor: "#EC4899",
    primary: "pink-500",
    glow: "pink-400"
  },
};

const Scene3DBackground = () => {
  return (
    <>
  // @ts-expect-error - React Three Fiber types
  <ambientLight intensity={0.4} />
  // @ts-expect-error - React Three Fiber types
  <directionalLight position={[10, 10, 5]} intensity={0.8} />
  // @ts-expect-error - React Three Fiber types
  <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4A9EFF" />
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[0.8, 64, 64]} position={[2, 0, -2]}>
          <MeshDistortMaterial
            color="#4A9EFF"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere args={[0.6, 64, 64]} position={[-2, 1, -1]}>
          <MeshDistortMaterial
            color="#A855F7"
            attach="material"
            distort={0.5}
            speed={1.5}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
        <Sphere args={[0.5, 64, 64]} position={[0, -1, -3]}>
          <MeshDistortMaterial
            color="#FFC107"
            attach="material"
            distort={0.3}
            speed={2.5}
            roughness={0.4}
            metalness={0.7}
          />
        </Sphere>
      </Float>
      
      <Environment preset="city" />
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
};

export const VisionPro = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="vision" className="py-32 md:py-40 relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Scene3DBackground />
        </Canvas>
      </div>

      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[180px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wider uppercase text-secondary">Our Vision</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ scale: 0.95 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 font-display tracking-tight leading-tight"
          >
            Guiding Humanity's{" "}
            <span className="text-gradient cosmic-glow-strong block mt-3">
              Inevitable Future
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-xl md:text-2xl text-foreground max-w-5xl mx-auto leading-relaxed font-medium"
          >
            To guide humanity into an inevitable future of purpose-driven disruption, where education, innovation, and consciousness redefine how we live, learn, and evolve.
          </motion.p>
        </motion.div>

        {/* Vision Pillars - Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {visionPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.id as keyof typeof iconMap] || BookOpen;
            const colors = colorMap[pillar.id as keyof typeof colorMap];
            const isLarge = index === 2; // Make Global Transformation larger
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 80, rotateX: -20 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80,
                  damping: 15
                }}
                className={`${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <Card className={`group relative overflow-hidden p-8 lg:p-10 bg-gradient-to-br ${colors.gradient} backdrop-blur-2xl border-2 border-white/10 hover:border-white/20 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/30 h-full`}>
                    {/* Animated Gradient Background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${colors.iconColor}15, transparent 70%)`
                      }}
                    />

                    {/* Content Container */}
                    <div className="relative space-y-6">
                      {/* Icon with Advanced Hover Effect */}
                      <div className="flex items-start gap-5">
                        <motion.div
                          whileHover={{
                            rotateY: 180,
                            scale: 1.15,
                            transition: { duration: 0.5 }
                          }}
                          className="w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl flex-shrink-0"
                          style={{ 
                            transformStyle: "preserve-3d",
                            boxShadow: `0 8px 32px ${colors.iconColor}40`
                          }}
                        >
                          <Icon className="w-8 h-8 lg:w-9 lg:h-9" style={{ color: colors.iconColor }} />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="text-2xl lg:text-3xl font-bold font-display mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                        {pillar.subtitle}
                      </p>

                      {/* Quote Display */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="pt-3 border-t border-white/10"
                      >
                        <p className="text-sm lg:text-base font-semibold italic flex items-center gap-2" style={{ color: colors.iconColor }}>
                          <motion.span
                            animate={{ x: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            →
                          </motion.span>
                          "{pillar.quote.text}"
                        </p>
                      </motion.div>

                      {/* Present vs Future States */}
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-400 mb-1">Present:</h4>
                          <p className="text-xs text-slate-500">
                            {pillar.presentState}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-1">Future:</h4>
                          <p className="text-xs text-slate-300">
                            {pillar.futureState}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corner Element */}
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle, ${colors.iconColor}30, transparent)` }} />
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
