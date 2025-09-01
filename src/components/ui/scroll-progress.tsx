import { useScrollProgress } from '@/hooks/use-animations';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
}

export const ScrollProgress = ({ className, showPercentage = false }: ScrollProgressProps) => {
  const progress = useScrollProgress();

  return (
    <>
      {/* Progress Bar */}
      <div className={cn(
        "fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-50 transition-all duration-300",
        className
      )}
      style={{ width: `${progress}%` }}
      />
      
      {/* Percentage Indicator */}
      {showPercentage && (
        <div className="fixed top-4 right-4 z-50 bg-card/80 backdrop-blur-md border border-border rounded-full px-3 py-1 text-sm font-montserrat text-foreground">
          {Math.round(progress)}%
        </div>
      )}
    </>
  );
};