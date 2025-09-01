import { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// Featured landing page projects - curated selection of best work
const landingPages = [
  {
    id: 1,
    title: "E-commerce Landing Page",
    description: "Modern e-commerce landing page with 40% conversion rate improvement",
    image: "/lovable-uploads/landing-1.jpg",
    tags: ["E-commerce", "Conversion", "Modern"],
    liveUrl: "https://conversion-zen.lovable.app"
  },
  {
    id: 2,
    title: "B2B Lead Generation",
    description: "B2B landing page generating 300% more qualified leads",
    image: "/lovable-uploads/landing-2.jpg",
    tags: ["B2B", "Lead Gen", "Corporate"],
    liveUrl: "https://enterprise-lead-gen.lovable.app"
  },
  {
    id: 3,
    title: "Startup MVP Landing",
    description: "Startup landing page that secured $2M in seed funding",
    image: "/lovable-uploads/landing-3.jpg",
    tags: ["Startup", "MVP", "Funding"],
    liveUrl: "https://startup-mvp-landing.lovable.app"
  },
  {
    id: 4,
    title: "SaaS Product Landing",
    description: "SaaS landing page with focus on feature showcase and user onboarding",
    image: "/lovable-uploads/landing-4.jpg",
    tags: ["SaaS", "Features", "Product"],
    liveUrl: "#"
  },
  {
    id: 5,
    title: "Creative Agency Portfolio",
    description: "Award-winning agency landing page with interactive portfolio showcase",
    image: "/lovable-uploads/landing-5.jpg",
    tags: ["Agency", "Portfolio", "Creative"],
    liveUrl: "#"
  },
  {
    id: 6,
    title: "Healthcare Platform",
    description: "Medical practice landing page increasing patient appointments by 180%",
    image: "/lovable-uploads/landing-6.jpg",
    tags: ["Healthcare", "B2C", "Conversion"],
    liveUrl: "#"
  },
  {
    id: 7,
    title: "Financial Services Hub",
    description: "Investment platform landing page with advanced analytics dashboard",
    image: "/lovable-uploads/landing-7.jpg",
    tags: ["Finance", "Analytics", "B2B"],
    liveUrl: "#"
  },
  {
    id: 8,
    title: "Education Tech Platform",
    description: "EdTech landing page driving 250% increase in course enrollments",
    image: "/lovable-uploads/landing-8.jpg",
    tags: ["Education", "Tech", "SaaS"],
    liveUrl: "#"
  },
  {
    id: 9,
    title: "Welcome Email Series",
    description: "Engaging welcome email sequence with 85% open rate and improved onboarding",
    image: "/lovable-uploads/email-1.jpg",
    tags: ["Email Templates", "Welcome", "Onboarding"],
    liveUrl: "#"
  },
  {
    id: 10,
    title: "Newsletter Template",
    description: "Modern newsletter design increasing subscriber engagement by 60%",
    image: "/lovable-uploads/email-2.jpg",
    tags: ["Email Templates", "Newsletter", "Engagement"],
    liveUrl: "#"
  },
  {
    id: 11,
    title: "E-commerce Email Campaign",
    description: "Product promotion email template boosting sales conversion by 45%",
    image: "/lovable-uploads/email-3.jpg",
    tags: ["Email Templates", "E-commerce", "Sales"],
    liveUrl: "#"
  },
  {
    id: 12,
    title: "Event Invitation Email",
    description: "Professional event invitation design with 70% RSVP response rate",
    image: "/lovable-uploads/email-4.jpg",
    tags: ["Email Templates", "Events", "Corporate"],
    liveUrl: "#"
  }
];

const LandingPagesGallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    // Animate gallery items on load
    gsap.fromTo(".gallery-item", 
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, []);

  const openLightbox = (page: any) => {
    setSelectedImage(page);
    // Animate lightbox opening
    gsap.fromTo(".lightbox-overlay", 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(".lightbox-content", 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  const closeLightbox = () => {
    gsap.to(".lightbox-overlay", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedImage(null)
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover-lift"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-poppins font-bold text-foreground">
                  Landing Pages <span className="gradient-text">Gallery</span>
                </h1>
                <p className="text-muted-foreground font-montserrat mt-1">
                  Showcase of high-converting landing page designs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingPages.map((page, index) => (
            <div
              key={page.id}
              className="gallery-item group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift hover-glow cursor-pointer"
              onClick={() => openLightbox(page)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop";
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(page);
                      }}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    {page.liveUrl !== "#" && (
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(page.liveUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-poppins font-bold text-foreground mb-2 line-clamp-1">
                  {page.title}
                </h3>
                <p className="text-sm text-muted-foreground font-montserrat mb-3 line-clamp-2">
                  {page.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="lightbox-content relative max-w-4xl max-h-[90vh] bg-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop";
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-foreground mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-muted-foreground font-montserrat">
                    {selectedImage.description}
                  </p>
                </div>
                {selectedImage.liveUrl !== "#" && (
                  <Button
                    onClick={() => window.open(selectedImage.liveUrl, '_blank')}
                    className="hover-lift ml-4"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPagesGallery;