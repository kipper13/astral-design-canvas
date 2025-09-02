import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { theme } = useTheme();
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const morphShapeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Compact loading states
  const loadingStates = ['Init', 'Load', 'Setup', 'Ready'];

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup - everything starts invisible and small
    gsap.set([logoRef.current, orbitRef.current, morphShapeRef.current, progressRef.current], {
      opacity: 0,
      scale: 0.5
    });

    // Create orbital elements
    const orbitElements = orbitRef.current?.children;
    if (orbitElements) {
      gsap.set(orbitElements, {
        transformOrigin: "center center"
      });
    }

    // Entrance animation with staggered morphing
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.8)"
    })
    .to(morphShapeRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(orbitRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(progressRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");

    // Orbital animation - continuous rotation
    if (orbitElements) {
      Array.from(orbitElements).forEach((element, index) => {
        gsap.to(element, {
          rotation: 360,
          duration: 3 + index,
          ease: "none",
          repeat: -1,
          transformOrigin: "50px 0px" // Orbit radius
        });
        
        // Individual element rotation
        gsap.to(element.firstChild, {
          rotation: -360,
          duration: 2,
          ease: "none",
          repeat: -1
        });
      });
    }

    // Morphing shape animation
    const morphShapes = [
      { borderRadius: "50%", scale: 1 },
      { borderRadius: "20%", scale: 1.1 },
      { borderRadius: "0%", scale: 0.9 },
      { borderRadius: "30%", scale: 1.05 },
      { borderRadius: "50%", scale: 1 }
    ];

    morphShapes.forEach((shape, index) => {
      tl.to(morphShapeRef.current, {
        ...shape,
        duration: 0.8,
        ease: "power2.inOut"
      }, index * 0.8 + 1);
    });

    // Progress animation with counter
    let counter = { value: 0 };
    
    tl.to(counter, {
      value: 100,
      duration: 4,
      ease: "power2.out",
      onUpdate: () => {
        const progress = Math.round(counter.value);
        setCurrentProgress(progress);
        
        // Update progress bar
        if (progressRef.current) {
          const progressBar = progressRef.current.querySelector('.progress-fill');
          if (progressBar) {
            gsap.set(progressBar, { width: `${progress}%` });
          }
        }
        
        // Morphing intensity based on progress
        if (morphShapeRef.current) {
          const intensity = progress / 100;
          gsap.set(morphShapeRef.current, {
            boxShadow: `0 0 ${20 * intensity}px hsl(11 100% 69% / ${0.3 + intensity * 0.4})`
          });
        }
      }
    }, "<+0.5")
    
    // Completion burst effect
    .call(() => {
      // Create smaller, more elegant burst
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 rounded-full';
        particle.style.background = 'hsl(11 100% 69%)';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.boxShadow = '0 0 6px currentColor';
        loaderRef.current?.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        gsap.to(particle, {
          x: Math.cos(angle) * 60,
          y: Math.sin(angle) * 60,
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => particle.remove()
        });
      }
    }, [], "+=0.2")

    // Exit animation - elegant fade out
    .to([morphShapeRef.current, orbitRef.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1
    }, "+=0.3")
    .to([logoRef.current, progressRef.current], {
      opacity: 0,
      scale: 1.2,
      duration: 0.8,
      ease: "power2.in",
      stagger: 0.1
    }, "-=0.4")
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: onComplete
    }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(222 84% 5%), hsl(229 41% 8%), hsl(235 45% 10%))"
      }}
    >
      {/* Minimal Background Effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, hsl(11 100% 69% / 0.1) 0%, transparent 60%)`
        }}
      />

      {/* Compact Loading Container */}
      <div className="relative flex flex-col items-center space-y-6">
        {/* Morphing Central Shape */}
        <div ref={morphShapeRef} className="relative">
          <div 
            className="w-16 h-16 rounded-full transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%))",
              boxShadow: "0 0 20px hsl(11 100% 69% / 0.3)"
            }}
          />
        </div>

        {/* Orbital Elements */}
        <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute">
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  background: i === 0 ? "hsl(11 100% 69%)" : 
                            i === 1 ? "hsl(280 100% 60%)" : "hsl(210 100% 70%)",
                  boxShadow: "0 0 8px currentColor"
                }}
              />
            </div>
          ))}
        </div>

        {/* Compact Logo */}
        <div ref={logoRef} className="text-center mt-8">
          <h1 
            className="text-2xl font-bold font-poppins"
            style={{
              background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Kev'nCreates
          </h1>
        </div>

        {/* Minimal Progress Bar */}
        <div ref={progressRef} className="w-32 space-y-2">
          <div 
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "hsl(229 35% 20%)" }}
          >
            <div
              className="progress-fill h-full rounded-full w-0 transition-all duration-300"
              style={{
                background: "linear-gradient(to right, hsl(11 100% 69%), hsl(280 100% 60%))",
                boxShadow: "0 0 10px hsl(11 100% 69% / 0.6)"
              }}
            />
          </div>
          
          {/* Progress Text */}
          <div className="text-center">
            <span 
              className="text-xs font-montserrat"
              style={{
                background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {currentProgress}% • {loadingStates[Math.floor(currentProgress / 25)] || 'Ready'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;