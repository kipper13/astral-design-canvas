import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Advanced scroll-triggered animations hook
export const useScrollAnimation = (options: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'custom';
  duration?: number;
  delay?: number;
  ease?: string;
  customAnimation?: (element: HTMLElement) => void;
}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    animationType = 'fadeUp',
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    customAnimation
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateElement(element);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          resetElement(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  const animateElement = (element: HTMLElement) => {
    if (customAnimation) {
      customAnimation(element);
      return;
    }

    switch (animationType) {
      case 'fadeUp':
        gsap.fromTo(element, 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, duration, delay, ease }
        );
        break;
      case 'fadeIn':
        gsap.fromTo(element, 
          { opacity: 0 }, 
          { opacity: 1, duration, delay, ease }
        );
        break;
      case 'slideLeft':
        gsap.fromTo(element, 
          { opacity: 0, x: 100 }, 
          { opacity: 1, x: 0, duration, delay, ease }
        );
        break;
      case 'slideRight':
        gsap.fromTo(element, 
          { opacity: 0, x: -100 }, 
          { opacity: 1, x: 0, duration, delay, ease }
        );
        break;
      case 'scale':
        gsap.fromTo(element, 
          { opacity: 0, scale: 0.8 }, 
          { opacity: 1, scale: 1, duration, delay, ease }
        );
        break;
      case 'rotate':
        gsap.fromTo(element, 
          { opacity: 0, rotation: -10 }, 
          { opacity: 1, rotation: 0, duration, delay, ease }
        );
        break;
    }
  };

  const resetElement = (element: HTMLElement) => {
    gsap.set(element, { opacity: 0, y: 50, x: 0, scale: 1, rotation: 0 });
  };

  return { ref, isVisible };
};

// Parallax scroll effect hook
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const yPos = -(scrolled * speed);
      gsap.set(element, { y: yPos });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

// Magnetic hover effect hook
export const useMagneticHover = (strength: number = 0.3) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

// Text reveal animation hook
export const useTextReveal = (options: {
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
} = {}) => {
  const { delay = 0, duration = 0.8, stagger = 0.1, ease = 'power2.out' } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Split text into spans
    const text = element.textContent || '';
    const words = text.split(' ');
    
    element.innerHTML = words
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');

    const wordElements = element.querySelectorAll('.word');

    // Initial state
    gsap.set(wordElements, { opacity: 0, y: 50 });

    // Observer for triggering animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(wordElements, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, duration, stagger, ease]);

  return ref;
};

// Morphing shape animation hook
export const useMorphingShape = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(element, {
      borderRadius: '50%',
      rotation: 180,
      duration: 2,
      ease: 'power2.inOut'
    })
    .to(element, {
      borderRadius: '0%',
      rotation: 360,
      duration: 2,
      ease: 'power2.inOut'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
};

// Progress scroll indicator hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};