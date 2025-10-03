import { Card } from "@/components/ui/card";
import { 
  BookText, 
  Database, 
  Heart, 
  Lightbulb, 
  TrendingUp, 
  Rocket,
  LucideIcon
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Disruption {
  icon: LucideIcon;
  category: string;
  points: string[];
  quote: string;
  gradient: string;
  accentColor: string;
}

const disruptions: Disruption[] = [
  {
    icon: BookText,
    category: "Educational Disruption",
    points: [
      "Collapse the silos: school, college, PhD into one integrated research-driven ecosystem",
      "From rote memorization to deep research and questioning from childhood",
      "Replace grades with skills, creativity, and leadership as true metrics",
    ],
    quote: "Like Gutenberg's press ended the monopoly of scribes, our system will end the monopoly of rote.",
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    accentColor: "#4A9EFF",
  },
  {
    icon: Database,
    category: "Knowledge Disruption",
    points: [
      "Make all knowledge free, transparent, open-source",
      "Global networks where learners, educators, and experts co-create",
      "Break down paywalls and democratize research",
    ],
    quote: "Wikipedia showed the power of free knowledge; we will take it to education itself.",
    gradient: "from-purple-500/10 via-violet-500/5 to-transparent",
    accentColor: "#A855F7",
  },
  {
    icon: Heart,
    category: "Social Disruption",
    points: [
      "Teach empathy and leadership from day one",
      "Education as a tool to dissolve inequality, fear, and division",
      "Build role models who embody values and wisdom",
    ],
    quote: "Education is the most powerful weapon which you can use to change the world. — Mandela",
    gradient: "from-pink-500/10 via-rose-500/5 to-transparent",
    accentColor: "#EC4899",
  },
  {
    icon: Lightbulb,
    category: "Consciousness Disruption",
    points: [
      "Teach meditation, reflection, self-awareness as part of learning",
      "Move humanity beyond materialism towards deeper meaning",
      "Integrate scientific, social, and spiritual wisdom",
    ],
    quote: "He who sees all beings in the Self, and the Self in all beings, never turns away from it.",
    gradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
    accentColor: "#FFC107",
  },
  {
    icon: TrendingUp,
    category: "Economic Disruption",
    points: [
      "Redefine industries by human flourishing and sustainability",
      "Every human as an innovator; no life wasted in monotony",
      "Create value through continuous regeneration, not hoarding",
    ],
    quote: "Like Tesla electrified industries, we aim to electrify human potential.",
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    accentColor: "#10B981",
  },
  {
    icon: Rocket,
    category: "Planetary & Cosmic Disruption",
    points: [
      "Prepare students for Olympiads, Nobel Prizes, Oscars, and leadership",
      "Research Earth and beyond; make humanity a cosmic species",
      "Solve challenges that once seemed eternal",
    ],
    quote: "Like Columbus crossed oceans, humanity must now cross galaxies.",
    gradient: "from-indigo-500/10 via-blue-500/5 to-transparent",
    accentColor: "#6366F1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

export const DisruptionsPro = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="disruptions" className="py-32 md:py-40 bg-gradient-to-b from-muted/20 via-background to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wider uppercase text-accent">Disruptions We Envision</span>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-display tracking-tight">
            Transforming{" "}
            <span className="text-gradient block mt-2">
              Every Domain
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto"
          >
            Six domains where we bring meaningful, purpose-driven transformation
          </motion.p>
        </motion.div>

        {/* Disruption Cards - Two Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {disruptions.map((disruption, index) => {
            const Icon = disruption.icon;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
              >
                <Card className={`group relative p-8 lg:p-10 bg-gradient-to-br ${disruption.gradient} backdrop-blur-2xl border-2 border-white/10 hover:border-white/20 transition-all duration-700 hover:shadow-2xl h-full`}>
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${disruption.accentColor}10, transparent 60%)`
                    }}
                  />

                  <div className="relative space-y-7">
                    {/* Header */}
                    <div className="flex items-start gap-5">
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                        className="w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-xl flex-shrink-0"
                        style={{ boxShadow: `0 8px 32px ${disruption.accentColor}40` }}
                      >
                        <Icon className="w-8 h-8 lg:w-9 lg:h-9" style={{ color: disruption.accentColor }} />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold font-display leading-tight">
                          {disruption.category}
                        </h3>
                      </div>
                    </div>

                    {/* Points */}
                    <ul className="space-y-4">
                      {disruption.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                        >
                          <span 
                            className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: disruption.accentColor }}
                          />
                          <span className="text-base lg:text-lg">{point}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Quote */}
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-sm lg:text-base italic text-muted-foreground leading-relaxed">
                        <span style={{ color: disruption.accentColor }} className="font-bold text-lg mr-2">
                          "
                        </span>
                        {disruption.quote}
                      </p>
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div 
                    className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle, ${disruption.accentColor}20, transparent)` }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
