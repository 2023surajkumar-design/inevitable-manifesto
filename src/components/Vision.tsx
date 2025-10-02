import { Card } from "@/components/ui/card";
import { BookOpen, Users2, Globe, Infinity, Sparkles } from "lucide-react";
import phoenixImage from "@/assets/phoenix-disruption.jpg";

const visionPillars = [
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

export const Vision = () => {
  return (
    <section id="vision" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{
            backgroundImage: `url(${phoenixImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Vision</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            <span className="text-foreground font-semibold">
              "To guide humanity into an inevitable future of purpose-driven disruption, 
            </span>
            <br className="hidden md:block" />
            where education, innovation, and consciousness redefine how we live, learn, and evolve."
          </p>
        </div>

        {/* Vision Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {visionPillars.map((pillar, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <pillar.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
                
                <div className="pt-2">
                  <p className="text-sm font-semibold text-accent italic">
                    → {pillar.highlight}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
