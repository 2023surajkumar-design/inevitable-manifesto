import { HeroEnhanced } from "@/components/HeroEnhanced";
import { PhilosophyEnhanced } from "@/components/PhilosophyEnhanced";
import { VisionEnhanced } from "@/components/VisionEnhanced";
import { Disruptions } from "@/components/Disruptions";
import { Education } from "@/components/Education";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroEnhanced />
      <PhilosophyEnhanced />
      <VisionEnhanced />
      <Disruptions />
      <Education />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
