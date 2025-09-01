import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface CursorState {
  type: 'default' | 'hover' | 'click' | 'text' | 'link' | 'button';
  text?: string;
}

export const EnhancedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Initialize cursor position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Interactive elements handlers
    const handleElementHover = (type: CursorState['type'], text?: string) => {
      setCursorState({ type, text });
    };

    const handleElementLeave = () => {
      setCursorState({ type: 'default' });
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, .cursor-hover'
    );

    interactiveElements.forEach(element => {
      const cursorType = element.getAttribute('data-cursor') as CursorState['type'] || 'hover';
      const cursorText = element.getAttribute('data-cursor-text');

      element.addEventListener('mouseenter', () => handleElementHover(cursorType, cursorText || undefined));
      element.addEventListener('mouseleave', handleElementLeave);
    });

    // Global event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => handleElementHover('hover'));
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  const getCursorStyles = () => {
    const baseStyles = 'fixed pointer-events-none z-50 transition-all duration-300';
    
    switch (cursorState.type) {
      case 'hover':
        return `${baseStyles} w-12 h-12 border-2 border-primary bg-primary/10`;
      case 'click':
        return `${baseStyles} w-8 h-8 bg-primary`;
      case 'text':
        return `${baseStyles} w-1 h-6 bg-primary`;
      case 'link':
        return `${baseStyles} w-16 h-16 border-2 border-accent bg-accent/10`;
      case 'button':
        return `${baseStyles} w-14 h-14 border-2 border-primary bg-primary/20`;
      default:
        return `${baseStyles} w-10 h-10 border border-foreground/30`;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`${getCursorStyles()} rounded-full mix-blend-difference`}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        {cursorState.text && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-montserrat font-semibold text-foreground whitespace-nowrap">
              {cursorState.text}
            </span>
          </div>
        )}
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-50 w-1 h-1 bg-foreground rounded-full mix-blend-difference"
        style={{ display: isVisible ? 'block' : 'none' }}
      />
    </>
  );
};

// CSS to hide default cursor
export const hideCursorStyles = `
  * {
    cursor: none !important;
  }
  
  a, button, [role="button"], input, textarea {
    cursor: none !important;
  }
`;