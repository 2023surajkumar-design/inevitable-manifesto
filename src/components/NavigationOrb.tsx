import * as React from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { 
  Home, 
  Lightbulb, 
  Clock, 
  Eye, 
  Zap, 
  GraduationCap, 
  Users,
  Share2,
  Bookmark,
  Printer,
  Sun,
  Moon,
  ChevronUp,
  Navigation,
} from "lucide-react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

// Navigation sections
const navigationSections = [
  { id: "hero", label: "Home", icon: Home },
  { id: "philosophy", label: "Philosophy", icon: Lightbulb },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "vision", label: "Vision", icon: Eye },
  { id: "disruptions", label: "Disruptions", icon: Zap },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "join", label: "Join", icon: Users },
];

// Theme colors for different sections - Phoenix themed
const sectionThemes = {
  hero: "hsl(var(--phoenix-red))",
  philosophy: "hsl(var(--quantum-violet))", 
  timeline: "hsl(var(--renaissance-gold))",
  vision: "hsl(var(--cosmic-dawn))",
  disruptions: "hsl(var(--phoenix-red))",
  education: "hsl(var(--quantum-violet))",
  join: "hsl(var(--cosmic-dawn))",
};

// 3D Orb Component
const NavigationSphere: React.FC<{
  color: string;
  intensity: number;
  morphing: boolean;
}> = ({ color, intensity, morphing }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.01;
    
    // Pulsing scale based on intensity
    const scale = 1 + intensity * 0.3;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });
  
  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={morphing ? 0.4 : 0.2}
        speed={morphing ? 3 : 1}
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={intensity * 0.5}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// Hook to track current section
const useCurrentSection = () => {
  const [currentSection, setCurrentSection] = React.useState("hero");
  
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px",
      threshold: 0.3,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    // Observe all navigation sections
    navigationSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  return currentSection;
};

interface NavigationOrbProps {
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  isDraggable?: boolean;
}

export const NavigationOrb: React.FC<NavigationOrbProps> = ({
  className,
  position = "bottom-right",
  isDraggable = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [userPosition, setUserPosition] = React.useState<{ x: number; y: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isAutoHiding, setIsAutoHiding] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  
  const currentSection = useCurrentSection();
  const { scrollYProgress } = useScroll();
  
  // Hide timer
  const hideTimerRef = React.useRef<NodeJS.Timeout>();
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout>();
  const lastScrollY = React.useRef(0);
  
  // Animation values
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbIntensity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const springIntensity = useSpring(orbIntensity, { stiffness: 100, damping: 30 });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Get current section theme
  const currentTheme = sectionThemes[currentSection as keyof typeof sectionThemes] || "hsl(var(--phoenix-red))";
  
  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8", 
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
  };
  
  // Handle hover with delay
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Add a small delay before closing to prevent accidental closure
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setIsExpanded(false);
      }
    }, 200);
  };
  
  // Handle auto-hide on scroll stop
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show orb when scrolling
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsVisible(true);
        setIsAutoHiding(false);
        
        // Clear existing timer
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
        
        // Set new timer to hide after inactivity
        hideTimerRef.current = setTimeout(() => {
          if (!isExpanded && !isHovering) {
            setIsAutoHiding(true);
            setTimeout(() => setIsVisible(false), 300);
          }
        }, 3000);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isExpanded, isHovering]);
  
  // Handle mouse movement to show orb
  React.useEffect(() => {
    const handleMouseMove = () => {
      if (!isVisible) {
        setIsVisible(true);
        setIsAutoHiding(false);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);
  
  // Dark mode detection and persistence
  React.useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme-preference");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
    
    // Watch for changes to the document class
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    // Watch for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme-preference")) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };
    
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);
  
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Keep menu open briefly to show user feedback, then close
      setTimeout(() => setIsExpanded(false), 500);
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The Inevitable - A Revolutionary Manifesto",
          text: "Explore a movement where disruption becomes sacred practice",
          url: window.location.href,
        });
      } catch (err) {
        // Share was cancelled or failed - this is expected behavior
        console.log("Share cancelled or failed", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Could show a toast notification here
        console.log("URL copied to clipboard");
      } catch (err) {
        console.log("Failed to copy URL", err);
      }
    }
    setTimeout(() => setIsExpanded(false), 500);
  };
  
  const handleBookmark = () => {
    try {
      // Save to localStorage for now, could integrate with a bookmarking service
      localStorage.setItem("inevitable-bookmark", JSON.stringify({
        url: window.location.href,
        timestamp: Date.now(),
        section: currentSection,
        title: "The Inevitable - " + (navigationSections.find(s => s.id === currentSection)?.label || "Home"),
      }));
      console.log("Page bookmarked successfully");
    } catch (err) {
      console.log("Failed to bookmark page", err);
    }
    setTimeout(() => setIsExpanded(false), 500);
  };
  
  const handlePrint = () => {
    window.print();
    setTimeout(() => setIsExpanded(false), 500);
  };
  
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    
    if (isDark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    
    // Save preference
    localStorage.setItem("theme-preference", isDark ? "light" : "dark");
    setTimeout(() => setIsExpanded(false), 500);
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsExpanded(false), 500);
  };
  
  const suggestNextSection = () => {
    const currentIndex = navigationSections.findIndex(s => s.id === currentSection);
    const nextIndex = (currentIndex + 1) % navigationSections.length;
    return navigationSections[nextIndex];
  };
  
  const nextSection = suggestNextSection();
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "fixed z-50",
            positionClasses[position],
            userPosition ? "cursor-move" : "",
            className
          )}
          style={userPosition ? { 
            right: "auto", 
            bottom: "auto", 
            left: userPosition.x, 
            top: userPosition.y 
          } : {}}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isAutoHiding ? 0.3 : 1, 
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          drag={isDraggable}
          onDragEnd={(e, info) => {
            if (isDraggable) {
              setUserPosition({
                x: info.point.x - 32, // Adjust for orb size
                y: info.point.y - 32,
              });
            }
          }}
          // Handle hover for the entire component area
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Orb */}
          <motion.div
            className="relative"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* 3D Orb */}
            <div className="w-16 h-16 relative cursor-pointer">
              <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[2, 2, 2]} intensity={0.8} />
                <NavigationSphere
                  color={currentTheme}
                  intensity={springIntensity.get()}
                  morphing={isExpanded}
                />
              </Canvas>
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-16 h-16 transform -rotate-90 pointer-events-none">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={currentTheme}
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    pathLength: pathLength,
                  }}
                  initial={{ pathLength: 0 }}
                />
              </svg>
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Navigation className="w-6 h-6 text-white" style={{ color: currentTheme }} />
              </div>
            </div>
            
            {/* Particle Trail */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  `radial-gradient(circle at center, ${currentTheme}40 0%, transparent 70%)`,
                  `radial-gradient(circle at center, ${currentTheme}20 0%, transparent 90%)`,
                  `radial-gradient(circle at center, ${currentTheme}40 0%, transparent 70%)`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: "blur(10px)", transform: "scale(1.5)" }}
            />
          </motion.div>
          
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-20 right-0 mb-4"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 min-w-64 shadow-2xl">
                  {/* Current Section */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                      Current Section
                    </div>
                    <div className="flex items-center gap-3">
                      {React.createElement(
                        navigationSections.find(s => s.id === currentSection)?.icon || Home,
                        { className: "w-5 h-5", style: { color: currentTheme } }
                      )}
                      <span className="text-white font-medium">
                        {navigationSections.find(s => s.id === currentSection)?.label || "Home"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Navigation Sections */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-white/60 mb-3">
                      Navigation
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {navigationSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = section.id === currentSection;
                        
                        return (
                          <button
                            key={section.id}
                            onClick={() => handleSectionClick(section.id)}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-200",
                              isActive
                                ? "bg-white/20 text-white ring-1 ring-white/30"
                                : "hover:bg-white/10 text-white/70 hover:text-white"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{section.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wider text-white/60 mb-3">
                      Quick Actions
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 p-2 rounded-lg text-sm hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      
                      <button
                        onClick={handleBookmark}
                        className="flex items-center gap-2 p-2 rounded-lg text-sm hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 p-2 rounded-lg text-sm hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </button>
                      
                      <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 p-2 rounded-lg text-sm hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
                      >
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        <span>{isDarkMode ? "Light" : "Dark"}</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Scroll Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                      <span>Progress</span>
                      <span>{Math.round(scrollProgress.get())}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                        style={{ scaleX: scaleX }}
                      />
                    </div>
                  </div>
                  
                  {/* Suggested Next */}
                  {nextSection.id !== currentSection && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                        Up Next
                      </div>
                      <button
                        onClick={() => handleSectionClick(nextSection.id)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 w-full"
                      >
                        <nextSection.icon className="w-5 h-5 text-blue-400" />
                        <div className="text-left">
                          <div className="text-white font-medium">{nextSection.label}</div>
                          <div className="text-xs text-white/60">Continue exploring</div>
                        </div>
                        <ChevronUp className="w-4 h-4 text-white/40 ml-auto" />
                      </button>
                    </div>
                  )}
                  
                  {/* Back to Top */}
                  <button
                    onClick={scrollToTop}
                    className="w-full mt-4 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  >
                    Back to Top
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};