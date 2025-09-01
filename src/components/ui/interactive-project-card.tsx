import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from './optimized-image';
import { useMagneticHover } from '@/hooks/use-animations';
import { cn } from '@/lib/utils';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  previewVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'design' | 'landing';
  featured?: boolean;
  metrics?: {
    conversionIncrease?: string;
    performanceScore?: string;
    loadTime?: string;
  };
}

interface InteractiveProjectCardProps {
  project: ProjectData;
  index: number;
  viewMode?: 'grid' | 'list';
}

export const InteractiveProjectCard = ({ 
  project, 
  index, 
  viewMode = 'grid' 
}: InteractiveProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const magneticRef = useMagneticHover(0.15);

  // 3D card effect on mouse move
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (centerX - e.clientX) / 10;
      
      setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const cardStyles = {
    transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(${isHovered ? '20px' : '0px'})`,
    transition: isHovered ? 'none' : 'transform 0.5s ease-out'
  };

  if (viewMode === 'list') {
    return (
      <div 
        ref={magneticRef}
        className="group flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded-2xl hover-lift hover-glow transition-all duration-500"
        data-cursor="hover"
        data-cursor-text="View Project"
      >
        <div className="md:w-1/3">
          <div className="relative overflow-hidden rounded-xl aspect-video">
            <OptimizedImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <ProjectOverlay project={project} />
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-4">
          <div>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-2">
              {project.title}
            </h3>
            <p className="text-muted-foreground font-montserrat leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          
          {project.metrics && <ProjectMetrics metrics={project.metrics} />}
          
          <ProjectActions project={project} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="group relative w-full h-[400px] cursor-pointer"
      style={cardStyles}
      data-cursor="hover"
      data-cursor-text="Explore"
    >
      <div className="relative w-full h-full bg-card border border-border rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Video Preview */}
        {project.previewVideo && (
          <div className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isVideoPlaying ? "opacity-100" : "opacity-0"
          )}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={project.previewVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute top-4 left-4 space-y-2">
          {project.featured && (
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          <Badge variant="outline" className="bg-card/80 backdrop-blur-sm">
            {project.category}
          </Badge>
        </div>

        {/* Video Controls */}
        {project.previewVideo && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm"
            onClick={handleVideoToggle}
            data-cursor="button"
          >
            {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-poppins font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-white/80 font-montserrat text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>

            {project.metrics && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400">
                <ProjectMetrics metrics={project.metrics} variant="overlay" />
              </div>
            )}

            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500">
              <ProjectActions project={project} variant="overlay" />
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 pointer-events-none" />
      </div>
    </div>
  );
};

// Project Overlay Component
const ProjectOverlay = ({ project }: { project: ProjectData }) => (
  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
    <div className="flex gap-3">
      <ProjectActions project={project} variant="overlay" />
    </div>
  </div>
);

// Project Metrics Component
const ProjectMetrics = ({ 
  metrics, 
  variant = 'default' 
}: { 
  metrics: ProjectData['metrics']; 
  variant?: 'default' | 'overlay';
}) => {
  const textColor = variant === 'overlay' ? 'text-white' : 'text-muted-foreground';
  
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {metrics?.conversionIncrease && (
        <div>
          <div className={cn("text-lg font-bold", textColor)}>
            {metrics.conversionIncrease}
          </div>
          <div className={cn("text-xs", textColor, variant === 'overlay' ? 'text-white/70' : '')}>
            Conversion ↑
          </div>
        </div>
      )}
      {metrics?.performanceScore && (
        <div>
          <div className={cn("text-lg font-bold", textColor)}>
            {metrics.performanceScore}
          </div>
          <div className={cn("text-xs", textColor, variant === 'overlay' ? 'text-white/70' : '')}>
            Performance
          </div>
        </div>
      )}
      {metrics?.loadTime && (
        <div>
          <div className={cn("text-lg font-bold", textColor)}>
            {metrics.loadTime}
          </div>
          <div className={cn("text-xs", textColor, variant === 'overlay' ? 'text-white/70' : '')}>
            Load Time
          </div>
        </div>
      )}
    </div>
  );
};

// Project Actions Component
const ProjectActions = ({ 
  project, 
  variant = 'default' 
}: { 
  project: ProjectData; 
  variant?: 'default' | 'overlay';
}) => {
  const buttonVariant = variant === 'overlay' ? 'secondary' : 'default';
  const buttonClass = variant === 'overlay' 
    ? 'bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30' 
    : '';

  return (
    <>
      {project.liveUrl && (
        <Button
          variant={buttonVariant}
          size="sm"
          className={buttonClass}
          data-cursor="button"
          asChild
        >
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </a>
        </Button>
      )}
      
      {project.githubUrl && (
        <Button
          variant={buttonVariant}
          size="sm"
          className={buttonClass}
          data-cursor="button"
          asChild
        >
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            Code
          </a>
        </Button>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={buttonVariant}
            size="sm"
            className={buttonClass}
            data-cursor="button"
          >
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>
          <ProjectDetailModal project={project} />
        </DialogContent>
      </Dialog>
    </>
  );
};

// Project Detail Modal Component
const ProjectDetailModal = ({ project }: { project: ProjectData }) => (
  <div className="space-y-6">
    <div className="aspect-video rounded-lg overflow-hidden">
      <OptimizedImage
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="space-y-4">
      <p className="text-muted-foreground leading-relaxed">
        {project.description}
      </p>
      
      <div>
        <h4 className="font-semibold mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      
      {project.metrics && (
        <div>
          <h4 className="font-semibold mb-3">Project Metrics</h4>
          <ProjectMetrics metrics={project.metrics} />
        </div>
      )}
    </div>
  </div>
);