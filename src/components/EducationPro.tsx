import { Card } from "@/components/ui/card";
import { 
  Compass, 
  MapPin, 
  Target, 
  Globe2, 
  Microscope, 
  Medal,
  LucideIcon
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
  impact: string;
  accentColor: string;
  gradient: string;
}

const principles: Principle[] = [
  {
    icon: Compass,
    title: "Early Moral Awareness",
    description: "Introduce societal awareness and moral intelligence from early years. A 10-year-old should grasp empathy, fairness, and civic duty alongside arithmetic.",
    impact: "Build citizens who grow as pillars of justice and integrity from the outset.",
    accentColor: "#4A9EFF",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    icon: MapPin,
    title: "Education Beyond Walls",
    description: "Replace textbook-driven memorization with experiential, reflective, and project-based learning in ecosystems beyond schools.",
    impact: "Like da Vinci who studied life directly, learners engage with the world as their classroom.",
    accentColor: "#A855F7",
    gradient: "from-purple-500/10 to-transparent",
  },
  {
    icon: Target,
    title: "Depth over Breadth",
    description: "Focus on fewer, deeper, research-intensive areas. Every learner graduates with profound expertise in at least one domain.",
    impact: "Education produces creators, not consumers of knowledge.",
    accentColor: "#10B981",
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    icon: Globe2,
    title: "Universal Access",
    description: "Build global digital knowledge repositories, free for every learner. Use AI-driven personalized learning adapted to each child's strengths.",
    impact: "As sunlight belongs to all, so must knowledge.",
    accentColor: "#FFC107",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    icon: Microscope,
    title: "Research Orientation",
    description: "From childhood, every student is a researcher, innovator, and pioneer. Integrate AI, robotics, and future technologies into classrooms.",
    impact: "Learners live in a research-first culture, solving global challenges from the start.",
    accentColor: "#EC4899",
    gradient: "from-pink-500/10 to-transparent",
  },
  {
    icon: Medal,
    title: "Discipline, Merit, Sacrifice",
    description: "Excellence demands discipline. Deep work requires sacrifice. True merit is earned through dedication and contribution to humanity.",
    impact: "Without commitment, disruption becomes chaos—purpose gives it meaning.",
    accentColor: "#6366F1",
    gradient: "from-indigo-500/10 to-transparent",
  },
];

export const EducationPro = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="education" className="py-32 md:py-40 relative overflow-hidden bg-gradient-to-b from-background to-muted/10">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[200px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
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
            <div className="px-6 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wider uppercase text-primary">Educational Reform</span>
            </div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-display tracking-tight">
            Principles of{" "}
            <span className="text-gradient-alt block mt-2">
              Transformation
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto"
          >
            A manifesto for transforming education from its essence—not just its tools
          </motion.p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 90,
                  damping: 15
                }}
              >
                <Card className={`group relative p-8 bg-gradient-to-br ${principle.gradient} backdrop-blur-2xl border-2 border-white/10 hover:border-white/20 transition-all duration-700 hover:shadow-2xl h-full overflow-hidden`}>
                  {/* Number Badge */}
                  <div 
                    className="absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center font-bold text-lg border-2"
                    style={{ 
                      borderColor: `${principle.accentColor}40`,
                      backgroundColor: `${principle.accentColor}10`,
                      color: principle.accentColor
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${principle.accentColor}08, transparent 70%)`
                    }}
                  />

                  <div className="relative space-y-5">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-xl"
                      style={{ boxShadow: `0 8px 24px ${principle.accentColor}30` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: principle.accentColor }} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold font-display leading-tight">
                      {principle.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>

                    {/* Impact */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs lg:text-sm font-medium italic leading-relaxed" style={{ color: principle.accentColor }}>
                        {principle.impact}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div 
                    className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle, ${principle.accentColor}25, transparent)` }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 backdrop-blur-2xl shadow-2xl">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display leading-tight">
                  "Education is not a frozen structure but a living organism."
                </h3>
              </motion.div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The Inevitable exists to redesign education's essence: from rote transfer of knowledge 
                into a dynamic journey of self-discovery, moral grounding, innovation, and lifelong contribution.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
