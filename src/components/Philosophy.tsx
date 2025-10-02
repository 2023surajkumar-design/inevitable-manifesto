import { Card } from "@/components/ui/card";
import { Flame, GraduationCap, RefreshCw, Brain, Users } from "lucide-react";

const philosophies = [
  {
    icon: Flame,
    title: "Disruption as Renewal",
    description: "Disruption is not destruction—it is rebirth, the phoenix cycle of progress. Every system that resists disruption collapses; every system that embraces it evolves.",
    color: "text-accent",
  },
  {
    icon: GraduationCap,
    title: "Education as Transformation",
    description: "Education is not content delivery; it is the unlocking of human potential, a mirror and compass for the collective consciousness of society.",
    color: "text-primary",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvisation",
    description: "Like jazz, life evolves in improvisation—each note disrupts the last, creating music richer than silence. Nothing is final; everything awaits reinvention.",
    color: "text-secondary",
  },
  {
    icon: Brain,
    title: "Holistic Knowledge",
    description: "Science provides precision, society gives context, and spirituality offers depth. Together, they create understanding, not just knowledge.",
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Existential Responsibility",
    description: "To live is to create, question, and contribute. Leave the world altered because you existed—this is humanity's highest calling.",
    color: "text-primary",
  },
];

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Core <span className="text-gradient">Philosophy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five foundational principles that guide our vision of disruption and evolution
          </p>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <Card 
              key={index}
              className="group p-8 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
