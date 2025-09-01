
import { useEffect, useState, useRef } from "react";
import { ArrowDown, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
// Using relative import to fix path resolution issue
import { getVideoSources, shouldUseVideoBackground } from "../utils/video-assets";

// Configuration for background type
interface HeroConfig {
  backgroundType: 'gradient' | 'video' | 'image';
  videoAsset?: string; // Key from video assets
  backgroundImage?: string;
  videoOverlay?: 'none' | 'light' | 'dark' | 'gradient';
  videoOverlayOpacity?: number;
}

// 🎬 VIDEO BACKGROUND ENABLED! 🎬
// Make sure your video files are in public/videos/
const heroConfig: HeroConfig = {
  backgroundType: 'video', // ✅ Video background enabled!
  videoAsset: 'hero', // Uses the 'hero' video from video-assets.ts
  backgroundImage: '/hero-bg.jpg', // Static background image fallback
  videoOverlay: 'gradient', // Overlay for better text readability
  videoOverlayOpacity: 0.3 // Adjust opacity (0-1)
};

// Parallax settings
const parallaxConfig = {
  enabled: true,
  forceEnable: true, // Override reduced motion for testing - set to false for production
  videoSpeed: 0.5, // Video parallax speed (0.5 = half speed)
  contentSpeed: 0.2, // Content parallax speed
  fadeContent: true // Fade content on scroll
};

export const HeroSection = () => {
  const [typingText, setTypingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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

  // Parallax scroll effect
  useEffect(() => {
    if (!parallaxConfig.enabled) {
      console.log('⚠️ Parallax disabled in config');
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.log('🎬 Parallax - Reduced motion:', prefersReducedMotion);
    console.log('🎬 Parallax - Force enable:', parallaxConfig.forceEnable);
    
    if (prefersReducedMotion && !parallaxConfig.forceEnable) {
      console.log('⚠️ Parallax disabled due to reduced motion preference');
      return;
    }

    if (parallaxConfig.forceEnable) {
      console.log('🚀 Parallax force enabled - overriding reduced motion');
    }

    console.log('✅ Parallax effect initializing...');

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setScrollY(scrollPosition);
      
      if (heroRef.current && (videoRef.current || contentRef.current)) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrollProgress = Math.min(scrollPosition / heroHeight, 1);
        
        // Apply parallax transforms
        if (videoRef.current) {
          // Video moves slower for parallax effect
          const videoTransform = scrollPosition * parallaxConfig.videoSpeed;
          videoRef.current.style.transform = `translate3d(0, ${videoTransform}px, 0) scale(1.1)`;
        }
        
        if (contentRef.current) {
          // Content moves for depth effect
          const contentTransform = scrollPosition * parallaxConfig.contentSpeed;
          const opacity = parallaxConfig.fadeContent ? Math.max(1 - scrollProgress * 1.5, 0) : 1;
          contentRef.current.style.transform = `translate3d(0, ${contentTransform}px, 0)`;
          contentRef.current.style.opacity = opacity.toString();
        }
      }
    };

    // Add scroll listener with throttling for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      console.log('🧹 Parallax effect cleanup');
    };
  }, []);

  const renderBackground = () => {
    switch (heroConfig.backgroundType) {
      case 'video':
        const videoAsset = getVideoSources(heroConfig.videoAsset!);
        
        if (!videoAsset) {
          return (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
              <div className="particles"></div>
            </div>
          );
        }
        
        return (
          <>
            {/* Video Background */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover parallax-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ zIndex: 1, transformOrigin: 'center center' }}
            >
              <source src={videoAsset.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30" style={{ zIndex: 2 }}></div>
          </>
        );
      case 'image':
        return (
          <>
            <img
              src={heroConfig.backgroundImage!}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
          </>
        );
      case 'gradient':
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20">
            <div className="particles"></div>
          </div>
        );
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      {renderBackground()}
      
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full animate-float blur-xl" style={{ zIndex: 3 }}></div>
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-accent/20 rounded-full animate-float blur-xl" style={{ animationDelay: "2s", zIndex: 3 }}></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/30 rounded-full animate-float blur-xl" style={{ animationDelay: "4s", zIndex: 3 }}></div>

      <div ref={contentRef} className="container mx-auto px-4 py-32 relative parallax-content" style={{ zIndex: 10 }}>
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12">
          
          {/* Left Side - Profile & Visual Elements */}
          <div className="flex-1 flex flex-col items-center lg:items-start space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for new projects
            </div>
            
            {/* Profile Photo with Enhanced Design */}
            <div className="relative">
              <div className="profile-container w-80 h-80 md:w-96 md:h-96 relative group cursor-pointer">
                {/* Animated Border Ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-primary animate-pulse opacity-75 blur-lg"></div>
                
                <div className="profile-card relative w-full h-full bg-gradient-to-br from-card to-card/80 border-2 border-primary/30 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_40px_80px_-12px_hsl(var(--primary)/0.4)] group-hover:border-primary/60 group-hover:-translate-y-4">
                  <div className="relative w-full h-full">
                    {/* Debug Badge */}
                    <div className="absolute top-2 left-2 z-50 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      🔍 Profile Loading...
                    </div>
                    
                    {/* Debug: Check if image loads */}
                    <img
                      src="/lovable-uploads/profile-photo.png"
                      alt="Christian Kevin Flores - Creative Designer"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      loading="eager"
                      onError={(e) => {
                        console.error('❌ Profile image failed to load from:', e.currentTarget.src);
                        console.log('🔄 Trying alternative paths...');
                        // Try different paths as fallback
                        const alternatives = [
                          '/lovable-uploads/4b669d55-1c78-4a05-838c-a1b9a5810a78.png',
                          '/placeholder.svg'
                        ];
                        const currentSrc = e.currentTarget.src;
                        const nextIndex = alternatives.findIndex(alt => currentSrc.includes(alt.split('/').pop()!)) + 1;
                        if (nextIndex < alternatives.length) {
                          e.currentTarget.src = alternatives[nextIndex];
                        }
                      }}
                      onLoad={(e) => {
                        console.log('✅ Profile image loaded successfully from:', e.currentTarget.src);
                        // Remove debug badge when image loads
                        const badge = document.querySelector('.profile-card .absolute.bg-red-500');
                        if (badge) badge.remove();
                      }}
                    />
                    
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-primary/60 group-hover:to-transparent" />
                    
                    {/* Profile Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center transform transition-all duration-700 group-hover:translate-y-2">
                      <h3 className="text-2xl font-poppins font-bold text-white mb-2 transition-all duration-700 group-hover:text-primary-foreground group-hover:drop-shadow-lg">
                        Christian Kevin Flores
                      </h3>
                      <p className="text-lg text-white/90 font-medium transition-all duration-700 group-hover:text-primary-foreground/95">
                        Creative Designer & Developer
                      </p>
                      <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br from-primary/40 via-transparent to-accent/40"></div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-xl animate-float hover-glow backdrop-blur-sm border border-white/10">
                <div className="h-full flex items-center justify-center">
                  <i className="fas fa-palette text-2xl text-white"></i>
                </div>
              </div>
              
              <div className="absolute -bottom-12 -left-12 w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-xl animate-float hover-glow backdrop-blur-sm border border-white/10" style={{ animationDelay: "1s" }}>
                <div className="h-full flex items-center justify-center">
                  <i className="fas fa-code text-xl text-white"></i>
                </div>
              </div>
              
              <div className="absolute top-1/2 -right-16 w-16 h-16 bg-gradient-to-br from-primary/80 to-accent/80 rounded-xl shadow-lg animate-float hover-glow backdrop-blur-sm border border-white/10" style={{ animationDelay: "2s" }}>
                <div className="h-full flex items-center justify-center">
                  <i className="fas fa-rocket text-lg text-white"></i>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Hero Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left py-8">
            {/* Main Heading */}
            <div className="space-y-6 overflow-visible hero-title-container">
              <h1 className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-poppins font-black hero-title-xl">
                <span className="block text-foreground mb-2 md:mb-3">Creative</span>
                <span className="block gradient-text animate-pulse mb-4 md:mb-6">Designer</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-muted-foreground font-normal leading-relaxed">
                  & Developer
                </span>
              </h1>
              
              {/* Dynamic Typing Text */}
              <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-montserrat">
                <span className="text-foreground">I craft </span>
                <span className="text-primary font-bold border-r-4 border-primary animate-pulse bg-primary/10 px-2 py-1 rounded">
                  {typingText}
                </span>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="space-y-4 max-w-2xl lg:max-w-none">
              <p className="text-lg md:text-xl text-muted-foreground font-montserrat leading-relaxed">
                Transforming ideas into <span className="text-primary font-semibold">pixel-perfect experiences</span> that captivate users and drive business growth.
              </p>
              <p className="text-base md:text-lg text-muted-foreground/80 font-montserrat leading-relaxed">
                Specialized in creating conversion-optimized landing pages, engaging user interfaces, and comprehensive brand experiences that tell your story.
              </p>
            </div>



            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary font-montserrat font-bold px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={scrollToServices}
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex gap-3 justify-center lg:justify-start pt-6">
              {/* GitHub - Featured */}
              <a
                href="https://github.com/kipper13"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-xl flex items-center justify-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Github className="text-lg text-white group-hover:scale-125 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              {[
                { name: "dribbble", color: "from-pink-500 to-red-500", href: "#" },
                { name: "behance", color: "from-blue-600 to-purple-600", href: "#" },
                { name: "instagram", color: "from-purple-500 to-pink-500", href: "#" },
                { name: "linkedin", color: "from-blue-600 to-blue-800", href: "https://www.linkedin.com/in/kevinflores3/" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center hover-lift shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <i className={`fab fa-${social.name} text-lg text-white group-hover:scale-125 transition-transform duration-300`}></i>
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
