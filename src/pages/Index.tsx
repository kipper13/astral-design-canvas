import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";
import { SimpleInteractiveBackground } from "@/components/ui/interactive-background";
import { SEOHead } from "@/components/seo/SEOHead";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  useEffect(() => {
    // Ensure minimum loading time for better UX
    const minLoadTime = setTimeout(() => {
      if (!isLoading) return;
    }, 3000);

    return () => clearTimeout(minLoadTime);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <SEOHead 
        title="Christian Kevin Flores - Creative Designer & Developer Portfolio"
        description="Creative designer specializing in high-converting landing pages, funnel optimization, and strategic web experiences. Boost your conversions with data-driven design."
        keywords={['web design', 'landing page designer', 'conversion optimization', 'UI/UX design', 'creative designer', 'funnel design', 'Christian Kevin Flores']}
      />
      <div 
        className={`min-h-screen bg-background transition-opacity duration-1000 relative ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <SimpleInteractiveBackground />
        <div className="relative z-10">
          <Navigation />
          <main id="main-content">
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <SkillsSection />
            <ProcessSection />
            <ContactSection />
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
