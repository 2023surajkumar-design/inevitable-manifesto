import { Card } from "@/components/ui/card";
import { Flame, GraduationCap, RefreshCw, Brain, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import sacredGeometry from "@/assets/sacred-geometry.jpg";

const philosophies = [
  {
    icon: Flame,
    title: "Disruption as Renewal",
    description: "Disruption is not destruction—it is rebirth, the phoenix cycle of progress. Every system that resists disruption collapses; every system that embraces it evolves.",
    color: "text-accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: GraduationCap,
    title: "Education as Transformation",
    description: "Education is not content delivery; it is the unlocking of human potential, a mirror and compass for the collective consciousness of society.",
    color: "text-primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvisation",
    description: "Like jazz, life evolves in improvisation—each note disrupts the last, creating music richer than silence. Nothing is final; everything awaits reinvention.",
    color: "text-secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Brain,
    title: "Holistic Knowledge",
    description: "Science provides precision, society gives context, and spirituality offers depth. Together, they create understanding, not just knowledge.",
    color: "text-accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Users,
    title: "Existential Responsibility",
    description: "To live is to create, question, and contribute. Leave the world altered because you existed—this is humanity's highest calling.",
    color: "text-primary",
    gradient: "from-primary/20 to-primary/5",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export const PhilosophyEnhanced = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="philosophy" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${sacredGeometry})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 font-display">
              Core <span className="text-gradient-alt cosmic-glow">Philosophy</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Five foundational principles that guide our vision of disruption and evolution
          </motion.p>
        </motion.div>

        {/* Philosophy Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {philosophies.map((philosophy, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="perspective-1000"
            >
              <Card className={`group p-8 bg-gradient-to-br ${philosophy.gradient} backdrop-blur-sm border-2 border-transparent hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 transform-3d h-full relative overflow-hidden`}>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative space-y-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center`}
                  >
                    <philosophy.icon className={`w-8 h-8 ${philosophy.color}`} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors font-display">
                    {philosophy.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:from-primary/20 transition-all duration-500" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
