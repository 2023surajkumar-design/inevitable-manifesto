import { useEffect } from "react";
import { ImmersiveBackgroundProvider } from "@/components/ui/immersive-background";
import { HeroPro } from "@/components/HeroPro";
import { PhilosophyPro } from "@/components/PhilosophyPro";
import { VisionPro } from "@/components/VisionPro";
import { DisruptionsPro } from "@/components/DisruptionsPro";
import { EducationPro } from "@/components/EducationPro";
import { CallToActionPro } from "@/components/CallToActionPro";
import { Footer } from "@/components/Footer";
import { NavigationOrb } from "@/components/NavigationOrb";
import { HistoricalTimeline } from "@/components/HistoricalTimeline";
import { PhilosophyExplorer } from "@/components/PhilosophyExplorer";
import { QuoteCarousel } from "@/components/QuoteCarousel";
import { 
  heroQuotes, 
  visionQuotes, 
  disruptionQuotes, 
  educationQuotes, 
  closingQuotes 
} from "@/utils/manifestoContent";
import { useReducedMotion, useSkipToContent, useSectionNavigation } from "@/lib/accessibility";
import { useDeviceCapabilities } from "@/lib/performance";

const Index = () => {
  const prefersReducedMotion = useReducedMotion();
  const capabilities = useDeviceCapabilities();
  
  // Enable keyboard navigation
  useSkipToContent();
  useSectionNavigation();

  // Log accessibility preferences for debugging
  useEffect(() => {
    if (prefersReducedMotion) {
      console.info("Reduced motion preference detected - animations simplified");
    }
    if (!capabilities.isHighPerformance) {
      console.info("Lower performance device detected - optimizing 3D rendering");
    }
  }, [prefersReducedMotion, capabilities.isHighPerformance]);

  return (
    <ImmersiveBackgroundProvider className="min-h-screen">
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content (Alt+S)
      </a>

      {/* Hero section */}
      <section id="hero" data-section-id="hero" aria-label="Hero">
        <HeroPro />
      </section>

      {/* Main content sections */}
      <main id="main-content">
        <section id="philosophy" data-section-id="philosophy" aria-label="Philosophy">
          <PhilosophyPro />
        </section>

        {/* Quote Divider */}
        <div className="py-16 px-6">
          <QuoteCarousel 
            quotes={heroQuotes} 
            variant="section" 
            autoPlay={true}
            interval={8000}
          />
        </div>

        <div className="py-16">
          <HistoricalTimeline />
        </div>

        {/* Quote Divider */}
        <div className="py-16 px-6">
          <QuoteCarousel 
            quotes={disruptionQuotes} 
            variant="section" 
            autoPlay={true}
            interval={8000}
          />
        </div>

        <div className="py-16">
          <PhilosophyExplorer />
        </div>

        {/* Quote Divider */}
        <div className="py-16 px-6">
          <QuoteCarousel 
            quotes={educationQuotes} 
            variant="section" 
            autoPlay={true}
            interval={8000}
          />
        </div>

        <section id="vision" data-section-id="vision" aria-label="Vision">
          <VisionPro />
        </section>

        {/* Quote Divider */}
        <div className="py-16 px-6">
          <QuoteCarousel 
            quotes={visionQuotes} 
            variant="section" 
            autoPlay={true}
            interval={8000}
          />
        </div>

        <section id="disruptions" data-section-id="disruptions" aria-label="Disruptions">
          <DisruptionsPro />
        </section>

        {/* Quote Divider */}
        <div className="py-16 px-6">
          <QuoteCarousel 
            quotes={educationQuotes} 
            variant="section" 
            autoPlay={true}
            interval={8000}
          />
        </div>

        <section id="education" data-section-id="education" aria-label="Education">
          <EducationPro />
        </section>

        {/* Quote Divider */}
        <div className="py-16 px-6">
          <QuoteCarousel 
            quotes={closingQuotes} 
            variant="section" 
            autoPlay={true}
            interval={8000}
          />
        </div>

        <section id="join" data-section-id="join" aria-label="Join the Movement">
          <CallToActionPro />
        </section>
      </main>

      <Footer />
      
      {/* Navigation Orb */}
      <NavigationOrb />
      
      {/* Accessibility announcements region */}
      <output 
        id="a11y-announcer" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
    </ImmersiveBackgroundProvider>
  );
};

export default Index;


