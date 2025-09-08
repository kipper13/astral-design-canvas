import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Logo entrance animation - slower and more subtle
    if (logoRef.current && logoTextRef.current) {
      gsap.fromTo(logoRef.current, 
        { 
          opacity: 0, 
          y: -10,
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.3
        }
      );

      // Very subtle pulse animation
      gsap.to(logoRef.current, {
        scale: 1.01,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Slower text shimmer effect
      gsap.to(logoTextRef.current, {
        backgroundPosition: "200% 0%",
        duration: 6,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "portfolio", "skills", "process", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const handleLogoHover = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        rotation: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleLogoLeave = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleLogoClick = () => {
    if (logoRef.current) {
      // Subtle click animation
      gsap.to(logoRef.current, {
        scale: 0.98,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(logoRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.2)"
          });
        }
      });
    }
    scrollToSection("hero");
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "skills", label: "Skills" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  return (
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDark ? 'bg-background/80 shadow-lg backdrop-blur-lg' : 'bg-white/80 shadow-lg backdrop-blur-lg') : (isDark ? 'bg-background/40' : 'bg-white/40')} glass-nav` }>
  <div className="container mx-auto px-4 py-2 glass-nav-content">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <div 
            ref={logoRef}
            className="logo-container cursor-pointer"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            onClick={handleLogoClick}
          >
            <span 
              ref={logoTextRef}
              className="text-2xl font-poppins font-bold text-white relative"
              style={{
                textShadow: '0 0 10px rgba(79, 99, 210, 0.5)',
                backgroundImage: 'linear-gradient(45deg, hsl(229, 75%, 50%), hsl(280, 90%, 55%), hsl(11, 90%, 65%), hsl(229, 75%, 50%))',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'subtleShimmerGradient 8s ease-in-out infinite'
              }}
            >
              Kev'nCreates
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`glass-nav-item relative font-montserrat font-thin transition-all duration-300 ease-in-out ${
                  activeSection === item.id ? "text-blue-400" : "glass-nav-item"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
            
            {/* Magic Theme Toggle */}
            <div className="magic-toggle-container ml-6 glass-nav-item">
              <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
                className="magic-toggle"
                aria-label="Toggle theme"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <div className="magic-toggle-container glass-nav-item">
              <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
                className="magic-toggle"
                aria-label="Toggle theme"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-nav-item text-white hover:text-blue-400 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`glass-nav-item text-left font-montserrat font-thin transition-all duration-300 ease-in-out ${
                    activeSection === item.id ? "text-blue-400" : "glass-nav-item"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};