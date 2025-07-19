
import { useEffect, useState } from "react";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [typingText, setTypingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["landing pages", "funnels", "experiences", "interfaces"];

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        setTypingText(currentWord.slice(0, charIndex + 1));
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        setTypingText(currentWord.slice(0, charIndex - 1));
        charIndex--;
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        isDeleting = false;
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex]);

  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.width = Math.random() * 4 + 2 + "px";
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 15 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
      
      const particlesContainer = document.querySelector(".particles");
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 25000);
      }
    };

    const particleInterval = setInterval(createParticle, 3000);
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 300);
    }

    return () => clearInterval(particleInterval);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
        <div className="particles"></div>
      </div>
      
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full animate-float blur-xl"></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-accent/20 rounded-full animate-float blur-xl" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/30 rounded-full animate-float blur-xl" style={{ animationDelay: "4s" }}></div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Profile Photo Section - Positioned at the top */}
          <div className="relative mb-4">
            {/* Profile Photo with Premium Hover Effect and Float Animation */}
            <div className="profile-container w-64 h-64 md:w-72 md:h-72 relative group cursor-pointer animate-float">
              <div className="profile-card w-full h-full bg-gradient-to-br from-card to-card/80 border border-border rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_25px_50px_-12px_hsl(var(--primary)/0.5)] group-hover:border-primary/50 group-hover:-translate-y-2">
                <div className="relative w-full h-full">
                  <img 
                    src="/lovable-uploads/4b669d55-1c78-4a05-838c-a1b9a5810a78.png" 
                    alt="Christian Kevin Flores - Professional Designer" 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.log('Image failed to load');
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 group-hover:from-primary/40 group-hover:to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-all duration-500 group-hover:translate-y-1">
                    <h3 className="text-lg font-poppins font-semibold text-white transition-all duration-500 group-hover:text-primary-foreground group-hover:drop-shadow-lg">Christian Kevin Flores</h3>
                    <p className="text-sm text-white/80 transition-all duration-500 group-hover:text-primary-foreground/90">Creative Designer</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-primary/30 via-transparent to-accent/30"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements around the photo */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-card border border-border rounded-xl shadow-lg animate-float hover-glow">
              <div className="h-full flex items-center justify-center">
                <i className="fas fa-tablet-alt text-xl text-primary"></i>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-card border border-border rounded-xl shadow-lg animate-float hover-glow" style={{ animationDelay: "1s" }}>
              <div className="h-full flex items-center justify-center">
                <i className="fas fa-mobile-alt text-lg text-primary"></i>
              </div>
            </div>
          </div>

          {/* Text Content - Positioned below the photo */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-foreground">
                Creative
                <span className="block gradient-text">Designer</span>
              </h1>
              
              <div className="text-xl md:text-2xl text-muted-foreground font-montserrat">
                I design{" "}
                <span className="text-primary font-semibold border-r-2 border-primary animate-pulse">
                  {typingText}
                </span>
              </div>
            </div>

            <p className="hero-subtitle text-lg md:text-xl text-muted-foreground font-montserrat max-w-2xl mx-auto">
              Crafting beautiful, conversion-focused designs that blend creativity with strategy. 
              Specialized in landing pages, funnels, and user experiences that drive results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="hover-lift font-montserrat font-semibold px-8 py-3 text-lg"
                onClick={scrollToServices}
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-lift font-montserrat font-semibold px-8 py-3 text-lg border-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 justify-center pt-4">
              {["dribbble", "behance", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover-lift hover-glow transition-all"
                >
                  <i className={`fab fa-${social} text-xl text-primary`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToServices}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </button>
      </div>
    </section>
  );
};
