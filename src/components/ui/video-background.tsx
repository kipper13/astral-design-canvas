import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-accessibility';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  fallbackImage?: string;
  overlay?: 'none' | 'light' | 'dark' | 'gradient';
  overlayOpacity?: number;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onLoadStart?: () => void;
  onLoadedData?: () => void;
  onError?: () => void;
}

export const VideoBackground = ({
  src,
  poster,
  fallbackImage,
  overlay = 'dark',
  overlayOpacity = 0.4,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  playsInline = true,
  preload = 'metadata',
  onLoadStart,
  onLoadedData,
  onError
}: VideoBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Use fallback image if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setShowFallback(true);
    }
  }, [prefersReducedMotion]);

  const handleLoadStart = () => {
    onLoadStart?.();
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoadedData?.();
    
    // Auto play if enabled and not reduced motion
    if (autoPlay && !prefersReducedMotion) {
      playVideo();
    }
  };

  const handleError = () => {
    setHasError(true);
    setShowFallback(true);
    onError?.();
  };

  const playVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
        console.log('✅ Video started playing successfully');
      } catch (error) {
        console.warn('⚠️ Video autoplay failed:', error);
        setIsPlaying(false);
        setShowPlayButton(true); // Show manual play button
      }
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const getOverlayStyles = () => {
    const baseStyles = "absolute inset-0 pointer-events-none";
    
    switch (overlay) {
      case 'light':
        return `${baseStyles} bg-white`;
      case 'dark':
        return `${baseStyles} bg-black`;
      case 'gradient':
        return `${baseStyles} bg-gradient-to-b from-black/60 via-black/20 to-black/80`;
      case 'none':
      default:
        return '';
    }
  };

  if (showFallback && (fallbackImage || poster)) {
    return (
      <div className={cn("relative w-full h-full overflow-hidden", className)}>
        <img
          src={fallbackImage || poster}
          alt="Video background fallback"
          className="w-full h-full object-cover"
        />
        {overlay !== 'none' && (
          <div 
            className={getOverlayStyles()}
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        poster={poster}
        autoPlay={autoPlay && !prefersReducedMotion}
        muted={true}
        loop={loop}
        playsInline={true}
        preload={preload}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onError={handleError}
        onCanPlay={() => {
          console.log('🎬 Video can play - attempting to start...');
          if (autoPlay && !prefersReducedMotion) {
            playVideo();
          }
        }}
        aria-label="Background video"
        style={{ objectFit: 'cover' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {/* Poster/Fallback Image */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt="Video poster"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      {overlay !== 'none' && (
        <div 
          className={getOverlayStyles()}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Video Controls */}
      {controls && isLoaded && !hasError && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={togglePlay}
            className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
            data-cursor="button"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          {!muted && (
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleMute}
              className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70"
              data-cursor="button"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      )}

      {/* Click to Play Overlay */}
      {showPlayButton && isLoaded && !hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer z-20"
          onClick={playVideo}
        >
          <div className="text-center text-white">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Play className="h-10 w-10 ml-1" />
            </div>
            <p className="text-lg font-medium">Click to play video</p>
            <p className="text-sm opacity-75">Your browser blocked autoplay</p>
          </div>
        </div>
      )}

      {/* Accessibility Notice */}
      {prefersReducedMotion && (
        <div className="sr-only">
          Video background has been replaced with a static image due to reduced motion preferences.
        </div>
      )}
    </div>
  );
};

// Hero Video Background Wrapper
interface HeroVideoBackgroundProps extends VideoBackgroundProps {
  children: React.ReactNode;
  height?: string;
}

export const HeroVideoBackground = ({
  children,
  height = "100vh",
  className,
  ...videoProps
}: HeroVideoBackgroundProps) => {
  return (
    <section 
      className={cn("relative flex items-center justify-center", className)}
      style={{ height }}
    >
      {/* Video Background */}
      <VideoBackground
        className="absolute inset-0"
        {...videoProps}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};