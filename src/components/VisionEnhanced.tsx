import { Card } from "@/components/ui/card";
import { BookOpen, Users2, Globe, Infinity, Sparkles, LucideIcon } from "lucide-react";
import phoenixImage from "@/assets/phoenix-disruption.jpg";
import futureEducation from "@/assets/future-education.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface VisionPillar {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
}

const visionPillars: VisionPillar[] = [
  {
    icon: BookOpen,
    title: "Reimagined Education",
    description: "A seamless continuum from early years to lifelong learning, where every learner is a researcher, innovator, and creator.",
    highlight: "No silos—just one ecosystem of curiosity",
  },
  {
    icon: Users2,
    title: "Holistic Development",
    description: "Fusing intellect, values, spirituality, creativity, and joy to create balanced individuals who are global role models.",
    highlight: "Excellence with wisdom, not without it",
  },
  {
    icon: Globe,
    title: "Global Transformation",
    description: "An ecosystem that doesn't just educate but solves planetary challenges—climate, inequality, AI ethics, and beyond.",
    highlight: "A beacon for redefining learning itself",
  },
  {
    icon: Infinity,
    title: "Free, Accessible Knowledge",
    description: "Knowledge as humanity's collective inheritance—free, transparent, and globally accessible to all.",
    highlight: "A birthright, not a privilege",
  },
  {
    icon: Sparkles,
    title: "Evolutionary Purpose",
    description: "Beyond survival, the purpose of life is continuous exploration, questioning, and redefining existence—on Earth and beyond.",
    highlight: "Turning curiosity into destiny",
  },
];

export const VisionEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="vision" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 font-display"
          >
            Our <span className="text-gradient cosmic-glow-strong">Vision</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            <span className="text-foreground font-semibold">
              "To guide humanity into an inevitable future of purpose-driven disruption, 
            </span>
            <br className="hidden md:block" />
            where education, innovation, and consciousness redefine how we live, learn, and evolve."
          </motion.p>
        </motion.div>

        {/* Vision Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {visionPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="perspective-1000"
                >
                  <Card className="group relative overflow-hidden p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full">
                    {/* Background Image on Hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${index % 2 === 0 ? futureEducation : phoenixImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-secondary/10 group-hover:to-accent/10 transition-all duration-500"
                    />
                    
                    <div className="relative space-y-4">
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg"
                        >
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors font-display">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="pt-2"
                      >
                        <p className="text-sm font-semibold text-accent italic flex items-center gap-2">
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            →
                          </motion.span>
                          {pillar.highlight}
                        </p>
                      </motion.div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl group-hover:from-primary/30 transition-all duration-500" />
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
