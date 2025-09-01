import { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  fallback?: ReactNode;
  once?: boolean;
}

export const LazyLoad = ({ 
  children, 
  className, 
  threshold = 0.1, 
  fallback = null,
  once = true 
}: LazyLoadProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {inView ? children : fallback}
    </div>
  );
};

// Skeleton components for loading states
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse", className)}>
    <div className="bg-muted rounded-lg h-48 mb-4"></div>
    <div className="space-y-3">
      <div className="bg-muted rounded h-4"></div>
      <div className="bg-muted rounded h-4 w-3/4"></div>
      <div className="bg-muted rounded h-4 w-1/2"></div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn("animate-pulse space-y-3", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i} 
        className="bg-muted rounded h-4" 
        style={{ width: `${Math.random() * 30 + 70}%` }}
      ></div>
    ))}
  </div>
);

export const SkeletonImage = ({ className }: { className?: string }) => (
  <div className={cn("bg-muted animate-pulse rounded-lg", className)}>
    <div className="flex items-center justify-center h-full">
      <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
);