import { useEffect } from "react";
import { Palette, TrendingUp, Smartphone, Award } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Landing Page Design",
    description: "High-converting landing pages that capture attention and drive action.",
    features: ["Conversion Optimization", "A/B Testing", "Mobile First", "Fast Loading"],
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Funnel Optimization",
    description: "Strategic funnel design that maximizes conversions at every step.",
    features: ["Analytics Integration", "User Flow Mapping", "CRO Strategy", "Performance Tracking"],
    color: "from-green-500 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    description: "Intuitive interfaces that provide exceptional user experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    color: "from-pink-500 to-red-600"
  },
  {
    icon: Award,
    title: "Branding",
    description: "Cohesive brand identities that resonate with your target audience.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    color: "from-yellow-500 to-orange-600"
  }
];

export const ServicesSection = () => {
  useEffect(() => {
    // Initialize AOS animations when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            What I Do <span className="gradient-text">Best</span>
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            Specialized services that combine creativity with data-driven strategies 
            to deliver exceptional results for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card flip-card h-80"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front bg-card border border-border rounded-2xl p-6 hover-lift hover-glow">
                  <div className="h-full flex flex-col items-center text-center space-y-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-poppins font-bold text-foreground">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-montserrat leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mt-auto">
                      <div className={`w-16 h-1 bg-gradient-to-r ${service.color} rounded-full`}></div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back bg-card border border-border rounded-2xl p-6">
                  <div className="h-full flex flex-col justify-center space-y-4">
                    <h3 className="text-xl font-poppins font-bold text-foreground text-center mb-4">
                      Key Features
                    </h3>
                    
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-muted-foreground font-montserrat">
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto pt-4">
                      <button className={`w-full py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-montserrat font-semibold hover:scale-105 transition-transform`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "25%", label: "Average Conversion Boost" },
            { number: "3+", label: "Years Experience" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-card border border-border rounded-2xl hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-poppins font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-montserrat text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};