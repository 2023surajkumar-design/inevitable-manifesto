import { Card } from "@/components/ui/card";
import { 
  BookText, 
  Database, 
  Heart, 
  Lightbulb, 
  TrendingUp, 
  Rocket 
} from "lucide-react";

const disruptions = [
  {
    icon: BookText,
    category: "Educational Disruption",
    points: [
      "Collapse the silos: school, college, PhD → One integrated research-driven ecosystem",
      "From rote memorization → deep research and questioning from childhood",
      "Replace grades → skills, creativity, and leadership as true metrics",
    ],
    quote: "Like Gutenberg's press ended the monopoly of scribes, our system will end the monopoly of rote.",
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
  },
];

export const Disruptions = () => {
  return (
    <section id="disruptions" className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Disruptions We <span className="text-gradient">Envision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Six domains where we will bring meaningful, purpose-driven transformation
          </p>
        </div>

        {/* Disruption Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {disruptions.map((disruption, index) => (
            <Card
              key={index}
              className="group p-8 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <disruption.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {disruption.category}
                  </h3>
                </div>

                {/* Points */}
                <ul className="space-y-3">
                  {disruption.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-accent mt-1.5 flex-shrink-0">→</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Quote */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm italic text-muted-foreground">
                    <span className="text-accent font-semibold">✨</span> {disruption.quote}
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
