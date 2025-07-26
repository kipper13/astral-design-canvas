import { useState, useEffect } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

// ===============================================
// PROJECT CONFIGURATION
// ===============================================
// Update the URLs below to point to your actual projects
// Replace "https://yoursite.com" with your actual website URLs

const projects = [
  // ========== LANDING PAGES (3 projects max) ==========
  {
    id: 1,
    title: "E-commerce Landing Page",
    category: "landing",
    image: portfolio1,
    beforeImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    description: "Modern e-commerce landing page with 40% conversion rate improvement",
    tech: ["Figma", "Webflow", "Analytics"],
    liveUrl: "https://conversion-zen.lovable.app",
    codeUrl: "https://yoursite.com/case-study-1" // 👈 UPDATE: Replace with your case study URL
  },
  {
    id: 2,
    title: "B2B Lead Generation",
    category: "landing",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop",
    description: "B2B landing page generating 300% more qualified leads",
    tech: ["Adobe XD", "Optimize", "HubSpot"],
    liveUrl: "https://enterprise-lead-gen.lovable.app",
    codeUrl: "https://yoursite.com/case-study-2" // 👈 UPDATE: Replace with your case study URL
  },
  {
    id: 3,
    title: "Startup MVP Landing",
    category: "landing",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    description: "Startup landing page that secured $2M in seed funding",
    tech: ["Figma", "React", "Framer Motion"],
    liveUrl: "https://startup-mvp-landing.lovable.app",
    codeUrl: "https://yoursite.com/case-study-3" // 👈 UPDATE: Replace with your case study URL
  },

  // ========== FUNNELS (3 projects max) ==========
  {
    id: 4,
    title: "SaaS Product Funnel",
    category: "funnel",
    image: portfolio2,
    beforeImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    description: "Complete sales funnel optimization increasing MRR by 65%",
    tech: ["Sketch", "InVision", "Hotjar"],
    liveUrl: "https://yoursite.com", // 👈 UPDATE: Replace with your actual project URL
    codeUrl: "https://github.com/yourusername/project4" // 👈 UPDATE: Replace with your GitHub/case study URL
  },
  {
    id: 5,
    title: "E-commerce Conversion Funnel",
    category: "funnel",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "Multi-step funnel with 85% completion rate optimization",
    tech: ["Figma", "Unbounce", "Google Analytics"],
    liveUrl: "https://yoursite.com", // 👈 UPDATE: Replace with your actual project URL
    codeUrl: "https://github.com/yourusername/project5" // 👈 UPDATE: Replace with your GitHub/case study URL
  },
  {
    id: 6,
    title: "Lead Nurturing Funnel",
    category: "funnel",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "Automated email funnel increasing customer lifetime value by 120%",
    tech: ["Mailchimp", "Zapier", "ConvertKit"],
    liveUrl: "https://yoursite.com", // 👈 UPDATE: Replace with your actual project URL
    codeUrl: "https://github.com/yourusername/project6" // 👈 UPDATE: Replace with your GitHub/case study URL
  },

  // ========== UI/UX DESIGN (3 projects max) ==========
  {
    id: 7,
    title: "Mobile App Interface",
    category: "design",
    image: portfolio3,
    beforeImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
    description: "Intuitive mobile app design with enhanced user experience",
    tech: ["Figma", "Principle", "Zeplin"],
    liveUrl: "https://yoursite.com", // 👈 UPDATE: Replace with your actual project URL
    codeUrl: "https://github.com/yourusername/project7" // 👈 UPDATE: Replace with your GitHub/case study URL
  },
  {
    id: 8,
    title: "Dashboard Interface",
    category: "design",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    description: "Clean dashboard design improving user task completion by 45%",
    tech: ["Sketch", "InVision", "Maze"],
    liveUrl: "https://yoursite.com", // 👈 UPDATE: Replace with your actual project URL
    codeUrl: "https://github.com/yourusername/project8" // 👈 UPDATE: Replace with your GitHub/case study URL
  },
  {
    id: 9,
    title: "E-learning Platform UI",
    category: "design",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
    description: "Educational platform redesign increasing student engagement by 60%",
    tech: ["Figma", "Protopie", "Maze"],
    liveUrl: "https://yoursite.com", // 👈 UPDATE: Replace with your actual project URL
    codeUrl: "https://github.com/yourusername/project9" // 👈 UPDATE: Replace with your GitHub/case study URL
  }
];

const categories = [
  { id: "all", label: "All Projects", icon: Filter },
  { id: "landing", label: "Landing Pages", icon: ExternalLink },
  { id: "funnel", label: "Funnels", icon: TrendingUp },
  { id: "design", label: "UI/UX", icon: Palette }
];

import { TrendingUp, Palette } from "lucide-react";

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    if (activeCategory === "all") {
      // Show maximum 3 projects per category when "all" is selected
      const landingProjects = projects.filter(p => p.category === "landing").slice(0, 3);
      const funnelProjects = projects.filter(p => p.category === "funnel").slice(0, 3);
      const designProjects = projects.filter(p => p.category === "design").slice(0, 3);
      setFilteredProjects([...landingProjects, ...funnelProjects, ...designProjects]);
    } else {
      // Show maximum 3 projects for the selected category
      setFilteredProjects(projects.filter(project => project.category === activeCategory).slice(0, 3));
    }
  }, [activeCategory]);

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            A collection of my best work showcasing design excellence and measurable results.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="hover-lift font-montserrat"
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift hover-glow"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image with Before/After Slider */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${hoveredProject === project.id ? project.beforeImage : project.image})` 
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Before/After Label */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-montserrat font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {hoveredProject === project.id ? "Before" : "After"}
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                    disabled={project.liveUrl.includes("yoursite.com")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(project.codeUrl, '_blank')}
                    disabled={project.codeUrl.includes("yourusername") || project.codeUrl.includes("github.com")}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Case
                  </Button>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-montserrat rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl transform scale-110" />
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover-lift font-montserrat font-semibold px-8">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};