import { Card } from "@/components/ui/card";
import { 
  Compass, 
  MapPin, 
  Target, 
  Globe2, 
  Microscope, 
  Medal 
} from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Early Moral Awareness",
    description: "Introduce societal awareness and moral intelligence from early years. A 10-year-old should grasp empathy, fairness, and civic duty alongside arithmetic.",
    impact: "Build citizens who grow as pillars of justice and integrity from the outset.",
  },
  {
    icon: MapPin,
    title: "Education Beyond Walls",
    description: "Replace textbook-driven memorization with experiential, reflective, and project-based learning in ecosystems beyond schools.",
    impact: "Like da Vinci who studied life directly, learners engage with the world as their classroom.",
  },
  {
    icon: Target,
    title: "Depth over Breadth",
    description: "Focus on fewer, deeper, research-intensive areas. Every learner graduates with profound expertise in at least one domain.",
    impact: "Education produces creators, not consumers of knowledge.",
  },
  {
    icon: Globe2,
    title: "Universal Access",
    description: "Build global digital knowledge repositories, free for every learner. Use AI-driven personalized learning adapted to each child's strengths.",
    impact: "As sunlight belongs to all, so must knowledge.",
  },
  {
    icon: Microscope,
    title: "Research Orientation",
    description: "From childhood, every student is a researcher, innovator, and pioneer. Integrate AI, robotics, and future technologies into classrooms.",
    impact: "Learners live in a research-first culture, solving global challenges from the start.",
  },
  {
    icon: Medal,
    title: "Discipline, Merit, Sacrifice",
    description: "Excellence demands discipline. Deep work requires sacrifice. True merit is earned through dedication and contribution to humanity.",
    impact: "Without commitment, disruption becomes chaos—purpose gives it meaning.",
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Educational <span className="text-gradient">Reform Principles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A manifesto for transforming education from its essence—not just its tools
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className="group relative p-8 bg-card/60 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number badge */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {index + 1}
              </div>

              <div className="space-y-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <principle.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>

                {/* Impact */}
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs font-medium text-accent italic">
                    → {principle.impact}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="mt-16 text-center max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">
              "Education is not a frozen structure but a living organism."
            </p>
            <p className="text-muted-foreground">
              The Inevitable exists to redesign education's essence: from rote transfer of knowledge 
              into a dynamic journey of self-discovery, moral grounding, innovation, and lifelong contribution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
