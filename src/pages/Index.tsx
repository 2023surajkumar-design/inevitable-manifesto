import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Vision } from "@/components/Vision";
import { Disruptions } from "@/components/Disruptions";
import { Education } from "@/components/Education";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Philosophy />
      <Vision />
      <Disruptions />
      <Education />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
