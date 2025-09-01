import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            setMetrics(prev => ({
              ...prev,
              pageLoadTime: navEntry.loadEventEnd - navEntry.loadEventStart
            }));
            break;
          
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({
                ...prev,
                firstContentfulPaint: entry.startTime
              }));
            }
            break;
          
          case 'largest-contentful-paint':
            setMetrics(prev => ({
              ...prev,
              largestContentfulPaint: entry.startTime
            }));
            break;
          
          case 'first-input':
            setMetrics(prev => ({
              ...prev,
              firstInputDelay: (entry as any).processingStart - entry.startTime
            }));
            break;
          
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setMetrics(prev => ({
                ...prev,
                cumulativeLayoutShift: (prev.cumulativeLayoutShift || 0) + (entry as any).value
              }));
            }
            break;
        }
      }
    });

    // Observe different performance entry types
    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', () => setIsLoading(false));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getPerformanceScore = (): 'excellent' | 'good' | 'needs-improvement' | 'poor' => {
    const { firstContentfulPaint, largestContentfulPaint, firstInputDelay, cumulativeLayoutShift } = metrics;
    
    let score = 0;
    let totalMetrics = 0;

    if (firstContentfulPaint !== undefined) {
      totalMetrics++;
      if (firstContentfulPaint < 1800) score++;
    }

    if (largestContentfulPaint !== undefined) {
      totalMetrics++;
      if (largestContentfulPaint < 2500) score++;
    }

    if (firstInputDelay !== undefined) {
      totalMetrics++;
      if (firstInputDelay < 100) score++;
    }

    if (cumulativeLayoutShift !== undefined) {
      totalMetrics++;
      if (cumulativeLayoutShift < 0.1) score++;
    }

    const percentage = totalMetrics > 0 ? (score / totalMetrics) * 100 : 0;

    if (percentage >= 90) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 50) return 'needs-improvement';
    return 'poor';
  };

  return {
    metrics,
    isLoading,
    performanceScore: getPerformanceScore()
  };
};

// Web Vitals tracking
export const trackWebVitals = (callback: (metric: any) => void) => {
  const vitalsUrl = 'https://unpkg.com/web-vitals@3/dist/web-vitals.js';
  
  if (!window.webVitals) {
    const script = document.createElement('script');
    script.src = vitalsUrl;
    script.onload = () => {
      if (window.webVitals) {
        window.webVitals.getCLS(callback);
        window.webVitals.getFID(callback);
        window.webVitals.getFCP(callback);
        window.webVitals.getLCP(callback);
        window.webVitals.getTTFB(callback);
      }
    };
    document.head.appendChild(script);
  }
};

// Preload critical resources
export const preloadResource = (url: string, type: 'script' | 'style' | 'font' | 'image' = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  
  switch (type) {
    case 'script':
      link.as = 'script';
      break;
    case 'style':
      link.as = 'style';
      break;
    case 'font':
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      break;
    case 'image':
      link.as = 'image';
      break;
  }
  
  document.head.appendChild(link);
};

declare global {
  interface Window {
    webVitals?: any;
  }
}