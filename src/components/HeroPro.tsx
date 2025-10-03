import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment, Stars } from "@react-three/drei";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { ParticleField } from "@/components/ui/particle-field";
import { LiquidBackground } from "@/components/ui/liquid-background";
import SacredGeometry from "@/components/SacredGeometry";
import { QuoteCarousel } from "@/components/QuoteCarousel";
import { heroQuotes } from "@/utils/manifestoContent";

const AnimatedSphereCluster = () => (
  <>
    <Stars radius={120} depth={60} count={4200} factor={3.4} saturation={0} fade speed={0.8} />

    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
      <Sphere args={[1.2, 128, 128]} position={[-0.4, -0.2, 0]}>
        <MeshDistortMaterial
          attach="material"
          color="#ff6b6b"
          distort={0.65}
          speed={2.1}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>

    <Float speed={1.9} rotationIntensity={0.9} floatIntensity={1.6}>
      <Sphere args={[0.78, 96, 96]} position={[2.6, 1.2, -2.4]}>
        <MeshDistortMaterial
          attach="material"
          color="#a855f7"
          distort={0.78}
          speed={1.8}
          roughness={0.18}
          metalness={0.92}
        />
      </Sphere>
    </Float>

    <Float speed={2.4} rotationIntensity={1.05} floatIntensity={1.4}>
      <Sphere args={[0.62, 96, 96]} position={[-3.1, -1.6, -1.8]}>
        <MeshDistortMaterial
          attach="material"
          color="#f6c667"
          distort={0.52}
          speed={2.6}
          roughness={0.22}
          metalness={0.86}
        />
      </Sphere>
    </Float>

    <Environment preset="sunset" />
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.38}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
    />
  </>
);

export const HeroPro = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen overflow-hidden">
      <div className="relative z-20 flex items-center justify-center min-h-screen backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12 py-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-3 font-semibold tracking-[0.35em] uppercase text-xs backdrop-blur-2xl text-foreground/80"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              Devotion to Evolution
              <span className="relative ml-4 flex h-1 w-14 overflow-hidden rounded-full bg-white/20">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-pink-400 to-violet-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 3.6, ease: "linear" }}
                />
              </span>
            </motion.div>

            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
                className="text-balance text-center mx-auto"
              >
                <TextReveal 
                  as="span" 
                  className="block text-transparent bg-gradient-to-r from-white via-cosmic-dawn to-white bg-clip-text font-philosophical text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight drop-shadow-2xl text-shadow-xl"
                >
                  The Inevitable
                </TextReveal>
                <span className="mt-8 block text-center text-transparent bg-gradient-to-r from-phoenix-red via-quantum-violet to-cosmic-dawn bg-clip-text font-elegant text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed max-w-5xl mx-auto text-shadow-lg">
                  Where disruption becomes sacred practice, and education becomes transformation
                </span>
              </motion.h1>

              {/* Historical Timeline Context */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center justify-center gap-8 text-sm font-mono text-foreground/60"
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-renaissance-gold animate-pulse" />
                  1440: Gutenberg
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-quantum-violet animate-pulse" style={{ animationDelay: "0.5s" }} />
                  1990: Internet
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-phoenix-red animate-pulse" style={{ animationDelay: "1s" }} />
                  2040: The Inevitable
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.9, ease: "easeOut" }}
                className="mx-auto max-w-5xl text-balance text-lg leading-relaxed text-gray-800 md:text-xl lg:text-2xl font-elegant drop-shadow-xl text-shadow-md"
              >
                We exist because <span className="text-phoenix-red font-bold">stagnation is decay</span> and <span className="text-cosmic-dawn font-bold">disruption is life</span>.
                <br className="hidden md:block" />
                Where others tinker with margins, we <span className="text-quantum-violet font-bold">redesign the essence</span>. 
                Where others upgrade tools, we <span className="text-gray-900 font-bold">reimagine entire systems</span>.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-5 pt-10 md:flex-row"
            >
              <MagneticButton
                size="xl"
                variantStyle="phoenix"
                glowIntensity="intense"
                className="group h-16 px-10 text-lg shadow-xl"
                onClick={() => scrollToSection("vision")}
              >
                Explore the Vision
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
              </MagneticButton>

              <MagneticButton
                size="xl"
                variantStyle="secondary"
                glowIntensity="medium"
                className="h-16 px-10 text-lg"
                onClick={() => scrollToSection("join")}
              >
                Join the Movement
              </MagneticButton>

              <MagneticButton
                size="xl"
                variantStyle="accent"
                glowIntensity="subtle"
                className="h-16 px-10 text-lg"
                onClick={() => scrollToSection("timeline")}
              >
                Explore the Timeline
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 1, ease: "easeOut" }}
            >
              <QuoteCarousel
                quotes={heroQuotes}
                variant="hero"
                transitionMode="fragment"
                interval={8500}
                className="bg-transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              className="grid gap-8 pt-20 text-left md:grid-cols-3 mb-20"
            >
              <div className="rounded-3xl border border-white/30 bg-black/60 backdrop-blur-3xl p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-black/70 hover:border-amber-300/50">
                <p className="text-sm uppercase tracking-[0.4em] text-amber-300 font-bold mb-2">Education</p>
                <p className="text-lg text-white font-medium leading-relaxed">
                  Studios where curiosity, research, and responsibility are the curriculum.
                </p>
              </div>
              <div className="rounded-3xl border border-white/30 bg-black/60 backdrop-blur-3xl p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-black/70 hover:border-violet-300/50">
                <p className="text-sm uppercase tracking-[0.4em] text-violet-300 font-bold mb-2">Movement</p>
                <p className="text-lg text-white font-medium leading-relaxed">
                  Devotion over disruption: builders, poets, scientists, and seekers aligned in purpose.
                </p>
              </div>
              <div className="rounded-3xl border border-white/30 bg-black/60 backdrop-blur-3xl p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-black/70 hover:border-rose-300/50">
                <p className="text-sm uppercase tracking-[0.4em] text-rose-300 font-bold mb-2">Constellation</p>
                <p className="text-lg text-white font-medium leading-relaxed">
                  A living network spanning continents, sharing breakthroughs in real time.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-xl shadow-lg">
            <motion.span
              className="block h-6 w-px bg-gradient-to-b from-white/80 to-transparent"
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="flex h-1 w-32 overflow-hidden rounded-full bg-white/20">
            <motion.span
              className="bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400"
              style={{ scaleX: progressScale }}
              transition={{ type: "tween" }}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-medium">Scroll to awaken</span>
        </div>
      </motion.div>
    </section>
  );
};
