import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/use-animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
  id?: string;
}

export const AnimatedSection = ({
  children,
  className,
  animationType = 'fadeUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  id
}: AnimatedSectionProps) => {
  const { ref } = useScrollAnimation({
    animationType,
    delay,
    duration,
    threshold,
    triggerOnce: true,
    ease: 'power2.out'
  });

  return (
    <section
      ref={ref}
      id={id}
      className={cn(className)}
      style={{ opacity: 0 }}
    >
      {children}
    </section>
  );
};

// Animated container for staggered children
export const StaggeredContainer = ({
  children,
  className,
  staggerDelay = 0.1
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const { ref } = useScrollAnimation({
    animationType: 'custom',
    customAnimation: (element) => {
      const childElements = element.children;
      
      // Set initial state for all children
      Array.from(childElements).forEach(child => {
        (child as HTMLElement).style.opacity = '0';
        (child as HTMLElement).style.transform = 'translateY(30px)';
      });

      // Animate children with stagger
      Array.from(childElements).forEach((child, index) => {
        setTimeout(() => {
          (child as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'translateY(0)';
        }, index * staggerDelay * 1000);
      });
    }
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};

// Animated text component
export const AnimatedText = ({
  text,
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.05
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}) => {
  const { ref } = useScrollAnimation({
    animationType: 'custom',
    customAnimation: (element) => {
      // Split text into characters
      const chars = text.split('').map(char => 
        char === ' ' ? '&nbsp;' : char
      );
      
      element.innerHTML = chars
        .map(char => `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${char}</span>`)
        .join('');

      const charElements = element.querySelectorAll('span');

      // Animate characters with stagger
      charElements.forEach((char, index) => {
        setTimeout(() => {
          (char as HTMLElement).style.transition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
          (char as HTMLElement).style.opacity = '1';
          (char as HTMLElement).style.transform = 'translateY(0)';
        }, (delay + index * stagger) * 1000);
      });
    }
  });

  return (
    <span ref={ref} className={cn(className)}>
      {text}
    </span>
  );
};

// Number counter animation
export const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2,
  className,
  suffix = ''
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) => {
  const { ref } = useScrollAnimation({
    animationType: 'custom',
    customAnimation: (element) => {
      let currentNumber = from;
      const increment = (to - from) / (duration * 60); // 60 FPS
      
      const updateNumber = () => {
        currentNumber += increment;
        if (currentNumber >= to) {
          currentNumber = to;
          element.textContent = Math.round(currentNumber) + suffix;
          return;
        }
        element.textContent = Math.round(currentNumber) + suffix;
        requestAnimationFrame(updateNumber);
      };
      
      updateNumber();
    }
  });

  return (
    <span ref={ref} className={cn(className)}>
      {from}{suffix}
    </span>
  );
};