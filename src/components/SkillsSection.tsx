import { useEffect, useRef, useState } from "react";
import { Code, Palette, TrendingUp, Zap } from "lucide-react";

const skills = [
  {
    name: "UI/UX Design",
    percentage: 95,
    icon: Palette,
    color: "from-cyan-400 to-blue-600",
    description: "Creating intuitive and beautiful user interfaces"
  },
  {
    name: "Funnel Design",
    percentage: 90,
    icon: TrendingUp,
    color: "from-emerald-400 to-teal-600",
    description: "Optimizing conversion funnels for maximum ROI"
  },
  {
    name: "HTML/CSS",
    percentage: 85,
    icon: Code,
    color: "from-orange-400 to-red-600",
    description: "Clean, semantic code and modern CSS techniques"
  },
  {
    name: "JavaScript",
    percentage: 75,
    icon: Zap,
    color: "from-violet-400 to-purple-600",
    description: "Interactive experiences and modern frameworks"
  }
];

interface ProgressRingProps {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  percentage, 
  color, 
  size = 120, 
  strokeWidth = 8 
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const ringRef = useRef<SVGCircleElement>(null);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  // Extract colors from the gradient string
  const getGradientColors = (colorString: string) => {
    const colorMap: { [key: string]: string } = {
      'cyan-400': '#22d3ee',
      'blue-600': '#2563eb',
      'emerald-400': '#34d399',
      'teal-600': '#0d9488',
      'orange-400': '#fb923c',
      'red-600': '#dc2626',
      'violet-400': '#a78bfa',
      'purple-600': '#9333ea'
    };
    
    const matches = colorString.match(/from-(\S+)\s+to-(\S+)/);
    if (matches) {
      const fromColor = colorMap[matches[1]] || '#3b82f6';
      const toColor = colorMap[matches[2]] || '#8b5cf6';
      return { from: fromColor, to: toColor };
    }
    return { from: '#3b82f6', to: '#8b5cf6' };
  };

  const gradientColors = getGradientColors(color);
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the progress
            let start = 0;
            const increment = percentage / 100;
            const timer = setInterval(() => {
              start += increment;
              if (start >= percentage) {
                start = percentage;
                clearInterval(timer);
              }
              setAnimatedPercentage(start);
            }, 20);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ringRef.current) {
      observer.observe(ringRef.current);
    }

    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress Circle */}
        <circle
          ref={ringRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${gradientColors.from}30)`
          }}
        />
        
        {/* Dynamic Gradient Definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientColors.from} />
            <stop offset="100%" stopColor={gradientColors.to} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-poppins font-bold text-foreground">
          {Math.round(animatedPercentage)}%
        </span>
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            A comprehensive skill set that enables me to deliver exceptional design solutions 
            from concept to completion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="text-center group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Skill Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center shadow-lg hover-lift group-hover:shadow-2xl transition-all duration-300`}>
                  <skill.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Progress Ring */}
              <div className="mb-6 flex justify-center">
                <div className="relative hover-lift">
                  <ProgressRing 
                    percentage={skill.percentage} 
                    color={skill.color}
                  />
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
                </div>
              </div>

              {/* Skill Details */}
              <div className="space-y-2">
                <h3 className="text-xl font-poppins font-bold text-foreground">
                  {skill.name}
                </h3>
                <p className="text-sm text-muted-foreground font-montserrat leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Skill Level Indicator */}
              <div className="mt-4">
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {[
            { name: "Figma", icon: "fab fa-figma", color: "text-purple-500" },
            { name: "Adobe XD", icon: "fas fa-vector-square", color: "text-pink-500" },
            { name: "Sketch", icon: "fas fa-pencil-ruler", color: "text-orange-500" },
            { name: "Webflow", icon: "fas fa-cube", color: "text-blue-500" },
            { name: "React", icon: "fab fa-react", color: "text-cyan-400" },
            { name: "Framer", icon: "fas fa-magic", color: "text-indigo-500" },
            { name: "Analytics", icon: "fas fa-chart-line", color: "text-green-500" }
          ].map((tool, index) => (
            <div
              key={tool.name}
              className="bg-card border border-border rounded-xl p-4 text-center hover-lift hover-glow group transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-3">
                <i className={`${tool.icon} text-3xl ${tool.color} mb-2 group-hover:scale-110 transition-transform duration-300`}></i>
                <div className={`absolute inset-0 ${tool.color.replace('text-', 'bg-').replace('500', '500/20')} rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              </div>
              <p className="text-sm font-montserrat font-medium text-foreground group-hover:text-primary transition-colors">
                {tool.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};