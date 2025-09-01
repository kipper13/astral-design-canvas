import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { theme } = useTheme();
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRingRef = useRef<SVGCircleElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState('');
  const [currentProgress, setCurrentProgress] = useState(0);

  // Loading messages that change during progress
  const loadingMessages = [
    'Initializing Canvas...',
    'Loading Components...',
    'Setting Up Animations...',
    'Preparing Experience...',
    'Almost Ready...'
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    const ringCircumference = 2 * Math.PI * 45; // radius = 45

    // Initial setup
    gsap.set([logoRef.current, progressBarRef.current, percentageRef.current, loadingTextRef.current], {
      opacity: 0,
      y: 30
    });

    // Set initial progress ring
    if (progressRingRef.current) {
      gsap.set(progressRingRef.current, {
        strokeDasharray: ringCircumference,
        strokeDashoffset: ringCircumference
      });
    }

    // Animate logo with pulsing effect
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(logoRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    }, "<+0.5")
    
    // Animate other elements in
    .to([percentageRef.current, loadingTextRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    }, "-=0.6")
    .to(progressBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Progress animations with enhanced effects
    let counter = { value: 0 };
    let messageIndex = 0;
    
    tl.to([progressBarRef.current?.firstChild, progressRingRef.current], {
      width: "100%",
      strokeDashoffset: 0,
      duration: 3.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = this.progress();
        setCurrentProgress(Math.round(progress * 100));
        
        // Update loading message based on progress
        const newMessageIndex = Math.floor(progress * loadingMessages.length);
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
          messageIndex = newMessageIndex;
          setLoadingText(loadingMessages[messageIndex]);
          
          // Animate text change
          if (loadingTextRef.current) {
            gsap.fromTo(loadingTextRef.current, 
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
          }
        }
      }
    }, "+=0.5")
    .to(counter, {
      value: 100,
      duration: 3.5,
      ease: "power2.out",
      onUpdate: () => {
        if (percentageRef.current) {
          percentageRef.current.textContent = `${Math.round(counter.value)}%`;
          
          // Add glow effect when reaching 100%
          if (counter.value >= 99) {
            gsap.to(percentageRef.current, {
              textShadow: "0 0 20px hsl(11 100% 69%), 0 0 40px hsl(11 100% 69%)",
              duration: 0.5
            });
          }
        }
      }
    }, "<")
    
    // Particle burst effect at completion
    .call(() => {
      if (particlesRef.current) {
        // Create burst particles
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-2 h-2 rounded-full';
          particle.style.background = 'linear-gradient(45deg, hsl(11 100% 69%), hsl(280 100% 60%))';
          particle.style.left = '50%';
          particle.style.top = '50%';
          particlesRef.current.appendChild(particle);
          
          gsap.to(particle, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            scale: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: Math.random() * 0.3,
            onComplete: () => particle.remove()
          });
        }
      }
    }, [], "+=0.3")

    // Exit animation with enhanced effects
    .to([logoRef.current, percentageRef.current, loadingTextRef.current], {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.in",
      stagger: 0.1
    }, "+=0.5")
    .to(progressBarRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.in"
    }, "<")
    .to(loaderRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.2");

    // Animate floating particles continuously
    if (particlesRef.current) {
      const floatingParticles = particlesRef.current.querySelectorAll('.floating-particle');
      floatingParticles.forEach((particle, index) => {
        gsap.to(particle, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-180, 180)",
          duration: "random(3, 6)",
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });
    }

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
      {/* Animated Background Waves */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, hsl(11 100% 69% / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, hsl(280 100% 60% / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, hsl(210 100% 60% / 0.05) 0%, transparent 50%)
            `,
            animation: 'backgroundPulse 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Background Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              background: i % 2 === 0 
                ? "linear-gradient(45deg, hsl(11 100% 69%), hsl(280 100% 60%))"
                : "hsl(210 100% 70%)",
              boxShadow: "0 0 20px currentColor"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Enhanced Logo with Glow */}
        <div ref={logoRef} className="mb-12 relative">
          {/* Logo Glow Background */}
          <div 
            className="absolute inset-0 blur-3xl opacity-60 scale-110"
            style={{
              background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%))"
            }}
          />
          
          <div className="relative">
            <h1 
              className="text-6xl md:text-8xl font-bold font-poppins relative"
              style={{
                background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%), hsl(210 100% 70%))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px hsl(var(--primary) / 0.5))"
              }}
            >
              Kev'nCreates
            </h1>
          </div>
        </div>

        {/* Enhanced Progress Section */}
        <div ref={progressBarRef} className="w-96 mx-auto space-y-6">
          {/* Circular Progress Ring */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(229 35% 20%)"
                strokeWidth="4"
                className="opacity-30"
              />
              {/* Progress Ring */}
              <circle
                ref={progressRingRef}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  stroke: "url(#progressGradient)",
                  filter: "drop-shadow(0 0 10px hsl(11 100% 69% / 0.6))"
                }}
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(11 100% 69%)" />
                  <stop offset="50%" stopColor="hsl(280 100% 60%)" />
                  <stop offset="100%" stopColor="hsl(210 100% 70%)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Progress Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span 
                ref={percentageRef}
                className="text-2xl font-bold font-montserrat"
                style={{
                  background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                0%
              </span>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="relative">
            {/* Progress Bar Background */}
            <div 
              className="h-2 rounded-full overflow-hidden relative"
              style={{
                backgroundColor: "hsl(229 35% 20%)",
                boxShadow: "inset 0 2px 4px hsl(0 0% 0% / 0.3)"
              }}
            >
              {/* Progress Bar Fill */}
              <div
                className="h-full rounded-full w-0 relative overflow-hidden"
                style={{
                  background: "linear-gradient(to right, hsl(11 100% 69%), hsl(280 100% 60%), hsl(210 100% 70%))",
                  boxShadow: "0 0 20px hsl(11 100% 69% / 0.6), 0 0 40px hsl(11 100% 69% / 0.3)"
                }}
              >
                {/* Animated Shimmer Effect */}
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 2s infinite"
                  }}
                />
                
                {/* Glowing dot at the end */}
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "hsl(11 100% 69%)",
                    boxShadow: "0 0 15px hsl(11 100% 69%), 0 0 30px hsl(11 100% 69% / 0.5)"
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Loading Text with Typewriter Effect */}
          <div
            ref={loadingTextRef}
            className="mt-6 text-sm font-montserrat tracking-wider min-h-[20px]"
            style={{
              color: "hsl(0 0% 75%)",
              textShadow: "0 0 10px hsl(11 100% 69% / 0.2)"
            }}
          >
            {loadingText}
          </div>
        </div>

        {/* Decorative Tech Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none">
          <div 
            className="w-full h-full rounded-full border border-orange-400/20 animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-purple-400/20 animate-pulse" 
            style={{ animationDelay: "1s", animationDuration: "3s" }} 
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-blue-400/20 animate-pulse" 
            style={{ animationDelay: "2s", animationDuration: "5s" }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;