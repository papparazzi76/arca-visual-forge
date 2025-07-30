import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TemplateLibrary } from "@/components/TemplateLibrary";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TemplateLibrary />
      <FeatureShowcase />
      <Footer />
    </div>
  );
};

export default Index;
