import React, { useEffect, useState } from "react";
import { Palette, TrendingUp, Smartphone, Award, Star, ArrowRight, Github } from "lucide-react";
import { AnimatedSection, StaggeredContainer, AnimatedCounter } from "@/components/ui/animated-section";
import { useMagneticHover } from "@/hooks/use-animations";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const services = [
  {
    icon: Palette,
    title: "Landing Page Design",
    description: "High-converting landing pages that capture attention and drive action.",
    features: ["Conversion Optimization", "A/B Testing", "Mobile First", "Fast Loading"],
    color: "from-blue-500 to-purple-600",
    technologies: ["Figma", "Webflow", "React", "Analytics"],
    beforeResult: "2.3% conversion rate",
    afterResult: "8.7% conversion rate",
    testimonial: {
      text: "The landing page design increased our conversions by 275%. Incredible results!",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      rating: 5
    },
    processSteps: [
      "Research & Analysis",
      "Wireframe & Design",
      "Development & Testing",
      "Launch & Optimize"
    ]
  },
  {
    icon: TrendingUp,
    title: "Funnel Optimization",
    description: "Strategic funnel design that maximizes conversions at every step.",
    features: ["Analytics Integration", "User Flow Mapping", "CRO Strategy", "Performance Tracking"],
    color: "from-green-500 to-blue-600",
    technologies: ["Google Analytics", "Hotjar", "Optimize", "HubSpot"],
    beforeResult: "45% drop-off rate",
    afterResult: "12% drop-off rate",
    testimonial: {
      text: "Our funnel optimization resulted in 300% more qualified leads. Outstanding work!",
      author: "Michael Chen",
      company: "Growth Labs",
      rating: 5
    },
    processSteps: [
      "Funnel Audit",
      "Optimization Strategy",
      "Implementation",
      "Monitor & Iterate"
    ]
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    description: "Intuitive interfaces that provide exceptional user experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    color: "from-pink-500 to-red-600",
    technologies: ["Figma", "Sketch", "Principle", "Maze"],
    beforeResult: "3.2/5 user satisfaction",
    afterResult: "4.8/5 user satisfaction",
    testimonial: {
      text: "The UI/UX redesign transformed our app. Users love the new interface!",
      author: "Emma Rodriguez",
      company: "AppVenture",
      rating: 5
    },
    processSteps: [
      "User Research",
      "Design System",
      "Prototype & Test",
      "Final Implementation"
    ]
  },
  {
    icon: Award,
    title: "Branding",
    description: "Cohesive brand identities that resonate with your target audience.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    color: "from-yellow-500 to-orange-600",
    technologies: ["Illustrator", "Photoshop", "Figma", "InDesign"],
    beforeResult: "Low brand recognition",
    afterResult: "85% brand recall",
    testimonial: {
      text: "Our new brand identity perfectly captures our vision. Professional and impactful!",
      author: "David Thompson",
      company: "Innovative Solutions",
      rating: 5
    },
    processSteps: [
      "Brand Discovery",
      "Concept Development",
      "Design Execution",
      "Brand Guidelines"
    ]
  }
];

export const ServicesSection = () => {
  
  useEffect(() => {
    // Create floating particles animation
    const createFloatingParticles = () => {
      const particles = document.querySelectorAll('.floating-particle');
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: "-=20",
          x: "+=10",
          rotation: 360,
          duration: 4 + index * 0.5,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
      });
    };

    // Animate morphing shapes
    const animateMorphingShapes = () => {
      gsap.to(".morphing-shape", {
        scale: 1.2,
        rotation: 180,
        duration: 8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    };

    createFloatingParticles();
    animateMorphingShapes();
  }, []);
  return (
    <AnimatedSection 
      id="services" 
      className="py-20 lg:py-32 relative overflow-hidden"
      animationType="fadeUp"
      delay={0.2}
    >
      {/* Enhanced Background Elements with Floating Particles */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl morphing-shape pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl morphing-shape pointer-events-none"></div>
      
      {/* Floating Particles with vibrant colors for light mode */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`floating-particle absolute w-2 h-2 rounded-full pointer-events-none`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            background: i % 3 === 0 
              ? 'linear-gradient(45deg, hsl(229, 85%, 60%), hsl(280, 95%, 65%))' 
              : i % 3 === 1 
              ? 'linear-gradient(45deg, hsl(11, 90%, 65%), hsl(280, 95%, 65%))'
              : 'linear-gradient(45deg, hsl(229, 85%, 60%), hsl(11, 90%, 65%))',
            boxShadow: '0 0 15px rgba(79, 99, 210, 0.6)'
          }}
        />
      ))}
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            What I Do <span className="gradient-text">Best</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto mb-8">
            Specialized services that combine creativity with data-driven strategies 
            to deliver exceptional results for your business.
          </p>
          
          {/* GitHub Button */}
          <div className="flex justify-center">
            <a 
              href="https://github.com/kipper13" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="group relative overflow-hidden font-montserrat font-bold px-10 py-4 text-lg border-2 border-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
              >
                <span className="relative z-10 flex items-center">
                  <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  View My GitHub
                  <span className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity">@kipper13</span>
                </span>
              </Button>
            </a>
          </div>
        </div>

        <StaggeredContainer 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
            />
          ))}
        </StaggeredContainer>

        {/* Client Success Stories */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-foreground mb-8">
            Client <span className="gradient-text">Success Stories</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover-lift">
                <div className="flex items-center mb-4">
                  {[...Array(service.testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground font-montserrat text-sm mb-4 leading-relaxed">
                  "{service.testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mr-3`}>
                    <span className="text-white text-sm font-bold">
                      {service.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-sm">{service.testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{service.testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Tab Button Component
const TabButton = ({ label, active = false }: { label: string; active?: boolean }) => (
  <button 
    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-muted text-muted-foreground hover:bg-primary/10'
    }`}
  >
    {label}
  </button>
);

// Enhanced Service Card Component with all features
const ServiceCard = ({ service, index }: { 
  service: any; 
  index: number; 
}) => {
  const magneticRef = useMagneticHover<HTMLDivElement>(0.2);
  const iconRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate icon on hover
    const animateIcon = () => {
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          rotation: 360,
          scale: 1.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      }
    };

    const element = magneticRef.current;
    if (element) {
      element.addEventListener('mouseenter', animateIcon);
      return () => element.removeEventListener('mouseenter', animateIcon);
    }
  }, []);
  
  return (
    <div
      ref={magneticRef}
      className="service-card flip-card h-96 hover-lift hover-glow"
      data-cursor="hover"
      data-cursor-text="View Details"
      style={{ isolation: 'isolate' }}
    >
      <div className="flip-card-inner">
        {/* Enhanced Front Side */}
        <div className="flip-card-front bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 transition-opacity duration-300 hover:opacity-10`} />
          
          <div className="h-full flex flex-col items-center text-center space-y-4 relative z-10">
            <div 
              ref={iconRef}
              className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}
            >
              <service.icon className="h-10 w-10 text-white" />
            </div>
            
            <h3 className="text-2xl font-poppins font-bold text-foreground">
              {service.title}
            </h3>
            
            <p className="text-muted-foreground font-montserrat leading-relaxed">
              {service.description}
            </p>

            {/* Before/After Results */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <span className="text-red-500">Before:</span> {service.beforeResult}
              </div>
              <div className="text-sm text-green-500 font-semibold">
                <span>After:</span> {service.afterResult}
              </div>
            </div>
            
            <div className="mt-auto">
              <div className={`w-16 h-1 bg-gradient-to-r ${service.color} rounded-full`}></div>
            </div>
          </div>
        </div>

        {/* Enhanced Back Side with Multiple Tabs */}
        <div className="flip-card-back bg-card border border-border rounded-2xl p-4 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-4">
              <TabButton label="Process" active={true} />
              <TabButton label="Tech" />
              <TabButton label="Review" />
            </div>
            
            {/* Process Steps */}
            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-poppins font-bold text-foreground text-center">
                Process Steps
              </h3>
              
              <div className="space-y-2">
                {service.processSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <div className={`w-6 h-6 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mr-3 text-white text-xs font-bold`}>
                      {idx + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {service.technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 bg-gradient-to-r ${service.color} text-white text-xs rounded-full opacity-90`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4">
              <button 
                className={`w-full py-2 bg-gradient-to-r ${service.color} text-white rounded-xl font-montserrat font-semibold hover:scale-105 transition-transform text-sm flex items-center justify-center`}
                data-cursor="button"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

