import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)), hsl(var(--card)))"
      }}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div ref={logoRef} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold font-poppins gradient-text mb-4">
            Kev'n
          </h1>
          <h2 className="text-xl md:text-2xl font-montserrat text-muted-foreground tracking-[0.2em]">
            CREATES
          </h2>
        </div>

        {/* Progress Bar Container */}
        <div ref={progressBarRef} className="w-80 mx-auto">
          <div className="relative">
            {/* Progress Bar Background */}
            <div className="h-1 bg-border rounded-full overflow-hidden">
              {/* Progress Bar Fill */}
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-0 relative"
                style={{
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.5)"
                }}
              >
                {/* Glowing dot at the end */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Percentage */}
          <div
            ref={percentageRef}
            className="mt-4 text-sm font-montserrat text-muted-foreground tracking-wider"
          >
            0%
          </div>
        </div>

        {/* Tech dots decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
          <div className="w-full h-full border border-primary/20 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-primary/30 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/40 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;