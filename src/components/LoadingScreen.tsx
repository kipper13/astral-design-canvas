import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const { theme } = useTheme();
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, progressBarRef.current, percentageRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate logo and elements in
    tl.to([logoRef.current, percentageRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    })
    .to(progressBarRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // Progress bar animation with percentage counter
    let counter = { value: 0 };
    tl.to(progressBarRef.current?.firstChild, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    }, "+=0.5")
    .to(counter, {
      value: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        if (percentageRef.current) {
          percentageRef.current.textContent = `${Math.round(counter.value)}%`;
        }
      }
    }, "<");

    // Exit animation
    tl.to([logoRef.current, percentageRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1
    }, "+=0.5")
    .to(progressBarRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, "<")
    .to(loaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "+=0.2");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, hsl(222 84% 5%), hsl(229 41% 8%))"
      }}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: "hsl(11 100% 69%)",
                boxShadow: "0 0 20px hsl(11 100% 69% / 0.4)",
                animation: `particleFloat ${Math.random() * 10 + 10}s infinite linear`,
                animationDelay: `${Math.random() * 15}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div ref={logoRef} className="mb-8">
          <h1 
            className="text-6xl md:text-8xl font-bold font-poppins mb-4"
            style={{
              background: "linear-gradient(135deg, hsl(11 100% 69%), hsl(280 100% 60%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px hsl(var(--primary) / 0.3))"
            }}
          >
            Kev'n
          </h1>
          <h2 
            className="text-xl md:text-2xl font-montserrat tracking-[0.2em]"
            style={{
              color: "hsl(0 0% 65%)"
            }}
          >
            CREATES
          </h2>
        </div>

        {/* Progress Bar Container */}
        <div ref={progressBarRef} className="w-80 mx-auto">
          <div className="relative">
            {/* Progress Bar Background */}
            <div 
              className="h-1 rounded-full overflow-hidden"
              style={{
                backgroundColor: "hsl(229 35% 20%)"
              }}
            >
              {/* Progress Bar Fill */}
              <div
                className="h-full rounded-full w-0 relative"
                style={{
                  background: "linear-gradient(to right, hsl(11 100% 69%), hsl(280 100% 60%))",
                  boxShadow: "0 0 20px hsl(11 100% 69% / 0.5), 0 0 40px hsl(11 100% 69% / 0.3)"
                }}
              >
                {/* Glowing dot at the end */}
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "hsl(11 100% 69%)",
                    boxShadow: "0 0 15px hsl(11 100% 69% / 0.8)"
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Percentage */}
          <div
            ref={percentageRef}
            className="mt-4 text-sm font-montserrat tracking-wider"
            style={{
              color: "hsl(0 0% 65%)"
            }}
          >
            0%
          </div>
        </div>

        {/* Tech circles decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20">
          <div 
            className="w-full h-full rounded-full animate-pulse border"
            style={{
              borderColor: "hsl(11 100% 69% / 0.2)"
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full animate-pulse border" 
            style={{ 
              animationDelay: "0.5s",
              borderColor: "hsl(11 100% 69% / 0.3)"
            }} 
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full animate-pulse border" 
            style={{ 
              animationDelay: "1s",
              borderColor: "hsl(11 100% 69% / 0.4)"
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;