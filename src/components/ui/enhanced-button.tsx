import { forwardRef, useState, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25",
        neon: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/50",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        magnetic: "bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        xl: "h-14 rounded-2xl px-12 text-lg",
        icon: "h-10 w-10",
      },
      effect: {
        none: "",
        ripple: "overflow-hidden",
        glow: "hover:shadow-lg hover:shadow-primary/25",
        shimmer: "relative before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        bounce: "hover:animate-bounce",
        pulse: "hover:animate-pulse"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      effect: "none"
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ripple?: boolean;
  magneticStrength?: number;
}

const EnhancedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    effect,
    asChild = false, 
    loading = false,
    loadingText,
    icon,
    iconPosition = 'left',
    ripple = false,
    magneticStrength = 0.3,
    children,
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = useState<Array<{ key: number; x: number; y: number }>>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const Comp = asChild ? Slot : "button";

    // Ripple effect
    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple) return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      const newRipple = {
        key: Date.now(),
        x,
        y
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.key !== newRipple.key));
      }, 600);
    };

    // Magnetic effect
    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (variant !== 'magnetic') return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (event.clientX - centerX) * magneticStrength;
      const deltaY = (event.clientY - centerY) * magneticStrength;
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || props.disabled) return;
      
      createRipple(event);
      onClick?.(event);
    };

    const magneticStyles = variant === 'magnetic' ? {
      transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
      transition: isHovered ? 'none' : 'transform 0.3s ease-out'
    } : {};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, effect, className }))}
        ref={ref}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={magneticStyles}
        disabled={loading || props.disabled}
        data-cursor="button"
        {...props}
      >
        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {loadingText || 'Loading...'}
          </div>
        )}

        {/* Button Content */}
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-200",
          loading && "opacity-0"
        )}>
          {icon && iconPosition === 'left' && (
            <span className="flex items-center">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="flex items-center">{icon}</span>
          )}
        </div>

        {/* Ripple Effects */}
        {ripple && ripples.map(ripple => (
          <span
            key={ripple.key}
            className="absolute bg-white/30 rounded-full pointer-events-none animate-ping"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '100px',
              height: '100px',
              transform: 'scale(0)',
              animation: 'ripple 0.6s ease-out'
            }}
          />
        ))}

        {/* Shimmer Effect */}
        {effect === 'shimmer' && (
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}

        {/* Glow Effect */}
        {effect === 'glow' && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-primary/50 to-accent/50 blur-xl" />
        )}
      </Comp>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

// Button Group Component
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'default' | 'lg';
}

export const ButtonGroup = ({ 
  children, 
  className, 
  orientation = 'horizontal',
  size = 'default'
}: ButtonGroupProps) => {
  return (
    <div 
      className={cn(
        "inline-flex",
        orientation === 'horizontal' ? "flex-row" : "flex-col",
        "rounded-xl overflow-hidden border border-border",
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
};

// Icon Button Component
export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <EnhancedButton
        ref={ref}
        size="icon"
        className={cn("p-0", className)}
        {...props}
      >
        {icon}
      </EnhancedButton>
    );
  }
);

IconButton.displayName = "IconButton";

export { EnhancedButton, buttonVariants };