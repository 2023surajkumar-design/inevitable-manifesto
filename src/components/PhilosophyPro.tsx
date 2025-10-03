import { Card } from "@/components/ui/card";
import { Flame, GraduationCap, RefreshCw, Brain, Heart, Sparkles, Zap, Target } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { corePhilosophies } from "@/utils/manifestoContent";
import { UnifiedBackground } from "@/components/ui/unified-background";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Icon mapping for philosophies
const iconMap = {
  "disruption-as-renewal": Flame,
  "education-as-transformation": GraduationCap,
  "continuous-improvisation": RefreshCw,
  "holistic-knowledge": Brain,
  "existential-responsibility": Heart,
};

// Enhanced Color mapping with phoenix theme
const colorMap = {
  "disruption-as-renewal": {
    primary: "phoenix-red",
    secondary: "renaissance-gold",
    glow: "ff6b6b",
    gradient: "from-phoenix-red to-renaissance-gold"
  },
  "education-as-transformation": {
    primary: "cosmic-dawn", 
    secondary: "quantum-violet",
    glow: "06b6d4",
    gradient: "from-cosmic-dawn to-quantum-violet"
  },
  "continuous-improvisation": {
    primary: "quantum-violet",
    secondary: "phoenix-red", 
    glow: "a855f7",
    gradient: "from-quantum-violet to-phoenix-red"
  },
  "holistic-knowledge": {
    primary: "renaissance-gold",
    secondary: "cosmic-dawn",
    glow: "f59e0b",
    gradient: "from-renaissance-gold to-cosmic-dawn"
  },
  "existential-responsibility": {
    primary: "cosmic-dawn",
    secondary: "phoenix-red",
    glow: "10b981", 
    gradient: "from-cosmic-dawn to-phoenix-red"
  },
};

export function PhilosophyPro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <UnifiedBackground variant="philosophy" intensity="medium" className="min-h-screen">
      <div className="container mx-auto px-4 py-32" ref={ref}>
        {/* Enhanced Header */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-3 font-semibold tracking-[0.35em] uppercase text-xs backdrop-blur-2xl text-white/80 mb-8"
          >
            <Sparkles className="h-4 w-4 text-renaissance-gold" />
            Philosophy Universe
            <motion.div
              className="w-2 h-2 rounded-full bg-phoenix-red"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold font-philosophical mb-8">
            <TextReveal 
              as="span" 
              className="block text-transparent bg-gradient-to-r from-phoenix-red via-quantum-violet to-cosmic-dawn bg-clip-text"
            >
              Core Philosophies
            </TextReveal>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-elegant"
          >
            Five fundamental principles that guide our transformation of education and society,
            <br className="hidden md:block" />
            each one a <span className="text-phoenix-red font-semibold">sacred pillar</span> in our <span className="text-cosmic-dawn font-semibold">inevitable evolution</span>
          </motion.p>

          {/* Animated Timeline Connector */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            className="h-px bg-gradient-to-r from-transparent via-phoenix-red to-transparent mt-12 max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Enhanced Philosophy Cards Grid */}
        <motion.div 
          style={{ y: cardsY }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-8xl mx-auto"
        >
          {corePhilosophies.map((philosophy, index) => {
            const Icon = iconMap[philosophy.id as keyof typeof iconMap] || Brain;
            const colors = colorMap[philosophy.id as keyof typeof colorMap];
            const isExpanded = expandedCard === philosophy.id;

            return (
              <motion.div
                key={philosophy.id}
                initial={{ opacity: 0, y: 80, rotateX: 45 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className={`${index === 4 ? 'lg:col-span-2 xl:col-span-1 xl:col-start-2' : ''} group`}
                whileHover={{ scale: 1.02, y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`relative p-8 bg-gradient-to-br from-black/40 via-black/60 to-black/80 border border-white/20 hover:border-${colors.primary}/50 transition-all duration-700 cursor-pointer h-full overflow-hidden backdrop-blur-xl`}
                  onClick={() => setExpandedCard(isExpanded ? null : philosophy.id)}
                >
                  {/* Animated Background Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${colors.primary}/10 via-transparent to-${colors.secondary}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg`}
                    animate={isExpanded ? { opacity: 0.3 } : {}}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Enhanced Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${colors.gradient}/20 border border-${colors.primary}/30 group-hover:border-${colors.primary}/50 transition-all duration-500 backdrop-blur-sm`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className={`w-8 h-8 text-${colors.primary} group-hover:text-${colors.secondary} transition-colors duration-500`} />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold font-philosophical text-white group-hover:text-white/90 transition-colors duration-500 mb-1">
                          {philosophy.title}
                        </h3>
                        <div className={`text-xs uppercase tracking-wider text-${colors.primary}/80 font-mono`}>
                          {philosophy.id.replace("-", " ")}
                        </div>
                      </div>
                    </div>

                    {/* Core Description */}
                    <p className="text-white/80 group-hover:text-white/90 transition-colors duration-500 leading-relaxed mb-6 font-elegant">
                      {philosophy.description}
                    </p>

                    {/* Enhanced Summary Preview */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <motion.div 
                          className={`w-3 h-3 rounded-full bg-${colors.primary} mt-1.5 flex-shrink-0`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
                        />
                        <span className="text-sm text-white/70 group-hover:text-white/80 transition-colors duration-500 font-elegant">
                          {philosophy.summary}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Zap className={`w-3 h-3 text-${colors.secondary} mt-1.5 flex-shrink-0`} />
                        <span className="text-sm text-white/70 group-hover:text-white/80 transition-colors duration-500 font-elegant">
                          <strong>Metaphor:</strong> {philosophy.metaphor}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isExpanded ? 'auto' : 0, 
                        opacity: isExpanded ? 1 : 0 
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {isExpanded && (
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="pt-6 border-t border-white/20 space-y-6"
                        >
                          {/* Historical Reference */}
                          <div className="bg-black/30 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                            <h4 className="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Historical Context
                            </h4>
                            <p className="text-sm text-white/70 leading-relaxed font-elegant">
                              {philosophy.historicalReference}
                            </p>
                          </div>

                          {/* Enhanced Quote */}
                          <div className={`bg-gradient-to-r ${colors.gradient}/10 rounded-xl p-5 border-l-4 border-${colors.primary} backdrop-blur-sm`}>
                            <blockquote className="text-sm italic text-white/80 leading-relaxed mb-3 font-elegant">
                              "{philosophy.quote.text}"
                            </blockquote>
                            {philosophy.quote.attribution && (
                              <cite className={`text-xs text-${colors.secondary}/80 font-mono`}>
                                — {philosophy.quote.attribution}
                              </cite>
                            )}
                          </div>

                          {/* Visual Metaphor Enhanced */}
                          <div className="bg-black/30 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                            <h4 className="text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Sacred Geometry
                            </h4>
                            <p className="text-sm text-white/70 leading-relaxed font-elegant">
                              {philosophy.metaphor} — A symbolic representation of this philosophy's essence,
                              manifesting through sacred geometric forms that reflect universal principles.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Enhanced Expand Indicator */}
                    <div className="flex justify-center mt-8">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className={`w-8 h-8 text-${colors.primary} opacity-70 group-hover:opacity-100 transition-all duration-500`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Enhanced Glow Effects */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br from-${colors.primary}/5 to-${colors.secondary}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg`}
                    animate={isExpanded ? { opacity: 0.2 } : {}}
                  />

                  {/* Corner Light Effect */}
                  <motion.div 
                    className={`absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-${colors.primary}/20 to-transparent rounded-full blur-3xl group-hover:from-${colors.primary}/40 transition-all duration-700`}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4, 
                      delay: index * 0.8 
                    }}
                  />

                  {/* Bottom Accent Line */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-full`}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-24"
        >
          <p className="text-lg text-white/70 mb-8 font-elegant leading-relaxed max-w-2xl mx-auto">
            Each philosophy represents a facet of our holistic approach to educational transformation.
            <br />
            Together, they form the <span className="text-phoenix-red font-semibold">sacred geometry</span> of inevitable change.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <MagneticButton
              size="lg"
              variantStyle="phoenix"
              glowIntensity="medium"
              className="px-8 py-4 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Our Vision
            </MagneticButton>
            
            <MagneticButton
              size="lg"
              variantStyle="secondary"
              glowIntensity="subtle"
              className="px-8 py-4 text-lg"
            >
              <Target className="w-5 h-5 mr-2" />
              Join the Movement
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </UnifiedBackground>
  );
}