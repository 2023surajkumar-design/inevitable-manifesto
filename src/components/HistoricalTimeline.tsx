import * as React from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Scroll, Sparkles, Factory, Zap, Globe, Cpu, Rocket } from "lucide-react";

import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/ui/text-reveal";
import SacredGeometry from "@/components/SacredGeometry";
import { QuoteCarousel } from "@/components/QuoteCarousel";
import { historicalEvents, type TimelineEvent } from "@/utils/manifestoContent";

const iconMap = {
  scroll: Scroll,
  sparkle: Sparkles,
  factory: Factory,
  bolt: Zap,
  globe: Globe,
  cpu: Cpu,
  rocket: Rocket,
};

const themeColors = {
  renaissance: "hsl(var(--renaissance-gold))",
  enlightenment: "hsl(var(--enlightenment-blue))",
  industrial: "hsl(var(--revolution-crimson))",
  electric: "hsl(var(--phoenix-red))",
  digital: "hsl(var(--cosmic-dawn))",
  ai: "hsl(var(--quantum-violet))",
  future: "hsl(var(--nebula-pink))",
};

interface HistoricalTimelineProps {
  className?: string;
  autoPlay?: boolean;
  showProgress?: boolean;
}

export const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({
  className,
  autoPlay = false,
  showProgress = true,
}) => {
  const [selectedEvent, setSelectedEvent] = React.useState<TimelineEvent | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(autoPlay);
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % historicalEvents.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView]);
  
  // Scroll to current event
  React.useEffect(() => {
    if (!timelineRef.current) return;
    
    const eventElement = timelineRef.current.children[currentIndex] as HTMLElement;
    if (eventElement) {
      eventElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);
  
  const handleEventClick = (event: TimelineEvent, index: number) => {
    setSelectedEvent(event);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };
  
  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentIndex((prev) => {
      const newIndex = direction === "prev" 
        ? (prev === 0 ? historicalEvents.length - 1 : prev - 1)
        : (prev + 1) % historicalEvents.length;
      
      // Scroll the timeline to show the selected event
      setTimeout(() => {
        if (timelineRef.current) {
          const eventElement = timelineRef.current.children[newIndex] as HTMLElement;
          if (eventElement) {
            eventElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }, 100);
      
      return newIndex;
    });
    
    // Pause auto-play when user manually navigates
    setIsAutoPlaying(false);
  };
  
  return (
    <section ref={containerRef} className={cn("relative py-24 overflow-hidden", className)}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <SacredGeometry
          type="golden-spiral"
          size={800}
          color="hsl(var(--cosmic-dawn))"
          opacity={0.1}
          animated
          className="absolute -top-40 -right-40"
        />
        <SacredGeometry
          type="flower-of-life"
          size={600}
          color="hsl(var(--renaissance-gold))"
          opacity={0.08}
          animated
          className="absolute -bottom-20 -left-20"
        />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TextReveal
            text="The Arc of Inevitable Disruption"
            className="text-4xl md:text-6xl font-philosophical mb-6 text-gradient cosmic-glow"
            stagger={0.08}
          />
          <TextReveal
            text="Every age of transformation began with a minority audacious enough to imagine a better world"
            className="text-lg md:text-xl text-revolutionary text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            delay={0.4}
            stagger={0.03}
          />
        </motion.div>
        
        {/* Timeline Navigation */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => handleNavigation("prev")}
            className="p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
            aria-label="Previous event"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="text-sm font-mono">
              {currentIndex + 1} / {historicalEvents.length}
            </span>
          </div>
          
          <button
            onClick={() => handleNavigation("next")}
            className="p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
            aria-label="Next event"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={cn(
              "px-4 py-2 rounded-full border backdrop-blur-md transition-colors text-sm",
              isAutoPlaying
                ? "bg-quantum-violet/20 border-quantum-violet/40 text-quantum-violet"
                : "bg-white/10 border-white/20 hover:bg-white/20"
            )}
          >
            {isAutoPlaying ? "Pause" : "Auto Play"}
          </button>
        </motion.div>
        
        {/* Timeline Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Timeline Track */}
          <div className="relative h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-phoenix-red via-quantum-violet to-cosmic-dawn rounded-full"
              style={{
                width: `${((currentIndex + 1) / historicalEvents.length) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          
          {/* Timeline Events */}
          <div
            ref={timelineRef}
            className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {historicalEvents.map((event, index) => {
              const Icon = iconMap[event.icon as keyof typeof iconMap] || Sparkles;
              const isActive = index === currentIndex;
              const themeColor = themeColors[event.theme];
              
              return (
                <motion.div
                  key={event.id}
                  className={cn(
                    "flex-shrink-0 w-80 snap-center cursor-pointer",
                    "rounded-3xl border border-white/20 backdrop-blur-md overflow-hidden",
                    "transition-all duration-500 hover:scale-105",
                    isActive
                      ? "bg-black/60 border-white/40 shadow-quantum scale-105"
                      : "bg-black/40 hover:bg-black/50 border-white/15"
                  )}
                  onClick={() => handleEventClick(event, index)}
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  {/* Event Header */}
                  <div
                    className="p-6 border-b border-white/10 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor}20 0%, transparent 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}80 100%)`,
                          boxShadow: `0 0 20px ${themeColor}40`,
                        }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-classical" style={{ color: themeColor }}>
                          {event.year}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-white/80 font-mono">
                          {event.theme.replace("-", " ")}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold font-philosophical text-white mb-2">
                      {event.title}
                    </h3>
                  </div>
                  
                  {/* Event Content */}
                  <div className="p-6">
                    <p className="text-sm text-white/90 leading-relaxed mb-4 font-elegant">
                      {event.description}
                    </p>
                    
                    {/* Quote */}
                    <blockquote className="relative">
                      <div className="absolute -left-2 -top-1 text-4xl opacity-30" style={{ color: themeColor }}>
                        "
                      </div>
                      <p className="text-xs italic text-white/80 pl-4 font-elegant">
                        {event.quote.text}
                      </p>
                      {event.quote.attribution && (
                        <cite className="block text-xs text-white/70 mt-2 pl-4 font-mono">
                          — {event.quote.attribution}
                        </cite>
                      )}
                    </blockquote>
                  </div>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ background: themeColor }}
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Quote Divider */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <QuoteCarousel
            quotes={[
              {
                text: "The printing press democratized knowledge. The internet democratized information. We now democratize transformation itself.",
                attribution: "The Inevitable Manifesto",
              },
              {
                text: "Each disruption planted seeds for the next. The Inevitable is humanity's newest fruit.",
                attribution: "The Inevitable Manifesto",
              },
            ]}
            variant="section"
            className="bg-white/5"
          />
        </motion.div>
      </div>
      
      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            className="bg-background/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              {React.createElement(iconMap[selectedEvent.icon as keyof typeof iconMap] || Sparkles, {
                className: "h-8 w-8",
                style: { color: themeColors[selectedEvent.theme] },
              })}
              <div>
                <h2 className="text-3xl font-philosophical text-gradient">
                  {selectedEvent.title}
                </h2>
                <p className="text-lg text-muted-foreground font-classical">
                  {selectedEvent.year}
                </p>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mb-6 font-elegant">
              {selectedEvent.description}
            </p>
            
            <blockquote className="border-l-4 border-quantum-violet/50 pl-6 py-4 bg-white/5 rounded-r-lg">
              <p className="text-lg italic font-elegant text-quantum-violet">
                "{selectedEvent.quote.text}"
              </p>
              {selectedEvent.quote.attribution && (
                <cite className="block text-sm text-muted-foreground mt-2 font-mono">
                  — {selectedEvent.quote.attribution}
                </cite>
              )}
            </blockquote>
            
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-8 px-6 py-2 bg-quantum-violet/20 border border-quantum-violet/40 rounded-full text-quantum-violet hover:bg-quantum-violet/30 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};